(function () {
  'use strict';
  const P = window.PhysicsLab;
  const levels = [
    {
      id:'mechanics', short:'理论力学', icon:'◎', title:'从单摆到拉格朗日方程',
      intro:'从周期、振幅与能量出发，理解广义坐标和作用量如何替代逐项受力分析。',
      simTitle:'单摆周期：小角近似何时失效？',
      controls:[{id:'length',label:'摆长 L',min:.4,max:3,step:.1,value:1,unit:'m'},{id:'g',label:'重力加速度 g',min:2,max:20,step:.5,value:9.8,unit:'m/s²'},{id:'theta',label:'初始振幅 θ₀',min:5,max:120,step:5,value:30,unit:'°'}],
      goal:'比较小角周期与有限振幅的准确周期。注意：总能量守恒，并不意味着周期不随振幅变化。',
      math:'广义坐标 θ；作用量 S=∫L dt；欧拉–拉格朗日方程；小角近似。',
      modelNote:'理想无阻尼单摆；周期的“精确值”通过椭圆积分的 AGM 算法计算。画面中的摆球仅为周期示意，有限振幅下的角度时间曲线不是精确解。',
      resourceTitle:'PhET · Pendulum Lab',resourceDescription:'可交互改变摆长、重力和振幅，观察周期、动能与势能。适合在推导前建立直觉。',
      resourceUrl:'https://phet.colorado.edu/en/simulations/pendulum-lab',
      reflection:'为什么小角近似使单摆的周期不依赖振幅？在什么条件下这个结论失效？',
      prediction:{q:'在小角度、同一重力场中，摆长从 L 增大到 4L，周期如何变化？', options:['增大到 4 倍','增大到 2 倍','缩短到 1/2'], correct:1,explain:'T≈2π√(L/g)，因此 L→4L 时 T→2T。试着将摆长滑块从 0.5 m 改为 2.0 m。'},
      derivation:'<p>取广义坐标 θ，动能 <span class="math">T=½mL²θ̇²</span>，势能 <span class="math">V=mgL(1−cosθ)</span>。</p><p>代入 <span class="math">d/dt(∂ℒ/∂θ̇)−∂ℒ/∂θ=0</span>，得到 <span class="math">θ̈+(g/L)sinθ=0</span>。仅在 |θ|≪1（弧度）时使用 <span class="math">sinθ≈θ</span>。</p>',
      derive:{q:'对理想单摆使用小角近似后，正确的运动方程是？',options:['θ̈ + (g/L)θ = 0','θ̈ − (g/L)θ = 0','θ̈ + (g/L²)θ = 0'],correct:0,explain:'变分得到 θ̈+(g/L)sinθ=0；再用 sinθ≈θ，得到简谐振子方程。'}
    },
    {
      id:'electro',short:'电动力学',icon:'↗',title:'从电场线到高斯定律',
      intro:"高斯球变大，场为何减弱而通量不变？先分清局域场与面积积分，再检查球对称性的作用。",
      simTitle:'点电荷与球形高斯面',
      controls:[{id:'q',label:'中心电荷 Q',min:-5,max:5,step:1,value:3,unit:'nC'},{id:'radius',label:'高斯球半径 r',min:.5,max:3,step:.1,value:1.2,unit:'m'}],
      goal:'区分局域电场 E 和穿过整个闭合曲面的电通量 Φ。改变半径与电荷符号，观察二者如何变化。',
      math:'通量积分 ∮E·dA；球对称性；散度定理；∇·E=ρ/ε₀。',
      modelNote:'静电真空中的孤立点电荷；图形是三维球形高斯面的二维截面。电场箭头只表示方向，长度不按真实强度缩放。',
      resourceTitle:'PhET · 电荷与电场',resourceDescription:'放置点电荷，查看电场、电势和等势线。进阶可结合 MIT TEAL 的三维电磁场演示。',
      resourceUrl:'https://phet.colorado.edu/en/simulations/charges-and-fields',
      graduate:{"task":"从点电荷场推导其分布意义下的散度，并用不包围源的闭合面作反例检查。","check":"源外 ∇·E=0；全空间为 ∇·E=(Q/ε₀)δ³(r)。不包围源的净通量为零，但面上电场一般非零；Eᵣ 可为负，|E| 始终非负。"},
      reflection:'为什么高斯定律对任意闭合曲面成立，但用它直接求 E 通常需要对称性？',
      prediction:{q:'固定球心点电荷，将球形高斯面半径增大为 2 倍，球面电场强度和总电通量如何变化？',options:['电场变为 1/4，通量不变','电场变为 1/2，通量变为 1/2','电场不变，通量增大 4 倍'],correct:0,explain:'E∝1/r²，但面积∝r²；因此 Φ=Q/ε₀ 与半径无关。'},
      derivation:"<p><b>物理问题</b>　球面上每点的场会随半径变化，穿过整个球面的净通量却只由包围电荷决定。</p><p><b>列式理由</b>　孤立点电荷具有球对称性：场沿径向，同心球面上的带符号分量 Eᵣ 恒定，才可提出积分。</p><p><b>关键一步</b>　Φ=∮E·dA=4πr²Eᵣ=Q/ε₀，故 Eᵣ=Q/(4πε₀r²)。负 Q 给向内场；|E| 始终非负。</p><p><b>极限检验</b>　r 加倍，场的大小降为 1/4、面积增为 4 倍，通量不变。一般曲面仍满足高斯定律，却不能直接据此求每点 E。</p>",
      derive:{q:'由 Eᵣ(r)·4πr²=Q/ε₀，可得球面上带符号的径向电场分量为？',options:['Q/(4πε₀r)','Q/(4πε₀r²)','Q/(ε₀r²)'],correct:1,explain:'将球面积 4πr² 移至分母，得到 Eᵣ=Q/(4πε₀r²)。'}
    },
    {
      id:'thermal',short:'热统',icon:'≋',title:'从微观占据到配分函数',
      intro:'只用一个两能级系统，观察温度如何改变占据概率、平均能量和熵。',
      simTitle:'两能级正则系综：热涨落的起点',
      controls:[{id:'x',label:'能级差 / 热能 Δ/(kBT)',min:.2,max:6,step:.1,value:2,unit:''}],
      goal:'把玻尔兹曼权重与“哪个能级更可能被占据”联系起来，再从配分函数计算宏观平均量。',
      math:'概率归一化；Z=Σe^(−βEᵢ)；⟨E⟩=−∂lnZ/∂β；信息熵。',
      modelNote:'单个非简并两能级系统，能级为 0 与 Δ>0；处于正则系综。横轴 x=Δ/(kBT)，不是独立的温度与能级差。',
      resourceTitle:'STP · Statistical & Thermal Physics',resourceDescription:'与 Gould–Tobochnik 教材配套的浏览器模拟，包括趋于平衡、蒙特卡洛和统计物理模型。',
      resourceUrl:'https://www.compadre.org/stpbook/',
      reflection:'为什么 T→∞ 时激发态概率趋于 1/2，而不是趋于 1？如果激发态有简并度会怎样？',
      prediction:{q:'固定能级差 Δ>0，逐渐提高温度 T，激发态的平衡占据率会如何变化？',options:['单调增大并趋于 1/2','单调增大并趋于 1','单调减小并趋于 0'],correct:0,explain:'p₁=1/(1+e^(Δ/kBT))；T 增大时 x=Δ/(kBT) 减小，p₁ 由接近 0 趋于 1/2。'},
      derivation:'<p>设 <span class="math">β=1/(kBT)</span>，两个能级分别为 0 和 Δ，则</p><p class="math">Z=1+e^(−βΔ)，p₁=e^(−βΔ)/Z</p><p>用 <span class="math">⟨E⟩=−∂lnZ/∂β</span> 得到平均能量。关键是：宏观量来自微观态的加权平均。</p>',
      derive:{q:'对 Z=1+e^(−βΔ)，平均能量 ⟨E⟩=−∂lnZ/∂β 等于？',options:['Δ/(1+e^(−βΔ))','Δ·e^(−βΔ)','Δ/(1+e^(βΔ))'],correct:2,explain:'⟨E⟩=Δe^(−βΔ)/(1+e^(−βΔ))=Δ/(1+e^(βΔ))，即激发态能量乘其占据概率。'}
    },
    {
      id:'quantum',short:'量子力学',icon:'ψ',title:'从驻波到量子化能级',
      intro:'设想你把一个电子限制在一维盒子中：盒内势能取零，两端的势垒无限高。这个盒子中的电子，即使处于能量最低的状态，其动能也不为零。为什么限制电子活动的空间，会使它无法具有零动能？先选 n=1，改变阱宽，观察最低能量如何变化；再增加量子数，比较波函数节点、概率密度与能量。',
      simTitle:'一维无限深势阱：波函数与 |ψ|²',
      controls:[{id:'n',label:'量子数 n',min:1,max:5,step:1,value:2,unit:''},{id:'L',label:'势阱宽度 L',min:.5,max:3,step:.1,value:1,unit:'nm'}],
      goal:'把边界条件、驻波波长、节点数和离散能级联系起来；区分波函数振幅与测量概率密度。',
      math:'边界条件 ψ(0)=ψ(L)=0；二阶 ODE；本征值问题；归一化。',
      modelNote:'一维无限深势阱内的非相对论单电子定态；横轴是归一化位置 x/L。图中波函数振幅做了无量纲缩放；能量以电子伏特表示。',
      resourceTitle:'QuVis · Quantum Visualisation',resourceDescription:'圣安德鲁斯大学的量子力学可视化项目，包含势阱、本征值、波函数演化和进阶微扰内容。',
      resourceUrl:'https://www.st-andrews.ac.uk/physics/quvis/',
      reflection:'为什么阱宽减半会使能级升高四倍？量子化究竟来自哪一个边界条件？',
      prediction:{q:'一维无限深势阱的 n=2 定态，其概率密度在势阱内部（不计两端边界）有几个节点？',options:['0 个','1 个','2 个'],correct:1,explain:'ψ₂∝sin(2πx/L)，在 x=L/2 处为零，因此内部有 1 个节点。'},
      derivation:'<p>在 0&lt;x&lt;L 内，定态薛定谔方程为</p><p class="math">−(ℏ²/2m)ψ″=Eψ</p><p>边界条件 ψ(0)=ψ(L)=0 只允许 <span class="math">k=nπ/L</span>，因此 <span class="math">Eₙ=n²π²ℏ²/(2mL²)</span>。能级离散来自边界条件，而不是人为规定。</p>',
      derive:{q:'固定粒子质量与量子数 n，将势阱宽度从 L 增加到 2L，能量 Eₙ 如何变化？',options:['变为原来的 1/2','变为原来的 1/4','变为原来的 2 倍'],correct:1,explain:'Eₙ∝1/L²，故 L→2L 时 Eₙ→Eₙ/4。'}
    }
  ];
  // Upgrade the original well in place: one lesson, one legacy progress key.
  const legacyQuantum=levels.find(l=>l.id==='quantum');
  const originalQuantumIntro=legacyQuantum.intro;
  Object.assign(legacyQuantum,window.QM1Lessons[0],{intro:originalQuantumIntro});
  levels.push(...window.QM1Lessons.slice(1),...window.QM2Lessons,...window.QM3Lessons,...window.QM4Lessons,...window.QM5Lessons,...window.QM6Lessons,...window.QM7Lessons,...window.QM8Lessons);
  levels.push(...window.ED1Lessons,...window.ED2Lessons,...window.ED3Lessons,...window.ED4Lessons,...window.ED5Lessons,...window.ED6Lessons,...window.ED7Lessons,...window.ED8Lessons);
  // Upgrade legacy lessons in place: each old progress key still occurs once.
  for(const prefix of ['CM','TS'])for(let i=1;i<=8;i++){
    for(const lesson of window[prefix+i+'Lessons']){
      const legacy=levels.find(item=>item.id===lesson.id);
      if(legacy)Object.assign(legacy,lesson);else levels.push(lesson);
    }
  }
  const moduleId=id=>({mechanics:'CM2',thermal:'TS5',quantum:'QM1',electro:'ED1'}[id]||id.split('.')[0]);
  const renderer=id=>window[moduleId(id)+'Renderer'];
  const modelAPI=id=>window[moduleId(id)+'Physics']||(moduleId(id)==='ED1'?P:null);
  const courses=[{id:'mechanics',short:'理论力学',icon:'◎'},{id:'electro',short:'电动力学',icon:'↗'},{id:'thermal',short:'热统',icon:'≋'},{id:'quantum',short:'量子力学',icon:'ψ'}];
  const courseId=lesson=>lesson.courseId || lesson.id;
  const demoId=id=>({'ED1.2':'electro','QM1.1':'quantum','CM2.2':'mechanics','TS5.1':'thermal'}[id]||id);
  // Preserve existing ED/QM panel IDs while adding the two new course panels.
  const views={
    electro:{name:'电动力学',prefix:'ED',entry:'ED1.1',tools:'electroTools',map:'electroMap',glossary:'electroGlossary',title:'glossaryModuleTitle',tabs:['mapViewBtn','demoViewBtn','glossaryViewBtn'],mapAPI:window.PhysicsQuestMap,data:window.ElectrodynamicsGlossary},
    quantum:{name:'量子力学',prefix:'QM',entry:'quantum',tools:'quantumTools',map:'quantumMap',glossary:'quantumGlossary',title:'quantumGlossaryModuleTitle',tabs:['quantumMapViewBtn','quantumDemoViewBtn','quantumGlossaryViewBtn'],mapAPI:window.PhysicsQuestQuantumMap,data:window.QuantumGlossary},
    mechanics:{name:'理论力学',prefix:'CM',entry:'CM1.1',tools:'mechanicsTools',map:'mechanicsMap',glossary:'mechanicsGlossary',title:'mechanicsGlossaryModuleTitle',tabs:['mechanicsMapViewBtn','mechanicsDemoViewBtn','mechanicsGlossaryViewBtn'],mapAPI:window.PhysicsQuestMechanicsMap,data:window.MechanicsGlossary},
    thermal:{name:'热力学与统计物理',prefix:'TS',entry:'TS1.1',tools:'thermalTools',map:'thermalMap',glossary:'thermalGlossary',title:'thermalGlossaryModuleTitle',tabs:['thermalMapViewBtn','thermalDemoViewBtn','thermalGlossaryViewBtn'],mapAPI:window.PhysicsQuestThermalMap,data:window.ThermalGlossary}
  };
  const $ = id => document.getElementById(id);
  const STORAGE_KEY='physics-quest-mvp-v1';
  let memoryState={};
  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; }
    catch (_) { return memoryState; }
  }
  let state=loadState();
  if (!state.lessons) state.lessons={};
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
    catch (_) { memoryState=state; $('savedIndicator').textContent='浏览器限制本地保存；请及时导出 Markdown。'; }
  }
  let current='mechanics';
  let params={};
  let start=performance.now();
  function currentLesson(){return levels.find(l=>l.id===current);}
  function progress(id){return state.lessons[id] || {predict:false,derive:false,note:''};}
  function setProgress(id, patch){state.lessons[id]={...progress(id),...patch};saveState();updateNav();Object.values(views).forEach(view=>view.mapAPI.refresh());}
  function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function updateNav(){
    $('courseNav').innerHTML=courses.map(l=>{
      const members=levels.filter(item=>courseId(item)===l.id);
      const count=members.filter(item=>progress(item.id).predict&&progress(item.id).derive).length;
      const active=courseId(currentLesson())===l.id;
      return `<button class="nav-item ${active?'active':''}" data-course="${l.id}" aria-current="${active?'page':'false'}"><span class="nav-icon">${l.icon}</span><span><b>${l.short}</b><small>${count} / ${members.length} 示范题完成</small></span><span class="nav-done">${count===members.length?'✓':''}</span></button>`;
    }).join('');
    document.querySelectorAll('[data-course]').forEach(b=>b.addEventListener('click',()=>{
      switchLesson(views[b.dataset.course].entry,{map:true,scroll:true});
    }));
    const complete=levels.filter(l=>progress(l.id).predict&&progress(l.id).derive).length;
    const points=levels.reduce((s,l)=>s+50*(Number(progress(l.id).predict)+Number(progress(l.id).derive)),0);
    $('progressText').textContent=`${complete} / ${levels.length}`;
    $('progressBar').style.width=(complete/levels.length*100)+'%';
    $('xpText').textContent=points;
  }
  function switchLesson(id,options={}){
    if (!levels.some(l=>l.id===id)) return;
    current=id;
    const l=currentLesson();
    glossaryModules[courseId(l)]=moduleId(id);
    params=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));
    $('subjectTag').textContent=l.short;
    $('lessonTitle').textContent=l.title;
    $('lessonIntro').textContent=l.intro;
    $('simTitle').textContent=l.simTitle;
    $('goalText').textContent=l.goal;
    $('mathText').textContent=l.math;
    $('modelNote').textContent=l.modelNote;
    $('simCanvas').className='ed1-canvas';
    $('resourceTitle').textContent=l.resourceTitle;
    $('resourceDescription').textContent=l.resourceDescription;
    $('resourceLink').href=l.resourceUrl;
    $('reflectionPrompt').textContent=l.reflection;
    $('reflection').value=progress(id).note || '';
    $('savedIndicator').textContent='';
    $('controls').innerHTML=l.controls.map(c=>c.type==='select' ?
      `<div class="control"><label for="slider-${c.id}">${escapeHTML(c.label)}</label><select id="slider-${c.id}" aria-label="${escapeHTML(c.label)}">${c.options.map(o=>`<option value="${o.value}" ${o.value===c.value?'selected':''}>${escapeHTML(o.label)}</option>`).join('')}</select></div>` :
      `<div class="control"><label for="slider-${c.id}"><span>${escapeHTML(c.label)}</span><output id="out-${c.id}">${l.mapId?Number(c.value.toPrecision(5)):c.value} ${escapeHTML(c.unit)}</output></label><input type="range" id="slider-${c.id}" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.value}" aria-label="${escapeHTML(c.label)}"></div>`).join('');
    l.controls.forEach(c=>$('slider-'+c.id).addEventListener(c.type==='select'?'change':'input',e=>{
      params[c.id]=Number(e.target.value);
      if(c.type!=='select')$('out-'+c.id).textContent=(l.mapId?Number(Number(e.target.value).toPrecision(5)):e.target.value)+' '+c.unit;
      drawMetrics();
    }));
    $('derivation').innerHTML=`<details><summary>${courseId(l)==='quantum'?'展开关键推导':'展开基础讲解'}（建议先独立思考）</summary>${l.derivation}</details>`+
      (l.graduate?`<details class="graduate-task"><summary>研究生进阶：推导与检验（自评）</summary><p>${escapeHTML(l.graduate.task)}</p><details><summary>查看自检要点</summary><p>${escapeHTML(l.graduate.check)}</p></details><p>请独立写出中间步骤，列明适用条件及相关边界；涉及近似时给出小参数和误差估计，再改变一个条件检验能否迁移。本练习不计入两道示范题的完成状态。</p></details>`:'');
    setupQuestion('prediction',l.prediction,'predict');
    setupQuestion('derive',l.derive,'derive');
    updateNav();drawMetrics();setCourseView(options.map===true?'map':'demo',options.scroll===true);
  }
  const glossaryModules={electro:null,quantum:null,mechanics:null,thermal:null};
  function renderGlossary(moduleId){
    const subject=courseId(currentLesson()),quantum=subject!=='electro',view=views[subject];
    const data=view.data;
    const mount=$(view.glossary);
    const titleId=view.title;
    const selected=data.modules.find(m=>m.id===moduleId)||data.modules[0];
    glossaryModules[subject]=selected.id;
    const total=data.modules.reduce((sum,m)=>sum+m.terms.length,0);
    mount.innerHTML=`<div class="glossary-heading"><p class="section-no">核心概念 · ${total} 个中英词条</p><h2>从中文概念到英文教材</h2><p>${quantum?escapeHTML(data.conventions):'按模块查阅名称、符号、含义和易混点。采用国际单位制；英文教材可能使用不同的度规、规范或单位约定。'}</p></div>`+
      `<div class="glossary-modules" role="group" aria-label="选择术语模块">${data.modules.map(m=>`<button type="button" data-glossary-module="${m.id}" aria-pressed="${m.id===selected.id}"><b>${m.id}</b> ${escapeHTML(m.title)}</button>`).join('')}</div>`+
      `<h3 id="${titleId}">${selected.id} · ${escapeHTML(selected.title)}</h3>`+
      `<p class="glossary-reading">教材定位：${selected.readings.map(([key,locator])=>`<a href="${escapeHTML(data.sources[key].url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(data.sources[key].title)}</a>（${escapeHTML(locator)}）`).join('；')}。</p>`+
      '<p class="glossary-hint">窄屏可在表格内横向滚动。对应小节使用课程编号；释义与易混点按本课程的模型条件理解。</p>'+
      `<div class="glossary-scroll" role="region" aria-labelledby="${titleId}" tabindex="0"><table><caption>${selected.id} 核心概念中英文对照 · ${selected.terms.length} 项</caption><thead><tr><th scope="col">中文名称</th><th scope="col">英文名称</th><th scope="col">符号／单位</th><th scope="col">概念含义</th><th scope="col">易混点与适用边界</th><th scope="col">对应小节</th></tr></thead><tbody>${selected.terms.map(t=>`<tr><th scope="row">${escapeHTML(t.zh)}</th><td lang="en">${escapeHTML(t.en)}</td><td>${escapeHTML(t.symbol)}</td><td>${escapeHTML(t.definition)}</td><td>${escapeHTML(t.caveat)}</td><td>${t.lessons.map(escapeHTML).join('、')}</td></tr>`).join('')}</tbody></table></div>`+
      (quantum?`<details class="map-sources"><summary>教材来源与核查边界</summary><p>${escapeHTML(data.scope)}</p><ul>${Object.values(data.sources).map(source=>`<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)}</a></li>`).join('')}</ul><p>更新：${escapeHTML(data.updated)}。本页供查词，浏览不计XP。</p></details>`:'');
    mount.querySelectorAll('[data-glossary-module]').forEach(button=>button.addEventListener('click',()=>{
      renderGlossary(button.dataset.glossaryModule);
      // Rendering replaces the selector buttons. Restore focus to the selected one.
      Array.from(mount.querySelectorAll('[data-glossary-module]')).find(b=>b.dataset.glossaryModule===glossaryModules[subject])?.focus();
    }));
  }
  function setCourseView(viewName,scroll=false){
    const lesson=currentLesson(),subject=courseId(lesson),view=views[subject];
    const showMap=viewName==='map',showGlossary=viewName==='glossary';
    for(const [key,item] of Object.entries(views)){
      const active=key===subject;
      $(item.tools).hidden=!active;
      item.mapAPI.show(active&&showMap);
      $(item.glossary).hidden=!(active&&showGlossary);
      item.tabs.forEach((id,index)=>{
        const selected=active&&index===(showMap?0:showGlossary?2:1);
        $(id).setAttribute('aria-selected',String(selected));
        $(id).setAttribute('tabindex',selected?'0':'-1');
      });
    }
    $('lessonLayout').hidden=showMap||showGlossary;
    $('lessonLayout').setAttribute('role','tabpanel');
    $('lessonLayout').setAttribute('aria-labelledby',view.tabs[1]);
    $('subjectTag').textContent=showMap||showGlossary?view.name:lesson.short;
    $('lessonTitle').textContent=showMap?view.name+'：8 模块课程地图':showGlossary?view.name+'：核心概念中英对照':lesson.title;
    $('lessonIntro').textContent=showMap?`在地图中选择${view.prefix}1～${view.prefix}8的32关交互示范。切换标签可返回当前实验，浏览不计XP；示范题完成不等于模块掌握，综合验收仍待实现。`:showGlossary?'中文理解物理含义，英文对应教材原词；返回交互示范可继续当前实验。':lesson.intro;
    if(showGlossary)renderGlossary(glossaryModules[subject]||moduleId(current));
    if(scroll){$('lessonTitle').scrollIntoView({block:'start'});$('lessonTitle').focus({preventScroll:true});}
  }
  function setupQuestion(prefix,question,field){
    const p=progress(current);
    $(prefix+'Question').textContent=question.q;
    const options=$(prefix+'Options');
    const badge=$(field+'Badge');
    const feedback=$(prefix+'Feedback');
    const completed=Boolean(p[field]);
    badge.textContent=completed?'已完成 +50 XP':'待完成';
    badge.className='badge'+(completed?' complete':'');
    options.innerHTML=question.options.map((opt,i)=>`<button class="option ${completed&&i===question.correct?'correct':''}" data-option="${i}" ${completed?'disabled':''}>${String.fromCharCode(65+i)} · ${escapeHTML(opt)}</button>`).join('');
    feedback.className='feedback'+(completed?' good':'');
    feedback.textContent=completed?question.explain:'';
    options.querySelectorAll('[data-option]').forEach(b=>b.addEventListener('click',()=>{
      if (progress(current)[field]) return;
      const selected=Number(b.dataset.option);
      if(selected===question.correct){
        setProgress(current,{[field]:true});
        setupQuestion(prefix,question,field);
      } else {
        options.querySelectorAll('.option').forEach(x=>x.classList.remove('incorrect'));
        b.classList.add('incorrect');
        feedback.className='feedback bad';
        feedback.textContent='还不对。请调整模拟参数或展开推导，再试一次。';
      }
    }));
  }
  function drawMetrics(){
    let m=[];
    if(current!=='electro'&&views[courseId(currentLesson())]){
      m=renderer(current).metrics(current,params,modelAPI(current));
    } else if(current==='mechanics'){
      const p=P.pendulum(params.length,params.g,params.theta);
      m=[['小角周期 T₀',p.tSmall.toFixed(3)+' s'],['准确周期 T',p.tExact.toFixed(3)+' s'],['相对偏差 (T/T₀−1)',p.relativeError.toFixed(2)+' %']];
    } else if(current==='electro'){
      const p=P.gauss(params.q,params.radius);
      m=[['球面径向场 Eᵣ',p.field.toFixed(2)+' N/C'],['总电通量 Φ',p.flux.toFixed(2)+' N·m²/C'],['包围电荷 Q',params.q+' nC']];
    } else if(current==='thermal'){
      const p=P.twoLevel(params.x);
      m=[['激发态占据率 p₁',(100*p.pExcited).toFixed(1)+' %'],['平均能量 ⟨E⟩/Δ',p.meanEnergyInDelta.toFixed(3)],['熵 S/kB',p.entropyInKB.toFixed(3)]];
    } else {
      const p=P.well(params.n,params.L,0.25);
      m=[['定态能量 Eₙ',p.energyEv.toFixed(3)+' eV'],['内部节点数',p.interiorNodes+''],['能量缩放规律','Eₙ ∝ n²/L²']];
    }
    $('metrics').innerHTML=m.map(([label,value])=>`<div class="metric"><small>${escapeHTML(label)}</small><strong>${escapeHTML(value)}</strong></div>`).join('');
    const table=current!=='electro'&&views[courseId(currentLesson())]?renderer(current).table(current,params,modelAPI(current)):null;
    $('fieldTable').hidden=!table;
    $('fieldTable').innerHTML=table?`<table><caption>模型数值与核验</caption><thead><tr>${table.headers.map(h=>`<th scope="col">${escapeHTML(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map((value,i)=>i?`<td>${escapeHTML(value)}</td>`:`<th scope="row">${escapeHTML(value)}</th>`).join('')}</tr>`).join('')}</tbody></table>`:'';
    draw(performance.now());
  }
  const canvas=$('simCanvas');
  const ctx=canvas.getContext('2d');
  const W=800,H=330;
  const nightColors={green:'#69e0c3',violet:'#b8a4ff',gold:'#ffd18b',muted:'#91a5bf',white:'#eaf4ff',grid:'#26384f'};
  const colors={...nightColors};
  function isDay(){return document.documentElement.getAttribute('data-theme')==='day';}
  function updateTheme(){
    const day=isDay();
    Object.assign(colors,day?{green:'#347957',violet:'#796494',gold:'#b87926',muted:'#000000',white:'#000000',grid:'#bacdb1'}:nightColors);
    $('themeToggle').setAttribute('aria-checked',String(day));
    $('themeToggle').setAttribute('aria-label',day?'切换到夜间模式':'切换到日间模式');
    $('themeIcon').textContent=day?'☀':'☾';
    $('themeLabel').textContent=day?'日间模式':'夜间模式';
  }
  $('themeToggle').addEventListener('click',()=>{
    const theme=isDay()?'night':'day';
    document.documentElement.setAttribute('data-theme',theme);
    // Keep appearance separate from XP and notes; storage failure does not block toggling.
    let persisted=true;
    try {localStorage.setItem('physics-quest-theme-v1',theme);} catch (_) {persisted=false;}
    updateTheme();
    if(!persisted)$('themeLabel').textContent+='（未保存）';
    draw(performance.now());
  });
  updateTheme();
  function line(x1,y1,x2,y2,color,width=2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
  function circle(x,y,r,color,fill=true,width=2){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);if(fill){ctx.fillStyle=color;ctx.fill();}else{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}}
  function text(s,x,y,color=colors.muted,size=13,align='left'){ctx.font=`${size}px -apple-system, BlinkMacSystemFont, sans-serif`;ctx.textAlign=align;ctx.fillStyle=isDay()?'#000000':color;ctx.fillText(s,x,y);}
  function arrow(x1,y1,x2,y2,color){line(x1,y1,x2,y2,color,2);const a=Math.atan2(y2-y1,x2-x1),size=7;line(x2,y2,x2-size*Math.cos(a-.48),y2-size*Math.sin(a-.48),color,2);line(x2,y2,x2-size*Math.cos(a+.48),y2-size*Math.sin(a+.48),color,2);}
  function axes(x0,y0,w,h,xlabel,ylabel){line(x0,y0,x0+w,y0,colors.muted,1);line(x0,y0,x0,y0-h,colors.muted,1);for(let i=1;i<5;i++){line(x0+i*w/5,y0,x0+i*w/5,y0-h,colors.grid,1);line(x0,y0-i*h/4,x0+w,y0-i*h/4,colors.grid,1);}text(xlabel,x0+w-4,y0+20,colors.muted,12,'right');text(ylabel,x0+4,y0-h-10,colors.muted,12);}
  function plot(fn,x0,y0,w,h,minX,maxX,minY,maxY,color,width=2){ctx.beginPath();for(let i=0;i<=240;i++){const x=minX+(maxX-minX)*i/240,y=fn(x);const px=x0+i*w/240,py=y0-h*(y-minY)/(maxY-minY);if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
  function draw(t){
    if(!ctx)return;
    ctx.clearRect(0,0,W,H);
    if(current!=='electro'&&views[courseId(currentLesson())]){renderer(current).draw(ctx,current,params,modelAPI(current),isDay()?{...colors,text:'#000000',purple:colors.violet}:null);return;}
    if(current==='mechanics')drawMechanics(t);
    if(current==='electro')drawElectro();
    if(current==='thermal')drawThermal();
    if(current==='quantum')drawQuantum();
  }
  function drawMechanics(t){
    const p=P.pendulum(params.length,params.g,params.theta);
    const theta0=params.theta*Math.PI/180;
    const theta=theta0*Math.cos(2*Math.PI*((t-start)/1000)/p.tExact);
    const pivotX=210,pivotY=62,rod=135;
    line(pivotX-115,pivotY,pivotX+115,pivotY,'#45617b',4);
    line(pivotX,pivotY,pivotX,pivotY+155,colors.grid,1);
    const x=pivotX+rod*Math.sin(theta),y=pivotY+rod*Math.cos(theta);
    line(pivotX,pivotY,x,y,colors.white,3);circle(x,y,14,colors.green);circle(pivotX,pivotY,5,colors.gold);
    text('理想单摆（轨迹示意）',70,285,colors.muted,13);
    axes(410,252,330,175,'振幅 θ₀ (°)','T/T₀');
    plot(a=>P.pendulum(params.length,params.g,a).tExact/P.pendulum(params.length,params.g,a).tSmall,410,252,330,175,0,120,1,1.9,colors.green,3);
    line(410,252,740,252,colors.violet,1);
    const ratio=p.tExact/p.tSmall;
    circle(410+330*params.theta/120,252-175*(ratio-1)/.9,6,colors.gold);
    text('有限振幅修正',565,49,colors.green,12);
    text('T₀：小角近似',565,66,colors.violet,12);
  }
  function drawElectro(){
    const cx=230,cy=157,rad=50+params.radius*35;
    circle(cx,cy,rad,'#4c7291',false,2);
    ctx.setLineDash([5,5]);circle(cx,cy,rad,'#4c7291',false,1);ctx.setLineDash([]);
    const sign=Math.sign(params.q),qColor=sign>=0?colors.gold:colors.violet;
    circle(cx,cy,14,qColor);text(sign>0?'+':sign<0?'−':'0',cx,cy+5,'#0b1020',16,'center');
    if(sign!==0){for(let i=0;i<12;i++){const a=i*Math.PI/6,ux=Math.cos(a),uy=Math.sin(a);const inner=25,outer=Math.min(rad+38,165);const r1=sign>0?inner:outer,r2=sign>0?outer:inner;arrow(cx+ux*r1,cy+uy*r1,cx+ux*r2,cy+uy*r2,qColor);}}
    text('球形高斯面的截面',125,309,colors.muted,13);
    text('∮ E · dA = Q / ε₀',477,123,colors.green,23);
    text('Eᵣ = Q / (4πε₀r²)',477,164,colors.white,21);
    text('面积增加 ↔ 电场减弱',477,215,colors.muted,15);
    text('净通量只由包围电荷决定',477,246,colors.muted,15);
  }
  function drawThermal(){
    const p=P.twoLevel(params.x);
    text('E = Δ',70,95,colors.muted,14);line(150,91,350,91,colors.violet,3);
    text('E = 0',70,239,colors.muted,14);line(150,235,350,235,colors.green,3);
    text('p₁ = '+p.pExcited.toFixed(3),200,72,colors.violet,14,'center');
    text('p₀ = '+p.pGround.toFixed(3),200,263,colors.green,14,'center');
    const barX=365,barW=18,barH=140;
    ctx.fillStyle=colors.violet;ctx.fillRect(barX,91,barW,barH*p.pExcited);
    ctx.fillStyle=colors.green;ctx.fillRect(barX,235-barH*p.pGround,barW,barH*p.pGround);
    axes(470,262,275,195,'x = Δ/(kBT)','p₁');
    plot(x=>P.twoLevel(x).pExcited,470,262,275,195,.2,6,0,.5,colors.violet,3);
    circle(470+(params.x-.2)/5.8*275,262-195*(p.pExcited/.5),6,colors.gold);
    text('高温 ←',473,293,colors.muted,12);
    text('→ 低温',740,293,colors.muted,12,'right');
  }
  function drawQuantum(){
    const n=params.n,L=params.L;
    text('ψₙ(x)（无量纲振幅）',50,45,colors.violet,14);
    axes(70,145,660,78,'x/L','');
    plot(x=>Math.sin(n*Math.PI*x),70,106,660,70,0,1,-1,1,colors.violet,3);
    text('|ψₙ(x)|²（无量纲）',50,187,colors.green,14);
    axes(70,300,660,95,'x/L','');
    plot(x=>2*Math.sin(n*Math.PI*x)**2,70,300,660,95,0,1,0,2,colors.green,3);
    text('0',70,320,colors.muted,12,'center');text('1',730,320,colors.muted,12,'center');
    text(`n = ${n}   ·   L = ${L.toFixed(1)} nm`,560,45,colors.gold,14);
  }
  $('saveNoteBtn').addEventListener('click',()=>{setProgress(current,{note:$('reflection').value});$('savedIndicator').textContent='✓ 已保存到本机浏览器';});
  $('reflection').addEventListener('change',()=>setProgress(current,{note:$('reflection').value}));
  $('exportBtn').addEventListener('click',()=>{
    setProgress(current,{note:$('reflection').value});
    const date=new Date().toISOString().slice(0,10);
    const parts=[`# Physics Quest · 四大力学学习记录`,``,`导出日期：${date}`,``,`示范题完成关卡：${levels.filter(l=>progress(l.id).predict&&progress(l.id).derive).length}/${levels.length}`,`总 XP：${levels.reduce((s,l)=>s+50*(Number(progress(l.id).predict)+Number(progress(l.id).derive)),0)}`,`说明：每关两道选择题完成不等于通过模块综合验收。`,``];
    levels.forEach(l=>{const p=progress(l.id);parts.push(`## ${l.short} · ${l.title}`,``,`- 预测挑战：${p.predict?'完成':'未完成'}`,`- 关键推导：${p.derive?'完成':'未完成'}`,`- 数学工具：${l.math}`,`- 官方模拟：${l.resourceUrl}`,``,`### 学习反思`,p.note||'（尚未记录）',``);});
    const blob=new Blob([parts.join('\n')],{type:'text/markdown;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`physics-quest-${date}.md`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  });
  $('resetBtn').addEventListener('click',()=>{
    if(!confirm('确定清空四门课程的挑战进度与学习笔记？此操作不可撤销。'))return;
    state={lessons:{}};saveState();switchLesson(current);
  });
  // Each course keeps its own tab controls and accessible panel relationships.
  for(const {tabs:group} of Object.values(views)){
    const viewNames=['map','demo','glossary'],viewTabs=group.map(id=>$(id));
    viewTabs.forEach((tab,index)=>{
      tab.addEventListener('click',()=>setCourseView(viewNames[index]));
      tab.addEventListener('keydown',event=>{
        let next;
        if(event.key==='ArrowRight')next=(index+1)%viewTabs.length;
        else if(event.key==='ArrowLeft')next=(index+viewTabs.length-1)%viewTabs.length;
        else if(event.key==='Home')next=0;
        else if(event.key==='End')next=viewTabs.length-1;
        else return;
        event.preventDefault();setCourseView(viewNames[next]);viewTabs[next].focus();
      });
    });
  }
  for(const view of Object.values(views))view.mapAPI.configure({onOpenLesson:id=>switchLesson(demoId(id),{scroll:true}),getProgress:id=>progress(demoId(id))});
  switchLesson(current,{map:true});
})();
