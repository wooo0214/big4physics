/* Four-course integration with synthetic storage. No real learner data is read.
 * Per-model numerical accuracy is checked in the chapter tests; these checks
 * exercise UI contracts, legacy aliases, keyboard navigation and persistence.
 */
const assert=require('node:assert/strict');
const {boot}=require('./test_app_harness.js');
function choose(root,key,value){
  const attr='data-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
  const button=root.querySelectorAll('['+attr+']').find(b=>b.dataset[key]===value);
  assert.ok(button,`${key}=${value}`);button.click();return button;
}
const courses=[
  {id:'mechanics',prefix:'CM',map:'mechanicsMap',tabs:['mechanicsMapViewBtn','mechanicsDemoViewBtn','mechanicsGlossaryViewBtn'],glossary:'mechanicsGlossary',old:'CM2.2',chapter:2},
  {id:'thermal',prefix:'TS',map:'thermalMap',tabs:['thermalMapViewBtn','thermalDemoViewBtn','thermalGlossaryViewBtn'],glossary:'thermalGlossary',old:'TS5.1',chapter:5},
  {id:'electro',prefix:'ED',map:'electroMap',tabs:['mapViewBtn','demoViewBtn','glossaryViewBtn'],glossary:'electroGlossary',old:'ED1.2',chapter:1},
  {id:'quantum',prefix:'QM',map:'quantumMap',tabs:['quantumMapViewBtn','quantumDemoViewBtn','quantumGlossaryViewBtn'],glossary:'quantumGlossary',old:'QM1.1',chapter:1}
];
function open(app,course,id){
  choose(app.node('courseNav'),'course',course.id);
  choose(app.node(course.map),'module',id.split('.')[0]);
  choose(app.node(course.map),'openLesson',id);
}
for(const theme of ['day','night']){
  const initial={lessons:{mechanics:{predict:true,derive:false,note:'原单摆'},thermal:{predict:false,derive:true,note:'原两能级'},electro:{predict:true,derive:true,note:'原高斯面'},quantum:{predict:true,derive:false,note:'原势阱'}}};
  const app=boot(initial,{theme}),node=app.node,unchanged=app.serialized();
  assert.equal(node('progressText').textContent,'1 / 128');assert.equal(node('xpText').textContent,'250');
  for(const nav of node('courseNav').querySelectorAll('[data-course]'))assert.ok(nav.textContent.includes('/ 32 示范题完成'));
  for(const course of courses){
    choose(node('courseNav'),'course',course.id);
    for(const other of courses){assert.equal(node(other.map).hidden,other!==course);assert.equal(node(other.glossary).hidden,true);}
    assert.equal(node('lessonLayout').hidden,true);
    assert.equal(node(course.tabs[0]).getAttribute('aria-selected'),'true');
    open(app,course,course.old);
    assert.equal(node('reflection').value,initial.lessons[course.id].note);
    const firstControl=node('controls').querySelectorAll('input')[0]||node('controls').querySelectorAll('select')[0];
    const oldValue=firstControl.value;
    node('reflection').value=course.id+' 暂未保存';
    node(course.tabs[2]).click();
    assert.equal(node(course.glossary).hidden,false);
    const glossaryData=require('../assets/js/data/'+({mechanics:'mechanics',thermal:'thermal',electro:'electrodynamics',quantum:'quantum'}[course.id])+'-glossary.js');
    for(const module of glossaryData.modules){
      choose(node(course.glossary),'glossaryModule',module.id);
      assert.ok(node(course.glossary).textContent.includes(module.terms[0].en));
    }
    node(course.tabs[2]).fire('keydown',{key:'ArrowLeft'});
    assert.equal(node(course.tabs[1]).getAttribute('aria-selected'),'true');
    assert.equal(app.document.activeElement,node(course.tabs[1]));
    assert.equal(node('reflection').value,course.id+' 暂未保存');
    assert.equal(node(firstControl.id),firstControl);assert.equal(firstControl.value,oldValue);
    assert.equal(node('lessonLayout').getAttribute('aria-labelledby'),course.tabs[1]);
    assert.equal(app.serialized(),unchanged,'Browsing, terms and tab switching must not save progress');
  }
  // All four legacy aliases remain single records after answering/saving.
  for(const course of courses){
    open(app,course,course.old);
    let lessons;
    if(course.prefix==='ED')lessons=[{id:'electro',prediction:{correct:0},derive:{correct:1}}];
    else lessons=require(`../assets/js/lessons/${course.prefix.toLowerCase()}${course.chapter}-lessons.js`);
    const lesson=lessons.find(l=>l.id===course.id);
    for(const [part,key] of [['prediction','predict'],['derive','derive']]){
      const before=Number(node('xpText').textContent),right=node(part+'Options').querySelectorAll('[data-option]')[lesson[part].correct];
      right.click();right.click();
      assert.equal(Number(node('xpText').textContent),before+(initial.lessons[course.id][key]?0:50));
    }
    node('reflection').value=course.id+' 更新';node('saveNoteBtn').click();
    assert.equal(app.snapshot().lessons[course.id].note,course.id+' 更新');
    assert.ok(!(course.old in app.snapshot().lessons),'Legacy map ID must not create a second storage record');
  }
  assert.equal(node('progressText').textContent,'4 / 128');assert.equal(node('xpText').textContent,'400');
  node('exportBtn').click();
  assert.equal((app.blobs[0].match(/^## /gm)||[]).length,128);
  for(const course of courses){assert.ok(app.blobs[0].includes(course.id+' 更新'));}
  const reload=boot(app.snapshot(),{theme});
  for(const course of courses){open(reload,course,course.old);assert.equal(reload.node('reflection').value,course.id+' 更新');}
}
for(const options of [{blockReads:true},{blockWrites:true}]){
  const app=boot({lessons:{}},options);
  for(const course of courses){open(app,course,course.old);app.node(course.tabs[2]).click();app.node(course.tabs[1]).click();}
  assert.equal(app.node('xpText').textContent,'0');
}
console.log('PASS four-course integration: 128 unique demos, legacy aliases, independent panels/glossaries, keyboard/drafts/controls, no browsing writes, nonduplicated XP, export/reload and storage fallback.');
