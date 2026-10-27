/* SI; eta=diag(+---), x^mu=(ct,x,y,z), S' moves at +v relative to S.
 * F^{0i}=-Ei/c, F^{ij}=-epsilon_ijk Bk; d_mu F^{mu nu}=mu0 J^nu.
 * Uniform/local polynomial fields are teaching examples, not decaying finite sources.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ED8Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EPS0=8.8541878128e-12,C=299792458,MU0=1/(EPS0*C*C),ETA=[1,-1,-1,-1];
  function finite(...v){if(!v.every(Number.isFinite))throw new RangeError('Finite inputs required.');}
  function gamma(beta){finite(beta);if(Math.abs(beta)>=1)throw new RangeError('|beta|<1 required.');return 1/Math.sqrt(1-beta*beta);}
  const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  function boost(vector,beta,axis=0){
    finite(...vector,beta,axis);if(vector.length!==4||![0,1,2].includes(axis))throw new RangeError('Four components and a Cartesian axis required.');
    const g=gamma(beta),out=[...vector];out[0]=g*(vector[0]-beta*vector[axis+1]);out[axis+1]=g*(vector[axis+1]-beta*vector[0]);return out;
  }
  const norm=v=>v.reduce((s,x,i)=>s+ETA[i]*x*x,0);
  function events(ct,x,y,beta){
    finite(ct,x,y);const original=[ct,x,y,0],transformed=boost(original,beta);
    return {original,transformed,gamma:gamma(beta),interval:norm(original),intervalPrime:norm(transformed)};
  }
  function current(rhoNano,jMilli,beta){
    finite(rhoNano,jMilli);const rho=rhoNano*1e-9,j=jMilli*1e-3,original=[C*rho,j,0,0],transformed=boost(original,beta);
    const g=gamma(beta);
    // The finite comoving-cell illustration is valid ONLY when Jx=0 in S.
    return {rho,j,rhoPrime:transformed[0]/C,jPrime:transformed[1],original,transformed,gamma:g,
      invariant:norm(original),invariantPrime:norm(transformed),cellVolume:j===0?1/g:null,cellCharge:j===0?transformed[0]/C/g:null};
  }
  function tensor(e,b,indexMode=0){
    finite(...e,...b,indexMode);if(e.length!==3||b.length!==3||![0,1,2].includes(indexMode))throw new RangeError('Three-vectors, index mode 0/1/2 required.');
    const f=[[0,-e[0]/C,-e[1]/C,-e[2]/C],[e[0]/C,0,-b[2],b[1]],[e[1]/C,b[2],0,-b[0]],[e[2]/C,-b[1],b[0],0]];
    // 0: both upper; 1: both lower; 2: first upper, second lower.
    return f.map((row,i)=>row.map((v,j)=>v*(indexMode===1?ETA[i]*ETA[j]:indexMode===2?ETA[j]:1)));
  }
  function potentials(a,bMicro,x,y){
    finite(a,bMicro,x,y);const b=bMicro*1e-6,b0=.2e-6;
    return {phi:-a*x*x/2-40*y,avec:[-b0*y/2,b0*x/2+b*x*x/2,0]};
  }
  function tensorExample(a,bMicro,x,indexMode,speedBeta){
    finite(a,bMicro,x,indexMode,speedBeta);const b=bMicro*1e-6,e=[a*x,40,0],magnetic=[0,0,.2e-6+b*x],f=tensor(e,magnetic),g=gamma(speedBeta),u=[g*C,g*speedBeta*C,0,0];
    const q=1e-9,force=f.map(row=>q*row.reduce((s,v,j)=>s+v*ETA[j]*u[j],0));
    const rho=EPS0*a,j=[0,-b/MU0,0],divergence=[a/C,0,-b,0],source=[MU0*C*rho,...j.map(v=>MU0*v)];
    return {e,b:magnetic,matrix:tensor(e,magnetic,indexMode),upper:f,u,force,rho,j,divergence,source,
      residual:divergence.map((v,i)=>v-source[i]),orthogonality:force.reduce((s,v,i)=>s+ETA[i]*u[i]*v,0),potential:potentials(a,bMicro,x,.3)};
  }
  function transformFields(e,b,beta,axis){
    finite(...e,...b,beta,axis);if(e.length!==3||b.length!==3||![0,1,2].includes(axis))throw new RangeError('Cartesian fields and axis required.');
    const g=gamma(beta),v=[0,0,0];v[axis]=beta;
    const cb=b.map(x=>C*x),vxB=cross(v,cb),vxE=cross(v,e),ve=dot(v,e),vb=dot(v,cb),h=g*g/(g+1);
    const ep=e.map((x,i)=>g*(x+vxB[i])-h*v[i]*ve),cbp=cb.map((x,i)=>g*(x-vxE[i])-h*v[i]*vb);
    return {e:ep,b:cbp.map(x=>x/C),cb:cbp,gamma:g};
  }
  function fieldExample(amplitude,preset,beta,axis){
    finite(amplitude,preset,beta,axis);if(amplitude<0||![0,1,2,3,4,5].includes(preset))throw new RangeError('A>=0 and a field preset required.');
    const pairs=[[[1,0,0],[0,0,0]],[[0,0,0],[0,1,0]],[[1,0,0],[0,.5,0]],[[1,0,0],[0,1,0]],[[1,0,0],[1,0,0]],[[.5,0,0],[0,1,0]]];
    const e=pairs[preset][0].map(x=>x*amplitude),cb=pairs[preset][1].map(x=>x*amplitude),b=cb.map(x=>x/C),prime=transformFields(e,b,beta,axis);
    const invariants=(ee,bb)=>({dot:dot(ee,bb),difference:dot(ee,ee)-C*C*dot(bb,bb)});
    const original=invariants(e,b),transformed=invariants(prime.e,prime.b);
    let classification='零场';
    if(amplitude!==0)classification=preset===4?'E·B≠0：无纯电 / 纯磁系':preset===3?'非零零型场：无纯电 / 纯磁系':[0,2].includes(preset)?'电型：存在纯电系':'磁型：存在纯磁系';
    return {e,b,cb,prime,original,transformed,classification};
  }
  return {EPS0,C,MU0,ETA,gamma,dot,cross,boost,norm,events,current,tensor,potentials,tensorExample,transformFields,fieldExample};
});
