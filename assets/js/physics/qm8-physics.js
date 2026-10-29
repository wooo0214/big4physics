/* Approximation laboratories. Energies in eV unless explicitly scaled.
 * The time-dependent reference integrates H/(hbar omega0)=[[0,g cos(nu*tau)],
 * [g cos(nu*tau),1]], with tau=omega0*t. No rotating-wave approximation,
 * damping, spontaneous emission, stochastic sampling or silent clipping of P1.
 */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./qm1-physics.js'):root.QM1Physics);if(typeof module==='object'&&module.exports)module.exports=api;root.QM8Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(Q){
  'use strict';const {C}=Q;
  function perturb(g,gap){Q.finite(g);Q.positive(gap);const radius=Math.hypot(gap,2*g),exact=-2*g*g/(gap+radius),second=-g*g/gap,absolute=Math.abs(second-exact);return {exact,second,absolute,relative:exact===0?null:absolute/Math.abs(exact),small:Math.abs(g/gap),upper:(gap+radius)/2};}
  function eigensymmetric(matrix){const n=matrix.length,a=matrix.map(r=>r.slice()),v=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));for(let iter=0;iter<80;iter++){let p=0,q=1,max=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(Math.abs(a[i][j])>max){p=i;q=j;max=Math.abs(a[i][j]);}if(max<1e-14)break;
      const angle=.5*Math.atan2(2*a[p][q],a[q][q]-a[p][p]),c=Math.cos(angle),s=Math.sin(angle),app=a[p][p],aqq=a[q][q],apq=a[p][q];a[p][p]=c*c*app-2*s*c*apq+s*s*aqq;a[q][q]=s*s*app+2*s*c*apq+c*c*aqq;a[p][q]=a[q][p]=0;for(let k=0;k<n;k++){if(k!==p&&k!==q){const x=a[k][p],y=a[k][q];a[k][p]=a[p][k]=c*x-s*y;a[k][q]=a[q][k]=s*x+c*y;}const x=v[k][p],y=v[k][q];v[k][p]=c*x-s*y;v[k][q]=s*x+c*y;}}
    return Array.from({length:n},(_,i)=>({value:a[i][i],vector:v.map(r=>r[i])})).sort((x,y)=>x.value-y.value);}
  function degenerate(a,b,beta,lambda,gap,coupling){Q.finite(a,b,beta,lambda,coupling);Q.positive(gap);if(lambda<0||coupling<0)throw new RangeError('Negative scale.');const c=Math.cos(beta),s=Math.sin(beta),V=[[a,b],[b,-a]],U=[[c,-s],[s,c]],rotated=U[0].map((_,i)=>U[0].map((_,j)=>U.reduce((sum,row,k)=>sum+row[i]*V[k].reduce((t,x,l)=>t+x*U[l][j],0),0))),radius=Math.hypot(a,b),eigen=[-lambda*radius,lambda*radius],full=[[lambda*a,lambda*b,lambda*coupling],[lambda*b,-lambda*a,0],[lambda*coupling,0,gap]],reference=eigensymmetric(full),separation=gap-lambda*radius;
    return {V,rotated,eigen,naive:[lambda*rotated[0][0],lambda*rotated[1][1]],full,reference,goodAngle:radius===0||lambda===0?null:.5*Math.atan2(b,a),small:separation>0?lambda*coupling/separation:null,separation,error:Math.max(...eigen.map((e,i)=>Math.abs(e-reference[i].value)))};}
  function variational(width,depth,point){Q.positive(width);Q.finite(depth,point);if(depth<0||depth>4)throw new RangeError('Barrier depth outside laboratory.');const energy=1/(8*width*width)+width*width/2,exact=.5,turn=Math.sqrt(2*depth),transmission=1/(1+Math.exp(2*Math.PI*depth)),exponent=Math.exp(-2*Math.PI*depth),inside=depth-point*point/2,kappa=inside>0?Math.sqrt(2*inside):null,adiabatic=kappa===null?null:Math.abs(point)/kappa**3;
    // Inverted parabola V-Vtop=-xi^2/2; epsilon=(Vtop-E)/(hbar Omega).
    // The forbidden-region action is pi*epsilon; the flux reference is exact
    // for the global inverted oscillator (arXiv:1302.1030, Eq. 1).
    const numericAction=depth===0?0:Q.integrate(t=>2*depth*Math.cos(t)**2,-Math.PI/2,Math.PI/2,800);
    return {energy,exact,error:energy-exact,optimum:1/Math.SQRT2,turn,transmission,exponent,relative:(exponent-transmission)/transmission,action:Math.PI*depth,numericAction,kappa,adiabatic,density:x=>Math.exp(-x*x/(2*width*width))/(Math.sqrt(2*Math.PI)*width)};}
  function sinc(x){return Math.abs(x)<1e-5?1-x*x/6+x**4/120:Math.sin(x)/x;}
  function transition(g,nu,time,allowed=1,steps=1600){Q.finite(g,nu,time);if(g<0||g>.5||nu<0||nu>2.5||time<0||time>20||![0,1].includes(allowed)||!Number.isInteger(steps)||steps<200)throw new RangeError('Outside driven model.');const coupling=g*allowed;
    const primitive=(frequency,t)=>C.scale(C.exp(frequency*t/2),t*sinc(frequency*t/2));
    const amplitude=t=>C.mul([0,-coupling/2],C.add(primitive(1+nu,t),primitive(1-nu,t))),perturbative=t=>C.abs2(amplitude(t));
    const h=20/steps,trajectory=[0],norms=[1];let state=[1,0,0,0];
    function rhs(t,y){const v=coupling*Math.cos(nu*t);return [v*y[3],-v*y[2],v*y[1]+y[3],-v*y[0]-y[2]];}
    function add(y,k,f){return y.map((x,i)=>x+f*k[i]);}
    for(let i=0;i<steps;i++){const t=i*h,k1=rhs(t,state),k2=rhs(t+h/2,add(state,k1,h/2)),k3=rhs(t+h/2,add(state,k2,h/2)),k4=rhs(t+h,add(state,k3,h));state=state.map((x,j)=>x+h*(k1[j]+2*k2[j]+2*k3[j]+k4[j])/6);trajectory.push(state[2]**2+state[3]**2);norms.push(state.reduce((s,x)=>s+x*x,0));}
    // Interpolate only the displayed curve. The selected-time reference uses a
    // step grid whose endpoint equals time, avoiding interpolation error there.
    function reference(t){const index=t/h,i=Math.min(steps-1,Math.floor(index)),f=index-i;return trajectory[i]*(1-f)+trajectory[i+1]*f;}
    let selected=[1,0,0,0];const count=Math.max(1,Math.ceil(time/h)),dt=time/count;for(let i=0;i<count;i++){const t=i*dt,k1=rhs(t,selected),k2=rhs(t+dt/2,add(selected,k1,dt/2)),k3=rhs(t+dt/2,add(selected,k2,dt/2)),k4=rhs(t+dt,add(selected,k3,dt));selected=selected.map((x,j)=>x+dt*(k1[j]+2*k2[j]+2*k3[j]+k4[j])/6);}
    const numeric=selected[2]**2+selected[3]**2,first=perturbative(time),norm=selected.reduce((s,x)=>s+x*x,0);
    return {first,numeric,norm,residual:Math.max(...norms.map(x=>Math.abs(x-1)),Math.abs(norm-1)),amplitude:amplitude(time),perturbative,reference,trajectory,step:h,error:Math.abs(first-numeric),reliable:first<.1&&coupling<.1};}
  return {perturb,eigensymmetric,degenerate,variational,sinc,transition};
});
