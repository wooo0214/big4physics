/* Thermal curriculum view. Reuses map styles; does not touch storage or models. */
(function () {
  'use strict';
  const data = window.ThermalCurriculum;
  const mount = document.getElementById('thermalMap');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const byId = id => data.modules.find(m => m.id === id);
  // Independent thermal DAG layout: thermodynamic and counting entry branches.
  // Side corridors carry the long TS2/TS4 → TS8 prerequisite edges.
  const positions = {TS1:[10,15],TS3:[650,15],TS2:[10,160],TS4:[650,160],TS5:[330,305],TS6:[10,450],TS7:[650,450],TS8:[330,640]};
  let selected = 'TS1';
  let expanded = null;
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
    // Reserve a row for the four lessons; retain both long-edge side corridors.
    const expansion = 328;
    const expandedY = expanded ? positions[expanded][1] : Infinity;
    const position = id => {
      const [x,y] = positions[id];
      return [x,y + (y > expandedY ? expansion : 0)];
    };
    const height = 730 + (expanded ? expansion : 0);
    const edges = data.modules.flatMap(m => [
      ...m.requires.map(r => ({from:r.id,to:m.id,soft:false})),
      ...m.recommended.map(r => ({from:r.id,to:m.id,soft:true}))
    ]);
    const paths = edges.map(e => {
      const [x,y] = position(e.from), [tx,ty] = position(e.to);
      const bottom = y + 68 + (e.from === expanded ? expansion : 0);
      const branchDrop = expanded && positions[e.from][1] === expandedY && e.from !== expanded && ty > y ? expansion : 0;
      const related = e.to === selected || e.from === selected;
      let d;
      if(e.from==='TS2' && e.to==='TS8') {
        const approachY = 610 + (610 > expandedY ? expansion : 0);
        d=`M ${x} ${y+34} L 4 ${y+34} L 4 ${approachY} L ${tx+65} ${approachY} L ${tx+65} ${ty-8}`;
      }
      else if(e.from==='TS4' && e.to==='TS8') d=`M ${x+180} ${y+34} L 836 ${y+34} L 836 ${ty+34} L ${tx+188} ${ty+34}`;
      else if(y===ty) d=`M ${x+180} ${y+34} L ${tx-8} ${ty+34}`;
      else d=`M ${x+90} ${bottom}${branchDrop?` L ${x+90} ${bottom+branchDrop}`:''} C ${x+90} ${bottom+branchDrop+42}, ${tx+90} ${ty-50}, ${tx+90} ${ty-8}`;
      return `<path d="${d}" class="map-edge ${e.soft?'soft':''} ${related?'related':''}" marker-end="url(#thermalMapArrow${e.soft?'Soft':''})"/>`;
    }).join('');
    const nodes = data.modules.map(m => {
      const [x,y] = position(m.id);
      const prerequisite = byId(selected).requires.some(r => r.id === m.id);
      const count = m.lessons.filter(l => l.status === 'available').length;
      const isExpanded = expanded === m.id;
      // Keep panels inside the canvas without covering the x=4/836 edge routes.
      const panelLeft = Math.max(10,Math.min(590,x-30));
      return `<button type="button" id="thermalGraphNode-${m.id}" data-module="${m.id}" data-graph-module="${m.id}" aria-pressed="${selected===m.id}" aria-expanded="${isExpanded}" aria-controls="thermalGraphLessons-${m.id}" class="map-node ${m.id===selected?'selected':''} ${prerequisite?'prerequisite':''}" style="left:${x}px;top:${y}px"><small>${m.id} · ${count?count+' 关示范':'待开发'} <span aria-hidden="true">${isExpanded?'▴':'▾'}</span></small><strong>${escape(m.short)}</strong></button>
        <div id="thermalGraphLessons-${m.id}" class="map-graph-lessons" role="group" aria-label="${m.id} ${escape(m.short)}的交互示范" style="left:${panelLeft}px;top:${y+80}px"${isExpanded?'':' hidden'}>${isExpanded?m.lessons.map(l => `<button type="button" class="ghost map-graph-lesson" data-open-lesson="${l.id}"${l.status==='available'?'':' disabled'}><small>${l.id}</small><span>${escape(l.title)}</span></button>`).join(''):''}</div>`;
    }).join('');
    return `<div id="thermalGraphScroll" class="map-scroll" tabindex="0" role="region" aria-label="热力学与统计物理知识依赖图，点击模块展开关卡，可横向滚动；箭头由先修指向后续"><div class="map-graph" style="height:${height}px"><svg viewBox="0 0 840 ${height}" style="height:${height}px" aria-hidden="true"><defs><marker id="thermalMapArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#69e0c3"/></marker><marker id="thermalMapArrowSoft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#b8a4ff"/></marker></defs>${paths}</svg>${nodes}</div></div>`;
  }
  function relations(items) {
    return items.length ? `<ul class="map-relations">${items.map(r => `<li>${moduleButton(r.id)}<span>${escape(r.reason)}</span></li>`).join('')}</ul>` : '<p class="map-muted">无需其他热统模块；先检查下方数学起点。</p>';
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
    return `<div class="module-head"><span class="section-no">${m.id} / 模块设计</span><h3 id="thermalModuleDetailTitle" tabindex="-1">${escape(m.title)}</h3><p class="map-question">${escape(m.question)}</p><p>${escape(m.outcome)}</p></div>
      <div class="map-concepts">${m.concepts.map(c => `<span>${escape(c)}</span>`).join('')}</div>
      <h4>必要先修 · 为什么需要</h4>${relations(m.requires)}
      ${m.recommended.length?`<h4>建议先学 · 可跳过</h4>${relations(m.recommended)}`:''}
      <h4>学完可进入</h4><p>${next.length?next.map(n => moduleButton(n.id)).join(' '):'核心路径的终点；可继续专门主题。'}</p>
      <h4>数学起点</h4><ul>${m.tools.map(id => {const b=data.bridges.find(x => x.id===id);return `<li><b>${escape(b.title)}</b>：${escape(b.check)}</li>`;}).join('')}</ul>
      <h4>4 个关卡 · 点击展开设计</h4><div class="map-lessons">${m.lessons.map(l => `<details class="map-lesson" id="thermalLesson-${l.id}"><summary><span><small>${l.id}</small>${escape(l.title)}</span><em class="${l.status==='available'?'available':''}">${lessonStatus(l)}</em></summary><div class="map-lesson-body"><p><b>核心问题</b>${escape(l.question)}</p><p><b>交互设计</b>${escape(l.experiment)}</p><p><b>关键推导</b>${escape(l.derivation)}</p><p><b>验收证据</b>${escape(l.acceptance)}</p><p><b>模型与单位</b>${escape(l.model)}</p><p><b>进阶任务（已有示范者可在实验页自评）</b>${escape(l.graduateTask)}</p><p><b>必要先修</b>${l.requires.length?l.requires.map(id => `<a href="#thermalLesson-${id}" data-prerequisite="${id}">${id}</a>`).join('、'):'本模块数学起点'}</p>${l.status==='available'?`<p class="map-availability">${escape(l.implementationNote)}${l.legacyLabel?' 原编号 '+escape(l.legacyLabel)+'。':''}</p>`:'<p class="map-muted">本关为课程设计，尚无可运行交互、自动判题或完成记录。</p>'}</div></details>`).join('')}</div>
      <h4>模块完成标准（待实现）</h4><p>${escape(m.mastery)}</p>
      <h4>模型边界</h4><p>${escape(m.assumptions)}</p>
      <h4>最容易混淆</h4><p>${escape(m.misconception)}</p>
      <h4>天文学迁移</h4><p>${escape(m.transfer)}</p>
      <h4>教材阅读定位</h4><p>${readings(m)}</p>`;
  }
  function bind() {
    mount.querySelectorAll('[data-module]').forEach(button => button.addEventListener('click', () => {
      selected = button.dataset.module;
      const fromGraph = Boolean(button.dataset.graphModule);
      expanded = fromGraph && expanded === selected ? null : selected;
      render();
      document.getElementById(fromGraph?'thermalGraphNode-'+selected:'thermalModuleDetailTitle').focus({preventScroll:true});
      if (fromGraph && expanded) {
        document.getElementById('thermalGraphLessons-'+expanded).scrollIntoView({block:'nearest',inline:'nearest'});
      }
    }));
    mount.querySelectorAll('[data-prerequisite]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      const id = link.dataset.prerequisite;
      selected = id.split('.')[0];
      expanded = selected;
      render();
      const lesson = document.getElementById('thermalLesson-'+id);
      lesson.open = true;
      lesson.querySelector('summary').focus();
    }));
    mount.querySelectorAll('[data-open-lesson]').forEach(button => button.addEventListener('click', () => {
      if (onOpenLesson) onOpenLesson(button.dataset.openLesson);
    }));
  }
  function render() {
    const previousScroll = document.getElementById('thermalGraphScroll');
    const scrollTop = previousScroll ? previousScroll.scrollTop : 0;
    const scrollLeft = previousScroll ? previousScroll.scrollLeft : 0;
    const available = data.modules.flatMap(m => m.lessons).filter(l => l.status === 'available').length;
    mount.innerHTML = `<div class="map-heading"><div><span class="section-no">CURRICULUM ATLAS / 热力学与统计物理</span><h2>从热力学账本，到量子气体与输运</h2><p>8 个模块 · 32 个关卡设计 · ${available} 个已有示范</p></div><div class="map-actions"><span class="map-design-tag">课程地图与示范</span><button type="button" class="ghost" data-open-lesson="TS1.1">从 TS1.1 开始 →</button></div></div>
      <p class="map-notice">TS1～TS8共32关交互导学；TS5.1沿用原两能级thermal记录。浏览地图和查词不计XP；两道示范题完成不等于整章掌握。</p>
      <details class="map-route"><summary>建议学习顺序与验收方式</summary><p>${data.route.map(id => moduleButton(id,id)).join(' → ')}</p><p>${escape(data.routeNote)}</p><ol>${data.rubric.map(r => `<li>${escape(r)}</li>`).join('')}</ol></details>
      <nav class="map-index" aria-label="按热力学与统计物理模块浏览设计">${data.modules.map(m => `<button type="button" data-module="${m.id}" aria-pressed="${m.id===selected}" class="${m.id===selected?'selected':''}"><small>${m.id}</small>${escape(m.short)}</button>`).join('')}</nav>
      <div class="map-columns"><div class="map-overview"><h3>知识依赖关系</h3><p class="map-legend"><span>实线：必要先修</span><span>虚线：建议先学</span></p><p class="map-muted">点击地图中的模块，展开四个关卡并进入交互示范；再次点击收起。TS1→TS2与TS3→TS4是两条起步线；TS5之后分出TS6、TS7。TS8需TS2/TS4/TS5，TS7只建议先学。窄屏可横向滚动，也可查看文字依赖。</p>${graph()}<details class="map-text-deps"><summary>以文字查看全部依赖</summary><ul>${data.modules.map(m => `<li><b>${m.id}</b> ← ${m.requires.map(r => r.id).join(' + ')||'数学起点'}${m.recommended.length?'；建议 '+m.recommended.map(r => r.id).join('、'):''}</li>`).join('')}</ul></details></div><div class="map-detail" role="region" aria-labelledby="thermalModuleDetailTitle">${detail()}</div></div>
      <details class="map-sources"><summary>课程依据与约定</summary><p>以下先修与关卡结构是本项目教学设计，并非原教材目录或完整研究生课程。已核查官方公开目录以定位主题，未逐页核读讲义或逐项运行外部程序；释义与关卡为项目原创。</p><p>${escape(data.teachingApproach)}</p><ul>${data.sources.map(s => `<li><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.title)} ↗</a>：${escape(s.use)}</li>`).join('')}</ul><p>${escape(data.conventions)}</p><p>更新：${data.updated}。</p></details>`;
    bind();
    const scroll = document.getElementById('thermalGraphScroll');
    scroll.scrollTop = scrollTop;
    scroll.scrollLeft = scrollLeft;
  }
  render();
  window.PhysicsQuestThermalMap = {
    show(visible) { mount.hidden = !visible; },
    refresh:render,
    configure(options) { onOpenLesson=options.onOpenLesson;getProgress=options.getProgress;render(); }
  };
})();
