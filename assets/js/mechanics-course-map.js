/* Mechanics curriculum view. Reuses map styles; does not touch storage or models. */
(function () {
  'use strict';
  const data = window.MechanicsCurriculum;
  const mount = document.getElementById('mechanicsMap');
  if (!data || !mount) return;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const byId = id => data.modules.find(m => m.id === id);
  const positions = {CM1:[330,15],CM2:[330,140],CM3:[50,265],CM4:[330,265],CM5:[50,390],CM6:[610,265],CM7:[610,390],CM8:[330,640]};
  let selected = 'CM1';
  let onOpenLesson = null;
  let getProgress = () => ({});
  function moduleButton(id, label) {
    return `<button type="button" class="map-link" data-module="${id}">${escape(label || id+' · '+byId(id).short)}</button>`;
  }
  function lessonStatus(lesson) {
    if (lesson.status !== 'available') return '待开发';
    const p = getProgress(lesson.id);
    return p.predict && p.derive ? '示范题完成' : '已有示范';
  }
  function graph() {
    const edges = data.modules.flatMap(m => [
      ...m.requires.map(r => ({from:r.id,to:m.id,soft:false})),
      ...m.recommended.map(r => ({from:r.id,to:m.id,soft:true}))
    ]);
    const paths = edges.map(e => {
      const [x,y] = positions[e.from], [tx,ty] = positions[e.to];
      const related = e.to === selected || e.from === selected;
      // Branch-specific routing keeps long prerequisites clear of intermediate nodes.
      let d = `M ${x+90} ${y+68} C ${x+90} ${y+125}, ${tx+90} ${ty-65}, ${tx+90} ${ty-8}`;
      if (e.from === 'CM1' && e.to === 'CM5') d = `M ${x} ${y+34} H 20 V ${ty+34} H ${tx-8}`;
      if (e.from === 'CM6' && e.to === 'CM8') d = `M ${x} ${y+34} H 560 V ${ty+34} H ${tx+188}`;
      if (e.soft) d = `M ${x} ${y+34} C ${x-40} ${y+34}, ${tx+220} ${ty+34}, ${tx+188} ${ty+34}`;
      return `<path d="${d}" class="map-edge ${e.soft?'soft':''} ${related?'related':''}" marker-end="url(#mechanicsMapArrow${e.soft?'Soft':''})"/>`;
    }).join('');
    const nodes = data.modules.map(m => {
      const [x,y] = positions[m.id];
      const prerequisite = byId(selected).requires.some(r => r.id === m.id);
      const count = m.lessons.filter(l => l.status === 'available').length;
      return `<button type="button" data-module="${m.id}" aria-pressed="${selected===m.id}" class="map-node ${m.id===selected?'selected':''} ${prerequisite?'prerequisite':''}" style="left:${x}px;top:${y}px"><small>${m.id} · ${count?count+' 关示范':'待开发'}</small><strong>${escape(m.short)}</strong></button>`;
    }).join('');
    return `<div class="map-scroll" tabindex="0" role="region" aria-label="理论力学知识依赖图，可横向滚动；箭头由先修指向后续"><div class="map-graph"><svg viewBox="0 0 840 730" aria-hidden="true"><defs><marker id="mechanicsMapArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#69e0c3"/></marker><marker id="mechanicsMapArrowSoft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#b8a4ff"/></marker></defs>${paths}</svg>${nodes}</div></div>`;
  }
  function relations(items) {
    return items.length ? `<ul class="map-relations">${items.map(r => `<li>${moduleButton(r.id)}<span>${escape(r.reason)}</span></li>`).join('')}</ul>` : '<p class="map-muted">无需其他理论力学模块；先检查下方数学起点。</p>';
  }
  function readings(module) {
    return module.readings.map(([key,locator]) => {
      const source = data.sources.find(s => s.id === key);
      return `<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)}</a>：${escape(locator)}`;
    }).join('；');
  }
  function detail() {
    const m = byId(selected);
    const next = data.modules.filter(other => other.requires.some(r => r.id === m.id));
    return `<div class="module-head"><span class="section-no">${m.id} / 模块设计</span><h3 id="mechanicsModuleDetailTitle" tabindex="-1">${escape(m.title)}</h3><p class="map-question">${escape(m.question)}</p><p>${escape(m.outcome)}</p></div>
      <div class="map-concepts">${m.concepts.map(c => `<span>${escape(c)}</span>`).join('')}</div>
      <h4>必要先修 · 为什么需要</h4>${relations(m.requires)}
      ${m.recommended.length?`<h4>建议先学 · 可跳过</h4>${relations(m.recommended)}`:''}
      <h4>学完可进入</h4><p>${next.length?next.map(n => moduleButton(n.id)).join(' '):'核心路径的终点；可继续专门主题。'}</p>
      <h4>数学起点</h4><ul>${m.tools.map(id => {const b=data.bridges.find(x => x.id===id);return `<li><b>${escape(b.title)}</b>：${escape(b.check)}</li>`;}).join('')}</ul>
      <h4>4 个关卡 · 点击展开设计</h4><div class="map-lessons">${m.lessons.map(l => `<details class="map-lesson" id="mechanicsLesson-${l.id}"><summary><span><small>${l.id}</small>${escape(l.title)}</span><em class="${l.status==='available'?'available':''}">${lessonStatus(l)}</em></summary><div class="map-lesson-body"><p><b>核心问题</b>${escape(l.question)}</p><p><b>交互设计</b>${escape(l.experiment)}</p><p><b>关键推导</b>${escape(l.derivation)}</p><p><b>验收证据</b>${escape(l.acceptance)}</p><p><b>模型与单位</b>${escape(l.model)}</p><p><b>进阶任务（已有示范者可在实验页自评）</b>${escape(l.graduateTask)}</p><p><b>必要先修</b>${l.requires.length?l.requires.map(id => `<a href="#mechanicsLesson-${id}" data-prerequisite="${id}">${id}</a>`).join('、'):'本模块数学起点'}</p>${l.status==='available'?`<p class="map-availability">${escape(l.implementationNote)}${l.legacyLabel?' 原编号 '+escape(l.legacyLabel)+'。':''}</p><button type="button" class="ghost" data-open-lesson="${l.id}">进入 ${l.id} 现有示范 →</button>`:'<p class="map-muted">本关为课程设计，尚无可运行交互、自动判题或完成记录。</p>'}</div></details>`).join('')}</div>
      <h4>模块完成标准（待实现）</h4><p>${escape(m.mastery)}</p>
      <h4>模型边界</h4><p>${escape(m.assumptions)}</p>
      <h4>最容易混淆</h4><p>${escape(m.misconception)}</p>
      <h4>天文学迁移</h4><p>${escape(m.transfer)}</p>
      <h4>教材阅读定位</h4><p>${readings(m)}</p>`;
  }
  function bind() {
    mount.querySelectorAll('[data-module]').forEach(button => button.addEventListener('click', () => {
      selected = button.dataset.module;
      render();
      document.getElementById('mechanicsModuleDetailTitle').focus({preventScroll:true});
    }));
    mount.querySelectorAll('[data-prerequisite]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      const id = link.dataset.prerequisite;
      selected = id.split('.')[0];
      render();
      const lesson = document.getElementById('mechanicsLesson-'+id);
      lesson.open = true;
      lesson.querySelector('summary').focus();
    }));
    mount.querySelectorAll('[data-open-lesson]').forEach(button => button.addEventListener('click', () => {
      if (onOpenLesson) onOpenLesson(button.dataset.openLesson);
    }));
  }
  function render() {
    const available = data.modules.flatMap(m => m.lessons).filter(l => l.status === 'available').length;
    mount.innerHTML = `<div class="map-heading"><div><span class="section-no">CURRICULUM ATLAS / 理论力学</span><h2>从受力与约束，到相空间与混沌</h2><p>8 个模块 · 32 个关卡设计 · ${available} 个已有示范</p></div><div class="map-actions"><span class="map-design-tag">课程地图与示范</span><button type="button" class="ghost" data-open-lesson="CM1.1">开始 CM1.1 →</button><button type="button" class="ghost" data-open-lesson="CM2.2">原单摆示范 CM2.2 →</button></div></div>
      <p class="map-notice">CM1～CM8共32关交互示范，CM2.2沿用原单摆及mechanics学习记录。浏览地图不计XP，示范题完成不等于模块掌握。可切换“核心概念中英对照”按CM1–CM8查词。</p>
      <details class="map-route"><summary>建议学习顺序与验收方式</summary><p>${data.route.map(id => moduleButton(id,id)).join(' → ')}</p><p>${escape(data.routeNote)}</p><ol>${data.rubric.map(r => `<li>${escape(r)}</li>`).join('')}</ol></details>
      <nav class="map-index" aria-label="按理论力学模块浏览设计">${data.modules.map(m => `<button type="button" data-module="${m.id}" aria-pressed="${m.id===selected}" class="${m.id===selected?'selected':''}"><small>${m.id}</small>${escape(m.short)}</button>`).join('')}</nav>
      <div class="map-columns"><div class="map-overview"><h3>知识依赖关系</h3><p class="map-legend"><span>实线：必要先修</span><span>虚线：建议先学</span></p><p class="map-muted">CM2后轨道、振动与哈密顿可分支学习；刚体以CM1为必要先修，CM8需要CM4和CM6，CM7为建议。窄屏可横向滚动，也可使用模块按钮和文字依赖。</p>${graph()}<details class="map-text-deps"><summary>以文字查看全部依赖</summary><ul>${data.modules.map(m => `<li><b>${m.id}</b> ← ${m.requires.map(r => r.id).join(' + ')||'数学起点'}${m.recommended.length?'；建议 '+m.recommended.map(r => r.id).join('、'):''}</li>`).join('')}</ul></details></div><div class="map-detail" role="region" aria-labelledby="mechanicsModuleDetailTitle">${detail()}</div></div>
      <details class="map-sources"><summary>课程依据与约定</summary><p>以下先修与关卡结构是本项目教学设计，并非原教材目录或完整研究生课程。公开目录与课程简介用于主题核查及阅读定位，不等于逐页核读或逐段观看。</p><p>${escape(data.teachingApproach)}</p><ul>${data.sources.map(s => `<li><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.title)} ↗</a>：${escape(s.use)}</li>`).join('')}</ul><p>${escape(data.conventions)}</p><p>更新：${data.updated}。</p></details>`;
    bind();
  }
  render();
  window.PhysicsQuestMechanicsMap = {
    show(visible) { mount.hidden = !visible; },
    refresh:render,
    configure(options = {}) { onOpenLesson=options.onOpenLesson || null; getProgress=options.getProgress || (() => ({})); render(); }
  };
})();
