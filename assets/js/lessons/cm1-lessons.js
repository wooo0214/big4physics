/* Original CM teaching text and questions. IDs preserve the legacy pendulum record. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/mechanics-curriculum.js'):root.MechanicsCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.CM1Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
 'use strict';
 const rows=[
  {
    "mapId": "CM1.1",
    "id": "CM1.1",
    "courseId": "mechanics",
    "short": "理论力学 · CM1.1",
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
      }
    ],
    "intro": "把同一滑块放在光滑斜面上，逐渐抬高斜面：支持力为什么变小，沿面加速度却变大？先保持质量不变调倾角，再只改质量，比较受力图对应的分量曲线与位移。",
    "steps": [
      "固定斜面迫使滑块的法向加速度为零，沿面则可自由加速。",
      "沿斜面向下为正，重力分为mg sinα与mg cosα；支持力沿法线。",
      "法向N−mg cosα=0，沿面ma=mg sinα，因此a=g sinα。",
      "α=0时a=0且N=mg；只增大m，N按比例增大而a不变。"
    ],
    "prediction": {
      "q": "质量加倍而斜面倾角不变，滑块的沿面加速度如何变化？",
      "options": [
        "加倍",
        "减半",
        "不变"
      ],
      "correct": 2,
      "explain": "光滑斜面a=g sinα，与m无关。"
    },
    "derive": {
      "q": "固定光滑斜面的法向支持力为？",
      "options": [
        "mg cosα",
        "mg sinα",
        "mg"
      ],
      "correct": 0,
      "explain": "法向约束要求N与重力法向分量抵消。"
    },
    "check": "分别从二维受力和势能梯度算a；取α=0、30°独立核验。",
    "extraNote": "只考虑滑动质点，不含滚动、摩擦和脱离约束。"
  },
  {
    "mapId": "CM1.2",
    "id": "CM1.2",
    "courseId": "mechanics",
    "short": "理论力学 · CM1.2",
    "controls": [
      {
        "id": "r",
        "label": "瞬时半径 r",
        "min": 0.3,
        "max": 3,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "omega",
        "label": "角速度 ω",
        "min": -3,
        "max": 3,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      },
      {
        "id": "vr",
        "label": "径向速度 ṙ",
        "min": -2,
        "max": 2,
        "value": 0.5,
        "unit": "m/s",
        "step": 0.1
      },
      {
        "id": "ar",
        "label": "径向二阶导 r̈",
        "min": -3,
        "max": 3,
        "value": 0,
        "unit": "m/s²",
        "step": 0.1
      },
      {
        "id": "alpha",
        "label": "角加速度 φ̈",
        "min": -2,
        "max": 2,
        "value": 0.4,
        "unit": "rad/s²",
        "step": 0.1
      }
    ],
    "intro": "在转盘上沿半径移动的小车，即使角速度不变，也需要额外的切向加速度。为什么仅写rφ̈会漏项？先把ṙ设为零，再改变它的符号，比较完整切向加速度与仅含rφ̈的结果。",
    "steps": [
      "极坐标基矢随方位转动，加速度不能只对标量速度求导。",
      "使用ėr=φ̇eφ、ėφ=−φ̇er，对v=ṙer+rφ̇eφ求导。",
      "得到ar=r̈−rφ̇²，aφ=rφ̈+2ṙφ̇；两倍交叉项来自两个基矢导数贡献。",
      "ṙ=r̈=φ̈=0恢复匀速圆周的向心加速度；ω=0时交叉项消失。"
    ],
    "prediction": {
      "q": "匀速圆周运动的径向加速度，取向外为正，应为？",
      "options": [
        "−rω²",
        "+rω²",
        "0"
      ],
      "correct": 0,
      "explain": "速度方向不断改变，径向加速度指向圆心。"
    },
    "derive": {
      "q": "当ṙ≠0、ω恒定时，切向加速度为？",
      "options": [
        "0",
        "2ṙω",
        "ṙω"
      ],
      "correct": 1,
      "explain": "对rωeφ和ṙer两部分求导，各贡献ṙω。"
    },
    "check": "从Cartesian坐标x=r cosφ、y=r sinφ独立二次求导，检查交叉项符号。",
    "extraNote": "控件为瞬时运动学量，扫角速度不代表同一条动力学轨迹。"
  },
  {
    "mapId": "CM1.3",
    "id": "CM1.3",
    "courseId": "mechanics",
    "short": "理论力学 · CM1.3",
    "controls": [
      {
        "id": "m",
        "label": "质量 m",
        "min": 20,
        "max": 100,
        "value": 60,
        "unit": "kg",
        "step": 1
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
        "id": "a",
        "label": "电梯加速度（向上正）",
        "min": -25,
        "max": 25,
        "value": 2,
        "unit": "m/s²",
        "step": 0.5
      }
    ],
    "intro": "电梯启动向上时，体重计读数增大；电梯向上匀速时却恢复原值。读数到底反映速度还是加速度？先把加速度调到零，再调到−g附近，观察接触条件什么时候失效。",
    "steps": [
      "体重计测得的是支持力，不直接测量重力或速度。",
      "在地面惯性系取向上为正，列N−mg=ma。",
      "保持接触时N=m(g+a)；若这一式要求N<0，只有推力的秤无法维持接触。",
      "a=0给N=mg，a=−g给N=0；a<−g应显示脱离而不是负重量。"
    ],
    "prediction": {
      "q": "电梯向上匀速运动，视重应当？",
      "options": [
        "小于mg",
        "等于mg",
        "大于mg"
      ],
      "correct": 1,
      "explain": "匀速意味着a=0，支持力与重力平衡。"
    },
    "derive": {
      "q": "当体重计理论上需要提供负支持力时，正确处理是？",
      "options": [
        "显示负重量",
        "把重力设为零",
        "判定接触约束失效"
      ],
      "correct": 2,
      "explain": "秤只能推，不能拉住人；不能继续沿用接触解。"
    },
    "check": "用随电梯平动系的惯性力−ma重列方程，并核对自由落体边界。",
    "extraNote": ""
  },
  {
    "mapId": "CM1.4",
    "id": "CM1.4",
    "courseId": "mechanics",
    "short": "理论力学 · CM1.4",
    "controls": [
      {
        "id": "omega",
        "label": "旋转系角速度 Ω",
        "min": -3,
        "max": 3,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      },
      {
        "id": "r",
        "label": "距旋转轴 r",
        "min": 0.3,
        "max": 3,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "vr",
        "label": "旋转系径向速度 v′r",
        "min": -3,
        "max": 3,
        "value": 0.5,
        "unit": "m/s",
        "step": 0.1
      },
      {
        "id": "vphi",
        "label": "旋转系切向速度 v′φ",
        "min": -3,
        "max": 3,
        "value": 0.5,
        "unit": "m/s",
        "step": 0.1
      }
    ],
    "intro": "站在匀速旋转的平台上看小球，静止小球与径向运动的小球为什么需要不同的惯性力描述？先把相对速度清零，再分别改变径向和切向速度的正负，辨认离心项和科氏项。",
    "steps": [
      "旋转坐标的基矢变化会在加速度变换中产生额外项。",
      "恒定Ω、同一固定原点时，a惯性=a′+2Ω×v′+Ω×(Ω×r)。",
      "移项得到离心加速度Ω²r er，以及科氏分量2Ωv′φ er−2Ωv′r eφ。",
      "v′=0时科氏项为零；Ω反向时科氏项反向，而离心项不变。"
    ],
    "prediction": {
      "q": "小球在旋转系中瞬时静止，科氏惯性力如何？",
      "options": [
        "沿径向向外",
        "沿切向",
        "为零"
      ],
      "correct": 2,
      "explain": "科氏项正比于相对速度v′。"
    },
    "derive": {
      "q": "只把Ω改为−Ω，离心加速度与科氏加速度如何变化？",
      "options": [
        "离心不变，科氏反向",
        "两者都反向",
        "两者都不变"
      ],
      "correct": 0,
      "explain": "离心项对Ω为二次，科氏项为一次。"
    },
    "check": "用Ω沿+z、v′沿+er的向量叉乘检查科氏项指向−eφ。",
    "extraNote": "不含参考系原点加速，也不含Ω变化的欧拉项。"
  }
];
 const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId),{steps,check,extraNote,...base}=row;return {...base,title:design.title,simTitle:design.title+'：模型与核验',goal:design.acceptance,math:design.derivation,modelNote:design.model+' '+extraNote+' 本页数值采用明确的SI或标注的无量纲尺度，不作平滑。',reflection:design.question+' 请写出一项数值、极限或守恒核验，并说明条件。',derivation:steps.map((p,i)=>'<p><b>'+['物理问题','列式理由','关键一步','极限检验'][i]+'</b>　'+escape(p)+'</p>').join(''),graduate:{task:design.graduateTask,check},resourceTitle:'MIT OpenCourseWare · Classical Mechanics III',resourceDescription:'公开讲义供主题定位及补充阅读；关卡模型、故事与题目由本项目编写，未复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/'};});
});
