/* Real, piecewise-constant 1D potentials, one electron mass throughout.
 * Bound-well a is the half width. Barrier d=a/ell, ell=hbar/sqrt(2mV0).
 * Scattering amplitudes have unit incident amplitude, not unit L2 norm.
 */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./qm1-physics.js'):root.QM1Physics);if(typeof module==='object'&&module.exports)module.exports=api;root.QM4Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(Q){
  'use strict';const {C,HBAR,MASS,NM,EV}=Q;
  function bound(z0,a,index=0){Q.positive(z0,a);if(!Number.isInteger(index)||index<0)throw new RangeError('Nonnegative level index required.');const roots=[];
    // Monotone phase equation avoids tan/cot poles. A threshold E=0 is excluded.
    for(let n=0;n*Math.PI/2<z0-1e-13;n++){
      let lo=n*Math.PI/2,hi=Math.min(z0,(n+1)*Math.PI/2),target=(n+1)*Math.PI/2;
      for(let j=0;j<90;j++){const mid=(lo+hi)/2;if(mid+Math.asin(mid/z0)<target)lo=mid;else hi=mid;}
      const z=(lo+hi)/2,w=Math.sqrt((z0-z)*(z0+z)),even=n%2===0,boundary=even?Math.cos(z):Math.sin(z),inside=1+(even?1:-1)*Math.sin(2*z)/(2*z),normalization=inside+boundary*boundary/w,scale=1/Math.sqrt(normalization);
      const psi=u=>scale*(Math.abs(u)<=1?(even?Math.cos(z*u):Math.sin(z*u)):(even||u>0?1:-1)*boundary*Math.exp(-w*(Math.abs(u)-1)));
      const derivative=u=>Math.abs(u)<=1?scale*z*(even?-Math.sin(z*u):Math.cos(z*u)):-Math.sign(u)*w*psi(u);
      const energyScale=HBAR**2/(2*MASS*(a*NM)**2*EV),tail=boundary*boundary/(w*normalization),residual=even?z*Math.sin(z)-w*Math.cos(z):z*Math.cos(z)+w*Math.sin(z);
      roots.push({z,w,even,psi,derivative,energyEv:-w*w*energyScale,depthEv:z0*z0*energyScale,tail,residual,norm:1,missing:tail*Math.exp(-6),window:1+3/w});
    }
    const selected=Math.min(index,roots.length-1);return {...roots[selected],roots,selected,requested:index,clamped:index!==selected,a,z0};}
  function step(ratio,V0){Q.positive(ratio,V0);const k=Math.sqrt(ratio),q=ratio>=1?[Math.sqrt(ratio-1),0]:[0,Math.sqrt(1-ratio)],r=C.div(C.sub([k,0],q),C.add([k,0],q)),t=C.div([2*k,0],C.add([k,0],q)),R=C.abs2(r),T=ratio>1?q[0]/k*C.abs2(t):0;
    const psi=x=>x<0?C.add(C.exp(k*x),C.mul(r,C.exp(-k*x))):C.mul(t,ratio>=1?C.exp(q[0]*x):[Math.exp(-q[1]*x),0]);
    const derivative=x=>x<0?C.mul([0,k],C.sub(C.exp(k*x),C.mul(r,C.exp(-k*x)))):C.mul(psi(x),[-q[1],q[0]]);
    return {r,t,R,T,k,q,psi,derivative,lengthNm:HBAR/Math.sqrt(2*MASS*V0*EV)/NM,threshold:ratio===1,residual:R+T-1};}
  function barrier(ratio,d,V0=1){Q.positive(ratio,V0);Q.finite(d);if(d<0||d>350)throw new RangeError('Barrier width d must lie in [0,350].');const k=Math.sqrt(ratio),delta=ratio-1,q=Math.sqrt(Math.abs(delta));
    function back(distance){
      let c,s;if(Math.abs(delta)*distance*distance<1e-10){c=1-delta*distance*distance/2;s=distance-delta*distance**3/6;}
      else if(delta>0){c=Math.cos(q*distance);s=Math.sin(q*distance)/q;}
      else{c=Math.cosh(q*distance);s=Math.sinh(q*distance)/q;}
      return {f:[c,-k*s],g:[delta*s,k*c]};
    }
    const at0=back(d),gOverIK=C.div(at0.g,[0,k]),incoming=C.scale(C.add(at0.f,gOverIK),.5),tBoundary=C.div([1,0],incoming),r=C.div(C.scale(C.sub(at0.f,gOverIK),.5),incoming),T=C.abs2(tBoundary),R=C.abs2(r);
    const psi=x=>x<0?C.add(C.exp(k*x),C.mul(r,C.exp(-k*x))):x>d?C.mul(tBoundary,C.exp(k*(x-d))):C.mul(tBoundary,back(d-x).f);
    const derivative=x=>x<0?C.mul([0,k],C.sub(C.exp(k*x),C.mul(r,C.exp(-k*x)))):x>d?C.mul([0,k],psi(x)):C.mul(tBoundary,back(d-x).g);
    const flux=x=>C.mul(C.conj(psi(x)),derivative(x))[1]/k;
    // Stable log probability is retained even when a tiny net current loses
    // relative precision through incident/reflected cancellation.
    const attenuation=q*d;
    let logT;
    if(delta<0&&attenuation>0){const logSinh=attenuation>20?attenuation-Math.log(2)+Math.log1p(-Math.exp(-2*attenuation)):Math.log(Math.sinh(attenuation));const logA=2*logSinh-Math.log(4*ratio*(1-ratio));logT=logA>0?-logA-Math.log1p(Math.exp(-logA)):-Math.log1p(Math.exp(logA));}
    else logT=Math.log(T);
    const approx=ratio<1?16*ratio*(1-ratio)*Math.exp(-2*q*d):null;
    return {r,tBoundary,T,R,k,q,psi,derivative,flux,logT,approx,approxError:approx===null?null:Math.abs(approx/T-1),phase:q*d,residual:R+T-1,lengthNm:HBAR/Math.sqrt(2*MASS*V0*EV)/NM,threshold:delta===0};}
  return {bound,step,barrier};
});
