/* Original CM teaching text and questions. IDs preserve the legacy pendulum record. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/mechanics-curriculum.js'):root.MechanicsCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.CM7Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
 'use strict';
 const rows=[
  {
    "mapId": "CM7.1",
    "id": "CM7.1",
    "courseId": "mechanics",
    "short": "理论力学 · CM7.1",
    "controls": [
      {
        "id": "m",
        "label": "质量 m",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "kg",
        "step": 0.1
      },
      {
        "id": "omega",
        "label": "角频率 ω",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      },
      {
        "id": "q",
        "label": "当前位置 q",
        "min": -2,
        "max": 2,
        "value": 0.7,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "p",
        "label": "当前动量 p",
        "min": -2,
        "max": 2,
        "value": 1,
        "unit": "kg·m/s",
        "step": 0.1
      },
      {
        "id": "kind",
        "label": "F：0=q/1=p/2=qp/3=H",
        "min": 0,
        "max": 3,
        "value": 2,
        "unit": "",
        "step": 1
      }
    ],
    "intro": "某个时刻一个量的变化率为零，就能称它为守恒量吗？先在q、p、qp和H之间切换，再改变当前状态，对照泊松括号与完整解析轨迹上的函数值。",
    "steps": [
      "守恒是对沿整条轨迹的变化作判断，一个点导数为零通常不够。",
      "取{F,G}=FqGp−FpGq；F不显含t时dF/dt={F,H}。",
      "谐振子中{q,H}=p/m、{p,H}=−mω²q、{qp,H}=p²/m−mω²q²，而{H,H}=0。",
      "在转向点{q,H}=0却不代表q守恒；反对称性保证{H,H}=0对所有状态成立。"
    ],
    "prediction": {
      "q": "不显含t的F在自治系统中满足什么条件可作为态无关守恒判据？",
      "options": [
        "某一点F=0",
        "某一点导数为零",
        "{F,H}处处为零"
      ],
      "correct": 2,
      "explain": "需要在相关相空间区域沿流恒定，而不是仅有孤立驻点。"
    },
    "derive": {
      "q": "采用本课括号约定，{q,p}等于？",
      "options": [
        "+1",
        "−1",
        "0"
      ],
      "correct": 0,
      "explain": "直接用∂q q=1和∂p p=1代入定义。"
    },
    "check": "对四种F沿解析q(t)、p(t)独立差分核对dF/dt；逐项标明括号量纲。",
    "extraNote": ""
  },
  {
    "mapId": "CM7.2",
    "id": "CM7.2",
    "courseId": "mechanics",
    "short": "理论力学 · CM7.2",
    "controls": [
      {
        "id": "a",
        "label": "缩放常数 a",
        "min": 0.3,
        "max": 3,
        "value": 1.5,
        "unit": "",
        "step": 0.1
      },
      {
        "id": "q",
        "label": "当前q",
        "min": -2,
        "max": 2,
        "value": 0.7,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "p",
        "label": "当前p",
        "min": -2,
        "max": 2,
        "value": 1,
        "unit": "kg·m/s",
        "step": 0.1
      },
      {
        "id": "kind",
        "label": "类型：0倒数/1同向缩放",
        "min": 0,
        "max": 1,
        "value": 0,
        "unit": "",
        "step": 1
      }
    ],
    "intro": "把坐标放大，是否随便缩放动量都能保留哈密顿方程的形式？先比较倒数缩放和同向缩放，再让比例回到1，检查基本泊松括号与相面积。",
    "steps": [
      "正则性要求保持辛结构；仅换个变量名并不能自动保留它。",
      "比较Q=aq、P=p/a与Q=aq、P=ap，a为正的无量纲常数。",
      "前者{Q,P}=1、面积因子1；后者{Q,P}=a²，一般不正则。",
      "a=1两者都是恒等变换；多自由度中det=1只是必要条件，不能替代完整辛条件。"
    ],
    "prediction": {
      "q": "Q=aq时，哪种P保证这对变量正则？",
      "options": [
        "P=p/a",
        "P=ap",
        "P=p+a"
      ],
      "correct": 0,
      "explain": "倒数缩放使{Q,P}=a/a=1。"
    },
    "derive": {
      "q": "同向缩放Q=aq、P=ap的基本括号为？",
      "options": [
        "0",
        "a²",
        "1/a²"
      ],
      "correct": 1,
      "explain": "对q、p各求导，乘积为a²。"
    },
    "check": "写二维Jacobian并核验MᵀJM=J；另外构造四维det=1但非辛的反例。",
    "extraNote": ""
  },
  {
    "mapId": "CM7.3",
    "id": "CM7.3",
    "courseId": "mechanics",
    "short": "理论力学 · CM7.3",
    "controls": [
      {
        "id": "m",
        "label": "质量 m",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "kg",
        "step": 0.1
      },
      {
        "id": "omega",
        "label": "角频率 ω",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      },
      {
        "id": "E",
        "label": "振子能量 E",
        "min": 0,
        "max": 5,
        "value": 1,
        "unit": "J",
        "step": 0.1
      },
      {
        "id": "phi",
        "label": "角变量 φ",
        "min": 0,
        "max": 6.283185307179586,
        "value": 0.7,
        "unit": "rad",
        "step": 0.1
      }
    ],
    "intro": "同一个椭圆相轨道，能否换成一个恒定半径式变量和一个匀速前进的角？先保持能量改变相位，再改变角频率，比较作用量与相轨道面积。",
    "steps": [
      "把周期运动的轨道标签与沿轨道的相位分开，可以简化时间演化。",
      "定义J=(1/2π)∮p dq=E/ω，约定q=√(2J/mω)sinφ、p=√(2mωJ)cosφ。",
      "在此约定中{φ,J}=1，H=ωJ，所以J̇=0而φ̇=ω。",
      "J→0时椭圆缩成点，角变量不再唯一；不能在原点声称相位可被物理区分。"
    ],
    "prediction": {
      "q": "谐振子作用量J为？",
      "options": [
        "2πE/ω",
        "E/ω",
        "Eω"
      ],
      "correct": 1,
      "explain": "采用含1/(2π)的作用量定义。"
    },
    "derive": {
      "q": "J=0时角变量φ如何理解？",
      "options": [
        "仍唯一可测",
        "必定等于π",
        "原点上未定义"
      ],
      "correct": 2,
      "explain": "零振幅没有可区分的轨道相位。"
    },
    "check": "独立积分椭圆面积并验证{φ,J}=1的符号；对相位约定不同的教材先写清变换。",
    "extraNote": ""
  },
  {
    "mapId": "CM7.4",
    "id": "CM7.4",
    "courseId": "mechanics",
    "short": "理论力学 · CM7.4",
    "controls": [
      {
        "id": "m",
        "label": "粒子质量 m",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "kg",
        "step": 0.1
      },
      {
        "id": "P",
        "label": "常量动量 P",
        "min": -2,
        "max": 2,
        "value": 1,
        "unit": "kg·m/s",
        "step": 0.1
      },
      {
        "id": "Q",
        "label": "初始位置常量 Q",
        "min": -2,
        "max": 2,
        "value": 0.5,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "time",
        "label": "当前时刻 t",
        "min": 0,
        "max": 5,
        "value": 2,
        "unit": "s",
        "step": 0.1
      },
      {
        "id": "q",
        "label": "求S处的位置 q",
        "min": -3,
        "max": 3,
        "value": 1,
        "unit": "m",
        "step": 0.1
      }
    ],
    "intro": "一个随位置和时间变化的作用函数，如何编码自由粒子的整族直线轨迹？先固定常量P观察S对q的斜率，再改变Q，检查它怎样选出不同的初始位置。",
    "steps": [
      "哈密顿—雅可比方程把动力学写为作用函数的一阶偏微分方程。",
      "自由粒子取完整积分S(q,P,t)=Pq−P²t/(2m)，满足∂tS+(∂qS)²/(2m)=0。",
      "p=∂qS=P，另一积分常量Q=∂PS=q−Pt/m，反解得q(t)=Q+Pt/m。",
      "P=0轨迹静止；改变P是在比较不同匀速解，不表示单条轨迹受到加速。"
    ],
    "prediction": {
      "q": "对S=Pq−P²t/(2m)，p等于？",
      "options": [
        "P²/(2m)",
        "Q",
        "P"
      ],
      "correct": 2,
      "explain": "正则动量p=∂qS。"
    },
    "derive": {
      "q": "Q=∂PS给出的自由粒子轨迹为？",
      "options": [
        "q=Q+Pt/m",
        "q=Q+Pt²/(2m)",
        "q=P+Qt"
      ],
      "correct": 0,
      "explain": "Q=q−Pt/m，直接反解。"
    },
    "check": "将S的偏导独立代回HJ方程，区分求S的任意(q,t)与选定Q轨迹上的点。",
    "extraNote": ""
  }
];
 const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId),{steps,check,extraNote,...base}=row;return {...base,title:design.title,simTitle:design.title+'：模型与核验',goal:design.acceptance,math:design.derivation,modelNote:design.model+' '+extraNote+' 本页数值采用明确的SI或标注的无量纲尺度，不作平滑。',reflection:design.question+' 请写出一项数值、极限或守恒核验，并说明条件。',derivation:steps.map((p,i)=>'<p><b>'+['物理问题','列式理由','关键一步','极限检验'][i]+'</b>　'+escape(p)+'</p>').join(''),graduate:{task:design.graduateTask,check},resourceTitle:'MIT OpenCourseWare · Classical Mechanics III',resourceDescription:'公开讲义供主题定位及补充阅读；关卡模型、故事与题目由本项目编写，未复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/'};});
});
