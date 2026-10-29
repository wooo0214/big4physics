const assert=require('node:assert/strict'),Q=require('../assets/js/physics/qm1-physics.js'),P=require('../assets/js/physics/qm7-physics.js');
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b} (tol ${t})`);
near(P.A0/1e-11,5.2917721,1e-6);near(P.HARTREE,27.211386,1e-5);
for(let n=1;n<=4;n++)for(let l=0;l<n;l++)for(const Z of [1,4]){
 const f=P.hydrogen(n,l,0,Z,1836.15267343),end=12*n*n+20;
 near(Q.integrate(f.density,0,end,16000),1,1e-8);near(Q.integrate(s=>s*f.density(s),0,end,16000),(3*n*n-l*(l+1))/2,1e-8);near(f.u(0),0);
 const h=1e-4;for(const s of [.3,1.4,3.7]){const d2=(f.u(s+h)-2*f.u(s)+f.u(s-h))/(h*h);near(-d2/2+f.effective(s)*f.u(s),-f.u(s)/(2*n*n),3e-7);}
 near(f.energy,-P.HARTREE*f.mu/Q.MASS*Z*Z/(2*n*n));
}
const f=P.hydrogen(1,0,0,1,1836.15267343);near(f.radial(0),2);near(f.body(0,0),1/Math.PI);assert.ok(f.density(1)>f.density(0));near(f.meanR/f.b,1.5);
assert.ok(P.hydrogen(1,3,-3,1,1836).clamped);near(P.hydrogen(1,0,0,2,1836).b/f.b,.5,1e-6);
for(const kind of [0,1])for(let l=0;l<=3;l++){const r=P.radial(kind,l,1,1);near(r.norm,1,3e-7);near(r.u(0),0);near(Q.integrate(s=>s*s*r.radial(s)**2,0,r.end,4000),r.norm,1e-8);assert.equal(r.effective(0),null);}
for(const mode of [0,1,2])for(const spin of [0,1])for(const S of [0,.3,.999999,1]){const e=P.exchange(mode,spin,S);near(e.rawNorm,2*(1+e.sign*e.S*e.S),1e-12);if(e.allowed){near(e.norm,1);near(e.spatialExchange,e.sign);near(e.totalExchange,-1);}else{assert.equal(e.norm,null);assert.equal(e.probabilities,null);}}
assert.ok(P.exchange(0,0,.3).allowed);assert.equal(P.exchange(0,1,.3).allowed,false);
for(const Z of [2,3,4])for(const zeta of [.3,1.6875,5]){const h=P.helium(Z,zeta,0);near(h.energy,h.kinetic+h.nuclear+h.direct);assert.ok(h.energy>=h.minimum-1e-10);
 // Independent angular-averaged double Coulomb integral: 1/max(r1,r2).
 const p=r=>4*zeta**3*r*r*Math.exp(-2*zeta*r),cdf=r=>1-Math.exp(-2*zeta*r)*(1+2*zeta*r+2*zeta*zeta*r*r),direct=2*Q.integrate(r=>r===0?0:p(r)*cdf(r)/r,0,24/zeta,12000);near(direct,5*zeta/8,2e-10);
}
near(P.helium(2,27/16,0).energy/P.HARTREE,-((27/16)**2));assert.equal(P.helium(2,2,1).allowed,false);assert.equal(P.helium(2,2,2).energy,null);assert.equal(P.helium(2,2,3).energy,null);
for(const fn of [()=>P.hydrogen(0,0,0,1,1836),()=>P.hydrogen(1,0,0,1,0),()=>P.exchange(2,0,1.1),()=>P.helium(1,1,0)])assert.throws(fn,RangeError);
console.log('PASS QM7: hydrogen SI/reduced mass, radial ODE/normalization/moments/nodes, density versus shell, central potentials, nonorthogonal exchange, Pauli zero norm, independent Coulomb integral and variational energy.');
