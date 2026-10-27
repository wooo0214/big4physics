/* Independent physical checks for ED1; no external packages or browser. */
const assert=require('node:assert/strict');
const P=require('../assets/js/physics/physics.js');
const lessons=require('../assets/js/lessons/ed1-lessons.js');
const eps=8.8541878128e-12,mu=1/(eps*299792458**2);
function near(actual,expected,tol=1e-9){assert.ok(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${actual} != ${expected}`);}
// Symmetry, signs and the unsmoothed exclusion mask.
let f=P.chargeSuperposition(3,3,1.2,0,0);
near(f.total.x,0);near(f.total.y,0);
f=P.chargeSuperposition(3,-3,1.2,0,0);assert.ok(f.total.x>0);near(f.total.y,0);
f=P.chargeSuperposition(3,3,1.2,0,.6);near(f.total.x,0);assert.ok(f.total.y>0);
const reversed=P.chargeSuperposition(-3,-3,1.2,0,.6);near(reversed.total.y,-f.total.y);
assert.deepEqual(P.chargeSuperposition(3,3,1.2,.6,0),{valid:false,parts:null,total:null});
near(P.chargeSuperposition(2,0,1,1.5,0).total.x,2e-9/(4*Math.PI*eps*4));
assert.throws(()=>P.chargeSuperposition(1,1,0,0,1),RangeError);
assert.throws(()=>P.chargeSuperposition(1,1,1,NaN,1),RangeError);
// Finite-difference derivatives plus independent surface/line quadrature.
for(const kind of [0,1])for(const a of [-1.3,0,1.7]){
  const R=1.1,h=1e-5,point=[.3,-.4,.7];
  const derivative=(component,axis)=>{
    const plus=point.slice(),minus=point.slice();plus[axis]+=h;minus[axis]-=h;
    return (P.vectorField(kind,a,...plus)[component]-P.vectorField(kind,a,...minus)[component])/(2*h);
  };
  const analytical=P.integralField(kind,a,R);
  near(derivative('x',0)+derivative('y',1)+derivative('z',2),analytical.divergence);
  near(derivative('y',0)-derivative('x',1),analytical.curlZ);
  let flux=0,circulation=0;
  const nt=80,np=160,dt=Math.PI/nt,dp=2*Math.PI/np;
  for(let i=0;i<nt;i++)for(let j=0;j<np;j++){
    const theta=(i+.5)*dt,phi=(j+.5)*dp;
    const n={x:Math.sin(theta)*Math.cos(phi),y:Math.sin(theta)*Math.sin(phi),z:Math.cos(theta)};
    const v=P.vectorField(kind,a,R*n.x,R*n.y,R*n.z);
    flux+=(v.x*n.x+v.y*n.y+v.z*n.z)*R*R*Math.sin(theta)*dt*dp;
  }
  for(let i=0;i<720;i++){
    const theta=(i+.5)*2*Math.PI/720;
    const v=P.vectorField(kind,a,R*Math.cos(theta),R*Math.sin(theta));
    circulation+=(-v.x*R*Math.sin(theta)+v.y*R*Math.cos(theta))*2*Math.PI/720;
  }
  near(flux,analytical.flux,1e-4);near(circulation,analytical.circulation);
}
near(P.integralField(0,1,2).flux/P.integralField(0,1,1).flux,8);
near(P.integralField(1,1,2).circulation/P.integralField(1,1,1).circulation,4);
assert.throws(()=>P.integralField(0,1,0),RangeError);
// Independent boundary equations, including the magnetic cross-product sign.
for(const sigma of [-3,0,2])for(const K of [-2,0,4]){
  const v=P.vacuumInterface(sigma,K,30,1.5);
  near(v.e2.z-v.e1.z,sigma*1e-9/eps);
  near(v.e2.y-v.e1.y,0);near(v.b2.z-v.b1.z,0);
  near(-(v.b2.y-v.b1.y),mu*K,1e-12);
  near(v.b1.z,1.5e-6,1e-12);
  const other=P.vacuumInterface(sigma,K,-100,-3);
  near(v.jumpEn,other.jumpEn);near(v.jumpBy,other.jumpBy,1e-12);
}
assert.equal(lessons.length,3);
assert.deepEqual(lessons.map(l=>l.id),['ED1.1','ED1.3','ED1.4']);
for(const lesson of lessons){
  for(const q of [lesson.prediction,lesson.derive]){
    assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);
    assert.ok(q.explain);
  }
  assert.equal(lesson.courseId,'electro');assert.ok(lesson.modelNote);
}
console.log('PASS ED1: superposition/symmetry/mask, finite-difference derivatives, sphere/circle quadrature, scaling, boundary signs/background invariance, lesson definitions');
