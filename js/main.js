
// Per-page identity and smooth internal navigation
(function(){
 const file=(location.pathname.split("/").pop()||"index.html").replace(/\.html$/,"");
 const page=file==="index"?"home":file;
 document.body.classList.add("page-"+page,"page-enter");
 window.addEventListener("pageshow",()=>document.body.classList.remove("page-leave"));
 document.addEventListener("click",function(ev){
  const a=ev.target.closest("a[href]");
  if(!a||ev.defaultPrevented||ev.button!==0||ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey)return;
  const raw=a.getAttribute("href");
  if(!raw||raw.startsWith("#")||raw.startsWith("mailto:")||raw.startsWith("tel:")||a.hasAttribute("download")||(a.target&&a.target!=="_self"))return;
  const url=new URL(a.href,location.href);
  if(url.origin!==location.origin||(url.pathname===location.pathname&&url.search===location.search))return;
  ev.preventDefault();
  document.body.classList.add("page-leave");
  setTimeout(()=>location.href=url.href,260);
 });
})();

const products=[
{id:1,title:"مهتاب در باغ",composer:"کلود دبوسی",style:"امپرسیونیسم",level:"متوسط",pages:5,price:145000,tag:"پرفروش",desc:"قطعه‌ای لطیف با رنگ‌آمیزی هارمونیک و فضایی شاعرانه."},
{id:2,title:"والس بهاری",composer:"فردریک شوپن",style:"کلاسیک",level:"پیشرفته",pages:7,price:185000,tag:"منتخب",desc:"والسی پرتحرک با ملودی درخشان و ظرافت اجرایی."},
{id:3,title:"قدم‌های کوچک",composer:"PIANOT Studio",style:"آموزشی",level:"مبتدی",pages:3,price:85000,tag:"مناسب شروع",desc:"تمرینی ساده برای تقویت هماهنگی دو دست."},
{id:4,title:"رویای آبی",composer:"لودویکو اینائودی",style:"معاصر",level:"متوسط",pages:6,price:165000,tag:"جدید",desc:"ملودی مینیمال و آرام با الگوی همراهی تکرارشونده."},
{id:5,title:"رقص عروسک‌ها",composer:"پیتر چایکوفسکی",style:"کلاسیک",level:"متوسط",pages:4,price:125000,tag:"محبوب",desc:"قطعه‌ای بازیگوش و خوش‌ریتم برای نوازندگان متوسط."},
{id:6,title:"صبح روشن",composer:"PIANOT Selection",style:"آرامش‌بخش",level:"مبتدی",pages:4,price:110000,tag:"منتخب",desc:"ملودی ساده و دلنشین برای تمرین روزانه."},
{id:7,title:"شب‌های شهر",composer:"PIANOT Studio",style:"موسیقی فیلم",level:"پیشرفته",pages:8,price:210000,tag:"ویژه",desc:"تنظیمی سینمایی با بافتی پرجزئیات."},
{id:8,title:"باران آرام",composer:"یوهان پاخلبل",style:"باروک",level:"مبتدی",pages:5,price:95000,tag:"پیشنهاد ما",desc:"بازنویسی ساده‌شده با حفظ حال‌وهوای اثر."}];
const money=n=>new Intl.NumberFormat('fa-IR').format(n)+" تومان";
const read=k=>{try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function toast(t){let e=document.querySelector(".toast");if(!e){e=document.createElement("div");e.className="toast";document.body.appendChild(e)}e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}
function counts(){document.querySelectorAll("[data-cart-count]").forEach(e=>e.textContent=read("pianot_cart").length);document.querySelectorAll("[data-wish-count]").forEach(e=>e.textContent=read("pianot_wish").length)}
function addCart(id){let a=read("pianot_cart");if(!a.includes(id))a.push(id);write("pianot_cart",a);counts();toast("نت به سبد خرید اضافه شد")}
function toggleWish(id){let a=read("pianot_wish");a=a.includes(id)?a.filter(x=>x!==id):[...a,id];write("pianot_wish",a);counts();toast("علاقه‌مندی‌ها به‌روزرسانی شد");render("#wish-products",products.filter(p=>read("pianot_wish").includes(p.id)))}
function card(p){return `<article class="product-card"><button class="wish-btn ${read("pianot_wish").includes(p.id)?"active":""}" onclick="toggleWish(${p.id})">♡</button><a href="product.html?id=${p.id}"><div class="product-cover"><div class="sheet-art"><div class="eyebrow">PIANOT EDITION</div><div class="sheet-lines">♩ ♫ ♬<br>𝄞 ♬ ♩</div><div class="sheet-title">${p.title}</div></div></div></a><div class="product-info"><div class="product-meta">${p.tag} · ${p.level}</div><a href="product.html?id=${p.id}"><h3>${p.title}</h3></a><p>${p.composer}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="btn btn-small" onclick="addCart(${p.id})">افزودن +</button></div></div></article>`}
function render(sel,arr=products){let e=document.querySelector(sel);if(e)e.innerHTML=arr.map(card).join("")||'<div class="empty-state">موردی برای نمایش وجود ندارد.</div>'}
function init(){counts();render("#featured-products",products.slice(0,4));render("#product-list");render("#wish-products",products.filter(p=>read("pianot_wish").includes(p.id)));render("#cart-products",products.filter(p=>read("pianot_cart").includes(p.id)));
document.querySelectorAll("[data-search-form]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();location.href="search.html?q="+encodeURIComponent(f.querySelector("input").value)}));
document.querySelector(".menu-toggle")?.addEventListener("click",()=>document.querySelector(".mobile-nav")?.classList.toggle("open"));
document.querySelector("#filter-form")?.addEventListener("change",e=>{let form=e.currentTarget;let l=[...form.querySelectorAll('[name=level]:checked')].map(x=>x.value);let s=[...form.querySelectorAll('[name=style]:checked')].map(x=>x.value);render("#product-list",products.filter(p=>(!l.length||l.includes(p.level))&&(!s.length||s.includes(p.style))))});
document.querySelector("#sort-products")?.addEventListener("change",e=>{let a=[...products];if(e.target.value==="low")a.sort((x,y)=>x.price-y.price);if(e.target.value==="high")a.sort((x,y)=>y.price-x.price);render("#product-list",a)});
let q=new URLSearchParams(location.search),id=Number(q.get("id")),p=products.find(x=>x.id===id)||products[0],d=document.querySelector("#product-detail");
if(d)d.innerHTML=`<div class="product-cover"><div class="sheet-art"><div class="eyebrow">PIANOT EDITION</div><div class="sheet-lines">♩ ♫ ♬<br>𝄞 ♬ ♩<br>♬ ♩ 𝄢</div><div class="sheet-title">${p.title}</div></div></div><div><div class="eyebrow">${p.tag} / نت پیانو</div><h1>${p.title}</h1><p class="detail-copy">${p.composer} · ${p.style}</p><div class="detail-price">${money(p.price)}</div><p class="detail-copy">${p.desc} این محصول شامل فایل PDF با کیفیت مناسب چاپ و فایل MIDI برای تمرین است.</p><div class="specs"><div class="spec"><small>آهنگساز</small><b>${p.composer}</b></div><div class="spec"><small>سطح دشواری</small><b>${p.level}</b></div><div class="spec"><small>تعداد صفحات</small><b>${p.pages} صفحه</b></div><div class="spec"><small>فرمت فایل</small><b>PDF · MIDI</b></div></div><button class="btn" onclick="addCart(${p.id})">افزودن به سبد خرید</button> <button class="btn btn-outline" onclick="toggleWish(${p.id})">♡ علاقه‌مندی</button><div class="notice">پیش‌نمایش کامل فایل پس از خرید در کتابخانه شخصی شما در دسترس خواهد بود.</div></div>`;
let cart=products.filter(x=>read("pianot_cart").includes(x.id));let total=cart.reduce((s,x)=>s+x.price,0);document.querySelectorAll("[data-cart-total]").forEach(e=>e.textContent=money(total));document.querySelectorAll("[data-cart-items]").forEach(e=>e.textContent=cart.length);
document.querySelectorAll("[data-demo-form]").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();toast("فرم در نسخه نمایشی ثبت شد")}));
}
document.addEventListener("DOMContentLoaded",init);

