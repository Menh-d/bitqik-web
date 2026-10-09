(() => {
  const layer = document.createElement('div');
  layer.className = 'scroll-coin-scene';
  layer.setAttribute('aria-hidden', 'true');
  const symbols = {
    btc: '<text x="50" y="70" text-anchor="middle" font-size="65" font-family="Arial,sans-serif" font-weight="bold">₿</text>',
    eth: '<path d="M50 9 26 50 50 64 74 50Z"/><path d="m26 56 24 35 24-35-24 14Z" opacity=".8"/><path d="M50 9v55l24-14Z" fill="#080808" opacity=".25"/>',
    usdt: '<path d="M28 19h44v12H56v13c16 .7 27 4 27 8s-11 7.3-27 8v22H44V60c-16-.7-27-4-27-8s11-7.3 27-8V31H28Zm16 29c-11 .5-19 2-19 4s11 4 25 4 25-2 25-4-8-3.5-19-4v6H44Z"/>'
  };
  // Circular marquee: independent orbits keep moving while the page is still.
  const field = document.createElement('div');
  field.className = 'crypto-orbit-background';
  field.setAttribute('aria-hidden', 'true');
  const tokens = [
    ['btc','BTC','₿'],['eth','ETH','Ξ'],['usdt','USDT','₮'],
    ['sol','SOL','≋'],['bnb','BNB','⟐'],['xrp','XRP','X'],
    ['ada','ADA','⠿'],['doge','DOGE','Ð'],['link','LINK','⬡'],
    ['dot','DOT','●'],['ltc','LTC','Ł'],['avax','AVAX','▲']
  ];
  [8,12,16].forEach((count,ringIndex) => {
    const orbit = document.createElement('div');
    orbit.className = `crypto-orbit orbit-track-${ringIndex}`;
    for(let i=0;i<count;i++) {
      const [type,ticker,symbol] = tokens[(i+ringIndex*3)%tokens.length];
      const angle = (i/count)*Math.PI*2 + ringIndex*.24;
      const anchor = document.createElement('div');
      anchor.className = 'orbit-token-anchor';
      anchor.style.left = `${50+Math.cos(angle)*50}%`;
      anchor.style.top = `${50+Math.sin(angle)*50}%`;
      anchor.style.setProperty('--token-delay',`${-i*2.7-ringIndex}s`);
      anchor.style.setProperty('--token-turn',`${i*17}deg`);
      anchor.innerHTML = `<div class="orbit-token"><svg viewBox="0 0 100 100" focusable="false">${symbols[type] || `<text x="50" y="69" text-anchor="middle" font-size="58" font-family="Arial,sans-serif">${symbol}</text>`}</svg><span>${ticker}</span></div>`;
      orbit.append(anchor);
    }
    field.append(orbit);
  });
  document.body.prepend(field);
  // Avoid spending rendering work while the browser tab is hidden.
  function pauseBackground() { field.classList.toggle('orbit-paused',document.hidden); }
  document.addEventListener('visibilitychange',pauseBackground);
  pauseBackground();
  const settings = [
    {type:'btc',label:'BITCOIN',x:-18,y:24,spin:1,tilt:-20,roll:-24},
    {type:'eth',label:'ETHEREUM',x:23,y:-30,spin:-.85,tilt:25,roll:22},
    {type:'usdt',label:'TETHER · USDT',x:12,y:36,spin:.7,tilt:-16,roll:-15}
  ];
  settings.forEach(item => {
    const wrap = document.createElement('div');
    wrap.className = `scroll-coin-anchor coin-${item.type}`;
    wrap.innerHTML = `<div class="scroll-coin">${Array.from({length:11},(_,i)=>`<div class="coin-edge" style="transform:translateZ(${i*2-10}px)"></div>`).join('')}${['front','back'].map(side=>`<div class="coin-face coin-${side}"><div class="coin-rim"><span class="coin-inscription">${item.label}</span><svg viewBox="0 0 100 100" focusable="false">${symbols[item.type]}</svg><span class="coin-engraving">DIGITAL ASSET • BITQIK</span></div></div>`).join('')}</div>`;
    layer.append(wrap);
    item.element = wrap.querySelector('.scroll-coin');
  });
  document.body.append(layer);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = 0;
  function paint() {
    pending = 0;
    const scroll = reduced.matches ? 0 : window.scrollY;
    settings.forEach((item,i) => {
      const drift = Math.sin(scroll/1100+i)*38;
      const turn = scroll*.13*item.spin;
      item.element.style.transform = `translate3d(0,${reduced.matches?0:drift}px,0) rotateX(${item.x+Math.sin(scroll/1500)*10}deg) rotateY(${item.y+turn}deg) rotateZ(${item.roll+turn*.18}deg)`;
    });
  }
  function schedule() { if (!pending) pending = requestAnimationFrame(paint); }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  reduced.addEventListener('change',schedule);
  paint();
})();
