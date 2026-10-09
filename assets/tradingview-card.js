// Embed TradingView's official data widget; never replace a failed feed with demo prices.
(() => {
  const card = document.getElementById('live-crypto-card');
  if (!card) return;
  const symbols = {
    btc: {symbol:'BINANCE:BTCUSDT',ticker:'BTCUSDT',exchange:'BINANCE',unit:'USDT'},
    eth: {symbol:'BINANCE:ETHUSDT',ticker:'ETHUSDT',exchange:'BINANCE',unit:'USDT'},
    usdt: {symbol:'COINBASE:USDTUSD',ticker:'USDTUSD',exchange:'COINBASE',unit:'USD'}
  };
  const host=card.querySelector('.tv-chart-host');
  const fallback=card.querySelector('.tv-chart-fallback');
  const status=card.querySelector('.tv-feed-status');
  const unit=card.querySelector('.tv-quote-unit');
  const open=card.querySelector('.tv-open-chart');
  let active='btc',generation=0,timer=null,observer=null;
  function render(key) {
    active=key;
    const data=symbols[key];const version=++generation;
    clearTimeout(timer);if(observer)observer.disconnect();
    fallback.hidden=true;host.hidden=false;
    status.textContent='Loading chart…';unit.textContent=data.unit;
    card.querySelectorAll('[data-tv-symbol]').forEach(button=>{
      const selected=button.dataset.tvSymbol===key;
      button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));
    });
    const url=`https://www.tradingview.com/symbols/${data.ticker}/?exchange=${data.exchange}`;
    open.href=url;
    const container=document.createElement('div');container.className='tradingview-widget-container';
    const widget=document.createElement('div');widget.className='tradingview-widget-container__widget';container.append(widget);
    const copyright=document.createElement('div');copyright.className='tradingview-widget-copyright';
    const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=data.ticker+' chart';
    copyright.append(link,document.createTextNode(' by TradingView'));container.append(copyright);
    function fail() {if(version!==generation)return;clearTimeout(timer);fallback.hidden=false;host.hidden=true;status.textContent='Chart unavailable';}
    observer=new MutationObserver(()=>{
      const iframe=container.querySelector('iframe');
      if(!iframe)return;
      observer.disconnect();iframe.title=`TradingView ${data.ticker} price chart`;
      iframe.addEventListener('load',()=>{
        if(version!==generation)return;
        clearTimeout(timer);fallback.hidden=true;host.hidden=false;
        status.textContent=`TradingView · ${data.exchange}`;
      },{once:true});
      iframe.addEventListener('error',fail,{once:true});
    });
    observer.observe(container,{childList:true,subtree:true});
    const script=document.createElement('script');script.async=true;
    script.src='https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.textContent=JSON.stringify({
      symbol:data.symbol,width:'100%',height:250,locale:'en',dateRange:'1D',colorTheme:'dark',
      isTransparent:true,autosize:false,noTimeScale:false,chartOnly:false,
      trendLineColor:'rgba(255,105,45,1)',underLineColor:'rgba(255,105,45,0.24)',
      underLineBottomColor:'rgba(255,105,45,0)',lineWidth:2,
      largeChartUrl:url
    });
    script.addEventListener('error',fail,{once:true});
    host.replaceChildren(container);container.append(script);
    timer=setTimeout(fail,20000);
  }
  card.querySelectorAll('[data-tv-symbol]').forEach(button=>button.addEventListener('click',()=>{if(active!==button.dataset.tvSymbol)render(button.dataset.tvSymbol)}));
  card.querySelector('.tv-retry').addEventListener('click',()=>render(active));
  render(active);
})();
