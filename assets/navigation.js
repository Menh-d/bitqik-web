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

// One glass selection surface glides between items on hover, focus, or selection.
(() => {
  document.querySelectorAll('.neon-nav nav').forEach(menu => {
    const links=[...menu.querySelectorAll('.neon-nav-link')];
    if(!links.length)return;
    links.forEach((link,index)=>{
      const svg=link.querySelector('svg');
      const well=document.createElement('span');well.className='nav-icon-well';
      well.style.setProperty('--icon-delay',`${index*-.65}s`);
      svg.replaceWith(well);well.append(svg);
    });
    const slider=document.createElement('span');slider.className='nav-liquid-slider';slider.setAttribute('aria-hidden','true');menu.prepend(slider);
    let hovered=null,focused=null,scheduled=0;
    function move(){
      scheduled=0;
      const target=hovered||focused||links.find(link=>link.classList.contains('is-active'))||links[0];
      if(!menu.getClientRects().length)return;
      const rect=target.getBoundingClientRect(),parent=menu.getBoundingClientRect();
      slider.style.width=`${rect.width-6}px`;slider.style.height=`${rect.height-8}px`;
      slider.style.transform=`translate3d(${rect.left-parent.left+menu.scrollLeft+3}px,${rect.top-parent.top+menu.scrollTop+4}px,0)`;
      links.forEach(link=>link.classList.toggle('is-previewed',link===target));
      if(!menu.classList.contains('slider-ready'))requestAnimationFrame(()=>menu.classList.add('slider-ready'));
    }
    function schedule(){if(!scheduled)scheduled=requestAnimationFrame(move)}
    links.forEach(link=>{
      link.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'||event.pointerType==='pen'){hovered=link;schedule()}});
      link.addEventListener('focus',()=>{focused=link;schedule()});
      link.addEventListener('blur',()=>{focused=null;schedule()});
    });
    menu.addEventListener('pointerleave',()=>{hovered=null;schedule()});
    new MutationObserver(schedule).observe(menu,{attributes:true,subtree:true,attributeFilter:['aria-current']});
    new ResizeObserver(schedule).observe(menu);
    window.addEventListener('resize',schedule,{passive:true});
    if(document.fonts)document.fonts.ready.then(schedule);
    schedule();
  });
})();
