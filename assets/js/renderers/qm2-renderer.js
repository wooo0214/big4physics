/* Finite matrices and expectation scans use the same scales on both bases. */
(function(root){'use strict';const R=root.QM1Renderer,{num,complex}=R;
  function model(id,p,M){if(id==='QM2.1')return M.basis(p.theta,p.phase,p.beta,p.eta);if(id==='QM2.2')return M.measurement(p.theta,p.phase,p.kind,p.outcome);if(id==='QM2.3')return M.uncertainty(p.theta,p.phase,p.beta);return M.entanglement(p.theta,p.phase,p.alpha,p.beta);}
  function metrics(id,p,M){const f=model(id,p,M);if(id==='QM2.1')return [['原基 ⟨A⟩',num(f.before)],['新基 ⟨A′⟩',num(f.after)],['坐标范数',num(f.norm)]];
    if(id==='QM2.2')return [['结果概率和',num(f.probabilities.reduce((a,b)=>a+b,0))],['所选结果概率',num(f.probability)],['条件态',f.conditional?'已归一化':'零概率：未定义']];
    if(id==='QM2.3')return [['ΔAΔB',num(f.product)],['罗伯逊界',num(f.bound)],['含协方差强界',num(f.strong)]];
    return [['局域纯度 TrρA²',num(f.purity)],['纯态联合关联',num(f.correlation)],['经典混合关联',num(f.classical)]];}
  function table(id,p,M){const f=model(id,p,M);let rows;
    if(id==='QM2.1')rows=[...f.v.map((z,i)=>['c'+i+' → c′'+i,complex(z)+' → '+complex(f.transformed[i])]),['期望差',num(f.after-f.before)],['只改态保留仪器 ⟨A⟩',num(f.active)]];
    else if(id==='QM2.2')rows=[...f.probabilities.map((v,i)=>['本征值 '+f.eigenvalues[i]+' 的概率',num(v)]),...(f.conditional?f.conditional.map((v,i)=>['条件态 c'+i,complex(v)]):[['条件态','零概率结果：未定义']]),['ρ′说明','忽略结果；仅移除不同本征子空间间的相干']];
    else if(id==='QM2.3')rows=[['⟨A⟩ / ⟨B⟩',num(f.a)+' / '+num(f.b)],['ΔA / ΔB',num(f.da)+' / '+num(f.db)],['⟨[A,B]⟩',complex(f.comm)],['协方差',num(f.cov)],['乘积减简单界',num(f.product-f.bound)]];
    else rows=[...f.reduced.map((row,i)=>['约化ρA第'+i+'行',row.map(complex).join(' , ')]),['A侧 P(+1)',num(f.pPlusA)],['A侧均值（两种联合态相同）',num(f.marginal)],['关联差',num(f.correlation-f.classical)],['整体纯度（纯态 / 混合）','1 / '+num(f.purity)],['基序','整体00,01,10,11；局部0,1']];return {headers:['核验量（无量纲）','数值 / 说明'],rows};}
  function draw(ctx,id,p,M,palette){const f=model(id,p,M),{chart,matrix}=R.tools(ctx,palette);
    if(id==='QM2.1'){matrix(0,'原基中的算符 A',f.A);matrix(1,'新基中的同一算符 A′',f.operator);}
    else if(id==='QM2.2'){matrix(0,'测前密度矩阵 ρ',f.rho);matrix(1,'忽略结果后的 ρ′',f.nonselective);}
    else if(id==='QM2.3'){chart(0,'改变相对相位的方差乘积','δ [rad]','无量纲',0,2*Math.PI,[{label:'ΔAΔB',fn:x=>M.uncertainty(p.theta,x,p.beta).product},{label:'简单界',fn:x=>M.uncertainty(p.theta,x,p.beta).bound},{label:'强界',fn:x=>M.uncertainty(p.theta,x,p.beta).strong}],{min:0,max:1});chart(1,'当前态的单量标准差','B轴角 β [rad]','标准差 [无量纲]',0,Math.PI,[{label:'ΔA',fn:()=>f.da},{label:'ΔB',fn:x=>M.uncertainty(p.theta,p.phase,x).db}],{min:0,max:1});}
    else{matrix(0,'整体纯态 ρAB',f.rho,['00','01','10','11']);chart(1,'同局域统计，不同联合关联','B轴角 β [rad]','⟨A⊗B⟩ [无量纲]',0,Math.PI,[{label:'纯态',fn:x=>M.entanglement(p.theta,p.phase,p.alpha,x).correlation},{label:'经典混合',fn:x=>Math.cos(p.alpha)*Math.cos(x)}],{min:-1,max:1});}
  }
  root.QM2Renderer={model,metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
