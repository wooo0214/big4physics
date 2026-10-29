/* Quantum numerical primitives and QM1. SI constants; UI lengths are nm.
 * Plot densities explicitly include the coordinate Jacobian. No smoothing,
 * stochastic sampling, or renormalization to a finite display window.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.QM1Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const HBAR=1.054571817e-34,MASS=9.1093837139e-31,EV=1.602176634e-19,NM=1e-9;
  const C={add:(a,b)=>[a[0]+b[0],a[1]+b[1]],sub:(a,b)=>[a[0]-b[0],a[1]-b[1]],mul:(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],scale:(a,s)=>[a[0]*s,a[1]*s],conj:a=>[a[0],-a[1]],abs2:a=>a[0]**2+a[1]**2,exp:t=>[Math.cos(t),Math.sin(t)]};
  C.div=(a,b)=>C.scale(C.mul(a,C.conj(b)),1/C.abs2(b));
  function finite(...v){if(!v.every(Number.isFinite))throw new RangeError('Inputs must be finite.');}
  function positive(...v){finite(...v);if(v.some(x=>x<=0))throw new RangeError('Scale must be positive.');}
  function integrate(fn,a,b,n=800){finite(a,b);if(!Number.isInteger(n)||n<2||n%2)throw new RangeError('Simpson grid must be positive and even.');const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return s*h/3;}
  function state(theta,phase){finite(theta,phase);return [[theta===Math.PI/2?0:Math.cos(theta),0],C.scale(C.exp(phase),theta===0?0:Math.sin(theta))];}
  function well(n,L){positive(L);if(!Number.isInteger(n)||n<1)throw new RangeError('n must be a positive integer.');const length=L*NM;
    const psi=x=>x<0||x>1?0:Math.SQRT2*Math.sin(n*Math.PI*x),density=x=>psi(x)**2;
    return {energyEv:n*n*Math.PI**2*HBAR**2/(2*MASS*length**2*EV),psi,density,norm:integrate(density,0,1),psiSI:x=>psi(x)/Math.sqrt(length),densityNm:x=>density(x)/L};}
  function interval(n,L,a,b){finite(a,b);if(a<0||a>1||b<0||b>1)throw new RangeError('Interval must lie in well.');const lo=Math.min(a,b),hi=Math.max(a,b),w=well(n,L);
    const primitive=x=>x-Math.sin(2*n*Math.PI*x)/(2*n*Math.PI);
    return {...w,lo,hi,probability:primitive(hi)-primitive(lo),numeric:integrate(w.density,lo,hi)};}
  function superposition(theta,delta,chi=0,tau=0){finite(theta,delta,chi,tau);const c=Math.cos(theta),s=Math.sin(theta),phase=delta-tau;
    function amplitude(x){return C.mul(C.exp(chi),C.add([c*Math.SQRT2*Math.sin(Math.PI*x),0],C.scale(C.exp(phase),s*Math.SQRT2*Math.sin(2*Math.PI*x))));}
    const density=x=>C.abs2(amplitude(x)),mixture=x=>2*(c*c*Math.sin(Math.PI*x)**2+s*s*Math.sin(2*Math.PI*x)**2);
    return {amplitude,density,mixture,norm:integrate(density,0,1),p1:c*c,p2:s*s,meanX:.5-32*c*s*Math.cos(phase)/(9*Math.PI**2)};}
  function gaussian(sigma,x0,k0){positive(sigma);finite(x0,k0);const sx=sigma*NM,sp=HBAR/(2*sx);
    const density=x=>Math.exp(-.5*((x-x0)/sigma)**2)/(Math.sqrt(2*Math.PI)*sigma);
    const momentum=k=>Math.exp(-.5*((k-k0)*2*sigma)**2)*2*sigma/Math.sqrt(2*Math.PI);
    return {sigmaX:sx,sigmaP:sp,product:sx*sp/HBAR,density,momentum,missingX:1-integrate(density,x0-3*sigma,x0+3*sigma),missingP:1-integrate(momentum,k0-3/(2*sigma),k0+3/(2*sigma))};}
  return {HBAR,MASS,EV,NM,C,finite,positive,integrate,state,well,interval,superposition,gaussian};
});
