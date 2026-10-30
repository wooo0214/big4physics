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
function checkGraphLaunchers(app,course){
  const node=app.node,root=node(course.map);
  const data=require('../assets/js/data/'+({mechanics:'mechanics',thermal:'thermal',electro:'electrodynamics'}[course.id])+'-curriculum.js');
  const before=app.serialized();
  assert.equal(root.querySelectorAll('.map-graph-lesson').length,0,'Initially no module is expanded');
  for(const module of data.modules){
    const id=module.id;
    node(course.id+'GraphNode-'+id).click();
    assert.equal(app.document.activeElement,node(course.id+'GraphNode-'+id));
    assert.equal(node(course.id+'GraphNode-'+id).getAttribute('aria-expanded'),'true');
    const panel=node(course.id+'GraphLessons-'+id);
    assert.equal(panel.hidden,false);
    assert.equal(panel.querySelectorAll('[data-open-lesson]').length,4);
    assert.equal(root.querySelectorAll('.map-graph-lesson').length,4,'Only one module exposes launchers');
    const left=Number(panel.getAttribute('style').match(/left:([\d.-]+)px/)[1]);
    assert.ok(left>=0&&left+240<=840,'Expansion must remain within the scrollable graph');
    assert.equal(root.querySelector('.map-detail').querySelectorAll('[data-open-lesson]').length,0,'Design text must not duplicate launchers');
    for(const lesson of module.lessons){
      const launcher=panel.querySelectorAll('[data-open-lesson]').find(b=>b.dataset.openLesson===lesson.id);
      assert.ok(launcher.textContent.includes(lesson.title));
      // Re-query after returning: refreshing a map replaces its DOM buttons.
      choose(node(course.id+'GraphLessons-'+id),'openLesson',lesson.id);
      assert.equal(node(course.map).hidden,true);
      assert.equal(node('lessonLayout').hidden,false);
      const implementation=require(`../assets/js/lessons/${course.prefix.toLowerCase()}${id.slice(2)}-lessons.js`).find(l=>l.id===lesson.implementationId);
      const expected=implementation?.title||(lesson.id==='ED1.2'?'从电场线到高斯定律':null);
      assert.ok(expected,'Expected implementation for '+lesson.id);
      assert.equal(node('lessonTitle').textContent,expected,'Correct demo for '+lesson.id);
      node(course.tabs[0]).click();
      assert.equal(node(course.id+'GraphLessons-'+id).hidden,false);
    }
    node(course.id+'GraphScroll').scrollTop=120;
    node(course.id+'GraphScroll').scrollLeft=25;
    node(course.id+'GraphNode-'+id).click();
    assert.equal(node(course.id+'GraphLessons-'+id).hidden,true);
    assert.equal(node(course.id+'GraphNode-'+id).getAttribute('aria-expanded'),'false');
    assert.equal(app.document.activeElement,node(course.id+'GraphNode-'+id));
    assert.equal(node(course.id+'GraphScroll').scrollTop,120);
    assert.equal(node(course.id+'GraphScroll').scrollLeft,25);
    // The module index also opens the four graph launchers, like quantum.
    choose(node(course.map),'module',id);
    assert.equal(node(course.id+'GraphLessons-'+id).hidden,false);
    assert.equal(app.document.activeElement,node(course.id==='electro'?'moduleDetailTitle':course.id+'ModuleDetailTitle'));
  }
  assert.equal(app.serialized(),before,'Opening every demo must not write learning progress');
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
    if(course.id!=='quantum')checkGraphLaunchers(app,course);
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
