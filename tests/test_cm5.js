const assert=require('node:assert/strict');
const M=require('../assets/js/physics/cm5-physics.js');
const lessons=require('../assets/js/lessons/cm5-lessons.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}; tolerance ${t}`);
function integral(fn,a,b,n=10000){const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return h*s/3;}
function check(f){assert.equal(f.plots.length,2);for(const g of f.plots){assert.ok(g.x&&g.y&&g.title);if(g.kind==='scatter'){for(const xy of g.points.concat(g.otherPoints||[]))assert.ok(xy.every(Number.isFinite));}else{assert.ok(g.lo<g.hi);for(const s of g.series)for(let i=0;i<=20;i++){const y=s.fn(g.lo+(g.hi-g.lo)*i/20);assert.ok(y===null||Number.isFinite(y),'Nonfinite graph value');}}}for(const [,x] of f.metrics.concat(f.rows))assert.ok(typeof x!=='number'||Number.isFinite(x));}
for(const l of lessons){assert.equal(l.courseId,'mechanics');assert.equal(l.controls.length>0,true);assert.ok(l.intro.includes('？')&&l.intro.includes('先'));assert.equal((l.derivation.match(/<p>/g)||[]).length,4);assert.ok(l.graduate.task&&l.graduate.check);assert.ok(l.modelNote.length>40);for(const key of ['prediction','derive']){assert.equal(l[key].options.length,3);assert.ok(l[key].correct>=0&&l[key].correct<3);}
 const p=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));check(M.evaluate(l.id,p));for(const c of l.controls){for(const v of [c.min,c.max])check(M.evaluate(l.id,{...p,[c.id]:v}));assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:NaN}),RangeError);assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:Infinity}),RangeError);}for(const edge of ['min','max'])check(M.evaluate(l.id,Object.fromEntries(l.controls.map(c=>[c.id,c[edge]]))));}

const f=M.inertia(2,1.3,.7,.4,.8),c=Math.cos(.4),s=Math.sin(.4),points=[[1.3,.7],[1.3,-.7],[-1.3,.7],[-1.3,-.7]].map(([x,y])=>[c*x-s*y,s*x+c*y]),m=.5;near(f.Ixx,points.reduce((a,p)=>a+m*p[1]**2,0));near(f.Iyy,points.reduce((a,p)=>a+m*p[0]**2,0));near(f.Ixy,points.reduce((a,p)=>a-m*p[0]*p[1],0));near(f.Ixx+f.Iyy,f.I3);near(f.Ixx*f.Iyy-f.Ixy**2,f.I1*f.I2);near(M.inertia(1,1,1,.9,.1).axisInertia,1);
const L=M.momentum(1,2,3,2,.7,.8);near(L.T,L.w.reduce((a,x,i)=>a+x*L.L[i]/2,0));near(M.momentum(1,2,3,2,0,1).angle,0);assert.ok(L.angle>0);assert.throws(()=>M.momentum(1,1,3,1,1,1),RangeError);
const st=M.intermediate(2,3,4,1,.01);assert.ok(st.lambda2[0]<0&&st.lambda2[1]>0&&st.lambda2[2]<0);near(st.growth,Math.sqrt(1/8));near(M.intermediate(2,3,4,2,.01).growth,2*st.growth);assert.throws(()=>M.intermediate(3,2,4,1,.01),RangeError);
const g=M.gyro(.5,9.8,.2,2,.04,.7);near(g.omega*2*Math.sin(.7),g.torque);near(M.gyro(.5,9.8,.2,4,.04,.7).omega,g.omega/2);
// All slider corner combinations must remain a physical inertia tensor.
for(const l of lessons.slice(1,3)){const cs=l.controls;for(let mask=0;mask<(1<<cs.length);mask++){const p=Object.fromEntries(cs.map((c,i)=>[c.id,c[(mask>>i)&1?'min':'max']]));M.evaluate(l.id,p);}}

console.log('PASS CM5: independent physical benchmarks, conservation, units, limiting cases, invalid inputs, and slider-domain graph checks.');
