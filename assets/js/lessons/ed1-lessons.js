/* ED1 demonstrations reuse the shared lesson UI and progress store.
 * IDs are stable. ED1.2 retains the original `electro` progress key.
 */
(function (root,factory) {
  const lessons=factory();
  if(typeof module==='object' && module.exports) module.exports=lessons;
  root.ED1Lessons=lessons;
})(typeof globalThis!=='undefined'?globalThis:this,function () {
  'use strict';
  return [
    {
      id:'ED1.1',courseId:'electro',short:'电动力学 · ED1.1',title:'看场，而不只看场线',
      intro:"两个电荷的场怎样合成？先确定各分场方向，再逐分量相加，用对称点检验结果。",
      simTitle:'双点电荷：分场与合场',
      controls:[
        {id:'q1',label:'左侧电荷 q₁',min:-5,max:5,step:1,value:3,unit:'nC'},
        {id:'q2',label:'右侧电荷 q₂',min:-5,max:5,step:1,value:3,unit:'nC'},
        {id:'separation',label:'电荷间距 d',min:.5,max:2,step:.1,value:1.2,unit:'m'},
        {id:'sampleX',label:'采样点 x',min:-2,max:2,step:.1,value:0,unit:'m'},
        {id:'sampleY',label:'采样点 y',min:-1.5,max:1.5,step:.1,value:.6,unit:'m'}],
      goal:'用分量验证 E=E₁+E₂；认识“中点场为零”来自对称抵消，而非每个电荷都不产生场。',
      math:'Eᵢ=[qᵢ/(4πε₀)](r−rᵢ)/|r−rᵢ|³；Eₓ、Eᵧ 分别求和。',
      modelNote:'真空静电点电荷，源位于 x=±d/2、y=0。左图为 z=0 截面，箭头仅示方向。右图所有场矢量使用同一即时比例尺，不同参数帧之间长度不可直接比强度；数值以 N/C 给出。距任一源不足 0.12 m 时遮罩，未对库仑场做软化。',
      resourceTitle:'PhET · 电荷与电场',resourceDescription:'可用官方实验对照电场与等势线；当前演示的解析计算在本地完成。',
      resourceUrl:'https://phet.colorado.edu/en/simulations/charges-and-fields',
      graduate:{"task":"把点电荷叠加写成连续源积分，说明线性叠加与边界条件之间的关系。","check":"应得 E(r)=∫ρ(r′)(r−r′)/(4πε₀|r−r′|³)d³r′；先说明积分收敛和源点奇性的处理。给定导体边界时，必须连同诱导电荷求解，不能只叠加已知外源。"},
      reflection:'两等量正电荷在中点场为零。在中点上方，哪些分量抵消、哪些分量叠加？电势也必须为零吗？',
      prediction:{q:'两个等量正点电荷对称放在 x=±d/2，中点的合电场是多少？',options:['为零，因为两分场等大反向','为零，因为两电荷都没有产生场','沿 +x，大小为两分场之和'],correct:0,explain:'在中点，左电荷的场向 +x、右电荷的场向 −x，等大抵消。把采样点移到 y>0，两场的 y 分量会相加。'},
      derivation:"<p><b>物理问题</b>　两个源都产生场，某点的合场却可能为零；要区分各分场与它们的矢量和。</p><p><b>列式理由</b>　库仑场沿源到观察点的位移 Rᵢ=r−rᵢ，故 Eᵢ=qᵢRᵢ/(4πε₀Rᵢ³)。电荷符号决定方向。</p><p><b>关键一步</b>　Eₓ=Σqᵢ(x−xᵢ)/(4πε₀Rᵢ³)，Eᵧ 同理；先带符号求和，再求合场大小，单位 N/C。</p><p><b>极限检验</b>　两等量同号源在中点相消；移到中点上方，横向相消、纵向相加。所有源电荷归零时 E=0。</p>",
      derive:{q:'位于 rᵢ 的有符号点电荷 qᵢ，在观察点 r 产生的场应写为？',options:['qᵢ(r−rᵢ)/(4πε₀|r−rᵢ|³)','qᵢ(rᵢ−r)/(4πε₀|r−rᵢ|³)','qᵢ(r−rᵢ)/(4πε₀|r−rᵢ|²)'],correct:0,explain:'单位矢量 Rᵢ/Rᵢ 与平方反比的 1/Rᵢ² 合并，分母成为 Rᵢ³；矢量分子贡献一个长度量纲。'}
    },
    {
      id:'ED1.3',courseId:'electro',short:'电动力学 · ED1.3',title:'源与环流：两个积分定理',
      intro:"通量和环流分别检查什么？用同一组球面与圆周，把局域散度、旋度连接到整体积分。",
      simTitle:'有源场与环流场：局域量如何连接积分量？',
      controls:[
        {id:'kind',type:'select',label:'数学矢量场 F',value:0,options:[{value:0,label:'有源场：a(x,y,z)'},{value:1,label:'环流场：a(−y,x,0)'}]},
        {id:'rate',label:'系数 a',min:-2,max:2,step:.1,value:1,unit:'s⁻¹'},
        {id:'loopRadius',label:'球面 / 赤道环半径 R',min:.4,max:1.4,step:.1,value:1,unit:'m'}],
      goal:'找出“散度为零但环流非零”的反例；分别用散度定理和斯托克斯定理解释积分结果。',
      math:'∮球面 F·n dA=∫球体 ∇·F dV；∮圆周 F·dl=∫圆盘 (∇×F)·ẑ dA。',
      modelNote:'这是数学矢量场，以 F 的单位 m/s、a 的单位 s⁻¹ 作量纲示范，不能把环流例子当作静电场。图为 z=0 截面；闭合通量对三维球面计算，环流对 xy 平面圆周计算。正环向从 +z 看为逆时针。场箭头仅示方向；灰色环向箭头标明积分取向。',
      resourceTitle:'麻省理工学院 · 矢量分析',resourceDescription:'官方矢量分析材料，说明通量、环流及两个积分定理之间的关系。',
      resourceUrl:'https://web.mit.edu/wwmath/vectorc/ispath/unit8.html',
      graduate:{"task":"不用积分定理，直接参数化球面和圆周，独立复算两种场的通量与环流。","check":"有源场在球面上 F·n=aR，故通量为 4πaR³；环流场在赤道圆周 F·dl=aR²dφ，故环流为 2πaR²。注意二者分别是面积积分和线积分。"},
      reflection:'为何在 z=0 图上看不到 F_z，却仍需把它计入有源场的三维散度？球面通量与平面圆周环流的单位为什么不同？',
      prediction:{q:'对 F=a(−y,x,0)，a>0，哪组结论正确？',options:['散度为零，绕 +z 正向圆周的环流为正','散度和环流都为零','散度为正，环流为零'],correct:0,explain:'∂ₓ(−ay)+∂ᵧ(ax)=0，但旋度的 z 分量是 ∂ₓ(ax)−∂ᵧ(−ay)=2a，故正向环流为 2πaR²。'},
      derivation:"<p><b>物理问题</b>　穿出闭合面的净流量和沿闭合路径的累积流动，是两种不同的检验。</p><p><b>列式理由</b>　散度定理连接球面通量与体散度；斯托克斯定理连接圆周环流与圆盘上的旋度通量。</p><p><b>关键一步</b>　F=a(x,y,z) 给 ∇·F=3a、球面通量 4πaR³；F=a(−y,x,0) 给旋度 z 分量 2a、正向环流 2πaR²。</p><p><b>极限检验</b>　a→0 时两者归零；R 加倍时上述通量增为 8 倍、环流增为 4 倍。二维截面不能代替三维散度。</p>",
      derive:{q:'对 F=a(x,y,z)，球面半径由 R 变为 2R，闭合球面通量如何变化？',options:['增至 8 倍','增至 4 倍','不变，因为闭合曲面没有边界'],correct:0,explain:'该场的散度恒为 3a；通量等于散度乘球体积，随 R³ 变化。它不是固定点电荷的平方反比场，不能套用“通量不变”。'}
    },
    {
      id:'ED1.4',courseId:'electro',short:'电动力学 · ED1.4',title:'跨过界面：场怎样跳变',
      intro:"跨过带电、载流的薄面，场的哪些分量会跳变？先固定法向，再用薄柱和小环路求两侧差。",
      simTitle:'真空薄面：电场与磁场的边界条件',
      controls:[
        {id:'sigma',label:'面电荷密度 σ',min:-5,max:5,step:.5,value:2,unit:'nC/m²'},
        {id:'surfaceCurrent',label:'沿 +x 面电流 Kₓ',min:-4,max:4,step:.5,value:2,unit:'A/m'},
        {id:'backgroundE',label:'均匀切向背景 Eᵧ',min:-100,max:100,step:10,value:30,unit:'N/C'},
        {id:'backgroundB',label:'均匀法向背景 Bz',min:-3,max:3,step:.5,value:1,unit:'μT'}],
      goal:'用明确的法向和两侧场值核对四条真空静态边界关系，尤其辨认面电流所对应的磁场跳跃方向。',
      math:'n·ΔE=σ/ε₀；n×ΔE=0；n·ΔB=0；n×ΔB=μ₀K，Δ=区域 2−区域 1。',
      modelNote:'无限均匀静态薄面 z=0，两侧均为真空；区域 1 在 z<0，区域 2 在 z>0，n=+z。K 沿 x；图为 yz 截面，+x 指向屏幕外。计算两侧极限，不定义薄面本身的自场。E、B 各自统一缩放箭头，不能跨图比较长度。真实有限薄面在边缘处不满足本示范的平移对称性。',
      resourceTitle:'费曼物理学讲义 · 高斯定律的应用',resourceDescription:'官方教材中的均匀带电薄面；磁场部分由安培环路定律在本页推导。',
      resourceUrl:'https://www.feynmanlectures.caltech.edu/II_05.html',
      graduate:{"task":"从积分方程取跨界薄柱和小环路极限，列出推导中哪些项随厚度消失。","check":"先固定 n 从区域 1 指向 2；有限、分片光滑的体场在厚度趋零时不贡献有限跳跃。若存在额外偶极面层或奇异时变场，须重新检查极限，不能机械套式。"},
      reflection:'为什么加入相同的 Eᵧ 或 Bz 背景不改变界面跳跃？若把法向改为 −z，区域编号与跳跃定义应怎样一起改变？',
      prediction:{q:'取 n=+z（区域 1→2），σ>0 时，ΔEₙ=E₂z−E₁z 的符号是什么？',options:['正，等于 σ/ε₀','负，等于 −σ/ε₀','总为零，因为两侧都是真空'],correct:0,explain:'跨界薄柱的两端外法向相反，净通量为 (E₂z−E₁z)A。高斯定律给出 ΔEₙ=σ/ε₀。'},
      derivation:"<p><b>物理问题</b>　理想薄面上的面源可以使场突变；要比较两侧极限，不能把面上自场当作已定义的值。</p><p><b>列式理由</b>　固定 n=+z、Δ=区域2−区域1。高斯薄柱约束法向分量，静态小环路约束切向分量。</p><p><b>关键一步</b>　ΔEz=σ/ε₀，ΔBz=0，ΔE切向=0；n×ΔB=μ₀K。K=Kₓx̂ 时，ẑ×ŷ=−x̂，故 ΔBᵧ=−μ₀Kₓ。</p><p><b>极限检验</b>　σ、K 归零时跳跃消失，均匀背景场仍可存在；两侧加相同背景不改变跳跃。有限薄面的边缘场需另求。</p>",
      derive:{q:'当 n=+z、K=Kₓx̂ 且 Kₓ>0，磁场的切向跳跃 ΔBᵧ 是？',options:['−μ₀Kₓ','+μ₀Kₓ','0'],correct:0,explain:'ẑ×ŷ=−x̂，因此 n×ΔB=μ₀K 要求 ΔBᵧ<0。不要把叉积的顺序倒过来。'}
    }
  ];
});
