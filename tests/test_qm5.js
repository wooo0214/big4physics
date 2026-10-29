/* Independent integrals, differential residuals and finite-cutoff edge cases. */
const assert=require('node:assert/strict'),Q=require('../assets/js/physics/qm1-physics.js'),P=require('../assets/js/physics/qm5-physics.js');
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b} (tol ${t})`);
for(const n of [0,1,2,5,12,40]){
 const end=Math.sqrt(2*n+1)+7,density=x=>P.phi(n,x)**2;
 near(Q.integrate(density,-end,end,8000),1,2e-12);near(Q.integrate(x=>x*x*density(x),-end,end,8000),n+.5,1e-10);
 near(P.phi(n,-.73),(n%2?-1:1)*P.phi(n,.73),1e-13);
 const h=1e-4;for(const x of [-.7,.3,1.4]){const phi=P.phi(n,x),d2=(P.phi(n,x+h)-2*phi+P.phi(n,x-h))/(h*h);near(-d2/2+x*x*phi/2,(n+.5)*phi,2e-6);}
}
const ground=P.eigen(0,1),tight=P.eigen(0,4);near(ground.energy,ground.quantum/2);near(tight.sigmaX/ground.sigmaX,.5);near(ground.sigmaX*ground.sigmaP/Q.HBAR,.5);near(ground.norm,1,1e-12);
for(let n=0;n<6;n++)for(let k=0;k<6;k++)for(const op of [0,1]){const f=P.ladder(n,k,op);near(Math.hypot(...Q.C.sub(f.value,f.numeric)),0,1e-11);}
near(P.ladder(5,5,0).commutator[5][5][0],-5);assert.ok(P.ladder(5,0,0).outside);
for(const [re,im] of [[0,0],[1.5,-.6],[3,3]])for(const tau of [0,.4,Math.PI,2*Math.PI]){
 const f=P.coherent(re,im,tau,1,40);near(f.meanX**2+f.meanP**2,2*(re*re+im*im),1e-12);near(f.sigmaX*f.sigmaP/Q.HBAR,.5);
 near(Q.integrate(f.density,-f.end,f.end,4000),1,1e-12);near(Q.integrate(x=>x*f.density(x),-f.end,f.end,4000),f.meanX,1e-11);
 near(f.retained+f.omitted,1,2e-15);near(f.weights.reduce((s,x)=>s+x,0),f.retained);assert.ok(f.retained<=1+2e-15);
}
near(P.coherent(2,0,0,1,0).omitted,1-Math.exp(-4));near(P.coherent(0,0,1,1,0).retained,1);
for(const n of [0,12,40])for(const bins of [6,18,60]){const f=P.correspondence(n,bins);near(f.boxes.reduce((s,b)=>s+b.classic,0),1,1e-14);assert.ok(f.boxes.every(b=>b.quantum>=0));near(f.retained,Q.integrate(f.density,-1.5,1.5,8000),2e-9);assert.equal(f.classic(1),null);}
// A scale-fixed interior bin converges in probability, rather than point density.
const interior=n=>{const A=Math.sqrt(2*n+1);return Q.integrate(y=>A*P.phi(n,A*y)**2,-.35,.35,8000);};
assert.ok(Math.abs(interior(40)-2*Math.asin(.35)/Math.PI)<.02);
for(const fn of [()=>P.eigen(-1,1),()=>P.eigen(0,0),()=>P.ladder(6,0,0),()=>P.coherent(0,0,0,1,-1),()=>P.correspondence(0,0)])assert.throws(fn,RangeError);
console.log('PASS QM5: ODE, normalization, moments, parity, SI scales, full-wavefunction matrix elements, cutoff commutator, coherent Poisson weights/tails, binned correspondence.');
