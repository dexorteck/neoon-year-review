const slideTitles={
'balanco-anual':['01 / YEAR IN REVIEW','Year in review',''],
'impacto':['02 / PERFORMANCE','Digital performance',''],
'trabalho':['03 / OUR WORK','Our work',''],
'designs':['04 / CREATIVE WORK','Creative portfolio',''],
'accountability':['05 / ACCOUNTABILITY','Service improvements',''],
'website-investment':['06 / NEXT INVESTMENT','Less friction.','More bookings.'],
'connected-neoon':['07 / CONNECTED NEOON','One Neoon.','Connected.'],
'arquivo':['08 / DOCUMENTATION','Monthly reports','']
};
const seasonalActivation=document.createElement('div');seasonalActivation.className='seasonal-activation';seasonalActivation.innerHTML=`<div class="seasonal-heading"><span class="micro-label">NEXT YEAR / SEASONAL PHOTO MOMENTS</span><h3>Step in · Snap · Tag Neoon</h3><p>Seasonal photo boards: guests pose, take a photo and tag Neoon Space.</p></div><div class="seasonal-posters">${[['Easter','pascoa'],['Summer','verao'],['Halloween','halloween'],['Christmas','natal']].map(([season,file],i)=>`<figure><button type="button" data-poster="assets/poster_${file}.png" aria-label="Enlarge ${season} photo board concept"><img src="assets/poster_${file}.png" alt="${season} face-in-hole photo board concept for Neoon Space" loading="lazy"></button><figcaption><span>0${i+1}</span>${season}${i===0?'<small>START HERE</small>':''}</figcaption></figure>`).join('')}</div><div class="seasonal-cycle"><span>FOUR SEASONS · STARTING AT EASTER</span><p>Easter <b>→</b> Summer <b>→</b> Halloween <b>→</b> Christmas</p></div><p class="meeting-note">Display Neoon’s handle. Track tagged posts and Story mentions.</p>`;
document.querySelector('#connected-neoon').append(seasonalActivation);seasonalActivation.querySelectorAll('[data-poster]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.querySelector('#viewer');dialog.querySelector('img').src=button.dataset.poster;dialog.querySelector('img').alt=button.querySelector('img').alt;dialog.showModal()}));
const protocolLink=document.createElement('a');protocolLink.className='protocol-link';protocolLink.href='reports/operating-protocol.pdf';protocolLink.target='_blank';protocolLink.rel='noopener';protocolLink.innerHTML='<span>OPERATING PROTOCOL</span> View the full document <span aria-hidden="true">↗</span>';document.querySelector('#trabalho .services').after(protocolLink);
const productionVideos=document.createElement('div');productionVideos.className='production-videos';productionVideos.innerHTML='<div class="video-heading"><span>AFTER / VIDEO PRODUCTION</span><h3>Produced by our team</h3></div><div class="production-grid">'+[1,2,3].map(n=>`<figure><video controls playsinline preload="metadata" aria-label="Neoon Space video production ${n}"><source src="assets/videos/after/video-${n}.mp4" type="video/mp4">Your browser does not support video playback.</video><figcaption>NEOON SPACE <span>0${n} / ORIGINAL PRODUCTION</span></figcaption></figure>`).join('')+'</div>';document.querySelector('.embedded-comparison').append(productionVideos);
const beforeVideo=document.createElement('div');beforeVideo.className='before-video-example';beforeVideo.innerHTML='<div class="video-heading"><span>BEFORE / VIDEO CONTENT</span><h3>Before our collaboration</h3></div><figure><video controls playsinline preload="metadata" aria-label="Neoon Space video before our collaboration"><source src="assets/videos/before/video-1.mp4" type="video/mp4">Your browser does not support video playback.</video><figcaption>Original content published before our collaboration</figcaption></figure>';productionVideos.prepend(beforeVideo);
const beforeVideoGrid=document.createElement('div');beforeVideoGrid.className='before-video-grid';beforeVideoGrid.append(beforeVideo.querySelector('figure'));beforeVideoGrid.insertAdjacentHTML('beforeend','<figure><video controls playsinline preload="metadata" aria-label="Karaoke promotional video before our collaboration"><source src="assets/videos/before/video-2.mp4" type="video/mp4">Your browser does not support video playback.</video><figcaption>Karaoke promotion before our collaboration</figcaption></figure>');beforeVideo.append(beforeVideoGrid);
beforeVideoGrid.insertAdjacentHTML('beforeend','<figure><video controls playsinline preload="metadata" aria-label="Date night promotional video before our collaboration"><source src="assets/videos/before/video-3.mp4" type="video/mp4">Your browser does not support video playback.</video><figcaption>Date night promotion before our collaboration</figcaption></figure>');
const originalVideos=[...productionVideos.querySelectorAll('video')];originalVideos.forEach(video=>video.addEventListener('play',()=>originalVideos.forEach(other=>{if(other!==video)other.pause()})));
const afterVideoColumn=document.createElement('div');afterVideoColumn.className='after-video-column';afterVideoColumn.append(productionVideos.querySelector(':scope > .video-heading'),productionVideos.querySelector('.production-grid'));
const videoComparisonArrow=document.createElement('span');videoComparisonArrow.className='video-comparison-arrow';videoComparisonArrow.textContent='→';videoComparisonArrow.setAttribute('aria-hidden','true');productionVideos.append(videoComparisonArrow,afterVideoColumn);productionVideos.classList.add('side-by-side-videos');
new MutationObserver(()=>{if(!document.querySelector('#trabalho').classList.contains('slide-active'))originalVideos.forEach(video=>video.pause())}).observe(document.querySelector('#trabalho'),{attributes:true,attributeFilter:['class']});
Object.entries(slideTitles).forEach(([id,[label,first,second]])=>{const section=document.getElementById(id);section.querySelector('.section-top span:first-child').textContent=label;const title=section.querySelector('h2');title.classList.add('editorial-heading');title.innerHTML=`<span class="heading-primary">${first}</span><span class="heading-accent">${second}</span>`});
const conciseText={
'A different way':'Before.','to show Neoon.':'After.',
'Selected examples. Click an image to view it in detail.':'Selected work · click to enlarge.',
'Selected designs produced throughout the collaboration. Select a piece to view it in detail.':'Selected designs · click to explore.',
'SEO improvements and growing interest in the brand have supported organic discovery and attracted people looking for Neoon Space experiences.':'SEO improvements and growing brand interest supported organic discovery.',
'In approximately one year of collaboration. This growth exceeds the entire audience at the start, according to the team’s review.':'More followers gained in one year than Neoon had when we started.',
'Some things should have worked better.':'We identified the gaps.','Here is what is now in place.':'We put clear processes in place.',
'Reports by the 10th. A shifted ad reporting period is delivered separately, keeping the rest on schedule.':'Reports by the 10th. Delayed ad data follows separately.',
'Priorities and scripts confirmed before shoots. One named contact and revised timelines when dependencies cause delays.':'Approved priorities and scripts. One contact. Clear updates when timelines change.',
'Monday, Wednesday and Friday. Five hours per full working week, with priority handling and outstanding messages carried forward.':'Five support hours per full working week. Scheduled checks and follow-up on outstanding emails.',
'Documented in our operating protocol':'Built into our operating protocol',
'Customers reach the cart but do not always complete their purchase. A simpler journey can help recover that intent.':'Turn existing purchase intent into completed bookings with fewer steps.',
'Evaluate Shopify with an integrated booking app: room capacity, time slots, payments, bundles and recurring costs must fit Neoon’s operation.':'Shopify + integrated bookings. Validate capacity, time slots, payments and costs before migrating.',
'Video-led discovery → clear availability → simple checkout':'Discover → choose → book',
'15 Neoon Cards sold in October.':'15 cards sold in October.',
'Not added to website sales totals.':'Included separately in this breakdown.',
'A tap. An honest review.':'Tap. Share your experience.',
'Branded NFC cards at the counters open the Google review page. A brief staff invitation makes feedback easier, without rewards or a preselected rating.':'NFC cards open Google reviews with a tap. Staff invite honest feedback, without incentives or a preselected rating.',
'Useful content, simple purchases and genuine feedback can strengthen visibility. More visits alone do not guarantee Google rankings.':'Useful content. Easier purchases. Genuine reviews. Visits alone do not guarantee Google rankings.'
};
const textWalker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);let textNode;while(textNode=textWalker.nextNode()){const value=textNode.textContent.trim();if(conciseText[value])textNode.textContent=textNode.textContent.replace(value,conciseText[value])}
document.querySelectorAll('.embedded-comparison h2').forEach(h=>{h.innerHTML='Before <span class="inline-arrow">→</span> After';h.classList.add('comparison-title')});
document.querySelector('.embedded-cards h2').innerHTML='Neoon Cards';
document.querySelector('.voucher-stack')?.remove();
document.querySelector('.search-heading h3').textContent='Search visibility';
document.querySelectorAll('main h2,main h3').forEach(heading=>{heading.querySelectorAll('br').forEach(br=>br.replaceWith(' '))});
document.querySelectorAll('.chapter-index a').forEach((a,i)=>a.setAttribute('aria-label',Object.values(slideTitles)[i].slice(1).join(' ')));
