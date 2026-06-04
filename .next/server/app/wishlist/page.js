(()=>{var e={};e.id=456,e.ids=[456],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},30970:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>o.a,__next_app__:()=>h,originalPathname:()=>p,pages:()=>l,routeModule:()=>u,tree:()=>c}),t(42622),t(49976),t(90996);var r=t(30170),i=t(45002),a=t(83876),o=t.n(a),n=t(66299),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);t.d(s,d);let c=["",{children:["wishlist",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,42622)),"/workspaces/jayjaystyles/app/wishlist/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,49976)),"/workspaces/jayjaystyles/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,90996,23)),"next/dist/client/components/not-found-error"]}],l=["/workspaces/jayjaystyles/app/wishlist/page.tsx"],p="/wishlist/page",h={require:t,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/wishlist/page",pathname:"/wishlist",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},59245:(e,s,t)=>{Promise.resolve().then(t.bind(t,72223))},72223:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>c});var r=t(97247),i=t(28964),a=t(79906),o=t(28865);t(94364);var n=t(9969),d=t(30680);function c(){let[e,s]=(0,i.useState)([]);return(0,r.jsxs)("main",{className:"wishlist-page",children:[(0,r.jsxs)("section",{className:"wishlist-hero",children:[r.jsx("div",{className:"wishlist-icon",children:r.jsx(n.Z,{size:34,fill:"currentColor"})}),r.jsx("p",{className:"wishlist-label",children:"Your saved favourites"}),r.jsx("h1",{children:"My Wishlist"}),r.jsx("p",{className:"wishlist-subtitle",children:"Keep track of the beauty products, hair essentials, accessories, and services you love."})]}),(0,r.jsxs)("section",{className:"wishlist-content",children:[(0,r.jsxs)("div",{className:"wishlist-header",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"wishlist-small-title",children:"Saved Items"}),(0,r.jsxs)("h2",{children:[e.length," item",1===e.length?"":"s"," saved"]})]}),(0,r.jsxs)(a.default,{href:"/shop",className:"wishlist-shop-link",children:[r.jsx(d.Z,{size:18}),"Continue Shopping"]})]}),0===e.length?(0,r.jsxs)("div",{className:"wishlist-empty",children:[r.jsx("div",{className:"wishlist-empty-icon",children:r.jsx(n.Z,{size:42})}),r.jsx("h2",{children:"Your wishlist is empty"}),r.jsx("p",{children:"Browse JayJayStyles products and tap the heart icon to save your favourite items here."}),r.jsx(a.default,{href:"/shop",className:"wishlist-empty-btn",children:"Browse Products"})]}):r.jsx("div",{className:"wishlist-grid",children:e.map(e=>r.jsx(o.Z,{p:e},e.id))})]})]})}},28865:(e,s,t)=>{"use strict";t.d(s,{Z:()=>p});var r=t(97247),i=t(94364),a=t(10211),o=t(99480),n=t(34178),d=t(28964),c=t(9969),l=t(54636);function p({p:e}){let s=(0,n.useRouter)(),[t,p]=(0,d.useState)(!1);return(0,r.jsxs)("div",{className:"product-card-shared",onClick:()=>{(0,o.L)("select_item",{item_name:e.name,item_category:e.category||"Beauty",value:e.price,currency:"NGN"}),s.push("/product/"+e.id)},children:[r.jsx("style",{children:`
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
      `}),(0,r.jsxs)("div",{style:{position:"relative"},children:[r.jsx("img",{src:e.image||`https://placehold.co/400x400/f5f5f5/333?text=${encodeURIComponent(e.name)}`,className:"product-img-shared",alt:e.name,onError:e=>{e.target.src="https://placehold.co/400x400/f5f5f5/333?text=Product"}}),r.jsx("button",{className:"wishlist-btn-shared"+(t?" active":""),onClick:s=>{s.stopPropagation(),s.preventDefault(),(0,i.nG)(e.id),p(e=>!e),(0,o.L)(t?"remove_from_wishlist":"add_to_wishlist",{item_name:e.name,item_category:e.category||"Beauty",value:e.price,currency:"NGN"}),t?(0,a.C)("Removed from wishlist","info"):(0,a.C)("Added to wishlist!","success")},"aria-label":"Toggle wishlist",children:r.jsx(c.Z,{size:16,fill:t?"currentColor":"none"})})]}),(0,r.jsxs)("div",{className:"product-info-shared",children:[r.jsx("div",{className:"product-category-shared",children:e.category||"Beauty"}),r.jsx("div",{className:"product-name-shared",children:e.name}),(0,r.jsxs)("div",{className:"product-footer-shared",children:[r.jsx("div",{className:"product-price-shared",children:(0,i.CZ)(e.price)}),(0,r.jsxs)("button",{className:"btn-add-shared",onClick:s=>{s.stopPropagation(),s.preventDefault(),(0,i.Xq)(e.id),(0,o.L)("add_to_cart",{currency:"NGN",value:e.price,item_name:e.name,item_category:e.category||"Beauty",items:[{item_id:e.id,item_name:e.name,item_category:e.category||"Beauty",price:e.price,quantity:1}]}),(0,a.C)("Added to cart!","success")},children:[r.jsx(l.Z,{size:16}),r.jsx("span",{children:"Add to Cart"})]})]})]})]})}},99480:(e,s,t)=>{"use strict";t.d(s,{L:()=>r});let r=(e,s)=>{}},42622:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>r});let r=(0,t(45347).createProxy)(String.raw`/workspaces/jayjaystyles/app/wishlist/page.tsx#default`)}};var s=require("../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[379,644,146],()=>t(30970));module.exports=r})();