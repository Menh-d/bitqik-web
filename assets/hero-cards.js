// Bitqik Hero 3-Card Stage: Live Realtime Markets, TradingView Chart, and Exchange Simulation
(() => {
  // 1. Markets & Simulation
  const stage = document.querySelector('.hero__cards-stage');
  if (!stage) return;

  const ns = 'http://www.w3.org/2000/svg';
  const markets = [...stage.querySelectorAll('.preview-market-row')].map((row, i) => {
    const priceBox = row.querySelector('.preview-price-box');
    const label = priceBox ? priceBox.querySelector('.simulation-price') : null;
    const change = priceBox ? priceBox.querySelector('.simulation-change') : null;
    const svg = row.querySelector('svg');
    const path = svg ? svg.querySelector('path') : null;
    let marker = null;
    if (svg) {
      marker = document.createElementNS(ns, 'circle');
      marker.setAttribute('r', '2.5');
      marker.setAttribute('fill', '#ff7a1a');
      marker.setAttribute('filter', 'drop-shadow(0 0 4px #ff6600)');
      svg.append(marker);
    }
    return {
      path,
      marker,
      label,
      change,
      base: [68450.20, 3627.47, 158.79][i] || 100
    };
  });

  const packets = [...stage.querySelectorAll('.exchange-packet')];
  const step = stage.querySelector('.simulation-step');
  const dashes = stage.querySelector('.exchange-dashes');

  function curve(width, height, count, t, phase) {
    return Array.from({ length: count }, (_, i) => {
      const progress = i / (count - 1);
      const wave = Math.sin(i * 1.28 + t * 0.8 + phase) * height * 0.12 + Math.sin(i * 0.62 - t * 0.55 + phase) * height * 0.07;
      return [progress * width, height * (0.77 - progress * 0.52) + wave];
    });
  }

  function pathToD(points) {
    let d = `M${points[0][0]},${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const dx = (b[0] - a[0]) / 2;
      d += ` C${a[0] + dx},${a[1]} ${b[0] - dx},${b[1]} ${b[0]},${b[1]}`;
    }
    return d;
  }

  const money = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let lastTick = -1;

  function draw(t) {
    markets.forEach((market, i) => {
      if (market.path && market.marker) {
        const pts = curve(58, 22, 10, t, i * 2.2);
        market.path.setAttribute('d', pathToD(pts));
        market.marker.setAttribute('cx', '58');
        market.marker.setAttribute('cy', pts[pts.length - 1][1]);
      }
    });

    packets.forEach((packet, i) => {
      packet.setAttribute('cx', 38 + (((t * 0.28 + i / 3) % 1) * 224));
    });

    if (dashes) {
      dashes.style.strokeDashoffset = String(-t * 14);
    }

    const tick = Math.floor(t);
    if (tick !== lastTick) {
      lastTick = tick;
      markets.forEach((market, i) => {
        if (!market.label) return;
        const changeVal = Math.sin(t * 0.55 + i) * 0.0015 + Math.sin(t * 0.18 + i) * 0.001;
        const newPrice = market.base * (1 + changeVal);
        market.label.textContent = '$' + money.format(newPrice);
        const percentChange = (2.84 + changeVal * 100);
        if (market.change) {
          market.change.textContent = (percentChange >= 0 ? '+' : '') + percentChange.toFixed(2) + '%';
          market.change.classList.toggle('down', percentChange < 0);
        }
      });

      if (step) {
        step.textContent = ['Matching', 'Converting', 'Confirmed'][Math.floor(t / 2) % 3];
      }
    }
  }

  let time = 0;
  let last = 0;
  function loop(now) {
    if (last) time += Math.min(now - last, 100);
    last = now;
    draw(time / 1000);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // 2. Interactive Swap Calculation
  const payInput = document.getElementById('swapPayInput');
  const receiveInput = document.getElementById('swapReceiveInput');
  const btcRateLAK = 1492000000; // 1 BTC = ~1,492,000,000 LAK

  if (payInput && receiveInput) {
    payInput.addEventListener('input', () => {
      const val = parseFloat(payInput.value) || 0;
      receiveInput.value = (val / btcRateLAK).toFixed(6);
    });
  }

  // 3. TradingView Widget Integration for Card 2
  const tvCard = document.getElementById('live-crypto-card');
  if (!tvCard) return;

  const symbols = {
    btc: { symbol: 'BINANCE:BTCUSDT', ticker: 'BTCUSDT', exchange: 'BINANCE', unit: 'USDT' },
    eth: { symbol: 'BINANCE:ETHUSDT', ticker: 'ETHUSDT', exchange: 'BINANCE', unit: 'USDT' },
    sol: { symbol: 'BINANCE:SOLUSDT', ticker: 'SOLUSDT', exchange: 'BINANCE', unit: 'USDT' },
    usdt: { symbol: 'COINBASE:USDTUSD', ticker: 'USDTUSD', exchange: 'COINBASE', unit: 'USD' }
  };

  const host = tvCard.querySelector('.tv-chart-host');
  const fallback = tvCard.querySelector('.tv-chart-fallback');
  const status = tvCard.querySelector('.tv-feed-status');
  const unit = tvCard.querySelector('.tv-quote-unit');
  let active = 'btc';
  let timer = null;

  function renderTV(key) {
    active = key;
    const data = symbols[key];
    if (!data) return;

    clearTimeout(timer);
    if (fallback) fallback.hidden = true;
    if (host) host.hidden = false;
    if (status) status.textContent = 'TradingView · ' + data.exchange;
    if (unit) unit.textContent = data.unit;

    tvCard.querySelectorAll('[data-tv-symbol]').forEach(btn => {
      const isSel = btn.dataset.tvSymbol === key;
      btn.classList.toggle('selected', isSel);
      btn.setAttribute('aria-pressed', String(isSel));
    });

    const container = document.createElement('div');
    container.className = 'tradingview-widget-container';
    container.style.width = '100%';
    container.style.height = '100%';

    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    widget.style.width = '100%';
    widget.style.height = '100%';
    container.append(widget);

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.textContent = JSON.stringify({
      symbol: data.symbol,
      width: '100%',
      height: 250,
      locale: 'en',
      dateRange: '1D',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: false,
      largeChartUrl: '',
      chartOnly: false,
      noTimeScale: false,
      trendLineColor: 'rgba(255,102,0,1)',
      underLineColor: 'rgba(255,102,0,0.22)',
      underLineBottomColor: 'rgba(255,102,0,0)',
      lineWidth: 2
    });

    script.addEventListener('error', () => {
      if (fallback) fallback.hidden = false;
      if (host) host.hidden = true;
      if (status) status.textContent = 'Chart offline';
    });

    if (host) {
      host.replaceChildren(container);
      container.append(script);
    }
  }

  tvCard.querySelectorAll('[data-tv-symbol]').forEach(btn => {
    btn.addEventListener('click', () => {
      renderTV(btn.dataset.tvSymbol);
    });
  });

  // Initial render
  setTimeout(() => {
    renderTV('btc');
  }, 300);
})();
