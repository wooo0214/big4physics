/* Static vacuum models. SI outputs; UI magnetic inputs use microtesla or mT.
 * Infinite wire exclusion is geometric, not a softened current distribution.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ED3Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EPS0=8.8541878128e-12,C=299792458,MU0=1/(EPS0*C*C),MASK=.04;
  function finite(...v){if(!v.every(Number.isFinite))throw new RangeError('Finite inputs required.');}
  function wire(current,x,y){
    finite(current,x,y);const r=Math.hypot(x,y);
    if(r<MASK)return {valid:false,bx:null,by:null};
    const factor=MU0*current/(2*Math.PI*r*r);
    return {valid:true,bx:-factor*y,by:factor*x};
  }
  function ampere(current,radius,offset,steps=720){
    finite(current,radius,offset,steps);
    if(radius<=MASK||!Number.isInteger(steps)||steps<32)throw new RangeError('Invalid loop parameters.');
    const center=offset*radius,clearance=Math.abs(Math.abs(center)-radius);
    const local=wire(current,radius,0);
    // A contour touching the excluded wire neighbourhood is not numerically integrated.
    if(clearance<MASK)return {field:local.by,integral:null,expected:null,enclosed:null,minB:null,maxB:null};
    let integral=0,minB=Infinity,maxB=0;
    const dt=2*Math.PI/steps;
    for(let i=0;i<steps;i++){
      const t=(i+.5)*dt,x=center+radius*Math.cos(t),y=radius*Math.sin(t),b=wire(current,x,y);
      integral+=(-b.bx*radius*Math.sin(t)+b.by*radius*Math.cos(t))*dt;
      const magnitude=Math.hypot(b.bx,b.by);minB=Math.min(minB,magnitude);maxB=Math.max(maxB,magnitude);
    }
    const enclosed=Math.abs(center)<radius?current:0;
    return {field:local.by,integral,expected:MU0*enclosed,enclosed,minB,maxB};
  }
  function coil(current,radius,z){
    finite(current,radius,z);if(radius<=0)throw new RangeError('Positive coil radius required.');
    const exact=MU0*current*radius*radius/(2*(radius*radius+z*z)**1.5);
    // The dipole axis formula diverges at the origin and is not used there.
    const far=z===0?null:MU0*current*radius*radius/(2*Math.abs(z)**3);
    return {exact,far,moment:current*Math.PI*radius*radius,
      relativeError:current===0||z===0?null:Math.abs((far-exact)/exact)};
  }
  function gauge(fieldMicro,gaugeMicro,x,y){
    finite(fieldMicro,gaugeMicro,x,y);const b=fieldMicro*1e-6,g=gaugeMicro*1e-6;
    // A=(-By/2,Bx/2,0), chi=g*x^2/2, grad chi=(gx,0,0).
    return {ax:-b*y/2,ay:b*x/2,transformedX:-b*y/2+g*x,transformedY:b*x/2,
      chi:g*x*x/2,bz:b,transformedBz:b,divergence:0,transformedDivergence:g};
  }
  function dipole(current,radius,fieldMilli,angleDeg){
    finite(current,radius,fieldMilli,angleDeg);
    if(radius<=0||angleDeg<0||angleDeg>180)throw new RangeError('Invalid dipole parameters.');
    const angle=angleDeg*Math.PI/180,m=current*Math.PI*radius*radius,b=fieldMilli*1e-3;
    const sine=angleDeg===0||angleDeg===180?0:Math.sin(angle);
    const cosine=angleDeg===90?0:Math.cos(angle);
    return {moment:m,mx:m*sine,mz:m*cosine,torqueY:-m*b*sine,energy:-m*b*cosine};
  }
  return {EPS0,MU0,MASK,wire,ampere,coil,gauge,dipole};
});
