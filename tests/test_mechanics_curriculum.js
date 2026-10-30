/* Standalone metadata and actual map-script checks. No shared application, storage,
 * browser dependency, user records, network, or model modules are required. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const data=require('../assets/js/data/mechanics-curriculum.js');
const modules=new Map(data.modules.map(m=>[m.id,m]));
const lessons=new Map(data.modules.flatMap(m=>m.lessons).map(l=>[l.id,l]));
assert.equal(modules.size,8);assert.equal(lessons.size,32);
assert.deepEqual([...lessons.keys()],Array.from({length:8},(_,i)=>Array.from({length:4},(_,j)=>`CM${i+1}.${j+1}`)).flat());
function checkGraph(nodes,parents){
  const active=new Set(),done=new Set();
  function visit(id){assert.ok(nodes.has(id),'Unknown prerequisite '+id);assert.ok(!active.has(id),'Cycle '+id);if(done.has(id))return;active.add(id);parents(nodes.get(id)).forEach(visit);active.delete(id);done.add(id);}
  nodes.forEach((_,id)=>visit(id));
}
checkGraph(modules,m=>m.requires.map(r=>r.id));
checkGraph(modules,m=>[...m.requires,...m.recommended].map(r=>r.id));
checkGraph(lessons,l=>l.requires);
const sources=new Map(data.sources.map(s=>[s.id,s]));
const route=new Set();
for(const id of data.route){assert.ok(modules.has(id));assert.ok(!route.has(id));modules.get(id).requires.forEach(r=>assert.ok(route.has(r.id)));route.add(id);}
assert.equal(route.size,8);
for(const m of modules.values()){
  assert.equal(m.lessons.length,4);
  for(const key of ['title','short','question','outcome','assumptions','misconception','mastery','transfer'])assert.ok(m[key],m.id+' missing '+key);
  m.tools.forEach(id=>assert.ok(data.bridges.some(b=>b.id===id)));
  [...m.requires,...m.recommended].forEach(r=>assert.ok(r.reason));
  m.readings.forEach(([id,locator])=>{assert.ok(sources.has(id));assert.ok(locator);});
  for(const l of m.lessons){
    for(const key of ['question','experiment','derivation','acceptance','model','graduateTask','implementationId','implementationNote'])assert.ok(l[key],l.id+' missing '+key);
    assert.equal(l.status,'available');
  }
}
const bindings=[...lessons.values()].map(l=>l.implementationId);
assert.equal(new Set(bindings).size,32);
assert.equal(lessons.get('CM2.2').implementationId,'mechanics');
assert.equal(lessons.get('CM2.2').legacyLessonId,'mechanics');
assert.equal([...lessons.values()].filter(l=>l.legacyLessonId).length,1);
assert.ok(lessons.get('CM2.2').model.includes('轨迹示意'));
assert.ok(lessons.get('CM2.3').model.includes('驻定不等同'));
assert.ok(lessons.get('CM4.4').model.includes('不存在有限稳态'));
assert.ok(lessons.get('CM5.3').model.includes('局部线性'));
assert.ok(lessons.get('CM7.2').model.includes('单独det=1'));
assert.ok(lessons.get('CM7.3').acceptance.includes('J=0'));
assert.ok(lessons.get('CM8.1').acceptance.includes('四次势仍有稳定'));
assert.ok(lessons.get('CM8.3').model.includes('步长'));
assert.ok(lessons.get('CM8.4').model.includes('柱面'));
// Prevent confusing reduced mass (kg) with the gravitational parameter (m³/s²),
// or replacing specific energy (J/kg) by total energy (J) in the current UI.
const orbital=modules.get('CM3');
assert.ok(orbital.assumptions.includes('γ=κ/μ_red=G(m₁+m₂)'));
assert.ok(orbital.assumptions.includes('h=ℓ/μ_red'));
assert.ok(orbital.assumptions.includes('ε=E/μ_red'));
for(const lesson of orbital.lessons){
  assert.ok(lesson.experiment.includes('γ [m³/s²]'));
  assert.ok(lesson.model.includes('测试粒子'));
  assert.ok(lesson.model.includes('μ_red'));
  assert.ok(lesson.derivation.includes('γ'));
}
assert.ok(lessons.get('CM3.1').experiment.includes('比能量ε [J/kg]'));
assert.ok(lessons.get('CM3.2').experiment.includes('比角动量h'));
assert.ok(lessons.get('CM3.3').experiment.includes('未展示均匀时间扇形'));
// An independent dimensional conversion example uses Earth/Moon-like masses.
// This validates the general two-body/specific equations without importing the
// implementation under test, and without treating the test-particle limit as exact.
{
  const G=6.67430e-11,m1=5.972e24,m2=7.348e22;
  const reducedMass=m1*m2/(m1+m2),kappa=G*m1*m2;
  const gamma=G*(m1+m2),radius=3.844e8,velocity=1000;
  const h=radius*velocity,ell=reducedMass*h;
  const totalV=ell*ell/(2*reducedMass*radius*radius)-kappa/radius;
  const specificV=h*h/(2*radius*radius)-gamma/radius;
  const relative=(a,b)=>Math.abs(a-b)/Math.max(Math.abs(a),Math.abs(b));
  assert.ok(relative(kappa/reducedMass,gamma)<1e-14);
  assert.ok(relative(totalV/reducedMass,specificV)<1e-14);
  assert.ok(gamma>G*m1,'General two-body gamma must retain the second mass.');
  assert.ok(relative(gamma,G*m1)>0.01,'This example must resolve the test-particle approximation.');
}
function ancestors(id,found=new Set()){modules.get(id).requires.forEach(r=>{if(!found.has(r.id)){found.add(r.id);ancestors(r.id,found);}});return found;}
assert.deepEqual([...ancestors('CM5')],['CM1']);
assert.ok(!ancestors('CM8').has('CM7'));
assert.ok(!ancestors('CM6').has('CM4'));
const doc=fs.readFileSync(path.join(__dirname,'../docs/CLASSICAL_MECHANICS_MAP.md'),'utf8');
for(const id of lessons.keys())assert.ok(doc.includes('#### '+id+' '),'Undocumented '+id);
for(const s of sources.values()){assert.ok(s.url.startsWith('https://'));assert.ok(doc.includes(s.url));assert.ok(s.use.includes('未逐'));}
// Tiny isolated DOM supplies only the APIs actually used by the standalone map.
// The real script runs and event handlers are invoked; no app/index integration is assumed.
function bootMap(progress=()=>({})){
  let document;
  class Element{
    constructor(tag,attrs={}){this.tag=tag;this.attrs=attrs;this.children=[];this.events={};this.hidden=false;this.open=false;}
    get id(){return this.attrs.id;}
    get dataset(){return Object.fromEntries(Object.entries(this.attrs).filter(([k])=>k.startsWith('data-')).map(([k,v])=>[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),v]));}
    set innerHTML(html){this.html=html;this.children=[];const stack=[this];for(const token of html.match(/<\/?[\w:-]+\b[^>]*>/g)||[]){if(token.startsWith('</')){const tag=token.match(/^<\/([\w:-]+)/)[1];for(let i=stack.length-1;i>0;i--)if(stack[i].tag===tag){stack.length=i;break;}continue;}const start=token.match(/^<([\w:-]+)\b([^>]*)>/);const attrs={};for(const a of start[2].matchAll(/([\w:-]+)="([^"]*)"/g))attrs[a[1]]=a[2];const el=new Element(start[1],attrs);stack.at(-1).children.push(el);if(!['input','br','hr','img'].includes(el.tag))stack.push(el);}}
    get innerHTML(){return this.html||'';}
    querySelectorAll(selector){const out=[];for(const child of this.children){const attr=selector.match(/^\[([\w-]+)\]$/);if(attr?attr[1] in child.attrs:child.tag===selector)out.push(child);out.push(...child.querySelectorAll(selector));}return out;}
    querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
    addEventListener(type,fn){this.events[type]=fn;}
    click(){this.events.click?.({preventDefault(){}});}
    focus(){document.activeElement=this;}
    scrollIntoView(){}
  }
  const mount=new Element('div',{id:'mechanicsMap'});
  document={activeElement:null,getElementById(id){return id==='mechanicsMap'?mount:mount.querySelectorAll('[id]').find(x=>x.id===id)||null;}};
  const window={MechanicsCurriculum:data};
  const sandbox={window,document};
  Object.defineProperty(sandbox,'localStorage',{get(){throw Error('Map touched storage');}});
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js/mechanics-course-map.js'),'utf8'),sandbox);
  const opened=[];
  window.PhysicsQuestMechanicsMap.configure({onOpenLesson:id=>opened.push(id),getProgress:progress});
  return {mount,document,api:window.PhysicsQuestMechanicsMap,opened};
}
const map=bootMap(id=>id==='CM2.2'?{predict:true,derive:true}:{});
const click=(key,value)=>{const node=map.mount.querySelectorAll('[data-'+key+']').find(n=>n.attrs['data-'+key]===value);assert.ok(node,key+'='+value);node.click();};
assert.ok(map.mount.innerHTML.includes('32 个关卡设计 · 32 个已有示范'));
assert.ok(map.mount.innerHTML.includes('开始 CM1.1'));
const headingActions=map.mount.innerHTML.match(/<div class="map-actions">([\s\S]*?)<\/div>/)[1];
assert.equal((headingActions.match(/data-open-lesson=/g)||[]).length,1);
assert.ok(!headingActions.includes('CM2.2'));
click('open-lesson','CM1.1');click('module','CM2');click('open-lesson','CM2.2');
assert.deepEqual(map.opened,['CM1.1','CM2.2']);
for(const m of modules.values()){
  click('module',m.id);
  assert.equal(map.document.activeElement.id,'mechanicsModuleDetailTitle');
  for(const l of m.lessons)assert.ok(map.document.getElementById('mechanicsLesson-'+l.id));
  assert.ok(!/\b(?:NaN|Infinity|undefined)\b/.test(map.mount.innerHTML),'Nonfinite or unresolved map content');
  for(const element of map.mount.querySelectorAll('[id]'))assert.ok(element.id.startsWith('mechanics'),'Unscoped ID '+element.id);
}
click('module','CM2');assert.ok(map.mount.innerHTML.includes('示范题完成'));
click('prerequisite','CM1.1');assert.equal(map.document.getElementById('mechanicsLesson-CM1.1').open,true);assert.equal(map.document.activeElement.tag,'summary');
map.api.show(false);assert.equal(map.mount.hidden,true);map.api.show(true);assert.equal(map.mount.hidden,false);
map.api.refresh();map.api.configure();
console.log('PASS mechanics curriculum: 8 modules / 32 lessons, DAGs, branches, 1 legacy binding, physical caveats, source/doc consistency, isolated actual-map events, IDs, focus, launchers, no storage.');
