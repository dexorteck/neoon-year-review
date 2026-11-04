// Consolidate the narrative before initialising slide navigation.
const mainDeck=document.querySelector('main');
const annual=document.querySelector('#balanco-anual');
const impact=document.querySelector('#impacto');
annual.append(impact.querySelector('.big-stats article:first-child'));
annual.lastElementChild.classList.add('annual-community');
impact.querySelector('.big-stats')?.remove();
const work=document.querySelector('#trabalho');
const comparison=document.querySelector('#conteudo');
const comparisonBlock=document.createElement('div');comparisonBlock.className='embedded-comparison';
while(comparison.firstChild)comparisonBlock.append(comparison.firstChild);
work.append(comparisonBlock);comparison.remove();
document.querySelector('#evolucao-marca')?.remove();
document.querySelector('#melhorar')?.remove();document.querySelector('#plano')?.remove();
const cardsForWebsite=document.querySelector('#cards-opportunity');cardsForWebsite.hidden=true;document.body.append(cardsForWebsite);
const archive=document.querySelector('#arquivo');
const slideOrder=['balanco-anual','impacto','trabalho','designs','accountability','website-investment','connected-neoon','arquivo'];
slideOrder.forEach(id=>mainDeck.append(document.getElementById(id)));
document.querySelector('.chapter-index').innerHTML=slideOrder.map((id,i)=>`<a href="#${id}" aria-label="Slide ${i+1}"></a>`).join('');
const slides=[...document.querySelectorAll('main > section')];
let savedSlideId='';
try{savedSlideId=sessionStorage.getItem('neoon-current-slide')||''}catch{}
let slideIndex=Math.max(0,slides.findIndex(slide=>slide.id===savedSlideId)),transitioning=false;
function saveSlidePosition(){try{sessionStorage.setItem('neoon-current-slide',slides[slideIndex].id)}catch{}}
addEventListener('pagehide',saveSlidePosition);
const controls=document.createElement('div');controls.className='slide-controls';controls.innerHTML='<button class="slide-prev" aria-label="Slide anterior">←</button><span class="slide-position" aria-live="polite"></span><button class="slide-next" aria-label="Slide seguinte">→</button>';
document.body.append(controls);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function syncSlides(){slides.forEach((s,i)=>{s.classList.toggle('slide-active',i===slideIndex);s.inert=i!==slideIndex;s.setAttribute('aria-hidden',String(i!==slideIndex))});controls.querySelector('.slide-position').textContent=`${String(slideIndex+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;controls.querySelector('.slide-prev').disabled=slideIndex===0;controls.querySelector('.slide-next').disabled=slideIndex===slides.length-1;document.querySelectorAll('.chapter-index a').forEach((a,i)=>a.classList.toggle('current',i===slideIndex));document.title=`Neoon Space · ${slides[slideIndex].querySelector('h2')?.innerText.replaceAll('\n',' ')||'Apresentação'}`}
async function goToSlide(next){if(transitioning||next<0||next>=slides.length||next===slideIndex)return;transitioning=true;const old=slides[slideIndex],incoming=slides[next],forward=next>slideIndex;const directions=[[100,0],[0,100],[-100,0]];let [x,y]=directions[(forward?next:slideIndex)%directions.length];if(!forward){x=-x;y=-y}incoming.classList.add('slide-active');incoming.inert=false;incoming.scrollTop=0;incoming.style.zIndex='2';const duration=reducedMotion.matches?0:650;await Promise.all([old.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${-x}%,${-y}%)`,opacity:.25}],{duration,easing:'cubic-bezier(.65,0,.25,1)'}).finished,incoming.animate([{transform:`translate(${x}%,${y}%)`,opacity:.25},{transform:'translate(0,0)',opacity:1}],{duration,easing:'cubic-bezier(.65,0,.25,1)'}).finished]);incoming.style.zIndex='';slideIndex=next;syncSlides();transitioning=false}
controls.querySelector('.slide-prev').onclick=()=>goToSlide(slideIndex-1);controls.querySelector('.slide-next').onclick=()=>goToSlide(slideIndex+1);
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.closest('input,textarea,select'))return;if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();goToSlide(slideIndex+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();goToSlide(slideIndex-1)}if(e.key==='Home'){e.preventDefault();goToSlide(0)}if(e.key==='End'){e.preventDefault();goToSlide(slides.length-1)}});
document.querySelectorAll('.chapter-index a').forEach((a,i)=>a.onclick=e=>{e.preventDefault();goToSlide(i)});
document.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.closest('.chapter-index'))return;a.addEventListener('click',e=>{const target=slides.findIndex(s=>`#${s.id}`===a.getAttribute('href'));if(target>=0){e.preventDefault();goToSlide(target)}})});
let touchStart;document.querySelector('main').addEventListener('touchstart',e=>{touchStart=[e.changedTouches[0].clientX,e.changedTouches[0].clientY]},{passive:true});document.querySelector('main').addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart[0],dy=e.changedTouches[0].clientY-touchStart[1];if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)goToSlide(slideIndex+(dx<0?1:-1));touchStart=null},{passive:true});
syncSlides();
const visualStyles=document.createElement('link');visualStyles.rel='stylesheet';visualStyles.href='proposal-visuals.css';document.head.append(visualStyles);
const visualScript=document.createElement('script');visualScript.src='proposal-visuals.js';visualScript.onload=()=>{const caption=document.querySelector('.orbit-center small');if(caption)caption.innerHTML=['Explore.','Play.','Book.','Buy.'].map((word,i)=>`<span style="--step:${i}">${word}</span>`).join(' ')};document.body.append(visualScript);
const englishScript=document.createElement('script');englishScript.src='english.js';document.body.append(englishScript);
const editorialStyles=document.createElement('link');editorialStyles.rel='stylesheet';editorialStyles.href='editorial.css';document.head.append(editorialStyles);
const atmosphereStyles=document.createElement('link');atmosphereStyles.rel='stylesheet';atmosphereStyles.href='atmosphere.css';document.head.append(atmosphereStyles);
const depthStyles=document.createElement('link');depthStyles.rel='stylesheet';depthStyles.href='atmosphere-depth.css';document.head.append(depthStyles);
Promise.all([new Promise(resolve=>{if(document.querySelector('.orbit-center'))resolve();else visualScript.addEventListener('load',resolve,{once:true})}),new Promise(resolve=>englishScript.addEventListener('load',resolve,{once:true}))]).then(()=>{const editorialScript=document.createElement('script');editorialScript.src='editorial.js';document.body.append(editorialScript)});
