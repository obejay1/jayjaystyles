(()=>{var e={};e.id=21,e.ids=[21],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},10824:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>h,originalPathname:()=>p,pages:()=>l,routeModule:()=>x,tree:()=>c}),t(79500),t(49976),t(90996);var s=t(30170),o=t(45002),i=t(83876),a=t.n(i),n=t(66299),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);t.d(r,d);let c=["",{children:["shop",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,79500)),"/workspaces/jayjaystyles/app/shop/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,49976)),"/workspaces/jayjaystyles/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,90996,23)),"next/dist/client/components/not-found-error"]}],l=["/workspaces/jayjaystyles/app/shop/page.tsx"],p="/shop/page",h={require:t,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/shop/page",pathname:"/shop",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},80613:(e,r,t)=>{Promise.resolve().then(t.bind(t,26049))},26049:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>h});var s=t(97247),o=t(28964),i=t(44597),a=t(79906),n=t(54636),d=t(5271);t(94364);var c=t(28865),l=t(57744),p=t(46415);function h(){let[e,r]=(0,o.useState)([]),[t,h]=(0,o.useState)(!0),[x,u]=(0,o.useState)("All"),[m,g]=(0,o.useState)(0),[f,y]=(0,o.useState)(""),b="All"===x?e:e.filter(e=>e.category===x);if(f.trim()){let e=f.trim().toLowerCase();b=b.filter(r=>r.name&&r.name.toLowerCase().includes(e)||r.category&&r.category.toLowerCase().includes(e)||r.description&&r.description.toLowerCase().includes(e))}return t?s.jsx(l.Z,{fullScreen:!0}):(0,s.jsxs)("div",{className:"shop-page-pro",children:[s.jsx("nav",{className:"top-nav",children:(0,s.jsxs)("div",{className:"nav-container",children:[(0,s.jsxs)(a.default,{href:"/",className:"logo",style:{display:"flex",alignItems:"center",gap:"10px",fontWeight:800,fontSize:"1.5rem"},children:[s.jsx(i.default,{src:"/logo.png",alt:"JayJayStyles Logo",width:50,height:50,priority:!0,className:"w-10 h-10 md:w-[50px] md:h-[50px] object-contain"}),s.jsx("span",{className:"logo-text",children:"JayJayStyles"})]}),(0,s.jsxs)("div",{className:"nav-actions desktop-only",children:[(0,s.jsxs)(a.default,{href:"/cart",className:"nav-link",children:[(0,s.jsxs)("div",{style:{position:"relative"},children:[s.jsx(n.Z,{size:20}),m>0&&s.jsx("span",{style:{position:"absolute",top:-8,right:-8,background:"#ef4444",color:"white",borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:"bold"},children:m})]}),s.jsx("span",{children:"Cart"})]}),(0,s.jsxs)(a.default,{href:"/account",className:"nav-link",children:[s.jsx(d.Z,{size:20}),s.jsx("span",{children:"Account"})]})]})]})}),s.jsx("div",{className:"shop-hero-pro",children:(0,s.jsxs)("div",{className:"shop-hero-content",children:[s.jsx("span",{children:"Premium Collection"}),s.jsx("h1",{children:"Elevate Your Style"}),s.jsx("p",{children:"Discover our curated selection of premium beauty and hair products designed to bring out your inner radiance."}),s.jsx("button",{className:"shop-hero-btn",onClick:()=>window.scrollTo({top:500,behavior:"smooth"}),children:"Shop Now"})]})}),s.jsx("div",{className:"shop-toolbar-pro",children:(0,s.jsxs)("div",{className:"shop-search-pro",children:[s.jsx("input",{type:"text",placeholder:"Search for products, brands, and more...",value:f,onChange:e=>y(e.target.value)}),s.jsx("div",{className:"shop-category-pro",children:["All","Hair","Beauty","Accessories","Skincare"].map(e=>s.jsx("button",{className:x===e?"active":"",onClick:()=>u(e),children:e},e))})]})}),(0,s.jsxs)("main",{className:"shop-section-pro",children:[(0,s.jsxs)("div",{className:"shop-section-head",children:[(0,s.jsxs)("div",{children:[s.jsx("span",{children:"Our Products"}),s.jsx("h2",{children:"Latest Arrivals"})]}),(0,s.jsxs)("p",{children:["Showing ",b.length," products"]})]}),(0,s.jsxs)("div",{className:"shop-grid-pro",children:[s.jsx("style",{children:`
            * { box-sizing: border-box; }
            .shop-page-pro { width: 100%; overflow-x: hidden; padding-bottom: 90px; }
            
            .shop-grid-pro { 
              display: grid;
                grid-template-columns: 1fr;
              gap: 1.5rem;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
              width: 100%;
              padding: 0 16px 80px 16px;
            }
            @media (min-width: 640px) { .shop-grid-pro { grid-template-columns: repeat(2, 1fr); } }
            @media (min-width: 768px) { .shop-grid-pro { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
            @media (min-width: 1024px) { .shop-grid-pro { grid-template-columns: repeat(4, 1fr); } }
            
            .shop-category-pro { 
              display: flex; gap: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 8px; scrollbar-width: none; 
            }
            .shop-category-pro::-webkit-scrollbar { display: none; }
            .shop-category-pro button {
              padding: 8px 16px; border-radius: 999px; border: 1px solid #e5e5e5; background: white; white-space: nowrap; cursor: pointer; flex-shrink: 0;
            }
            .shop-category-pro button.active { background: #111827; color: white; border-color: #111827; }
            
            .shop-empty-pro { text-align: center; padding: 40px 16px; color: #888; grid-column: 1 / -1; }
            
            .shop-search-pro input { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid #e5e5e5; margin-bottom: 16px; outline: none; box-sizing: border-box; font-size: 1rem; }
            .shop-search-pro input:focus { border-color: #111827; }
            
            .shop-toolbar-pro { padding: 0 16px; margin: 24px 0; width: 100%; }
            .shop-section-head { padding: 0 16px; margin-bottom: 20px; }
            .shop-section-head h2 { font-size: 1.5rem; margin-top: 4px; color: #111; }
            .shop-section-head span { color: #d4a574; font-weight: 600; text-transform: uppercase; font-size: 0.875rem; }
            .shop-section-head p { color: #6b7280; font-size: 0.875rem; margin-top: 4px; }
            
            .shop-hero-pro { background: #111827; color: white; padding: 60px 20px; text-align: center; }
            .shop-hero-content span { color: #d4a574; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; font-size: 0.875rem; }
            .shop-hero-content h1 { font-size: 2.5rem; margin: 12px 0; }
            .shop-hero-content p { color: #9ca3af; max-width: 500px; margin: 0 auto 24px; line-height: 1.5; }
            .shop-hero-btn { background: #d4af37; color: #111; border: none; padding: 12px 28px; border-radius: 999px; font-weight: 700; cursor: pointer; font-size: 1rem; }
            
            .top-nav { background: white; border-bottom: 1px solid #e5e5e5; position: sticky; top: 0; z-index: 50; width: 100%; }
            .nav-container { display: flex; align-items: center; justify-content: space-between; padding: 16px; max-width: 1200px; margin: 0 auto; gap: 12px; width: 100%; box-sizing: border-box; }
            .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #111; font-weight: 800; font-size: 1.5rem; white-space: nowrap; flex-shrink: 0; }
            
            .nav-actions { display: flex; align-items: center; gap: 20px; }
            .nav-link { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #4b5563; text-decoration: none; font-size: 0.75rem; font-weight: 500; transition: color 0.2s; }
            .nav-link:hover { color: #d4a574; }
            
            @media (max-width: 767px) { 
              .desktop-only { display: none !important; } 
              .nav-container { padding-left: 16px; padding-right: 16px; }
            }
          `}),0===b.length?(0,s.jsxs)("div",{className:"shop-empty-pro",children:[s.jsx("h3",{children:"No products found"}),s.jsx("p",{children:"Try changing your category or search term."})]}):b.map(e=>s.jsx(c.Z,{p:e},e.id))]})]}),s.jsx(p.Z,{})]})}},46415:(e,r,t)=>{"use strict";t.d(r,{Z:()=>n});var s=t(97247),o=t(79906),i=t(95389),a=t(8530);function n(){return(0,s.jsxs)("footer",{className:"global-footer-pro",children:[(0,s.jsxs)("div",{className:"global-footer-grid",children:[(0,s.jsxs)("div",{className:"global-footer-brand",children:[s.jsx("h3",{children:"✨ JayJayStyles"}),s.jsx("p",{children:"Your premium destination for professional beauty services and luxury products."})]}),(0,s.jsxs)("div",{className:"global-footer-links",children:[s.jsx("h4",{children:"Quick Links"}),(0,s.jsxs)("ul",{children:[s.jsx("li",{children:s.jsx(o.default,{href:"/",children:"Home"})}),s.jsx("li",{children:s.jsx(o.default,{href:"/shop",children:"Shop"})}),s.jsx("li",{children:s.jsx(o.default,{href:"/services",children:"Services"})}),s.jsx("li",{children:s.jsx(o.default,{href:"/account",children:"Account"})})]})]}),(0,s.jsxs)("div",{className:"global-footer-links",children:[s.jsx("h4",{children:"Contact Us"}),(0,s.jsxs)("div",{className:"contact-item",children:[s.jsx(i.Z,{size:20,className:"contact-icon"}),(0,s.jsxs)("div",{children:[s.jsx("span",{style:{display:"block",color:"white",marginBottom:"4px",fontSize:"0.875rem"},children:"Email:"}),s.jsx("a",{href:"mailto:mercyjayjay89@gmail.com",style:{display:"block"},children:"mercyjayjay89@gmail.com"}),s.jsx("a",{href:"mailto:Josephgloria1121@icloud.com",style:{display:"block",marginTop:"4px"},children:"Josephgloria1121@icloud.com"})]})]}),(0,s.jsxs)("div",{className:"contact-item",children:[s.jsx(a.Z,{size:20,className:"contact-icon"}),(0,s.jsxs)("div",{children:[s.jsx("span",{style:{display:"block",color:"white",marginBottom:"4px",fontSize:"0.875rem"},children:"Phone:"}),s.jsx("a",{href:"tel:+2349022483595",style:{display:"block"},children:"+234 902 248 3595"}),s.jsx("a",{href:"tel:+2349155997846",style:{display:"block",marginTop:"4px"},children:"+234 915 599 7846"})]})]})]})]}),s.jsx("div",{className:"global-footer-bottom",children:s.jsx("p",{children:"Copyright \xa9 JayJayStyles"})})]})}},57744:(e,r,t)=>{"use strict";t.d(r,{Z:()=>o});var s=t(97247);function o({fullScreen:e=!1}){return e?(0,s.jsxs)("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16},children:[s.jsx("div",{className:"spinner"}),s.jsx("p",{style:{color:"#888",fontSize:16},children:"Loading..."})]}):(0,s.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,gap:12},children:[s.jsx("div",{className:"spinner"}),s.jsx("p",{style:{color:"#888",fontSize:14},children:"Loading..."})]})}},28865:(e,r,t)=>{"use strict";t.d(r,{Z:()=>p});var s=t(97247),o=t(94364),i=t(10211),a=t(99480),n=t(34178),d=t(28964),c=t(9969),l=t(54636);function p({p:e}){let r=(0,n.useRouter)(),[t,p]=(0,d.useState)(!1);return(0,s.jsxs)("div",{className:"product-card-shared",onClick:()=>{(0,a.L)("select_item",{item_name:e.name,item_category:e.category||"Beauty",value:e.price,currency:"NGN"}),r.push("/product/"+e.id)},children:[s.jsx("style",{children:`
        .product-card-shared {
          cursor: pointer;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          background: white;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          text-decoration: none;
          height: 100%;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .product-card-shared:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .product-img-shared {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }
        .wishlist-btn-shared {
          background: #fff;
          border: none;
          border-radius: 50%;
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          padding: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          cursor: pointer;
        }
        .wishlist-btn-shared.active {
          color: #ef4444;
          background: #fef2f2;
        }
        .product-info-shared {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }
        .product-category-shared {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .product-name-shared {
          font-size: 1rem;
          margin: 0 0 8px 0;
          color: #111;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
        }
        .product-footer-shared {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .product-price-shared {
          font-weight: bold;
          font-size: 1rem;
          color: #111;
          white-space: nowrap;
        }
        .btn-add-shared {
          background: #111827;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 10px;
          font-weight: 600;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-add-shared:active {
          background: #d4af37;
          color: #111;
        }

        @media (max-width: 640px) {
          .product-img-shared {
            height: 150px;
          }
          .product-info-shared {
            padding: 10px;
          }
          .product-category-shared {
            font-size: 0.65rem;
          }
          .product-name-shared {
            font-size: 0.875rem;
            margin-bottom: 8px;
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .product-footer-shared {
            flex-direction: row;
            align-items: center;
            gap: 6px;
          }
          .product-price-shared {
            font-size: 0.9rem;
          }
          .btn-add-shared {
            width: auto;
            padding: 8px;
            font-size: 0;
          }
          .btn-add-shared span {
            display: none;
          }
        }
      `}),(0,s.jsxs)("div",{style:{position:"relative"},children:[s.jsx("img",{src:e.image||`https://placehold.co/400x400/f5f5f5/333?text=${encodeURIComponent(e.name)}`,className:"product-img-shared",alt:e.name,onError:e=>{e.target.src="https://placehold.co/400x400/f5f5f5/333?text=Product"}}),s.jsx("button",{className:"wishlist-btn-shared"+(t?" active":""),onClick:r=>{r.stopPropagation(),r.preventDefault(),(0,o.nG)(e.id),p(e=>!e),(0,a.L)(t?"remove_from_wishlist":"add_to_wishlist",{item_name:e.name,item_category:e.category||"Beauty",value:e.price,currency:"NGN"}),t?(0,i.C)("Removed from wishlist","info"):(0,i.C)("Added to wishlist!","success")},"aria-label":"Toggle wishlist",children:s.jsx(c.Z,{size:16,fill:t?"currentColor":"none"})})]}),(0,s.jsxs)("div",{className:"product-info-shared",children:[s.jsx("div",{className:"product-category-shared",children:e.category||"Beauty"}),s.jsx("div",{className:"product-name-shared",children:e.name}),(0,s.jsxs)("div",{className:"product-footer-shared",children:[s.jsx("div",{className:"product-price-shared",children:(0,o.CZ)(e.price)}),(0,s.jsxs)("button",{className:"btn-add-shared",onClick:r=>{r.stopPropagation(),r.preventDefault(),(0,o.Xq)(e.id),(0,a.L)("add_to_cart",{currency:"NGN",value:e.price,item_name:e.name,item_category:e.category||"Beauty",items:[{item_id:e.id,item_name:e.name,item_category:e.category||"Beauty",price:e.price,quantity:1}]}),(0,i.C)("Added to cart!","success")},children:[s.jsx(l.Z,{size:16}),s.jsx("span",{children:"Add to Cart"})]})]})]})]})}},99480:(e,r,t)=>{"use strict";t.d(r,{L:()=>s});let s=(e,r)=>{}},95389:(e,r,t)=>{"use strict";t.d(r,{Z:()=>s});let s=(0,t(26323).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},8530:(e,r,t)=>{"use strict";t.d(r,{Z:()=>s});let s=(0,t(26323).Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]])},79500:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(45347).createProxy)(String.raw`/workspaces/jayjaystyles/app/shop/page.tsx#default`)}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[379,644,597,146],()=>t(10824));module.exports=s})();