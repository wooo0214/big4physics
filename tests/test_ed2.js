/* Deterministic SI checks; no real user data, randomness or browser access.
 * Relative tolerances use an absolute floor only where cancellation demands it.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ed2-physics.js');
const lessons=require('../assets/js/lessons/ed2-lessons.js');
const k=1/(4*Math.PI*8.8541878128e-12);
function near(a,b,rtol=1e-8,atol=1e-10){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=atol+rtol*Math.abs(b),`${a} != ${b}`);}
function simpson(fn,lo,hi,n=2000){let sum=0;for(let i=0;i<=n;i++)sum+=(i===0||i===n?1:i%2?4:2)*fn(lo+(hi-lo)*i/n);return sum*(hi-lo)/(3*n);}
const h=1e-5;
for(const q of [-5,0,3])for(const sourceX of [-.5,.2,.5]){
  const a=M.paths(q,sourceX,1.8,0),b=M.paths(q,sourceX,1.8,25);
  near(-a.direct,a.delta,1e-7);near(-a.bent,a.delta,1e-7);
  near(a.delta,b.delta);near(a.direct,b.direct);near(b.a-a.a,25);
  const f=M.point(q,sourceX,0,.7,1.2);
  near(-(M.point(q,sourceX,0,.7+h,1.2).potential-M.point(q,sourceX,0,.7-h,1.2).potential)/(2*h),f.ex);
  near(-(M.point(q,sourceX,0,.7,1.2+h).potential-M.point(q,sourceX,0,.7,1.2-h).potential)/(2*h),f.ez);
}
near(M.point(1,0,0,1,0).potential,k*1e-9);near(M.point(1,0,0,2,0).ex,k*1e-9/4);
assert.equal(M.point(1,0,0,0,0).potential,null);
assert.equal(M.lineIntegral(1,0,[[-1,0],[1,0]]),null);
// Segment crosses the source between Simpson nodes: exclusion still applies.
assert.equal(M.lineIntegral(1,.123,[[-1,0],[1,0]],2),null);
for(const q of [-4,0,3])for(const a of [.3,.8,1.5]){
  const summary=M.imageSummary(q,a);
  for(const x of [-10,-1,0,.5,2,10]){const edge=M.image(q,a,x,0);near(edge.potential,0);near(edge.ex,0);}
  near(summary.forceZ,q*1e-9*M.point(-q,0,-a,0,a).ez,1e-9,1e-20);
  near(summary.energy,.5*q*1e-9*summary.inducedPotential,1e-9,1e-20);
  near(-(M.imageSummary(q,a+h).energy-M.imageSummary(q,a-h).energy)/(2*h),summary.forceZ,1e-8,1e-19);
  near(M.imageSummary(q,2*a).forceZ,summary.forceZ/4,1e-9,1e-20);
  near(M.imageSummary(-q,a).forceZ,summary.forceZ,1e-9,1e-20);
  // Integrate sigma=epsilon0 Ez(0+) over an axisymmetric disk R=100a.
  // Analytical finite-disk total tends to -q as R -> infinity.
  const eps=8.8541878128e-12,R=100*a;
  const induced=simpson(r=>eps*M.image(q,a,r,0).ez*2*Math.PI*r,0,R,12000);
  near(induced,-q*1e-9*(1-a/Math.hypot(a,R)),1e-7,1e-17);
}
for(const shape of [0,1])for(const voltage of [-60,0,100]){
  let previous=Infinity;
  for(const n of [1,3,5,9,20]){
    const error=M.boundaryError(voltage,shape,n);assert.ok(error.rms<=previous+1e-10);previous=error.rms;
    const f=M.rectangle(voltage,shape,n,.7,.8),hh=1e-4;
    const phi=(x,y)=>M.rectangle(voltage,shape,n,x,y).potential;
    near(-(phi(.7+h,.8)-phi(.7-h,.8))/(2*h),f.ex,1e-7);
    near(-(phi(.7,.8+h)-phi(.7,.8-h))/(2*h),f.ey,1e-7);
    near((phi(.7+hh,.8)+phi(.7-hh,.8)+phi(.7,.8+hh)+phi(.7,.8-hh)-4*phi(.7,.8))/hh**2,0,0,2e-5);
    for(const t of [0,.2,.5,.9,1]){
      near(phi(0,t*M.H),0);near(phi(M.L,t*M.H),0);near(phi(t*M.L,0),0);
    }
  }
  if(shape===0)near(M.boundaryError(voltage,shape,1).rms,0);
  // Independently project the triangular / sine top boundary numerically.
  for(const n of [1,2,3,5]){
    const coefficient=2/M.L*simpson(x=>M.topBoundary(voltage,shape,x)*Math.sin(n*Math.PI*x/M.L),0,M.L);
    const expected=shape===0?(n===1?voltage:0):8*voltage*Math.sin(n*Math.PI/2)/(n*Math.PI)**2;
    near(coefficient,expected,1e-8);
  }
}
for(const kind of [0,1,2])for(const q of [-3,0,2]){
  const f=M.multipole(q,1,3,40,kind),scaled=M.multipole(q,2,3,40,kind);
  near(scaled.exact,f.exact/2);near(scaled.approx,f.approx/2);
  if(q!==0){
    const far=M.multipole(q,1,8,40,kind);assert.ok(far.relativeError<f.relativeError);
    const far2=M.multipole(q,1,16,40,kind);near(far.exact/far2.exact,kind===1?2:4,.003);
  }
  if(kind===2)near(f.exact,M.image(q,.5,f.x,f.z).potential);
}
assert.equal(M.multipole(3,1,3,90,0).relativeError,null);
assert.equal(M.multipole(0,1,3,40,1).relativeError,null);
near(M.multipole(3,1,3,90,2).exact,0);
near(M.multipole(2,1,3,0,1).approx,2*k*2e-9/3);
near(M.multipole(2,1,3,0,0).approx,k*2e-9/9);
for(const invalid of [()=>M.point(NaN,0,0,1,1),()=>M.image(1,0,1,1),()=>M.image(1,1,0,-1),()=>M.rectangle(1,0,0,1,1),()=>M.rectangle(1,0,3,-1,1),()=>M.rectangle(1,4,3,1,1),()=>M.multipole(1,1,.5,0,0),()=>M.multipole(1,1,2,91,2),()=>M.paths(1,0,Infinity,0)])assert.throws(invalid,RangeError);
assert.deepEqual(lessons.map(l=>l.id),['ED2.1','ED2.2','ED2.3','ED2.4']);
for(const lesson of lessons)for(const question of [lesson.prediction,lesson.derive]){assert.ok(Number.isInteger(question.correct));assert.ok(question.options[question.correct]);assert.ok(question.explain);}
console.log('PASS ED2: independent path integration, gradient/sign/gauge, source masks, image boundary/force/energy/induced charge, rectangle projection/Laplace/gradient/residuals, multipole scaling/nodes/Green kernel, invalid inputs.');
