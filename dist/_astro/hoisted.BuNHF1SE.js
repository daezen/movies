function o(t,a){return(a||document).querySelector(t)}const l=(t,a,e,n)=>{t.addEventListener(a,e,!!n)},v=(t,a,e,n)=>{t.removeEventListener(a,e,!!n)},d={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGI1NDAxZjVmNGZkMjRiOTJkYmMyOGVkYmJmMWU5MyIsInN1YiI6IjY1ZjVmYTgwODFkYTM5MDE4NjYxNTJjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3UWDsNuJsyGQ_UQSFZ7Hkq0UqcvOMmQwwKpVnE_8jaw"}},u="https://image.tmdb.org/t/p/",p={sm:"w300",md:"w780",lg:"w1280",og:"original"};function h(t,a){return u+p[a||"md"]+t}const s=o("input"),i={$:o("[data-results]"),hide(){this.$.style.display="none"},show(){this.$.removeAttribute("style")}};async function f(t){const a=await fetch(`https://api.themoviedb.org/3/search/movie?query=${t}&include_adult=false&language=en-US&page=1`,d),{results:e}=await a.json();g(e)}async function m(){if(s.value==="")return i.hide();await f(s.value)}function g(t){const a=o("[data-results]");a.innerHTML=null,t=t?.filter(e=>e.backdrop_path&&e.hasOwnProperty("release_date")&&e.release_date!==""),t.forEach(e=>{const n=h(e.backdrop_path,"sm"),r=new Date(e.release_date).getFullYear(),c=`
              <div class="text-base h-36 flex gap-4 mb-4">
                <div class="h-full aspect-video rounded-lg overflow-hidden flex-initial">
                  <img src="${n}" alt="Movie poster" loading="lazy" class="h-full w-full" />
                </div>
                <div class="w-3/5">
                  <p class="truncate">${e.original_title}</p>
                  <p class="font-light text-zinc-300">${r}</p>
                </div>
              </div>`;a.insertAdjacentHTML("beforeend",c)}),i.show()}function y(t,a=400){let e;return(...n)=>{clearTimeout(e),e=setTimeout(()=>{t.apply(this,n)},a)}}const w=y(()=>m());l(s,"input",w);export{l as $,v as a,d as o,o as q};
