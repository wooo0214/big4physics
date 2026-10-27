/* ED2 analytical models. SI internally; charge inputs in nC, lengths in m.
 * No softened charges: excluded point-source samples return null, never zero.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ED2Physics=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EPS0=8.8541878128e-12,K=1/(4*Math.PI*EPS0),MASK=.08;
  function finite(...values){if(!values.every(Number.isFinite))throw new RangeError('Finite numeric inputs required.');}
  function point(q,sx,sz,x,z,offset=0){
    finite(q,sx,sz,x,z,offset);
    const dx=x-sx,dz=z-sz,r=Math.hypot(dx,dz);
    if(r<MASK)return {valid:false,potential:null,ex:null,ez:null};
    return {valid:true,potential:K*q*1e-9/r+offset,ex:K*q*1e-9*dx/r**3,ez:K*q*1e-9*dz/r**3};
  }
  function lineIntegral(q,sx,vertices,steps=120){
    finite(q,sx,steps);
    if(!Number.isInteger(steps)||steps<2||steps%2||vertices.length<2)throw new RangeError('Even Simpson steps and at least two vertices required.');
    let total=0;
    for(let j=1;j<vertices.length;j++){
      const [x,z]=vertices[j-1],[tx,tz]=vertices[j];finite(x,z,tx,tz);
      const dx=tx-x,dz=tz-z;
      // Mask the entire segment, including a singularity between quadrature nodes.
      const t=dx*dx+dz*dz===0?0:Math.max(0,Math.min(1,((sx-x)*dx-z*dz)/(dx*dx+dz*dz)));
      if(Math.hypot(x+t*dx-sx,z+t*dz)<MASK)return null;
      let sum=0;
      for(let i=0;i<=steps;i++){
        const f=point(q,sx,0,x+dx*i/steps,z+dz*i/steps);
        sum+=(i===0||i===steps?1:i%2?4:2)*(f.ex*dx+f.ez*dz);
      }
      total+=sum/(3*steps);
    }
    return total;
  }
  function paths(q,sourceX,bendHeight,offset){
    finite(q,sourceX,bendHeight,offset);
    const a=point(q,sourceX,0,-1,1,offset),b=point(q,sourceX,0,1,1,offset);
    return {a:a.potential,b:b.potential,delta:a.valid&&b.valid?b.potential-a.potential:null,
      direct:lineIntegral(q,sourceX,[[-1,1],[1,1]]),
      bent:lineIntegral(q,sourceX,[[-1,1],[-1,bendHeight],[1,bendHeight],[1,1]])};
  }
  function image(q,a,x,z){
    finite(q,a,x,z);if(a<=0||z<0)throw new RangeError('Grounded-plane model requires a>0 and z>=0.');
    const real=point(q,0,a,x,z),mirror=point(-q,0,-a,x,z);
    if(!real.valid||!mirror.valid)return {valid:false,potential:null,ex:null,ez:null};
    return {valid:true,potential:real.potential+mirror.potential,ex:real.ex+mirror.ex,ez:real.ez+mirror.ez};
  }
  function imageSummary(q,a){
    finite(q,a);if(a<=0)throw new RangeError('Positive height required.');
    // Moving the real source induces a new surface distribution at every a.
    // U=(1/2)q phi_induced; differentiation moves the induced distribution too.
    return {forceZ:-K*(q*1e-9)**2/(4*a*a),energy:-K*(q*1e-9)**2/(4*a),
      inducedPotential:-K*q*1e-9/(2*a)};
  }
  const L=2,H=1.5;
  function rectangleInputs(v,shape,modes,x,y){
    finite(v,shape,modes,x,y);
    if(![0,1].includes(shape)||!Number.isInteger(modes)||modes<1||modes>40||x<0||x>L||y<0||y>H)throw new RangeError('Invalid rectangle parameters.');
  }
  function topBoundary(v,shape,x){rectangleInputs(v,shape,1,x,H);return shape===0?v*Math.sin(Math.PI*x/L):2*v*Math.min(x/L,1-x/L);}
  function rectangle(v,shape,modes,x,y){
    rectangleInputs(v,shape,modes,x,y);
    let potential=0,ex=0,ey=0;
    for(let n=1;n<=modes;n++){
      const k=n*Math.PI/L,b=shape===0?(n===1?v:0):8*v*Math.sin(n*Math.PI/2)/(n*Math.PI)**2;
      // Exponential ratios avoid overflowing sinh at large mode index.
      const denom=1-Math.exp(-2*k*H),decay=Math.exp(k*(y-H));
      const s=decay*(-Math.expm1(-2*k*y))/denom,c=decay*(1+Math.exp(-2*k*y))/denom;
      potential+=b*Math.sin(k*x)*s;ex-=b*k*Math.cos(k*x)*s;ey-=b*k*Math.sin(k*x)*c;
    }
    return {potential,ex,ey};
  }
  function boundaryError(v,shape,modes){
    rectangleInputs(v,shape,modes,0,0);
    let sum=0,max=0;
    // Midpoint sampling at 400 top-edge positions; RMS is in volts.
    for(let i=0;i<400;i++){
      const x=L*(i+.5)/400,e=rectangle(v,shape,modes,x,H).potential-topBoundary(v,shape,x);
      sum+=e*e;max=Math.max(max,Math.abs(e));
    }
    return {rms:Math.sqrt(sum/400),max};
  }
  function multipole(q,d,ratio,thetaDeg,kind){
    finite(q,d,ratio,thetaDeg,kind);
    if(d<=0||ratio<=.5||thetaDeg<0||thetaDeg>90||![0,1,2].includes(kind))throw new RangeError('Invalid multipole parameters.');
    const r=d*ratio,theta=thetaDeg*Math.PI/180,cosine=thetaDeg===90?0:Math.cos(theta),x=r*Math.sin(theta),z=r*cosine;
    // kind 0: free dipole; 1: two equal charges; 2: grounded half-space.
    const first=point(q,0,d/2,x,z),second=point(kind===1?q:-q,0,-d/2,x,z);
    if(!first.valid||!second.valid)return {valid:false,exact:null,approx:null,relativeError:null,absoluteError:null,r,x,z};
    const exact=first.potential+second.potential;
    const approx=kind===1?2*K*q*1e-9/r:K*q*1e-9*d*cosine/(r*r);
    // At symmetry nodes or q=0 a relative error has no meaningful denominator.
    const node=Math.abs(exact)<1e-12*Math.max(1,Math.abs(first.potential),Math.abs(second.potential));
    return {valid:true,exact,approx,absoluteError:Math.abs(approx-exact),relativeError:node?null:Math.abs((approx-exact)/exact),r,x,z};
  }
  return {point,lineIntegral,paths,image,imageSummary,rectangle,topBoundary,boundaryError,multipole,L,H};
});
