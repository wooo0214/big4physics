/* Deterministic SI checks: independent derivatives, angular and current integrals. */
const assert=require('node:assert/strict'),M=require('../assets/js/physics/ed7-physics.js');
const near=(a,b,rtol=2e-6,atol=1e-18)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=atol+rtol*Math.abs(b),`${a} != ${b}`);
for(const width of [2,6,10]){
 near(M.pulse(width/2,width).value,1);near(M.pulse(-1,width).value,0);near(M.pulse(width+1,width).value,0);
 for(const t of [.13,.4,.77].map(x=>x*width)){
  const h=width*1e-5,derivative=(M.pulse(t+h,width).value-M.pulse(t-h,width).value)/(2*h*1e-9);
  near(derivative,M.pulse(t,width).derivative,2e-7,1e-3);
 }
 for(const r of [.3,3,6]){
  const delay=r/M.C*1e9;
  near(M.retarded(r,delay+width/2,width).delayed,1);
  const before=M.retarded(r,delay-.1,width);near(before.phi,0);near(before.az,0);
  near(M.retarded(r+1,delay,width).delay-delay,1/M.C*1e9);
  // Differentiate A_z in Cartesian z and phi in time: Lorenz gauge in SI.
  const x=r*Math.sin(Math.PI/3),z=r*.5,time=delay+width*.37,h=r*1e-5,dt=width*1e-5;
  function at(zz,t){const rr=Math.hypot(x,zz);return M.retarded(rr,t,width,Math.acos(zz/rr)*180/Math.PI);}
  const divA=(at(z+h,time).az-at(z-h,time).az)/(2*h);
  const dtPhi=(at(z,time+dt).phi-at(z,time-dt).phi)/(2*dt*1e-9);
  near(divA,-dtPhi/M.C**2,3e-6,1e-20);
 }
}
// Fields reconstructed from harmonic Lorenz potentials, independent of zones().
const cmul=(a,b)=>({re:a.re*b.re-a.im*b.im,im:a.re*b.im+a.im*b.re});
const sub=(a,b)=>({re:a.re-b.re,im:a.im-b.im});
const scale=(a,s)=>({re:a.re*s,im:a.im*s});
for(const logR of [-2,-1,0,1.3]){
 const f=M.zones(logR),r=f.radius,k=f.k,p=f.p0,h=r*1e-5;
 const phase=rr=>({re:Math.cos(k*rr),im:Math.sin(k*rr)});
 function az(xx){return cmul({re:0,im:-M.MU0*f.omega*p/(4*Math.PI*xx)},phase(xx));}
 function phi(zz){const rr=Math.hypot(r,zz);return cmul({re:M.K*p*zz/rr**3,im:-M.K*p*k*zz/rr**2},phase(rr));}
 const ez=sub(cmul({re:0,im:f.omega},az(r)),scale(sub(phi(h),phi(-h)),1/(2*h)));
 const by=scale(sub(az(r+h),az(r-h)),-1/(2*h));
 const et=cmul(f.et,phase(r)),cb=cmul(f.cb,phase(r));
 near(-ez.re,et.re,1e-5,1e-12);near(-ez.im,et.im,1e-5,1e-12);
 near(M.C*by.re,cb.re,1e-5,1e-12);near(M.C*by.im,cb.im,1e-5,1e-12);
 near(f.meanS,f.radiationS,2e-9);near(f.power,f.expectedPower,2e-9);
}
for(const p of [0,1,5])for(const freq of [10,100,200]){
 const f=M.dipole(p,freq,90);let power=0;const n=3000;
 for(let j=0;j<n;j++){const theta=Math.PI*(j+.5)/n;power+=M.dipole(p,freq,theta*180/Math.PI).dPower*2*Math.PI*Math.sin(theta)*Math.PI/n;}
 near(power,f.power,1e-6);near(f.larmorPeak/2,f.power);near(f.intensity*f.radius**2,f.dPower);
 near(M.dipole(p,2*freq,90).power,16*f.power);near(M.dipole(2*p,freq,90).power,4*f.power);
 near(M.dipole(p,freq,0).dPower,0);near(M.dipole(p,freq,180).dPower,0);assert.ok(f.speedRatio<.022);
}
for(const ratio of [.01,.03,.05,.06,.5])for(const tilt of [0,30,180])for(const observer of [0,45,90,180]){
 const f=M.antenna(ratio,tilt,observer),psi=(observer-tilt)*Math.PI/180;
 let re=0,im=0;const n=1200;
 // Independent uniform line-current far-zone phase integral, normalized by length.
 for(let j=0;j<n;j++){const z=ratio*((j+.5)/n-.5),a=-2*Math.PI*z*Math.cos(psi);re+=Math.cos(a)/n;im+=Math.sin(a)/n;}
 near(f.finitePattern,Math.sin(psi)**2*(re*re+im*im),2e-6);
 near(f.fieldPattern**2,f.powerPattern);near(f.p0*2*Math.PI*1e8,f.length);
 if(ratio<=.05){near(f.resistance,2*Math.PI*M.Z0/3*ratio**2);near(f.power,.5*f.resistance);near(f.power,M.dipole(f.p0/1e-12,100,90).power);}
 else{assert.equal(f.resistance,null);assert.equal(f.power,null);}
}
for(const bad of [()=>M.pulse(1,0),()=>M.retarded(0,1,1),()=>M.retarded(1,NaN,1),()=>M.zones(-4),()=>M.dipole(-1,100,0),()=>M.dipole(1,0,0),()=>M.dipole(1,100,181),()=>M.antenna(0,0,0),()=>M.antenna(.6,0,0)])assert.throws(bad,RangeError);
for(const l of require('../assets/js/lessons/ed7-lessons.js'))for(const q of [l.prediction,l.derive])assert.ok(q.options[q.correct]&&q.explain);
console.log('PASS ED7: compact-pulse delay and Lorenz-gauge finite differences, harmonic potentials -> near/induction/radiation fields, full complex energy flux, angular power quadrature, omega/p scaling, Larmor average, finite line-current phase integral and short-element limits.');
