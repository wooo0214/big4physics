/* Approximate answers stay visible beside a specified reference and its limits. */
(function(root){'use strict';const R=root.QM1Renderer,{num}=R;
  function model(id,p,M){if(id==='QM8.1')return M.perturb(p.g,p.gap);if(id==='QM8.2')return M.degenerate(p.a,p.b,p.beta,p.lambda,p.gap,p.coupling);if(id==='QM8.3')return M.variational(p.width,p.depth,p.point);return M.transition(p.g,p.nu,p.time,p.allowed===0?1:0);}
  function metrics(id,p,M){const f=model(id,p,M);if(id==='QM8.1')return [['精确 E₋',num(f.exact,'eV')],['二阶 E₋',num(f.second,'eV')],['小参数 |g/Δ|',num(f.small)]];
    if(id==='QM8.2')return [['子块一阶修正 [eV]',f.eigen.map(x=>num(x)).join(' / ')],['外耦合造成的最大偏差',num(f.error,'eV')],['隔离子空间比值',num(f.small)]];
    if(id==='QM8.3')return [['高斯 E试/(ℏω)',num(f.energy)],['裸半经典指数',num(f.exponent)],['倒抛物线精确T',num(f.transmission)]];
    return [['一阶概率（不裁剪）',num(f.first)],['完整两态数值概率',num(f.numeric)],['微扰可靠性提示',f.reliable?'弱耦合、小概率；仍需对照误差':'谨慎：未满足本页弱耦合且小概率阈值']];}
  function table(id,p,M){const f=model(id,p,M);let rows;if(id==='QM8.1')rows=[['绝对误差 [eV]',num(f.absolute)],['相对误差',num(f.relative)],['精确高能根 [eV]',num(f.upper)],['误差判据','本例|g/Δ|≪1；图中同时展示失效区，不据此接受近似'],['g=0','相对误差未定义，绝对误差0']];
    else if(id==='QM8.2')rows=[['旋转后直接取对角元 [eV]',f.naive.map(x=>num(x)).join(' / ')],['完整3×3能量 [eV]',f.reference.map(e=>num(e.value)).join(' / ')],['选+修正好态方向角 [rad]',num(f.goodAngle)],['子块到外部最小能隙 [eV]',num(f.separation)],['外耦合/最小能隙',num(f.small)],['比较说明','λv=0时子块结果精确；有限外耦合会有高阶偏差']];
    else if(id==='QM8.3')rows=[['变分超出精确基态',num(f.error)],['最优s/ℓ',num(f.optimum)],['禁区作用量：解析 / 数值',num(f.action)+' / '+num(f.numericAction)],['转折点 ξ=±',num(f.turn)],['当前禁区κ',num(f.kappa)],['局域 |κ′|/κ²',num(f.adiabatic)],['裸指数相对误差',num(f.relative)],['参考与边界','倒抛物线全局模型；并非任意平滑势垒的通用精确T']];
    else rows=[['一阶复振幅',R.complex(f.amplitude)],['一阶与参考绝对差',num(f.error)],['数值总概率范数',num(f.norm)],['数值最大范数残差',num(f.residual)],['参考积分步长 Δτ',num(f.step)],['参考与截断','四阶龙格—库塔；曲线线性插值，当前时刻另行积分至指定终点；不重归一化'],['可靠性提示阈值','仅以有效耦合g<0.1且当前P一阶<0.1作保守提醒，不是误差证明'],['选择定则与外推','禁戒是预设零矩阵元；E1规则还需偏振。21厘米M1、自发率及碰撞未计算']];return {headers:['核验量','数值 / 说明'],rows};}
  function draw(ctx,id,p,M,palette){const f=model(id,p,M),{chart,matrix,text}=R.tools(ctx,palette);
    if(id==='QM8.1'){chart(0,'耦合增大时的能量','g/Δ','E₋/Δ',-1.5,1.5,[{label:'精确',fn:r=>M.perturb(r,1).exact},{label:'二阶',fn:r=>-r*r}]);chart(1,'同一展开的绝对误差','|g/Δ|','|误差|/Δ',0,1.5,[{label:'误差',fn:r=>M.perturb(r,1).absolute}]);}
    else if(id==='QM8.2'){matrix(0,'当前记账基中的 PVP [eV]',f.rotated.map(row=>row.map(x=>[p.lambda*x,0])));chart(1,'更换基：错误对角元与本征值','初始基旋转 β [rad]','一阶能移 [eV]',0,Math.PI,[{label:'直接对角元',fn:b=>p.lambda*(p.a*Math.cos(2*b)+p.b*Math.sin(2*b))},{label:'正确+根',fn:()=>f.eigen[1]},{label:'正确−根',fn:()=>f.eigen[0]}]);}
    else if(id==='QM8.3'){chart(0,'独立练习A：高斯变分上界','s/ℓ（位置标准差）','E/(ℏω)',.25,2,[{label:'E试',fn:s=>1/(8*s*s)+s*s/2},{label:'精确基态',fn:()=>.5}]);chart(1,'独立练习B：倒抛物线势垒','ε=(V顶−E)/(ℏΩ)','透射率',0,2,[{label:'裸指数',fn:e=>Math.exp(-2*Math.PI*e)},{label:'精确T',fn:e=>1/(1+Math.exp(2*Math.PI*e))}],{min:0,max:1});text('当前采样ξ='+num(p.point)+'；转折点±'+num(f.turn),440,325,10);}
    else{chart(0,'有限时间：近似与数值参考','τ=ω₀t','末态概率',0,20,[{label:'一阶',fn:f.perturbative},{label:'数值参考',fn:f.reference}],{min:0});const spectrum=nu=>{const half=p.time/2,a=root.QM1Physics.C.scale(root.QM1Physics.C.exp((1+nu)*half),p.time*M.sinc((1+nu)*half)),b=root.QM1Physics.C.scale(root.QM1Physics.C.exp((1-nu)*half),p.time*M.sinc((1-nu)*half));return root.QM1Physics.C.abs2(root.QM1Physics.C.scale(root.QM1Physics.C.add(a,b),p.allowed===0?p.g/2:0));};chart(1,'当前时长的一阶频率响应','ν=ω/ω₀','一阶概率（不裁剪）',0,2.5,[{label:'一阶响应',fn:spectrum}],{min:0});text('当前τ='+num(p.time)+'；P接近或超过1时微扰失效',43,325,10);}
  }
  root.QM8Renderer={model,metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
