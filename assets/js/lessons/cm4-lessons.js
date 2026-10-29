/* Original CM teaching text and questions. IDs preserve the legacy pendulum record. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/mechanics-curriculum.js'):root.MechanicsCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.CM4Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
 'use strict';
 const rows=[
  {
    "mapId": "CM4.1",
    "id": "CM4.1",
    "courseId": "mechanics",
    "short": "理论力学 · CM4.1",
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
        "label": "原点势曲率 k",
        "min": -2,
        "max": 2,
        "value": 1,
        "unit": "N/m",
        "step": 0.1
      },
      {
        "id": "lambda",
        "label": "四次系数 λ",
        "min": 0.2,
        "max": 2,
        "value": 0.5,
        "unit": "N/m³",
        "step": 0.1
      }
    ],
    "intro": "把势能曲线在平衡点附近放大，为什么曲率能给出小振动频率？先让二次项系数从正变负，再在恰好为零时检查四次项，辨认线性判据的边界。",
    "steps": [
      "平衡点由V′=0确定，局部稳定性取决于位移后恢复力的方向。",
      "V=kx²/2+λx⁴/4，在原点小位移处F≈−kx。",
      "k>0给ω²=k/m；k<0原点不稳定并出现两侧稳定点；k=0时必须保留四次项。",
      "正四次势在k=0仍稳定，但没有非零线性频率；不能把V″=0自动当成不稳定。"
    ],
    "prediction": {
      "q": "V″(qeq)>0且m>0时，小振动角频率为？",
      "options": [
        "V″/m",
        "√(m/V″)",
        "√(V″/m)"
      ],
      "correct": 2,
      "explain": "线性方程mδq̈+V″δq=0。"
    },
    "derive": {
      "q": "当二阶曲率恰好为零，正确判断是？",
      "options": [
        "线性判据退化，检查高阶项",
        "一定不稳定",
        "一定有非零谐振频率"
      ],
      "correct": 0,
      "explain": "需要检查首个非零高阶势项。"
    },
    "check": "求全部平衡点和各自曲率；说明局部势能最小在保守系统中不是耗散吸引子。",
    "extraNote": ""
  },
  {
    "mapId": "CM4.2",
    "id": "CM4.2",
    "courseId": "mechanics",
    "short": "理论力学 · CM4.2",
    "controls": [
      {
        "id": "m",
        "label": "相同质量 m",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "kg",
        "step": 0.1
      },
      {
        "id": "k",
        "label": "接墙弹簧常数 k",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "N/m",
        "step": 0.1
      },
      {
        "id": "kc",
        "label": "耦合弹簧常数 κ",
        "min": 0,
        "max": 3,
        "value": 0.5,
        "unit": "N/m",
        "step": 0.1
      }
    ],
    "intro": "两个质量相同的滑块用弹簧相连，一起动和反着动为什么频率不同？先关闭中间耦合，再逐渐增大它，比较同相模和反相模的位移曲线。",
    "steps": [
      "耦合运动一般不能逐个当成独立振子，但特定形状能保持不变。",
      "对两个接墙弹簧k、中间弹簧κ的系统，质量矩阵M=mI。",
      "模向量(1,1)/√2与(1,−1)/√2分别给ω+²=k/m、ω−²=(k+2κ)/m。",
      "κ=0两频率退化；同相运动不拉伸中间弹簧，因此其频率不随κ变化。"
    ],
    "prediction": {
      "q": "增大中间弹簧κ，哪一种模的频率保持不变？",
      "options": [
        "同相模",
        "反相模",
        "两者都改变"
      ],
      "correct": 0,
      "explain": "同相时x1=x2，中间弹簧不伸缩。"
    },
    "derive": {
      "q": "反相模角频率平方为？",
      "options": [
        "k/m",
        "(k+2κ)/m",
        "(k+κ)/m"
      ],
      "correct": 1,
      "explain": "中间弹簧对每个质点的回复贡献为2κx。"
    },
    "check": "写出K与M，独立求广义本征值并用质量内积核对模正交性。",
    "extraNote": ""
  },
  {
    "mapId": "CM4.3",
    "id": "CM4.3",
    "courseId": "mechanics",
    "short": "理论力学 · CM4.3",
    "controls": [
      {
        "id": "m",
        "label": "相同质量 m",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "kg",
        "step": 0.1
      },
      {
        "id": "k",
        "label": "接墙弹簧 k",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "N/m",
        "step": 0.1
      },
      {
        "id": "kc",
        "label": "耦合弹簧 κ",
        "min": 0,
        "max": 1,
        "value": 0.1,
        "unit": "N/m",
        "step": 0.02
      },
      {
        "id": "A",
        "label": "初始x1=A",
        "min": 0.1,
        "max": 1,
        "value": 0.5,
        "unit": "m",
        "step": 0.1
      }
    ],
    "intro": "只拉开第一个滑块再放手，第二个为什么会慢慢振得更强？先选择弱耦合观察包络，再令耦合为零，检查能量交换是否消失、总能量是否守恒。",
    "steps": [
      "初始只动一个质点不是单一正常模，需要两种正常模共同表示。",
      "x1=A(cosω+t+cosω−t)/2，x2=A(cosω+t−cosω−t)/2，初始速度均为零。",
      "频差控制慢包络；将耦合势各分一半后，E1+E2始终为(k+κ)A²/2。",
      "κ→0时频差消失且x2=0；弱耦合近似下能量交换清晰，强耦合仍用精确模叠加。"
    ],
    "prediction": {
      "q": "能量从一个滑块转移到另一个时，总能量如何？",
      "options": [
        "持续增长",
        "保持不变",
        "随交换周期消失"
      ],
      "correct": 1,
      "explain": "无阻尼无驱动，能量只在分系统之间转移。"
    },
    "derive": {
      "q": "关闭耦合κ=0且初始x2=v2=0，第二个振子将？",
      "options": [
        "自动产生等幅振动",
        "发生指数增长",
        "保持静止"
      ],
      "correct": 2,
      "explain": "两模频率相同，x2中的两项严格抵消。"
    },
    "check": "独立算动能、两侧弹簧势及耦合势，验证所用能量分账不会重复计算耦合项。",
    "extraNote": ""
  },
  {
    "mapId": "CM4.4",
    "id": "CM4.4",
    "courseId": "mechanics",
    "short": "理论力学 · CM4.4",
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
        "label": "弹簧常数 k",
        "min": 0.5,
        "max": 3,
        "value": 1,
        "unit": "N/m",
        "step": 0.1
      },
      {
        "id": "gamma",
        "label": "阻尼率 γ",
        "min": 0.01,
        "max": 1,
        "value": 0.15,
        "unit": "s⁻¹",
        "step": 0.01
      },
      {
        "id": "F",
        "label": "驱动力幅 F0",
        "min": 0,
        "max": 2,
        "value": 1,
        "unit": "N",
        "step": 0.1
      },
      {
        "id": "omega",
        "label": "驱动角频率 Ω",
        "min": 0,
        "max": 5,
        "value": 1,
        "unit": "rad/s",
        "step": 0.1
      }
    ],
    "intro": "周期性推动秋千，驱动频率接近固有频率时振幅为什么增大，又为什么不无限大？先扫描驱动频率，再改变阻尼，比较振幅峰和位移相位滞后。",
    "steps": [
      "稳态响应由驱动力输入与阻尼耗散共同决定，不能仅看无阻尼本征频率。",
      "设mẍ+2mγẋ+kx=F0cosΩt，用复数稳态解求振幅与相位。",
      "A=F0/√[(k−mΩ²)²+(2mγΩ)²]，相位由atan2给出；平均输入等于mγΩ²A²。",
      "γ>0共振有限；Ω=0为静态位移F0/k；F0=0时相位及归一化位移未定义。"
    ],
    "prediction": {
      "q": "有阻尼的稳态响应中，平均输入功率与平均耗散功率如何？",
      "options": [
        "输入始终更大",
        "耗散始终为零",
        "相等"
      ],
      "correct": 2,
      "explain": "周期平均能量不变，所以两者平衡。"
    },
    "derive": {
      "q": "当F0=0时，位移相对于驱动力的相位应如何解释？",
      "options": [
        "未定义",
        "固定为π/2",
        "一定为0"
      ],
      "correct": 0,
      "explain": "两者幅度为零，不能定义其相位差。"
    },
    "check": "推导位移振幅峰Ωr=√(ω0²−2γ²)的存在条件，并用表中平均功率核验稳态收支。",
    "extraNote": "仅γ≥0.01 s⁻¹稳态；不涵盖零阻尼精确共振随时间增长的响应。"
  }
];
 const escape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId),{steps,check,extraNote,...base}=row;return {...base,title:design.title,simTitle:design.title+'：模型与核验',goal:design.acceptance,math:design.derivation,modelNote:design.model+' '+extraNote+' 本页数值采用明确的SI或标注的无量纲尺度，不作平滑。',reflection:design.question+' 请写出一项数值、极限或守恒核验，并说明条件。',derivation:steps.map((p,i)=>'<p><b>'+['物理问题','列式理由','关键一步','极限检验'][i]+'</b>　'+escape(p)+'</p>').join(''),graduate:{task:design.graduateTask,check},resourceTitle:'MIT OpenCourseWare · Classical Mechanics III',resourceDescription:'公开讲义供主题定位及补充阅读；关卡模型、故事与题目由本项目编写，未复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/'};});
});
