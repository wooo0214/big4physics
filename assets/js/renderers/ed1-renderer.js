/* Canvas-only ED1 views; all field values come from the tested PhysicsLab API.
 * Coordinates on screen are schematic projections with explicit units.
 */
(function (root) {
  'use strict';
  const nightColors={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  function draw(ctx,id,params,P,palette=null) {
    const color=palette||nightColors;
    function line(x1,y1,x2,y2,c=color.grid,width=1) {
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=c;ctx.lineWidth=width;ctx.stroke();
    }
    function label(s,x,y,c=color.text,size=13) {ctx.font=`${size}px -apple-system, sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':c;ctx.fillText(s,x,y);}
    function dot(x,y,r,c) {ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);ctx.fillStyle=c;ctx.fill();}
    function arrow(x1,y1,x2,y2,c=color.green) {
      if(Math.hypot(x2-x1,y2-y1)<.5){dot(x1,y1,2,c);return;}
      line(x1,y1,x2,y2,c,2);const a=Math.atan2(y2-y1,x2-x1);
      line(x2,y2,x2-6*Math.cos(a-.5),y2-6*Math.sin(a-.5),c,2);
      line(x2,y2,x2-6*Math.cos(a+.5),y2-6*Math.sin(a+.5),c,2);
    }
    function coordinates(cx,cy,scale,xname='x (m)',yname='y (m)') {
      for(let n=-2;n<=2;n++){
        line(cx+n*scale,cy-125,cx+n*scale,cy+125);
        if(n)label(String(n),cx+n*scale-4,cy+15,color.muted,10);
      }
      for(let n=-1;n<=1;n++){
        line(cx-2*scale,cy+n*scale,cx+2*scale,cy+n*scale);
        if(n)label(String(-n),cx-20,cy+n*scale+4,color.muted,10);
      }
      arrow(cx-2*scale,cy,cx+2*scale,cy,color.muted);
      arrow(cx,cy+125,cx,cy-125,color.muted);
      label(xname,cx+2*scale-35,cy+31,color.muted,11);label(yname,cx+8,cy-126,color.muted,11);
    }
    if(id==='ED1.1') {
      const p=P.chargeSuperposition(params.q1,params.q2,params.separation,params.sampleX,params.sampleY);
      const cx=205,cy=164,scale=78;
      coordinates(cx,cy,scale);
      for(let x=-2;x<=2.01;x+=.4)for(let y=-1.2;y<=1.21;y+=.4){
        const f=P.chargeSuperposition(params.q1,params.q2,params.separation,x,y);
        if(!f.valid)continue;
        const norm=Math.hypot(f.total.x,f.total.y);if(norm<1e-10)continue;
        const px=cx+x*scale,py=cy-y*scale;
        arrow(px,py,px+12*f.total.x/norm,py-12*f.total.y/norm,'#557d87');
      }
      [-1,1].forEach((sign,i)=>{
        const q=i?params.q2:params.q1,x=cx+sign*params.separation*scale/2;
        dot(x,cy,10,q<0?color.purple:color.gold);label(q>0?'+':q<0?'−':'0',x-4,cy+4,'#0b1020',12);
        label('q'+(i+1),x-7,cy+28,color.text,11);
      });
      const sx=cx+params.sampleX*scale,sy=cy-params.sampleY*scale;
      dot(sx,sy,5,color.green);label('P',sx+7,sy-6,color.green,12);
      label('z=0 截面 · 场箭头只示方向',45,312,color.muted,12);
      label('采样点 P 的矢量相加（N/C）',440,35,color.text,15);
      if(!p.valid){label('P 进入点源排除区，场值已遮罩',430,150,color.gold,15);label('移动采样点后再比较，不将缺失当零。',430,181,color.muted,12);return;}
      const [e1,e2]=p.parts,total=p.total;
      // Single scale for E1, E2 and their resultant; enough space for their
      // head-to-tail path as well as the direct resultant.
      const scaleE=110/Math.max(Math.hypot(e1.x,e1.y)+Math.hypot(e2.x,e2.y),1e-12);
      const ox=580,oy=175;
      line(435,oy,755,oy);line(ox,70,ox,275);
      arrow(ox,oy,ox+e1.x*scaleE,oy-e1.y*scaleE,color.green);
      arrow(ox,oy,ox+e2.x*scaleE,oy-e2.y*scaleE,color.purple);
      ctx.setLineDash([4,4]);arrow(ox+e1.x*scaleE,oy-e1.y*scaleE,ox+total.x*scaleE,oy-total.y*scaleE,color.purple);ctx.setLineDash([]);
      arrow(ox,oy,ox+total.x*scaleE,oy-total.y*scaleE,color.gold);
      label('E₁',449,277,color.green);label('E₂',514,277,color.purple);label('E₁+E₂',580,277,color.gold);
      label('三支箭头同尺度；虚线为平移后的 E₂',430,307,color.muted,12);
    } else if(id==='ED1.3') {
      const cx=230,cy=168,scale=81,r=params.loopRadius*scale;
      coordinates(cx,cy,scale);
      for(let x=-2;x<=2.01;x+=.4)for(let y=-1.2;y<=1.21;y+=.4){
        const f=P.vectorField(params.kind,params.rate,x,y),norm=Math.hypot(f.x,f.y);
        if(norm<1e-10)continue;
        arrow(cx+x*scale,cy-y*scale,cx+x*scale+13*f.x/norm,cy-y*scale-13*f.y/norm,color.green);
      }
      ctx.beginPath();ctx.arc(cx,cy,r,0,2*Math.PI);ctx.strokeStyle=color.gold;ctx.lineWidth=2;ctx.stroke();
      arrow(cx+r,cy+11,cx+r,cy-11,color.muted);
      label('正环向：从 +z 看逆时针',53,317,color.muted,12);
      const f=P.integralField(params.kind,params.rate,params.loopRadius);
      label(params.kind===0?'F=a(x,y,z)':'F=a(−y,x,0)',470,58,color.text,20);
      label('F：m/s；a：s⁻¹',470,91,color.muted,13);
      label('球面通量：'+f.flux.toFixed(3)+' m³/s',470,142,color.green,16);
      label('赤道环流：'+f.circulation.toFixed(3)+' m²/s',470,183,color.purple,16);
      label('球面通量需要整个三维表面',470,237,color.muted,13);
      label('圆周环流对应 xy 圆盘，法向 +z',470,265,color.muted,13);
      label(params.rate===0?'a=0：场及所有积分均为零':'改变 a 的符号可反转场与积分符号',470,302,color.gold,12);
    } else if(id==='ED1.4') {
      const f=P.vacuumInterface(params.sigma,params.surfaceCurrent,params.backgroundE,params.backgroundB);
      function panel(cx,first,second,title,units) {
        const cy=165;
        label(title,cx-135,31,color.text,15);
        line(cx-155,cy,cx+155,cy,color.gold,2);
        arrow(cx+135,cy+65,cx+135,cy-69,color.muted);
        label('n=+z',cx+100,cy-76,color.muted,11);
        label('区域 2：z>0',cx-151,66,color.muted,11);
        label('区域 1：z<0',cx-151,252,color.muted,11);
        label('z=0',cx-151,cy-8,color.gold,11);
        label('+y →',cx+92,cy+18,color.muted,11);
        const norm=Math.max(Math.hypot(first.y,first.z),Math.hypot(second.y,second.z),1e-30),gain=52/norm;
        arrow(cx,cy+65,cx+first.y*gain,cy+65-first.z*gain,color.purple);
        arrow(cx,cy-65,cx+second.y*gain,cy-65-second.z*gain,color.green);
        label('区域 1：紫；区域 2：绿',cx-151,281,color.muted,11);
        label(units,cx-151,303,color.muted,12);
      }
      panel(200,f.e1,f.e2,'电场 E：切向 y / 法向 z','Eᵧ 连续；E_z 跳跃，数值见下方');
      panel(600,f.b1,f.b2,'磁场 B：切向 y / 法向 z','B_z 连续；Bᵧ 跳跃，数值见下方');
      label('σ='+params.sigma+' nC/m²',94,193,color.gold,12);
      label('Kₓ '+(params.surfaceCurrent>0?'⊙':params.surfaceCurrent<0?'⊗':'0')+' '+params.surfaceCurrent+' A/m',475,193,color.gold,12);
    }
  }
  function metrics(id,params,P) {
    const number=(x,unit)=>x.toFixed(3)+' '+unit;
    if(id==='ED1.1') {
      const p=P.chargeSuperposition(params.q1,params.q2,params.separation,params.sampleX,params.sampleY);
      if(!p.valid)return [['有效性','排除区：未定义'],['Eₓ / Eᵧ','— / —'],['|E|','—']];
      return [['合场 Eₓ',number(p.total.x,'N/C')],['合场 Eᵧ',number(p.total.y,'N/C')],['合场 |E|',number(Math.hypot(p.total.x,p.total.y),'N/C')]];
    }
    if(id==='ED1.3') {
      const p=P.integralField(params.kind,params.rate,params.loopRadius);
      return [['三维散度 ∇·F',number(p.divergence,'s⁻¹')],['旋度 z 分量',number(p.curlZ,'s⁻¹')],['球面通量',number(p.flux,'m³/s')],['正向圆周环流',number(p.circulation,'m²/s')]];
    }
    const p=P.vacuumInterface(params.sigma,params.surfaceCurrent,params.backgroundE,params.backgroundB);
    return [['ΔE_z = σ/ε₀',number(p.jumpEn,'N/C')],['ΔBᵧ = −μ₀Kₓ',number(p.jumpBy*1e6,'μT')],['连续分量跳跃','ΔEᵧ=0；ΔB_z=0']];
  }
  function table(id,params,P) {
    if(id==='ED1.1') {
      const f=P.chargeSuperposition(params.q1,params.q2,params.separation,params.sampleX,params.sampleY);
      return {headers:['场','x 分量 (N/C)','y 分量 (N/C)'],rows:f.valid ? [
        ['左电荷 E₁',f.parts[0].x.toFixed(3),f.parts[0].y.toFixed(3)],
        ['右电荷 E₂',f.parts[1].x.toFixed(3),f.parts[1].y.toFixed(3)],
        ['合场 E',f.total.x.toFixed(3),f.total.y.toFixed(3)]] : [['采样点进入排除区','未定义','未定义']]};
    }
    if(id==='ED1.4') {
      const f=P.vacuumInterface(params.sigma,params.surfaceCurrent,params.backgroundE,params.backgroundB);
      return {headers:['两侧极限','Eᵧ (N/C)','E_z (N/C)','Bᵧ (μT)','B_z (μT)'],rows:[
        ['区域 1（z→0⁻）',f.e1.y.toFixed(3),f.e1.z.toFixed(3),(f.b1.y*1e6).toFixed(3),(f.b1.z*1e6).toFixed(3)],
        ['区域 2（z→0⁺）',f.e2.y.toFixed(3),f.e2.z.toFixed(3),(f.b2.y*1e6).toFixed(3),(f.b2.z*1e6).toFixed(3)]]};
    }
    return null;
  }
  root.ED1Renderer={draw,metrics,table};
})(typeof globalThis!=='undefined'?globalThis:this);
