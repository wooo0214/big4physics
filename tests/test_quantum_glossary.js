/* Quantum terminology coverage and actual UI regression using fictitious storage.
 * No browser package, user learning data, external account or new dependency.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const glossary=require('../assets/js/data/quantum-glossary.js');
const curriculum=require('../assets/js/data/quantum-curriculum.js');
const {boot}=require('./test_app_harness.js');
assert.deepEqual(glossary.modules.map(m=>m.id),curriculum.modules.map(m=>m.id));
const allLessons=new Set(curriculum.modules.flatMap(m=>m.lessons.map(l=>l.id)));
const covered=new Set();
let total=0;
for(const m of glossary.modules){
  assert.ok(m.terms.length>=10,m.id+' lacks conceptual coverage');
  assert.equal(new Set(m.terms.map(t=>t.zh)).size,m.terms.length);
  assert.ok(m.readings.some(([key])=>key==='zeng'));
  assert.ok(m.readings.some(([key])=>key==='griffiths'));
  for(const [key,locator] of m.readings){
    assert.ok(glossary.sources[key]);assert.ok(locator);
    assert.ok(glossary.sources[key].url.startsWith('https://'));
  }
  for(const t of m.terms){
    for(const key of ['zh','en','symbol','definition','caveat'])assert.ok(typeof t[key]==='string'&&t[key].trim(),m.id+': missing '+key);
    assert.ok(/[A-Za-z]/.test(t.en));
    assert.ok(t.lessons.length>0);
    assert.equal(new Set(t.lessons).size,t.lessons.length);
    for(const id of t.lessons){assert.ok(allLessons.has(id),id);assert.ok(id.startsWith(m.id+'.'));covered.add(id);}
    total++;
  }
}
assert.equal(total,123);
assert.deepEqual([...covered].sort(),[...allLessons].sort());
const well=glossary.modules[0].terms.find(t=>t.zh==='一维无限深势阱');
assert.equal(well.en,'Infinite Square Well');assert.ok(well.lessons.includes('QM1.1'));
assert.ok(glossary.scope.includes('未逐页核读'));
assert.ok(glossary.scope.includes('2018'));
// These conventions protect the explanations most likely to mislead beginners.
const find=zh=>glossary.modules.flatMap(m=>m.terms).find(t=>t.zh===zh);
assert.ok(find('零点能').definition.includes('盒内势能取零'));
assert.ok(find('零点能').caveat.includes('零点可平移'));
assert.ok(find('概率幅').caveat.includes('连续表象'));
assert.ok(find('定态').caveat.includes('相位仍在变化'));
assert.ok(find('磁偶极跃迁').caveat.includes('21厘米'));
const doc=fs.readFileSync(path.join(__dirname,'../docs/QUANTUM_MECHANICS_MAP.md'),'utf8');
for(const m of glossary.modules)for(const t of m.terms)assert.ok(doc.includes(t.en),'Missing document term: '+t.en);
const choose=(mount,key,value)=>{
  const button=mount.querySelectorAll('[data-'+key+']').find(e=>e.attrs['data-'+key]===value);
  assert.ok(button,`Missing ${key}=${value}`);button.click();
};
const original={lessons:{quantum:{predict:true,derive:false,note:'原势阱笔记'},electro:{predict:true,derive:true,note:'原电动力学笔记'},'ED8.1':{predict:false,derive:true,note:'旧相对论笔记'}}};
for(const theme of ['day','night']){
  const app=boot(original,{theme}),node=app.node;
  const saved=app.serialized();
  choose(node('courseNav'),'course','quantum');
  const views=[['quantumMapViewBtn','quantumMap'],['quantumDemoViewBtn','lessonLayout'],['quantumGlossaryViewBtn','quantumGlossary']];
  function assertView(active){
    for(const [tab,panel] of views){
      assert.equal(node(tab).getAttribute('aria-selected'),String(tab===active));
      assert.equal(node(tab).getAttribute('tabindex'),tab===active?'0':'-1');
      assert.equal(node(panel).hidden,tab!==active);
    }
    assert.equal(node('electroMap').hidden,true);assert.equal(node('electroGlossary').hidden,true);
  }
  assertView('quantumMapViewBtn');
  node('quantumDemoViewBtn').click();
  const slider=node('slider-L');slider.value=1.7;slider.fire('input');
  node('reflection').value='尚未保存的零点动能理解';
  node('quantumGlossaryViewBtn').click();assertView('quantumGlossaryViewBtn');
  assert.equal(node('quantumGlossary').getAttribute('role'),'tabpanel');
  assert.equal(node('quantumGlossary').getAttribute('aria-labelledby'),'quantumGlossaryViewBtn');
  assert.ok(node('quantumGlossaryModuleTitle').textContent.startsWith('QM1'));
  assert.ok(node('quantumGlossary').textContent.includes('123 个中英词条'));
  assert.ok(node('quantumGlossary').textContent.includes(well.en));
  assert.ok(node('quantumGlossary').textContent.includes('未逐页核读'));
  assert.ok(node('quantumGlossary').textContent.includes('查词'));
  for(const m of glossary.modules){
    choose(node('quantumGlossary'),'glossary-module',m.id);
    assert.equal(node('quantumGlossaryModuleTitle').textContent,m.id+' · '+m.title);
    const buttons=node('quantumGlossary').querySelectorAll('[data-glossary-module]');
    const active=buttons.filter(b=>b.getAttribute('aria-pressed')==='true');
    assert.equal(active.length,1);assert.equal(active[0].dataset.glossaryModule,m.id);
    assert.equal(app.document.activeElement,active[0]);
    const rows=node('quantumGlossary').querySelector('tbody').querySelectorAll('tr');
    assert.equal(rows.length,m.terms.length);
    for(const t of m.terms){assert.ok(node('quantumGlossary').textContent.includes(t.zh));assert.ok(node('quantumGlossary').textContent.includes(t.en));}
    assert.equal(node('quantumGlossary').querySelectorAll('[lang="en"]').length,m.terms.length);
  }
  for(const [from,key,to] of [
    ['quantumGlossaryViewBtn','ArrowRight','quantumMapViewBtn'],
    ['quantumMapViewBtn','ArrowLeft','quantumGlossaryViewBtn'],
    ['quantumGlossaryViewBtn','ArrowLeft','quantumDemoViewBtn'],
    ['quantumDemoViewBtn','ArrowRight','quantumGlossaryViewBtn'],
    ['quantumGlossaryViewBtn','Home','quantumMapViewBtn'],
    ['quantumMapViewBtn','End','quantumGlossaryViewBtn']
  ]){
    node(from).fire('keydown',{key});assertView(to);assert.equal(app.document.activeElement,node(to));
  }
  node('themeToggle').click();assertView('quantumGlossaryViewBtn');
  node('quantumDemoViewBtn').click();assertView('quantumDemoViewBtn');
  assert.equal(node('slider-L'),slider);assert.equal(slider.value,'1.7');
  assert.equal(node('reflection').value,'尚未保存的零点动能理解');
  assert.ok(node('lessonIntro').textContent.includes('这个盒子中的电子，即使处于能量最低的状态，其动能也不为零。'));
  node('quantumGlossaryViewBtn').click();
  assert.ok(node('quantumGlossaryModuleTitle').textContent.startsWith('QM8'),'Tab return preserves chosen glossary module');
  // Each subject opens its own content, with no stale title, terms, or hidden panel.
  choose(node('courseNav'),'course','electro');node('glossaryViewBtn').click();
  assert.equal(node('quantumGlossary').hidden,true);assert.equal(node('electroGlossary').hidden,false);
  assert.ok(node('glossaryModuleTitle').textContent.startsWith('ED1'));
  assert.ok(node('electroGlossary').textContent.includes('116 个中英词条'));
  choose(node('electroGlossary'),'glossary-module','ED8');
  choose(node('courseNav'),'course','quantum');node('quantumGlossaryViewBtn').click();
  assert.ok(node('quantumGlossaryModuleTitle').textContent.startsWith('QM1'),'Entering the old well locates QM1');
  choose(node('courseNav'),'course','mechanics');
  assert.equal(node('quantumGlossary').hidden,true);assert.equal(node('electroGlossary').hidden,true);
  assert.equal(node('quantumTools').hidden,true);assert.equal(node('electroTools').hidden,true);
  assert.equal(node('lessonLayout').hidden,true);assert.equal(node('mechanicsMap').hidden,false);
  assert.equal(app.serialized(),saved,'Lookup, navigation and theme must not alter learning records');
  assert.equal(node('xpText').textContent,'200');assert.equal(node('progressText').textContent,'1 / 128');
  const reload=boot(app.snapshot(),{theme:app.theme()});
  choose(reload.node('courseNav'),'course','quantum');reload.node('quantumDemoViewBtn').click();
  assert.equal(reload.node('reflection').value,'原势阱笔记');
  assert.deepEqual(reload.snapshot(),original);
}
console.log('PASS quantum glossary: 123 bilingual entries, all 32 lesson references, Chinese/English reading locators, original definitions/conventions, three-tab keyboard/focus, both themes, preserved controls/draft/storage, cross-course isolation and reload.');
