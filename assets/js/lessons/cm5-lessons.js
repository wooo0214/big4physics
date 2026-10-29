/* Original CM teaching text and questions. IDs preserve the legacy pendulum record. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/mechanics-curriculum.js'):root.MechanicsCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.CM5Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
 'use strict';
 const rows=[
  {
    "mapId": "CM5.1",
    "id": "CM5.1",
    "courseId": "mechanics",
    "short": "理论力学 · CM5.1",
    "controls": [
      {
        "id": "m",
        "label": "总质量 m",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "kg",
        "step": 0.1
      },
      {
        "id": "a",
        "label": "刚体半宽 a",
        "min": 0.3,
        "max": 2,
        "value": 1,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "b",
        "label": "刚体半高 b",
        "min": 0.3,
        "max": 2,
        "value": 0.5,
        "unit": "m",
        "step": 0.1
      },
      {
        "id": "beta",
        "label": "刚体朝向 β",
        "min": 0,
        "max": 3.141592653589793,
        "value": 0.4,
        "unit": "rad",
        "step": 0.1
      },
      {
        "id": "axis",
        "label": "空间轴方位 φ",
        "min": 0,
        "max": 6.283185307179586,
        "value": 1,
        "unit": "rad",
        "step": 0.1
      }
    ],
    "intro": "四个相同小球固定在矩形四角，转轴换个方向为什么会更难转动？先只旋转整个坐标方向，再改变矩形长宽，区分惯量矩阵的分量与不随坐标改变的主值。",
    "steps": [
      "转动惯量描述质量离轴的二阶分布，同一物体对不同轴的惯量不同。",
      "参考点取质心，Iij=Σma(r²δij−ri rj)，四点坐标为(±a,±b,0)。",
      "刚体系主值为mb²、ma²、m(a²+b²)，绕z转β后空间张量为R Ibody Rᵀ。",
      "a=b时xy面主值退化，面内各轴惯量相同；仅变β不改主值和trace。"
    ],
    "prediction": {
      "q": "只旋转坐标轴，物体惯量张量的哪些量不变？",
      "options": [
        "主值和迹",
        "每个非对角分量",
        "所有矩阵分量"
      ],
      "correct": 0,
      "explain": "正交相似变换保留本征值与迹，但改变分量。"
    },
    "derive": {
      "q": "四点(±a,±b,0)、总质量m绕刚体x轴的惯量为？",
      "options": [
        "m(a²+b²)",
        "mb²",
        "ma²"
      ],
      "correct": 1,
      "explain": "离x轴的垂距均为b。"
    },
    "check": "逐点求Ixy负号，独立用nᵀIn检验选定轴惯量；验证trace=2Σmr²。",
    "extraNote": ""
  },
  {
    "mapId": "CM5.2",
    "id": "CM5.2",
    "courseId": "mechanics",
    "short": "理论力学 · CM5.2",
    "controls": [
      {
        "id": "I1",
        "label": "主惯量 I1",
        "min": 1,
        "max": 2,
        "value": 1.2,
        "unit": "kg·m²",
        "step": 0.1
      },
      {
        "id": "I2",
        "label": "主惯量 I2",
        "min": 2,
        "max": 3,
        "value": 2.2,
        "unit": "kg·m²",
        "step": 0.1
      },
      {
        "id": "I3",
        "label": "主惯量 I3",
        "min": 2,
        "max": 3,
        "value": 2.8,
        "unit": "kg·m²",
        "step": 0.1
      },
      {
        "id": "omega",
        "label": "角速度大小 |ω|",
        "min": 0.2,
        "max": 3,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      },
      {
        "id": "theta",
        "label": "ω极角 θ",
        "min": 0,
        "max": 3.141592653589793,
        "value": 1,
        "unit": "rad",
        "step": 0.1
      },
      {
        "id": "phi",
        "label": "ω方位角 φ",
        "min": 0,
        "max": 6.283185307179586,
        "value": 0.7,
        "unit": "rad",
        "step": 0.1
      }
    ],
    "intro": "斜着转动一块不对称物体，角动量会与转轴指向同一方向吗？先让角速度沿某一主轴，再偏离它，比较角速度分量与角动量分量以及两者夹角。",
    "steps": [
      "一般刚体的惯量是张量，不能把L=Iω中的I当成一个与方向无关的标量。",
      "在质心主轴系中L_i=I_iω_i，动能T=ΣI_iω_i²/2。",
      "主惯量不同时，各分量被不同倍数放大，L通常不平行ω；夹角由ω·L/(|ω||L|)求得。",
      "ω沿主轴或三个主惯量相同时，两向量平行；T始终非负。"
    ],
    "prediction": {
      "q": "对于不对称刚体，L总与ω平行吗？",
      "options": [
        "总垂直",
        "一般不平行",
        "总平行"
      ],
      "correct": 1,
      "explain": "只有主轴方向或退化惯量等特殊条件才平行。"
    },
    "derive": {
      "q": "主轴系中的转动动能为？",
      "options": [
        "|L||ω|",
        "ΣIiωi/2",
        "ΣIiωi²/2"
      ],
      "correct": 2,
      "explain": "T=ω·L/2，逐分量得该表达。"
    },
    "check": "核验T=ω·L/2与各分量之和；解释刚体主惯量需满足三角不等式。",
    "extraNote": "控件全组合保证主惯量三角不等式；只给瞬时关系，不模拟自由转动演化。"
  },
  {
    "mapId": "CM5.3",
    "id": "CM5.3",
    "courseId": "mechanics",
    "short": "理论力学 · CM5.3",
    "controls": [
      {
        "id": "I1",
        "label": "最小主惯量 I1",
        "min": 2,
        "max": 2.5,
        "value": 2,
        "unit": "kg·m²",
        "step": 0.1
      },
      {
        "id": "I2",
        "label": "中间主惯量 I2",
        "min": 3,
        "max": 3.5,
        "value": 3,
        "unit": "kg·m²",
        "step": 0.1
      },
      {
        "id": "I3",
        "label": "最大主惯量 I3",
        "min": 4,
        "max": 4.5,
        "value": 4,
        "unit": "kg·m²",
        "step": 0.1
      },
      {
        "id": "omega",
        "label": "背景主轴角速度 Ω",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      },
      {
        "id": "delta",
        "label": "初始小扰动 δω",
        "min": 0,
        "max": 0.05,
        "value": 0.01,
        "unit": "rad/s",
        "step": 0.005
      }
    ],
    "intro": "把一本书分别绕三根主轴抛转，为什么中间惯量轴最难保持方向？先比较三种背景转动的小扰动，再改变主转速，检查增长率平方的符号，而不把线性外推当作整本书的翻转轨迹。",
    "steps": [
      "无外矩并不保证每一种主轴转动都对扰动稳定。",
      "在随体主轴系写Euler方程，设一根轴以Ω转动，另外两分量是小扰动。",
      "消去一个扰动得到δω̈=λ²δω；最小和最大轴λ²<0，中间轴λ²>0。",
      "Ω→0增长率退化为零；扰动接近背景转速后线性化失效，不能继续据此预测完整翻转。"
    ],
    "prediction": {
      "q": "自由刚体哪根主轴附近的匀转有线性不稳定性？",
      "options": [
        "最大主惯量轴",
        "最小主惯量轴",
        "中间主惯量轴"
      ],
      "correct": 2,
      "explain": "中间轴的扰动特征值平方为正。"
    },
    "derive": {
      "q": "线性化扰动已与背景转速同量级，应该怎样处理？",
      "options": [
        "承认线性近似失效，求完整Euler方程",
        "继续当作精确指数解",
        "将扰动强制设为零"
      ],
      "correct": 0,
      "explain": "小扰动是截去非线性项的必要前提。"
    },
    "check": "逐轴推导λ²并核验单位s⁻²；说明三条曲线对应三个不同背景解。",
    "extraNote": "控件范围保证I1<I2<I3且满足刚体惯量三角不等式；只作局部线性稳定性。"
  },
  {
    "mapId": "CM5.4",
    "id": "CM5.4",
    "courseId": "mechanics",
    "short": "理论力学 · CM5.4",
    "controls": [
      {
        "id": "m",
        "label": "质量 m",
        "min": 0.2,
        "max": 2,
        "value": 0.5,
        "unit": "kg",
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
        "id": "l",
        "label": "支点至质心 l",
        "min": 0.05,
        "max": 0.5,
        "value": 0.2,
        "unit": "m",
        "step": 0.01
      },
      {
        "id": "L",
        "label": "自转角动量 L",
        "min": 0.5,
        "max": 5,
        "value": 2,
        "unit": "kg·m²/s",
        "step": 0.1
      },
      {
        "id": "I3",
        "label": "自转主惯量 I3",
        "min": 0.01,
        "max": 0.1,
        "value": 0.04,
        "unit": "kg·m²",
        "step": 0.01
      },
      {
        "id": "theta",
        "label": "轴对竖直倾角 θ",
        "min": 0.1,
        "max": 1.4,
        "value": 0.6,
        "unit": "rad",
        "step": 0.1
      }
    ],
    "intro": "陀螺为什么在重力下绕竖直方向转，而不是马上倒下？先提高自转角动量，观察慢进动率下降，再检查进动与自转的尺度比，判断这一近似是否还可信。",
    "steps": [
      "重力矩改变角动量方向；快速自转时角动量近似沿对称轴。",
      "支点到质心距离l，重力矩大小mgl sinθ；匀速进动需|dL/dt|=ΩpL sinθ。",
      "相等得到慢进动Ωp≈mgl/L，且ωs≈L/I3；这一式已忽略章动及进动对角动量的修正。",
      "L增大一倍使Ωp减半；若Ωp不再远小于ωs，不应把公式外推称为完整陀螺解。"
    ],
    "prediction": {
      "q": "慢进动近似中，自转角动量加倍，进动角速度如何变化？",
      "options": [
        "减半",
        "加倍",
        "不变"
      ],
      "correct": 0,
      "explain": "Ωp≈mgl/L。"
    },
    "derive": {
      "q": "Ωp与ωs已同量级时，慢进动公式如何解释？",
      "options": [
        "说明重力矩为零",
        "近似尺度分离失效",
        "仍是一般精确解"
      ],
      "correct": 1,
      "explain": "推导要求快速自转、慢进动，并忽略章动。"
    },
    "check": "比较mgl sinθ与Ωp L sinθ，另计算Ωp/ωs；说明小尺度比只是必要检查，初态也需接近稳进动。",
    "extraNote": ""
  }
];
 const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId),{steps,check,extraNote,...base}=row;return {...base,title:design.title,simTitle:design.title+'：模型与核验',goal:design.acceptance,math:design.derivation,modelNote:design.model+' '+extraNote+' 本页数值采用明确的SI或标注的无量纲尺度，不作平滑。',reflection:design.question+' 请写出一项数值、极限或守恒核验，并说明条件。',derivation:steps.map((p,i)=>'<p><b>'+['物理问题','列式理由','关键一步','极限检验'][i]+'</b>　'+escape(p)+'</p>').join(''),graduate:{task:design.graduateTask,check},resourceTitle:'MIT OpenCourseWare · Classical Mechanics III',resourceDescription:'公开讲义供主题定位及补充阅读；关卡模型、故事与题目由本项目编写，未复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/'};});
});
