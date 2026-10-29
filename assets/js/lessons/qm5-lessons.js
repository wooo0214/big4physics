/* QM5: original stories, controls, questions and four-step explanations. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/quantum-curriculum.js'):root.QuantumCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.QM5Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
  'use strict';
  const rows=[
  {
    "intro": "设想一个电子被限制在近似抛物线形的势阱中：越偏离中心，回复作用越强。如果不断降低它的能量，电子能否最后停在阱底？先选n=0，改变角频率ω，对照最低能量、波包宽度与经典转折点；再增加n，观察节点。",
    "controls": [
      {
        "id": "n",
        "label": "激发量子数 n",
        "min": 0,
        "max": 12,
        "step": 1,
        "value": 0,
        "unit": ""
      },
      {
        "id": "omega",
        "label": "角频率 ω",
        "min": 0.2,
        "max": 4,
        "step": 0.1,
        "value": 1,
        "unit": "10¹⁵ rad/s"
      }
    ],
    "modelNote": "一维封闭理想谐振子，电子质量m；V=mω²x²/2且势能最低点为零。ξ=x/ℓ，ℓ=√(ℏ/mω)，能量eV、物理长度nm；图中为√ℓψ与ℓ|ψ|²。基态n=0，画窗不重归一化，不含阻尼或非谐项。",
    "derivation": "<p><b>物理问题</b>　零点能不是任意加上的势能常数：本页取V(0)=0，归一化态不能同时具有零位置与零动量涨落。</p><p><b>列式理由</b>　定义a=(ξ+∂ξ)/√2，a†=(ξ−∂ξ)/√2；H=ℏω(a†a+1/2)，a†a的本征值非负。</p><p><b>关键一步</b>　aψ₀=0给φ₀(ξ)=π⁻¹ᐟ⁴e⁻ξ²/2；升阶得到Eₙ=ℏω(n+1/2)，第n态有n个内部节点。</p><p><b>极限检验</b>　n=0时Δx=ℓ/√2、Δp=ℏ/(√2ℓ)，乘积ℏ/2；⟨T⟩=⟨V⟩=ℏω/4。ω改变时ξ与物理x不可混用。</p>",
    "prediction": {
      "q": "本页n=0时，平均动能为？",
      "options": [
        "0",
        "ℏω/4",
        "ℏω/2"
      ],
      "correct": 1,
      "explain": "总能量ℏω/2，由动能和势能各贡献一半。"
    },
    "derive": {
      "q": "ω增大到原来的4倍，基态位置标准差变为？",
      "options": [
        "原来的1/2",
        "原来的1/4",
        "原来的2倍"
      ],
      "correct": 0,
      "explain": "Δx∝ω⁻¹ᐟ²；能量则正比ω。"
    },
    "check": "把φ₀代入微分方程；独立积分归一化与⟨ξ²⟩。注意零点总能量与平均动能不同。",
    "mapId": "QM5.1",
    "id": "QM5.1",
    "courseId": "quantum",
    "short": "量子力学 · QM5.1",
    "simTitle": "谐振子与经典对应 · 实验1"
  },
  {
    "intro": "你用很弱的电场扰动一个谐振子，想把它从n态激发到k态。只要外场频率匹配能级差，任何两态都能相连吗？先选位置算符ξ，逐个改变末态k；再切换动量算符，比较非零矩阵元的大小与相位。",
    "controls": [
      {
        "id": "n",
        "label": "初态 n",
        "min": 0,
        "max": 5,
        "step": 1,
        "value": 0,
        "unit": ""
      },
      {
        "id": "k",
        "label": "末态 k",
        "min": 0,
        "max": 5,
        "step": 1,
        "value": 1,
        "unit": ""
      },
      {
        "id": "operator",
        "label": "所选算符",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "位置 ξ=x/ℓ"
          },
          {
            "value": 1,
            "label": "动量 π=pℓ/ℏ"
          }
        ]
      }
    ],
    "modelNote": "显示n=0…5的有限矩阵；ξ和π无量纲，真实x矩阵元乘ℓ、p矩阵元乘ℏ/ℓ。积分另用完整解析波函数。右图为截断[a,a†]，最高层偏离I来自截断；不是物理梯子的终点。仅讨论线性x或p耦合。",
    "derivation": "<p><b>物理问题</b>　跃迁强弱取决于相互作用的矩阵元，能量匹配只是必要信息之一。</p><p><b>列式理由</b>　ξ=(a+a†)/√2，π=i(a†−a)/√2；a|n⟩=√n|n−1⟩，a†|n⟩=√(n+1)|n+1⟩。</p><p><b>关键一步</b>　⟨k|ξ|n⟩只在k=n±1非零，系数为√n/√2或√(n+1)/√2；π有相对虚相位。</p><p><b>极限检验</b>　⟨n|ξ|n⟩=0；a|0⟩=0。六维截断的对易子为diag(1,1,1,1,1,−5)，迹为零；完整空间对易关系不变。</p>",
    "prediction": {
      "q": "线性位置耦合下，0→2的矩阵元如何？",
      "options": [
        "非零",
        "等于1",
        "为零"
      ],
      "correct": 2,
      "explain": "相邻能级之外的位置矩阵元为零；x²等其他耦合有不同规则。"
    },
    "derive": {
      "q": "有限维矩阵为何不能严格满足[a,a†]=I？",
      "options": [
        "任意对易子的迹为0，而I的迹为维数",
        "因为量子力学失效",
        "因为ℏ=0"
      ],
      "correct": 0,
      "explain": "迹的循环性质给Tr(AB−BA)=0。"
    },
    "check": "对波函数积分⟨k|ξ|n⟩及−i⟨k|∂ξ|n⟩，核对与升降代数一致；最高态还能升到显示窗之外的n=6。",
    "mapId": "QM5.2",
    "id": "QM5.2",
    "courseId": "quantum",
    "short": "量子力学 · QM5.2",
    "simTitle": "谐振子与经典对应 · 实验2"
  },
  {
    "intro": "你没有把电子制备在单一能级，而是把基态波包整体移开并赋予平均动量。放手后，这个波包会像经典振子一样往返，同时保持宽度吗？先取α=0，再改变α的实部、虚部并拖动ωt；观察均值与能级分布。",
    "controls": [
      {
        "id": "re",
        "label": "α实部",
        "min": -3,
        "max": 3,
        "step": 0.1,
        "value": 1.5,
        "unit": ""
      },
      {
        "id": "im",
        "label": "α虚部",
        "min": -3,
        "max": 3,
        "step": 0.1,
        "value": 0,
        "unit": ""
      },
      {
        "id": "tau",
        "label": "演化相位 ωt",
        "min": 0,
        "max": 12.566370614359172,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "omega",
        "label": "角频率 ω",
        "min": 0.2,
        "max": 4,
        "step": 0.1,
        "value": 1,
        "unit": "10¹⁵ rad/s"
      },
      {
        "id": "cutoff",
        "label": "展示能级上限 N",
        "min": 0,
        "max": 40,
        "step": 1,
        "value": 12,
        "unit": ""
      }
    ],
    "modelNote": "封闭理想谐振子解析相干态，α(t)=αe⁻ⁱωt。左图显示全轴归一化高斯；右图只列0…N的原始泊松概率，不把截断权重重新归一化。ξ=x/ℓ、π=pℓ/ℏ均无量纲，数值表另给nm、kg·m/s及eV。时间须手动调节。",
    "derivation": "<p><b>物理问题</b>　经典均值运动与确定粒子轨迹不同：每次位置测量仍有有限宽度。</p><p><b>列式理由</b>　相干态满足a|α⟩=α|α⟩；随谐振子演化，α仅在复平面转动，另有不可观测共同相位。</p><p><b>关键一步</b>　⟨ξ⟩=√2 Reα(t)，⟨π⟩=√2 Imα(t)；Δξ=Δπ=1/√2。Pₙ=e⁻|α|²|α|²ⁿ/n!，⟨H⟩=ℏω(|α|²+1/2)。</p><p><b>极限检验</b>　α=0回到基态。增大N只改变列出的泊松权重与遗漏概率，不改变左图解析高斯；能量占据不随时间改变。</p>",
    "prediction": {
      "q": "相干态演化时，位置分布的宽度怎样？",
      "options": [
        "随时间无限增长",
        "在理想谐振子中不变",
        "总为零"
      ],
      "correct": 1,
      "explain": "理想谐振子等间隔能谱使相干高斯的宽度保持。"
    },
    "derive": {
      "q": "相干态的平均激发数为？",
      "options": [
        "|α|",
        "|α|²",
        "α²"
      ],
      "correct": 1,
      "explain": "泊松分布均值与方差均为|α|²。"
    },
    "check": "由泊松分布求⟨N⟩与Var(N)，核对ΔxΔp/ℏ=1/2。N=0但α≠0时，报告遗漏权重，不能伪装为基态。",
    "mapId": "QM5.3",
    "id": "QM5.3",
    "courseId": "quantum",
    "short": "量子力学 · QM5.3",
    "simTitle": "谐振子与经典对应 · 实验3"
  },
  {
    "intro": "一个高激发数态的密度布满节点，而经典振子在转折点附近停留更久。两种图形看起来不同，所谓经典对应究竟比较什么？先增加n观察原始密度，再改变分箱数，比较同一有限分辨率下的区间概率。",
    "controls": [
      {
        "id": "n",
        "label": "激发量子数 n",
        "min": 0,
        "max": 40,
        "step": 1,
        "value": 12,
        "unit": ""
      },
      {
        "id": "bins",
        "label": "等宽箱数（范围−1.5…1.5）",
        "min": 6,
        "max": 60,
        "step": 1,
        "value": 18,
        "unit": ""
      }
    ],
    "modelNote": "比较同能量的数态和经典均匀相位系综；y=x/A，A=ℓ√(2n+1)，图中密度对dy归一。左图保留原始量子密度与经典密度；经典端点有可积发散，端点不绘有限值。右图显示区间概率除以箱宽，标明箱宽，无任意平滑。",
    "derivation": "<p><b>物理问题</b>　高n数态仍是定态，概率密度不随时间运动；经典比较对象是均匀取相位的系综。</p><p><b>列式理由</b>　经典轨迹x=A cosωt给p(y)=1/[π√(1−y²)]，仅在|y|<1有密度。</p><p><b>关键一步</b>　量子p(y)=√(2n+1)|φₙ(√(2n+1)y)|²。分箱概率用数值积分，经典概率用arcsin端点差独立计算。</p><p><b>极限检验</b>　增大n并固定有物理意义的箱宽可减弱快速振荡差异；不能声称逐点收敛。转折点外量子概率非零，图窗遗漏另列。</p>",
    "prediction": {
      "q": "高n数态是否变成沿轨道运动的局域粒子？",
      "options": [
        "是",
        "否",
        "仅在节点处是"
      ],
      "correct": 1,
      "explain": "单能量本征态的密度不随时间变化，不能与局域波包混为一谈。"
    },
    "derive": {
      "q": "经典端点处密度发散意味着什么？",
      "options": [
        "端点概率无限大",
        "波函数未归一化",
        "密度可积，有限区间概率仍有限"
      ],
      "correct": 2,
      "explain": "arcsin积分给有限概率，总概率仍为1。"
    },
    "check": "固定分箱方案比较多个n，同时记录箱宽和画窗；检查远离与邻近转折点的箱，不要求误差随n严格单调。",
    "mapId": "QM5.4",
    "id": "QM5.4",
    "courseId": "quantum",
    "short": "量子力学 · QM5.4",
    "simTitle": "谐振子与经典对应 · 实验4"
  }
];
  return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId);const {check,...lesson}=row;return {...lesson,title:design.title,goal:design.acceptance,math:design.derivation,reflection:design.question+' 请写下预测、一次参数对照及模型适用边界。',graduate:{task:design.graduateTask,check},resourceTitle:'麻省理工学院 · 量子物理讲义',resourceDescription:'公开课程入口供补充阅读；本页模型、故事与图示由项目原创实现，不复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/'};});
});
