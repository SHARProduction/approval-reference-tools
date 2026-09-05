export const evaluators={
  'approval-matrix-builder': i=>{const seen=new Set(),issues=[];for(const [n,s]of(i.stages||[]).entries()){if(!s.name||!s.owner||!s.deadline)issues.push({stage:n+1,issue:'missing required field'});if(seen.has(s.name))issues.push({stage:n+1,issue:'duplicate stage'});seen.add(s.name)}return{valid:(i.stages||[]).length>0&&!issues.length,issues,matrix:(i.stages||[]).map((s,n)=>({order:n+1,...s}))}},
  'reference-manifest-validator': i=>{const fields=['id','intent','source','scope','rightsStatus'];const issues=(i.references||[]).flatMap((r,n)=>fields.filter(f=>!r[f]).map(field=>({reference:n+1,field})));return{valid:(i.references||[]).length>0&&!issues.length,issues,rightsReady:(i.references||[]).filter(r=>r.rightsStatus==='cleared').map(r=>r.id)}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
