/* Macroscopic field diagrams, physical values and independent boundary residuals. */
(function(root){
  'use strict';
  const night={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  const num=(v,u='')=>v===null?'无定义':(v===0?'0':Math.abs(v)<.001||Math.abs(v)>=1e4?v.toExponential(3):v.toFixed(3))+(u?' '+u:'');
  function model(id,p,M){
    if(id==='ED4.1')return M.polarization(p.polarization,p.angle);
    if(id==='ED4.2')return M.capacitor(p.epsilon,p.mode,p.voltage);
    if(id==='ED4.3')return M.magnetization(p.magnetization,p.angle,p.external);
    return M.boundary(p.epsilon1,p.epsilon2,p.mu1,p.mu2,p.sigma,p.current);
  }
  function metrics(id,p,M){
    const f=model(id,p,M);
    if(id==='ED4.1')return [['内部 ρb',num(f.rho,'C/m³')],['上表面 σb,+z',num(f.pz*1e6,'μC/m²')],['六面总束缚电荷',num(f.totalCharge*1e6,'μC')]];
    if(id==='ED4.2')return [['电场 Ez',num(f.field,'V/m')],['场能 U',num(f.energy*1e9,'nJ')],['电源输入功',num(f.sourceWork*1e9,'nJ')]];
    if(id==='ED4.3')return [['上表面 Kb,y',num(f.topKy,'A/m')],['内部 Hz',num(f.hz,'A/m')],['内部 Bx',num(f.bx*1e6,'μT')]];
    return [['ΔDz / σf',num(f.dJump*1e9)+' / '+num(p.sigma)+' nC/m²'],['ΔHy / −Kf,x',num(f.hJump)+' / '+num(-p.current)+' A/m'],['连续分量残差',num(f.eResidual,'V/m')+'；'+num(f.bResidual,'T')]];
  }
  function table(id,p,M){
    const f=model(id,p,M);
    if(id==='ED4.1')return {headers:['面（外法向）','σb (μC/m²)','Qb (μC)，每面 1 m²'],rows:f.faces.map(([name,v])=>[name,num(v*1e6),num(v*1e6)])};
    if(id==='ED4.2')return {headers:['电容 / 能量账目','终态或过程量'],rows:[['C (pF)',num(f.capacitance*1e12)],['V (V) / Q自由 (nC)',num(f.voltage)+' / '+num(f.charge*1e9)],['Dz / Pz (μC/m²)',num(f.displacement*1e6)+' / '+num(f.polarization*1e6)],['真空初态 U₀ (nJ)',num(f.vacuumEnergy*1e9)],['ΔU (nJ)',num(f.deltaEnergy*1e9)],['电源输入 W电源 (nJ)',num(f.sourceWork*1e9)],['对外机械输出 W机械 (nJ)',num(f.mechanicalWork*1e9)],['ΔU+W机械−W电源 (J)',num(f.balance)]]};
    if(id==='ED4.3')return {headers:['薄板量','数值'],rows:[['内部体束缚电流 Jb (A/m²)',num(f.jb)],['上 / 下表面 Kb,y (A/m)',num(f.topKy)+' / '+num(f.bottomKy)],['Mx / Mz (A/m)',num(f.mx)+' / '+num(f.mz)],['内部 Hz / 外侧 Hz (A/m)',num(f.hz)+' / '+num(f.outsideHz)],['内部 Bx / Bz (μT)',num(f.bx*1e6)+' / '+num(f.bz*1e6)],['外侧 Bz (μT)',num(f.outsideBz*1e6)]]};
    const a=f.one,b=f.two;
    return {headers:['分量 / 残差','区域 1（z<0）','区域 2（z>0）'],rows:[
      ['Ex (V/m)',num(a.ex),num(b.ex)],['Ez (V/m)',num(a.ez),num(b.ez)],['Dz (nC/m²)',num(a.dz*1e9),num(b.dz*1e9)],
      ['Hy (A/m)',num(a.hy),num(b.hy)],['By (μT)',num(a.by*1e6),num(b.by*1e6)],['Bz (μT)',num(a.bz*1e6),num(b.bz*1e6)],['Hz (A/m)',num(a.hz),num(b.hz)],
      ['ΔDz−σf (C/m²)',num(f.dResidual),'应为 0'],['−ΔHy−Kf,x (A/m)',num(f.hResidual),'应为 0'],['ΔEx (V/m)',num(f.eResidual),'应为 0'],['ΔBz (T)',num(f.bResidual),'应为 0']]};
  }
  function draw(ctx,id,p,M,palette=null){
    const C=palette||night;
    function line(x,y,tx,ty,c=C.grid,w=1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
    function label(s,x,y,c=C.text,size=12){ctx.font=`${size}px -apple-system,sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':c;ctx.fillText(s,x,y);}
    function circle(x,y,r,c,fill=false){ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);if(fill){ctx.fillStyle=c;ctx.fill();}else{ctx.strokeStyle=c;ctx.lineWidth=1.5;ctx.stroke();}}
    function arrow(x,y,tx,ty,c=C.green){line(x,y,tx,ty,c,2);if(Math.hypot(tx-x,ty-y)<1)return;const a=Math.atan2(ty-y,tx-x);line(tx,ty,tx-6*Math.cos(a-.45),ty-6*Math.sin(a-.45),c,2);line(tx,ty,tx-6*Math.cos(a+.45),ty-6*Math.sin(a+.45),c,2);}
    function graph(fn1,fn2,xmin,xmax,ymin,ymax,xname,yname){
      const l=490,t=90,w=264,h=178,px=x=>l+w*(x-xmin)/(xmax-xmin),py=y=>t+h-h*(y-ymin)/(ymax-ymin);
      for(let i=0;i<=4;i++){
        const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;
        line(px(x),t,px(x),t+h);line(l,py(y),l+w,py(y));
        label(x.toFixed(1),px(x)-9,t+h+17,C.muted,10);label(Math.abs(y)>999?y.toExponential(1):y.toFixed(1),l-45,py(y)+3,C.muted,10);
      }
      label(xname,661,310,C.muted,11);label(yname,461,75,C.muted,11);
      [fn1,fn2].forEach((fn,j)=>{
        ctx.beginPath();for(let i=0;i<=180;i++){const x=xmin+(xmax-xmin)*i/180,y=fn(x);if(i)ctx.lineTo(px(x),py(y));else ctx.moveTo(px(x),py(y));}
        ctx.strokeStyle=j?C.purple:C.green;ctx.lineWidth=2;ctx.stroke();
      });return {px,py};
    }
    const f=model(id,p,M);
    if(id==='ED4.1'){
      const l=103,r=325,t=83,b=258,cx=214,cy=171;
      for(const [x,y,tx,ty] of [[l,t,r,t],[r,t,r,b],[r,b,l,b],[l,b,l,t]])line(x,y,tx,ty,C.gold,2);
      label('边长 1 m；xz 截面（y 面见表格）',47,31,C.muted,12);
      arrow(cx,t,cx,t-30,C.purple);arrow(r,cy,r+30,cy,C.purple);
      label('n=+z',cx+8,t-23,C.purple,10);label('n=+x',r+5,cy-12,C.purple,10);
      const scale=76/Math.max(Math.abs(p.polarization),1);
      if(p.polarization!==0)arrow(cx,cy,cx+f.px*1e6*scale,cy-f.pz*1e6*scale,C.green);
      label('P',cx-19,cy+22,C.green,16);
      label('上 σb='+num(f.pz*1e6,'μC/m²'),95,292,C.gold,11);
      label('箭头：P 方向与相对长度；ρb,内部=0',47,315,C.muted,11);
      label('绿：+z 面；紫：+x 面',462,33,C.text,14);
      const range=Math.max(Math.abs(p.polarization)*1.12,.5);
      const g=graph(a=>M.polarization(p.polarization,a).pz*1e6,a=>M.polarization(p.polarization,a).px*1e6,0,180,-range,range,'θ (°)','σb (μC/m²)');
      circle(g.px(p.angle),g.py(f.pz*1e6),4,C.gold,true);
    }else if(id==='ED4.2'){
      label(p.mode===0?'断开电源：Q 固定':'连接电源：V 固定',48,31,C.text,16);
      ctx.fillStyle=palette?'#d7e8ca':'#233d49';ctx.fillRect(90,100,275,135);
      line(80,99,375,99,C.purple,4);line(80,237,375,237,C.gold,4);
      label('− 极板',93,84,C.purple);label('+ 极板',93,261,C.gold);
      arrow(56,225,56,124,C.muted);label('+z',47,112,C.muted,10);
      if(p.voltage!==0)arrow(222,215,222,126,C.green);
      label('εr='+p.epsilon,260,174,C.text,15);label('E',233,140,C.green,14);
      label('d=5 mm；A=0.02 m²（示意）',48,292,C.muted,11);
      label('介质已完全填满；E 箭头只示方向',48,315,C.muted,11);
      label('绿：场能 U；紫：电源输入 W电源',458,33,C.text,12);
      const yMax=Math.max(M.capacitor(8,p.mode,p.voltage).sourceWork*1e9,M.capacitor(1,p.mode,p.voltage).energy*1e9,M.capacitor(8,p.mode,p.voltage).energy*1e9,1)*1.1;
      const g=graph(e=>M.capacitor(e,p.mode,p.voltage).energy*1e9,e=>M.capacitor(e,p.mode,p.voltage).sourceWork*1e9,1,8,0,yMax,'εr','能量 / 功 (nJ)');
      circle(g.px(p.epsilon),g.py(f.energy*1e9),4,C.gold,true);
      label('各点均比较真空初态；机械功见表',458,324,C.muted,10);
    }else if(id==='ED4.3'){
      label('横向无限薄板；xz 截面',48,31,C.text,15);
      const t=104,b=238,cx=210,cy=171;
      line(81,t,364,t,C.gold,2);line(81,b,364,b,C.gold,2);
      line(81,cy,364,cy,C.grid);
      arrow(57,215,57,125,C.muted);label('+z',46,115,C.muted,10);label('x →',337,273,C.muted,10);
      const scale=69/Math.max(Math.abs(p.magnetization),1);
      if(p.magnetization!==0)arrow(cx,cy,cx+f.mx*scale,cy-f.mz*scale,C.green);
      label('M',cx-17,cy+25,C.green,16);
      label('Kb,y='+num(f.topKy,'A/m'),84,85,C.gold,11);
      label('Kb,y='+num(f.bottomKy,'A/m'),84,263,C.gold,11);
      label(f.topKy===0?'K=0':f.topKy>0?'⊗':'⊙',329,t+5,C.gold,20);
      label(f.bottomKy===0?'K=0':f.bottomKy>0?'⊗':'⊙',329,b+5,C.gold,20);
      label('⊗ 为 +y；⊙ 为 −y（x 右、z 上）',48,297,C.muted,11);
      label('厚度 1 m，横向延伸；内部 Jb=0',48,316,C.muted,11);
      label('内部总场（H、B 分别缩放）',460,33,C.text,15);
      const hs=76/Math.max(Math.abs(f.hz),Math.abs(p.external),1),bs=76/Math.max(Math.hypot(f.bx,f.bz)*1e6,1);
      for(const x of [536,700]){line(x-44,177,x+44,177);line(x,255,x,99);}
      if(f.hz!==0)arrow(536,177,536,177-f.hz*hs,C.purple);
      if(f.bx!==0||f.bz!==0)arrow(700,177,700+f.bx*1e6*bs,177-f.bz*1e6*bs,C.green);
      label('H (A/m)',493,84,C.purple,13);label('B (μT)',669,84,C.green,13);
      label('Hz='+num(f.hz),475,278,C.purple,11);
      label('Bx='+num(f.bx*1e6),642,278,C.green,11);
      label('H退磁,z=−Mz；H₀,z='+num(p.external,'A/m'),460,314,C.muted,11);
    }else{
      label('z=0；n 从区域 1 指向区域 2',48,31,C.text,15);
      line(48,175,402,175,C.gold,2);arrow(76,218,76,132,C.gold);label('n=+z',87,152,C.gold,11);
      label('区域 2：εr='+p.epsilon2+'，μr='+p.mu2,114,69,C.muted,12);
      label('区域 1：εr='+p.epsilon1+'，μr='+p.mu1,114,280,C.muted,12);
      const es=64/Math.max(Math.hypot(f.one.ex,f.one.ez),Math.hypot(f.two.ex,f.two.ez),1);
      for(const [field,y] of [[f.one,239],[f.two,108]])arrow(220,y,220+field.ex*es,y-field.ez*es,C.green);
      label('绿：E，两侧使用相同尺度',48,315,C.green,11);
      label('σf='+num(p.sigma,'nC/m²'),115,164,C.gold,11);
      label('Kf,x='+num(p.current,'A/m'),115,194,C.gold,11);
      label('切向 H 沿 y；用 ⊗ / ⊙ 示方向',461,32,C.text,14);
      label('⊗：+y 入屏；⊙：−y 出屏',461,54,C.muted,11);
      for(const [name,field,y] of [['区域 2',f.two,113],['区域 1',f.one,225]]){
        label(name,467,y-7,C.muted,12);
        const value=field.hy,symbol=Math.abs(value)<1e-14?'0':value>0?'⊗':'⊙';
        circle(572,y-8,10+45*Math.abs(value),C.purple);label(symbol,560,y,C.purple,23);
        label('Hy='+num(value,'A/m'),619,y,C.purple,11);
      }
      line(457,175,758,175,C.gold,2);
      label('符号圆半径按 |Hy| 缩放；零场写 0',461,292,C.muted,11);
      label('四个边界残差与全部分量见下表',461,315,C.muted,11);
    }
  }
  root.ED4Renderer={metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
