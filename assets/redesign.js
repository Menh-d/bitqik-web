// Preserve existing controls while composing the reference-inspired landing page.
const heroGrid = document.querySelector('#hero > .max-w-7xl > .grid');
const intro = heroGrid.children[0];
intro.classList.add('hero-intro');
heroGrid.children[1].classList.add('legacy-device');
const stage = document.createElement('div');
stage.className = 'trading-stage';
stage.innerHTML = `<article class="showcase-card market-preview"><div class="preview-label">Markets <span>↗ View all</span></div>${[['₿','Bitcoin','BTC','$68,450.20'],['Ξ','Ethereum','ETH','$3,627.47'],['◎','Solana','SOL','$158.79']].map(([icon,name,symbol,price])=>`<a href="#market" class="preview-market-row"><b class="coin-symbol">${icon}</b><div><strong>${name}</strong><small>${symbol}</small></div><svg viewBox="0 0 80 30" aria-hidden="true"><path d="M0 24L8 18L15 22L23 10L31 16L40 8L48 14L56 4L64 12L72 8L80 2"/></svg><div class="preview-price">${price}<small>+2.84%</small></div></a>`).join('')}<p class="preview-note">Market preview · USDT</p></article><article class="showcase-card balance-preview"><div class="preview-label">bit<span style="color:#ff6a2b">qik</span><span>◈ &nbsp; ⌁</span></div><div class="balance-tabs"><b>Overview</b><span>Portfolio</span><span>Activity</span></div><p class="balance-caption">Total balance</p><div class="balance-value">$15,475<span>.00 USD</span></div><svg class="balance-graph" viewBox="0 0 320 130" aria-hidden="true"><defs><linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ff6a2b" stop-opacity=".3"/><stop offset="1" stop-color="#ff6a2b" stop-opacity="0"/></linearGradient></defs><path d="M0 110 C20 110 15 65 35 80 S60 110 75 55 S95 90 110 60 S135 85 150 35 S170 65 185 45 S210 65 230 20 S255 55 275 25 S300 40 320 8 V130 H0Z" fill="url(#balanceFill)"/><path d="M0 110 C20 110 15 65 35 80 S60 110 75 55 S95 90 110 60 S135 85 150 35 S170 65 185 45 S210 65 230 20 S255 55 275 25 S300 40 320 8" fill="none" stroke="#ff7947" stroke-width="2.5"/></svg><div class="balance-bottom"><span>Portfolio preview</span><b>↗ +12.8%</b></div></article>`;
stage.append(document.getElementById('hero-swap'));
heroGrid.append(stage);
const trust = intro.lastElementChild;
if (trust !== stage && trust.id !== 'hero-swap') { trust.classList.add('hero-trust'); heroGrid.append(trust); }
const styleLink = document.createElement('link');styleLink.rel='stylesheet';styleLink.href='./assets/redesign.css';document.head.append(styleLink);

// Normalize the trace length so the line draws smoothly at every screen size.
document.querySelector(".balance-graph > path:last-child").setAttribute("pathLength", "1");
// Dedicated news destination, visible in desktop and mobile navigation.
const newsNav = document.createElement('a');
newsNav.href='./news.html';newsNav.className='news-nav-highlight';newsNav.innerHTML='<span class="news-nav-dot"></span> News <span class="news-nav-badge">NEW</span>';
document.querySelector('#mainHeader nav').append(newsNav);
const mobileNews = newsNav.cloneNode(true);document.getElementById('mobileDrawer').prepend(mobileNews);
const newsSectionTitle = document.querySelector('#announcements h2');
const newsMore = document.createElement('a');newsMore.href='./news.html';newsMore.className='news-section-link';newsMore.textContent='ເບິ່ງຂ່າວທັງໝົດ / All News ↗';newsSectionTitle.parentElement.append(newsMore);
