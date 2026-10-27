/* Executes the actual local scripts against a small DOM/canvas adapter.
 * This checks wiring, controls, persistence and export without opening a
 * browser. It does not verify browser layout, rendering fidelity or Safari.
 */
const assert=require('node:assert/strict');
const lessons=require('../assets/js/lessons/ed1-lessons.js');
const {boot,openLesson}=require("./test_app_harness.js");
const original={lessons:{mechanics:{predict:true,derive:true,note:'旧单摆笔记'},electro:{predict:true,derive:true,note:'旧高斯面笔记'}}};
const app=boot(original);
const byData=(root,attribute,value)=>{const item=root.querySelectorAll('[data-'+attribute+']').find(e=>e.attrs['data-'+attribute]===value);assert.ok(item,`Missing ${attribute}=${value}`);return item;};
assert.equal(app.node('progressText').textContent,'2 / 35');assert.equal(app.node('xpText').textContent,'200');
byData(app.node('courseNav'),'course','electro').click();
assert.equal(app.node('electroMap').hidden,false);assert.equal(app.node('lessonLayout').hidden,true);
assert.ok(app.node('electroMap').textContent.includes('32 个已有示范'));
// All map launchers use a stable lesson ID and route into the shared page.
for(const id of ['ED1.1','ED1.2','ED1.3','ED1.4']){
  app.node('mapViewBtn').click();byData(app.node('electroMap'),'open-lesson',id).click();
  assert.equal(app.node('electroMap').hidden,true);assert.equal(app.node('lessonLayout').hidden,false);
  assert.equal(app.node('demoViewBtn').getAttribute('aria-selected'),'true');
}
for(const lesson of lessons){
  openLesson(app,lesson.id);
  assert.equal(app.node('lessonTitle').textContent,lesson.title);
  for(const control of lesson.controls){
    const input=app.node('slider-'+control.id);
    for(const value of control.type==='select'?[0,1]:[control.min,control.max,control.value]){
      input.value=value;input.fire(control.type==='select'?'change':'input');
      assert.ok(!app.node('metrics').textContent.includes('NaN'));
    }
  }
  const before=Number(app.node('xpText').textContent);
  const wrong=app.node('predictionOptions').querySelectorAll('[data-option]')[1];wrong.click();
  assert.equal(Number(app.node('xpText').textContent),before);assert.ok(app.node('predictionFeedback').textContent.includes('还不对'));
  const right=app.node('predictionOptions').querySelectorAll('[data-option]')[0];right.click();right.click();
  assert.equal(Number(app.node('xpText').textContent),before+50,'Repeated correct clicks must not duplicate XP');
  app.node('deriveOptions').querySelectorAll('[data-option]')[0].click();
  assert.equal(Number(app.node('xpText').textContent),before+100);
  app.node('reflection').value=lesson.id+' 新笔记';app.node('reflection').fire('change');
}
openLesson(app,'ED1.1');
app.node('slider-sampleX').value=-.6;app.node('slider-sampleX').fire('input');
app.node('slider-sampleY').value=0;app.node('slider-sampleY').fire('input');
assert.ok(app.node('metrics').textContent.includes('排除区'));
assert.ok(app.node('fieldTable').textContent.includes('未定义'));
assert.equal(app.node('progressText').textContent,'5 / 35');assert.equal(app.node('xpText').textContent,'500');
assert.deepEqual(app.snapshot().lessons.electro,original.lessons.electro);
assert.deepEqual(app.snapshot().lessons.mechanics,original.lessons.mechanics);
app.node('exportBtn').click();
assert.ok(app.blobs[0].includes('旧高斯面笔记'));assert.ok(app.blobs[0].includes('ED1.4 新笔记'));assert.ok(app.blobs[0].includes('5/35'));
const reloaded=boot(app.snapshot());assert.equal(reloaded.node('progressText').textContent,'5 / 35');assert.equal(reloaded.node('xpText').textContent,'500');
byData(reloaded.node('courseNav'),'course','electro').click();
assert.ok(reloaded.node('electroMap').textContent.includes('示范题完成'));
byData(reloaded.node('courseNav'),'course','thermal').click();
assert.equal(reloaded.node('electroTools').hidden,true);assert.equal(reloaded.node('lessonLayout').hidden,false);
assert.ok(app.drawCount()>100,'Expected finite canvas drawing calls');
console.log('PASS ED1 app adapter: four map launchers, view switching, controls, finite drawing values, masking, correct/incorrect answers, no duplicate XP, legacy progress, notes/export and reload persistence. Browser layout not tested.');

