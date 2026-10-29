/* Execute actual page scripts with fictitious storage only. */
const assert=require('node:assert/strict');
const {boot}=require('./test_app_harness.js');
const button=(root,key,value)=>{const node=root.querySelectorAll('[data-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())+']').find(e=>e.dataset[key]===value);assert.ok(node,`${key}=${value}`);return node;};
function open(app,id){app.node('mechanicsMapViewBtn').click();button(app.node('mechanicsMap'),'module',id.split('.')[0]).click();button(app.node('mechanicsMap'),'openLesson',id).click();}
function exercise(index){
 const lessons=require(`../assets/js/lessons/cm${index}-lessons.js`);
 for(const theme of ['day','night']){
  const old={lessons:{mechanics:{predict:true,derive:false,note:'旧单摆笔记'},electro:{predict:true,derive:true,note:'旧高斯笔记'},thermal:{predict:false,derive:true,note:'旧热统笔记'}}},app=boot(old,{theme}),node=app.node;
  button(node('courseNav'),'course','mechanics').click();
  for(const lesson of lessons){
   open(app,lesson.mapId);assert.equal(node('lessonTitle').textContent,lesson.title);assert.equal(node('lessonLayout').hidden,false);assert.equal(node('mechanicsDemoViewBtn').getAttribute('aria-selected'),'true');assert.ok(node('derivation').textContent.includes('研究生进阶'));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);
   const saved=app.serialized();
   function verify(){assert.ok(!/NaN|Infinity|undefined/.test(node('metrics').textContent+node('fieldTable').textContent));assert.ok(!node('fieldTable').hidden);assert.ok(app.paintedText.length>0);if(theme==='day')assert.ok(app.paintedText.every(x=>x.color==='#000000'));app.clearPaintedText();}
   verify();
   function set(c,v){node('slider-'+c.id).value=v;node('slider-'+c.id).fire(c.type==='select'?'change':'input');verify();}
   for(const c of lesson.controls){for(const v of [c.min,c.value,c.max])set(c,v);set(c,c.value);}
   for(const end of ['min','max'])for(const c of lesson.controls)set(c,c[end]);for(const c of lesson.controls)set(c,c.value);
   assert.equal(app.serialized(),saved,'Exploring must not save completion');
   const first=node('slider-'+lesson.controls[0].id);node('reflection').value=lesson.mapId+' 草稿';node('mechanicsGlossaryViewBtn').click();node('mechanicsMapViewBtn').click();node('mechanicsDemoViewBtn').click();assert.equal(node('slider-'+lesson.controls[0].id),first);assert.equal(node('reflection').value,lesson.mapId+' 草稿');assert.equal(app.serialized(),saved);
   let xp=Number(node('xpText').textContent);
   for(const [prefix,q,field] of [['prediction',lesson.prediction,'predict'],['derive',lesson.derive,'derive']]){const done=Boolean(app.snapshot().lessons[lesson.id]?.[field]);node(prefix+'Options').querySelectorAll('[data-option]')[(q.correct+1)%q.options.length].click();assert.equal(Number(node('xpText').textContent),xp);node(prefix+'Options').querySelectorAll('[data-option]')[q.correct].click();node(prefix+'Options').querySelectorAll('[data-option]')[q.correct].click();if(!done)xp+=50;assert.equal(Number(node('xpText').textContent),xp);}
   node('saveNoteBtn').click();assert.equal(app.snapshot().lessons[lesson.id].note,lesson.mapId+' 草稿');
  }
  assert.deepEqual(app.snapshot().lessons.electro,old.lessons.electro);assert.deepEqual(app.snapshot().lessons.thermal,old.lessons.thermal);assert.ok(!('CM2.2' in app.snapshot().lessons));node('exportBtn').click();for(const l of lessons)assert.ok(app.blobs[0].includes(l.mapId+' 草稿'));const reloaded=boot(app.snapshot(),{theme});button(reloaded.node('courseNav'),'course','mechanics').click();for(const l of lessons){open(reloaded,l.mapId);assert.equal(reloaded.node('reflection').value,l.mapId+' 草稿');}
 }
 console.log(`PASS CM${index} app: four lessons, control boundaries, two themes, draft retention, scoring, legacy storage and export/reload.`);
}
module.exports={exercise};
