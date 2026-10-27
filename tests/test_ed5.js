/* Independent boundary, derivative and limiting-case checks. SI; deterministic. */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ed5-physics.js');
const near=(a,b,rtol=2e-7,atol=1e-16)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=atol+rtol*Math.abs(b),`${a} != ${b}`);
for(const flux of [-5,0,2,5])for(const current of [-5,0,2,5]){
 const f=M.induction(flux,current);
 near(2*Math.PI*.5*f.ePhi,-flux*1e-3);near(f.displacement,current*1e-3);
 near(f.eDot*M.EPS0*Math.PI*.5**2,current*1e-3);
 near(2*Math.PI*.6*f.bPhi,M.MU0*current*1e-3);
}
for(const amplitude of [0,50,100])for(const k of [.5,2,6])for(const d of [-1,1])for(const t of [0,60,180]){
 const f=M.wave(amplitude,k,d,t,.7);
 near(f.omega,M.C*k);near(f.wavelength*k,2*Math.PI);near(f.by,d*f.ex/M.C);
 near(f.s,d*M.C*f.energy);near(f.meanS,d*M.EPS0*M.C*amplitude**2/2);
 // Finite differences in z and omega*t independently check both curl equations.
 const h=1e-4,z=.7,tRad=t*Math.PI/180;
 const w=(x,q)=>M.wave(amplitude,k,d,q*180/Math.PI,x);
 const dzE=(w(z+h,tRad).ex-w(z-h,tRad).ex)/(2*h);
 const dtB=(w(z,tRad+h).by-w(z,tRad-h).by)/(2*h)*f.omega;
 const dzB=(w(z+h,tRad).by-w(z-h,tRad).by)/(2*h);
 const dtE=(w(z,tRad+h).ex-w(z,tRad-h).ex)/(2*h)*f.omega;
 near(dzE,-dtB,1e-6,1e-9);near(-dzB,M.MU0*M.EPS0*dtE,1e-6,1e-15);
}
const plus=(a,b)=>({re:a.re+b.re,im:a.im+b.im}),times=(a,b)=>({re:a.re*b.re-a.im*b.im,im:a.re*b.im+a.im*b.re});
const scale=(a,s)=>({re:a.re*s,im:a.im*s});
const cn=(a,b)=>{near(a.re,b.re,2e-8,1e-12);near(a.im,b.im,2e-8,1e-12);};
for(const e1 of [1,2,4])for(const m1 of [1,2])for(const e2 of [1,3,4])for(const m2 of [1,2])for(const a of [0,30,60,75])for(const pol of [0,1]){
 const f=M.interfaceWave(e1,m1,e2,m2,a,pol),one={re:1,im:0};
 near(f.reflectance+f.transmittance,1,2e-8,1e-12);
 assert.ok(f.reflectance>=0&&f.reflectance<=1+1e-12&&f.transmittance>=0);
 // Independently match the tangential electric and magnetic complex fields.
 if(pol===0){cn(plus(one,f.r),f.t);cn(scale(plus(one,scale(f.r,-1)),f.ci/f.z1),scale(times(f.ct,f.t),1/f.z2));}
 else{cn(scale(plus(one,f.r),f.ci),times(f.ct,f.t));cn(scale(plus(one,scale(f.r,-1)),1/f.z1),scale(f.t,1/f.z2));}
 if(a===0){near(f.r.re,(f.z2-f.z1)/(f.z2+f.z1));near(f.t.re,1+f.r.re);}
 if(e1===e2&&m1===m2){near(f.reflectance,0,0,1e-25);near(f.transmittance,1);}
 if(f.ct.im>0){near(f.reflectance,1);near(f.transmittance,0);assert.equal(f.transmittedAngle,null);}
}
// Nonmagnetic Brewster incidence in this common-tangential reflected p basis.
near(M.interfaceWave(1,1,4,1,Math.atan(2)*180/Math.PI,1).reflectance,0,0,1e-25);
for(const pol of [0,1]){const f=M.interfaceWave(4,1,1,1,30,pol);near(f.reflectance+f.transmittance,1);}
// Polarization is evaluated at fixed position, rather than confusing phase with space.
for(let t=0;t<360;t+=15){const f=M.polarization(90,1,t);near(f.s*f.s+f.p*f.p,1);cn({re:M.polarization(0,1,t).s,im:0},{re:M.polarization(0,1,t).p,im:0});}
for(const n of [1e6,1e7,1e8])for(const r of [.2,.9,1,1.1,1.5,3]){
 const f=M.plasma(n,r);near(f.omega,r*f.wp);near(f.epsilonR,1-1/r**2);
 near(f.wp**2,n*1.602176634e-19**2/(9.1093837139e-31*M.EPS0));
 near(f.omega**2-f.wp**2,M.C**2*(f.k**2-f.kappa**2),1e-7,1e-3);
 near(M.plasma(4*n,r).wp,2*f.wp);
 if(r>1){assert.ok(f.vp>M.C&&f.vg<M.C&&f.vg>0);near(f.vp*f.vg,M.C**2);
  const dk=f.k*1e-5,omega=k=>Math.sqrt(f.wp**2+M.C**2*k*k);near((omega(f.k+dk)-omega(f.k-dk))/(2*dk),f.vg,1e-6,.01);
 }else if(r<1){assert.equal(f.vp,null);assert.equal(f.vg,null);near(f.skin*f.kappa,1);}
 else{assert.equal(f.vp,null);near(f.vg,0);near(f.k,0);}
}
for(const invalid of [()=>M.induction(NaN,1),()=>M.wave(1,0,1,0,0),()=>M.wave(1,1,0,0,0),()=>M.interfaceWave(0,1,1,1,0,0),()=>M.interfaceWave(1,1,1,1,90,0),()=>M.interfaceWave(1,1,1,1,0,2),()=>M.plasma(0,1),()=>M.plasma(1,0)])assert.throws(invalid,RangeError);
for(const lesson of require('../assets/js/lessons/ed5-lessons.js'))for(const q of [lesson.prediction,lesson.derive])assert.ok(q.options[q.correct]&&q.explain);
console.log('PASS ED5: Faraday sign, capacitor surface equivalence, wave curl finite differences, complex s/p E/H matching, energy flux, Brewster/critical/TIR limits, polarization, plasma dispersion/derivative/cutoff/evanescence and invalid inputs.');
