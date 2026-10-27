/* Source histories, phasor magnitude orders and explicitly normalized power patterns. */
(function(root){
  'use strict';
  const night={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  const num=(v,u='')=>v===null?'超出短元范围':(v===0?'0':Math.abs(v)<.001||Math.abs(v)>=1e4?v.toExponential(3):v.toFixed(3))+(u?' '+u:'');
  function model(id,p,M){
    if(id==='ED7.1')return M.retarded(p.radius,p.time,p.width);
    if(id==='ED7.2')return M.zones(p.logRadius);
    if(id==='ED7.3')return M.dipole(p.dipole,p.frequency,p.angle);
    return M.antenna(p.lengthRatio,p.tilt,p.observer);
  }
  function metrics(id,p,M){
    const f=model(id,p,M);
    if(id==='ED7.1')return [['传播延迟 R/c',num(f.delay,'ns')],['推迟时刻 tret',num(f.retardedTime,'ns')],['推迟源因子 p(tret)/p₀',num(f.delayed)]];
    if(id==='ED7.2')return [['距离 r/λ',num(10**p.logRadius)],['感应 / 辐射项幅值比',num(f.inductionRatio)],['完整复场积分 ⟨P⟩',num(f.power,'W')]];
    if(id==='ED7.3')return [['方向功率 d⟨P⟩/dΩ',num(f.dPower,'W/sr')],['总平均功率 ⟨P⟩',num(f.power,'W')],['拉莫尔周期平均',num(f.larmorPeak/2,'W')]];
    return [['短元近似范围',f.shortValid?'ℓ/λ≤0.05（教学阈值）':'超出：不报告短元绝对功率'],['均匀短元 Rrad',num(f.resistance,'Ω')],['视线归一化功率图',num(f.powerPattern)]];
  }
  function table(id,p,M){
    const f=model(id,p,M);let rows;
    if(id==='ED7.1')rows=[['源现在 f(t)',num(f.source)],['推迟源 f(t−R/c)',num(f.delayed)],['到达区间 (ns)',num(f.delay)+' — '+num(f.delay+p.width)],['φ，θ=60° (V)',num(f.phi)],['Az (T·m)',num(f.az)],['源定义','p₀=1 pC·m；紧支撑 sin⁴ 脉冲；守恒点偶极源']];
    else if(id==='ED7.2')rows=[['r (m) / λ (m)',num(f.radius)+' / '+num(f.wavelength)],['Eθ 近 / 感应 / 辐射项幅值 (V/m)',num(f.near)+' / '+num(f.induction)+' / '+num(f.radiation)],['Eθ：实部 / 虚部，省略共同 eⁱᵏʳ (V/m)',num(f.et.re)+' / '+num(f.et.im)],['cBφ：实部 / 虚部，同一相位约定 (V/m)',num(f.cb.re)+' / '+num(f.cb.im)],['完整复场 ⟨Sr⟩ (W/m²)',num(f.meanS)],['仅辐射项 ⟨Sr⟩ (W/m²)',num(f.radiationS)],['球面净平均功率 (W)',num(f.power)],['辐射总功率解析值 (W)',num(f.expectedPower)],['功率差 (W)',num(f.power-f.expectedPower)]];
    else if(id==='ED7.3')rows=[['ω (rad/s)',num(f.omega)],['λ / 采样 r=10λ (m)',num(f.wavelength)+' / '+num(f.radius)],['远区首项 ⟨Sr⟩ (W/m²)',num(f.intensity)],['总平均功率 (W)',num(f.power)],['q=1 nC 的 a₀ (m/s²)',num(f.acceleration)],['拉莫尔峰值 / 周期平均 (W)',num(f.larmorPeak)+' / '+num(f.larmorPeak/2)],['该振荡电荷 vmax/c',num(f.speedRatio)],['角向形状归一化','p₀=0 时方向图仅为几何形状，绝对功率为零']];
    else rows=[['λ / ℓ (m)',num(f.wavelength)+' / '+num(f.length)],['I₀=1 A 对应 p₀ (C·m)',num(f.p0)],['均匀短元 ⟨P⟩ (W)',num(f.power)],['均匀短元 Rrad (Ω)',num(f.resistance)],['视线短元场幅 / 功率（归一化）',num(f.fieldPattern)+' / '+num(f.powerPattern)],['预设有限线段功率（归一化）',num(f.finitePattern)],['阈值与有限模型说明','0.05 是保守教学阈值，非误差认证；金线不是馈电求解']];
    return {headers:['物理量 / 模型约定','数值 / 说明'],rows};
  }
  function draw(ctx,id,p,M,palette=null){
    const C=palette||night,f=model(id,p,M);
    function line(x,y,tx,ty,c=C.grid,w=1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
    function label(s,x,y,c=C.text,size=12){ctx.font=`${size}px -apple-system,sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':c;ctx.fillText(s,x,y);}
    function dot(x,y,c=C.gold){ctx.beginPath();ctx.arc(x,y,4,0,2*Math.PI);ctx.fillStyle=c;ctx.fill();}
    function graph(l,t,w,h,functions,xmin,xmax,ymin,ymax,xlabel,ylabel){
      const px=x=>l+w*(x-xmin)/(xmax-xmin),py=y=>t+h-h*(y-ymin)/(ymax-ymin);
      for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;line(px(x),t,px(x),t+h);line(l,py(y),l+w,py(y));label(x.toFixed(1),px(x)-9,t+h+18,C.muted,10);label(y.toFixed(1),l-31,py(y)+3,C.muted,10);}
      label(ylabel,l-20,t-17,C.muted,11);label(xlabel,l+w-73,t+h+39,C.muted,11);
      for(const [fn,c] of functions){ctx.beginPath();for(let i=0;i<=180;i++){const x=xmin+(xmax-xmin)*i/180,y=fn(x);if(i)ctx.lineTo(px(x),py(y));else ctx.moveTo(px(x),py(y));}ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();}
      return {px,py};
    }
    function polar(functions,tilt=0){
      const x=216,y=165,r=101;line(91,y,341,y);line(x,43,x,281);label('+x',342,y+4,C.muted,11);label('+z',x+8,49,C.muted,11);
      functions.forEach(([fn,c])=>{ctx.beginPath();for(let i=0;i<=240;i++){const a=2*Math.PI*i/240,value=fn(a-tilt),xx=x+r*value*Math.sin(a),yy=y-r*value*Math.cos(a);if(i)ctx.lineTo(xx,yy);else ctx.moveTo(xx,yy);}ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();});
    }
    if(id==='ED7.1'){
      label('绿：源 f(t)；紫：推迟源 f(t−R/c)',40,29,C.text,13);
      const g=graph(77,83,297,173,[[t=>M.pulse(t,p.width).value,C.green],[t=>M.pulse(t-f.delay,p.width).value,C.purple]],0,40,0,1.1,'t (ns)','归一化源因子');
      line(g.px(p.time),83,g.px(p.time),256,C.gold,1.5);dot(g.px(p.time),g.py(f.delayed));
      label('金线：观测时刻；曲线不是电势',40,319,C.muted,11);
      label('推迟势读取同一源历史',446,29,C.text,14);
      line(481,160,740,160,C.green,2);dot(481,160,C.green);dot(740,160,C.purple);
      label('局域偶极源',461,132,C.green,12);label('θ=60° 观察点',649,132,C.purple,12);
      label('R='+num(p.radius,'m'),549,187,C.text,14);
      label('延迟 '+num(f.delay,'ns'),455,235,C.gold,14);
      label('tret='+num(f.retardedTime,'ns'),455,264,C.text,14);
      label('真实 φ / Az 含空间因子，见下表',446,310,C.muted,11);
    }else if(id==='ED7.2'){
      label('三种 E 项幅值：双对数',40,29,C.text,14);
      const g=graph(76,83,294,173,[[x=>-3*x,C.green],[x=>Math.log10(2*Math.PI)-2*x,C.purple],[x=>2*Math.log10(2*Math.PI)-x,C.gold]],-2,1.3,-4,6,'log₁₀(r/λ)','log₁₀(|E项|/E*)');
      line(g.px(p.logRadius),83,g.px(p.logRadius),256,C.text,1);
      label('绿 r⁻³；紫 r⁻²；金 r⁻¹',40,319,C.muted,11);
      label('功率来自完整复场，不相加强度',443,29,C.text,13);
      label('Eθ='+num(f.et.re)+' − '+num(-f.et.im)+' i',451,110,C.green,12);
      label('cBφ='+num(f.cb.re)+' − '+num(-f.cb.im)+' i',451,148,C.purple,12);
      label('以上单位 V/m，省略共同 eⁱᵏʳ',451,179,C.muted,11);
      label('⟨P⟩='+num(f.power,'W'),451,230,C.gold,16);
      label('理想点偶极的球面净平均 P 恒定',443,282,C.muted,11);
      label('近区仍有近场往返储能；不能当纯行波',443,310,C.muted,11);
    }else if(id==='ED7.3'){
      label('归一化功率形状：xz 子午面',40,29,C.text,14);polar([[a=>Math.sin(a)**2,C.green]]);
      const a=p.angle*Math.PI/180;line(216,165,216+112*Math.sin(a),165-112*Math.cos(a),C.gold,1.5);
      label('绕 z 轴旋转得三维方向图',40,309,C.muted,11);
      label('角向形状（零源时仅为几何）',443,29,C.text,13);
      const g=graph(481,83,273,173,[[a=>Math.sin(a*Math.PI/180)**2,C.green]],0,180,0,1.1,'θ (°)','(dP/dΩ) / 峰值形状');dot(g.px(p.angle),g.py(Math.sin(a)**2));
      label('总 P∝p₀²ω⁴；拉莫尔平均=峰值/2',443,319,C.muted,11);
    }else{
      label('绿功率 sin²ψ；紫场幅 |sinψ|',40,29,C.text,13);
      polar([[a=>Math.abs(Math.sin(a)),C.purple],[a=>Math.sin(a)**2,C.green]],p.tilt*Math.PI/180);
      const a=p.observer*Math.PI/180;line(216,165,216+112*Math.sin(a),165-112*Math.cos(a),C.gold,1.5);
      label('子午面；天线 α='+p.tilt+'°，金线为视线',40,309,C.muted,11);
      label('绿：短元；金：有限均匀电流段',443,29,C.text,13);
      graph(481,83,273,173,[[a=>M.antenna(p.lengthRatio,p.tilt,a).powerPattern,C.green],[a=>M.antenna(p.lengthRatio,p.tilt,a).finitePattern,C.gold]],0,180,0,1.1,'θ (°)','归一化功率');
      label(f.shortValid?'短元范围内；均匀 I₀=1 A 峰值':'超出短元阈值：不输出短元绝对 P/R',443,319,C.muted,11);
    }
  }
  root.ED7Renderer={metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
