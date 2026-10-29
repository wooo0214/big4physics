/* Two quantitative panels and independent audit table; curves use stated scales.
 * Renderers have no persistence side effects. Day-theme labels stay black.
 */
(function(root){'use strict';
  function model(id,p,M){return M.model(id,p);}
  function metrics(id,p,M){return model(id,p,M).metrics;}
  function table(id,p,M){return {headers:['核验量 / 条件','当前值 / 约定'],rows:model(id,p,M).rows};}
  function draw(ctx,id,p,M,palette){const f=model(id,p,M),{chart,C,text}=root.QM1Renderer.tools(ctx,palette);f.plots.forEach((g,i)=>{const axes=chart(i,g.title,g.xlabel,g.ylabel,g.min,g.max,g.series,g.options);if(g.options.marker){const [x,y]=g.options.marker;ctx.beginPath();ctx.arc(axes.px(x),axes.py(y),4,0,2*Math.PI);ctx.fillStyle=C.gold;ctx.fill();text('金点：当前参数',i===0?64:462,327,10);}if(g.options.vertical){const [x,a,b]=g.options.vertical;ctx.beginPath();ctx.moveTo(axes.px(x),axes.py(a));ctx.lineTo(axes.px(x),axes.py(b));ctx.strokeStyle=C.green;ctx.lineWidth=3;ctx.stroke();text('竖线：当前等容路径',64,327,10);}});}
  root.TS3Renderer={model,metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
