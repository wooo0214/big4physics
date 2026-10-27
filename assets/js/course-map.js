(function () {
  'use strict';
  const data = window.ElectrodynamicsCurriculum;
  const mount = document.getElementById('electroMap');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const byId = id => data.modules.find(m=>m.id===id);
  let selected = 'ED1';
  let onOpenLesson=null;
  let getProgress=()=>({});
  function lessonStatus(lesson){
    if(lesson.status!=='available')return '待开发';
    const p=getProgress(lesson.id);
    return p.predict&&p.derive?'示范题完成':'已有示范';
  }
  // Coordinates share a single viewBox with the HTML buttons. Narrow screens
  // retain readable type and can scroll the diagram; the button list also works.
  const positions = {ED1:[330,15],ED2:[80,140],ED3:[580,140],ED4:[330,265],ED5:[330,390],ED6:[80,515],ED8:[580,515],ED7:[80,640]};
  function moduleButton(id, text) {
    return `<button type="button" class="map-link" data-module="${id}">${escape(text || id+' · '+byId(id).short)}</button>`;
  }
  function graph() {
    const edges = data.modules.flatMap(m=>[
      ...m.requires.map(r=>({from:r.id,to:m.id,soft:false})),
      ...m.recommended.map(r=>({from:r.id,to:m.id,soft:true}))
    ]);
    const paths = edges.map(e=>{
      const [x,y]=positions[e.from], [tx,ty]=positions[e.to];
      const related=e.to===selected || e.from===selected;
      // The optional ED6 -> ED8 edge is horizontal; all hard edges go down.
      const d=e.soft ? `M ${x+180} ${y+34} L ${tx-8} ${ty+34}` :
        `M ${x+90} ${y+68} C ${x+90} ${y+95}, ${tx+90} ${ty-32}, ${tx+90} ${ty-8}`;
      return `<path d="${d}" class="map-edge ${e.soft?'soft':''} ${related?'related':''}" marker-end="url(#mapArrow${e.soft?'Soft':''})"/>`;
    }).join('');
    const nodes=data.modules.map(m=>{
      const [x,y]=positions[m.id];
      const prerequisite=byId(selected).requires.some(r=>r.id===m.id);
      return `<button type="button" data-module="${m.id}" aria-pressed="${selected===m.id}" class="map-node ${m.id===selected?'selected':''} ${prerequisite?'prerequisite':''}" style="left:${x}px;top:${y}px"><small>${m.id} · ${m.lessons.some(l=>l.status==='available')?m.lessons.filter(l=>l.status==='available').length+' 关示范':'待开发'}</small><strong>${escape(m.short)}</strong></button>`;
    }).join('');
    return `<div class="map-scroll" tabindex="0" role="region" aria-label="知识依赖图，可横向滚动；箭头由先修指向后续模块"><div class="map-graph"><svg viewBox="0 0 840 730" aria-hidden="true"><defs><marker id="mapArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#69e0c3"/></marker><marker id="mapArrowSoft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#b8a4ff"/></marker></defs>${paths}</svg>${nodes}</div></div>`;
  }
  function relationList(items) {
    return items.length ? `<ul class="map-relations">${items.map(r=>`<li>${moduleButton(r.id)}<span>${escape(r.reason)}</span></li>`).join('')}</ul>` : '<p class="map-muted">无需其他电动力学模块；先检查下方数学起点。</p>';
  }
  function detail() {
    const m=byId(selected);
    const next=data.modules.filter(other=>other.requires.some(r=>r.id===m.id));
    return `<div class="module-head"><span class="section-no">${m.id} / 模块设计</span><h3 id="moduleDetailTitle" tabindex="-1">${escape(m.title)}</h3><p class="map-question">${escape(m.question)}</p><p>${escape(m.outcome)}</p></div>
      <div class="map-concepts">${m.concepts.map(c=>`<span>${escape(c)}</span>`).join('')}</div>
      <h4>必要先修 · 为什么需要</h4>${relationList(m.requires)}
      ${m.recommended.length?`<h4>建议先学 · 可跳过</h4>${relationList(m.recommended)}`:''}
      <h4>学完可进入</h4><p>${next.length?next.map(n=>moduleButton(n.id)).join(' '):'本课程核心路径的终点；可继续专门主题。'}</p>
      <h4>数学起点</h4><ul>${m.tools.map(id=>{const b=data.bridges.find(x=>x.id===id);return `<li><b>${escape(b.title)}</b>：${escape(b.check)}</li>`;}).join('')}</ul>
      <h4>4 个关卡 · 点击展开设计</h4><div class="map-lessons">${m.lessons.map(l=>`<details class="map-lesson"><summary><span><small>${l.id}</small>${escape(l.title)}</span><em class="${l.status==='available'?'available':''}">${lessonStatus(l)}</em></summary><div class="map-lesson-body"><p><b>核心问题</b>${escape(l.question)}</p><p><b>交互设计</b>${escape(l.experiment)}</p><p><b>关键推导</b>${escape(l.derivation)}</p><p><b>验收证据</b>${escape(l.acceptance)}</p><p><b>必要先修</b>${l.requires.length?l.requires.map(id=>`<a href="#lesson-${id}" data-prerequisite="${id}">${id}</a>`).join('、'):'数学起点 B1'}</p>${l.status==='available'?`<p class="map-availability">${escape(l.implementationNote)}${l.legacyLabel?' 原编号 '+escape(l.legacyLabel)+'。':''}</p><button type="button" class="ghost" data-open-lesson="${l.id}">进入 ${l.id} 示范 →</button>`:''}</div></details>`).join('')}</div>
      <h4>模块完成标准（待实现）</h4><p>${escape(m.mastery)}</p>
      <h4>模型边界</h4><p>${escape(m.assumptions)}</p>
      <h4>最容易混淆</h4><p>${escape(m.misconception)}</p>
      <h4>天文学迁移</h4><p>${escape(m.transfer)}</p>`;
  }
  function bind() {
    mount.querySelectorAll('[data-module]').forEach(button=>button.addEventListener('click',()=>{
      selected=button.dataset.module; render();
      document.getElementById('moduleDetailTitle').focus({preventScroll:true});
    }));
    mount.querySelectorAll('[data-prerequisite]').forEach(link=>link.addEventListener('click',event=>{
      event.preventDefault(); const id=link.dataset.prerequisite;
      selected=id.split('.')[0]; render();
      const lesson=document.getElementById('lesson-'+id);
      lesson.open=true; lesson.querySelector('summary').focus();
    }));
    mount.querySelectorAll('[data-open-lesson]').forEach(button=>button.addEventListener('click',()=>{
      if(onOpenLesson)onOpenLesson(button.dataset.openLesson);
    }));
    mount.querySelectorAll('.map-lesson').forEach((el,i)=>{el.id='lesson-'+byId(selected).lessons[i].id;});
  }
  function render() {
    const available=data.modules.flatMap(m=>m.lessons).filter(l=>l.status==='available').length;
    mount.innerHTML=`<div class="map-heading"><div><span class="section-no">CURRICULUM ATLAS / 电动力学</span><h2>从场的语言，到相对论统一</h2><p>8 个模块 · 32 个关卡设计 · ${available} 个已有示范</p></div><div class="map-actions"><span class="map-design-tag">课程地图与示范</span><button type="button" class="ghost" data-open-lesson="ED1.1">开始 ED1.1 →</button></div></div>
      <p class="map-notice">ED1–ED8 共 ${available} 关均有交互示范与每关两道示范题。示范题完成不等于模块综合验收；浏览地图不计 XP。</p>
      <details class="map-route"><summary>建议学习顺序与验收方式</summary><p>${data.route.map(id=>moduleButton(id,id)).join(' → ')}</p><p>${escape(data.routeNote)}</p><ol>${data.rubric.map(r=>`<li>${escape(r)}</li>`).join('')}</ol></details>
      <nav class="map-index" aria-label="按模块浏览设计">${data.modules.map(m=>`<button type="button" data-module="${m.id}" aria-pressed="${m.id===selected}" class="${m.id===selected?'selected':''}"><small>${m.id}</small>${escape(m.short)}</button>`).join('')}</nav>
      <div class="map-columns"><div class="map-overview"><h3>知识依赖关系</h3><p class="map-legend"><span>实线：必要先修</span><span>虚线：建议先学</span></p><p class="map-muted">箭头由先修指向后续。静电 / 静磁可并行；ED8 不必等待辐射。窄屏可横向滚动，也可用上方按钮浏览。</p>${graph()}<details class="map-text-deps"><summary>以文字查看全部依赖</summary><ul>${data.modules.map(m=>`<li><b>${m.id}</b> ← ${m.requires.map(r=>r.id).join(' + ')||'数学起点'}${m.recommended.length?'；建议 '+m.recommended.map(r=>r.id).join('、'):''}</li>`).join('')}</ul></details></div><div class="map-detail" role="region" aria-labelledby="moduleDetailTitle">${detail()}</div></div>
      <details class="map-sources"><summary>课程依据与约定</summary><p>本地图是 Physics Quest 的教学设计，必要先修关系是本项目的编排选择。以下教材与公开课程用于阅读定位及主题核查，不意味着原书采用相同的模块顺序。</p><p>${escape(data.teachingApproach)}</p><ul>${data.sources.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${escape(s.title)} ↗</a>：${escape(s.use)}</li>`).join('')}</ul><p>统一使用 SI；相对论度规、波的复表示及介质近似见对应模块。外部资料仅作链接。更新：${data.updated}。</p></details>`;
    bind();
  }
  render();
  window.PhysicsQuestMap={
    show(visible){mount.hidden=!visible;},
    refresh:render,
    configure(options){onOpenLesson=options.onOpenLesson;getProgress=options.getProgress;render();}
  };
})();
