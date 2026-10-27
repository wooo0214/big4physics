/* Shared isolated DOM/Canvas adapter. Never reads real browser storage. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
// Page URLs resolve from the repository root, regardless of the test directory.
const PROJECT_ROOT = path.resolve(__dirname, '..');
const decode=s=>s.replace(/&(amp|lt|gt|quot|#39);/g,(_,key)=>({amp:'&',lt:'<',gt:'>',quot:'"','#39':"'"}[key]));
function boot(initial,options={}){
  let saved=JSON.stringify(initial),blobs=[],drawCalls=0,paintedText=[];
  let theme=options.theme??null;
  const canvas=new Proxy({}, {get(target,name){if(name in target)return target[name];return (...args)=>{
    for(const arg of args)if(typeof arg==='number')assert.ok(Number.isFinite(arg),'Nonfinite canvas argument: '+name);
    if(name==='fillText')paintedText.push({text:args[0],color:target.fillStyle});
    drawCalls++;
  };}});
  class Element {
    constructor(tag,attrs={}){this.tag=tag;this.attrs=attrs;this.children=[];this.events={};this.style={};this._value=attrs.value||'';this.hidden='hidden' in attrs;this.open=false;}
    get id(){return this.attrs.id;}
    set id(value){this.attrs.id=value;}
    get dataset(){const out={};for(const [key,value] of Object.entries(this.attrs))if(key.startsWith('data-'))out[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;return out;}
    get className(){return this.attrs.class||'';}
    set className(value){this.attrs.class=value;}
    get classList(){return {add:(c)=>{this.className=[...new Set([...this.className.split(' '),c])].join(' ');},remove:(c)=>{this.className=this.className.split(' ').filter(v=>v!==c).join(' ');}};}
    get value(){return this._value;}
    set value(value){this._value=String(value);}
    get innerHTML(){return this._html||'';}
    set innerHTML(value){this._html=String(value);this.children=parse(this._html);}
    get textContent(){return this.children.map(c=>typeof c==='string'?c:c.textContent).join('');}
    set textContent(value){this.children=[String(value)];}
    addEventListener(type,fn){this.events[type]=fn;}
    fire(type='click',details={}){if(this.events[type])this.events[type]({target:this,preventDefault(){},...details});}
    click(){this.fire();}
    getAttribute(name){return this.attrs[name]??null;}
    setAttribute(name,value){this.attrs[name]=String(value);}
    focus(){document.activeElement=this;}
    scrollIntoView(){}
    getContext(){return canvas;}
    appendChild(child){this.children.push(child);}
    remove(){}
    matches(selector){
      if(selector.startsWith('.'))return this.className.split(' ').includes(selector.slice(1));
      const attribute=selector.match(/^\[([\w-]+)(?:="([^"]*)")?\]$/);
      if(attribute)return attribute[1] in this.attrs && (attribute[2]===undefined||this.attrs[attribute[1]]===attribute[2]);
      return this.tag===selector;
    }
    querySelectorAll(selector){const result=[];for(const child of this.children)if(child instanceof Element){if(child.matches(selector))result.push(child);result.push(...child.querySelectorAll(selector));}return result;}
    querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
  }
  function parse(html){
    const root=new Element('fragment'),stack=[root],voidTags=new Set(['input','link','meta','br','img','hr']);
    for(const token of html.match(/<!--[\s\S]*?-->|<\/?[\w:-]+\b[^>]*>|[^<]+/g)||[]){
      if(token.startsWith('<!--'))continue;
      const close=token.match(/^<\/([\w:-]+)/);
      if(close){for(let i=stack.length-1;i>0;i--)if(stack[i].tag===close[1].toLowerCase()){stack.length=i;break;}continue;}
      const start=token.match(/^<([\w:-]+)\b([^>]*)>/);
      if(start){
        const attrs={};for(const match of start[2].matchAll(/([\w:-]+)(?:="([^"]*)")?/g))attrs[match[1]]=decode(match[2]||'');
        const element=new Element(start[1].toLowerCase(),attrs);stack[stack.length-1].children.push(element);
        if(!voidTags.has(element.tag)&&!token.endsWith('/>'))stack.push(element);
      }else stack[stack.length-1].children.push(decode(token));
    }
    return root.children;
  }
  const document={root:new Element('document'),getElementById(id){return this.root.querySelectorAll('[id]').find(e=>e.id===id)||null;},querySelectorAll(s){return this.root.querySelectorAll(s);},createElement(tag){return new Element(tag);}};
  const html=fs.readFileSync(path.join(PROJECT_ROOT,'index.html'),'utf8');
  document.root.innerHTML=html;document.body=document.root.querySelector('body');document.documentElement=document.root.querySelector('html');
  const context={document,performance:{now:()=>0},requestAnimationFrame(){},confirm:()=>false,setTimeout(fn){fn();},
    localStorage:{getItem(key){
      if(options.blockReads)throw new Error('Storage access blocked');
      assert.ok(['physics-quest-mvp-v1','physics-quest-theme-v1'].includes(key));
      return key==='physics-quest-theme-v1'?theme:saved;
    },setItem(key,value){
      if(options.blockWrites)throw new Error('Storage write blocked');
      assert.ok(['physics-quest-mvp-v1','physics-quest-theme-v1'].includes(key));
      if(key==='physics-quest-theme-v1')theme=value;else saved=value;
    }},
    Blob:class {constructor(parts){blobs.push(parts.join(''));}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}}};
  context.window=context;vm.createContext(context);
  // Run the early inline theme restore as well as the actual external scripts.
  for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
    const source=match[1].match(/src="([^"]+)"/);
    const file=source?source[1].split('?')[0]:null;
    vm.runInContext(file?fs.readFileSync(path.join(PROJECT_ROOT,file),'utf8'):match[2],context,{filename:file||'inline-theme'});
  }
  return {document,node:id=>{const e=document.getElementById(id);assert.ok(e,'Missing element '+id);return e;},snapshot:()=>JSON.parse(saved),serialized:()=>saved,blobs,drawCount:()=>drawCalls,theme:()=>theme,paintedText,clearPaintedText:()=>{paintedText.length=0;}};
}

function openLesson(app,id){
  app.node('mapViewBtn').click();
  const mount=app.node('electroMap');
  const moduleButton=mount.querySelectorAll('[data-module]').find(e=>e.dataset.module===id.split('.')[0]);
  assert.ok(moduleButton,'Missing module for '+id);moduleButton.click();
  const lesson=app.node('lesson-'+id);lesson.open=true;
  const button=lesson.querySelectorAll('[data-open-lesson]').find(e=>e.dataset.openLesson===id);
  assert.ok(button,'Missing map launcher '+id);button.click();
}

module.exports={boot,openLesson};
