// Continuous visual demo, independent of the editable swap controls.
(() => {
  const stage = document.querySelector('.trading-stage');
  if (!stage) return;
  const ns = 'http://www.w3.org/2000/svg';
  const graph = stage.querySelector('.balance-graph');
  const area = graph.querySelector('path');
  const line = graph.querySelector('path:last-child');
  line.classList.add('simulation-line');
  line.removeAttribute('pathLength');
  const dot = document.createElementNS(ns, 'circle');
  dot.setAttribute('r','3.5'); dot.setAttribute('fill','#ffb58c');
  dot.classList.add('simulation-cursor'); graph.append(dot);
  const balance = stage.querySelector('.balance-value');
  const gain = stage.querySelector('.balance-bottom b');
  stage.querySelector('.preview-note').textContent = 'Market simulation · USDT';
  stage.querySelector('.balance-bottom span').textContent = 'Portfolio simulation';
  const markets = [...stage.querySelectorAll('.preview-market-row')].map((row,i) => {
    const price = row.querySelector('.preview-price');
    const label = document.createElement('span');
    label.className='simulation-price'; price.firstChild.replaceWith(label);
    const marker = document.createElementNS(ns, 'circle');
    marker.setAttribute('r','2');marker.setAttribute('fill','#ff9965');
    row.querySelector('svg').append(marker);
    return {path:row.querySelector('path'),marker,label,change:price.querySelector('small'),base:[68450.2,3627.47,158.79][i]};
  });
  const flow = document.createElement('div');flow.className='exchange-simulation';
  flow.innerHTML=`<div class="simulation-caption"><span><i></i> Exchange simulation</span><span class="simulation-step">Matching</span></div><svg viewBox="0 0 300 44" aria-hidden="true"><path class="exchange-track" d="M38 22H262"/><path class="exchange-dashes" d="M38 22H262"/><circle class="exchange-packet" r="3" cy="22"/><circle class="exchange-packet" r="3" cy="22"/><circle class="exchange-packet" r="3" cy="22"/><circle class="exchange-end" cx="22" cy="22" r="17"/><circle class="exchange-end" cx="278" cy="22" r="17"/><text x="22" y="27" text-anchor="middle">₭</text><text x="278" y="27" text-anchor="middle">₿</text></svg>`;
  const swap = stage.querySelector('#hero-swap');
  swap.insertBefore(flow,swap.lastElementChild);
  const packets = [...flow.querySelectorAll('.exchange-packet')];
  const step = flow.querySelector('.simulation-step');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false,frame=0,last=0,time=0,painted=-1,lastTick=-1;
  const money = new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  function curve(width,height,count,t,phase) {
    return Array.from({length:count},(_,i) => {
      const progress=i/(count-1);
      const wave=Math.sin(i*1.28+t*.8+phase)*height*.12+Math.sin(i*.62-t*.55+phase)*height*.07;
      return [progress*width,height*(.77-progress*.52)+wave];
    });
  }
  function path(points) {
    let d=`M${points[0][0]},${points[0][1]}`;
    for(let i=1;i<points.length;i++) {
      const a=points[i-1],b=points[i],dx=(b[0]-a[0])/2;
      d+=` C${a[0]+dx},${a[1]} ${b[0]-dx},${b[1]} ${b[0]},${b[1]}`;
    }
    return d;
  }
  function draw(t) {
    const points=curve(320,125,25,t,0),d=path(points),end=points[points.length-1];
    line.setAttribute('d',d);area.setAttribute('d',`${d} V130 H0Z`);
    dot.setAttribute('cx',end[0]);dot.setAttribute('cy',end[1]);
    markets.forEach((market,i)=>{
      const pts=curve(80,30,12,t,i*2);market.path.setAttribute('d',path(pts));
      market.marker.setAttribute('cx',80);market.marker.setAttribute('cy',pts[pts.length-1][1]);
    });
    packets.forEach((packet,i)=>packet.setAttribute('cx',38+((t*.25+i/3)%1)*224));
    flow.querySelector('.exchange-dashes').style.strokeDashoffset=String(-t*12);
    const tick=Math.floor(t);
    if(tick!==lastTick) {
      lastTick=tick;
      markets.forEach((market,i)=>{
        const change=Math.sin(t*.55+i)*.0012+Math.sin(t*.18+i)*.0008;
        market.label.textContent='$'+money.format(market.base*(1+change));
        market.change.textContent=`+${(2.84+change*100).toFixed(2)}%`;
        market.label.classList.toggle('tick-down',Math.cos(t*.55+i)<0);
      });
      const amount=15475+Math.sin(t*.4)*28+Math.sin(t*.15)*15;
      const [whole,cents]=money.format(amount).split('.');
      balance.replaceChildren(document.createTextNode('$'+whole));
      const fraction=document.createElement('span');fraction.textContent='.'+cents+' USD';balance.append(fraction);
      gain.textContent=`↗ +${(12.8+Math.sin(t*.4)*.2).toFixed(1)}%`;
      step.textContent=['Matching','Converting','Confirmed'][Math.floor(t/2)%3];
    }
  }
  function loop(now) {
    frame=0;
    if(!visible||document.hidden||reduced.matches){last=0;return;}
    if(last)time+=Math.min(now-last,100);last=now;
    if(now-painted>=33){draw(time/1000);painted=now;}
    frame=requestAnimationFrame(loop);
  }
  function sync() {
    if(frame)cancelAnimationFrame(frame);frame=0;last=0;
    if(visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(loop);
    if(reduced.matches)draw(0);
  }
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:0}).observe(stage);
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  draw(0);
})();
