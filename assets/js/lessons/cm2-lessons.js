/* Original CM teaching text and questions. IDs preserve the legacy pendulum record. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/mechanics-curriculum.js'):root.MechanicsCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.CM2Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
 'use strict';
 const rows=[
  {
    "mapId": "CM2.1",
    "id": "CM2.1",
    "courseId": "mechanics",
    "short": "理论力学 · CM2.1",
    "controls": [
      {
        "id": "m",
        "label": "质量 m",
        "min": 0.5,
        "max": 5,
        "value": 1,
        "unit": "kg",
        "step": 0.1
      },
      {
        "id": "g",
        "label": "重力加速度 g",
        "min": 2,
        "max": 20,
        "value": 9.8,
        "unit": "m/s²",
        "step": 0.1
      },
      {
        "id": "angle",
        "label": "斜面倾角 α",
        "min": 0,
        "max": 80,
        "value": 30,
        "unit": "°",
        "step": 1
      },
      {
        "id": "ds",
        "label": "允许虚位移 δs",
        "min": -0.2,
        "max": 0.2,
        "value": 0.05,
        "unit": "m",
        "step": 0.01
      }
    ],
    "intro": "同一个光滑斜面问题，能否用一个坐标避开未知支持力？先沿斜面选择s，再让允许虚位移反向，比较重力与支持力对这一位移做的虚功。",
    "steps": [
      "约束已经限定运动方向，只需要一个独立广义坐标s。",
      "固定时刻允许δr=(cosα,−sinα)δs；理想反力垂直这条方向。",
      "δW=mg sinα δs=Qs δs，支持力虚功为零；Qs=−∂V/∂s。",
      "δs反向时重力虚功反向；α=0时Qs=0，不表示重力消失。"
    ],
    "prediction": {
      "q": "光滑固定斜面的支持力对允许虚位移做多少虚功？",
      "options": [
        "零",
        "mgδs",
        "Nδs"
      ],
      "correct": 0,
      "explain": "支持力垂直于沿面的允许虚位移。"
    },
    "derive": {
      "q": "取s沿斜面向下，重力广义力Qs为？",
      "options": [
        "0",
        "mg sinα",
        "−mg cosα"
      ],
      "correct": 1,
      "explain": "V=−mg s sinα，因此Qs=−∂sV=mg sinα。"
    },
    "check": "将虚功表达与Euler–Lagrange方程m s̈=Qs对照；说明实际位移与虚位移的区别。",
    "extraNote": ""
  },
  {
    "mapId": "CM2.2",
    "id": "mechanics",
    "courseId": "mechanics",
    "short": "理论力学 · CM2.2",
    "controls": [
      {
        "id": "length",
        "label": "摆长 L",
        "min": 0.4,
        "max": 3,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "g",
        "label": "重力加速度 g",
        "min": 2,
        "max": 20,
        "value": 9.8,
        "unit": "m/s²",
        "step": 0.5
      },
      {
        "id": "theta",
        "label": "初始振幅 θ₀",
        "min": 5,
        "max": 120,
        "value": 30,
        "unit": "°",
        "step": 5
      }
    ],
    "intro": "同一根摆线，小幅摆动和大幅摆动的周期一样吗？先固定摆长只增大振幅，再把摆长增大四倍，对照准确周期与小角近似，判断哪一个近似被改变。",
    "steps": [
      "单摆的能量守恒并不保证不同振幅有同一周期。",
      "取广义坐标θ，ℒ=mL²θ̇²/2−mgL(1−cosθ)，约束已吸收在摆长固定条件中。",
      "变分得到θ̈+(g/L)sinθ=0；只有|θ|≪1弧度时才可用sinθ≈θ，得到T0=2π√(L/g)。",
      "有限振幅准确周期由椭圆积分给出；θ0→0恢复T0，大振幅时周期变长。"
    ],
    "prediction": {
      "q": "在小角度、同一重力场中，摆长从 L 增大到 4L，周期如何变化？",
      "options": [
        "增大到 4 倍",
        "增大到 2 倍",
        "缩短到 1/2"
      ],
      "correct": 1,
      "explain": "T≈2π√(L/g)，因此 L→4L 时 T→2T。试着将摆长滑块从 0.5 m 改为 2.0 m。"
    },
    "derive": {
      "q": "对理想单摆使用小角近似后，正确的运动方程是？",
      "options": [
        "θ̈ + (g/L)θ = 0",
        "θ̈ − (g/L)θ = 0",
        "θ̈ + (g/L²)θ = 0"
      ],
      "correct": 0,
      "explain": "变分得到 θ̈+(g/L)sinθ=0；再用 sinθ≈θ，得到简谐振子方程。"
    },
    "check": "从能量积分推导周期并说明AGM计算；对5°与120°分别给出小角周期的相对误差。",
    "extraNote": "准确周期由AGM计算；相图由精确能量关系构造，无数值时间积分、无平滑。"
  },
  {
    "mapId": "CM2.3",
    "id": "CM2.3",
    "courseId": "mechanics",
    "short": "理论力学 · CM2.3",
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
        "label": "振子角频率 ω",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      },
      {
        "id": "duration",
        "label": "固定端点时长 T",
        "min": 0.5,
        "max": 8,
        "value": 2,
        "unit": "s",
        "step": 0.1
      },
      {
        "id": "amp",
        "label": "试探路径幅度 A",
        "min": -2,
        "max": 2,
        "value": 0.7,
        "unit": "m",
        "step": 0.1
      }
    ],
    "intro": "两端位置都固定为零，真实的静止轨迹是否一定让作用量最小？先把试探路径幅度调到零，再让时长越过π/ω，观察作用量曲线为什么会从向上弯变为向下弯。",
    "steps": [
      "作用量原理要求一阶变分为零，不能直接改写为普遍最小。",
      "取qA(t)=A sin(πt/T)，满足q(0)=q(T)=0；q=0始终是真实解。",
      "积分得到S(A)=mA²(π²/T−ω²T)/4，A=0处一阶导数总为零，二阶项符号随T变化。",
      "T<π/ω沿此方向增大作用量，T>π/ω则减小；等号时出现共轭端点退化。"
    ],
    "prediction": {
      "q": "一阶变分为零是否保证作用量为严格最小？",
      "options": [
        "总是保证",
        "只有质量为零才不保证",
        "不保证"
      ],
      "correct": 2,
      "explain": "驻定包括最小、最大或鞍点；需进一步分析二阶变分及允许变分。"
    },
    "derive": {
      "q": "T>π/ω时，此试探族中S(A)关于A如何弯曲？",
      "options": [
        "向下弯，A=0沿此方向非最小",
        "向上弯",
        "恒为零"
      ],
      "correct": 0,
      "explain": "π²/T−ω²T<0，故A²系数为负。"
    },
    "check": "独立积分动能与势能项，核验T=π/ω时整族为精确解；不从单一试探方向推断全部变分的分类。",
    "extraNote": ""
  },
  {
    "mapId": "CM2.4",
    "id": "CM2.4",
    "courseId": "mechanics",
    "short": "理论力学 · CM2.4",
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
        "id": "r",
        "label": "当前半径 r",
        "min": 0.4,
        "max": 3,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "omega",
        "label": "当前角速度 φ̇",
        "min": -2,
        "max": 2,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      },
      {
        "id": "k",
        "label": "中心势强度 k",
        "min": 0.5,
        "max": 4,
        "value": 1,
        "unit": "J·m",
        "step": 0.1
      }
    ],
    "intro": "中心力运动中，粒子靠近中心时为什么转得更快？先在某一半径指定角速度，固定由此确定的角动量，再扫半径，比较守恒角动量与变化的角速度。",
    "steps": [
      "中心势不区分方位角，绕中心转动不改变势能。",
      "ℒ=m(ṙ²+r²φ̇²)/2+k/r不显含φ，因此φ是循环坐标。",
      "pφ=∂ℒ/∂φ̇=mr²φ̇守恒，消去φ̇后得到Veff=pφ²/(2mr²)−k/r。",
      "pφ固定时r加倍，φ̇降到1/4；pφ=0时离心屏障消失。"
    ],
    "prediction": {
      "q": "φ是循环坐标直接保证哪个量守恒？",
      "options": [
        "pφ=mr²φ̇",
        "角速度φ̇",
        "半径r"
      ],
      "correct": 0,
      "explain": "循环坐标对应其共轭动量守恒，不保证坐标速度恒定。"
    },
    "derive": {
      "q": "固定非零角动量，半径加倍时角速度变为？",
      "options": [
        "2倍",
        "1/4",
        "1/2"
      ],
      "correct": 1,
      "explain": "φ̇=pφ/(mr²)。"
    },
    "check": "从Noether旋转对称性解释守恒；区分取ṙ=0的瞬时初值与满足径向平衡的圆轨道。",
    "extraNote": ""
  }
];
 const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId),{steps,check,extraNote,...base}=row;return {...base,title:design.title,simTitle:design.title+'：模型与核验',goal:design.acceptance,math:design.derivation,modelNote:design.model+' '+extraNote+' 本页数值采用明确的SI或标注的无量纲尺度，不作平滑。',reflection:design.question+' 请写出一项数值、极限或守恒核验，并说明条件。',derivation:steps.map((p,i)=>'<p><b>'+['物理问题','列式理由','关键一步','极限检验'][i]+'</b>　'+escape(p)+'</p>').join(''),graduate:{task:design.graduateTask,check},resourceTitle:'MIT OpenCourseWare · Classical Mechanics III',resourceDescription:'公开讲义供主题定位及补充阅读；关卡模型、故事与题目由本项目编写，未复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/'};});
});
