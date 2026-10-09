(() => {
  const header=document.querySelector('.neon-nav');if(!header)return;
  const words={lo:{label:'ປະກາດ',read:'ເບິ່ງລາຍລະອຽດ',close:'ປິດ',more:'ອ່ານເພີ່ມ'},en:{label:'Announcement',read:'View details',close:'Close',more:'Read more'},th:{label:'ประกาศ',read:'ดูรายละเอียด',close:'ปิด',more:'อ่านเพิ่มเติม'}};
  const strip=document.createElement('div');strip.className='announcement-strip';strip.hidden=true;
  const trigger=document.createElement('button');trigger.type='button';trigger.className='announcement-trigger';trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls','announcement-dialog');
  const label=document.createElement('span');label.className='announcement-label';
  const title=document.createElement('span');title.className='announcement-title';
  const count=document.createElement('span');count.className='announcement-count';
  const cta=document.createElement('span');cta.className='announcement-cta';
  trigger.append(label,title,count,cta);strip.append(trigger);header.after(strip);
  const dialog=document.createElement('dialog');dialog.id='announcement-dialog';dialog.className='announcement-dialog';dialog.setAttribute('aria-labelledby','announcement-heading');
  const close=document.createElement('button');close.type='button';close.className='announcement-close';
  const heading=document.createElement('h2');heading.id='announcement-heading';
  const content=document.createElement('div');content.className='announcement-content';
  dialog.append(close,heading,content);document.body.append(dialog);
  let active=[];
  const lang=()=>words[document.documentElement.lang]?document.documentElement.lang:'lo';
  const local=value=>typeof value==='string'?value:(value?.[lang()]||value?.lo||value?.en||'');
  const visible=item=>item&&item.enabled!==false&&local(item.title).trim()&&(!item.startsAt||Date.parse(item.startsAt)<=Date.now())&&(!item.expiresAt||Date.parse(item.expiresAt)>Date.now());
  function render(){
    active=(Array.isArray(window.BITQIK_ANNOUNCEMENTS)?window.BITQIK_ANNOUNCEMENTS:[]).filter(visible);
    strip.hidden=!active.length;
    if(!active.length&&dialog.open)dialog.close();
    const dict=words[lang()];label.textContent=dict.label;title.textContent=active.length?local(active[0].title):'';
    count.textContent=active.length>1?`+${active.length-1}`:'';count.hidden=active.length<=1;
    cta.textContent=dict.read+' ↗';heading.textContent=dict.label;close.textContent=dict.close+' ×';
    content.replaceChildren();
    active.forEach(item=>{
      const article=document.createElement('article');const h=document.createElement('h3');h.textContent=local(item.title);article.append(h);
      const body=document.createElement('p');body.textContent=local(item.body);article.append(body);
      if(item.href){try{const url=new URL(item.href,location.href);if(['http:','https:'].includes(url.protocol)||(url.protocol==='file:'&&location.protocol==='file:')){const a=document.createElement('a');a.href=url.href;a.textContent=(local(item.linkLabel)||dict.more)+' ↗';article.append(a)}}catch{}}
      content.append(article);
    });
  }
  trigger.addEventListener('click',()=>{render();if(active.length)dialog.showModal()});
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
  document.addEventListener('bitqik:languagechange',render);
  window.updateBitqikAnnouncements=notices=>{window.BITQIK_ANNOUNCEMENTS=Array.isArray(notices)?notices:[];render()};
  render();setInterval(render,60000);
})();
