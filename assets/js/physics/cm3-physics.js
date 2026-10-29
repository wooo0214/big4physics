/* CM3: SI models unless the displayed axes explicitly define reduced units.
 * Each function validates domains; undefined branches remain null, never zero.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.CM3Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){

  'use strict';
  const PI=Math.PI;
  function finite(...xs){if(!xs.every(Number.isFinite))throw new RangeError('Inputs must be finite.');}
  function positive(...xs){finite(...xs);if(xs.some(x=>x<=0))throw new RangeError('Positive values required.');}
  function bounded(x,a,b){finite(x);if(x<a||x>b)throw new RangeError('Input outside model domain.');}
  const sq=x=>x*x;
  const graph=(title,x,y,lo,hi,series,options)=>({title,x,y,lo,hi,series,options});
  const series=(label,fn)=>({label,fn});
  function pack(raw,metrics,rows,plots,notice='解析模型；无平滑、无随机采样。'){return {...raw,metrics,rows,plots,notice};}
  function rk4(rhs,y0,tmax,n=1200){positive(tmax,n);const h=tmax/n,rows=[[0,...y0]];let y=y0.slice();for(let i=0;i<n;i++){const t=i*h,k1=rhs(t,y),k2=rhs(t+h/2,y.map((v,j)=>v+h*k1[j]/2)),k3=rhs(t+h/2,y.map((v,j)=>v+h*k2[j]/2)),k4=rhs(t+h,y.map((v,j)=>v+h*k3[j]));y=y.map((v,j)=>v+h*(k1[j]+2*k2[j]+2*k3[j]+k4[j])/6);rows.push([(i+1)*h,...y]);}return rows;}
  function sample(rows,col,x){const h=rows[1][0]-rows[0][0],z=Math.max(0,Math.min(rows.length-1,x/h)),i=Math.min(rows.length-2,Math.floor(z)),f=z-i;return rows[i][col]*(1-f)+rows[i+1][col]*f;}

  // Kepler models use specific angular momentum h and specific energy eps.
  function effective(mu,h,energy){positive(mu,h);finite(energy);const rc=h*h/mu,emin=-(mu**2)/(2*h*h),disc=mu*mu+2*energy*h*h;let turning=[];if(disc>=0){const root=Math.sqrt(disc);turning.push(h*h/(mu+root));if(energy<0)turning.push((mu+root)/(-2*energy));}const V=r=>h*h/(2*r*r)-mu/r;return pack({rc,emin,turning,energy},[['圆轨道半径 [m]',rc],['势阱最低值 [J/kg]',emin],['给定能量是否允许',energy>=emin?'允许':'无真实径向运动']],[['转向点 [m]',turning.length?turning.map(x=>Number(x.toPrecision(5))).join('，'):'不存在'],['变量','γ=GM [m³/s²]，h=L/m [m²/s]，ε=E/m [J/kg]'],['径向运动','ṙ²=2(ε−Veff)；负值区为空缺，不当零速度']],[graph('角动量屏障与引力','r [m]','Veff [J/kg]',.12*rc,4*rc,[series('Veff',V),series('ε',()=>energy)]),graph('径向动能允许区','r [m]','ṙ² [m²/s²]',.12*rc,4*rc,[series('2(ε−Veff)',r=>energy>=V(r)?2*(energy-V(r)):null)])]);}
  function conic(mu,h,e){positive(mu,h);bounded(e,0,2);const p=h*h/mu,energy=mu*mu*(e*e-1)/(2*h*h),limit=e>1?Math.acos(-1/e)-.02:e===1?PI-.08:PI,r=phi=>p/(1+e*Math.cos(phi));return pack({p,energy,peri:p/(1+e),kind:e<1?'椭圆':e===1?'抛物线':'双曲线'},[['离心率 e',e],['轨道类型',e<1?'椭圆':e===1?'抛物线':'双曲线'],['比能量 ε [J/kg]',energy]],[['轨道方程','r=p/(1+e cosφ)；φ=0指向近日点，h>0取逆时针'],['半通径 p [m]',p],['边界','只画r>0的物理支；双曲渐近方向前截去0.02 rad，抛物端点截去0.08 rad'],['近心距离 [m]',p/(1+e)]],[graph('焦点极坐标轨道','φ [rad]','r [m]',-limit,limit,[series('r(φ)',r)]),graph('束缚判别来自能量','e [无量纲]','ε [J/kg]',0,2,[series('ε(e)',x=>mu*mu*(x*x-1)/(2*h*h))])]);}
  function area(mu,a,e){positive(mu,a);bounded(e,0,.9);const h=Math.sqrt(mu*a*(1-e*e)),period=2*PI*Math.sqrt(a**3/mu),p=a*(1-e*e),r=phi=>p/(1+e*Math.cos(phi));return pack({h,areaRate:h/2,period,ratio:period**2/a**3},[['面积速度 dA/dt [m²/s]',h/2],['公转周期 T [s]',period],['T²/a³ [s²/m³]',period**2/a**3]],[['同一中心体','γ固定；椭圆0≤e<1；a为半长轴，图按真近点角采样'],['角速度 [rad/s]','φ̇=h/r²，变的是角速度，不是面积速度'],['周期推导','椭圆面积πab除以h/2；不把均匀φ采样当均匀时间采样']],[graph('近心快、远心慢','φ [rad]','φ̇ [rad/s]',0,2*PI,[series('h/r²',x=>h/r(x)**2)]),graph('第三定律的尺度检验','a [m]','T [s]',.3*a,2*a,[series('2π√(a³/γ)',x=>2*PI*Math.sqrt(x**3/mu))])]);}
  function scattering(mu,b,v){positive(mu,b,v);const chi=2*Math.atan(mu/(b*v*v)),e=Math.sqrt(1+(b*v*v/mu)**2),rp=(b*b*v*v/mu)/(1+e);return pack({chi,e,rp},[['引力偏转角 χ [rad]',chi],['双曲离心率 e',e],['近心距 rp [m]',rp]],[['无穷远条件','吸引点质量势−γ/r，b>0，v∞>0；χ为入射与出射速度夹角'],['弱偏转','χ≈2γ/(bv∞²)，仅γ/(bv∞²)≪1时适用'],['边界','忽略中心体尺寸与碰撞；b→0的χ→π是点势极限，不模拟穿越实体']],[graph('冲量参数与引力聚焦','b [m]','χ [rad]',.2*b,3*b,[series('精确',x=>2*Math.atan(mu/(x*v*v))),series('弱偏转',x=>2*mu/(x*v*v))]),graph('速度越大偏转越弱','v∞ [m/s]','χ [rad]',.4*v,2*v,[series('精确',x=>2*Math.atan(mu/(b*x*x)))])]);}
  function evaluate(id,p){Object.values(p).forEach(x=>finite(x));switch(id){case 'CM3.1':return effective(p.mu,p.h,p.energy);case 'CM3.2':return conic(p.mu,p.h,p.e);case 'CM3.3':return area(p.mu,p.a,p.e);case 'CM3.4':return scattering(p.mu,p.b,p.v);default:throw new RangeError('Unknown CM3 lesson.');}}
  return {evaluate,effective,conic,area,scattering};

});
