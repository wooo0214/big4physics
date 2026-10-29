/* Actual page scripts, isolated synthetic storage; never opens a user browser. */
const assert=require('node:assert/strict');
const {boot,openLesson}=require('./test_app_harness.js');
const lessons=require('../assets/js/lessons/ed3-lessons.js');
const initial={lessons:{mechanics:{predict:true,derive:true,note:'原单摆记录'},electro:{predict:true,derive:true,note:'原高斯记录'},'ED2.3':{predict:true,derive:false,note:'ED2 保留'}}};
const app=boot(initial);
function button(node,key,value){const b=node.querySelectorAll('[data-'+key+']').find(e=>e.attrs['data-'+key]===value);assert.ok(b,'Missing '+key+'='+value);return b;}
assert.equal(app.node('progressText').textContent,'2 / 128');assert.equal(app.node('xpText').textContent,'250');
button(app.node('courseNav'),'course','electro').click();
assert.ok(app.node('electroMap').textContent.includes('32 个已有示范'));
button(app.node('electroMap'),'module','ED3').click();
for(const lesson of lessons){
 app.node('mapViewBtn').click();button(app.node('electroMap'),'open-lesson',lesson.id).click();
 assert.equal(app.node('lessonTitle').textContent,lesson.title);
 assert.equal(app.node('electroMap').hidden,true);assert.equal(app.node('lessonLayout').hidden,false);
 assert.equal(app.node('demoViewBtn').getAttribute('aria-selected'),'true');
 // All endpoints/default combinations in each theme, plus selector modes.
 for(const theme of ['day','night']){
  if(app.document.documentElement.getAttribute('data-theme')!==theme)app.node('themeToggle').click();
  function sweep(index){
   if(index===lesson.controls.length){
    for(const id of ['metrics','fieldTable'])assert.ok(!/NaN|Infinity/.test(app.node(id).textContent));
    assert.ok(app.paintedText.length>0);
    if(theme==='day')assert.ok(app.paintedText.every(item=>item.color==='#000000'));
    else assert.ok(app.paintedText.some(item=>item.color!=='#000000'));
    app.clearPaintedText();return;
   }
   const c=lesson.controls[index],input=app.node('slider-'+c.id);
   for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])]){
    input.value=value;input.fire(c.type==='select'?'change':'input');sweep(index+1);
   }
  }
  app.clearPaintedText();sweep(0);
 }
 let xp=Number(app.node('xpText').textContent);
 for(const [prefix,q] of [['prediction',lesson.prediction],['derive',lesson.derive]]){
  app.node(prefix+'Options').querySelectorAll('[data-option]')[(q.correct+1)%q.options.length].click();
  assert.equal(Number(app.node('xpText').textContent),xp);
  const right=app.node(prefix+'Options').querySelectorAll('[data-option]')[q.correct];right.click();right.click();
  xp+=50;assert.equal(Number(app.node('xpText').textContent),xp);
 }
 app.node('reflection').value=lesson.id+' 检查笔记';app.node('saveNoteBtn').click();
}
assert.equal(app.node('progressText').textContent,'6 / 128');assert.equal(app.node('xpText').textContent,'650');
for(const key of Object.keys(initial.lessons))assert.deepEqual(app.snapshot().lessons[key],initial.lessons[key]);
const recordsBeforeExploring=app.serialized();
function setControl(id,value){const e=app.node('slider-'+id);e.value=value;e.fire('input');}
openLesson(app,'ED3.1');setControl('offset',1);
assert.ok(app.node('metrics').textContent.includes('未定义'));assert.ok(app.node('fieldTable').textContent.includes('无定义'));
openLesson(app,'ED3.2');setControl('z',0);
assert.ok(app.node('metrics').textContent.includes('无定义'));setControl('current',0);
assert.ok(app.node('metrics').textContent.includes('0 μT'));
openLesson(app,'ED3.3');setControl('gauge',0);
assert.ok(!/NaN|Infinity/.test(app.node('fieldTable').textContent));
openLesson(app,'ED3.4');setControl('angle',180);
assert.ok(app.node('metrics').textContent.includes('0 μN·m'));
assert.equal(app.serialized(),recordsBeforeExploring,'Browsing and changing controls must not write learning records.');
app.node('exportBtn').click();
for(const lesson of lessons)assert.ok(app.blobs[0].includes(lesson.id+' 检查笔记'));
assert.ok(app.blobs[0].includes('原高斯记录'));assert.ok(app.blobs[0].includes('6/128'));
const reload=boot(app.snapshot(),{theme:app.theme()});
assert.equal(reload.node('progressText').textContent,'6 / 128');assert.equal(reload.node('xpText').textContent,'650');
button(reload.node('courseNav'),'course','electro').click();button(reload.node('electroMap'),'module','ED3').click();
assert.equal(reload.node('electroMap').querySelectorAll('.available').filter(e=>e.textContent==='示范题完成').length,4);
openLesson(reload,'ED3.3');assert.equal(reload.node('reflection').value,'ED3.3 检查笔记');
button(reload.node('courseNav'),'course','quantum').click();assert.equal(reload.node('electroTools').hidden,true);
console.log('PASS ED3 app: map launchers and tabs, Cartesian control combinations in both themes, finite drawing, black day text, quiz/XP, old records, notes/export/reload. Real browser layout requires separate inspection.');
