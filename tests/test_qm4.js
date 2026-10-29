const assert=require('node:assert/strict'),Q=require('../assets/js/physics/qm1-physics.js'),P=require('../assets/js/physics/qm4-physics.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
for(const z0 of [.2,1,Math.PI/2,Math.PI/2+1e-4,4,10]){
 const f=P.bound(z0,.5);assert.ok(f.roots.length>=1);assert.equal(f.roots.length,Math.ceil(2*z0/Math.PI-1e-13));
 for(const [i,r] of f.roots.entries()){
  assert.ok(r.energyEv<0&&r.energyEv>-r.depthEv);near(r.residual,0,1e-10);
  // Independent quadrature over inside plus long tails, not the stored norm.
  const end=1+14/r.w,norm=Q.integrate(x=>r.psi(x)**2,-1,1,4000)+2*Q.integrate(x=>r.psi(x)**2,1,end,8000);near(norm,1,1e-10);
  const eps=1e-7;near(r.psi(1-eps),r.psi(1+eps),3e-6);near(r.derivative(1-eps),r.derivative(1+eps),3e-5);near(r.psi(-.3),(i%2?-1:1)*r.psi(.3));
 }
}
assert.equal(P.bound(.2,1,6).clamped,true);
for(const ratio of [.05,.5,1-1e-8,1,1+1e-8,1.5,4]){
 const f=P.step(ratio,1);near(f.R+f.T,1);if(ratio<=1)near(f.T,0);else near(f.T,Math.sqrt((ratio-1)/ratio)*Q.C.abs2(f.t));
 const eps=1e-7;near(Math.hypot(...Q.C.sub(f.psi(-eps),f.psi(eps))),0,2e-6);near(Math.hypot(...Q.C.sub(f.derivative(-eps),f.derivative(eps))),0,2e-6);
}
for(const ratio of [.05,.3,.9,1,1.00001,2,4,8])for(const d of [0,.2,3,12]){
 const f=P.barrier(ratio,d);near(f.R+f.T,1,2e-12);
 // Independent closed transmission formula checks the matched amplitudes.
 const delta=ratio-1,q=Math.sqrt(Math.abs(delta));const expected=delta===0?1/(1+d*d/4):1/(1+(delta>0?Math.sin(q*d)**2:Math.sinh(q*d)**2)/(4*ratio*Math.abs(delta)));
 near(f.T,expected,1e-12);
 for(const x of [-2,d/2,d+2]){near(f.flux(x),f.T,2e-12);const dx=1e-5,derivative=Q.C.scale(Q.C.sub(f.psi(x+dx),f.psi(x-dx)),1/(2*dx));if(x!==0&&x!==d)near(Q.C.mul(Q.C.conj(f.psi(x)),derivative)[1]/f.k,f.T,1e-8);}
 for(const x of [0,d]){const eps=1e-8;near(Math.hypot(...Q.C.sub(f.psi(x-eps),f.psi(x+eps))),0,2e-6);near(Math.hypot(...Q.C.sub(f.derivative(x-eps),f.derivative(x+eps))),0,2e-6);}
}
for(const d of [.5,3,8]){for(const n of [1,2,3])near(P.barrier(1+(n*Math.PI/d)**2,d).T,1,1e-12);near(P.barrier(1-1e-7,d).T,P.barrier(1+1e-7,d).T,1e-5);}
const thick=P.barrier(.4,12);assert.ok(thick.approxError<1e-6);near(P.barrier(.4,0).T,1);assert.ok(Number.isFinite(P.barrier(.5,350).logT));
for(const fn of [()=>P.bound(0,1),()=>P.step(0,1),()=>P.barrier(.5,-1),()=>P.barrier(.5,351)])assert.throws(fn,RangeError);
console.log('PASS QM4: bound roots/threshold/normalization/parity/matching, step velocity factor, independent barrier formula and derivative flux, both-sided thresholds, resonances and thick limits.');
