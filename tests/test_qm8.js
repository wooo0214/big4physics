const assert=require('node:assert/strict'),P=require('../assets/js/physics/qm8-physics.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b} (tol ${t})`);
for(const gap of [.1,1,3])for(const g of [-1,-.1,0,1e-10,.02,1]){const f=P.perturb(g,gap);near(f.exact*(f.exact-gap),g*g,1e-10);near(P.perturb(-g,gap).exact,f.exact);if(g===0)assert.equal(f.relative,null);}
const errors=[.01,.02].map(g=>P.perturb(g,1).absolute);near(errors[1]/errors[0],16,.03);
for(const a of [-1,0,.3])for(const b of [0,.4,1])for(const beta of [0,.7,2])for(const coupling of [0,.5,1]){
 const f=P.degenerate(a,b,beta,.5,2,coupling);near(f.rotated[0][0]+f.rotated[1][1],0);near(f.rotated[0][0]*f.rotated[1][1]-f.rotated[0][1]*f.rotated[1][0],-a*a-b*b);
 for(const e of f.reference){near(e.vector.reduce((s,v)=>s+v*v,0),1);for(let i=0;i<3;i++)near(f.full[i].reduce((s,v,j)=>s+v*e.vector[j],0),e.value*e.vector[i],1e-10);}
 if(coupling===0)near(f.error,0);if(a===0&&b===0)assert.equal(f.goodAngle,null);
}
for(const width of [.25,1/Math.SQRT2,1,2])for(const depth of [0,.1,1,4]){const f=P.variational(width,depth,.2);assert.ok(f.energy>=.5-1e-14);near(f.numericAction,Math.PI*depth,1e-11);near(f.exponent/f.transmission-1,f.exponent,1e-12);assert.ok(f.transmission<=.5);}
near(P.variational(1/Math.SQRT2,0,0).energy,.5);near(P.variational(1,0,0).transmission,.5);assert.equal(P.variational(1,1,Math.sqrt(2)).adiabatic,null);
for(const g of [0,.05,.5])for(const time of [0,1,8,20]){
 const f=P.transition(g,0,time),frequency=Math.sqrt(1+4*g*g),exact=4*g*g/(1+4*g*g)*Math.sin(frequency*time/2)**2;near(f.numeric,exact,3e-9);near(f.norm,1,3e-9);assert.ok(f.residual<3e-9);
 const forbidden=P.transition(g,1,time,0);near(forbidden.first,0);near(forbidden.numeric,0);
}
for(const [g,nu,time] of [[.05,1,8],[.3,.7,17],[.5,2.5,20]]){const a=P.transition(g,nu,time,1,1600),b=P.transition(g,nu,time,1,3200);near(a.numeric,b.numeric,2e-8);assert.ok(b.residual<3e-9);assert.ok(a.numeric>=0&&a.numeric<=1+1e-9);}
// Independent Simpson quadrature of the original finite-time integral.
const Q=require('../assets/js/physics/qm1-physics.js');
for(const nu of [0,1-1e-9,1,1+1e-9,2.5]){const g=.03,t=8,f=P.transition(g,nu,t),re=Q.integrate(x=>g*Math.cos(nu*x)*Math.sin(x),0,t,8000),im=Q.integrate(x=>-g*Math.cos(nu*x)*Math.cos(x),0,t,8000);near(f.amplitude[0],re,1e-12);near(f.amplitude[1],im,1e-12);}
assert.ok(P.transition(.5,1,20).first>1);assert.equal(P.transition(.5,1,20).reliable,false);
for(const fn of [()=>P.perturb(1,0),()=>P.variational(0,1,0),()=>P.transition(.6,1,1),()=>P.transition(.1,1,-1)])assert.throws(fn,RangeError);
console.log('PASS QM8: stable perturbation roots/4th-order errors, independent 3x3 eigen residuals, basis invariance, variational bound, WKB action/exact barrier top, full-cosine RK4/exact DC/step refinement, quadrature resonance and unclipped breakdown.');
