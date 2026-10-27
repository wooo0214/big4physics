/* Independent quadrature and time derivatives, signed energy and momentum fluxes. */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ed6-physics.js');
const near=(a,b,rtol=3e-7,atol=1e-16)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=atol+rtol*Math.abs(b),`${a} != ${b}`);
for(const i of [-5,0,2,5])for(const e of [-5,0,2,5]){
 const f=M.wire(i,e);near(f.joule,i*e);near(f.outward,-i*e);near(f.residual,0,0,1e-13);
 near(f.sRadial,-e*f.bPhi/M.MU0);near(f.workDensity,f.j*e);
 // Interior Bphi=mu0 J r/2: cylinder divergence (1/r)d(r Sr)/dr=-J E.
 const radius=.007,h=1e-6,sr=r=>-e*f.j*r/2;
 near(((radius+h)*sr(radius+h)-(radius-h)*sr(radius-h))/(2*h*radius),-f.workDensity,1e-8,1e-9);
}
for(const a of [0,50,100])for(const b of [0,.5,1])for(const d of [0,60,180])for(const t of [0,45,180]){
 const f=M.standing(a,b,d,t,.17);
 near(f.energy,.5*M.EPS0*f.ex**2+.5*f.by**2/M.MU0);
 near(f.s,f.ex*f.by/M.MU0,3e-7,2e-13); // Cancellation near a standing-wave node; scale is <=27 W/m².near(f.residual,0,0,1e-13);
 let u=0,s=0,energy=0;const n=800;
 for(let j=0;j<n;j++){
  const w=M.standing(a,b,d,360*(j+.5)/n,.17);u+=w.energy/n;s+=w.s/n;
  energy+=M.standing(a,b,d,t,M.L*(j+.5)/n).energy*M.L/n;
 }
 near(u,f.meanEnergy);near(s,f.meanS,1e-6,1e-13);near(energy,f.stored,2e-6);
 // Independent centered time derivative of the volume integral (phase -> seconds).
 const h=1e-4,omega=M.C*M.K;
 const rate=(M.standing(a,b,d,t+h*180/Math.PI,.17).stored-M.standing(a,b,d,t-h*180/Math.PI,.17).stored)/(2*h)*omega;
 // Roundoff in the centered difference is amplified by omega/h (SI seconds).
 near(rate,f.storedRate,2e-6,32*Number.EPSILON*M.EPS0*a*a*M.L*omega/h+1e-15);
 near(f.outward,M.standing(a,b,d,t,M.L).s-M.standing(a,b,d,t,0).s,3e-7,2e-13);
 if(b===1)near(f.meanS,0);if(b===0)near(f.s,M.C*f.energy);
}
assert.ok(Math.abs(M.standing(50,1,0,45,.17).s)>0,'Standing wave instantaneous S need not vanish.');
for(const i of [0,1000,2000])for(const mode of [0,1]){
 const f=M.pressure(i,mode);near(f.pressure,(mode+1)*i/M.C);near(f.gIncident*M.C*M.C,i);
 near(f.pressure,-f.tzz);near(f.reflected+f.absorbed,i);
}
for(const i of [0,1000,2000])for(const area of [.01,.1,1])for(const r of [0,.3,1])for(const eta of [0,.5,1])for(const d of [-1,1]){
 const f=M.budget(i,area,r,eta,d);near(f.r+f.a+f.t,1);near(f.residual,0,0,1e-12);
 near(f.input,f.reflected+f.absorbed+f.transmitted);near(f.outward,f.leftOut+f.rightOut);
 near(f.force,d*(f.a+2*f.r)*i*area/M.C);
 near(f.force,area*(f.stressRight-f.stressLeft));
 if(r===1){near(f.absorbed,0);near(f.force,d*2*i*area/M.C);}
 if(r===0&&eta===0){near(f.force,0);near(f.absorbed,0);}
 if(r===0&&eta===1)near(f.force,d*i*area/M.C);
 near(M.budget(i,area,r,eta,-d).force,-f.force);
}
for(const bad of [()=>M.wire(NaN,1),()=>M.standing(1,1.1,0,0,0),()=>M.standing(-1,0,0,0,0),()=>M.pressure(-1,0),()=>M.pressure(1,2),()=>M.budget(1,0,0,0,1),()=>M.budget(1,1,1.1,0,1),()=>M.budget(1,1,0,-1,1),()=>M.budget(1,1,0,0,0)])assert.throws(bad,RangeError);
for(const lesson of require('../assets/js/lessons/ed6-lessons.js'))for(const q of [lesson.prediction,lesson.derive])assert.ok(q.options[q.correct]&&q.explain);
console.log('PASS ED6: wire volume/surface energy and local divergence, standing-wave independent period/volume quadrature and time derivative, outward normals, vacuum stress/momentum, absorber/mirror/transparent/zero limits and direction reversal.');