/* Navigation accessibility and search results */
document.addEventListener("DOMContentLoaded",()=>{
  const menuButton=document.querySelector(".menu-toggle");
  const mobileNav=document.querySelector(".mobile-nav");
  const setMenu=(open)=>{
    if(!menuButton||!mobileNav)return;
    mobileNav.classList.toggle("open",open);
    menuButton.setAttribute("aria-expanded",String(open));
    menuButton.setAttribute("aria-label",open?"بستن منو":"باز کردن منو");
  };
  if(menuButton&&mobileNav){
    menuButton.addEventListener("click",()=>setMenu(!mobileNav.classList.contains("open")));
    mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
    document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
    document.addEventListener("click",e=>{
      if(!mobileNav.contains(e.target)&&!menuButton.contains(e.target))setMenu(false);
    });
  }

  const currentFile=(location.pathname.split("/").pop()||"index.html");
  document.querySelectorAll(".nav a,.mobile-nav a").forEach(a=>{
    const target=(a.getAttribute("href")||"").split("?")[0];
    if(target===currentFile){a.classList.add("is-current");a.setAttribute("aria-current","page")}
  });

  if(document.querySelector("#product-list")&&currentFile==="search.html"){
    const params=new URLSearchParams(location.search);
    const query=(params.get("q")||"").trim();
    const input=document.querySelector("[data-search-form] input");
    if(input)input.value=query;
    if(query){
      const normalized=query.toLocaleLowerCase("fa");
      const matches=products.filter(p=>
        [p.title,p.composer,p.style,p.level,p.desc].join(" ").toLocaleLowerCase("fa").includes(normalized)
      );
      render("#product-list",matches);
      const heading=document.querySelector(".page-hero h1");
      if(heading)heading.textContent="نتایج جست‌وجو برای «"+query+"»";
    }
  }
});
