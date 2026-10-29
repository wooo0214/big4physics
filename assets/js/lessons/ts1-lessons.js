/* Four original evidence-led lessons. Stable IDs preserve existing thermal progress. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.TS1Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return [
  {
    "id": "TS1.1",
    "mapId": "TS1.1",
    "courseId": "thermal",
    "short": "热统 · TS1.1",
    "title": "状态与状态方程",
    "intro": "实验室用活塞压缩一团稀薄气体。压强升高究竟来自粒子变多、升温，还是空间变小？先固定两项，只改变第三项，检验能否从读数恢复同一状态方程。",
    "simTitle": "状态与状态方程：模型与核验",
    "controls": [
      {
        "id": "n",
        "label": "物质的量 n",
        "min": 0.1,
        "max": 3,
        "step": 0.1,
        "value": 1,
        "unit": "mol"
      },
      {
        "id": "T",
        "label": "温度 T",
        "min": 100,
        "max": 1000,
        "step": 25,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "V",
        "label": "体积 V",
        "min": 0.005,
        "max": 0.1,
        "step": 0.005,
        "value": 0.02,
        "unit": "m³"
      }
    ],
    "goal": "固定n、T时V加倍P减半；检查Pa·m³=J。",
    "math": "PV=nRT；同一平衡态不记录到达路径。",
    "modelNote": "稀薄理想气体；n为mol，T为K，V为m³，P为Pa。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "从热运动图景解释理想状态方程，并说明相互作用和量子简并导致的失效。",
      "check": "从各向同性动量通量得到 P=nm⟨vz²⟩，配合均分给 PV=NkBT；高密度相互作用及 nλ³/g 不小会破坏经典理想近似。"
    },
    "reflection": "改变体积会同时改变哪些状态量？ 请先写出预测，再结合核验表中的独立条件解释；从热运动图景解释理想状态方程，并说明相互作用和量子简并导致的失效。",
    "prediction": {
      "q": "固定 n 和 T，把 V 加倍，P 如何变化？",
      "options": [
        "变成原来的 1/2",
        "变成原来的 2 倍",
        "保持不变"
      ],
      "correct": 0,
      "explain": "PV=nRT，固定 n,T 时 P 与 V 成反比。"
    },
    "derive": {
      "q": "由 PV=nRT，Pa·m³ 对应什么量纲？",
      "options": [
        "功率 W",
        "能量 J",
        "熵 J/K"
      ],
      "correct": 1,
      "explain": "压强乘体积与能量同量纲，是第一律功项的基础。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　改变体积会同时改变哪些状态量？ 实验室用活塞压缩一团稀薄气体。压强升高究竟来自粒子变多、升温，还是空间变小？先固定两项，只改变第三项，检验能否从读数恢复同一状态方程。</p><p><b>列式理由</b>　平衡态下压强、体积、温度和物质的量满足约束；用单原子气体同时把温度与内能联系起来。</p><p><b>关键一步</b>　PV=nRT；同一平衡态不记录到达路径。</p><p><b>极限检验</b>　固定n、T时V加倍P减半；检查Pa·m³=J。 从各向同性动量通量得到 P=nm⟨vz²⟩，配合均分给 PV=NkBT；高密度相互作用及 nλ³/g 不小会破坏经典理想近似。</p>"
  },
  {
    "id": "TS1.2",
    "mapId": "TS1.2",
    "courseId": "thermal",
    "short": "热统 · TS1.2",
    "title": "第一定律：过程的能量账本",
    "intro": "同一个气缸，温度升高并不保证吸收相同的热。热量去了内能还是活塞对外做功？先切换过程，再检查终温、热与功的带符号账本。",
    "simTitle": "第一定律：过程的能量账本：模型与核验",
    "controls": [
      {
        "id": "kind",
        "type": "select",
        "label": "准静态过程",
        "value": 2,
        "options": [
          {
            "value": 0,
            "label": "等容：r=Tf/Ti"
          },
          {
            "value": 1,
            "label": "等压：r=Vf/Vi"
          },
          {
            "value": 2,
            "label": "可逆等温：r=Vf/Vi"
          },
          {
            "value": 3,
            "label": "可逆绝热：r=Vf/Vi"
          }
        ]
      },
      {
        "id": "n",
        "label": "物质的量 n",
        "min": 0.5,
        "max": 2,
        "step": 0.5,
        "value": 1,
        "unit": "mol"
      },
      {
        "id": "T",
        "label": "初温 Ti",
        "min": 200,
        "max": 600,
        "step": 25,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "V",
        "label": "初体积 Vi",
        "min": 0.01,
        "max": 0.05,
        "step": 0.01,
        "value": 0.02,
        "unit": "m³"
      },
      {
        "id": "r",
        "label": "终初比 r",
        "min": 0.5,
        "max": 3,
        "step": 0.1,
        "value": 2,
        "unit": ""
      },
      {
        "id": "f",
        "label": "独立二次自由度数 f",
        "min": 3,
        "max": 5,
        "step": 2,
        "value": 3,
        "unit": ""
      }
    ],
    "goal": "等温理想气体ΔU=0，可逆绝热Q=0；两题区分热和功的路径依赖。",
    "math": "ΔU=Q−W_by；W_by=∫P_ext dV；准静态时P_ext取体系P。",
    "modelNote": "单组分理想气体；U=nC_VT，C_V=fR/2；Q流入为正，W_by对外做功为正，单位J。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "独立积分四类过程，检查γ=(f+2)/f及绝热PV^γ不变。",
      "check": "等容 W=0；等压 W=nRΔT；等温 W=nRTln r；绝热 Q=0 且 TV^(γ−1)不变。压缩 r<1 时可逆等温功为负。"
    },
    "reflection": "相同温度变化为何不保证相同吸热？ 请先写出预测，再结合核验表中的独立条件解释；独立积分四类过程，检查γ=(f+2)/f及绝热PV^γ不变。",
    "prediction": {
      "q": "理想气体可逆等温膨胀，能量账本哪项正确？",
      "options": [
        "Q=0，ΔU>0",
        "ΔU=0，Q=W_by>0",
        "W_by<0，Q=0"
      ],
      "correct": 1,
      "explain": "理想气体内能只依赖温度；膨胀对外功由流入热补偿。"
    },
    "derive": {
      "q": "理想气体 Cv=fR/2，则 γ 是多少？",
      "options": [
        "1+f/2",
        "f/2",
        "1+2/f"
      ],
      "correct": 2,
      "explain": "Cp=Cv+R，所以 γ=Cp/Cv=1+2/f。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　相同温度变化为何不保证相同吸热？ 同一个气缸，温度升高并不保证吸收相同的热。热量去了内能还是活塞对外做功？先切换过程，再检查终温、热与功的带符号账本。</p><p><b>列式理由</b>　热是跨越边界的能量传递；只有准静态且力学平衡时，功积分才可使用体系的压强。</p><p><b>关键一步</b>　ΔU=Q−W_by；W_by=∫P_ext dV；准静态时P_ext取体系P。</p><p><b>极限检验</b>　等温理想气体ΔU=0，可逆绝热Q=0；两题区分热和功的路径依赖。 等容 W=0；等压 W=nRΔT；等温 W=nRTln r；绝热 Q=0 且 TV^(γ−1)不变。压缩 r<1 时可逆等温功为负。</p>"
  },
  {
    "id": "TS1.3",
    "mapId": "TS1.3",
    "courseId": "thermal",
    "short": "热统 · TS1.3",
    "title": "卡诺循环与效率",
    "intro": "热机从高温库吸热，再把一部分热排向冷库。扩大活塞膨胀比能否单独提高效率？先改变循环大小，再改变两库温差，比较功和效率。",
    "simTitle": "卡诺循环与效率：模型与核验",
    "controls": [
      {
        "id": "n",
        "label": "物质的量 n",
        "min": 0.5,
        "max": 2,
        "step": 0.5,
        "value": 1,
        "unit": "mol"
      },
      {
        "id": "Tc",
        "label": "冷库温度 Tc",
        "min": 100,
        "max": 400,
        "step": 25,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "dT",
        "label": "温差 Th−Tc",
        "min": 10,
        "max": 400,
        "step": 10,
        "value": 200,
        "unit": "K"
      },
      {
        "id": "r",
        "label": "热等温膨胀比",
        "min": 1.1,
        "max": 4,
        "step": 0.1,
        "value": 2,
        "unit": ""
      }
    ],
    "goal": "T_h>T_c>0，Q_h+Q_c=W_cycle；温差趋零效率趋零。",
    "math": "两条等温线与两条可逆绝热线闭合；η=1−T_c/T_h。",
    "modelNote": "理想气体可逆热机；热量带符号，温度K，功J，不能用摄氏比。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "由循环熵收支推导卡诺效率，解释不可逆热机为何不能超过同热库上界。",
      "check": "Qh/Th+Qc/Tc=0，故 η=W/Qh=1−Tc/Th；不可逆时总熵产生非负给 η≤ηCarnot。只对同两热库比较。"
    },
    "reflection": "为何降低冷库温度能提高可逆热机效率？ 请先写出预测，再结合核验表中的独立条件解释；由循环熵收支推导卡诺效率，解释不可逆热机为何不能超过同热库上界。",
    "prediction": {
      "q": "固定两库温度，只增大热等温膨胀比，卡诺效率怎样？",
      "options": [
        "效率提高到 1",
        "效率变小而功为零",
        "效率不变，循环功增大"
      ],
      "correct": 2,
      "explain": "Qh 与功均正比 ln r，效率只取决于 Tc/Th。"
    },
    "derive": {
      "q": "由可逆循环熵收支 Qh/Th+Qc/Tc=0，效率是？",
      "options": [
        "1−Tc/Th",
        "1−Th/Tc",
        "Tc/Th"
      ],
      "correct": 0,
      "explain": "W=Qh+Qc，Qc 为负，除以 Qh 后得到 1−Tc/Th。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　为何降低冷库温度能提高可逆热机效率？ 热机从高温库吸热，再把一部分热排向冷库。扩大活塞膨胀比能否单独提高效率？先改变循环大小，再改变两库温差，比较功和效率。</p><p><b>列式理由</b>　可逆循环的系统熵回到原值，吸排热除以各库绝对温度后相互抵消；四段曲线必须闭合。</p><p><b>关键一步</b>　两条等温线与两条可逆绝热线闭合；η=1−T_c/T_h。</p><p><b>极限检验</b>　T_h>T_c>0，Q_h+Q_c=W_cycle；温差趋零效率趋零。 Qh/Th+Qc/Tc=0，故 η=W/Qh=1−Tc/Th；不可逆时总熵产生非负给 η≤ηCarnot。只对同两热库比较。</p>"
  },
  {
    "id": "TS1.4",
    "mapId": "TS1.4",
    "courseId": "thermal",
    "short": "热统 · TS1.4",
    "title": "同一终态：自由膨胀与等温膨胀",
    "intro": "移去绝热箱中的隔板，气体向真空扩散。没有吸热、没有对外功，熵为何仍上升？先选同一初终态的可逆参照，再比较环境的账本。",
    "simTitle": "同一终态：自由膨胀与等温膨胀：模型与核验",
    "controls": [
      {
        "id": "n",
        "label": "物质的量 n",
        "min": 0.5,
        "max": 2,
        "step": 0.5,
        "value": 1,
        "unit": "mol"
      },
      {
        "id": "T",
        "label": "共同初终温度",
        "min": 200,
        "max": 600,
        "step": 25,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "r",
        "label": "终初体积比",
        "min": 1,
        "max": 6,
        "step": 0.2,
        "value": 2,
        "unit": ""
      }
    ],
    "goal": "两路径ΔU及ΔS相同，Q/W和环境熵不同；总熵产生非负。",
    "math": "同终态ΔS=nRln(V_f/V_i)；自由膨胀Q=W=0，可逆等温Q=TΔS。",
    "modelNote": "绝热自由膨胀与理想热库可逆参照；V_f≥V_i>0，熵J/K。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "明确δQ/T只在可逆路径直接积分给状态熵差，另列环境熵与熵产生。",
      "check": "自由膨胀 Q=W=ΔU=0，理想气体终温不变而 ΔS=nRln r≥0。可逆等温系统熵相同，热库熵为−ΔS。"
    },
    "reflection": "孤立自由膨胀没有吸热，系统熵为何增加？ 请先写出预测，再结合核验表中的独立条件解释；明确δQ/T只在可逆路径直接积分给状态熵差，另列环境熵与熵产生。",
    "prediction": {
      "q": "孤立理想气体自由膨胀，Q=0 是否意味着 ΔS=0？",
      "options": [
        "不是，ΔS=nRln r≥0",
        "是，熵只来自吸热",
        "不是，ΔS必为负"
      ],
      "correct": 0,
      "explain": "不可逆过程中系统熵产生可以非零；状态熵差由可逆参照求得。"
    },
    "derive": {
      "q": "两路径初终态相同，哪两项一定相同？",
      "options": [
        "Q 与 W_by",
        "ΔU 与 ΔS",
        "环境熵与 Q"
      ],
      "correct": 1,
      "explain": "U、S 是状态函数；Q、W 和环境熵取决于路径及环境。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　孤立自由膨胀没有吸热，系统熵为何增加？ 移去绝热箱中的隔板，气体向真空扩散。没有吸热、没有对外功，熵为何仍上升？先选同一初终态的可逆参照，再比较环境的账本。</p><p><b>列式理由</b>　熵是状态函数；可以用另选的可逆路径算熵差，却不能把不可逆过程中的 Q/T 直接当作系统熵差。</p><p><b>关键一步</b>　同终态ΔS=nRln(V_f/V_i)；自由膨胀Q=W=0，可逆等温Q=TΔS。</p><p><b>极限检验</b>　两路径ΔU及ΔS相同，Q/W和环境熵不同；总熵产生非负。 自由膨胀 Q=W=ΔU=0，理想气体终温不变而 ΔS=nRln r≥0。可逆等温系统熵相同，热库熵为−ΔS。</p>"
  }
];
});
