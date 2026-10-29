/* Oscillator figures retain raw density, plot-window and level-cutoff diagnostics. */
(function(root){'use strict';const R=root.QM1Renderer,{num,complex}=R;
  function model(id,p,M){if(id==='QM5.1')return M.eigen(p.n,p.omega);if(id==='QM5.2')return M.ladder(p.n,p.k,p.operator);if(id==='QM5.3')return M.coherent(p.re,p.im,p.tau,p.omega,p.cutoff);return M.correspondence(p.n,p.bins);}
  function metrics(id,p,M){const f=model(id,p,M);if(id==='QM5.1')return [['能量 Eₙ',num(f.energy,'eV')],['平均动能 ⟨T⟩',num(f.kinetic,'eV')],['波函数内部节点',String(p.n)]];
    if(id==='QM5.2')return [['所选矩阵元',complex(f.value)],['独立波函数积分',complex(f.numeric)],['完整梯子升阶系数',num(f.raising)]];
    if(id==='QM5.3')return [['⟨x⟩',num(f.meanX*f.ell/1e-9,'nm')],['⟨p⟩',num(f.meanP*root.QM1Physics.HBAR/f.ell,'kg·m/s')],['ΔxΔp/ℏ',num(.5)]];
    return [['箱宽 Δy',num(f.width)],['分箱概率L¹差',num(f.distance)],['转折点外量子概率',num(f.outside)]];}
  function table(id,p,M){const f=model(id,p,M);let rows;if(id==='QM5.1')rows=[['特征长度 ℓ [nm]',num(f.ell/1e-9)],['相邻能级差 [eV]',num(f.quantum)],['位置标准差 [nm]',num(f.sigmaX/1e-9)],['动量标准差 [kg·m/s]',num(f.sigmaP)],['转折点 ±x [nm]',num(f.turn*f.ell/1e-9)],['画窗积分 / 遗漏概率',num(f.norm)+' / '+num(Math.max(0,1-f.norm))],['⟨V⟩ [eV]',num(f.kinetic)]];
    else if(id==='QM5.2')rows=[['初态n / 末态k',p.n+' / '+p.k],['积分与代数差',complex(root.QM1Physics.C.sub(f.numeric,f.value))],['完整梯子降阶系数',num(f.lowering)],['显示能级', '0…5；矩阵元单位为ξ或π'],['最高层对易子', '−5；完整无限空间为1'],['截断提醒',f.outside?'a†|5⟩=√6|6⟩，|6⟩在图窗之外':'完整梯子没有最高能级']];
    else if(id==='QM5.3')rows=[['⟨N⟩ / Var(N)',num(f.meanN)+' / '+num(f.meanN)],['⟨H⟩ [eV]',num(f.energy)],['Δx [nm] / Δp [kg·m/s]',num(f.sigmaX/1e-9)+' / '+num(f.sigmaP)],['列出0…N原始权重和',num(f.retained)],['能级显示遗漏概率',num(f.omitted)],['解析高斯画窗遗漏',num(f.windowMissing)],['截断与左图','N只改变右图列出的能级，不截断解析高斯']];
    else rows=[['转折幅 A/ℓ',num(f.A)],['量子画窗概率 / 遗漏',num(f.retained)+' / '+num(Math.max(0,1-f.retained))],['分箱数 / 箱宽',p.bins+' / '+num(f.width)],['经典端点','可积发散；端点不取有限密度'],['比较边界','同能量、相同分箱；不声称逐点收敛或误差单调'],['数态时间行为','密度不随时间变化']];return {headers:['核验量','数值 / 说明'],rows};}
  function draw(ctx,id,p,M,palette){const f=model(id,p,M),{chart,matrix,text}=R.tools(ctx,palette);
    if(id==='QM5.1'){chart(0,'本征波函数与密度','ξ=x/ℓ','√ℓψ、ℓ|ψ|²',-f.end,f.end,[{label:'波函数',fn:f.psi},{label:'密度',fn:f.density}]);chart(1,'势能、能量和转折点','ξ=x/ℓ','E/(ℏω)',-f.turn*1.3,f.turn*1.3,[{label:'势能',fn:x=>x*x/2},{label:'当前能量',fn:()=>p.n+.5}]);}
    else if(id==='QM5.2'){matrix(0,p.operator===0?'ξ的位置矩阵':'π的动量矩阵',f.matrix);matrix(1,'有限截断 [a,a†]',f.commutator);}
    else if(id==='QM5.3'){chart(0,'相干高斯：宽度不变','ξ=x/ℓ','ℓ|ψ|²',-f.end,f.end,[{label:'当前',fn:f.density},{label:'基态',fn:x=>Math.exp(-x*x)/Math.sqrt(Math.PI)}]);chart(1,'原始泊松概率（阶梯引导）','激发数 n','Pₙ',-.5,Math.max(.5,p.cutoff+.5),[{label:'Pₙ',fn:x=>f.weights[Math.min(p.cutoff,Math.max(0,Math.floor(x+.5)))]}],{min:0});}
    else{chart(0,'原始密度：经典端点可积发散','y=x/A','概率密度 / dy',-1.5,1.5,[{label:'量子',fn:f.density},{label:'经典',fn:f.classic}]);chart(1,'同箱宽的区间概率比较','y=x/A','每箱概率 / Δy',-1.5,1.5,[{label:'量子',fn:y=>f.binned(y,'quantum')},{label:'经典',fn:y=>f.binned(y,'classic')}]);text('等宽分箱 Δy='+num(f.width)+'；未平滑原始曲线',44,325,10);}
  }
  root.QM5Renderer={model,metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
