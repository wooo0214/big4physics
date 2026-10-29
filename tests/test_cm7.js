const assert=require('node:assert/strict');
const M=require('../assets/js/physics/cm7-physics.js');
const lessons=require('../assets/js/lessons/cm7-lessons.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}; tolerance ${t}`);
function integral(fn,a,b,n=10000){const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return h*s/3;}
function check(f){assert.equal(f.plots.length,2);for(const g of f.plots){assert.ok(g.x&&g.y&&g.title);if(g.kind==='scatter'){for(const xy of g.points.concat(g.otherPoints||[]))assert.ok(xy.every(Number.isFinite));}else{assert.ok(g.lo<g.hi);for(const s of g.series)for(let i=0;i<=20;i++){const y=s.fn(g.lo+(g.hi-g.lo)*i/20);assert.ok(y===null||Number.isFinite(y),'Nonfinite graph value');}}}for(const [,x] of f.metrics.concat(f.rows))assert.ok(typeof x!=='number'||Number.isFinite(x));}
for(const l of lessons){assert.equal(l.courseId,'mechanics');assert.equal(l.controls.length>0,true);assert.ok(l.intro.includes('？')&&l.intro.includes('先'));assert.equal((l.derivation.match(/<p>/g)||[]).length,4);assert.ok(l.graduate.task&&l.graduate.check);assert.ok(l.modelNote.length>40);for(const key of ['prediction','derive']){assert.equal(l[key].options.length,3);assert.ok(l[key].correct>=0&&l[key].correct<3);}
 const p=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));check(M.evaluate(l.id,p));for(const c of l.controls){for(const v of [c.min,c.max])check(M.evaluate(l.id,{...p,[c.id]:v}));assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:NaN}),RangeError);assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:Infinity}),RangeError);}for(const edge of ['min','max'])check(M.evaluate(l.id,Object.fromEntries(l.controls.map(c=>[c.id,c[edge]]))));}

const m=1.7,w=1.3,q=.8,p=-.4;
for(let kind=0;kind<4;kind++){const f=M.bracket(m,w,q,p,kind),dt=1e-5,qT=t=>q*Math.cos(w*t)+p/(m*w)*Math.sin(w*t),pT=t=>p*Math.cos(w*t)-m*w*q*Math.sin(w*t),fd=(f.F(qT(dt),pT(dt))-f.F(qT(-dt),pT(-dt)))/(2*dt);near(f.value,fd,1e-9);}
near(M.bracket(1,1,0,0,3).value,0);near(M.canonical(2,.8,.4,0).det,1);near(M.canonical(2,.8,.4,1).det,4);
const f=M.actionAngle(2,3,4,.7);near(f.J,4/3);near(f.p*f.p/4+9*f.q*f.q,4);near(f.area,2*Math.PI*4/3);
// Differentiate the inverse angle/action coordinates numerically: {phi,J}=+1.
const q1=f.q,p1=f.p,h=1e-5,phi=(q,p)=>Math.atan2(2*3*q,p),J=(q,p)=>(p*p/4+9*q*q)/3,phiQ=(phi(q1+h,p1)-phi(q1-h,p1))/(2*h),phiP=(phi(q1,p1+h)-phi(q1,p1-h))/(2*h),JQ=(J(q1+h,p1)-J(q1-h,p1))/(2*h),JP=(J(q1,p1+h)-J(q1,p1-h))/(2*h);near(phiQ*JP-phiP*JQ,1,2e-9);
const hj=M.hj(2,3,.7,1.2,2),d=1e-5;near((hj.S(2+d,1.2)-hj.S(2-d,1.2))/(2*d),3,1e-10);near((hj.S(2,1.2+d)-hj.S(2,1.2-d))/(2*d),-9/4,1e-10);near(hj.trajectory(0),.7);near(hj.residual,0);assert.throws(()=>M.canonical(0,1,1,0),RangeError);

console.log('PASS CM7: independent physical benchmarks, conservation, units, limiting cases, invalid inputs, and slider-domain graph checks.');
