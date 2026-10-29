/* Actual page scripts in isolated synthetic DOM and storage. Both themes.
 * Each control: min/default/max; every selector; all-min/all-max and selected
 * physically important coupled branches. This is NOT a Cartesian product.
 * Canvas calls are checked for finite arguments by the shared page adapter.
 */
const assert=require('node:assert/strict');
const {boot}=require('./test_app_harness.js');
const button=(root,key,value)=>{const b=root.querySelectorAll('[data-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())+']').find(e=>e.dataset[key]===value);assert.ok(b,`${key}=${value}`);return b;};
function open(app,mapId){app.node('thermalMapViewBtn').click();button(app.node('thermalMap'),'module',mapId.split('.')[0]).click();button(app.node('thermalMap'),'openLesson',mapId).click();}
function exercise(index){
 const lessons=require(`../assets/js/lessons/ts${index}-lessons.js`);
 for(const theme of ['day','night']){
  const original={lessons:{electro:{predict:true,derive:true,note:'保留高斯笔记'},mechanics:{predict:true,derive:false,note:'保留简谐记录'},thermal:{predict:true,derive:false,note:'保留原两能级记录'},quantum:{predict:true,derive:true,note:'保留势阱记录'}}},app=boot(original,{theme}),node=app.node;
  button(node('courseNav'),'course','thermal').click();assert.ok(node('progressText').textContent.endsWith('/ 128'));
  for(const lesson of lessons){
   open(app,lesson.mapId);assert.equal(node('lessonTitle').textContent,lesson.title);assert.equal(node('lessonIntro').textContent,lesson.intro);assert.equal(node('lessonLayout').hidden,false);assert.equal(node('thermalDemoViewBtn').getAttribute('aria-selected'),'true');assert.ok(node('derivation').textContent.includes('研究生进阶'));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.ok(lesson.modelNote.length>40);
   const before=app.serialized();let samples=0;
   function verify(){samples++;assert.ok(!/NaN|Infinity|undefined/.test(node('metrics').textContent+node('fieldTable').textContent));assert.ok(app.paintedText.length>0);if(theme==='day')assert.ok(app.paintedText.every(t=>t.color==='#000000'));else assert.ok(app.paintedText.some(t=>t.color!=='#000000'));app.clearPaintedText();}
   function set(c,value){const input=node('slider-'+c.id);input.value=value;input.fire(c.type==='select'?'change':'input');verify();}
   const setBy=(key,value)=>set(lesson.controls.find(c=>c.id===key),value);
   verify();for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])set(c,value);set(c,c.value);}
   for(const end of ['min','max'])for(const c of lesson.controls)set(c,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]);for(const c of lesson.controls)set(c,c.value);
   if(lesson.mapId==='TS1.2'){for(const kind of [0,1,2,3]){setBy('kind',kind);for(const r of [.5,3])setBy('r',r);}}
   if(lesson.mapId==='TS1.3'){setBy('Tc',100);setBy('dT',400);setBy('r',1.1);}
   if(lesson.mapId==='TS2.2'||lesson.mapId==='TS2.4'){setBy('x',0);assert.ok(node('metrics').textContent.includes('未定义'));setBy('x',1);assert.ok(node('fieldTable').textContent.includes('端点'));}
   if(lesson.mapId==='TS3.3'){setBy('same',1);setBy('x',.5);assert.ok(node('metrics').textContent.includes('0'));}
   if(lesson.mapId==='TS3.4'){setBy('a',1);setBy('b',0);assert.ok(node('metrics').textContent.includes('0'));setBy('a',1/3);setBy('b',.5);}
   if(lesson.mapId==='TS4.1'){setBy('Q',0);}
   if(lesson.mapId==='TS4.2'){setBy('N',2);setBy('Q',100);setBy('gap',20);setBy('Q',0);assert.ok(node('fieldTable').textContent.includes('能量不足'));}
   if(lesson.mapId==='TS4.3'){setBy('z',30);setBy('cut',2);assert.ok(node('fieldTable').textContent.includes('不重新归一'));}
   if(lesson.mapId==='TS4.4'){setBy('prob',0);assert.ok(node('metrics').textContent.includes('未定义'));}
   if(lesson.mapId==='TS5.4'){setBy('t',30);setBy('cut',0);assert.ok(node('fieldTable').textContent.includes('截断失效'));assert.ok(node('fieldTable').textContent.includes('仅保留 l=0'));}
   if(lesson.mapId==='TS6.4'){setBy('T',.1);setBy('mass',1);setBy('logn',30);setBy('g',1);assert.ok(node('metrics').textContent.includes('失效'));}
   if(lesson.mapId==='TS7.1'){setBy('distance',.05);setBy('T',4);setBy('energy',0);}
   if(lesson.mapId==='TS7.2'){for(const T of [.05,5]){setBy('T',T);for(const N of [.5,11.5])setBy('N',N);}assert.ok(node('metrics').textContent.includes('残差'));}
   if(lesson.mapId==='TS7.4'){setBy('T',10000);setBy('cut',2);assert.ok(node('fieldTable').textContent.includes('雅可比'));}
   if(lesson.mapId==='TS8.1'){setBy('N',10);setBy('T',.2);setBy('h',0);}
   if(lesson.mapId==='TS8.2'){setBy('a',-1);setBy('b',1);setBy('h',0);assert.ok(node('metrics').textContent.includes('2.00000'));setBy('a',0);setBy('h',0);}
   if(lesson.mapId==='TS8.3'){setBy('N',8);setBy('T',.2);setBy('h',0);setBy('logStep',-1);}
   if(lesson.mapId==='TS8.4'){setBy('D',0);setBy('time',20);setBy('amp',.9);setBy('amp',0);assert.ok(node('fieldTable').textContent.includes('正浓度'));}
   for(const c of lesson.controls)set(c,c.value);assert.equal(app.serialized(),before,'Exploration must not persist progress');assert.ok(samples>=lesson.controls.length*3);
   const noWrite=app.serialized(),first=node('slider-'+lesson.controls[0].id);node('reflection').value=lesson.mapId+' 未保存草稿';node('thermalGlossaryViewBtn').click();node('thermalMapViewBtn').click();node('thermalDemoViewBtn').click();assert.equal(node('slider-'+lesson.controls[0].id),first);assert.equal(node('reflection').value,lesson.mapId+' 未保存草稿');assert.equal(app.serialized(),noWrite);
   let xp=Number(node('xpText').textContent);for(const [prefix,q,key] of [['prediction',lesson.prediction,'predict'],['derive',lesson.derive,'derive']]){const done=Boolean(app.snapshot().lessons[lesson.id]?.[key]);node(prefix+'Options').querySelectorAll('[data-option]')[(q.correct+1)%q.options.length].click();assert.equal(Number(node('xpText').textContent),xp);const right=node(prefix+'Options').querySelectorAll('[data-option]')[q.correct];right.click();right.click();if(!done)xp+=50;assert.equal(Number(node('xpText').textContent),xp);}
   node('saveNoteBtn').click();assert.equal(app.snapshot().lessons[lesson.id].note,lesson.mapId+' 未保存草稿');assert.ok(!('TS5.1' in app.snapshot().lessons));
  }
  for(const key of ['electro','mechanics','quantum'])assert.deepEqual(app.snapshot().lessons[key],original.lessons[key]);if(index!==5)assert.deepEqual(app.snapshot().lessons.thermal,original.lessons.thermal);
  node('exportBtn').click();assert.ok(app.blobs[0].includes('/128'));for(const lesson of lessons)assert.ok(app.blobs[0].includes(lesson.mapId+' 未保存草稿'));const reload=boot(app.snapshot(),{theme});button(reload.node('courseNav'),'course','thermal').click();for(const lesson of lessons){open(reload,lesson.mapId);assert.equal(reload.node('reflection').value,lesson.mapId+' 未保存草稿');}
 }
 console.log(`PASS TS${index} page: both themes, four launchers, controls/endpoints/selectors and coupled cases, finite canvas, labels, tabs/drafts, scoring idempotence, original thermal record, export/reload. No real-browser layout claim.`);
}
module.exports={exercise};
