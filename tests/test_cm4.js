const assert=require('node:assert/strict');
const M=require('../assets/js/physics/cm4-physics.js');
const lessons=require('../assets/js/lessons/cm4-lessons.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}; tolerance ${t}`);
function integral(fn,a,b,n=10000){const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return h*s/3;}
function check(f){assert.equal(f.plots.length,2);for(const g of f.plots){assert.ok(g.x&&g.y&&g.title);if(g.kind==='scatter'){for(const xy of g.points.concat(g.otherPoints||[]))assert.ok(xy.every(Number.isFinite));}else{assert.ok(g.lo<g.hi);for(const s of g.series)for(let i=0;i<=20;i++){const y=s.fn(g.lo+(g.hi-g.lo)*i/20);assert.ok(y===null||Number.isFinite(y),'Nonfinite graph value');}}}for(const [,x] of f.metrics.concat(f.rows))assert.ok(typeof x!=='number'||Number.isFinite(x));}
for(const l of lessons){assert.equal(l.courseId,'mechanics');assert.equal(l.controls.length>0,true);assert.ok(l.intro.includes('？')&&l.intro.includes('先'));assert.equal((l.derivation.match(/<p>/g)||[]).length,4);assert.ok(l.graduate.task&&l.graduate.check);assert.ok(l.modelNote.length>40);for(const key of ['prediction','derive']){assert.equal(l[key].options.length,3);assert.ok(l[key].correct>=0&&l[key].correct<3);}
 const p=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));check(M.evaluate(l.id,p));for(const c of l.controls){for(const v of [c.min,c.max])check(M.evaluate(l.id,{...p,[c.id]:v}));assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:NaN}),RangeError);assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:Infinity}),RangeError);}for(const edge of ['min','max'])check(M.evaluate(l.id,Object.fromEntries(l.controls.map(c=>[c.id,c[edge]]))));}

near(M.stability(2,3,1).omega,Math.sqrt(1.5));const unstable=M.stability(1,-1,1);for(const x of unstable.roots)near(x-x*x*x,0);assert.ok(unstable.curvatures[0]<0&&unstable.curvatures[1]>0);assert.equal(M.stability(1,0,1).omega,null);
const md=M.modes(2,3,.7);near(md.w1**2,1.5);near(md.w2**2,2.2);near(M.modes(1,1,0).w1,M.modes(1,1,0).w2);
for(const kc of [0,.1,1]){const b=M.beats(1.7,2.3,kc,.8);for(let t=0;t<=50;t+=.13)near(b.E1(t)+b.E2(t),b.total,2e-14);near(b.x1(0),.8);near(b.x2(0),0);if(kc===0)near(b.x2(13),0);}
const d=M.driven(2,3,.2,1,1.3),expected=1/Math.sqrt((3-2*1.3**2)**2+(4*.2*1.3)**2);near(d.amp,expected);near(d.power,1*d.amp*1.3*Math.sin(d.phase)/2);const avg=integral(t=>2*2*.2*(d.amp*1.3*Math.sin(1.3*t-d.phase))**2,0,2*Math.PI/1.3)/(2*Math.PI/1.3);near(avg,d.power,1e-10);near(M.driven(1,2,.1,1,0).amp,.5);assert.equal(M.driven(1,1,.1,0,1).phase,null);assert.throws(()=>M.driven(1,1,0,1,1),RangeError);

console.log('PASS CM4: independent physical benchmarks, conservation, units, limiting cases, invalid inputs, and slider-domain graph checks.');