// Appearance changes must redraw every diagram without mutating learning records.
const themed=boot(original);
assert.equal(themed.document.documentElement.getAttribute('data-theme'),'day');
assert.equal(themed.node('themeToggle').getAttribute('aria-checked'),'true');
const learningBefore=themed.serialized();
themed.node('themeToggle').click();
assert.equal(themed.document.documentElement.getAttribute('data-theme'),'night');
assert.equal(themed.node('themeToggle').getAttribute('aria-checked'),'false');
assert.equal(themed.theme(),'night');
assert.equal(themed.serialized(),learningBefore);
themed.node('themeToggle').click();
assert.equal(themed.document.documentElement.getAttribute('data-theme'),'day');
assert.equal(themed.node('themeToggle').getAttribute('aria-checked'),'true');
assert.equal(themed.node('themeToggle').getAttribute('aria-label'),'切换到夜间模式');
assert.equal(themed.theme(),'day');
assert.equal(themed.serialized(),learningBefore);
// Check black Canvas text in all thirty-five lesson renderers, including ED2 heatmap labels.
const assertBlack=()=>{
  assert.ok(themed.paintedText.length>0);
  assert.ok(themed.paintedText.every(item=>item.color==='#000000'),'Day Canvas text must be black');
};
for(const course of ['mechanics','thermal','quantum','electro']){
  themed.clearPaintedText();byData(themed.node('courseNav'),'course',course).click();assertBlack();
}
for(const id of ['ED1.1','ED1.2','ED1.3','ED1.4','ED2.1','ED2.2','ED2.3','ED2.4','ED3.1','ED3.2','ED3.3','ED3.4','ED4.1','ED4.2','ED4.3','ED4.4','ED5.1','ED5.2','ED5.3','ED5.4','ED6.1','ED6.2','ED6.3','ED6.4','ED7.1','ED7.2','ED7.3','ED7.4','ED8.1','ED8.2','ED8.3','ED8.4']){
  themed.clearPaintedText();openLesson(themed,id);assertBlack();
}
assert.equal(themed.serialized(),learningBefore);
const dayReload=boot(themed.snapshot(),{theme:themed.theme()});
assert.equal(dayReload.document.documentElement.getAttribute('data-theme'),'day');
assert.equal(dayReload.node('themeLabel').textContent,'日间模式');
dayReload.clearPaintedText();dayReload.node('themeToggle').click();
assert.equal(dayReload.document.documentElement.getAttribute('data-theme'),'night');
assert.equal(dayReload.theme(),'night');
assert.ok(dayReload.paintedText.some(item=>item.color!=='#000000'),'Night text palette must be restored');
for(const preference of [null,'day','invalid'])assert.equal(boot(original,{theme:preference}).document.documentElement.getAttribute('data-theme'),'day');
assert.equal(boot(original,{theme:'night'}).document.documentElement.getAttribute('data-theme'),'night');
const blocked=boot(original,{blockReads:true,blockWrites:true});
assert.equal(blocked.document.documentElement.getAttribute('data-theme'),'day');
blocked.node('themeToggle').click();
assert.equal(blocked.document.documentElement.getAttribute('data-theme'),'night');
assert.equal(blocked.node('themeToggle').getAttribute('aria-checked'),'false');
assert.ok(blocked.node('themeLabel').textContent.includes('未保存'));
console.log('PASS theme: default day, saved night preference, day/night toggle and redraw, black labels in 35 lessons, theme reload, unchanged progress, invalid preference and blocked storage.');

// Tabs must preserve the current experiment, controls, pending note and storage.
const tabs=boot(original);
byData(tabs.node('courseNav'),'course','electro').click();
assert.equal(tabs.document.getElementById('electroLessonButtons'),null);
assert.equal(tabs.document.querySelectorAll('[data-demo]').length,0);
assert.equal(tabs.node('mapViewBtn').getAttribute('role'),'tab');
assert.equal(tabs.node('mapViewBtn').getAttribute('aria-selected'),'true');
assert.equal(tabs.node('mapViewBtn').getAttribute('tabindex'),'0');
assert.equal(tabs.node('electroMap').hidden,false);assert.equal(tabs.node('lessonLayout').hidden,true);
openLesson(tabs,'ED3.3');
const gaugeInput=tabs.node('slider-gauge');gaugeInput.value=4;gaugeInput.fire('input');
tabs.node('reflection').value='切换标签时保留的待保存笔记';
const tabState=tabs.serialized();
for(let i=0;i<3;i++){
 tabs.node('mapViewBtn').click();
 assert.equal(tabs.node('electroMap').hidden,false);assert.equal(tabs.node('lessonLayout').hidden,true);
 assert.equal(tabs.node('mapViewBtn').getAttribute('aria-selected'),'true');
 tabs.node('demoViewBtn').click();
 assert.equal(tabs.node('electroMap').hidden,true);assert.equal(tabs.node('lessonLayout').hidden,false);
 assert.equal(tabs.node('demoViewBtn').getAttribute('aria-selected'),'true');
 assert.equal(tabs.node('demoViewBtn').getAttribute('tabindex'),'0');
 assert.equal(tabs.node('mapViewBtn').getAttribute('tabindex'),'-1');
 assert.equal(tabs.node('lessonLayout').getAttribute('role'),'tabpanel');
 assert.equal(tabs.node('lessonLayout').getAttribute('aria-labelledby'),'demoViewBtn');
 assert.equal(tabs.node('slider-gauge').value,'4');
 assert.equal(tabs.node('reflection').value,'切换标签时保留的待保存笔记');
 assert.equal(tabs.serialized(),tabState);
}
for(const [from,key,to] of [['demoViewBtn','Home','mapViewBtn'],['mapViewBtn','ArrowRight','demoViewBtn'],['demoViewBtn','ArrowLeft','mapViewBtn'],['mapViewBtn','End','glossaryViewBtn']]){
 tabs.node(from).fire('keydown',{key});
 assert.equal(tabs.node(to).getAttribute('aria-selected'),'true');
 assert.equal(tabs.document.activeElement,tabs.node(to));
}
byData(tabs.node('courseNav'),'course','thermal').click();
assert.equal(tabs.node('electroTools').hidden,true);
assert.equal(tabs.node('lessonLayout').hidden,false);
assert.equal(tabs.node('lessonLayout').getAttribute('role'),'region');
assert.equal(tabs.node('lessonLayout').getAttribute('aria-labelledby'),'lessonTitle');
console.log('PASS tabs: no duplicate list, exclusive panels, selected/focus semantics, keyboard navigation, current parameters and pending note preserved, unchanged learning records, other courses unaffected.');
