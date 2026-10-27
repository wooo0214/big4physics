/* Regression coverage for the third tab, terminology and graduate self-assessment.
 * Isolated DOM/storage only. Real browser layout is checked separately.
 */
const assert=require('node:assert/strict');
const data=require('../assets/js/data/electrodynamics-glossary.js');
const curriculum=require('../assets/js/data/electrodynamics-curriculum.js');
const {boot,openLesson}=require('./test_app_harness.js');
const implementations=Array.from({length:8},(_,i)=>require(`../assets/js/lessons/ed${i+1}-lessons.js`)).flat();
const allLessons=curriculum.modules.flatMap(m=>m.lessons.map(l=>l.id));
const covered=new Set();
assert.deepEqual(data.modules.map(m=>m.id),curriculum.modules.map(m=>m.id));
let count=0;
for(const m of data.modules){
  assert.ok(m.terms.length>=12,m.id+' needs broad conceptual coverage');
  assert.equal(new Set(m.terms.map(t=>t.zh)).size,m.terms.length);
  assert.ok(m.readings.some(([key])=>key==='wang'));
  assert.ok(m.readings.some(([key])=>key==='zangwill'));
  for(const [key,locator] of m.readings){assert.ok(data.sources[key]);assert.ok(locator);assert.ok(data.sources[key].url.startsWith('https://'));}
  for(const t of m.terms){
    for(const field of ['zh','en','symbol','definition','caveat'])assert.ok(t[field],m.id+' missing '+field);
    assert.ok(/[A-Za-z]/.test(t.en));
    assert.ok(t.lessons.length>0);
    for(const id of t.lessons){assert.ok(allLessons.includes(id));assert.ok(id.startsWith(m.id+'.'));covered.add(id);}
    count++;
  }
}
assert.equal(count,116);
assert.deepEqual([...covered].sort(),[...allLessons].sort());
const unlocalized=/\b(?:boost|Lorenz|Lorentz|Minkowski|Larmor|Fresnel|Coulomb|Poynting|Maxwell|Faraday|Ampère|Biot|Savart|Gauss|Stokes|Green|Poisson|Laplace|Dirichlet|Neumann|RMS|PDE|e-fold|Simpson|curl)\b/;
function checkText(value){
  if(typeof value==='string'&&!value.startsWith('https://'))assert.ok(!unlocalized.test(value),'Unlocalized teaching term: '+value);
  else if(Array.isArray(value))value.forEach(checkText);
  else if(value&&typeof value==='object')Object.values(value).forEach(checkText);
}
checkText(implementations);checkText(curriculum);
assert.ok(implementations.every(l=>l.graduate?.task&&l.graduate?.check));
const initial={lessons:{electro:{predict:true,derive:true,note:'原高斯面笔记'},'ED8.1':{predict:true,derive:false,note:'原相对论笔记'}}};
const app=boot(initial),node=app.node;
node('courseNav').querySelectorAll('[data-course]').find(b=>b.dataset.course==='electro').click();
const stored=app.serialized();
const views=[['mapViewBtn','electroMap'],['demoViewBtn','lessonLayout'],['glossaryViewBtn','electroGlossary']];
function assertView(tab){
  views.forEach(([button,panel])=>{
    assert.equal(node(button).getAttribute('aria-selected'),String(button===tab));
    assert.equal(node(button).getAttribute('tabindex'),button===tab?'0':'-1');
    assert.equal(node(panel).hidden,button!==tab);
  });
}
for(const id of allLessons){
  openLesson(app,id);assertView('demoViewBtn');
  assert.ok(node('derivation').textContent.includes('研究生进阶'));
  assert.ok(node('derivation').textContent.includes('自检要点'));
  assert.ok(node('derivation').textContent.includes('不计入两道示范题'));
  node('glossaryViewBtn').click();assertView('glossaryViewBtn');
  assert.equal(node('electroGlossary').getAttribute('role'),'tabpanel');
  assert.equal(node('electroGlossary').getAttribute('aria-labelledby'),'glossaryViewBtn');
  assert.ok(node('glossaryModuleTitle').textContent.startsWith(id.split('.')[0]));
  assert.ok(node('electroGlossary').textContent.includes(id));
  node('demoViewBtn').click();assertView('demoViewBtn');
}
openLesson(app,'ED8.1');
node('slider-beta').value=.8;node('slider-beta').fire('input');
const slider=node('slider-beta');node('reflection').value='未保存的相对论推导';
node('glossaryViewBtn').click();
for(const m of data.modules){
  node('electroGlossary').querySelectorAll('[data-glossary-module]').find(b=>b.dataset.glossaryModule===m.id).click();
  const selected=node('electroGlossary').querySelectorAll('[data-glossary-module]').filter(b=>b.getAttribute('aria-pressed')==='true');
  assert.equal(selected.length,1);assert.equal(selected[0].dataset.glossaryModule,m.id);
  assert.equal(app.document.activeElement,selected[0],'Focus must survive selector redraw');
  assert.ok(node('electroGlossary').textContent.includes(m.terms[0].en));
}
for(const [from,key,to] of [
  ['glossaryViewBtn','ArrowRight','mapViewBtn'],['mapViewBtn','ArrowLeft','glossaryViewBtn'],
  ['glossaryViewBtn','ArrowLeft','demoViewBtn'],['demoViewBtn','ArrowRight','glossaryViewBtn'],
  ['glossaryViewBtn','Home','mapViewBtn'],['mapViewBtn','End','glossaryViewBtn']
]){
  node(from).fire('keydown',{key});assertView(to);assert.equal(app.document.activeElement,node(to));
}
node('themeToggle').click();assertView('glossaryViewBtn');
node('demoViewBtn').click();assert.equal(node('slider-beta'),slider);
assert.equal(slider.value,'0.8');assert.equal(node('reflection').value,'未保存的相对论推导');
assert.equal(app.serialized(),stored,'Browsing, glossary and themes must not change learning records');
app.clearPaintedText();
for(const id of allLessons)openLesson(app,id);
app.paintedText.forEach(t=>assert.ok(!unlocalized.test(t.text),'Canvas term: '+t.text));
node('courseNav').querySelectorAll('[data-course]').find(b=>b.dataset.course==='thermal').click();
assert.equal(node('electroGlossary').hidden,true);assert.equal(node('electroTools').hidden,true);
assert.equal(node('glossaryViewBtn').getAttribute('aria-selected'),'false');
assert.equal(node('lessonLayout').hidden,false);
console.log('PASS glossary: 116 bilingual terms, 32 sections, textbook locators, Chinese teaching text/Canvas, graduate self-checks, three-tab keyboard/focus, unchanged controls/draft/progress and other courses.');
