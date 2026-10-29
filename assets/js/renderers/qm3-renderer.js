/* Time is controlled explicitly; animation frames never stand for physical time. */
(function(root){'use strict';const R=root.QM1Renderer,{num,complex}=R;
  function model(id,p,M){if(id==='QM3.1')return M.stationary(p.theta,p.phase,p.tau,p.L,p.shift);if(id==='QM3.2')return M.oscillation(p.omega,p.time,p.detuning);if(id==='QM3.3')return M.current(p.kind,p.sigma,p.x0,p.k0,p.time,p.a,p.b);return M.pictures(p.theta,p.phase,p.omega,p.time,p.observable);}
  function metrics(id,p,M){const f=model(id,p,M);if(id==='QM3.1')return [['振荡周期',num(f.period*1e15,'fs')],['物理时间',num(f.time*1e15,'fs')],['⟨x⟩/L',num(f.meanX)]];
    if(id==='QM3.2')return [['P₀',num(f.p0)],['P₁',num(f.p1)],['P₀+P₁',num(f.p0+f.p1)]];
    if(id==='QM3.3')return [['区间概率 P',num(f.probability)],['独立积分 dP/dt',num(f.rate,'s⁻¹')],['边界 j(a)−j(b)',num(f.left-f.right,'s⁻¹')]];
    return [['薛定谔 ⟨A⟩',num(f.schrodinger)],['海森堡 ⟨A⟩',num(f.heisenberg)],['绘景差',num(f.schrodinger-f.heisenberg)]];}
  function table(id,p,M){const f=model(id,p,M);let rows;if(id==='QM3.1')rows=[['E₁占据 / E₂占据',num(f.p1)+' / '+num(f.p2)],['⟨H⟩ [eV]',num(f.meanEnergy)],['数值归一化',num(f.norm)],['共同能移 C/ΔE',num(p.shift)]];
    else if(id==='QM3.2')rows=[['最大P₁',num(f.maximum)],['广义角频率 [rad/s]',num(f.frequency)],['U†U',f.unitary.map(row=>row.map(complex).join(' , ')).join(' ; ')],['总概率残差',num(f.p0+f.p1-1)]];
    else if(id==='QM3.3')rows=[['模型边界',f.domain],['实际排序区间 [nm]',num(f.lo)+' → '+num(f.hi)],['j(a) [s⁻¹]',num(f.left)],['j(b) [s⁻¹]',num(f.right)],['dP/dt−j(a)+j(b) [s⁻¹]',num(f.residual)],['画窗[−4,4]nm遗漏概率',p.kind===0?num(1-root.QM1Physics.integrate(f.density,-4,4)): '0（完整硬壁区间 / 环）']];
    else rows=[['算符与H对易',p.omega===0?'H=0，与任意A对易':f.commutes?'是':'一般不对易'],['算符显含时间',f.explicit?'是：必须保留∂tA项':'否'],['Uψ分量',f.evolved.map(complex).join(' , ')],['结论边界','特殊态期望不变不证明算符对易']];return {headers:['核验量','数值 / 说明'],rows};}
  function draw(ctx,id,p,M,palette){const f=model(id,p,M),{chart,matrix}=R.tools(ctx,palette);
    if(id==='QM3.1'){chart(0,'同一τ下的位置分布','ξ=x/L','L|ψ|² [无量纲]',0,1,[{label:'当前',fn:f.density},{label:'初始',fn:root.QM1Physics.superposition(p.theta,p.phase).density}]);chart(1,'一个完整周期的位置均值','τ=ΔEt/ℏ [rad]','⟨x⟩/L',0,2*Math.PI,[{label:'位置均值',fn:x=>.5-32*Math.cos(p.theta)*Math.sin(p.theta)*Math.cos(p.phase-x)/(9*Math.PI**2)}],{min:0,max:1});}
    else if(id==='QM3.2'){chart(0,'占据随物理时间的精确演化','t [ps]','概率 [无量纲]',0,6,[{label:'P₀',fn:x=>M.oscillation(p.omega,x,p.detuning).p0},{label:'P₁',fn:x=>M.oscillation(p.omega,x,p.detuning).p1}],{min:0,max:1});matrix(1,'当前精确演化矩阵 U(t)',f.U);}
    else if(id==='QM3.3'){chart(0,'当前密度与排序区间','x [nm]','位置密度 [nm⁻¹]',-4,4,[{label:'密度',fn:f.density}],{shade:[f.lo,f.hi,f.density]});chart(1,'同一时刻的局部概率流','x [nm]','j [10¹² s⁻¹]',-4,4,[{label:'概率流',fn:x=>f.flow(x)/1e12}]);}
    else{matrix(0,'海森堡算符 AH(t)',f.AH);chart(1,'两种绘景的期望值','t [ps]','⟨A⟩ [无量纲]',0,6,[{label:'薛定谔',fn:x=>M.pictures(p.theta,p.phase,p.omega,x,p.observable).schrodinger},{label:'海森堡',fn:x=>M.pictures(p.theta,p.phase,p.omega,x,p.observable).heisenberg}],{min:-1,max:1});}
  }
  root.QM3Renderer={model,metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
