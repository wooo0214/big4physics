/* Ideal one-dimensional oscillator. n starts at zero; xi=x/ell,
 * ell=sqrt(hbar/(m omega)), tau=omega*t. UI omega is in 10^15 rad/s.
 * Analytic states retain their full-line normalization, including plot tails.
 */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./qm1-physics.js'):root.QM1Physics);if(typeof module==='object'&&module.exports)module.exports=api;root.QM5Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(Q){
  'use strict';
  function integer(n,lo,hi){if(!Number.isInteger(n)||n<lo||n>hi)throw new RangeError('Integer outside model domain.');}
  function phi(n,x){integer(n,0,80);Q.finite(x);let a=Math.exp(-x*x/2)/Math.PI**.25;if(n===0)return a;let b=Math.SQRT2*x*a;for(let k=1;k<n;k++){const c=Math.sqrt(2/(k+1))*x*b-Math.sqrt(k/(k+1))*a;a=b;b=c;}return b;}
  function scales(omega){Q.positive(omega);const w=omega*1e15,ell=Math.sqrt(Q.HBAR/(Q.MASS*w));return {w,ell,quantum:Q.HBAR*w/Q.EV};}
  function eigen(n,omega){integer(n,0,40);const s=scales(omega),turn=Math.sqrt(2*n+1),end=turn+5,density=x=>phi(n,x)**2;
    return {...s,n,turn,end,psi:x=>phi(n,x),density,energy:(n+.5)*s.quantum,kinetic:(n+.5)*s.quantum/2,sigmaX:s.ell*Math.sqrt(n+.5),sigmaP:Q.HBAR/s.ell*Math.sqrt(n+.5),norm:Q.integrate(density,-end,end,2400)};}
  function ladder(n,k,operator){integer(n,0,5);integer(k,0,5);integer(operator,0,1);const N=6;
    const element=(i,j)=>operator===0?[(i===j-1?Math.sqrt(j/2):0)+(i===j+1?Math.sqrt((j+1)/2):0),0]:[0,(i===j+1?Math.sqrt((j+1)/2):0)-(i===j-1?Math.sqrt(j/2):0)];
    const matrix=Array.from({length:N},(_,i)=>Array.from({length:N},(_,j)=>element(i,j)));
    // Independent wavefunction integral: p/(hbar/ell)=-i d/dxi.
    const integral=Q.integrate(x=>phi(k,x)*(operator===0?x*phi(n,x):-((n?Math.sqrt(n/2)*phi(n-1,x):0)-Math.sqrt((n+1)/2)*phi(n+1,x))),-10,10,2400);
    const value=element(k,n),numeric=operator===0?[integral,0]:[0,integral];
    return {matrix,value,numeric,commutator:Array.from({length:N},(_,i)=>Array.from({length:N},(_,j)=>[i===j?(i===N-1?1-N:1):0,0])),raising:Math.sqrt(n+1),lowering:Math.sqrt(n),outside:n===N-1};}
  function coherent(re,im,tau,omega,cutoff){Q.finite(re,im,tau);integer(cutoff,0,40);const s=scales(omega),a=Q.C.mul([re,im],Q.C.exp(-tau)),meanX=Math.SQRT2*a[0],meanP=Math.SQRT2*a[1],meanN=re*re+im*im;
    let probability=Math.exp(-meanN),retained=probability;const weights=[probability];for(let n=1;n<=cutoff;n++){probability*=meanN/n;weights.push(probability);retained+=probability;}
    const density=x=>Math.exp(-((x-meanX)**2))/Math.sqrt(Math.PI),end=6+Math.SQRT2*Math.hypot(re,im);
    return {...s,meanX,meanP,meanN,energy:s.quantum*(meanN+.5),density,end,weights,retained,omitted:Math.max(0,1-retained),sigmaX:s.ell/Math.SQRT2,sigmaP:Q.HBAR/(s.ell*Math.SQRT2),windowMissing:Math.max(0,1-Q.integrate(density,-end,end,1600))};}
  function correspondence(n,bins){integer(n,0,40);integer(bins,6,60);const A=Math.sqrt(2*n+1),density=y=>A*phi(n,A*y)**2,classic=y=>Math.abs(y)>=1?null:1/(Math.PI*Math.sqrt(1-y*y)),cdf=y=>.5+Math.asin(Math.max(-1,Math.min(1,y)))/Math.PI,width=3/bins;
    const edges=Array.from({length:bins+1},(_,i)=>-1.5+i*width);
    const boxes=Array.from({length:bins},(_,i)=>{const lo=edges[i],hi=edges[i+1];return {lo,hi,quantum:Q.integrate(density,lo,hi,160),classic:cdf(hi)-cdf(lo)};});
    const binned=(y,key)=>{const i=Math.min(bins-1,Math.floor((y+1.5)/width));return i<0||y>1.5?0:boxes[i][key]/width;};
    return {A,density,classic,boxes,width,binned,distance:boxes.reduce((s,b)=>s+Math.abs(b.quantum-b.classic),0),retained:boxes.reduce((s,b)=>s+b.quantum,0),outside:1-Q.integrate(density,-1,1,3200)};}
  return {phi,scales,eigen,ladder,coherent,correspondence};
});
