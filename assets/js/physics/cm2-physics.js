/* CM2: SI models unless the displayed axes explicitly define reduced units.
 * Each function validates domains; undefined branches remain null, never zero.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.CM2Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){

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

  function virtualWork(m,g,angle,ds){positive(m,g);bounded(angle,0,85);finite(ds);const a=angle*PI/180,Q=m*g*Math.sin(a),N=m*g*Math.cos(a);return pack({Q,work:Q*ds,normal:N},[['广义力 Q_s [N]',Q],['重力虚功 δW [J]',Q*ds],['法向反力虚功 [J]',0]],[['坐标约定','s沿固定光滑斜面向下，δs可正可负'],['几何关系','δx=cosα δs，δy=−sinα δs'],['约束条件','允许虚位移在同一时刻沿斜面；不是额外时间演化']],[graph('重力势与广义力','s [m]','V(s) [J]',-1,1,[series('−mg s sinα',s=>-Q*s)]),graph('理想约束反力不做虚功','δs [m]','δW [J]',-.2,.2,[series('重力虚功',s=>Q*s),series('反力虚功',()=>0)])]);}
  function agm(a,b){for(let i=0;i<60&&Math.abs(a-b)>1e-14*Math.max(a,b);i++){const c=(a+b)/2;b=Math.sqrt(a*b);a=c;}return (a+b)/2;}
  function pendulum(length,g,theta){positive(length,g);bounded(theta,0,179);const angle=theta*PI/180,tSmall=2*PI*Math.sqrt(length/g),tExact=tSmall/agm(1,Math.cos(angle/2)),relativeError=100*(tExact/tSmall-1),E=g*length*(1-Math.cos(angle));return pack({tSmall,tExact,relativeError,energy:E},[['小角周期 T₀ [s]',tSmall],['准确周期 T [s]',tExact],['相对偏差 [%]',relativeError]],[['单位质量能量 [J/kg]',E],['精确周期','T=4√(L/g)K(sin(θ₀/2))，K由AGM计算'],['模型边界','理想无阻尼单摆；振幅<180°，不含转动轨道'],['图示','右图能量关系是精确相曲线；未将余弦时间曲线冒充非线性解']],[graph('有限振幅周期','θ₀ [°]','T [s]',0,150,[series('精确周期',x=>tSmall/agm(1,Math.cos(x*PI/360))),series('小角周期',()=>tSmall)]),graph('同一能量面的两支','θ [rad]','θ̇ [rad/s]',-Math.max(angle,.01),Math.max(angle,.01),[series('正支',x=>Math.sqrt(Math.max(0,2*g/length*(Math.cos(x)-Math.cos(angle))))),series('负支',x=>-Math.sqrt(Math.max(0,2*g/length*(Math.cos(x)-Math.cos(angle)))))])]);}
  function action(m,omega,duration,amp){positive(m,omega,duration);finite(amp);const c=m*(PI**2/duration-omega**2*duration)/4,S=c*amp**2;return pack({action:S,coefficient:c,stationary:amp===0||Math.abs(c)<1e-12},[['试探路径作用量 S [J·s]',S],['δS/δA [J·s/m]',2*c*amp],['试探子空间二阶导数 [kg/s]',2*c]],[['固定端点','q(0)=q(T)=0；q_A(t)=A sin(πt/T)，精确驻定路径之一为q=0'],['计算','S(A)=mA²(π²/T−ω²T)/4；不是把动力学轨道与试探路径混同'],['驻定与最小','T<π/ω沿该方向为正，T>π/ω为负；仅检验一条变分方向'],['退化时长','T=π/ω时所有此形试探路径都是精确解，二阶变分沿此方向为零']],[graph('固定端点的试探路径','t [s]','q [m]',0,duration,[series('q_A',t=>amp*Math.sin(PI*t/duration)),series('q=0',()=>0)]),graph('作用量可向下弯曲','A [m]','S [J·s]',-2,2,[series('S(A)',a=>c*a*a)])]);}
  function cyclic(m,r,omega,k){positive(m,r,k);finite(omega);const angular=m*r*r*omega,energy=.5*m*(r*omega)**2-k/r;return pack({angular,energy},[['pφ=Lz [kg·m²/s]',angular],['当前总能量 [J]',energy],['方位广义力 [N·m]',0]],[['模型','平面中心势V=−k/r，r>0；图固定初始角动量后扫r'],['循环坐标','ℒ=m(ṙ²+r²φ̇²)/2+k/r不含φ，故d pφ/dt=0'],['边界','当前ṙ=0只指定一时刻，不表示任意r处圆轨道']],[graph('循环坐标消去后的角速度','r [m]','φ̇ [rad/s]',.3,3,[series('L/(mr²)',x=>angular/(m*x*x))]),graph('固定L的有效势','r [m]','Veff [J]',.3,3,[series('离心项+引力',x=>angular**2/(2*m*x*x)-k/x)])]);}
  function evaluate(id,p){Object.values(p).forEach(x=>finite(x));if(id==='mechanics')id='CM2.2';switch(id){case 'CM2.1':return virtualWork(p.m,p.g,p.angle,p.ds);case 'CM2.2':return pendulum(p.length,p.g,p.theta);case 'CM2.3':return action(p.m,p.omega,p.duration,p.amp);case 'CM2.4':return cyclic(p.m,p.r,p.omega,p.k);default:throw new RangeError('Unknown CM2 lesson.');}}
  return {evaluate,virtualWork,pendulum,action,cyclic,agm};

});
