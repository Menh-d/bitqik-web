(() => {
  const header=document.getElementById('mainHeader');if(!header)return;
  const links=[...header.querySelectorAll('[data-nav-item]')];
  const button=document.getElementById('mobileMenuBtn');const drawer=document.getElementById('mobileDrawer');
  const sections=[...header.querySelectorAll('.neon-menu a[href^="#"]')].map(a=>({name:a.dataset.navItem,element:document.querySelector(a.getAttribute('href'))})).filter(s=>s.element);
  let frame=0,lockedUntil=0;
  function select(name){links.forEach(link=>{const active=link.dataset.navItem===name;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}
  function track(){frame=0;if(performance.now()<lockedUntil)return;const threshold=header.getBoundingClientRect().height+innerHeight*.2;let active='home';for(const section of sections){if(section.element.getBoundingClientRect().top<=threshold)active=section.name}select(active)}
  function schedule(){if(!frame)frame=requestAnimationFrame(track)}
  links.forEach(link=>link.addEventListener('click',()=>{if(!link.getAttribute('href').startsWith('#'))return;select(link.dataset.navItem);lockedUntil=performance.now()+800;drawer.classList.add('hidden');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','ເປີດເມນູ')}));
  new MutationObserver(()=>{const open=!drawer.classList.contains('hidden');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'ປິດເມນູ':'ເປີດເມນູ')}).observe(drawer,{attributes:true,attributeFilter:['class']});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!drawer.classList.contains('hidden')){drawer.classList.add('hidden');button.setAttribute('aria-expanded','false');button.focus()}});
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});window.addEventListener('hashchange',schedule);schedule();
})();
