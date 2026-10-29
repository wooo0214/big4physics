/* Finite-dimensional quantum models. Complex entries are [real, imaginary].
 * Operators are dimensionless: A=n·σ, eigenvalues ±1. Projectors, rather than
 * arbitrarily chosen vectors in a degenerate eigenspace, define measurement.
 */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./qm1-physics.js'):root.QM1Physics);if(typeof module==='object'&&module.exports)module.exports=api;root.QM2Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(Q){
  'use strict';const {C}=Q;
  const inner=(a,b)=>a.reduce((s,v,i)=>C.add(s,C.mul(C.conj(v),b[i])),[0,0]);
  const mv=(a,v)=>a.map(row=>row.reduce((s,z,i)=>C.add(s,C.mul(z,v[i])),[0,0]));
  const adj=a=>a[0].map((_,j)=>a.map(row=>C.conj(row[j])));
  const mm=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((s,z,k)=>C.add(s,C.mul(z,b[k][j])),[0,0])));
  const outer=v=>v.map(z=>v.map(w=>C.mul(z,C.conj(w))));
  function axis(beta){Q.finite(beta);return [[[Math.cos(beta),0],[Math.sin(beta),0]],[[Math.sin(beta),0],[-Math.cos(beta),0]]];}
  function basis(theta,phase,beta,eta){Q.finite(theta,phase,beta,eta);const v=Q.state(theta,phase),c=Math.cos(beta),s=Math.sin(beta),U=[[[c,0],C.scale(C.exp(-eta),-s)],[C.scale(C.exp(eta),s),[c,0]]],A=axis(.73);
    const transformed=mv(adj(U),v),operator=mm(mm(adj(U),A),U);
    return {v,U,A,transformed,operator,norm:inner(transformed,transformed)[0],before:inner(v,mv(A,v))[0],after:inner(transformed,mv(operator,transformed))[0],active:inner(transformed,mv(A,transformed))[0]};}
  function measurement(theta,phase,kind,outcome){Q.finite(theta,phase,kind,outcome);if(![0,1].includes(kind)||![0,1].includes(outcome))throw new RangeError('Unknown measurement.');
    const pair=Q.state(theta,phase),v=kind===0?pair:[pair[0],C.scale(pair[1],1/Math.SQRT2),[theta===0?0:Math.sin(theta)/Math.SQRT2,0]];
    const groups=kind===0?[[0],[1]]:[[0,1],[2]],probabilities=groups.map(g=>g.reduce((s,i)=>s+C.abs2(v[i]),0)),rho=outer(v);
    const nonselective=rho.map((row,i)=>row.map((z,j)=>groups.some(g=>g.includes(i)&&g.includes(j))?z:[0,0]));
    const probability=probabilities[outcome];
    // Exact angle endpoints are resolved in state(); small representable
    // probabilities remain valid outcomes and are never thresholded away.
    const conditional=probability===0?null:v.map((z,i)=>groups[outcome].includes(i)?C.scale(z,1/Math.sqrt(probability)):[0,0]);
    return {v,rho,nonselective,probabilities,probability,conditional,dimension:v.length,eigenvalues:kind===0?[1,-1]:[1,2]};}
  function uncertainty(theta,phase,beta){const v=Q.state(theta,phase),A=axis(0),B=axis(beta),a=inner(v,mv(A,v))[0],b=inner(v,mv(B,v))[0],ab=inner(v,mv(mm(A,B),v)),ba=inner(v,mv(mm(B,A),v));
    const da=Math.sqrt(Math.max(0,1-a*a)),db=Math.sqrt(Math.max(0,1-b*b)),comm=C.sub(ab,ba),cov=(ab[0]+ba[0])/2-a*b;
    return {a,b,da,db,product:da*db,bound:Math.hypot(...comm)/2,strong:Math.sqrt(C.abs2(comm)/4+cov*cov),comm,cov};}
  function entanglement(theta,phase,alpha,beta){Q.finite(theta,phase,alpha,beta);const c=Math.cos(theta),s=Math.sin(theta),v=[[c,0],[0,0],[0,0],C.scale(C.exp(phase),s)],rho=outer(v);
    const reduced=[0,1].map(i=>[0,1].map(j=>C.add(rho[2*i][2*j],rho[2*i+1][2*j+1])));
    const A=axis(alpha),B=axis(beta),tensor=A.flatMap(row=>B.map(brow=>row.flatMap(z=>brow.map(w=>C.mul(z,w)))));
    const correlation=inner(v,mv(tensor,v))[0],classical=Math.cos(alpha)*Math.cos(beta),marginal=Math.cos(2*theta)*Math.cos(alpha);
    return {v,rho,reduced,purity:c**4+s**4,correlation,classical,marginal,pPlusA:(1+marginal)/2};}
  return {inner,mv,adj,mm,outer,axis,basis,measurement,uncertainty,entanglement};
});
