/* Standalone metadata/map checks. No app boot, external library, or user storage. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const data=require('../assets/js/data/thermal-curriculum.js');
const modules=new Map(data.modules.map(m=>[m.id,m]));
const lessons=new Map(data.modules.flatMap(m=>m.lessons).map(l=>[l.id,l]));
assert.equal(modules.size,8);assert.equal(lessons.size,32);
assert.deepEqual([...lessons.keys()],Array.from({length:8},(_,i)=>Array.from({length:4},(_,j)=>`TS${i+1}.${j+1}`)).flat());
function graph(nodes,deps){
 const active=new Set(),done=new Set();
 function visit(id){assert.ok(nodes.has(id),'Missing dependency '+id);assert.ok(!active.has(id),'Cycle '+id);if(done.has(id))return;active.add(id);deps(nodes.get(id)).forEach(visit);active.delete(id);done.add(id);}
 nodes.forEach((_,id)=>visit(id));
}
graph(modules,m=>m.requires.map(r=>r.id));
graph(modules,m=>[...m.requires,...m.recommended].map(r=>r.id));
graph(lessons,l=>l.requires);
const sources=new Set(data.sources.map(s=>s.id));
const visited=new Set();
for(const id of data.route){assert.ok(modules.has(id));assert.ok(!visited.has(id));modules.get(id).requires.forEach(r=>assert.ok(visited.has(r.id)));visited.add(id);}
assert.equal(visited.size,8);
for(const m of data.modules){
 assert.equal(m.lessons.length,4);
 for(const k of ['title','short','question','outcome','assumptions','misconception','mastery','transfer'])assert.ok(m[k],m.id+' '+k);
 for(const r of [...m.requires,...m.recommended])assert.ok(r.reason);
 for(const b of m.tools)assert.ok(data.bridges.some(x=>x.id===b));
 for(const [key,location]of m.readings){assert.ok(sources.has(key));assert.ok(location);}
 for(const l of m.lessons){
  for(const k of ['question','experiment','derivation','acceptance','model','graduateTask','implementationNote'])assert.ok(l[k],l.id+' '+k);
  assert.equal(l.status,'available');assert.equal(l.implementationId,l.id==='TS5.1'?'thermal':l.id);
 }
}
const legacy=[...lessons.values()].filter(l=>l.legacyLessonId);
assert.equal(legacy.length,1);assert.equal(legacy[0].id,'TS5.1');assert.equal(legacy[0].legacyLessonId,'thermal');
assert.equal(new Set([...lessons.values()].map(l=>l.implementationId)).size,32);
function ancestors(id,out=new Set()){
 for(const p of lessons.get(id).requires)if(!out.has(p)){out.add(p);ancestors(p,out);}return out;
}
assert.ok(![...ancestors('TS7.1')].some(id=>id.startsWith('TS6.')),'TS6 is optional before TS7');
assert.ok(![...ancestors('TS8.1')].some(id=>id.startsWith('TS7.')),'TS7 is optional before TS8');
assert.ok(![...ancestors('TS3.1')].some(id=>id.startsWith('TS2.')),'Counting is an independent entry');
const doc=fs.readFileSync(path.join(__dirname,'../docs/THERMAL_STATISTICAL_MAP.md'),'utf8');
for(const l of lessons.values())assert.ok(doc.includes('#### '+l.id+' '));
for(const s of data.sources){assert.ok(s.url.startsWith('https://'));assert.ok(doc.includes(s.url));}
assert.ok(data.conventions.includes('ΔU=Q−W_by'));
assert.ok(lessons.get('TS8.1').model.includes('精确枚举'));
assert.ok(lessons.get('TS8.2').acceptance.includes('简并'));
assert.ok(lessons.get('TS7.3').model.includes('均匀三维'));
assert.ok(lessons.get('TS6.3').model.includes('不含湍流'));
// A deliberately small map-only adapter exercises selection, prerequisites and callbacks.
// It checks generated map markup, not browser layout or the shared application.
let active=null;
class MapElement{
 constructor(attrs={}){this.attrs=attrs;this.events={};this.open=false;this.hidden=false;}
 get dataset(){const d={};for(const[k,v]of Object.entries(this.attrs))if(k.startsWith('data-'))d[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=v;return d;}
 addEventListener(k,fn){this.events[k]=fn;}
 click(){this.events.click?.({preventDefault(){}});}
 focus(){active=this;}
 scrollIntoView(){}
 querySelector(){return this.summary||(this.summary=new MapElement());}
}
const mount=new MapElement();
let nodes=[];
Object.defineProperty(mount,'innerHTML',{get(){return this.html;},set(html){
 this.html=html;nodes=[];
 for(const token of html.match(/<(?:button|a|h3|details|marker|div)\b[^>]*>/g)||[]){
  const attrs={};for(const match of token.matchAll(/([\w-]+)="([^"]*)"/g))attrs[match[1]]=match[2];nodes.push(new MapElement(attrs));
 }
}});
mount.querySelectorAll=selector=>{const key=selector.slice(1,-1);return nodes.filter(n=>key in n.attrs);};
const document={getElementById(id){return id==='thermalMap'?mount:nodes.find(n=>n.attrs.id===id);}};
const context={document,ThermalCurriculum:data};context.window=context;
Object.defineProperty(context,'localStorage',{get(){throw Error('Map must never access learning storage');}});
vm.createContext(context);
const source=fs.readFileSync(path.join(__dirname,'../assets/js/thermal-course-map.js'),'utf8');
vm.runInContext(source,context);
const api=context.PhysicsQuestThermalMap;assert.ok(api);
let opened=null;api.configure({onOpenLesson:id=>{opened=id;},getProgress:id=>({predict:id==='TS5.1',derive:id==='TS5.1'})});
const headingActions=mount.innerHTML.match(/<div class="map-actions">([\s\S]*?)<\/div>/)[1];
assert.equal((headingActions.match(/data-open-lesson=/g)||[]).length,1);
assert.ok(headingActions.includes('TS1.1'));
assert.ok(!headingActions.includes('TS5.1'));
function choose(key,value){const b=mount.querySelectorAll('[data-'+key+']').find(n=>n.dataset[key.replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]===value);assert.ok(b,key+' '+value);b.click();}
for(const m of data.modules){
 choose('module',m.id);assert.equal(active.attrs.id,'thermalModuleDetailTitle');
 for(const l of m.lessons){assert.ok(mount.innerHTML.includes('id="thermalLesson-'+l.id+'"'));assert.ok(mount.innerHTML.includes(l.graduateTask));}
 const ids=[...mount.innerHTML.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length);assert.ok(ids.every(id=>id.startsWith('thermal')));
 assert.ok(!mount.innerHTML.includes('NaN'));assert.ok(!mount.innerHTML.includes('undefined'));
}
choose('module','TS5');assert.ok(mount.innerHTML.includes('示范题完成'));choose('open-lesson','TS5.1');assert.equal(opened,'TS5.1');
choose('prerequisite','TS4.2');assert.equal(document.getElementById('thermalLesson-TS4.2').open,true);assert.ok(active);
choose('open-lesson','TS1.1');assert.equal(opened,'TS1.1');
api.show(false);assert.equal(mount.hidden,true);api.show(true);assert.equal(mount.hidden,false);api.refresh();
assert.ok(!source.includes('QM'));assert.ok(!source.includes('quantum'));
console.log('PASS thermal curriculum: 8 modules / 32 designs, one thermal legacy binding, acyclic optional branches, source/doc consistency, independent map navigation and callbacks, namespaced IDs and no storage access.');
