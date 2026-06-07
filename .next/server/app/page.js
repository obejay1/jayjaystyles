(()=>{var e={};e.id=931,e.ids=[931],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},4510:(e,s,r)=>{"use strict";r.r(s),r.d(s,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>h,pages:()=>n,routeModule:()=>x,tree:()=>d}),r(48646),r(49976),r(90996);var t=r(30170),a=r(45002),i=r(83876),o=r.n(i),c=r(66299),l={};for(let e in c)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>c[e]);r.d(s,l);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,48646)),"/workspaces/jayjaystyles/app/page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,49976)),"/workspaces/jayjaystyles/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,90996,23)),"next/dist/client/components/not-found-error"]}],n=["/workspaces/jayjaystyles/app/page.tsx"],h="/page",p={require:r,loadChunk:()=>Promise.resolve()},x=new t.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},63779:(e,s,r)=>{Promise.resolve().then(r.bind(r,30805))},30805:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>w});var t=r(97247),a=r(28964),i=r(44597),o=r(79906),c=r(26323);let l=(0,c.Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);var d=r(9969),n=r(54636),h=r(5271);let p=(0,c.Z)("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);var x=r(47358),u=r(79727),j=r(91908);let m=(0,c.Z)("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]),y=(0,c.Z)("Headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]);var f=r(95389),g=r(8530);let v=(0,c.Z)("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);r(94364);var b=r(28865),k=r(46415);function w(){let[e,s]=(0,a.useState)([]),[r,c]=(0,a.useState)(0),[w,N]=(0,a.useState)(0),[Z,q]=(0,a.useState)(""),z=e.filter(e=>e.featured).slice(0,8),_=z.length>0?z:e.slice(0,8);if(Z.trim()){let s=Z.trim().toLowerCase();_=e.filter(e=>e.name&&e.name.toLowerCase().includes(s)||e.category&&e.category.toLowerCase().includes(s)||e.description&&e.description.toLowerCase().includes(s))}return(0,t.jsxs)("main",{className:"jj-home",children:[t.jsx("nav",{className:"jj-nav",children:(0,t.jsxs)("div",{className:"jj-nav-inner",children:[(0,t.jsxs)(o.default,{href:"/",className:"jj-logo",children:[t.jsx(i.default,{src:"/logo.png",alt:"JayJayStyles Logo",width:52,height:52,priority:!0}),(0,t.jsxs)("div",{children:[t.jsx("span",{children:"JayJayStyles"}),t.jsx("small",{children:"Beauty • Fashion • Lifestyle"})]})]}),(0,t.jsxs)("div",{className:"jj-search w-[170px] md:w-[280px]",children:[t.jsx(l,{size:20}),t.jsx("input",{className:"px-3 py-2 w-full",placeholder:"Search products, services...",value:Z,onChange:e=>q(e.target.value),onKeyDown:e=>{"Enter"===e.key&&document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}})]}),(0,t.jsxs)("div",{className:"jj-actions",children:[(0,t.jsxs)(o.default,{href:"/wishlist",children:[t.jsx(d.Z,{size:22}),r>0&&t.jsx("b",{children:r})]}),(0,t.jsxs)(o.default,{href:"/cart",children:[t.jsx(n.Z,{size:22}),w>0&&t.jsx("b",{children:w})]}),t.jsx(o.default,{href:"/account",children:t.jsx(h.Z,{size:22})})]})]})}),(0,t.jsxs)("section",{className:"jj-hero",children:[t.jsx("div",{className:"jj-hero-overlay"}),t.jsx(i.default,{src:"/hero-banner.png",alt:"JayJayStyles Nigerian beauty and lifestyle hero banner",fill:!0,priority:!0,className:"jj-hero-img"}),(0,t.jsxs)("div",{className:"jj-hero-content",children:[(0,t.jsxs)("div",{className:"jj-badge",children:[t.jsx(p,{size:16}),"Premium Beauty & Lifestyle"]}),t.jsx("h1",{children:"Look Good, Live Clean"}),t.jsx("p",{children:"Premium hair products, beauty essentials, fashion accessories, gele, beads, kitchen accessories and professional beauty services across Nigeria."}),(0,t.jsxs)("div",{className:"jj-hero-buttons",children:[(0,t.jsxs)(o.default,{href:"/shop",className:"jj-btn jj-btn-gold",children:["Shop Now ",t.jsx(x.Z,{size:18})]}),(0,t.jsxs)(o.default,{href:"/services",className:"jj-btn jj-btn-outline",children:["Book a Service ",t.jsx(u.Z,{size:18})]})]})]})]}),(0,t.jsxs)("section",{className:"jj-trust",children:[(0,t.jsxs)("div",{children:[t.jsx(j.Z,{}),t.jsx("h3",{children:"Fast Delivery"}),t.jsx("p",{children:"Across Nigeria"})]}),(0,t.jsxs)("div",{children:[t.jsx(m,{}),t.jsx("h3",{children:"Quality Products"}),t.jsx("p",{children:"Trusted & reliable"})]}),(0,t.jsxs)("div",{children:[t.jsx(y,{}),t.jsx("h3",{children:"Customer Support"}),t.jsx("p",{children:"We are here for you"})]})]}),(0,t.jsxs)("section",{className:"jj-categories",children:[t.jsx("h2",{children:"Shop by Category"}),t.jsx("div",{className:"jj-category-grid",children:["Hair Products","Makeup","Gele & Beads","Kitchen Accessories","Fashion Accessories","Beauty Services"].map(e=>t.jsx(o.default,{href:"Beauty Services"===e?"/services":"/shop",children:e},e))})]}),(0,t.jsxs)("section",{className:"jj-products",id:"products",children:[(0,t.jsxs)("div",{className:"jj-section-header",children:[(0,t.jsxs)("div",{children:[t.jsx("small",{children:"Our Products"}),t.jsx("h2",{children:"Latest Arrivals"})]}),(0,t.jsxs)(o.default,{href:"/shop",children:["View All ",t.jsx(x.Z,{size:16})]})]}),_.length>0?t.jsx("div",{className:"jj-product-grid",children:_.map(e=>t.jsx(b.Z,{p:e},e.id))}):(0,t.jsxs)("p",{style:{textAlign:"center",padding:"40px 0",color:"#666"},children:['No products found for "',Z,'".']})]}),t.jsx("section",{className:"jj-services",children:(0,t.jsxs)("div",{children:[t.jsx("small",{children:"Professional Services"}),t.jsx("h2",{children:"Beauty Services Made for Every Occasion"}),t.jsx("p",{children:"Book professional hair styling, makeup, gele styling, beauty consultation, bridal beauty services and special occasion styling."}),(0,t.jsxs)(o.default,{href:"/services",className:"jj-btn jj-btn-gold",children:["Explore Services ",t.jsx(u.Z,{size:18})]})]})}),(0,t.jsxs)("section",{className:"jj-contact",children:[t.jsx("h2",{children:"Need help with an order or service booking?"}),t.jsx("p",{children:"Contact JayJayStyles customer service for orders, delivery, products and bookings."}),(0,t.jsxs)("div",{className:"jj-contact-grid",children:[(0,t.jsxs)("a",{href:"mailto:mercyjayjay89@gmail.com",children:[t.jsx(f.Z,{}),"mercyjayjay89@gmail.com"]}),(0,t.jsxs)("a",{href:"mailto:Josephgloria1121@icloud.com",children:[t.jsx(f.Z,{}),"Josephgloria1121@icloud.com"]}),(0,t.jsxs)("a",{href:"tel:+2349022483595",children:[t.jsx(g.Z,{}),"+234 902 248 3595"]}),(0,t.jsxs)("a",{href:"tel:+2349155997846",children:[t.jsx(g.Z,{}),"+234 915 599 7846"]})]}),(0,t.jsxs)("a",{href:"https://wa.me/2349022483595",className:"jj-whatsapp",children:[t.jsx(v,{}),"Chat on WhatsApp"]})]}),t.jsx(k.Z,{})]})}},46415:(e,s,r)=>{"use strict";r.d(s,{Z:()=>c});var t=r(97247),a=r(79906),i=r(95389),o=r(8530);function c(){return(0,t.jsxs)("footer",{className:"global-footer-pro",children:[(0,t.jsxs)("div",{className:"global-footer-grid",children:[(0,t.jsxs)("div",{className:"global-footer-brand",children:[t.jsx("h3",{children:"✨ JayJayStyles"}),t.jsx("p",{children:"Your premium destination for professional beauty services and luxury products."})]}),(0,t.jsxs)("div",{className:"global-footer-links",children:[t.jsx("h4",{children:"Quick Links"}),(0,t.jsxs)("ul",{children:[t.jsx("li",{children:t.jsx(a.default,{href:"/",children:"Home"})}),t.jsx("li",{children:t.jsx(a.default,{href:"/shop",children:"Shop"})}),t.jsx("li",{children:t.jsx(a.default,{href:"/services",children:"Services"})}),t.jsx("li",{children:t.jsx(a.default,{href:"/account",children:"Account"})})]})]}),(0,t.jsxs)("div",{className:"global-footer-links",children:[t.jsx("h4",{children:"Contact Us"}),(0,t.jsxs)("div",{className:"contact-item",children:[t.jsx(i.Z,{size:20,className:"contact-icon"}),(0,t.jsxs)("div",{children:[t.jsx("span",{style:{display:"block",color:"white",marginBottom:"4px",fontSize:"0.875rem"},children:"Email:"}),t.jsx("a",{href:"mailto:mercyjayjay89@gmail.com",style:{display:"block"},children:"mercyjayjay89@gmail.com"}),t.jsx("a",{href:"mailto:Josephgloria1121@icloud.com",style:{display:"block",marginTop:"4px"},children:"Josephgloria1121@icloud.com"})]})]}),(0,t.jsxs)("div",{className:"contact-item",children:[t.jsx(o.Z,{size:20,className:"contact-icon"}),(0,t.jsxs)("div",{children:[t.jsx("span",{style:{display:"block",color:"white",marginBottom:"4px",fontSize:"0.875rem"},children:"Phone:"}),t.jsx("a",{href:"tel:+2349022483595",style:{display:"block"},children:"+234 902 248 3595"}),t.jsx("a",{href:"tel:+2349155997846",style:{display:"block",marginTop:"4px"},children:"+234 915 599 7846"})]})]})]})]}),t.jsx("div",{className:"global-footer-bottom",children:t.jsx("p",{children:"Copyright \xa9 JayJayStyles"})})]})}},28865:(e,s,r)=>{"use strict";r.d(s,{Z:()=>h});var t=r(97247),a=r(94364),i=r(10211),o=r(99480),c=r(34178),l=r(28964),d=r(9969),n=r(54636);function h({p:e}){let s=(0,c.useRouter)(),[r,h]=(0,l.useState)(!1);return(0,t.jsxs)("div",{className:"product-card-shared",onClick:()=>{(0,o.L)("select_item",{item_name:e.name,item_category:e.category||"Beauty",value:e.price,currency:"NGN"}),s.push("/product/"+e.id)},children:[t.jsx("style",{children:`
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
      `}),(0,t.jsxs)("div",{style:{position:"relative"},children:[t.jsx("img",{src:e.image||`https://placehold.co/400x400/f5f5f5/333?text=${encodeURIComponent(e.name)}`,className:"product-img-shared",alt:e.name,onError:e=>{e.target.src="https://placehold.co/400x400/f5f5f5/333?text=Product"}}),t.jsx("button",{className:"wishlist-btn-shared"+(r?" active":""),onClick:s=>{s.stopPropagation(),s.preventDefault(),(0,a.nG)(e.id),h(e=>!e),(0,o.L)(r?"remove_from_wishlist":"add_to_wishlist",{item_name:e.name,item_category:e.category||"Beauty",value:e.price,currency:"NGN"}),r?(0,i.C)("Removed from wishlist","info"):(0,i.C)("Added to wishlist!","success")},"aria-label":"Toggle wishlist",children:t.jsx(d.Z,{size:16,fill:r?"currentColor":"none"})})]}),(0,t.jsxs)("div",{className:"product-info-shared",children:[t.jsx("div",{className:"product-category-shared",children:e.category||"Beauty"}),t.jsx("div",{className:"product-name-shared",children:e.name}),(0,t.jsxs)("div",{className:"product-footer-shared",children:[t.jsx("div",{className:"product-price-shared",children:(0,a.CZ)(e.price)}),(0,t.jsxs)("button",{className:"btn-add-shared",onClick:s=>{s.stopPropagation(),s.preventDefault(),(0,a.Xq)(e.id),(0,o.L)("add_to_cart",{currency:"NGN",value:e.price,item_name:e.name,item_category:e.category||"Beauty",items:[{item_id:e.id,item_name:e.name,item_category:e.category||"Beauty",price:e.price,quantity:1}]}),(0,i.C)("Added to cart!","success")},children:[t.jsx(n.Z,{size:16}),t.jsx("span",{children:"Add to Cart"})]})]})]})]})}},99480:(e,s,r)=>{"use strict";r.d(s,{L:()=>t});let t=(e,s)=>{}},47358:(e,s,r)=>{"use strict";r.d(s,{Z:()=>t});let t=(0,r(26323).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},95389:(e,s,r)=>{"use strict";r.d(s,{Z:()=>t});let t=(0,r(26323).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},8530:(e,s,r)=>{"use strict";r.d(s,{Z:()=>t});let t=(0,r(26323).Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]])},91908:(e,s,r)=>{"use strict";r.d(s,{Z:()=>t});let t=(0,r(26323).Z)("Truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]])},48646:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>t});let t=(0,r(45347).createProxy)(String.raw`/workspaces/jayjaystyles/app/page.tsx#default`)}};var s=require("../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[379,644,597,146],()=>r(4510));module.exports=t})();