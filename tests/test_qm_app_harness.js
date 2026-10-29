/* Real page scripts with isolated fictitious storage, not a real browser.
 * Each control gets min/default/max (and every selector option), plus coupled
 * all-min/all-max and branch sweeps. This is not a full Cartesian sweep.
 */
const assert=require('node:assert/strict');
const {boot}=require('./test_app_harness.js');
const button=(root,key,value)=>{const node=root.querySelectorAll('[data-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())+']').find(e=>e.dataset[key]===value);assert.ok(node,`${key}=${value}`);return node;};
function open(app,mapId){app.node('quantumMapViewBtn').click();button(app.node('quantumMap'),'module',mapId.split('.')[0]).click();button(app.node('quantumMap'),'openLesson',mapId).click();}
function exercise(index){
 const lessons=require(`../assets/js/lessons/qm${index}-lessons.js`);
 for(const theme of ['day','night']){
  const original={lessons:{electro:{predict:true,derive:true,note:'保留原高斯笔记'},quantum:{predict:true,derive:false,note:'保留势阱笔记'}}},app=boot(original,{theme}),node=app.node;
  button(node('courseNav'),'course','quantum').click();const initial=app.serialized();
  for(const lesson of lessons){
   open(app,lesson.mapId);assert.equal(node('lessonTitle').textContent,lesson.title);if(lesson.id==='quantum')assert.ok(node('lessonIntro').textContent.includes('这个盒子中的电子，即使处于能量最低的状态，其动能也不为零。'));else assert.equal(node('lessonIntro').textContent,lesson.intro);if(index>=5){assert.ok(lesson.intro.includes('？')&&lesson.intro.includes('先'));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);}assert.equal(node('lessonLayout').hidden,false);assert.equal(node('quantumDemoViewBtn').getAttribute('aria-selected'),'true');
   assert.ok(node('derivation').textContent.includes('研究生进阶'));assert.ok(node('modelNote').textContent.length>40);
   const beforeExploring=app.serialized();let samples=0;
   function verify(){samples++;assert.ok(!/NaN|Infinity|undefined/.test(node('metrics').textContent+node('fieldTable').textContent));assert.ok(app.paintedText.length>0);if(theme==='day')assert.ok(app.paintedText.every(t=>t.color==='#000000'));else assert.ok(app.paintedText.some(t=>t.color!=='#000000'));app.clearPaintedText();}
   function set(c,value){const e=node('slider-'+c.id);e.value=value;e.fire(c.type==='select'?'change':'input');verify();}
   verify();
   for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])set(c,value);set(c,c.value);}
   for(const end of ['min','max'])for(const c of lesson.controls)set(c,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]);
   for(const c of lesson.controls)set(c,c.value);
   if(lesson.mapId==='QM2.2'){set(lesson.controls.find(c=>c.id==='kind'),1);set(lesson.controls.find(c=>c.id==='theta'),0);set(lesson.controls.find(c=>c.id==='outcome'),1);assert.ok(node('metrics').textContent.includes('零概率'));}
   if(lesson.mapId==='QM3.3')for(const kind of [0,1,2]){set(lesson.controls.find(c=>c.id==='kind'),kind);for(const k of [-3,0,3])set(lesson.controls.find(c=>c.id==='k0'),k);}
   if(lesson.mapId==='QM4.1'){set(lesson.controls.find(c=>c.id==='z0'),.2);set(lesson.controls.find(c=>c.id==='level'),6);assert.ok(node('fieldTable').textContent.includes('请求序号不存在'));}
   if(index>=5){const setById=(key,value)=>set(lesson.controls.find(c=>c.id===key),value);
    if(lesson.mapId==='QM6.2'){setById('theta',0);setById('beta',0);setById('outcome',1);assert.ok(node('metrics').textContent.includes('零概率'));}
    if(lesson.mapId==='QM7.2'){setById('n',1);setById('l',3);setById('m',3);assert.ok(node('fieldTable').textContent.includes('请求不合法'));}
    if(lesson.mapId==='QM7.3'){for(const mode of [0,2]){setById('mode',mode);setById('spin',1);setById('overlap',1);assert.ok(node('metrics').textContent.includes('禁止'));}}
    if(lesson.mapId==='QM8.1'){setById('g',0);assert.ok(node('fieldTable').textContent.includes('未定义'));}
    if(lesson.mapId==='QM8.3'){setById('depth',0);setById('point',0);assert.ok(node('fieldTable').textContent.includes('未定义'));}
    if(lesson.mapId==='QM8.4'){setById('g',.5);setById('nu',1);setById('time',20);assert.ok(node('metrics').textContent.includes('谨慎'));setById('allowed',1);assert.ok(node('metrics').textContent.includes('0'));}
    for(const c of lesson.controls)set(c,c.value);
   }
   assert.equal(app.serialized(),beforeExploring,'Parameters must not write records');
   const noWrite=app.serialized(),first=node('slider-'+lesson.controls[0].id);node('reflection').value=lesson.mapId+' 未保存草稿';
   node('quantumGlossaryViewBtn').click();node('quantumMapViewBtn').click();node('quantumDemoViewBtn').click();assert.equal(node('slider-'+lesson.controls[0].id),first);assert.equal(node('reflection').value,lesson.mapId+' 未保存草稿');assert.equal(app.serialized(),noWrite);
   let xp=Number(node('xpText').textContent);
   for(const [prefix,q,field] of [['prediction',lesson.prediction,'predict'],['derive',lesson.derive,'derive']]){
    const done=Boolean(app.snapshot().lessons[lesson.id]?.[field]);
    const wrong=node(prefix+'Options').querySelectorAll('[data-option]')[(q.correct+1)%q.options.length];wrong.click();assert.equal(Number(node('xpText').textContent),xp);
    const right=node(prefix+'Options').querySelectorAll('[data-option]')[q.correct];right.click();right.click();if(!done)xp+=50;assert.equal(Number(node('xpText').textContent),xp);
   }
   node('saveNoteBtn').click();assert.equal(app.snapshot().lessons[lesson.id].note,lesson.mapId+' 未保存草稿');assert.ok(samples>=lesson.controls.length*3);
  }
  assert.deepEqual(app.snapshot().lessons.electro,original.lessons.electro);assert.ok(!('QM1.1' in app.snapshot().lessons));node('exportBtn').click();
  for(const lesson of lessons)assert.ok(app.blobs[0].includes(lesson.mapId+' 未保存草稿'));
  const reload=boot(app.snapshot(),{theme});button(reload.node('courseNav'),'course','quantum').click();for(const lesson of lessons){open(reload,lesson.mapId);assert.equal(reload.node('reflection').value,lesson.mapId+' 未保存草稿');}
 }
 console.log(`PASS QM${index} app: four launchers, both themes, control endpoints/defaults and branch combinations, finite drawing, zero probabilities, tabs/drafts, scoring, legacy records, export/reload.`);
}
module.exports={exercise};
