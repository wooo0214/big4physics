const assert=require('node:assert/strict');
const M=require('../assets/js/physics/cm1-physics.js');
const lessons=require('../assets/js/lessons/cm1-lessons.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}; tolerance ${t}`);
function integral(fn,a,b,n=10000){const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return h*s/3;}
function check(f){assert.equal(f.plots.length,2);for(const g of f.plots){assert.ok(g.x&&g.y&&g.title);if(g.kind==='scatter'){for(const xy of g.points.concat(g.otherPoints||[]))assert.ok(xy.every(Number.isFinite));}else{assert.ok(g.lo<g.hi);for(const s of g.series)for(let i=0;i<=20;i++){const y=s.fn(g.lo+(g.hi-g.lo)*i/20);assert.ok(y===null||Number.isFinite(y),'Nonfinite graph value');}}}for(const [,x] of f.metrics.concat(f.rows))assert.ok(typeof x!=='number'||Number.isFinite(x));}
for(const l of lessons){assert.equal(l.courseId,'mechanics');assert.equal(l.controls.length>0,true);assert.ok(l.intro.includes('？')&&l.intro.includes('先'));assert.equal((l.derivation.match(/<p>/g)||[]).length,4);assert.ok(l.graduate.task&&l.graduate.check);assert.ok(l.modelNote.length>40);for(const key of ['prediction','derive']){assert.equal(l[key].options.length,3);assert.ok(l[key].correct>=0&&l[key].correct<3);}
 const p=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));check(M.evaluate(l.id,p));for(const c of l.controls){for(const v of [c.min,c.max])check(M.evaluate(l.id,{...p,[c.id]:v}));assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:NaN}),RangeError);assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:Infinity}),RangeError);}for(const edge of ['min','max'])check(M.evaluate(l.id,Object.fromEntries(l.controls.map(c=>[c.id,c[edge]]))));}

near(M.incline(2,9.8,30).acceleration,4.9);near(M.incline(2,9.8,0).normal,19.6);near(M.incline(5,9.8,30).acceleration,M.incline(1,9.8,30).acceleration);
// Cartesian second differences are independent of the polar expression.
for(const omega of [-2,0,1.3]){const r=1.4,vr=.8,ar=-.3,alpha=.7,h=1e-4,xy=t=>{const R=r+vr*t+ar*t*t/2,phi=omega*t+alpha*t*t/2;return [R*Math.cos(phi),R*Math.sin(phi)];},a=xy(-h),b=xy(0),c=xy(h),f=M.polar(r,omega,vr,ar,alpha);near(f.radial,(c[0]-2*b[0]+a[0])/(h*h),2e-7);near(f.tangent,(c[1]-2*b[1]+a[1])/(h*h),2e-7);}
near(M.elevator(60,9.8,0).normal,588);near(M.elevator(60,9.8,-9.8).normal,0);assert.equal(M.elevator(60,9.8,-10).normal,null);
const r=M.rotating(2,3,4,-1),s=M.rotating(-2,3,4,-1);near(r.centrifugal,12);near(r.coriolisR,-4);near(r.coriolisPhi,-16);near(r.centrifugal,s.centrifugal);near(r.coriolisR,-s.coriolisR);
assert.throws(()=>M.polar(0,1,0,0,0),RangeError);assert.throws(()=>M.incline(-1,9.8,30),RangeError);

console.log('PASS CM1: independent physical benchmarks, conservation, units, limiting cases, invalid inputs, and slider-domain graph checks.');
