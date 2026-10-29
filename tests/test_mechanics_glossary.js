/* Pure glossary coverage and physical-boundary checks; no application UI required. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const glossary=require('../assets/js/data/mechanics-glossary.js');
const curriculum=require('../assets/js/data/mechanics-curriculum.js');
assert.deepEqual(glossary.modules.map(m=>m.id),curriculum.modules.map(m=>m.id));
const allLessons=new Set(curriculum.modules.flatMap(m=>m.lessons.map(l=>l.id)));
const covered=new Set();let count=0;
for(const m of glossary.modules){
  assert.ok(m.terms.length>=8);assert.equal(new Set(m.terms.map(t=>t.zh)).size,m.terms.length);
  for(const [id,locator] of m.readings){assert.ok(glossary.sources[id]);assert.ok(locator);assert.ok(glossary.sources[id].url.startsWith('https://'));}
  for(const t of m.terms){
    for(const key of ['zh','en','symbol','definition','caveat'])assert.ok(typeof t[key]==='string'&&t[key].trim(),m.id+' missing '+key);
    assert.ok(/[A-Za-z]/.test(t.en));assert.ok(t.lessons.length);assert.equal(new Set(t.lessons).size,t.lessons.length);
    for(const id of t.lessons){assert.ok(allLessons.has(id));assert.ok(id.startsWith(m.id+'.'));covered.add(id);}
    count++;
  }
}
assert.equal(count,80);assert.deepEqual([...covered].sort(),[...allLessons].sort());
assert.ok(glossary.scope.includes('未逐页核读'));assert.ok(glossary.scope.includes('不虚构页码'));
const find=zh=>glossary.modules.flatMap(m=>m.terms).find(t=>t.zh===zh);
assert.ok(find('支持力').caveat.includes('失效'));
assert.ok(find('驻定作用量').caveat.includes('鞍点'));
assert.ok(find('完全椭圆积分').caveat.includes('m=k²'));
assert.ok(find('正则动量').caveat.includes('未必等于mv'));
assert.ok(find('正则变换').caveat.includes('高维'));
assert.ok(find('角变量').caveat.includes('J=0'));
assert.ok(find('非线性稳定性').caveat.includes('不等于'));
assert.ok(find('有限时间Lyapunov估计').caveat.includes('不等于严格证明'));
assert.ok(find('约化质量').symbol.includes('μ_red'));
assert.ok(find('约化质量').caveat.includes('γ=κ/μ_red=G(m₁+m₂)'));
assert.ok(find('有效势').symbol.includes('J/kg'));
assert.ok(find('转向点').symbol.includes('ε=v有效'));
assert.ok(find('偏心率').symbol.includes('2εh²/γ²'));
assert.ok(find('半通径').symbol.includes('h²/γ'));
assert.ok(find('开普勒第三定律').symbol.includes('4π²/γ'));
for(const term of glossary.modules[2].terms){
  assert.ok(term.caveat.includes('测试粒子'),'CM3 term must identify current model: '+term.zh);
  assert.ok(term.caveat.includes('一般两体'),'CM3 term must identify generalization: '+term.zh);
}
const doc=fs.readFileSync(path.join(__dirname,'../docs/CLASSICAL_MECHANICS_MAP.md'),'utf8');
for(const m of glossary.modules)for(const t of m.terms){assert.ok(doc.includes(t.en),'Undocumented '+t.en);assert.ok(doc.includes(t.zh));}
console.log('PASS mechanics glossary: 80 original bilingual terms, >=8 per module, 32-lesson coverage, units/caveats, source scope and full document consistency.');
