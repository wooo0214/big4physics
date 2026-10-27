/* ED2 Canvas projections and tables; scientific values come from ED2Physics.
 * Each graph has numerical axes and a shared scale for compared curves.
 */
(function(root){
  'use strict';
  const nightColors={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  const num=(value,unit='')=>value===null?'无定义':(value===0?'0':Math.abs(value)>=1e4||Math.abs(value)<.001?value.toExponential(3):value.toFixed(3))+(unit?' '+unit:'');
  function model(id,p,M){
    if(id==='ED2.1')return M.paths(p.charge,p.sourceX,p.bend,p.offset);
    if(id==='ED2.2')return M.image(p.charge,p.height,p.probeX,p.probeZ);
    if(id==='ED2.3')return M.rectangle(p.voltage,p.shape,p.modes,p.fractionX*M.L,p.fractionY*M.H);
    return M.multipole(p.charge,p.distance,p.ratio,p.angle,p.kind);
  }
  function metrics(id,p,M){
    const f=model(id,p,M);
    if(id==='ED2.1')return [['端点 Δφ',num(f.delta,'V')],['直线 −∫E·dl',num(f.direct===null?null:-f.direct,'V')],['折线 −∫E·dl',num(f.bent===null?null:-f.bent,'V')]];
    if(id==='ED2.2'){
      const s=M.imageSummary(p.charge,p.height);
      return [['采样点 φ',f.valid?num(f.potential,'V'):'源周遮罩：未定义'],['真实源 Fz',num(s.forceZ*1e9,'nN')],['相互作用能 U',num(s.energy*1e9,'nJ')]];
    }
    if(id==='ED2.3'){
      const e=M.boundaryError(p.voltage,p.shape,p.modes);
      return [['采样点 φN',num(f.potential,'V')],['顶边均方根残差',num(e.rms,'V')],['顶边最大绝对残差',num(e.max,'V')]];
    }
    return [['精确势',num(f.exact,'V')],['远场首项',num(f.approx,'V')],['相对误差',f.relativeError===null?'无定义（零势/遮罩）':num(f.relativeError*100,'%')],['绝对误差',num(f.absoluteError,'V')]];
  }
  function table(id,p,M){
    const f=model(id,p,M);
    if(id==='ED2.1')return {headers:['核验量','数值 (V)'],rows:[['φA（含 C）',num(f.a)],['φB（含 C）',num(f.b)],['直线 −∫E·dl − Δφ',num(f.direct===null||f.delta===null?null:-f.direct-f.delta)],['折线 −∫E·dl − Δφ',num(f.bent===null||f.delta===null?null:-f.bent-f.delta)]]};
    if(id==='ED2.2')return {headers:['半空间 / 边界量','数值'],rows:[['采样 Ex (N/C)',num(f.ex)],['采样 Ez (N/C)',num(f.ez)],['φ(x=0,z=0) (V)',num(M.image(p.charge,p.height,0,0).potential)],['φ(x=1 m,z=0) (V)',num(M.image(p.charge,p.height,1,0).potential)],['源处诱导势（不含自场）(V)',num(M.imageSummary(p.charge,p.height).inducedPotential)]]};
    if(id==='ED2.3')return {headers:['采样点 / 边界量','数值'],rows:[['位置 (x,y) (m)',num(p.fractionX*M.L)+', '+num(p.fractionY*M.H)],['Ex (N/C)',num(f.ex)],['Ey (N/C)',num(f.ey)],['三条接地边最大残差 (V)',num(Math.max(Math.abs(M.rectangle(p.voltage,p.shape,p.modes,0,.7).potential),Math.abs(M.rectangle(p.voltage,p.shape,p.modes,M.L,.7).potential),Math.abs(M.rectangle(p.voltage,p.shape,p.modes,1,0).potential)))]]};
    const node=M.multipole(p.charge,p.distance,2,90,p.kind);
    return {headers:['物理解释 / 核验量','当前值'],rows:[['边界核',p.kind===2?'GD=(1/R₊−1/R₋)/(4π)':'G₀=1/(4πR)'],['真实源',p.kind===2?'z=a 的 q；导体上为分布诱导电荷':p.kind===1?'z=±d/2 的两个 q':'z=±d/2 的 +q 与 −q'],['首项势阶次',p.kind===1?'r⁻¹（Q=2q）':'r⁻²（沿非节点方向）'],['z=0、r/d=2 处势 (V)',num(node.exact)]]};
  }
  function draw(ctx,id,p,M,palette=null){
    const C=palette||nightColors;
    function line(x,y,tx,ty,c=C.grid,w=1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
    function label(s,x,y,c=C.text,size=12){ctx.font=`${size}px -apple-system,sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':c;ctx.fillText(s,x,y);}
    function dot(x,y,r,c){ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);ctx.fillStyle=c;ctx.fill();}
    function circle(x,y,r,c){ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);ctx.strokeStyle=c;ctx.lineWidth=1;ctx.stroke();}
    function arrow(x,y,tx,ty,c=C.green){line(x,y,tx,ty,c,1.5);const a=Math.atan2(ty-y,tx-x);line(tx,ty,tx-5*Math.cos(a-.5),ty-5*Math.sin(a-.5),c);line(tx,ty,tx-5*Math.cos(a+.5),ty-5*Math.sin(a+.5),c);}
    function graph(fn1,fn2,xmin,xmax,ymin,ymax,xlabel,ylabel){
      const x0=478,y0=263,w=278,h=183,px=x=>x0+w*(x-xmin)/(xmax-xmin),py=y=>y0-h*(y-ymin)/(ymax-ymin);
      for(let i=0;i<=4;i++){
        const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;
        line(px(x),y0,px(x),y0-h);line(x0,py(y),x0+w,py(y));
        label(x.toFixed(1),px(x)-8,y0+17,C.muted,10);label(Math.abs(y)>=1000?y.toExponential(1):y.toFixed(ymax-ymin<.5?2:1),x0-46,py(y)+3,C.muted,10);
      }
      label(xlabel,x0+w-60,306,C.muted,11);label(ylabel,x0-25,65,C.muted,11);
      [fn1,fn2].forEach((fn,j)=>{if(!fn)return;ctx.beginPath();let started=false;for(let i=0;i<=200;i++){
        const x=xmin+(xmax-xmin)*i/200,y=fn(x);if(y===null||!Number.isFinite(y)){started=false;continue;}
        if(!started){ctx.moveTo(px(x),py(y));started=true;}else ctx.lineTo(px(x),py(y));
      }ctx.strokeStyle=j?C.purple:C.green;ctx.lineWidth=2;ctx.stroke();});
      return {px,py};
    }
    function fieldAxes(x0,z0,scale){
      arrow(45,z0,405,z0,C.muted);arrow(x0,z0,x0,42,C.muted);
      label('x (m)',353,z0+21,C.muted,11);label('z (m)',x0+8,43,C.muted,11);
      for(const x of [-1,1]){line(x0+x*scale,z0-3,x0+x*scale,z0+3,C.muted);label(String(x),x0+x*scale-4,z0+15,C.muted,10);}
      for(const z of [1,2]){line(x0-3,z0-z*scale,x0+3,z0-z*scale,C.muted);label(String(z),x0-15,z0-z*scale+4,C.muted,10);}
    }
    if(id==='ED2.1'){
      const x0=222,z0=270,s=96,source=x0+p.sourceX*s;fieldAxes(x0,z0,s);
      // Only circles contained within this panel are drawn; no cropped contours.
      for(const r of [.45,.85,1.2]){ctx.beginPath();ctx.arc(source,z0,r*s,Math.PI,2*Math.PI);ctx.strokeStyle=C.grid;ctx.lineWidth=1;ctx.stroke();}
      for(let x=-1.5;x<=1.51;x+=.5)for(let z=.5;z<=2.01;z+=.5){const f=M.point(p.charge,p.sourceX,0,x,z);const n=Math.hypot(f.ex,f.ez);if(f.valid&&n>1e-12)arrow(x0+x*s,z0-z*s,x0+x*s+13*f.ex/n,z0-z*s-13*f.ez/n,'#557d87');}
      dot(source,z0,7,C.gold);label('q',source+9,z0-5,C.gold);
      const ax=x0-s,bx=x0+s,y=z0-s,by=z0-p.bend*s;
      arrow(ax,y,bx,y,C.green);line(ax,y,ax,by,C.purple,2);arrow(ax,by,bx,by,C.purple);line(bx,by,bx,y,C.purple,2);
      dot(ax,y,4,C.green);dot(bx,y,4,C.green);label('A',ax-17,y+17);label('B',bx+7,y+17);
      label('圆：等势球截面；箭头：场方向',48,316,C.muted,11);
      const f=model(id,p,M);
      label('两路径的数值积分核验',460,41,C.text,17);
      label('Δφ = '+num(f.delta,'V'),460,101,C.gold,16);
      label('直线：'+num(-f.direct,'V'),460,153,C.green,16);
      label('折线：'+num(-f.bent,'V'),460,199,C.purple,16);
      label('均显示 −∫A→B E·dl，与 Δφ 比较',460,244,C.muted,12);
      label('改变 C，仅平移电势零点',460,286,C.muted,12);
    }else if(id==='ED2.2'){
      const x0=222,z0=270,s=96;fieldAxes(x0,z0,s);
      line(45,z0,405,z0,C.gold,3);label('接地面 φ=0（z≤0 为导体）',65,314,C.gold,11);
      for(let x=-1.5;x<=1.51;x+=.3)for(let z=.2;z<=2.01;z+=.3){const f=M.image(p.charge,p.height,x,z),n=Math.hypot(f.ex,f.ez);if(f.valid&&n>1e-12)arrow(x0+x*s,z0-z*s,x0+x*s+12*f.ex/n,z0-z*s-12*f.ez/n,'#557d87');}
      dot(x0,z0-p.height*s,8,C.gold);circle(x0,z0-p.height*s,.08*s,C.gold);label('q',x0+12,z0-p.height*s,C.gold);
      dot(x0+p.probeX*s,z0-p.probeZ*s,5,C.green);label('P',x0+p.probeX*s+7,z0-p.probeZ*s-7,C.green);
      label('真实源所受力（+z 为正）',460,36,C.text,16);
      const lo=M.imageSummary(p.charge,.3).forceZ*1e9,range=Math.max(1,Math.abs(lo));
      const g=graph(a=>M.imageSummary(p.charge,a).forceZ*1e9,null,.3,1.5,-range,0,'a (m)','Fz (nN)');
      dot(g.px(p.height),g.py(M.imageSummary(p.charge,p.height).forceZ*1e9),4,C.gold);
      label('曲线：吸引力；金点：当前 a',480,51,C.green,11);
    }else if(id==='ED2.3'){
      const left=65,top=54,w=320,h=240,vscale=Math.max(Math.abs(p.voltage),1);
      for(let i=0;i<48;i++)for(let j=0;j<36;j++){
        const f=M.rectangle(p.voltage,p.shape,p.modes,M.L*(i+.5)/48,M.H*(j+.5)/36),v=Math.max(-1,Math.min(1,f.potential/vscale));
        // Same signed, linear normalization in either theme; only display colors change.
        ctx.fillStyle=palette
          ? (v>=0?`rgb(${235-124*v},${246-66*v},${229-87*v})`:`rgb(${235+48*v},${246+77*v},${229+17*v})`)
          : (v>=0?`rgb(${24+80*v},${43+175*v},${66+129*v})`:`rgb(${24-160*v},${43-111*v},${66-175*v})`);
        ctx.fillRect(left+i*w/48,top+h-(j+1)*h/36,w/48+.2,h/36+.2);
      }
      label('φN (V) · '+num(-Math.abs(p.voltage))+' 紫 ↔ 绿 '+num(Math.abs(p.voltage)),57,30,C.muted,11);
      line(left,top,left+w,top,C.gold,2);label('f(x)',left+140,top-6,C.gold,11);
      label('0',left-18,top+h+4,C.muted,10);label('1.5',left-26,top+5,C.muted,10);label('y (m)',13,158,C.muted,11);
      label('0',left,top+h+16,C.muted,10);label('2',left+w-3,top+h+16,C.muted,10);label('x (m)',left+140,326,C.muted,11);
      dot(left+p.fractionX*w,top+h-p.fractionY*h,5,C.gold);label('P',left+p.fractionX*w+8,top+h-p.fractionY*h-6,C.gold);
      label('顶边：给定边界 / 截断解',463,28,C.text,16);
      label('绿：f(x)；紫：φN(x,H)',478,48,C.muted,11);
      const r=Math.max(Math.abs(p.voltage)*1.12,1);
      graph(x=>M.topBoundary(p.voltage,p.shape,x),x=>M.rectangle(p.voltage,p.shape,p.modes,x,M.H).potential,0,M.L,-r,r,'x (m)','φ (V)');
    }else{
      const f=model(id,p,M),s=125/Math.max(f.r,p.distance),cx=88,cy=190;
      arrow(50,cy,392,cy,C.muted);arrow(cx,cy,cx,49,C.muted);label('x (m)',345,cy+18,C.muted,11);label('z (m)',cx+8,48,C.muted,11);
      const sy=cy-p.distance*s/2;dot(cx,sy,7,C.gold);label('q：z=d/2',cx+11,sy-5,C.gold,11);
      if(p.kind!==2){dot(cx,cy+p.distance*s/2,7,C.purple);label(p.kind===1?'q：z=−d/2':'−q：z=−d/2',cx+11,cy+p.distance*s/2+5,C.purple,11);}
      else {line(50,cy,392,cy,C.gold,2);label('接地面：不绘制内部镜像为真源',55,319,C.gold,11);}
      line(cx,cy,cx+f.x*s,cy-f.z*s,C.green);dot(cx+f.x*s,cy-f.z*s,5,C.green);label('P',cx+f.x*s+8,cy-f.z*s-6,C.green);
      label('r='+num(f.r,'m')+'；θ='+p.angle+'°',175,58,C.muted,11);
      if(p.kind!==2)label('几何随 r 缩放；坐标轴等比例',55,319,C.muted,11);
      const a=x=>M.multipole(p.charge,p.distance,x,p.angle,p.kind);
      let low=0,high=0;for(let i=0;i<=200;i++){const v=a(.8+9.2*i/200);for(const y of [v.exact,v.approx])if(y!==null){low=Math.min(low,y);high=Math.max(high,y);}}
      const span=Math.max(high-low,1);low-=span*.08;high+=span*.08;
      label('绿：精确势；紫：远场首项',466,28,C.text,15);
      label(p.kind===1?'单极势 ∝ r⁻¹':'偶极势 ∝ r⁻²（非节点方向）',478,48,C.muted,11);
      const g=graph(x=>a(x).exact,x=>a(x).approx,.8,10,low,high,'r/d','φ (V)');
      if(f.valid)dot(g.px(p.ratio),g.py(f.exact),4,C.gold);
    }
  }
  root.ED2Renderer={draw,metrics,table};
})(typeof globalThis!=='undefined'?globalThis:this);
