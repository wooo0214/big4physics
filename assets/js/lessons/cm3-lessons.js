/* Original CM teaching text and questions. IDs preserve the legacy pendulum record. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/mechanics-curriculum.js'):root.MechanicsCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.CM3Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
 'use strict';
 const rows=[
  {
    "mapId": "CM3.1",
    "id": "CM3.1",
    "courseId": "mechanics",
    "short": "理论力学 · CM3.1",
    "controls": [
      {
        "id": "mu",
        "label": "引力参数 γ",
        "min": 0.5,
        "max": 4,
        "value": 1,
        "unit": "m³/s²",
        "step": 0.1
      },
      {
        "id": "h",
        "label": "比角动量 h",
        "min": 0.5,
        "max": 2,
        "value": 1,
        "unit": "m²/s",
        "step": 0.1
      },
      {
        "id": "energy",
        "label": "比能量 ε",
        "min": -3,
        "max": 2,
        "value": -0.3,
        "unit": "J/kg",
        "step": 0.1
      }
    ],
    "intro": "同样的引力势，为什么非零角动量会阻止粒子落到中心？先固定比角动量改变比能量，找出径向运动的允许区，再改变角动量观察势阱最低点如何移动。",
    "steps": [
      "将二维中心力问题化为径向一维运动，需要保留角动量造成的动能项。",
      "每单位测试粒子质量的能量满足ε=ṙ²/2+h²/(2r²)−γ/r。",
      "Veff在rc=h²/γ处极小，εmin=−γ²/(2h²)；ε=Veff的正根为转向点。",
      "ε低于势阱底没有真实运动；圆轨道恰在最低点，不能把任意转向点都称作圆轨道。"
    ],
    "prediction": {
      "q": "给定h，稳定圆轨道位于有效势的哪里？",
      "options": [
        "r=0",
        "极小值处",
        "任意Veff=ε处"
      ],
      "correct": 1,
      "explain": "圆轨道要求Veff′=0，稳定还要求Veff″>0。"
    },
    "derive": {
      "q": "若ε<Veff(r)，该半径的径向速度应如何显示？",
      "options": [
        "零速度",
        "负动能实速度",
        "禁区，速度无实数解"
      ],
      "correct": 2,
      "explain": "ṙ²=2(ε−Veff)<0，不能把禁区默认为静止。"
    },
    "check": "独立求解二次转向点方程；核对圆轨道二重根与ε→0−时远心距趋于无穷。",
    "extraNote": "γ=GM，忽略测试粒子对中心体的反作用；不是一般两体约化质量模型。"
  },
  {
    "mapId": "CM3.2",
    "id": "CM3.2",
    "courseId": "mechanics",
    "short": "理论力学 · CM3.2",
    "controls": [
      {
        "id": "mu",
        "label": "引力参数 γ",
        "min": 0.5,
        "max": 4,
        "value": 1,
        "unit": "m³/s²",
        "step": 0.1
      },
      {
        "id": "h",
        "label": "比角动量 h",
        "min": 0.5,
        "max": 2,
        "value": 1,
        "unit": "m²/s",
        "step": 0.1
      },
      {
        "id": "e",
        "label": "离心率 e",
        "min": 0,
        "max": 2,
        "value": 0.5,
        "unit": "",
        "step": 0.05
      }
    ],
    "intro": "一颗试验粒子的轨道由椭圆变成双曲线时，究竟越过了哪条能量边界？先让离心率经过1，比较轨道半径与比能量，注意开放轨道的渐近方向不能跨过去。",
    "steps": [
      "反平方引力的轨道方程在焦点极坐标中是一族圆锥曲线。",
      "以近日点为φ=0，r=p/(1+e cosφ)，p=h²/γ。",
      "偏心率与能量满足e²=1+2εh²/γ²；e<1、=1、>1分别对应负、零、正比能量。",
      "e=0恢复圆轨道；抛物与双曲线只保留r>0物理支，不把负半径画成另一条轨道。"
    ],
    "prediction": {
      "q": "在吸引反平方势中，e=1对应什么轨道？",
      "options": [
        "圆轨道，ε<0",
        "双曲线，ε>0",
        "抛物线，ε=0"
      ],
      "correct": 2,
      "explain": "能量关系中e²−1=0。"
    },
    "derive": {
      "q": "圆锥轨道的半通径p为？",
      "options": [
        "h²/γ",
        "γ/h²",
        "h/γ"
      ],
      "correct": 0,
      "explain": "Binet方程给p=h²/γ，单位是长度。"
    },
    "check": "由u=1/r的轨道方程推导圆锥形式，并用近日点速度反算h。",
    "extraNote": "γ=GM，测试粒子；图按真近点角采样，不代表均匀时间间隔。"
  },
  {
    "mapId": "CM3.3",
    "id": "CM3.3",
    "courseId": "mechanics",
    "short": "理论力学 · CM3.3",
    "controls": [
      {
        "id": "mu",
        "label": "引力参数 γ",
        "min": 0.5,
        "max": 4,
        "value": 1,
        "unit": "m³/s²",
        "step": 0.1
      },
      {
        "id": "a",
        "label": "半长轴 a",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "e",
        "label": "离心率 e",
        "min": 0,
        "max": 0.9,
        "value": 0.5,
        "unit": "",
        "step": 0.05
      }
    ],
    "intro": "椭圆轨道近心处走得快，为什么仍然满足等时扫过等面积？先固定半长轴改变离心率，再只改变半长轴，分别检查面积速度和公转周期。",
    "steps": [
      "速度不恒定，但中心力矩为零，角动量恒定。",
      "面积元dA=r²dφ/2，故dA/dt=h/2；椭圆h²=γa(1−e²)。",
      "用总面积πa²√(1−e²)除以面积速度，得到T=2π√(a³/γ)。",
      "固定a时改变e不改变周期；固定γ时a变为4倍，周期变为8倍。"
    ],
    "prediction": {
      "q": "固定γ和半长轴a，改变椭圆离心率，周期如何变化？",
      "options": [
        "不变",
        "随e增大必定变长",
        "随e增大必定变短"
      ],
      "correct": 0,
      "explain": "T只取决于a和γ，前提是同一反平方中心势的束缚椭圆。"
    },
    "derive": {
      "q": "面积速度等于哪个量？",
      "options": [
        "rφ̇/2",
        "h/2",
        "h"
      ],
      "correct": 1,
      "explain": "dA/dt=r²φ̇/2=h/2。"
    },
    "check": "用椭圆几何独立消去e；比较近心与远心角速度之比[(1+e)/(1−e)]²。",
    "extraNote": "γ=GM测试粒子近似；图按φ采样，点密度不代表驻留时间。"
  },
  {
    "mapId": "CM3.4",
    "id": "CM3.4",
    "courseId": "mechanics",
    "short": "理论力学 · CM3.4",
    "controls": [
      {
        "id": "mu",
        "label": "引力参数 γ",
        "min": 0.5,
        "max": 4,
        "value": 1,
        "unit": "m³/s²",
        "step": 0.1
      },
      {
        "id": "b",
        "label": "冲量参数 b",
        "min": 0.3,
        "max": 3,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "v",
        "label": "无穷远速度 v∞",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "m/s",
        "step": 0.1
      }
    ],
    "intro": "两个速度相同的来访粒子，一个掠过得更近，会被引力多偏转多少？先改变冲量参数，再提高无穷远速度，对照精确双曲散射角与弱偏转近似。",
    "steps": [
      "无穷远的直线渐近运动由v∞和冲量参数b指定，而b不是近心距。",
      "比能量ε=v∞²/2，比角动量h=bv∞，代入双曲轨道关系求e。",
      "偏转角χ=2 arctan[γ/(bv∞²)]，近心距为h²/[γ(1+e)]。",
      "γ/(bv∞²)很小时χ≈2γ/(bv∞²)；b→0只给点势极限，不能表示实体中的穿越轨道。"
    ],
    "prediction": {
      "q": "固定b和γ，提高v∞会怎样改变引力偏转角？",
      "options": [
        "不变",
        "减小",
        "增大"
      ],
      "correct": 1,
      "explain": "χ=2 arctan[γ/(bv∞²)]随速度单调减小。"
    },
    "derive": {
      "q": "冲量参数b是否等于引力轨道近心距？",
      "options": [
        "总相等",
        "一般rp>b",
        "一般不等，引力聚焦使rp<b"
      ],
      "correct": 2,
      "explain": "b定义在入射渐近直线，与引力加速后的近心几何不同。"
    },
    "check": "从e与渐近角关系推导散射角，验证弱偏转近似的相对误差为O(ε²)、绝对误差为O(ε³)，其中ε=γ/(bv∞²)。",
    "extraNote": "γ=GM，中心体静止，测试粒子无反作用；忽略碰撞和有限天体半径。"
  }
];
 const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId),{steps,check,extraNote,...base}=row;return {...base,title:design.title,simTitle:design.title+'：模型与核验',goal:design.acceptance,math:design.derivation,modelNote:design.model+' '+extraNote+' 本页数值采用明确的SI或标注的无量纲尺度，不作平滑。',reflection:design.question+' 请写出一项数值、极限或守恒核验，并说明条件。',derivation:steps.map((p,i)=>'<p><b>'+['物理问题','列式理由','关键一步','极限检验'][i]+'</b>　'+escape(p)+'</p>').join(''),graduate:{task:design.graduateTask,check},resourceTitle:'MIT OpenCourseWare · Classical Mechanics III',resourceDescription:'公开讲义供主题定位及补充阅读；关卡模型、故事与题目由本项目编写，未复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/'};});
});
