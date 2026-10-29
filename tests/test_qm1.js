/* Deterministic analytical models; independent quadrature/moments and SI checks.
 * Relative tolerances 1e-8, Simpson integration 800-4000 panels, no real data.
 */
const assert=require('node:assert/strict'),Q=require('../assets/js/physics/qm1-physics.js');
function near(a,b,tol=1e-9){assert.ok(Math.abs(a-b)<=tol,`${a} != ${b}`);}
function midpoint(f,a,b,n=20000){let s=0;for(let i=0;i<n;i++)s+=f(a+(i+.5)*(b-a)/n);return s*(b-a)/n;}
for(const n of [1,2,5])for(const L of [.5,1,3]){
 const f=Q.well(n,L);near(f.norm,1,1e-12);near(f.psi(0),0);near(f.psi(1),0);near(midpoint(x=>f.psiSI(x/L/1e-9)**2,0,L*1e-9),1,1e-10);
 near(Q.well(n,2*L).energyEv/f.energyEv,.25);near(f.energyEv/n**2*L**2,.3760301621609693,2e-8);
 for(const [a,b] of [[0,1],[.2,.7],[.5,.5],[1,0]]){const p=Q.interval(n,L,a,b);assert.ok(p.probability>=-1e-12&&p.probability<=1+1e-12);near(p.probability,midpoint(f.density,p.lo,p.hi),2e-8);near(p.numeric,p.probability,2e-9);}
}
for(const n of [1,2,3])for(const m of [1,2,3])near(midpoint(x=>Q.well(n,1).psi(x)*Q.well(m,1).psi(x),0,1,2000),n===m?1:0,1e-12);
for(const theta of [0,.3,Math.PI/4,Math.PI/2])for(const delta of [0,.7,Math.PI]){
 const a=Q.superposition(theta,delta,0),b=Q.superposition(theta,delta,1.7);near(a.norm,1,1e-11);near(a.p1+a.p2,1);near(a.meanX,midpoint(x=>x*a.density(x),0,1),1e-8);
 for(const x of [.1,.25,.75])near(a.density(x),b.density(x),1e-12);
}
assert.ok(Math.abs(Q.superposition(Math.PI/4,0).density(.25)-Q.superposition(Math.PI/4,Math.PI).density(.25))>1);
for(const sigma of [.1,.4,1.5])for(const x0 of [-2,0,2]){
 const g=Q.gaussian(sigma,x0,1.2),sx=sigma*1e-9;near(g.sigmaP, Q.HBAR/(2*sx),1e-40);near(g.product,.5,1e-15);
 const norm=midpoint(g.density,x0-8*sigma,x0+8*sigma),variance=midpoint(x=>(x-x0)**2*g.density(x),x0-8*sigma,x0+8*sigma);
 near(norm,1,1e-12);near(variance,sigma*sigma,1e-10);near(g.missingX,.00269979606326,1e-10);near(g.missingP,g.missingX,1e-12);
 const sk=1/(2*sigma);near(midpoint(g.momentum,1.2-8*sk,1.2+8*sk),1,1e-12);
}
for(const fn of [()=>Q.well(0,1),()=>Q.well(1,0),()=>Q.gaussian(NaN,0,1),()=>Q.interval(1,1,-.1,1),()=>Q.superposition(0,Infinity)])assert.throws(fn,RangeError);
console.log('PASS QM1: SI normalization, orthogonality, interval quadrature, phase invariance, independent moments, Gaussian widths/window losses and invalid inputs.');
