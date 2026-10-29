const assert=require('node:assert/strict'),Q=require('../assets/js/physics/qm1-physics.js'),M=require('../assets/js/physics/qm2-physics.js');
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
const identity=a=>a.forEach((row,i)=>row.forEach((z,j)=>{near(z[0],i===j?1:0);near(z[1],0);}));
for(const theta of [0,.3,Math.PI/4,Math.PI/2])for(const phase of [0,.7,Math.PI/2])for(const beta of [0,.4,Math.PI/2]){
 const b=M.basis(theta,phase,beta,.8);identity(M.mm(M.adj(b.U),b.U));near(b.norm,1);near(b.before,b.after);
 b.operator.forEach((row,i)=>row.forEach((z,j)=>{near(z[0],b.operator[j][i][0]);near(z[1],-b.operator[j][i][1]);}));
 const u=M.uncertainty(theta,phase,beta);assert.ok(u.product+1e-8>=u.strong&&u.strong+1e-8>=u.bound);
 // Direct Bloch-vector independent expressions for the commutator and moments.
 near(u.a,Math.cos(2*theta));near(u.b,Math.cos(beta)*Math.cos(2*theta)+Math.sin(beta)*Math.sin(2*theta)*Math.cos(phase));near(u.bound,Math.abs(Math.sin(beta)*Math.sin(2*theta)*Math.sin(phase)));
 for(const kind of [0,1])for(const outcome of [0,1]){const f=M.measurement(theta,phase,kind,outcome);near(f.probabilities.reduce((a,b)=>a+b,0),1);if(f.conditional)near(M.inner(f.conditional,f.conditional)[0],1);near(f.nonselective.reduce((s,row,i)=>s+row[i][0],0),1);}
}
const deg=M.measurement(.6,.8,1,0);near(deg.nonselective[0][1][0],deg.rho[0][1][0]);near(Q.C.abs2(deg.nonselective[0][2]),0);assert.ok(Q.C.abs2(deg.nonselective[0][1])>.01);
assert.equal(M.measurement(0,0,0,1).conditional,null);assert.equal(M.measurement(Math.PI/2,0,0,0).conditional,null);
const rare=M.measurement(1e-12,0,0,1);assert.ok(rare.probability>0&&rare.probability<1e-20);assert.ok(rare.conditional);near(M.inner(rare.conditional,rare.conditional)[0],1);
const bell=M.entanglement(Math.PI/4,0,Math.PI/2,Math.PI/2);near(bell.purity,.5);near(bell.reduced[0][0][0],.5);near(bell.correlation,1);near(bell.classical,0);near(bell.pPlusA,.5);
for(const theta of [0,.2,Math.PI/4,Math.PI/2])for(const phase of [0,.6,Math.PI])for(const beta of [0,.7,Math.PI/2]){const f=M.entanglement(theta,phase,.9,beta);near(f.correlation,Math.cos(.9)*Math.cos(beta)+Math.sin(2*theta)*Math.cos(phase)*Math.sin(.9)*Math.sin(beta));near(f.purity,f.reduced.flat().reduce((s,z)=>s+Q.C.abs2(z),0));near(f.pPlusA,(1+Math.cos(2*theta)*Math.cos(.9))/2);}
near(M.uncertainty(.4,0,Math.PI/2).bound,0);assert.ok(M.uncertainty(.4,0,Math.PI/2).product>.1);
assert.throws(()=>M.measurement(0,0,2,0),RangeError);assert.throws(()=>M.basis(0,NaN,0,0),RangeError);
console.log('PASS QM2: unitary basis changes, Hermiticity, degenerate Lüders coherence, zero-probability outcome, covariance bounds and partial trace/joint correlations.');
