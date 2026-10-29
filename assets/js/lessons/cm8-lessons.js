/* Original CM teaching text and questions. IDs preserve the legacy pendulum record. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/mechanics-curriculum.js'):root.MechanicsCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.CM8Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
 'use strict';
 const rows=[
  {
    "mapId": "CM8.1",
    "id": "CM8.1",
    "courseId": "mechanics",
    "short": "理论力学 · CM8.1",
    "controls": [
      {
        "id": "a",
        "label": "二次系数 a",
        "min": -2,
        "max": 2,
        "value": 1,
        "unit": "N/m",
        "step": 0.1
      },
      {
        "id": "b",
        "label": "正四次系数 b",
        "min": 0.2,
        "max": 2,
        "value": 1,
        "unit": "N/m³",
        "step": 0.1
      }
    ],
    "intro": "一个势阱怎样随着参数改变分裂成两个？先把二次系数从正扫到负，检查平衡支和曲率，再在临界值停下，区分稳定平衡与会吸引轨迹的状态。",
    "steps": [
      "非线性高阶项可以在原平衡失稳后产生新的稳定位置。",
      "对V=aq²/2+bq⁴/4、b>0求V′=q(a+bq²)=0。",
      "a<0时原点曲率a<0，两侧q=±√(−a/b)的曲率−2a>0；a>0只有原点。",
      "a=0时四次势仍有稳定极小，但线性频率为零；保守系统稳定点不是耗散吸引子。"
    ],
    "prediction": {
      "q": "a<0、b>0时，两侧平衡点位置为？",
      "options": [
        "±√(−a/b)",
        "±√(a/b)",
        "±a/b"
      ],
      "correct": 0,
      "explain": "解a+bq²=0，需q²=−a/b>0。"
    },
    "derive": {
      "q": "保守系统势能极小点是否自动为吸引子？",
      "options": [
        "只有b=0才是",
        "不是，邻近轨道可持续振动",
        "是，所有轨道都衰减到它"
      ],
      "correct": 1,
      "explain": "没有耗散时能量不会自动降低。"
    },
    "check": "计算所有支的曲率，并从能量守恒解释稳定和吸引的区别；不得把静态分岔图当时间轨迹。",
    "extraNote": ""
  },
  {
    "mapId": "CM8.2",
    "id": "CM8.2",
    "courseId": "mechanics",
    "short": "理论力学 · CM8.2",
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
        "id": "k",
        "label": "二次系数 k",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "N/m",
        "step": 0.1
      },
      {
        "id": "lambda",
        "label": "正四次系数 λ",
        "min": 0,
        "max": 3,
        "value": 0.5,
        "unit": "N/m³",
        "step": 0.1
      },
      {
        "id": "A",
        "label": "转向振幅 A",
        "min": 0.1,
        "max": 2,
        "value": 0.7,
        "unit": "m",
        "step": 0.1
      }
    ],
    "intro": "一根硬化弹簧拉得越开，周期还会保持不变吗？先把四次项设为零，再增加振幅，对照去奇异周期积分与弱非谐近似，检查近似的小参数是否仍然足够小。",
    "steps": [
      "非谐势使回复力随振幅增强，周期不再仅由势阱底曲率决定。",
      "V=kq²/2+λq⁴/4，E=V(A)；周期为四倍从0到A的能量积分。",
      "令q=A sinu消除转向点根号奇异，得到光滑被积函数；用256与512子区间Simpson比较。",
      "λ=0恢复2π√(m/k)；ε=λA²/k≪1时ω≈ω0(1+3ε/8)，ε大时只把它作为外推对照。"
    ],
    "prediction": {
      "q": "正四次势λ>0通常怎样改变大振幅周期？",
      "options": [
        "随振幅增大而发散",
        "随振幅增大而缩短",
        "始终不变"
      ],
      "correct": 1,
      "explain": "硬化势增强回复，频率升高。"
    },
    "derive": {
      "q": "弱非谐近似应检查哪个无量纲参数？",
      "options": [
        "λA/k",
        "λ/k",
        "λA²/k"
      ],
      "correct": 2,
      "explain": "比较四次与二次恢复力的尺度，得λA²/k。"
    },
    "check": "独立推导去奇异被积式；将子区间再加倍核对收敛，并区分步长差与严格误差上界。",
    "extraNote": ""
  },
  {
    "mapId": "CM8.3",
    "id": "CM8.3",
    "courseId": "mechanics",
    "short": "理论力学 · CM8.3",
    "controls": [
      {
        "id": "c",
        "label": "无量纲阻尼 c",
        "min": 0,
        "max": 0.8,
        "value": 0.2,
        "unit": "",
        "step": 0.05
      },
      {
        "id": "f",
        "label": "无量纲驱动幅 f",
        "min": 0,
        "max": 1.5,
        "value": 1.2,
        "unit": "",
        "step": 0.05
      },
      {
        "id": "nu",
        "label": "无量纲驱动频率 ν",
        "min": 0.5,
        "max": 2,
        "value": 1,
        "unit": "",
        "step": 0.05
      },
      {
        "id": "theta",
        "label": "初始角 θ(0)",
        "min": -3,
        "max": 3,
        "value": 0.2,
        "unit": "rad",
        "step": 0.1
      }
    ],
    "intro": "周期驱动的摆，在每个驱动周期同一时刻拍照，会只留下一个点吗？先用小驱动观察频闪样点，再提高驱动强度，同时检查能量收支和步长对照，避免把数值误差误认成复杂动力学。",
    "steps": [
      "频闪截面去掉驱动相位，但有限样点既可能含瞬态，也可能受到数值误差影响。",
      "取无量纲方程θ″+cθ′+sinθ=f cosντ，经典RK4分别用每周期128与256步。",
      "同时积分功率fθ′cosντ−cθ′²核验能量收支；在ντ=2πn采样，舍弃前12周期。",
      "零驱动零阻尼应恢复守恒摆；末态步长差大时具体轨迹及频闪结构尚未收敛，不能据图宣称混沌。"
    ],
    "prediction": {
      "q": "有限个分散频闪点，能否单独严格证明混沌？",
      "options": [
        "能，点多就足够",
        "只要驱动不为零就能",
        "不能"
      ],
      "correct": 2,
      "explain": "需要控制数值误差、瞬态和长期动力学证据。"
    },
    "derive": {
      "q": "零驱动、零阻尼时，机械能应怎样变化？",
      "options": [
        "守恒，数值残差应随步长减小",
        "随时间单调增加",
        "每周期清零"
      ],
      "correct": 0,
      "explain": "方程退化为保守单摆，作为积分器的独立检查。"
    },
    "check": "缩短观察时段并加密步长比较，再改变舍弃周期数；解释长期敏感性可能破坏逐点重合而能量残差仍小。",
    "extraNote": "24周期有限时间积分，前12周期仅作为暂定瞬态舍弃；原始coarse/fine保留，时间曲线仅作绘图线性插值。"
  },
  {
    "mapId": "CM8.4",
    "id": "CM8.4",
    "courseId": "mechanics",
    "short": "理论力学 · CM8.4",
    "controls": [
      {
        "id": "K",
        "label": "踢强度 K",
        "min": 0,
        "max": 5,
        "value": 1.2,
        "unit": "",
        "step": 0.05
      },
      {
        "id": "q",
        "label": "初始角 q0",
        "min": -3,
        "max": 3,
        "value": 0.7,
        "unit": "rad",
        "step": 0.1
      },
      {
        "id": "p",
        "label": "初始缩放动量 p0",
        "min": -2,
        "max": 2,
        "value": 0.3,
        "unit": "",
        "step": 0.1
      },
      {
        "id": "n",
        "label": "迭代步数 n",
        "min": 20,
        "max": 300,
        "value": 150,
        "unit": "",
        "step": 10
      },
      {
        "id": "delta",
        "label": "相邻初值角差 δ",
        "min": 1e-06,
        "max": 0.001,
        "value": 1e-05,
        "unit": "rad",
        "step": 1e-06
      }
    ],
    "intro": "每次受到一次踢动的转子，初值很近的两条轨道为什么有时很快分开？先令踢强度为零，再逐渐增大它，比较柱面轨道与有限迭代的切向伸长，辨认规则运动也会出现的有限增长。",
    "steps": [
      "标准映射是离散的面积保持模型，不是带任意时间步长的连续摆积分。",
      "采用p′=p+K sinq，q′=q+p′ mod2π，q周期识别但p保留柱面值。",
      "Jacobian行列式为1；对切向量逐步归一并累加对数范数，另追踪相邻初值距离。",
      "K=0是可积剪切，仍可有有限时增长；正的有限平均伸长不能自动等同渐近正Lyapunov指数。"
    ],
    "prediction": {
      "q": "本柱面标准映射中哪个变量取模？",
      "options": [
        "只对q取模2π",
        "q和p都取模2π",
        "都不取模"
      ],
      "correct": 0,
      "explain": "p保留未取模值，才能追踪柱面动量扩散。"
    },
    "derive": {
      "q": "K=0时有限n伸长为正，是否证明混沌？",
      "options": [
        "表示映射不保面积",
        "不证明，可积剪切也有有限增长",
        "证明"
      ],
      "correct": 1,
      "explain": "渐近指数与有限n诊断不同，需要检查长期标度。"
    },
    "check": "独立推导Jacobian并检查det=1；延长n比较K=0的平均对数伸长趋零，另减小δ检验线性区。",
    "extraNote": ""
  }
];
 const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId),{steps,check,extraNote,...base}=row;return {...base,title:design.title,simTitle:design.title+'：模型与核验',goal:design.acceptance,math:design.derivation,modelNote:design.model+' '+extraNote+' 本页数值采用明确的SI或标注的无量纲尺度，不作平滑。',reflection:design.question+' 请写出一项数值、极限或守恒核验，并说明条件。',derivation:steps.map((p,i)=>'<p><b>'+['物理问题','列式理由','关键一步','极限检验'][i]+'</b>　'+escape(p)+'</p>').join(''),graduate:{task:design.graduateTask,check},resourceTitle:'MIT OpenCourseWare · Classical Mechanics III',resourceDescription:'公开讲义供主题定位及补充阅读；关卡模型、故事与题目由本项目编写，未复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/'};});
});
