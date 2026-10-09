(() => {
  const root=document.documentElement;
  function apply(theme){
    const dark=theme!=='light';root.dataset.theme=dark?'dark':'light';root.classList.toggle('dark',dark);root.style.colorScheme=dark?'dark':'light';
    const button=document.getElementById('themeToggle');
    if(button){button.setAttribute('aria-checked',String(dark));button.title=dark?'Switch to Light mode':'Switch to Dark mode';button.querySelector('.theme-switch-label').textContent=dark?'Dark':'Light'}
  }
  let saved='dark';try{saved=localStorage.getItem('theme')||'dark'}catch{}
  apply(saved);
  document.addEventListener('DOMContentLoaded',()=>{
    apply(root.dataset.theme);
    document.getElementById('themeToggle')?.addEventListener('click',()=>{
      const next=root.dataset.theme==='dark'?'light':'dark';apply(next);
      try{localStorage.setItem('theme',next)}catch{}
      document.dispatchEvent(new CustomEvent('bitqik:themechange',{detail:next}));
    });
  });
  window.addEventListener('storage',event=>{if(event.key==='theme'){apply(event.newValue||'dark');document.dispatchEvent(new CustomEvent('bitqik:themechange',{detail:root.dataset.theme}))}});
})();
