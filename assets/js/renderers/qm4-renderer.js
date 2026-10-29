/* Bound states and non-normalizable scattering states are shown separately. */
(function(root){'use strict';const R=root.QM1Renderer,{num,complex}=R;
  function model(id,p,M){if(id==='QM4.1')return M.bound(p.z0,p.a,p.level);if(id==='QM4.2')return M.step(p.ratio,p.V0);return M.barrier(p.ratio,p.d,p.V0);}
  function metrics(id,p,M){const f=model(id,p,M);if(id==='QM4.1')return [['束缚能 E',num(f.energyEv,'eV')],['束缚态总数',String(f.roots.length)],['阱外概率',num(f.tail)]];return [['反射率 R',num(f.R)],['透射率 T',num(f.T)],['通量和 R+T',num(f.R+f.T)]];}
  function table(id,p,M){const f=model(id,p,M);let rows;
    if(id==='QM4.1')rows=[['当前能级序号 / 宇称',f.selected+' / '+(f.even?'偶':'奇')+(f.clamped?'（请求序号不存在，已取最高可用态）':'')],['阱深 V₀ [eV]',num(f.depthEv)],...f.roots.map((v,i)=>['能级 '+i+' [eV] / 匹配残差',num(v.energyEv)+' / '+num(v.residual)]),['全实轴解析范数',num(f.norm)],['画窗遗漏概率',num(f.missing)],['画窗范围 x/a',num(-f.window)+' → '+num(f.window)],['阈值约定','E=0不计为束缚态']];
    else if(id==='QM4.2')rows=[['复反射幅 r',complex(f.r)],['复透射幅 t',complex(f.t)],['|t|²',num(root.QM1Physics.C.abs2(f.t))],['ℓ [nm]',num(f.lengthNm)],['R+T−1',num(f.residual)],['阈值/右侧解',f.threshold?'E=V₀，常数，T=0':p.ratio<1?'单一衰减解，T=0':'出射行波，T含波数比']];
    else rows=[['复反射幅 r',complex(f.r)],['右界面透射幅',complex(f.tBoundary)],['ℓ / 物理宽度 a [nm]',num(f.lengthNm)+' / '+num(p.d*f.lengthNm)],['左 / 垒内 / 右 j/j入',[f.flux(-1),f.flux(p.d/2),f.flux(p.d+1)].map(v=>num(v)).join(' / ')],['R+T−1',num(f.residual)],['三段最大 |j/j入−T|',num(Math.max(...[-1,p.d/2,p.d+1].map(x=>Math.abs(f.flux(x)-f.T)) ))],['ln T',num(f.logT)],...(id==='QM4.3'?[['κa',num(f.phase)],['厚垒近似 T',num(f.approx)],['厚垒近似相对误差',num(f.approxError)]]:[['qa',num(f.phase)],['能量扫描步长',num(p.resolution)],['第一共振 E/V₀',p.d===0?'无离散共振（零宽）':num(1+(Math.PI/p.d)**2)],['第二共振 E/V₀',p.d===0?'无离散共振（零宽）':num(1+(2*Math.PI/p.d)**2)]]),['阈值 T(E=V₀)',num(1/(1+p.d*p.d/4))]];
    return {headers:['核验量','数值 / 说明'],rows};}
  function draw(ctx,id,p,M,palette){const f=model(id,p,M),{chart,text,line,C}=R.tools(ctx,palette);
    if(id==='QM4.1'){
      chart(0,'归一化束缚态与衰减尾','u=x/a','√aψ / a|ψ|²',-f.window,f.window,[{label:'振幅',fn:f.psi},{label:'密度',fn:x=>f.psi(x)**2}]);
      // Plot the pole-free phase equation and the target for the selected branch.
      chart(1,'无极点的束缚根方程','z=ka','相位 [rad]',0,p.z0,[{label:'z+asin(z/z₀)',fn:x=>x+Math.asin(Math.min(1,x/p.z0))},{label:'目标相位',fn:()=>((f.selected+1)*Math.PI/2)}]);
    }else{
      const max=id==='QM4.2'?6:p.d+4;
      chart(0,'散射波：入射振幅设为1','s=x/ℓ','Reψ / Imψ [相对幅]',-4,max,[{label:'实部',fn:x=>f.psi(x)[0]},{label:'虚部',fn:x=>f.psi(x)[1]}]);
      if(id==='QM4.2')chart(1,'振幅与通量的区别','E/V₀','通量比 [无量纲]',.05,4,[{label:'R',fn:x=>M.step(x,p.V0).R},{label:'T',fn:x=>M.step(x,p.V0).T}],{min:0,max:1});
      else if(id==='QM4.3')chart(1,'跨三段核验恒定概率流','s=x/ℓ','j/j入 [无量纲]',-4,max,[{label:'局部通量',fn:f.flux},{label:'透射率',fn:()=>f.T}]);
      else{
        // Discrete samples only: do not connect over unresolved resonance peaks.
        const left=462,top=84,w=292,h=181;text('离散能量扫描：分辨率由控件指定',438,23,13);text('R、T [无量纲]',438,67,11);text('E/V₀',675,307,11);
        for(let j=0;j<=4;j++){line(left,top+j*h/4,left+w,top+j*h/4);text((1-j/4).toFixed(2),421,top+j*h/4+3,10);const x=1+7*j/4;text(x.toFixed(2),left+w*j/4-10,285,10);}
        for(let i=0;i<=Math.floor(7/p.resolution);i++){const x=1+i*p.resolution,v=M.barrier(x,p.d,p.V0);for(const [y,color] of [[v.R,C.green],[v.T,C.purple]]){ctx.beginPath();ctx.arc(left+w*(x-1)/7,top+h*(1-y),1.25,0,2*Math.PI);ctx.fillStyle=color;ctx.fill();}}
        line(left,43,left+14,43,C.green);text('R样点',left+18,47,10);line(left+105,43,left+119,43,C.purple);text('T样点',left+123,47,10);
      }
    }
  }
  root.QM4Renderer={model,metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
