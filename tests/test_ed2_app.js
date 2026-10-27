/* Actual-script UI checks with synthetic records; never opens a user browser. */
const assert=require('node:assert/strict');
const {boot,openLesson}=require('./test_app_harness.js');
const lessons=require('../assets/js/lessons/ed2-lessons.js');
const initial={lessons:{mechanics:{predict:true,derive:true,note:'旧笔记'},electro:{predict:true,derive:true,note:'高斯面记录'},'ED1.1':{predict:true,derive:false,note:'ED1 保留'}}};
const app=boot(initial);
function button(node,key,value){const b=node.querySelectorAll('[data-'+key+']').find(e=>e.dataset[key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]===value);assert.ok(b,`Missing ${key}=${value}`);return b;}
assert.equal(app.node('progressText').textContent,'2 / 35');assert.equal(app.node('xpText').textContent,'250');
button(app.node('courseNav'),'course','electro').click();
assert.ok(app.node('electroMap').textContent.includes('32 个已有示范'));
button(app.node('electroMap'),'module','ED2').click();
for(const lesson of lessons){
  app.node('mapViewBtn').click();button(app.node('electroMap'),'open-lesson',lesson.id).click();
  assert.equal(app.node('lessonTitle').textContent,lesson.title);
  assert.equal(app.node('electroMap').hidden,true);assert.equal(app.node('lessonLayout').hidden,false);
  assert.equal(app.node('demoViewBtn').getAttribute('aria-selected'),'true');
  // Full Cartesian product of endpoints/defaults, including all selector modes.
  function sweep(index){
    if(index===lesson.controls.length){for(const id of ['metrics','fieldTable'])assert.ok(!/NaN|Infinity/.test(app.node(id).textContent));return;}
    const c=lesson.controls[index],input=app.node('slider-'+c.id);
    for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])]){input.value=value;input.fire(c.type==='select'?'change':'input');sweep(index+1);}
  }
  sweep(0);
  let before=Number(app.node('xpText').textContent);
  for(const [prefix,question] of [['prediction',lesson.prediction],['derive',lesson.derive]]){
    app.node(prefix+'Options').querySelectorAll('[data-option]')[(question.correct+1)%question.options.length].click();
    assert.equal(Number(app.node('xpText').textContent),before);
    const right=app.node(prefix+'Options').querySelectorAll('[data-option]')[question.correct];right.click();right.click();
    before+=50;assert.equal(Number(app.node('xpText').textContent),before);
  }
  app.node('reflection').value=lesson.id+' 测试笔记';app.node('saveNoteBtn').click();
}
openLesson(app,'ED2.2');
for(const [id,value] of [['probeX',0],['probeZ',.8]]){app.node('slider-'+id).value=value;app.node('slider-'+id).fire('input');}
assert.ok(app.node('metrics').textContent.includes('遮罩'));assert.ok(app.node('fieldTable').textContent.includes('无定义'));
assert.equal(app.node('progressText').textContent,'6 / 35');assert.equal(app.node('xpText').textContent,'650');
for(const key of Object.keys(initial.lessons))assert.deepEqual(app.snapshot().lessons[key],initial.lessons[key]);
openLesson(app,'ED2.4');app.node('slider-angle').value=90;app.node('slider-angle').fire('input');
assert.ok(app.node('metrics').textContent.includes('无定义'));
app.node('exportBtn').click();for(const lesson of lessons)assert.ok(app.blobs[0].includes(lesson.id+' 测试笔记'));
assert.ok(app.blobs[0].includes('高斯面记录'));assert.ok(app.blobs[0].includes('6/35'));
const reload=boot(app.snapshot());assert.equal(reload.node('progressText').textContent,'6 / 35');assert.equal(reload.node('xpText').textContent,'650');
button(reload.node('courseNav'),'course','electro').click();button(reload.node('electroMap'),'module','ED2').click();
assert.equal(reload.node('electroMap').querySelectorAll('.available').filter(e=>e.textContent==='示范题完成').length,4);
openLesson(reload,'ED2.3');assert.equal(reload.node('reflection').value,'ED2.3 测试笔记');
button(reload.node('courseNav'),'course','quantum').click();assert.equal(reload.node('electroTools').hidden,true);
console.log('PASS ED2 app adapter: four map launchers and tabs, all control combinations, masks/nodes, both quiz outcomes, no duplicate XP, legacy records, note/export/reload, course switching. Real browser layout not checked.');
