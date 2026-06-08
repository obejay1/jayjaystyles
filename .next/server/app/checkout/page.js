(()=>{var e={};e.id=285,e.ids=[285],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},45393:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>d}),r(57158),r(49976),r(90996);var o=r(30170),s=r(45002),a=r(83876),i=r.n(a),n=r(66299),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["checkout",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,57158)),"/workspaces/jayjaystyles/app/checkout/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,49976)),"/workspaces/jayjaystyles/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,90996,23)),"next/dist/client/components/not-found-error"]}],c=["/workspaces/jayjaystyles/app/checkout/page.tsx"],p="/checkout/page",u={require:r,loadChunk:()=>Promise.resolve()},x=new o.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/checkout/page",pathname:"/checkout",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},24675:(e,t,r)=>{Promise.resolve().then(r.bind(r,33566))},33566:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var o=r(97247),s=r(28964),a=r(27692),i=r.n(a),n=r(94364),l=r(99480);r(6822);var d=r(34178),c=r(10211);let p=i()(async()=>{},{loadableGenerated:{modules:["app/checkout/page.tsx -> react-paystack"]},ssr:!1});function u(){let[e,t]=(0,s.useState)([]),[r,a]=(0,s.useState)([]),[i,u]=(0,s.useState)(!1),[x,h]=(0,s.useState)(""),[g,y]=(0,s.useState)(""),[m,f]=(0,s.useState)(""),[b,j]=(0,s.useState)(""),[k,P]=(0,s.useState)(""),[v,w]=(0,s.useState)(0),[S,C]=(0,s.useState)(7.5),[O,z]=(0,s.useState)(1500),[_,N]=(0,s.useState)("Paystack"),[q,$]=(0,s.useState)(!1),D=(0,d.useRouter)(),L=r.map(t=>{let r=e.find(e=>e.id===t.id);return r?{id:r.id,name:r.name,price:r.price,qty:t.qty,image:r.image,category:r.category}:null}).filter(Boolean),M=L.reduce((e,t)=>e+t.price*t.qty,0),T=M>0?O:0,A=Math.round(S/100*M),E=Math.round(M*v/100),I=M+T+A-E;async function B(){try{$(!0);let e=String(Date.now());sessionStorage.setItem("opay_checkout_data",JSON.stringify({id:e,items:L,subtotal:M,shipping:T,tax:A,total:I,taxRate:S,shippingFee:O,discountAmount:E,paymentMethod:"OPay",customerEmail:x,customerName:g,customerPhone:m,customerAddress:b,status:"Processing",createdAt:new Date().toISOString()}));let t=await fetch("/api/opay/create-payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount:I,email:x,name:g,phone:m,orderId:e})}),r=await t.json();if(r.url){window.location.href=r.url;return}(0,c.C)(r.error||"Could not initialize OPay payment","error"),$(!1)}catch(e){console.error(e),(0,c.C)("OPay payment initialization failed","error"),$(!1)}}async function G(e){let t=String(Date.now()),r=new Date().toLocaleString();await (0,n.LV)({id:t,items:L,subtotal:M,shipping:T,tax:A,total:I,taxRate:S,shippingFee:O,discountAmount:E,paymentMethod:"Paystack",paymentReference:e,customerEmail:x,customerName:g,customerPhone:m,customerAddress:b,status:"Processing",createdAt:new Date().toISOString()});let o=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #111827;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; padding: 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <tr>
            <td align="center" style="background-color: #111827; padding: 30px 20px;">
              <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: bold; text-transform: uppercase;">JayJayStyles</h1>
              <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 14px;">Luxury Glow & Beauty</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #111827;">Order Confirmation</h2>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; color: #4b5563;">
                Hi <strong>${g}</strong>,<br><br>
                Thank you for shopping with luxury glow & beauty. Your payment has been received and your order is now being processed.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #4b5563;"><strong>Order ID:</strong> #${t}</p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #4b5563;"><strong>Order Date:</strong> ${r}</p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #4b5563;"><strong>Payment Status:</strong> <span style="color: #16a34a; font-weight: bold;">Paid (${e})</span></p>
                    <p style="margin: 0; font-size: 14px; color: #4b5563;"><strong>Delivery Address:</strong><br>${b}</p>
                  </td>
                </tr>
              </table>

              <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #111827; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Order Summary</h3>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px; border-collapse: collapse;">
                <thead>
                  <tr>
                    <th width="60" align="left" style="padding: 10px 0; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Image</th>
                    <th align="left" style="padding: 10px 0; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Product</th>
                    <th align="center" style="padding: 10px 0; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Qty</th>
                    <th align="right" style="padding: 10px 0; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${L.map(e=>`
                    <tr>
                      <td align="left" style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                        <img src="${e.image||"https://placehold.co/100x100/f5f5f5/333?text=Product"}" width="50" height="50" alt="Product Image" style="border-radius: 6px; display: block; object-fit: cover; background-color: #f1f5f9;">
                      </td>
                      <td align="left" style="padding: 15px 0; font-size: 15px; color: #111827; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${e.name}</td>
                      <td align="center" style="padding: 15px 0; font-size: 15px; color: #4b5563; border-bottom: 1px solid #e5e7eb;">${e.qty}</td>
                      <td align="right" style="padding: 15px 0; font-size: 15px; color: #111827; border-bottom: 1px solid #e5e7eb; font-weight: bold;">₦${(e.price*e.qty).toLocaleString()}</td>
                    </tr>
                  `).join("")}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" align="right" style="padding: 15px 0 5px; font-size: 14px; color: #6b7280;">Subtotal:</td>
                    <td align="right" style="padding: 15px 0 5px; font-size: 15px; color: #111827; font-weight: bold;">₦${M.toLocaleString()}</td>
                  </tr>

                  ${E>0?`
                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0; font-size: 14px; color: #6b7280;">Discount:</td>
                    <td align="right" style="padding: 5px 0; font-size: 15px; color: #16a34a; font-weight: bold;">-₦${E.toLocaleString()}</td>
                  </tr>`:""}

                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0; font-size: 14px; color: #6b7280;">Tax (${S}%):</td>
                    <td align="right" style="padding: 5px 0; font-size: 15px; color: #111827; font-weight: bold;">₦${A.toLocaleString()}</td>
                  </tr>

                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0 15px; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Shipping:</td>
                    <td align="right" style="padding: 5px 0 15px; font-size: 15px; color: #111827; font-weight: bold; border-bottom: 1px solid #e5e7eb;">₦${T.toLocaleString()}</td>
                  </tr>

                  <tr>
                    <td colspan="3" align="right" style="padding: 15px 0 0; font-size: 16px; color: #111827; font-weight: bold;">Total:</td>
                    <td align="right" style="padding: 15px 0 0; font-size: 20px; color: #d4af37; font-weight: bold;">₦${I.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <a href="https://jayjaystyles-azee.vercel.app/order/${t}" style="display: inline-block; padding: 14px 30px; background-color: #d4af37; color: #111827; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 9999px; margin-bottom: 15px; width: 200px; text-align: center;">Track Order</a>
                    <br>
                    <a href="https://wa.me/+2349022483595" style="display: inline-block; padding: 14px 30px; background-color: #25d366; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 9999px; width: 200px; text-align: center;">WhatsApp Support</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="background-color: #f1f5f9; padding: 30px 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #4b5563; font-weight: bold;">Luxury Glow & Beauty</p>
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #6b7280;">Email: support@jayjaystyles.com</p>
              <p style="margin: 0 0 15px 0; font-size: 12px; color: #6b7280;">Phone: +234 800 000 0000</p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">&copy; ${new Date().getFullYear()} JayJayStyles. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:x,subject:"Order Confirmation - Luxury Glow & Beauty",html:o})}),(0,l.L)("purchase",{transaction_id:e,currency:"NGN",value:I,items:L.map(e=>({item_id:e.id,item_name:e.name,item_category:e.category||"Beauty",price:e.price,quantity:e.qty}))}),D.push(`/order/${t}`)}let R=x.trim()&&g.trim()&&m.trim()&&b.trim()&&I>0,Z={email:x,amount:100*I,publicKey:"pk_test_018eeac98793217c39dc038011872969714f692c",text:`Pay ${(0,n.CZ)(I)}`,onSuccess:e=>G(e.reference),onClose:()=>{}};return(0,o.jsxs)("main",{className:"checkout-page-pro",children:[o.jsx("section",{className:"checkout-hero-pro",children:(0,o.jsxs)("div",{children:[o.jsx("p",{children:"Secure Checkout"}),o.jsx("h1",{children:"Complete Your Order"}),o.jsx("span",{children:"Pay safely with Paystack or OPay — card, transfer, USSD and bank options."})]})}),(0,o.jsxs)("section",{className:"checkout-layout-pro",children:[(0,o.jsxs)("div",{className:"checkout-left-pro",children:[(0,o.jsxs)("div",{className:"checkout-card-pro",children:[o.jsx("h2",{children:"Customer Information"}),(0,o.jsxs)("div",{className:"checkout-form-grid",children:[o.jsx("input",{placeholder:"Full Name",value:g,onChange:e=>y(e.target.value)}),o.jsx("input",{placeholder:"Phone Number",value:m,onChange:e=>f(e.target.value)}),o.jsx("input",{placeholder:"Email Address",value:x,onChange:e=>h(e.target.value)}),o.jsx("input",{placeholder:"Delivery Address",value:b,onChange:e=>j(e.target.value)})]})]}),(0,o.jsxs)("div",{className:"checkout-card-pro",children:[o.jsx("h2",{children:"Payment Method"}),(0,o.jsxs)("div",{className:"checkout-pay-option-pro",onClick:()=>N("Paystack"),style:{cursor:"pointer",border:"Paystack"===_?"2px solid #111827":"1px solid #e5e7eb",marginBottom:"12px"},children:[(0,o.jsxs)("div",{children:[o.jsx("h3",{children:"Paystack"}),o.jsx("p",{children:"Cards, Bank Transfer, USSD"})]}),"Paystack"===_&&o.jsx("span",{children:"Selected"})]}),(0,o.jsxs)("div",{className:"checkout-pay-option-pro",onClick:()=>N("OPay"),style:{cursor:"pointer",border:"OPay"===_?"2px solid #111827":"1px solid #e5e7eb"},children:[(0,o.jsxs)("div",{children:[o.jsx("h3",{children:"OPay"}),o.jsx("p",{children:"Pay securely with OPay"})]}),"OPay"===_&&o.jsx("span",{children:"Selected"})]})]}),(0,o.jsxs)("div",{className:"checkout-card-pro",children:[o.jsx("h2",{children:"Items in Your Order"}),0===L.length?o.jsx("p",{children:"Your cart is empty."}):o.jsx("div",{className:"checkout-items-pro",children:L.map(e=>(0,o.jsxs)("div",{className:"checkout-item-pro",children:[o.jsx("img",{src:e.image,alt:e.name}),(0,o.jsxs)("div",{children:[o.jsx("h3",{children:e.name}),(0,o.jsxs)("p",{children:["Qty: ",e.qty]})]}),o.jsx("strong",{children:(0,n.CZ)(e.price*e.qty)})]},String(e.id)))})]})]}),(0,o.jsxs)("aside",{className:"checkout-summary-pro",children:[o.jsx("h2",{children:"Order Summary"}),(0,o.jsxs)("div",{className:"coupon-box-pro",children:[o.jsx("input",{placeholder:"Enter coupon code",value:k,onChange:e=>P(e.target.value)}),o.jsx("button",{type:"button",onClick:function(){"WELCOME10"===k.trim().toUpperCase()?(w(10),(0,c.C)("Coupon applied successfully!","success")):(0,c.C)("Invalid coupon code. Please try again.","error")},children:"Apply"})]}),(0,o.jsxs)("div",{className:"checkout-summary-line",children:[o.jsx("span",{children:"Subtotal"}),o.jsx("strong",{children:(0,n.CZ)(M)})]}),v>0&&(0,o.jsxs)("div",{className:"checkout-summary-line",children:[o.jsx("span",{children:"Discount"}),(0,o.jsxs)("strong",{style:{color:"#16a34a"},children:["-",(0,n.CZ)(E)]})]}),(0,o.jsxs)("div",{className:"checkout-summary-line",children:[(0,o.jsxs)("span",{children:["Tax (",S,"%)"]}),o.jsx("strong",{children:(0,n.CZ)(A)})]}),(0,o.jsxs)("div",{className:"checkout-summary-line",children:[o.jsx("span",{children:"Shipping"}),o.jsx("strong",{children:(0,n.CZ)(T)})]}),(0,o.jsxs)("div",{className:"checkout-summary-total",children:[o.jsx("span",{children:"Total"}),o.jsx("strong",{children:(0,n.CZ)(I)})]}),i&&R?"Paystack"===_?o.jsx(p,{className:"checkout-pay-btn-pro",...Z}):o.jsx("button",{className:"checkout-pay-btn-pro",onClick:B,disabled:q,children:q?"Processing...":`Pay ${(0,n.CZ)(I)} with OPay`}):o.jsx("button",{className:"checkout-pay-btn-pro",disabled:!0,children:"Fill all details to pay"}),(0,o.jsxs)("p",{className:"checkout-safe-pro",children:["\uD83D\uDD12 Your payment is securely processed by"," ","Paystack"===_?"Paystack":"OPay","."]})]})]})]})}},99480:(e,t,r)=>{"use strict";r.d(t,{L:()=>o});let o=(e,t)=>{}},27692:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let o=r(20352);r(97247),r(28964);let s=o._(r(22404));function a(e,t){var r;let o={loading:e=>{let{error:t,isLoading:r,pastDelay:o}=e;return null}};"function"==typeof e&&(o.loader=e);let a={...o,...t};return(0,s.default)({...a,modules:null==(r=a.loadableGenerated)?void 0:r.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},99304:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return s}});let o=r(47173);function s(e){let{reason:t,children:r}=e;throw new o.BailoutToCSRError(t)}},22404:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let o=r(97247),s=r(28964),a=r(99304),i=r(24146);function n(e){return{default:e&&"default"in e?e.default:e}}let l={loader:()=>Promise.resolve(n(()=>null)),loading:null,ssr:!0},d=function(e){let t={...l,...e},r=(0,s.lazy)(()=>t.loader().then(n)),d=t.loading;function c(e){let n=d?(0,o.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,l=t.ssr?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.PreloadCss,{moduleIds:t.modules}),(0,o.jsx)(r,{...e})]}):(0,o.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,o.jsx)(r,{...e})});return(0,o.jsx)(s.Suspense,{fallback:n,children:l})}return c.displayName="LoadableComponent",c}},24146:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return a}});let o=r(97247),s=r(54580);function a(e){let{moduleIds:t}=e,r=(0,s.getExpectedRequestStore)("next/dynamic css"),a=[];if(r.reactLoadableManifest&&t){let e=r.reactLoadableManifest;for(let r of t){if(!e[r])continue;let t=e[r].files.filter(e=>e.endsWith(".css"));a.push(...t)}}return 0===a.length?null:(0,o.jsx)(o.Fragment,{children:a.map(e=>(0,o.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:r.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},57158:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});let o=(0,r(45347).createProxy)(String.raw`/workspaces/jayjaystyles/app/checkout/page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[379,644,540],()=>r(45393));module.exports=o})();