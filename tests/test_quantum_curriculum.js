/* Read-only curriculum and UI regression with deterministic fictitious storage.
 * Runs actual page scripts, not a real browser; no user learning records are read.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const data = require('../assets/js/data/quantum-curriculum.js');
const {boot} = require('./test_app_harness.js');
const modules = new Map(data.modules.map(m => [m.id,m]));
const lessons = new Map(data.modules.flatMap(m => m.lessons).map(l => [l.id,l]));
assert.equal(modules.size,8);
assert.equal(lessons.size,32);
assert.ok(data.teachingApproach.includes('32关')&&!data.teachingApproach.includes('31个待开发'));
assert.deepEqual([...lessons.keys()],Array.from({length:8},(_,i) => Array.from({length:4},(_,j) => `QM${i+1}.${j+1}`)).flat());
function validateGraph(nodes, dependencies) {
  const active = new Set(), done = new Set();
  function visit(id) {
    assert.ok(nodes.has(id),'Missing dependency '+id);
    assert.ok(!active.has(id),'Dependency cycle through '+id);
    if(done.has(id))return;
    active.add(id);
    dependencies(nodes.get(id)).forEach(visit);
    active.delete(id);done.add(id);
  }
  nodes.forEach((_,id) => visit(id));
}
validateGraph(modules,m => m.requires.map(r => r.id));
validateGraph(modules,m => [...m.requires,...m.recommended].map(r => r.id));
validateGraph(lessons,l => l.requires);
const sources = new Map(data.sources.map(s => [s.id,s]));
assert.ok(sources.get('ttm').url.startsWith('https://theoreticalminimum.com/'));
assert.ok(sources.get('griffiths').use.includes('第三版'));
const route = new Set();
for(const id of data.route){
  assert.ok(modules.has(id));assert.ok(!route.has(id));
  modules.get(id).requires.forEach(r => assert.ok(route.has(r.id),'Invalid route: '+r.id+' -> '+id));
  route.add(id);
}
assert.equal(route.size,8);
for(const m of data.modules){
  assert.equal(m.lessons.length,4);
  for(const key of ['question','outcome','assumptions','misconception','mastery','transfer'])assert.ok(m[key],m.id+' missing '+key);
  m.tools.forEach(id => assert.ok(data.bridges.some(b => b.id===id),'Missing bridge '+id));
  m.readings.forEach(([source,locator]) => {assert.ok(sources.has(source));assert.ok(locator);});
  [...m.requires,...m.recommended].forEach(r => assert.ok(r.reason));
  for(const l of m.lessons){
    for(const key of ['question','experiment','derivation','acceptance','model','graduateTask'])assert.ok(l[key],l.id+' missing '+key);
    assert.ok(['planned','available'].includes(l.status));
    if(l.status==='planned')assert.ok(!l.implementationId,'Planned lesson cannot claim a runnable implementation');
  }
}
function ancestors(id,nodes,dependencies,found=new Set()) {
  dependencies(nodes.get(id)).forEach(parent => {if(!found.has(parent)){found.add(parent);ancestors(parent,nodes,dependencies,found);}});
  return found;
}
for(const [id,excluded] of [['QM5','QM4'],['QM6','QM5'],['QM8','QM7']]){
  assert.ok(!ancestors(id,modules,m => m.requires.map(r => r.id)).has(excluded));
  assert.ok(![...ancestors(id+'.1',lessons,l => l.requires)].some(l => l.startsWith(excluded+'.')),'Hidden lesson dependency on optional branch');
}
const available = [...lessons.values()].filter(l => l.status==='available');
assert.equal(available.length,32);assert.equal(available[0].id,'QM1.1');
assert.equal(available[0].implementationId,'quantum');assert.equal(available[0].legacyLessonId,'quantum');
assert.ok(available[0].implementationNote.includes('归一化'));
assert.equal(available[31].id,'QM8.4');
// Document and UI both expose every lesson, including the implementation boundary.
const doc = fs.readFileSync(path.join(__dirname,'../docs/QUANTUM_MECHANICS_MAP.md'),'utf8');
for(const id of lessons.keys())assert.ok(doc.includes('#### '+id+' '),'Missing documented lesson '+id);
for(const source of data.sources)assert.ok(doc.includes(source.url));
const byData = (root,key,value) => {
  const node = root.querySelectorAll('[data-'+key+']').find(e => e.attrs['data-'+key]===value);
  assert.ok(node,'Missing '+key+'='+value);return node;
};
for(const theme of ['day','night']){
  const original = {lessons:{quantum:{predict:true,derive:false,note:'原势阱学习笔记'},electro:{predict:true,derive:true,note:'原电动力学笔记'}}};
  const app = boot(original,{theme}),node=app.node;
  const before = app.serialized();
  byData(node('courseNav'),'course','quantum').click();
  assert.equal(node('quantumMap').hidden,false);
  assert.equal(node('electroMap').hidden,true);
  assert.equal(node('lessonLayout').hidden,true);
  assert.equal(node('electroGlossary').hidden,true);
  assert.equal(node('electroTools').hidden,true);
  assert.equal(node('quantumMapViewBtn').getAttribute('aria-controls'),'quantumMap');
  assert.equal(node('quantumTools').getAttribute('aria-label'),'量子力学视图');
  assert.ok(node('quantumMap').textContent.includes('32 个关卡设计 · 32 个已有示范'));
  assert.equal(node('progressText').textContent,'1 / 128');assert.equal(node('xpText').textContent,'150');
  assert.equal(node('quantumMap').querySelectorAll('.quantum-graph-lesson').length,0);
  for(const m of data.modules){
    byData(node('quantumMap'),'module',m.id).click();
    assert.equal(app.document.activeElement,node('quantumModuleDetailTitle'));
    for(const l of m.lessons){
      const row=node('lesson-'+l.id);
      assert.ok(row.textContent.includes(l.model));
      assert.ok(row.textContent.includes(l.graduateTask));
      assert.equal(row.querySelectorAll('[data-open-lesson]').length,0);
    }
    const panel=node('quantumGraphLessons-'+m.id);
    assert.equal(panel.hidden,false);
    assert.equal(panel.querySelectorAll('[data-open-lesson]').length,4);
    assert.equal(node('quantumMap').querySelectorAll('.quantum-graph-lesson').length,4);
    assert.equal(node('quantumGraphNode-'+m.id).getAttribute('aria-expanded'),'true');
    for(const l of m.lessons){
      const launcher=byData(panel,'open-lesson',l.id);
      assert.ok(launcher.textContent.includes(l.title));
      launcher.click();
      assert.equal(node('quantumMap').hidden,true);
      assert.equal(node('lessonLayout').hidden,false);
      const lesson=require('../assets/js/lessons/qm'+m.id.slice(2)+'-lessons.js').find(item=>item.mapId===l.id);
      assert.equal(node('lessonTitle').textContent,lesson.title);
      node('quantumMapViewBtn').click();
    }
    // Graph selection keeps keyboard focus and the user's scroll position.
    node('quantumGraphScroll').scrollTop=120;
    node('quantumGraphScroll').scrollLeft=25;
    node('quantumGraphNode-'+m.id).click();
    assert.equal(node('quantumGraphLessons-'+m.id).hidden,true);
    assert.equal(node('quantumGraphNode-'+m.id).getAttribute('aria-expanded'),'false');
    assert.equal(app.document.activeElement,node('quantumGraphNode-'+m.id));
    assert.equal(node('quantumGraphScroll').scrollTop,120);
    assert.equal(node('quantumGraphScroll').scrollLeft,25);
    node('quantumGraphNode-'+m.id).click();
    assert.equal(node('quantumGraphLessons-'+m.id).hidden,false);
  }
  byData(node('quantumMap'),'module','QM7').click();
  byData(node('quantumMap'),'prerequisite','QM4.1').click();
  assert.equal(node('lesson-QM4.1').open,true);
  assert.equal(app.document.activeElement,node('lesson-QM4.1').querySelector('summary'));
  assert.equal(app.serialized(),before,'Browsing must not write progress');
  byData(node('quantumMap'),'open-lesson','QM1.1').click();
  assert.equal(node('quantumMap').hidden,true);assert.equal(node('lessonLayout').hidden,false);
  assert.equal(node('lessonTitle').textContent,'从驻波到量子化能级');
  assert.equal(node('reflection').value,'原势阱学习笔记');
  const slider=node('slider-L');slider.value=2.3;slider.fire('input');
  node('reflection').value='未保存的量子笔记';
  for(const [from,key,to] of [
    ['quantumDemoViewBtn','ArrowRight','quantumGlossaryViewBtn'],['quantumMapViewBtn','ArrowLeft','quantumGlossaryViewBtn'],
    ['quantumDemoViewBtn','Home','quantumMapViewBtn'],['quantumMapViewBtn','End','quantumGlossaryViewBtn']
  ]){
    node(from).fire('keydown',{key});
    assert.equal(app.document.activeElement,node(to));
    assert.equal(node(to).getAttribute('aria-selected'),'true');
  }
  node('themeToggle').click();
  node('quantumMapViewBtn').click();node('quantumDemoViewBtn').click();
  assert.equal(node('slider-L'),slider);assert.equal(slider.value,'2.3');
  assert.equal(node('reflection').value,'未保存的量子笔记');
  assert.equal(app.serialized(),before,'Tabs, parameters and themes must not write progress');
  // Answering the old well question updates only its old record, exactly once.
  const correct=node('deriveOptions').querySelectorAll('[data-option]')[1];correct.click();correct.click();
  assert.equal(node('xpText').textContent,'200');assert.equal(node('progressText').textContent,'2 / 128');
  assert.equal(app.snapshot().lessons.quantum.derive,true);
  assert.ok(!('QM1.1' in app.snapshot().lessons));
  node('quantumMapViewBtn').click();byData(node('quantumMap'),'module','QM1').click();
  assert.ok(node('lesson-QM1.1').textContent.includes('示范题完成'));
  node('quantumDemoViewBtn').click();node('exportBtn').click();
  assert.ok(app.blobs[0].includes('未保存的量子笔记'));
  assert.equal((app.blobs[0].match(/## 量子力学 · 从驻波到量子化能级/g)||[]).length,1);
  assert.ok(app.blobs[0].includes('2/128'));
  const reload=boot(app.snapshot(),{theme:app.theme()});
  byData(reload.node('courseNav'),'course','quantum').click();reload.node('quantumDemoViewBtn').click();
  assert.equal(reload.node('reflection').value,'未保存的量子笔记');
  assert.equal(reload.node('xpText').textContent,'200');
  byData(node('courseNav'),'course','electro').click();
  assert.equal(node('quantumMap').hidden,true);assert.equal(node('electroMap').hidden,false);
  assert.equal(node('electroTools').hidden,false);
  node('demoViewBtn').fire('keydown',{key:'ArrowRight'});
  assert.equal(node('electroGlossary').hidden,false);
  byData(node('courseNav'),'course','thermal').click();
  assert.equal(node('quantumMap').hidden,true);assert.equal(node('electroTools').hidden,true);assert.equal(node('quantumTools').hidden,true);
  assert.equal(node('thermalMap').hidden,false);assert.equal(node('lessonLayout').getAttribute('role'),'tabpanel');
}
console.log('PASS quantum: 8 modules / 32 designs, 32 demos with 1 legacy binding, dependency DAGs and independent branches, source/doc consistency, day/night three-tab keyboard, preserved controls/draft, old records, scoring, export and reload.');
