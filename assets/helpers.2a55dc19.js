const u=(r,t=250)=>{let e=!1,o=null;const n=()=>{if(o===null)return e=!1,null;r(...o),setTimeout(n,t),o=null};return(...s)=>{if(e)return o=s,null;r(...s),setTimeout(n,t),e=!0}},c=r=>{const t=e=>{e.code.toLowerCase()==="escape"&&r()};return document.addEventListener("keyup",t),()=>{document.removeEventListener("keyup",t)}},i=(r,t)=>{const e=o=>{let n=o.target;do{for(const s of r)if(n===s)return;n=n.parentNode}while(n);t()};return document.addEventListener("click",e),()=>{document.removeEventListener("click",e)}};export{i as c,c as e,u as t};
