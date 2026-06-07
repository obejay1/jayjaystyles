(()=>{var e={};e.id=285,e.ids=[285],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},45393:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>d}),r(57158),r(49976),r(90996);var o=r(30170),s=r(45002),a=r(83876),n=r.n(a),l=r(66299),i={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>l[e]);r.d(t,i);let d=["",{children:["checkout",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,57158)),"/workspaces/jayjaystyles/app/checkout/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,49976)),"/workspaces/jayjaystyles/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,90996,23)),"next/dist/client/components/not-found-error"]}],c=["/workspaces/jayjaystyles/app/checkout/page.tsx"],p="/checkout/page",u={require:r,loadChunk:()=>Promise.resolve()},x=new o.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/checkout/page",pathname:"/checkout",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},24675:(e,t,r)=>{Promise.resolve().then(r.bind(r,33566))},33566:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var o=r(97247),s=r(28964),a=r(27692),n=r.n(a),l=r(94364),i=r(99480);r(6822);var d=r(34178),c=r(10211);let p=n()(async()=>{},{loadableGenerated:{modules:["app/checkout/page.tsx -> react-paystack"]},ssr:!1});function u(){let[e,t]=(0,s.useState)([]),[r,a]=(0,s.useState)([]),[n,u]=(0,s.useState)(!1),[x,h]=(0,s.useState)(""),[g,f]=(0,s.useState)(""),[m,y]=(0,s.useState)(""),[b,j]=(0,s.useState)(""),[v,k]=(0,s.useState)(""),[w,P]=(0,s.useState)(0),[S,C]=(0,s.useState)(7.5),[z,_]=(0,s.useState)(1500),q=(0,d.useRouter)(),N=r.map(t=>{let r=e.find(e=>e.id===t.id);return r?{id:r.id,name:r.name,price:r.price,qty:t.qty,image:r.image,category:r.category}:null}).filter(Boolean),O=N.reduce((e,t)=>e+t.price*t.qty,0),$=O>0?z:0,D=Math.round(S/100*O),L=Math.round(O*w/100),M=O+$+D-L;async function T(e){let t=String(Date.now()),r=new Date().toLocaleString();await (0,l.LV)({id:t,items:N,subtotal:O,shipping:$,tax:D,total:M,taxRate:S,shippingFee:z,discountAmount:L,paymentMethod:"Paystack",paymentReference:e,customerEmail:x,customerName:g,customerPhone:m,customerAddress:b,status:"Processing",createdAt:new Date().toISOString()});let o=`
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
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #111827; padding: 30px 20px;">
              <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: bold; text-transform: uppercase;">JayJayStyles</h1>
              <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 14px;">Luxury Glow & Beauty</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #111827;">Order Confirmation</h2>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; color: #4b5563;">
                Hi <strong>${g}</strong>,<br><br>
                Thank you for shopping with luxury glow & beauty. Your payment has been received and your order is now being processed.
              </p>

              <!-- Order Details Box -->
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

              <!-- Items Table -->
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
                  ${N.map(e=>`
                    <tr>
                      <td align="left" style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                        <img src="${e.image||"https://placehold.co/100x100/f5f5f5/333?text=Product"}" width="50" height="50" alt="Product Image" style="border-radius: 6px; display: block; object-fit: cover; background-color: #f1f5f9;">
                      </td>
                      <td align="left" style="padding: 15px 0; font-size: 15px; color: #111827; border-bottom: 1px solid #e5e7eb; font-weight: 500;">
                        ${e.name}
                      </td>
                      <td align="center" style="padding: 15px 0; font-size: 15px; color: #4b5563; border-bottom: 1px solid #e5e7eb;">
                        ${e.qty}
                      </td>
                      <td align="right" style="padding: 15px 0; font-size: 15px; color: #111827; border-bottom: 1px solid #e5e7eb; font-weight: bold;">
                        ₦${(e.price*e.qty).toLocaleString()}
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" align="right" style="padding: 15px 0 5px; font-size: 14px; color: #6b7280;">Subtotal:</td>
                    <td align="right" style="padding: 15px 0 5px; font-size: 15px; color: #111827; font-weight: bold;">₦${O.toLocaleString()}</td>
                  </tr>
                  ${L>0?`
                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0; font-size: 14px; color: #6b7280;">Discount:</td>
                    <td align="right" style="padding: 5px 0; font-size: 15px; color: #16a34a; font-weight: bold;">-₦${L.toLocaleString()}</td>
                  </tr>`:""}
                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0; font-size: 14px; color: #6b7280;">Tax (${S}%):</td>
                    <td align="right" style="padding: 5px 0; font-size: 15px; color: #111827; font-weight: bold;">₦${D.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0 15px; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Shipping:</td>
                    <td align="right" style="padding: 5px 0 15px; font-size: 15px; color: #111827; font-weight: bold; border-bottom: 1px solid #e5e7eb;">₦${$.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="3" align="right" style="padding: 15px 0 0; font-size: 16px; color: #111827; font-weight: bold;">Total:</td>
                    <td align="right" style="padding: 15px 0 0; font-size: 20px; color: #d4af37; font-weight: bold;">₦${M.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>

              <!-- Action Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <a href="https://jayjaystyles-azee.vercel.app/order" style="display: inline-block; padding: 14px 30px; background-color: #d4af37; color: #111827; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 9999px; margin-bottom: 15px; width: 200px; text-align: center;">Track Order</a>
                    <br>
                    <a href="https://wa.me/+2349022483595" style="display: inline-block; padding: 14px 30px; background-color: #25d366; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 9999px; width: 200px; text-align: center;">WhatsApp Support</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
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
    `;await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:x,subject:"Order Confirmation - Luxury Glow & Beauty",html:o})}),(0,i.L)("purchase",{transaction_id:e,currency:"NGN",value:M,items:N.map(e=>({item_id:e.id,item_name:e.name,item_category:e.category||"Beauty",price:e.price,quantity:e.qty}))}),q.push("/account")}let A=x.trim()&&g.trim()&&m.trim()&&b.trim()&&M>0,E={email:x,amount:100*M,publicKey:"pk_test_018eeac98793217c39dc038011872969714f692c",text:`Pay ${(0,l.CZ)(M)}`,onSuccess:e=>T(e.reference),onClose:()=>{}};return(0,o.jsxs)("main",{className:"checkout-page-pro",children:[o.jsx("section",{className:"checkout-hero-pro",children:(0,o.jsxs)("div",{children:[o.jsx("p",{children:"Secure Checkout"}),o.jsx("h1",{children:"Complete Your Order"}),o.jsx("span",{children:"Pay safely with Paystack — card, transfer, USSD and bank options."})]})}),(0,o.jsxs)("section",{className:"checkout-layout-pro",children:[(0,o.jsxs)("div",{className:"checkout-left-pro",children:[(0,o.jsxs)("div",{className:"checkout-card-pro",children:[o.jsx("h2",{children:"Customer Information"}),(0,o.jsxs)("div",{className:"checkout-form-grid",children:[o.jsx("input",{placeholder:"Full Name",value:g,onChange:e=>f(e.target.value)}),o.jsx("input",{placeholder:"Phone Number",value:m,onChange:e=>y(e.target.value)}),o.jsx("input",{placeholder:"Email Address",value:x,onChange:e=>h(e.target.value)}),o.jsx("input",{placeholder:"Delivery Address",value:b,onChange:e=>j(e.target.value)})]})]}),(0,o.jsxs)("div",{className:"checkout-card-pro",children:[o.jsx("h2",{children:"Payment Method"}),(0,o.jsxs)("div",{className:"checkout-pay-option-pro",children:[(0,o.jsxs)("div",{children:[o.jsx("h3",{children:"Paystack"}),o.jsx("p",{children:"Cards, Bank Transfer, USSD"})]}),o.jsx("span",{children:"Selected"})]})]}),(0,o.jsxs)("div",{className:"checkout-card-pro",children:[o.jsx("h2",{children:"Items in Your Order"}),0===N.length?o.jsx("p",{children:"Your cart is empty."}):o.jsx("div",{className:"checkout-items-pro",children:N.map(e=>(0,o.jsxs)("div",{className:"checkout-item-pro",children:[o.jsx("img",{src:e.image,alt:e.name}),(0,o.jsxs)("div",{children:[o.jsx("h3",{children:e.name}),(0,o.jsxs)("p",{children:["Qty: ",e.qty]})]}),o.jsx("strong",{children:(0,l.CZ)(e.price*e.qty)})]},String(e.id)))})]})]}),(0,o.jsxs)("aside",{className:"checkout-summary-pro",children:[o.jsx("h2",{children:"Order Summary"}),(0,o.jsxs)("div",{className:"coupon-box-pro",children:[o.jsx("input",{placeholder:"Enter coupon code",value:v,onChange:e=>k(e.target.value)}),o.jsx("button",{type:"button",onClick:function(){"WELCOME10"===v.trim().toUpperCase()?(P(10),(0,c.C)(`Coupon applied successfully! You saved ₦${w.toLocaleString()}`,"success")):(0,c.C)("Invalid coupon code. Please try again.","error")},children:"Apply"})]}),(0,o.jsxs)("div",{className:"checkout-summary-line",children:[o.jsx("span",{children:"Subtotal"}),o.jsx("strong",{children:(0,l.CZ)(O)})]}),w>0&&(0,o.jsxs)("div",{className:"checkout-summary-line",children:[o.jsx("span",{children:"Discount"}),(0,o.jsxs)("strong",{style:{color:"#16a34a"},children:["-",(0,l.CZ)(L)]})]}),(0,o.jsxs)("div",{className:"checkout-summary-line",children:[(0,o.jsxs)("span",{children:["Tax (",S,"%)"]}),o.jsx("strong",{children:(0,l.CZ)(D)})]}),(0,o.jsxs)("div",{className:"checkout-summary-line",children:[o.jsx("span",{children:"Shipping"}),o.jsx("strong",{children:(0,l.CZ)($)})]}),(0,o.jsxs)("div",{className:"checkout-summary-total",children:[o.jsx("span",{children:"Total"}),o.jsx("strong",{children:(0,l.CZ)(M)})]}),n&&A?o.jsx(p,{className:"checkout-pay-btn-pro",...E}):o.jsx("button",{className:"checkout-pay-btn-pro",disabled:!0,children:"Fill all details to pay"}),o.jsx("p",{className:"checkout-safe-pro",children:"\uD83D\uDD12 Your payment is securely processed by Paystack."})]})]})]})}},99480:(e,t,r)=>{"use strict";r.d(t,{L:()=>o});let o=(e,t)=>{}},27692:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let o=r(20352);r(97247),r(28964);let s=o._(r(22404));function a(e,t){var r;let o={loading:e=>{let{error:t,isLoading:r,pastDelay:o}=e;return null}};"function"==typeof e&&(o.loader=e);let a={...o,...t};return(0,s.default)({...a,modules:null==(r=a.loadableGenerated)?void 0:r.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},99304:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return s}});let o=r(47173);function s(e){let{reason:t,children:r}=e;throw new o.BailoutToCSRError(t)}},22404:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let o=r(97247),s=r(28964),a=r(99304),n=r(24146);function l(e){return{default:e&&"default"in e?e.default:e}}let i={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},d=function(e){let t={...i,...e},r=(0,s.lazy)(()=>t.loader().then(l)),d=t.loading;function c(e){let l=d?(0,o.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,i=t.ssr?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.PreloadCss,{moduleIds:t.modules}),(0,o.jsx)(r,{...e})]}):(0,o.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,o.jsx)(r,{...e})});return(0,o.jsx)(s.Suspense,{fallback:l,children:i})}return c.displayName="LoadableComponent",c}},24146:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return a}});let o=r(97247),s=r(54580);function a(e){let{moduleIds:t}=e,r=(0,s.getExpectedRequestStore)("next/dynamic css"),a=[];if(r.reactLoadableManifest&&t){let e=r.reactLoadableManifest;for(let r of t){if(!e[r])continue;let t=e[r].files.filter(e=>e.endsWith(".css"));a.push(...t)}}return 0===a.length?null:(0,o.jsx)(o.Fragment,{children:a.map(e=>(0,o.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:r.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},57158:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});let o=(0,r(45347).createProxy)(String.raw`/workspaces/jayjaystyles/app/checkout/page.tsx#default`)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[379,644,540],()=>r(45393));module.exports=o})();