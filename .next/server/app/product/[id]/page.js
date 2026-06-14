(()=>{var e={};e.id=188,e.ids=[188],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},53531:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>d,routeModule:()=>x,tree:()=>l}),s(13633),s(49976),s(90996);var r=s(30170),i=s(45002),a=s(83876),o=s.n(a),n=s(66299),c={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>n[e]);s.d(t,c);let l=["",{children:["product",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,13633)),"/workspaces/jayjaystyles/app/product/[id]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,49976)),"/workspaces/jayjaystyles/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,90996,23)),"next/dist/client/components/not-found-error"]}],d=["/workspaces/jayjaystyles/app/product/[id]/page.tsx"],p="/product/[id]/page",u={require:s,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/product/[id]/page",pathname:"/product/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},41862:(e,t,s)=>{Promise.resolve().then(s.bind(s,20149))},20149:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>k});var r=s(97247),i=s(28964),a=s(34178),o=s(44597),n=s(79906),c=s(54636),l=s(5271),d=s(77940),p=s(26323);let u=(0,p.Z)("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);var x=s(91908);let h=(0,p.Z)("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);var m=s(9969),y=s(94364),f=s(10211),g=s(99480),j=s(57744),v=s(28865),b=s(46415);function k(){(0,a.useParams)();let e=(0,a.useRouter)(),[t,s]=(0,i.useState)(null),[p,k]=(0,i.useState)([]),[w,N]=(0,i.useState)(!0),[_,C]=(0,i.useState)(!1),[z,q]=(0,i.useState)(0),[Z,S]=(0,i.useState)("");if(w)return r.jsx(j.Z,{fullScreen:!0});if(!t)return(0,r.jsxs)("div",{className:"product-detail-page",style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh"},children:[r.jsx("h2",{children:"Product Not Found"}),r.jsx("button",{className:"product-back-btn",onClick:()=>e.push("/shop"),style:{marginTop:"20px"},children:"Back to Shop"})]});let P=[Z,Z,Z];return(0,r.jsxs)("div",{className:"product-detail-page",children:[r.jsx("nav",{className:"top-nav",children:(0,r.jsxs)("div",{className:"nav-container",children:[(0,r.jsxs)(n.default,{href:"/",className:"logo",style:{display:"flex",alignItems:"center",gap:"10px",fontWeight:800,fontSize:"1.5rem"},children:[r.jsx(o.default,{src:"/logo.png",alt:"JayJayStyles Logo",width:50,height:50,priority:!0,className:"w-10 h-10 md:w-[50px] md:h-[50px] object-contain"}),r.jsx("span",{className:"logo-text",children:"JayJayStyles"})]}),(0,r.jsxs)("div",{className:"nav-actions desktop-only",children:[(0,r.jsxs)(n.default,{href:"/cart",className:"nav-link",children:[(0,r.jsxs)("div",{style:{position:"relative"},children:[r.jsx(c.Z,{size:20}),z>0&&r.jsx("span",{style:{position:"absolute",top:-8,right:-8,background:"#ef4444",color:"white",borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:"bold"},children:z})]}),r.jsx("span",{children:"Cart"})]}),(0,r.jsxs)(n.default,{href:"/account",className:"nav-link",children:[r.jsx(l.Z,{size:20}),r.jsx("span",{children:"Account"})]})]})]})}),(0,r.jsxs)("div",{className:"product-detail-wrap",children:[(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[r.jsx("div",{className:"product-image-box",children:r.jsx("img",{src:Z||`https://placehold.co/600x600/f5f5f5/333?text=${encodeURIComponent(t.name)}`,alt:t.name,onError:e=>{e.target.src="https://placehold.co/600x600/f5f5f5/333?text=Product"}})}),r.jsx("div",{style:{display:"flex",gap:"12px",overflowX:"auto",paddingBottom:"8px"},children:P.map((e,t)=>r.jsx("div",{onClick:()=>S(e),style:{width:"80px",height:"80px",borderRadius:"16px",border:Z===e&&0===t?"2px solid #111":"1px solid #e5e5e5",overflow:"hidden",cursor:"pointer",flexShrink:0,opacity:0!==t?.6:1},children:r.jsx("img",{src:e||`https://placehold.co/100x100/f5f5f5/333?text=Image+${t+1}`,style:{width:"100%",height:"100%",objectFit:"cover"},alt:"Thumbnail"})},t))})]}),(0,r.jsxs)("div",{className:"product-info-box",children:[(0,r.jsxs)("button",{onClick:()=>e.back(),style:{background:"none",border:"none",color:"#64748b",display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",marginBottom:"20px",padding:0,fontWeight:600},children:[r.jsx(d.Z,{size:16})," Back"]}),r.jsx("div",{className:"product-breadcrumb",children:t.category||"Beauty"}),r.jsx("h1",{children:t.name}),r.jsx("div",{className:"product-price",children:(0,y.CZ)(t.price)}),r.jsx("p",{className:"product-description",children:t.description||"Premium quality product designed to elevate your everyday routine. Carefully curated and crafted to deliver exceptional results for your personal care needs."}),(0,r.jsxs)("div",{className:"product-meta",children:[(0,r.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[r.jsx(u,{size:18})," Quality Guarantee"]}),(0,r.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[r.jsx(x.Z,{size:18})," Fast Delivery"]}),(0,r.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[r.jsx(h,{size:18})," Easy Returns"]})]}),(0,r.jsxs)("div",{className:"product-actions",children:[(0,r.jsxs)("button",{className:"product-add-btn",onClick:()=>{(0,y.Xq)(t.id),(0,g.L)("add_to_cart",{currency:"NGN",value:t.price,item_name:t.name,item_category:t.category||"Beauty",items:[{item_id:t.id,item_name:t.name,item_category:t.category||"Beauty",price:t.price,quantity:1}]}),(0,f.C)("Added to cart!","success")},style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center",gap:"8px",cursor:"pointer"},children:[r.jsx(c.Z,{size:20})," Add to Cart"]}),(0,r.jsxs)("button",{className:"product-back-btn",onClick:()=>{(0,y.nG)(t.id),C(!_),(0,g.L)(_?"remove_from_wishlist":"add_to_wishlist",{item_id:t.id,item_name:t.name,item_category:t.category||"Beauty",value:t.price,currency:"NGN"}),_?(0,f.C)("Removed from wishlist","info"):(0,f.C)("Added to wishlist!","success")},style:{flex:1,display:"flex",alignItems:"center",gap:"8px",justifyContent:"center",cursor:"pointer"},children:[r.jsx(m.Z,{size:20,fill:_?"currentColor":"none",color:_?"#ef4444":"currentColor"}),_?"Saved":"Wishlist"]})]})]})]}),p.length>0&&(0,r.jsxs)("div",{style:{maxWidth:"1280px",margin:"0 auto",padding:"0 40px 60px"},children:[r.jsx("h2",{style:{fontSize:"28px",marginBottom:"24px",letterSpacing:"-0.5px"},children:"Related Products"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))",gap:"24px"},children:p.map(e=>r.jsx(v.Z,{p:e},e.id))})]}),r.jsx(b.Z,{})]})}},46415:(e,t,s)=>{"use strict";s.d(t,{Z:()=>n});var r=s(97247),i=s(79906),a=s(95389),o=s(8530);function n(){return(0,r.jsxs)("footer",{className:"global-footer-pro",children:[(0,r.jsxs)("div",{className:"global-footer-grid",children:[(0,r.jsxs)("div",{className:"global-footer-brand",children:[r.jsx("h3",{children:"✨ JayJayStyles"}),r.jsx("p",{children:"Your premium destination for professional beauty services and luxury products."})]}),(0,r.jsxs)("div",{className:"global-footer-links",children:[r.jsx("h4",{children:"Quick Links"}),(0,r.jsxs)("ul",{children:[r.jsx("li",{children:r.jsx(i.default,{href:"/",children:"Home"})}),r.jsx("li",{children:r.jsx(i.default,{href:"/shop",children:"Shop"})}),r.jsx("li",{children:r.jsx(i.default,{href:"/services",children:"Services"})}),r.jsx("li",{children:r.jsx(i.default,{href:"/account",children:"Account"})})]})]}),(0,r.jsxs)("div",{className:"global-footer-links",children:[r.jsx("h4",{children:"Contact Us"}),(0,r.jsxs)("div",{className:"contact-item",children:[r.jsx(a.Z,{size:20,className:"contact-icon"}),(0,r.jsxs)("div",{children:[r.jsx("span",{style:{display:"block",color:"white",marginBottom:"4px",fontSize:"0.875rem"},children:"Email:"}),r.jsx("a",{href:"mailto:mercyjayjay89@gmail.com",style:{display:"block"},children:"mercyjayjay89@gmail.com"}),r.jsx("a",{href:"mailto:Josephgloria1121@icloud.com",style:{display:"block",marginTop:"4px"},children:"Josephgloria1121@icloud.com"})]})]}),(0,r.jsxs)("div",{className:"contact-item",children:[r.jsx(o.Z,{size:20,className:"contact-icon"}),(0,r.jsxs)("div",{children:[r.jsx("span",{style:{display:"block",color:"white",marginBottom:"4px",fontSize:"0.875rem"},children:"Phone:"}),r.jsx("a",{href:"tel:+2349022483595",style:{display:"block"},children:"+234 902 248 3595"}),r.jsx("a",{href:"tel:+2349155997846",style:{display:"block",marginTop:"4px"},children:"+234 915 599 7846"})]})]})]})]}),r.jsx("div",{className:"global-footer-bottom",children:r.jsx("p",{children:"Copyright \xa9 JayJayStyles"})})]})}},57744:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var r=s(97247);function i({fullScreen:e=!1}){return e?(0,r.jsxs)("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16},children:[r.jsx("div",{className:"spinner"}),r.jsx("p",{style:{color:"#888",fontSize:16},children:"Loading..."})]}):(0,r.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,gap:12},children:[r.jsx("div",{className:"spinner"}),r.jsx("p",{style:{color:"#888",fontSize:14},children:"Loading..."})]})}},28865:(e,t,s)=>{"use strict";s.d(t,{Z:()=>p});var r=s(97247),i=s(94364),a=s(10211),o=s(99480),n=s(34178),c=s(28964),l=s(9969),d=s(54636);function p({p:e}){let t=(0,n.useRouter)(),[s,p]=(0,c.useState)(!1);return(0,r.jsxs)("div",{className:"product-card-shared",onClick:()=>{(0,o.L)("select_item",{item_name:e.name,item_category:e.category||"Beauty",value:e.price,currency:"NGN"}),t.push("/product/"+e.id)},children:[r.jsx("style",{children:`
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
      `}),(0,r.jsxs)("div",{style:{position:"relative"},children:[r.jsx("img",{src:e.image||`https://placehold.co/400x400/f5f5f5/333?text=${encodeURIComponent(e.name)}`,className:"product-img-shared",alt:e.name,onError:e=>{e.target.src="https://placehold.co/400x400/f5f5f5/333?text=Product"}}),r.jsx("button",{className:"wishlist-btn-shared"+(s?" active":""),onClick:t=>{t.stopPropagation(),t.preventDefault(),(0,i.nG)(e.id),p(e=>!e),(0,o.L)(s?"remove_from_wishlist":"add_to_wishlist",{item_name:e.name,item_category:e.category||"Beauty",value:e.price,currency:"NGN"}),s?(0,a.C)("Removed from wishlist","info"):(0,a.C)("Added to wishlist!","success")},"aria-label":"Toggle wishlist",children:r.jsx(l.Z,{size:16,fill:s?"currentColor":"none"})})]}),(0,r.jsxs)("div",{className:"product-info-shared",children:[r.jsx("div",{className:"product-category-shared",children:e.category||"Beauty"}),r.jsx("div",{className:"product-name-shared",children:e.name}),(0,r.jsxs)("div",{className:"product-footer-shared",children:[r.jsx("div",{className:"product-price-shared",children:(0,i.CZ)(e.price)}),(0,r.jsxs)("button",{className:"btn-add-shared",onClick:t=>{t.stopPropagation(),t.preventDefault(),(0,i.Xq)(e.id),(0,o.L)("add_to_cart",{currency:"NGN",value:e.price,item_name:e.name,item_category:e.category||"Beauty",items:[{item_id:e.id,item_name:e.name,item_category:e.category||"Beauty",price:e.price,quantity:1}]}),(0,a.C)("Added to cart!","success")},children:[r.jsx(d.Z,{size:16}),r.jsx("span",{children:"Add to Cart"})]})]})]})]})}},99480:(e,t,s)=>{"use strict";s.d(t,{L:()=>r});let r=(e,t)=>{}},77940:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(26323).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},95389:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(26323).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},8530:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(26323).Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]])},91908:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});let r=(0,s(26323).Z)("Truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]])},13633:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(45347).createProxy)(String.raw`/workspaces/jayjaystyles/app/product/[id]/page.tsx#default`)}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[379,644,597,146],()=>s(53531));module.exports=r})();