import{$ as a,q as l,a as c}from"./hoisted.jouYTmQ9.js";const u={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGI1NDAxZjVmNGZkMjRiOTJkYmMyOGVkYmJmMWU5MyIsInN1YiI6IjY1ZjVmYTgwODFkYTM5MDE4NjYxNTJjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3UWDsNuJsyGQ_UQSFZ7Hkq0UqcvOMmQwwKpVnE_8jaw"}};async function p(e){const o=await fetch(`https://api.themoviedb.org/3/movie/${e.target.id}/videos`,u),{results:n}=await o.json(),r=n.filter(t=>t.type=="Trailer");try{window.open(`https://youtu.be/${r[0].key}`,"_blank")}catch(t){console.log(t)}}a(l("[data-trailer]"),"click",p);const f=l("[data-carousels]"),h=2;let s,i={l:0,x:0};function y({target:e,pageX:o}){s=e.closest("[data-carousel]"),s!==null&&(i={l:s.scrollLeft,x:o-s.offsetLeft},a(document,"mousemove",m),a(document,"mouseup",d))}function m({pageX:e}){const n=(e-s.offsetLeft-i.x)*h;s.scrollLeft=i.l-n}function d(){c(document,"mousemove",m),c(document,"mouseup",d)}async function w(e){if(e.target.tagName!=="A")return;e.preventDefault();const o=await fetch(`https://api.themoviedb.org/3/movie/${e.target.id}/videos`,u),{results:n}=await o.json(),r=n.filter(t=>t.type=="Trailer");try{window.open(`https://youtu.be/${r[0].key}`,"_blank")}catch(t){console.log(t)}}a(f,"click",w);a(f,"mousedown",y);