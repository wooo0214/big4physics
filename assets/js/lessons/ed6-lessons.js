/* ED6: signed control-surface fluxes and vacuum momentum balance. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.ED6Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const slider=(id,label,min,max,step,value,unit='')=>({id,label,min,max,step,value,unit});
  const select=(id,label,value,options)=>({id,type:'select',label,value,options:options.map(([value,label])=>({value,label}))});
  const common={courseId:'electro',resourceTitle:'麻省理工学院开放课程 · 电磁学Ⅱ',resourceDescription:'官方电磁学讲义；本页采用真空微观场能量动量约定。',resourceUrl:'https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/lecture-notes/'};
  return [
    {...common,id:'ED6.1',short:'电动力学 · ED6.1',title:'坡印廷定理：能量账本',
      intro:"导线中的耗能从哪里得到补充？用侧面能流与体内做功，建立同一个控制体的能量账本。",simTitle:'稳恒圆柱：侧面能流与体做功',
      controls:[slider('current','沿 +z 电流 I',-5,5,.5,2,'A'),slider('field','轴向电场 Ez',-5,5,.5,2,'V/m')],
      goal:'明确外法向通量正负，核对边界能流与物质获得的电功率；不能把局部能流等同远区辐射。',
      math:'u=(ε₀E²+B²/μ₀)/2；S=E×B/μ₀；∂tu+∇·S=−J·E。',
      modelNote:'半径 a=0.01 m、长 L=1 m 的理想长导线局部段，均匀轴向 J 和 Ez，忽略端部效应。圆柱侧面 Bφ=μ₀I/(2πa)，Sr=−Ez I/(2πa)；端面 S·n=0。场稳恒 ∂tU=0，∮S·n dA+∫J·E dV=0。正 I 与正 Ez 为耗能导线；I Ez<0 时表示主动供能的理想局部段，不称为被动欧姆电阻。Ez 与 I 独立调节用于符号实验，不设固定电阻率，不解完整电源/回路。无平滑。',
      graduate:{"task":"从两条旋度方程逐项导出坡印廷定理，分别标出储能、通量与做功的单位。","check":"真空中 ∂tu+∇·S=−J·E，各项单位都是 W/m³；积分形式中净外流取外法向。若介质有色散或耗散，不能直接把真空 u 当作场加材料的完整储能。"},
      reflection:'导线内电荷沿轴运动，为何能量可以从侧面进入？把 I 反向而保留 E 后哪一项变号？稳恒但 S 非零是否就是辐射？',
      prediction:{q:'I>0、Ez>0 时，圆柱侧面的坡印廷矢量朝哪里？',options:['沿 +z','沿径向向外','沿径向向内'],correct:2,explain:'ẑ×φ̂=−r̂，因此 S=−Ez Bφ r̂/μ₀，外向通量为负，进入能量等于 IEzL。'},
      derivation:"<p><b>物理问题</b>　电荷沿导线运动，电磁能量却可从侧面进入；能量流向须由场计算。</p><p><b>列式理由</b>　用 S=E×B/μ₀ 和 u=(ε₀E²+B²/μ₀)/2，组合麦克斯韦旋度式，得 ∂tu+∇·S=−J·E。</p><p><b>关键一步</b>　本关侧面 Sr=−EzI/(2πa)，故 P外流=−IEzL；体做功 ∫J·E dV=IEzL。稳恒时两者相抵，J·E 单位 W/m³。</p><p><b>极限检验</b>　I 或 Ez 为零时功率为零；两者异号时能量向外输出，对应主动供能段。局部 S 非零并不足以判定远区辐射。</p>",
      derive:{q:'J·E 的单位和正号意义是什么？',options:['W/m³，物质从场获得能量','W/m²，穿面能流','N/m²，物质获得压力'],correct:0,explain:'(A/m²)(V/m)=W/m³，是单位体积电功率；J·E>0 时场向物质做正功。'}},
    {...common,id:'ED6.2',short:'电动力学 · ED6.2',title:'储能与输运：选择控制体',
      intro:"驻波储存能量，却没有平均净输运，矛盾吗？先叠加两列行波，再对固定控制体检查瞬时与平均守恒。",simTitle:'行波 → 驻波：非零储能不等于平均净输运',
      controls:[slider('amplitude','+z 波电场峰值 A',0,100,10,50,'V/m'),slider('ratio','−z / +z 波振幅比 b',0,1,.25,1),slider('phase','反向波附加相位 δ',0,180,30,0,'°'),slider('time','快照时间相位 ωt',0,360,15,45,'°'),slider('z','局部采样 z',0,1,.05,.25,'m')],
      goal:'区分局部/积分和瞬时/平均，验证无源控制体 dU/dt+Pout=0。',
      math:'E=f+h；cB=f−h；u=ε₀(f²+h²)；Sz=ε₀c(f²−h²)。',
      modelNote:'同偏振、相干、同频、反向无限真空平面波，λ=1 m、k=2π rad/m、ω=ck。f=A cos(kz−ωt)，h=bA cos(kz+ωt+δ)，E 沿 x、B 沿 y。固定控制体横截面 1 m²、0≤z≤0.375 m、J=0；端面外法向分别为 −z/+z。U 对解析能量密度积分，dU/dt 独立求导，Pout=S(L)−S(0)。滑块是相位快照，不按真实光速播放。图中能量单位 nJ/m³、能流 W/m²；无平滑。',
      graduate:{"task":"直接对有限控制体的能量积分求时间导数，并解释其与周期平均的关系。","check":"在固定控制体、J=0 时 dU/dt=−∮S·n dA。周期稳态下 ⟨dU/dt⟩=0，但瞬时 dU/dt 与各端通量一般不为零；等幅驻波只是平均净能流为零。"},
      reflection:'等幅驻波的瞬时 S 是否处处为零？控制体跨越不同节点位置时 U(t) 怎样改变？为什么时间平均零净输运不等于没有储能？',
      prediction:{q:'两列等幅反向波形成驻波，周期平均净能流与平均储能如何？',options:['两者均为零','净能流为零，储能非零（A>0）','净能流必为正'],correct:1,explain:'⟨S⟩=ε₀cA²(1−b²)/2，b=1 时为零；⟨u⟩=ε₀A²(1+b²)/2 非零。瞬时 S 可非零。'},
      derivation:"<p><b>物理问题</b>　储能看控制体内有多少能量，输运看边界通过多少能量；二者不必同时为零。</p><p><b>列式理由</b>　反向波的 B 分量反号。写 E=f+h、cB=f−h，代入 u、S，得到 u=ε₀(f²+h²)、Sz=ε₀c(f²−h²)。</p><p><b>关键一步</b>　⟨u⟩=ε₀A²(1+b²)/2、⟨Sz⟩=ε₀cA²(1−b²)/2。固定控制体满足 dU/dt+[S(L)−S(0)]A截面=0。</p><p><b>极限检验</b>　b=0 恢复单向行波；b=1 时平均净能流为零而平均储能非零。瞬时端面通量仍可改变 U，不能用平均结论替代瞬时守恒。</p>",
      derive:{q:'控制体左/右端外法向为 −z/+z，净外流功率怎样写？',options:['S(L)+S(0)，乘横截面积','永远等于零','[S(L)−S(0)]，乘横截面积'],correct:2,explain:'必须用 S·外法向，左端贡献 −S(0)，右端 +S(L)。'}},
    {...common,id:'ED6.3',short:'电动力学 · ED6.3',title:'场动量、应力与辐射压',
      intro:"同样的入射强度，为何镜面压力是吸收面的两倍？从动量改变求力，再核对控制面和应力符号。",simTitle:'真空入射：吸收与反射的压力',
      controls:[slider('intensity','入射周期平均强度 I',0,2000,100,1000,'W/m²'),select('mode','静止平面目标',0,[[0,'完全吸收'],[1,'理想镜面反射']])],
      goal:'从动量通量推得 p=I/c 或 2I/c；分清应力张量、动量密度和压力单位。',
      math:'g=S/c²；Tij=ε₀(EiEj−δijE²/2)+(BiBj−δijB²/2)/μ₀。',
      modelNote:'真空正常入射沿 +z，静止无限平面目标，不计透射、再辐射、表面运动与热反冲；所有强度/压力为周期平均。吸收目标沉积 I，静止理想镜平均不吸收能量，但转移 2I/c 动量通量。Tzz=−(I+I反)/c，控制面外法向决定力的正号；不把负 Tzz 解释成负压力。只显示入射行波的 g=I/c² 与 u=I/c，不冒充镜前干涉区总场。介质动量不能直接照搬此式。无平滑。',
      graduate:{"task":"由洛伦兹力密度及麦克斯韦方程导出动量局域守恒，检查应力与动量通量的符号。","check":"本页定义满足 f物质=∇·T−∂tg。把物质动量并入后，场的向外动量通量张量为 −T；不能因 Tzz<0 就把沿 +z 的辐射压力判成负值。"},
      reflection:'静止镜面不吸收平均功率，为何仍能受力？目标若运动，能量与频率如何改变？为什么 g 与压力相差一个速度因子？',
      prediction:{q:'固定 I>0，理想反射镜相对完全吸收面的压力如何？',options:['相同','加倍','减半'],correct:1,explain:'吸收使光的 +z 动量消失，反射还把它变成 −z；转移分别为 I/c 和 2I/c。'},
      derivation:"<p><b>物理问题</b>　场不仅带能量，也带动量；反射把出射动量方向反转，目标得到更大的动量转移。</p><p><b>列式理由</b>　真空行波 g=S/c²，沿传播方向的动量通量为 I/c。力取入射动量率减去出射动量率。</p><p><b>关键一步</b>　正常入射 p吸收=I/c、p反射=2I/c。一般 F物质=∮T·n dA−dP场/dt；周期稳态下平均动量导数为零。</p><p><b>极限检验</b>　I→0 时压力归零；理想静止镜可不吸收平均功率而仍受力。入射侧外法向 −z 与负 Tzz 给沿 +z 的力，压力单位 N/m²。</p>",
      derive:{q:'按本页麦克斯韦应力定义，积分动量平衡应为哪一式？',options:['F物质=∮T·n dA−dP场/dt','F物质=∮T·n dA+dP场/dt','F物质=∮S·n dA'],correct:0,explain:'局域洛伦兹力密度 f=∇·T−∂tg，积分即得该式；最后一项是能量通量，单位也不同。'}},
    {...common,id:'ED6.4',short:'电动力学 · ED6.4',title:'用守恒检查一个波实验',
      intro:"反射、吸收、透射怎样共同决定目标受力？分别列能量与动量账本，再反转入射方向检查符号。",simTitle:'两侧均为真空：功率收支与目标受力',
      controls:[slider('intensity','入射强度 I',0,2000,100,1000,'W/m²'),slider('area','束截面积 A',.01,1,.01,.1,'m²'),slider('reflectance','反射功率份额 R',0,1,.1,.3),slider('absorption','剩余功率中吸收的比例 η',0,1,.1,.5),select('direction','入射方向',1,[[1,'从左向右：+z'],[-1,'从右向左：−z']])],
      goal:'用控制面法向计算净外流与净力，保持功率份额物理可行；分别核验能量与动量。',
      math:'A吸=(1−R)η；T=(1−R)(1−η)；Fz=s(P入+P反−P透)/c。',
      modelNote:'目标左右都是真空，正常入射、稳态周期平均，忽略衍射、频移、再辐射和延迟储能；η 仅分配未反射的功率，自动保证 R+A吸+T=1。R/T 是功率份额，不是电场振幅，本模型不反演材料或相位。左/右控制面外法向固定 −z/+z；切换入射方向不改变法向。吸收功率转为热等内部能量或由热库带走；本页电磁储能变化为零，不声称目标总内能恒定。Fz 为场给目标的力，支撑力反向；介质出射时需重新考虑物质动量。无平滑。',
      graduate:{"task":"独立用应力积分复核正反两种入射方向的力，再列出此模型没有决定的量。","check":"两侧真空、稳态下 Fz=A截面(Tzz,右−Tzz,左)=s(A吸+2R)P入/c。R/A吸/T 只给功率分配，不能确定复反射系数、相位、储能延迟或材料本构。"},
      reflection:'为什么反射光从左面流出能量，仍向目标传递 +z 动量？如果仅测透射振幅还缺哪些信息？能量残差为零为何不能单独证明动量账本正确？',
      prediction:{q:'R=1 的静止理想镜，沿 +z 正常入射，目标吸收功率与受力怎样？',options:['吸收 P入，力 P入/c','都为零','吸收 0，力 +2P入/c'],correct:2,explain:'反射保持光能量却反转光动量，静止理想镜受力但不吸收平均功率。'},
      derivation:"<p><b>物理问题</b>　功率守恒只约束能量分配；目标受力还取决于每束光的传播方向。</p><p><b>列式理由</b>　两侧真空、周期稳态下，设反射率 R、吸收份额 A吸、透射率 T，三者和为1；入射功率为 P。</p><p><b>关键一步</b>　净外流为 −P+RP+TP=−A吸P；若入射沿 sẑ、s=±1，Fz=s(P+RP−TP)/c=s(A吸+2R)P/c。</p><p><b>极限检验</b>　完全透射无力，完全吸收得 sP/c，完全反射得 2sP/c；反转入射只反转力。吸收功率进入物质，不能称作能量丢失。</p>",
      derive:{q:'两侧真空、沿 +z 入射，力为何是 (P入+P反−P透)/c？',options:['反射/透射光的动量方向不同','所有出射功率都只需相减','能量守恒直接等于力'],correct:0,explain:'出射动量率为 (P透−P反)/c；目标所得为入射减出射，故反射项取正。'}}
  ];
});
