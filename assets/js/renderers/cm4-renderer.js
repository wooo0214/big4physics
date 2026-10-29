/* CM4: two quantitative panels; axes retain physical or reduced units.
 * Shared plotting tools do no smoothing or interpolation of physical models.
 */
(function(root){
  'use strict';
  const format=x=>x===null?'未定义':typeof x==='number'?(Number.isFinite(x)?String(Number(x.toPrecision(6))):'未定义'):String(x);
  const model=(id,p,M)=>M.evaluate(id==='mechanics'?'CM2.2':id,p);
  function metrics(id,p,M){return model(id,p,M).metrics.map(([k,v])=>[k,format(v)]);}
  function table(id,p,M){return {headers:['核验量 / 单位','结果与模型约定'],rows:model(id,p,M).rows.map(([k,v])=>[k,format(v)])};}
  function scatter(ctx,g,panel,tools){const {text,line,C}=tools,left=panel===0?64:462,top=84,w=292,h=181,points=g.points.concat(g.otherPoints||[]),xs=points.map(x=>x[0]),ys=points.map(x=>x[1]),xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=Math.min(...ys),ymax=Math.max(...ys),dx=Math.max(xmax-xmin,1),dy=Math.max(ymax-ymin,1),lo=xmin-.08*dx,hi=xmax+.08*dx,bottom=ymin-.08*dy,upper=ymax+.08*dy,px=x=>left+w*(x-lo)/(hi-lo),py=y=>top+h*(upper-y)/(upper-bottom);text(g.title,left-24,23,13);text(g.y,left-24,69,11);text(g.x,left+w-145,307,11);for(let i=0;i<=4;i++){const x=lo+(hi-lo)*i/4,y=bottom+(upper-bottom)*i/4;line(px(x),top,px(x),top+h);line(left,py(y),left+w,py(y));text(String(Number(x.toPrecision(3))),px(x)-10,285,10);text(String(Number(y.toPrecision(3))),left-47,py(y)+3,10);}const sets=[g.points,g.otherPoints||[]];sets.forEach((set,j)=>{ctx.fillStyle=j?C.purple:C.green;set.forEach(([x,y])=>{ctx.beginPath();ctx.arc(px(x),py(y),j?1.6:2.1,0,2*Math.PI);ctx.fill();});});text(g.otherPoints?'绿：初值一；紫：邻近初值；散点不连线':'固定驱动相位采样；散点不连线',left,46,10);}
  function draw(ctx,id,p,M,palette){const f=model(id,p,M),tools=root.QM1Renderer.tools(ctx,palette),{chart,text}=tools;f.plots.forEach((g,i)=>{if(g.kind==='scatter')scatter(ctx,g,i,tools);else chart(i,g.title,g.x,g.y,g.lo,g.hi,g.series,g.options||{});});if(f.notice)text(f.notice,65,326,10);}
  root.CM4Renderer={model,metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
