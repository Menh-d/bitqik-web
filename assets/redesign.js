// Preserve existing controls while composing the reference-inspired landing page.
const heroGrid = document.querySelector('#hero > .max-w-7xl > .grid');
const intro = heroGrid.children[0];
intro.classList.add('hero-intro');
heroGrid.children[1].classList.add('legacy-device');
const stage = document.createElement('div');
stage.className = 'trading-stage';
stage.innerHTML = `<article class="showcase-card market-preview"><div class="preview-label">Markets <span>↗ View all</span></div>${[['₿','Bitcoin','BTC','$68,450.20'],['Ξ','Ethereum','ETH','$3,627.47'],['◎','Solana','SOL','$158.79']].map(([icon,name,symbol,price])=>`<a href="#market" class="preview-market-row"><b class="coin-symbol">${icon}</b><div><strong>${name}</strong><small>${symbol}</small></div><svg viewBox="0 0 80 30" aria-hidden="true"><path d="M0 24L8 18L15 22L23 10L31 16L40 8L48 14L56 4L64 12L72 8L80 2"/></svg><div class="preview-price">${price}<small>+2.84%</small></div></a>`).join('')}<p class="preview-note">Market preview · USDT</p></article><article class="showcase-card balance-preview tv-market-card" id="live-crypto-card"><div class="preview-label">Crypto Market <span>TradingView</span></div><div class="tv-symbol-tabs" role="group" aria-label="Select cryptocurrency"><button type="button" data-tv-symbol="btc" aria-pressed="true" class="selected">BTC</button><button type="button" data-tv-symbol="eth" aria-pressed="false">ETH</button><button type="button" data-tv-symbol="usdt" aria-pressed="false">USDT</button></div><div class="tv-chart-area"><div class="tv-chart-host"></div><div class="tv-chart-fallback" hidden><p>ບໍ່ສາມາດໂຫຼດກຣາຟໄດ້</p><button type="button" class="tv-retry">ລອງໃໝ່</button><a class="tv-open-chart" target="_blank" rel="noopener noreferrer">ເປີດ TradingView ↗</a></div></div><div class="tv-feed-footer"><span class="tv-feed-status" role="status">Loading chart…</span><span class="tv-quote-unit">USDT</span></div></article>`;
stage.append(document.getElementById('hero-swap'));
heroGrid.append(stage);
const trust = intro.lastElementChild;
if (trust !== stage && trust.id !== 'hero-swap') { trust.classList.add('hero-trust'); heroGrid.append(trust); }
const styleLink = document.createElement('link');styleLink.rel='stylesheet';styleLink.href='./assets/redesign.css';document.head.append(styleLink);

const newsSectionTitle = document.querySelector('#announcements h2');
const newsMore = document.createElement('a');newsMore.href='./news.html';newsMore.className='news-section-link';newsMore.textContent='ເບິ່ງຂ່າວທັງໝົດ / All News ↗';newsSectionTitle.parentElement.append(newsMore);
