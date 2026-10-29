/* CM1: SI models unless the displayed axes explicitly define reduced units.
 * Each function validates domains; undefined branches remain null, never zero.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.CM1Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){

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

  function incline(m,g,angle){positive(m,g);bounded(angle,0,89);const a=angle*PI/180,tangent=g*Math.sin(a),normal=m*g*Math.cos(a);return pack({acceleration:tangent,normal},[['沿斜面加速度 [m/s²]',tangent],['法向支持力 [N]',normal],['法向合力 [N]',0]],[['角度约定','α从水平面向上量；沿斜面向下为正'],['约束','固定光滑直斜面，质点不脱离；N垂直运动不做功'],['质量不改加速度','a=g sinα；N=mg cosα']],[graph('分解重力与约束反力','α [°]','力 [N]',0,85,[series('mg sinα',x=>m*g*Math.sin(x*PI/180)),series('N',x=>m*g*Math.cos(x*PI/180))]),graph('由静止释放：沿面位移','t [s]','s [m]',0,2,[series('s=at²/2',t=>tangent*t*t/2)])]);}
  function polar(r,omega,vr,ar,alpha){positive(r);finite(omega,vr,ar,alpha);const radial=ar-r*omega**2,tangent=r*alpha+2*vr*omega;return pack({radial,tangent},[['径向加速度 [m/s²]',radial],['切向加速度 [m/s²]',tangent],['合加速度 [m/s²]',Math.hypot(radial,tangent)]],[['符号','e_r向外；e_φ逆时针；ω=φ̇，v_r=ṙ，α=φ̈'],['径向分解 [m/s²]',`${ar} − ${r*omega**2}`],['切向分解 [m/s²]',`${r*alpha} + ${2*vr*omega}`],['瞬时模型','控件是某一时刻的运动学量；扫ω不宣称为一条真实轨迹']],[graph('向心项随角速度变化','ω [rad/s]','a_r [m/s²]',-3,3,[series('a_r',w=>ar-r*w*w)]),graph('基矢转动不能遗漏','ω [rad/s]','a_φ [m/s²]',-3,3,[series('完整a_φ',w=>r*alpha+2*vr*w),series('仅rα',()=>r*alpha)])]);}
  function elevator(m,g,a){positive(m,g);finite(a);const contact=g+a>=0,normal=contact?m*(g+a):null;return pack({normal,contact},[['理想所需支持力 [N]',m*(g+a)],['实际视重 [N]',normal===null?'失去接触':normal],['自由落体边界 [m/s²]',-g]],[['惯性系约定','向上为正：N−mg=ma'],['适用边界','体重计只能向上推；a<−g时约束失效，不能给负视重'],['a=−g','自由落体，接触力恰为零']],[graph('视重与自由落体边界','a/g [无量纲]','N/(mg)',-1.5,2,[series('接触分支',x=>x>=-1?1+x:null)]),graph('加速电梯的瞬时受力','a [m/s²]','F [N]',-1.5*g,2*g,[series('所需N',x=>m*(g+x)),series('重力大小',()=>m*g)])]);}
  function rotating(omega,r,vr,vphi){positive(r);finite(omega,vr,vphi);const centrifugal=omega**2*r,coriolisR=2*omega*vphi,coriolisPhi=-2*omega*vr;return pack({centrifugal,coriolisR,coriolisPhi,radial:centrifugal+coriolisR},[['离心加速度 [m/s²]',centrifugal],['科氏径向分量 [m/s²]',coriolisR],['科氏切向分量 [m/s²]',coriolisPhi]],[['坐标','Ω=Ωe_z恒定；旋转系瞬时位置r e_r，v′=v_r e_r+v_φ e_φ'],['惯性力除以m','a_cf=−Ω×(Ω×r)；a_cor=−2Ω×v′'],['边界','同原点、无平动加速度，无欧拉项；图为附加项而非总加速度']],[graph('科氏力随切向相对速度','v′φ [m/s]','a_r [m/s²]',-3,3,[series('科氏',v=>2*omega*v),series('科氏+离心',v=>2*omega*v+centrifugal)]),graph('科氏切向分量','v′r [m/s]','a_φ [m/s²]',-3,3,[series('−2Ωv′r',v=>-2*omega*v)])]);}
  function evaluate(id,p){Object.values(p).forEach(x=>finite(x));switch(id){case 'CM1.1':return incline(p.m,p.g,p.angle);case 'CM1.2':return polar(p.r,p.omega,p.vr,p.ar,p.alpha);case 'CM1.3':return elevator(p.m,p.g,p.a);case 'CM1.4':return rotating(p.omega,p.r,p.vr,p.vphi);default:throw new RangeError('Unknown CM1 lesson.');}}
  return {evaluate,incline,polar,elevator,rotating};

});
