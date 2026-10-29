const assert=require('node:assert/strict'),Q=require('../assets/js/physics/qm1-physics.js'),M=require('../assets/js/physics/qm2-physics.js'),P=require('../assets/js/physics/qm3-physics.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}`);
for(const tau of [0,.6,2*Math.PI,10]){const f=P.stationary(.6,.4,tau,1,0),shift=P.stationary(.6,.4,tau,1,2);near(f.norm,1,1e-10);near(f.meanEnergy,P.stationary(.6,.4,0,1,0).meanEnergy);for(const x of [.2,.5,.7])near(f.density(x),shift.density(x));near(P.stationary(0,0,tau,1,0).density(.3),Q.well(1,1).density(.3));}
near(P.stationary(.6,0,0,2,0).period/P.stationary(.6,0,0,1,0).period,4);
for(const omega of [0,1,3])for(const d of [-2,0,2])for(const t of [0,.4,Math.PI]){const f=P.oscillation(omega,t,d);near(f.p0+f.p1,1);f.unitary.forEach((row,i)=>row.forEach((z,j)=>{near(z[0],i===j?1:0);near(z[1],0);}));near(f.p1,omega===0?0:omega**2/(omega**2+d*d)*Math.sin(Math.hypot(omega,d)*t/2)**2);}
near(P.oscillation(2,Math.PI/2,0).p1,1);near(P.oscillation(0,5,0).p1,0);
for(const time of [0,2,20])for(const k of [-3,0,3]){
 const a=-.5,b=.8,f=P.current(0,.4,0,k,time,a,b),dt=1e-4;
 const derivative=(P.current(0,.4,0,k,time+dt,a,b).probability-P.current(0,.4,0,k,time-dt,a,b).probability)/(2*dt*1e-15);
 const scale=Math.max(Math.abs(f.left),Math.abs(f.right),1e10);near(f.rate/scale,(f.left-f.right)/scale,3e-9);near(derivative/scale,f.rate/scale,5e-8);
 for(const x of [-.6,0,.6]){const dx=1e-5,spatial=(f.flow(x+dx)-f.flow(x-dx))/(2*dx);near((spatial+f.densityRate(x))/scale,0,2e-8);}
}
const ring=P.current(2,.4,0,1,0,-1,1),standing=P.current(1,.4,0,1,0,-1,1);assert.ok(ring.left>0);near(ring.left,ring.right);near(ring.rate,0);near(standing.left,0);
for(const observable of [0,1,2])for(const time of [0,.4,2]){const f=P.pictures(.6,.7,2,time,observable);near(f.schrodinger,f.heisenberg);if(observable===0)near(f.schrodinger,Math.cos(1.2));if(observable===1)near(f.schrodinger,Math.sin(1.2)*Math.cos(.7+2*time));}
console.log('PASS QM3: stationary/shift invariance, Rabi limits/unitarity, independent finite-time probability derivative and local continuity, ring/standing boundaries, two-picture agreement.');
