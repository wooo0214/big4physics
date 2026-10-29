/* Original CM teaching text and questions. IDs preserve the legacy pendulum record. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/mechanics-curriculum.js'):root.MechanicsCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.CM6Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
 'use strict';
 const rows=[
  {
    "mapId": "CM6.1",
    "id": "CM6.1",
    "courseId": "mechanics",
    "short": "理论力学 · CM6.1",
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
        "label": "位置 q",
        "min": -2,
        "max": 2,
        "value": 0.8,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "v",
        "label": "速度 v",
        "min": -3,
        "max": 3,
        "value": 1,
        "unit": "m/s",
        "step": 0.1
      }
    ],
    "intro": "同一个振子，为什么拉格朗日量是动能减势能，哈密顿量却是二者相加？先固定位置扫速度，观察拉格朗日量的斜率，再把速度换成正则动量。",
    "steps": [
      "哈密顿量来自对速度的Legendre变换，不是给拉格朗日量任意换符号。",
      "ℒ=mv²/2−mω²q²/2，正则动量p=∂vℒ=mv，m>0使变换可逆。",
      "H=pv−ℒ=p²/(2m)+mω²q²/2，在本模型恰好等于T+V。",
      "v=0时ℒ=−V而H=V；一般含速度势或显含时间系统需重新检查H的物理含义。"
    ],
    "prediction": {
      "q": "本谐振子的正则动量p是？",
      "options": [
        "v/m",
        "mv",
        "mωq"
      ],
      "correct": 1,
      "explain": "由p=∂ℒ/∂v得到。"
    },
    "derive": {
      "q": "Legendre变换的定义为？",
      "options": [
        "H=−ℒ",
        "H=pv+ℒ",
        "H=pv−ℒ"
      ],
      "correct": 2,
      "explain": "需先用p与v的关系消去v。"
    },
    "check": "固定q求ℒ(v)的导数和H(p)的导数，分别核验p与v；说明可逆性要求。",
    "extraNote": ""
  },
  {
    "mapId": "CM6.2",
    "id": "CM6.2",
    "courseId": "mechanics",
    "short": "理论力学 · CM6.2",
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
        "id": "q0",
        "label": "初始位置 q0",
        "min": -2,
        "max": 2,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "p0",
        "label": "初始动量 p0",
        "min": -2,
        "max": 2,
        "value": 0.5,
        "unit": "kg·m/s",
        "step": 0.1
      },
      {
        "id": "time",
        "label": "当前时刻 t",
        "min": 0,
        "max": 10,
        "value": 2,
        "unit": "s",
        "step": 0.1
      }
    ],
    "intro": "在位置—动量平面中，一条闭合椭圆为什么代表不断运动而不是静止？先改变初始位置或动量，再推动时间，比较相轨道不变与当前位置改变这两件事。",
    "steps": [
      "同一能量的振子状态沿相平面椭圆运动，轨道形状与在轨道上的时刻要分开。",
      "H=p²/(2m)+mω²q²/2，哈密顿方程给q̇=p/m、ṗ=−mω²q。",
      "解析流为q=q0 cosωt+p0 sinωt/(mω)，p=p0 cosωt−mωq0 sinωt。",
      "代回H应恒定；E=0椭圆退化为平衡点，非零能量相面积为2πE/ω。"
    ],
    "prediction": {
      "q": "沿谐振子相轨道演化，哪个量保持不变？",
      "options": [
        "q",
        "p",
        "H"
      ],
      "correct": 2,
      "explain": "自治哈密顿量守恒，但q和p通常随时间改变。"
    },
    "derive": {
      "q": "哈密顿方程中动量导数为？",
      "options": [
        "−mω²q",
        "+mω²q",
        "p/m"
      ],
      "correct": 0,
      "explain": "ṗ=−∂H/∂q，负号对应恢复力。"
    },
    "check": "独立对解析流求导验证方程，并以四分之一周期检查q、p的交换尺度。",
    "extraNote": ""
  },
  {
    "mapId": "CM6.3",
    "id": "CM6.3",
    "courseId": "mechanics",
    "short": "理论力学 · CM6.3",
    "controls": [
      {
        "id": "m",
        "label": "摆球质量 m",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "kg",
        "step": 0.1
      },
      {
        "id": "length",
        "label": "摆长 L",
        "min": 0.5,
        "max": 2,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "g",
        "label": "重力加速度 g",
        "min": 2,
        "max": 15,
        "value": 9.8,
        "unit": "m/s²",
        "step": 0.1
      },
      {
        "id": "energy",
        "label": "E/(mgL)",
        "min": 0,
        "max": 4,
        "value": 1,
        "unit": "",
        "step": 0.1
      },
      {
        "id": "theta",
        "label": "当前角度 θ",
        "min": -3.141592653589793,
        "max": 3.141592653589793,
        "value": 0.5,
        "unit": "rad",
        "step": 0.1
      }
    ],
    "intro": "摆球何时只来回摆动，何时能连续转过最高点？先让能量经过2mgL，再选择不同当前角度，查看哪些状态不可达，以及分离曲线如何划分振动与转动。",
    "steps": [
      "非线性单摆的相空间同时包含振动、转动和临界分离曲线。",
      "取pθ=mL²θ̇，H=pθ²/(2mL²)+mgL(1−cosθ)。",
      "顶点势能为2mgL，低于它的有界振动与高于它的连续转动由分离曲线隔开。",
      "恰好分离能量的运动趋近顶点耗时无穷；θ跨±π是同一周期角，不发生边界反射。"
    ],
    "prediction": {
      "q": "摆球越过最高点连续转动所需能量为？",
      "options": [
        "E>2mgL",
        "E<mgL",
        "任意E>0"
      ],
      "correct": 0,
      "explain": "以最低点势能为零，最高点势能是2mgL。"
    },
    "derive": {
      "q": "若所选θ的势能大于总能量，应怎样处理pθ？",
      "options": [
        "取虚数后作为真实轨道",
        "显示不可达、未定义",
        "置为0"
      ],
      "correct": 1,
      "explain": "经典实轨道要求动能非负。"
    },
    "check": "由能量关系写出两支pθ(θ)，说明正负支的转动方向和分离轨道的周期发散。",
    "extraNote": ""
  },
  {
    "mapId": "CM6.4",
    "id": "CM6.4",
    "courseId": "mechanics",
    "short": "理论力学 · CM6.4",
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
        "id": "time",
        "label": "演化时间 t",
        "min": 0,
        "max": 10,
        "value": 2,
        "unit": "s",
        "step": 0.1
      },
      {
        "id": "kind",
        "label": "流类型：0自由/1振子",
        "min": 0,
        "max": 1,
        "value": 1,
        "unit": "",
        "step": 1
      },
      {
        "id": "a",
        "label": "初始q半宽 a",
        "min": 0.3,
        "max": 2,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "b",
        "label": "初始p半宽 b",
        "min": 0.3,
        "max": 2,
        "value": 1,
        "unit": "kg·m/s",
        "step": 0.1
      }
    ],
    "intro": "一团相空间初值被拉长和剪切以后，面积为什么仍可不变？先选自由漂移，再切换谐振子流，比较同一批边界点的位置与动量投影，并检查映射行列式。",
    "steps": [
      "相空间面积是q–p平面中的面积，不等于单独的位置分布宽度。",
      "取初始椭圆q0=a cosu、p0=b sinu；自由流是剪切，谐振子流是带物理尺度的线性旋转。",
      "两种映射矩阵行列式都为1，因此初始面积πab严格保留。",
      "t=0恢复初态；自由漂移时q投影可变宽，p不变，面积仍守恒。"
    ],
    "prediction": {
      "q": "自由漂移使位置分布变宽，是否必然增大相空间面积？",
      "options": [
        "必然缩为零",
        "不必，q–p相关可保持面积",
        "必然增大"
      ],
      "correct": 1,
      "explain": "剪切矩阵行列式为1，投影宽度不等于联合面积。"
    },
    "derive": {
      "q": "本例二维线性哈密顿流的面积因子是？",
      "options": [
        "traceM=1",
        "M每个分量为1",
        "detM=1"
      ],
      "correct": 2,
      "explain": "有向面积按行列式缩放，精确哈密顿流保持它。"
    },
    "check": "用独立多边形面积公式对同一批映射点核验面积；说明屏幕横纵比例会改变视觉形状。",
    "extraNote": ""
  }
];
 const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId),{steps,check,extraNote,...base}=row;return {...base,title:design.title,simTitle:design.title+'：模型与核验',goal:design.acceptance,math:design.derivation,modelNote:design.model+' '+extraNote+' 本页数值采用明确的SI或标注的无量纲尺度，不作平滑。',reflection:design.question+' 请写出一项数值、极限或守恒核验，并说明条件。',derivation:steps.map((p,i)=>'<p><b>'+['物理问题','列式理由','关键一步','极限检验'][i]+'</b>　'+escape(p)+'</p>').join(''),graduate:{task:design.graduateTask,check},resourceTitle:'MIT OpenCourseWare · Classical Mechanics III',resourceDescription:'公开讲义供主题定位及补充阅读；关卡模型、故事与题目由本项目编写，未复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/'};});
});
