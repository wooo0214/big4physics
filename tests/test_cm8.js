const assert=require('node:assert/strict');
const M=require('../assets/js/physics/cm8-physics.js');
const lessons=require('../assets/js/lessons/cm8-lessons.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}; tolerance ${t}`);
function integral(fn,a,b,n=10000){const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return h*s/3;}
function check(f){assert.equal(f.plots.length,2);for(const g of f.plots){assert.ok(g.x&&g.y&&g.title);if(g.kind==='scatter'){for(const xy of g.points.concat(g.otherPoints||[]))assert.ok(xy.every(Number.isFinite));}else{assert.ok(g.lo<g.hi);for(const s of g.series)for(let i=0;i<=20;i++){const y=s.fn(g.lo+(g.hi-g.lo)*i/20);assert.ok(y===null||Number.isFinite(y),'Nonfinite graph value');}}}for(const [,x] of f.metrics.concat(f.rows))assert.ok(typeof x!=='number'||Number.isFinite(x));}
for(const l of lessons){assert.equal(l.courseId,'mechanics');assert.equal(l.controls.length>0,true);assert.ok(l.intro.includes('？')&&l.intro.includes('先'));assert.equal((l.derivation.match(/<p>/g)||[]).length,4);assert.ok(l.graduate.task&&l.graduate.check);assert.ok(l.modelNote.length>40);for(const key of ['prediction','derive']){assert.equal(l[key].options.length,3);assert.ok(l[key].correct>=0&&l[key].correct<3);}
 const p=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));check(M.evaluate(l.id,p));for(const c of l.controls){for(const v of [c.min,c.max])check(M.evaluate(l.id,{...p,[c.id]:v}));assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:NaN}),RangeError);assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:Infinity}),RangeError);}for(const edge of ['min','max'])check(M.evaluate(l.id,Object.fromEntries(l.controls.map(c=>[c.id,c[edge]]))));}

const b=M.bifurcation(-2,1);assert.equal(b.roots.length,3);near(b.curvatures[1],4);assert.equal(M.bifurcation(2,1).roots.length,1);near(M.period(2,3,0,1),2*Math.PI*Math.sqrt(2/3),1e-12);
assert.ok(M.period(1,1,1,1)<2*Math.PI);assert.ok(M.period(1,1,1,2)<M.period(1,1,1,1));const ref=M.period(1,1,5,2,1024),e8=Math.abs(M.period(1,1,5,2,8)-ref),e16=Math.abs(M.period(1,1,5,2,16)-ref),e32=Math.abs(M.period(1,1,5,2,32)-ref);assert.ok(e16<e8&&e32<e16);
// Conservative pendulum and the damped energy balance give independent RK4 checks.
const coarse=M.drivenPendulum(0,0,1,.7,0,4,32),fine=M.drivenPendulum(0,0,1,.7,0,4,64);assert.ok(fine.balance<coarse.balance/8);assert.ok(fine.balance<1e-7);
const driven=M.drivenPendulum(.2,.1,1,.2);assert.ok(driven.balance<1e-7);assert.equal(driven.strobe.length,13);for(let i=0;i<driven.strobe.length;i++){const row=driven.fine[(i+12)*256];near(driven.strobe[i][0],M.wrap(row[1]));near(driven.strobe[i][1],row[2]);}
const sensitive=M.drivenPendulum(0,1.2,.5,3);assert.ok(sensitive.difference>1);assert.equal(sensitive.converged,false);assert.ok(sensitive.rows.some(row=>String(row[1]).includes('具体末态与频闪结构未通过步长收敛')));assert.ok(sensitive.metrics.some(row=>String(row[1]).includes('未收敛')));
const integrable=M.standard(0,.3,.7,100,1e-5);near(integrable.orbit.at(-1)[1],.7);near(M.wrap(integrable.orbit.at(-1)[0]-(.3+70)),0,2e-12);near(integrable.finiteExponent,0);near(integrable.distance.at(-1),1e-5,1e-12);
// Area preservation: numerical Jacobian of one unwrapped local map.
for(const K of [0,1,4]){const q=.7,p=.3,eps=1e-6,map=(q,p)=>{const pp=p+K*Math.sin(q);return [q+pp,pp];},qp=map(q+eps,p),qm=map(q-eps,p),pp=map(q,p+eps),pm=map(q,p-eps),a=(qp[0]-qm[0])/(2*eps),b=(pp[0]-pm[0])/(2*eps),c=(qp[1]-qm[1])/(2*eps),d=(pp[1]-pm[1])/(2*eps);near(a*d-b*c,1,2e-9);}
assert.throws(()=>M.period(1,1,-1,1),RangeError);assert.throws(()=>M.standard(1,0,0,2.2,.001),RangeError);assert.throws(()=>M.drivenPendulum(.1,1,0,.2),RangeError);

console.log('PASS CM8: independent physical benchmarks, conservation, units, limiting cases, invalid inputs, and slider-domain graph checks.');
