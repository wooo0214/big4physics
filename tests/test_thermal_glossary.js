/* Standalone thermal terminology coverage; no UI or persistent storage needed. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const g=require('../assets/js/data/thermal-glossary.js');
const c=require('../assets/js/data/thermal-curriculum.js');
assert.deepEqual(g.modules.map(m=>m.id),c.modules.map(m=>m.id));
const expected=new Set(c.modules.flatMap(m=>m.lessons.map(l=>l.id)));
const covered=new Set();let count=0;
for(const m of g.modules){
 assert.ok(m.terms.length>=8,m.id);
 assert.equal(new Set(m.terms.map(t=>t.zh)).size,m.terms.length);
 for(const[key,location]of m.readings){assert.ok(g.sources[key]);assert.ok(location);assert.ok(g.sources[key].url.startsWith('https://'));}
 for(const t of m.terms){
  for(const k of ['zh','en','symbol','definition','caveat'])assert.ok(typeof t[k]==='string'&&t[k].trim(),m.id+' '+k);
  assert.ok(/[A-Za-z]/.test(t.en));assert.ok(t.lessons.length);assert.equal(new Set(t.lessons).size,t.lessons.length);
  for(const id of t.lessons){assert.ok(expected.has(id));assert.ok(id.startsWith(m.id+'.'));covered.add(id);}count++;
 }
}
assert.equal(count,64);assert.deepEqual([...covered].sort(),[...expected].sort());
assert.ok(g.scope.includes('未逐页核读'));assert.ok(g.scope.includes('不虚构页码'));assert.ok(g.conventions.includes('thermal'));
const term=zh=>g.modules.flatMap(m=>m.terms).find(t=>t.zh===zh);
assert.ok(term('对外做功').caveat.includes('ΔU=Q−W_by'));
assert.ok(term('平均单态占据').caveat.includes('不等同归一'));
assert.ok(term('Bose–Einstein分布').caveat.includes('μ低于最低'));
assert.ok(term('涨落响应关系').caveat.includes('h是能量型场'));
assert.ok(term('热力学极限').caveat.includes('无有限温相变'));
assert.ok(term('零点能').caveat.includes('不贡献热容'));
const doc=fs.readFileSync(path.join(__dirname,'../docs/THERMAL_STATISTICAL_MAP.md'),'utf8');
for(const m of g.modules)for(const t of m.terms)assert.ok(doc.includes(t.en),'Missing documented term '+t.en);
for(const s of Object.values(g.sources))assert.ok(doc.includes(s.url));
console.log('PASS thermal glossary: 64 original bilingual definitions, every TS1–TS8 lesson covered, source locators, units/ensemble/boundary caveats and document agreement.');
