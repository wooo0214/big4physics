/* SI, exp[i(k.r-omega t)]. Deterministic analytic teaching models; no smoothing.
 * Fresnel p basis has the same positive tangential E for incident/reflected rays.
 * This makes r_p at normal incidence equal to r_s; some textbooks reverse that basis.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ED5Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EPS0=8.8541878128e-12,C=299792458,MU0=1/(EPS0*C*C),E=1.602176634e-19,ME=9.1093837139e-31,Z0=MU0*C;
  const finite=(...v)=>{if(!v.every(Number.isFinite))throw new RangeError('Finite inputs required.');};
  function induction(fluxMilli,currentMilli){
    finite(fluxMilli,currentMilli);
    const radius=.5,area=Math.PI*radius**2,current=currentMilli*1e-3,fluxDot=fluxMilli*1e-3;
    // Two separate setups: fixed Faraday loop, and quasi-static ideal capacitor.
    const emf=-fluxDot,ePhi=emf/(2*Math.PI*radius),eDot=current/(EPS0*area),sampleRadius=.6;
    return {radius,area,current,fluxDot,emf,ePhi,eDot,displacement:EPS0*area*eDot,
      bPhi:MU0*current/(2*Math.PI*sampleRadius),sampleRadius};
  }
  function wave(amplitude,k,direction,phaseDeg,z){
    finite(amplitude,k,direction,phaseDeg,z);
    if(amplitude<0||k<=0||![-1,1].includes(direction))throw new RangeError('A>=0, k>0, direction=+/-1 required.');
    const omega=C*k,phase=direction*k*z-phaseDeg*Math.PI/180,ex=amplitude*Math.cos(phase),by=direction*ex/C;
    return {omega,frequency:omega/(2*Math.PI),wavelength:2*Math.PI/k,ex,by,s:ex*by/MU0,
      energy:EPS0*ex**2,meanS:direction*EPS0*C*amplitude**2/2};
  }
  // Minimal complex arithmetic retains evanescent phase in total internal reflection.
  const add=(a,b)=>({re:a.re+b.re,im:a.im+b.im});
  const scale=(a,s)=>({re:a.re*s,im:a.im*s});
  const div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return {re:(a.re*b.re+a.im*b.im)/d,im:(a.im*b.re-a.re*b.im)/d};};
  const abs2=a=>a.re*a.re+a.im*a.im;
  function interfaceWave(e1,m1,e2,m2,angleDeg,polarization){
    finite(e1,m1,e2,m2,angleDeg,polarization);
    if(Math.min(e1,m1,e2,m2)<=0||angleDeg<0||angleDeg>=90||![0,1].includes(polarization))throw new RangeError('Positive media, 0<=theta<90, s(0)/p(1) required.');
    const z1=Z0*Math.sqrt(m1/e1),z2=Z0*Math.sqrt(m2/e2),n1=Math.sqrt(e1*m1),n2=Math.sqrt(e2*m2);
    const ci=Math.cos(angleDeg*Math.PI/180),st=n1/n2*Math.sin(angleDeg*Math.PI/180),q=1-st*st;
    const ct=q>=0?{re:Math.sqrt(q),im:0}:{re:0,im:Math.sqrt(-q)};
    const a=polarization===0?{re:z2*ci,im:0}:scale(ct,z2);
    const b=polarization===0?scale(ct,z1):{re:z1*ci,im:0};
    const denominator=add(a,b),r=div(add(a,scale(b,-1)),denominator);
    const t=div({re:2*z2*ci,im:0},denominator);
    const reflectance=abs2(r),transmittance=q<=0?0:z1/z2*ct.re/ci*abs2(t);
    return {z1,z2,n1,n2,ci,ct,r,t,reflectance,transmittance,residual:reflectance+transmittance-1,
      state:q<0?'全反射：透射侧为倏逝场':q===0?'临界角：法向透射能流为零':'传播',
      transmittedAngle:q>=0?Math.asin(Math.min(1,st))*180/Math.PI:null};
  }
  function polarization(phaseDeg,ratio,timeDeg){
    finite(phaseDeg,ratio,timeDeg);if(ratio<0)throw new RangeError('Nonnegative component ratio required.');
    const t=timeDeg*Math.PI/180;
    // Incident field only, fixed z: E_s/E0=cos(omega t), E_p/E0=a cos(delta-omega t).
    return {s:Math.cos(t),p:ratio*Math.cos(phaseDeg*Math.PI/180-t)};
  }
  function plasma(density,ratio){
    finite(density,ratio);if(density<=0||ratio<=0)throw new RangeError('Positive density and omega/omega_p required.');
    const wp=Math.sqrt(density*E*E/(ME*EPS0)),omega=ratio*wp;
    if(ratio<1){const kappa=wp/C*Math.sqrt(1-ratio*ratio);return {wp,omega,frequency:omega/(2*Math.PI),k:0,kappa,skin:1/kappa,vp:null,vg:null,state:'倏逝',epsilonR:1-1/ratio**2};}
    if(ratio===1)return {wp,omega,frequency:omega/(2*Math.PI),k:0,kappa:0,skin:null,vp:null,vg:0,state:'截止',epsilonR:0};
    const k=wp/C*Math.sqrt(ratio*ratio-1);
    return {wp,omega,frequency:omega/(2*Math.PI),k,kappa:0,skin:null,vp:omega/k,vg:C*C*k/omega,state:'传播',epsilonR:1-1/ratio**2};
  }
  return {EPS0,C,MU0,Z0,induction,wave,interfaceWave,polarization,plasma};
});
