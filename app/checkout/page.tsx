'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createOrder, getCart, getProducts, money } from '@/lib/store';
import { trackEvent } from '@/lib/analytics';
import { getCheckoutSettings } from '@/lib/settings';
import { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/toast';

const PaystackButton = dynamic(() => import('react-paystack').then((mod) => mod.PaystackButton), {
  ssr: false,
});

export default function Checkout() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(7.5);
  const [shippingFee, setShippingFee] = useState(1500);

  const r = useRouter();

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
    getProducts().then(setProducts);
    getCheckoutSettings().then((s) => {
      setTaxRate(s.taxRate ?? 7.5);
      setShippingFee(s.shippingFee ?? 1500);
    });
  }, []);

  const items = cart
    .map((c) => {
      const p = products.find((p) => p.id === c.id);
      return p
        ? {
            id: p.id,
            name: p.name,
            price: p.price,
            qty: c.qty,
            image: p.image,
            category: p.category,
          }
        : null;
    })
    .filter(Boolean) as Array<{ id: string; name: string; price: number; qty: number; image?: string; category?: string }>;

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? shippingFee : 0;
  const tax = Math.round(subtotal * (taxRate / 100));
  const discountAmount = Math.round((subtotal * discount) / 100);
  const total = subtotal + shipping + tax - discountAmount;

  function applyCoupon() {
    if (couponCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscount(10);
     showToast(
  `Coupon applied successfully! You saved ₦${discount.toLocaleString()}`,
  'success'
);
    } else {
      showToast(
  'Invalid coupon code. Please try again.',
  'error'
);
    }
  }

  async function saveOrder(reference: string) {
    const orderId = String(Date.now());
    const orderDate = new Date().toLocaleString();

    await createOrder({
      id: orderId,
      items,
      subtotal,
      shipping,
      tax,
      total,
      taxRate,
      shippingFee,
      discountAmount,
      paymentMethod: 'Paystack',
      paymentReference: reference,
      customerEmail: email,
      customerName: fullName,
      customerPhone: phone,
      customerAddress: address,
      status: 'Processing',
      createdAt: new Date().toISOString(),
    });

    const emailHtml = `
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
                Hi <strong>${fullName}</strong>,<br><br>
                Thank you for shopping with luxury glow & beauty. Your payment has been received and your order is now being processed.
              </p>

              <!-- Order Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #4b5563;"><strong>Order ID:</strong> #${orderId}</p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #4b5563;"><strong>Order Date:</strong> ${orderDate}</p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #4b5563;"><strong>Payment Status:</strong> <span style="color: #16a34a; font-weight: bold;">Paid (${reference})</span></p>
                    <p style="margin: 0; font-size: 14px; color: #4b5563;"><strong>Delivery Address:</strong><br>${address}</p>
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
                  ${items.map(item => `
                    <tr>
                      <td align="left" style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                        <img src="${item.image || 'https://placehold.co/100x100/f5f5f5/333?text=Product'}" width="50" height="50" alt="Product Image" style="border-radius: 6px; display: block; object-fit: cover; background-color: #f1f5f9;">
                      </td>
                      <td align="left" style="padding: 15px 0; font-size: 15px; color: #111827; border-bottom: 1px solid #e5e7eb; font-weight: 500;">
                        ${item.name}
                      </td>
                      <td align="center" style="padding: 15px 0; font-size: 15px; color: #4b5563; border-bottom: 1px solid #e5e7eb;">
                        ${item.qty}
                      </td>
                      <td align="right" style="padding: 15px 0; font-size: 15px; color: #111827; border-bottom: 1px solid #e5e7eb; font-weight: bold;">
                        ₦${(item.price * item.qty).toLocaleString()}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" align="right" style="padding: 15px 0 5px; font-size: 14px; color: #6b7280;">Subtotal:</td>
                    <td align="right" style="padding: 15px 0 5px; font-size: 15px; color: #111827; font-weight: bold;">₦${subtotal.toLocaleString()}</td>
                  </tr>
                  ${discountAmount > 0 ? `
                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0; font-size: 14px; color: #6b7280;">Discount:</td>
                    <td align="right" style="padding: 5px 0; font-size: 15px; color: #16a34a; font-weight: bold;">-₦${discountAmount.toLocaleString()}</td>
                  </tr>` : ''}
                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0; font-size: 14px; color: #6b7280;">Tax (${taxRate}%):</td>
                    <td align="right" style="padding: 5px 0; font-size: 15px; color: #111827; font-weight: bold;">₦${tax.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="3" align="right" style="padding: 5px 0 15px; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Shipping:</td>
                    <td align="right" style="padding: 5px 0 15px; font-size: 15px; color: #111827; font-weight: bold; border-bottom: 1px solid #e5e7eb;">₦${shipping.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="3" align="right" style="padding: 15px 0 0; font-size: 16px; color: #111827; font-weight: bold;">Total:</td>
                    <td align="right" style="padding: 15px 0 0; font-size: 20px; color: #d4af37; font-weight: bold;">₦${total.toLocaleString()}</td>
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
    `;

    await fetch("/api/send-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: email,
        subject: "Order Confirmation - Luxury Glow & Beauty",
        html: emailHtml,
  }),
});

    trackEvent('purchase', {
      transaction_id: reference,
      currency: 'NGN',
      value: total,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || 'Beauty',
        price: item.price,
        quantity: item.qty,
      })),
    });

    if (typeof window !== 'undefined') {
      alert('Payment successful. Order placed!');
    }
    r.push('/account');
  }

  const canPay =
    email.trim() &&
    fullName.trim() &&
    phone.trim() &&
    address.trim() &&
    total > 0;

  const paystackConfig = {
    email,
    amount: total * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    text: `Pay ${money(total)}`,
    onSuccess: (response: unknown) =>
      saveOrder((response as { reference: string }).reference),
    onClose: () => {
      if (typeof window !== 'undefined') {
        alert('Payment cancelled');
      }
    },
  };

  return (
    <main className="checkout-page-pro">
      <section className="checkout-hero-pro">
        <div>
          <p>Secure Checkout</p>
          <h1>Complete Your Order</h1>
          <span>
            Pay safely with Paystack — card, transfer, USSD and bank options.
          </span>
        </div>
      </section>

      <section className="checkout-layout-pro">
        <div className="checkout-left-pro">
          <div className="checkout-card-pro">
            <h2>Customer Information</h2>

            <div className="checkout-form-grid">
              <input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="checkout-card-pro">
            <h2>Payment Method</h2>

            <div className="checkout-pay-option-pro">
              <div>
                <h3>Paystack</h3>
                <p>Cards, Bank Transfer, USSD</p>
              </div>

              <span>Selected</span>
            </div>
          </div>

          <div className="checkout-card-pro">
            <h2>Items in Your Order</h2>

            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="checkout-items-pro">
                {items.map((item) => (
                  <div className="checkout-item-pro" key={String(item.id)}>
                    <img src={item.image} alt={item.name} />

                    <div>
                      <h3>{item.name}</h3>
                      <p>Qty: {item.qty}</p>
                    </div>

                    <strong>{money(item.price * item.qty)}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="checkout-summary-pro">
          <h2>Order Summary</h2>

          <div className="coupon-box-pro">
            <input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button type="button" onClick={applyCoupon}>
              Apply
            </button>
          </div>

          <div className="checkout-summary-line">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>

          {discount > 0 && (
            <div className="checkout-summary-line">
              <span>Discount</span>
              <strong style={{ color: '#16a34a' }}>
                -{money(discountAmount)}
              </strong>
            </div>
          )}

          <div className="checkout-summary-line">
            <span>Tax ({taxRate}%)</span>
            <strong>{money(tax)}</strong>
          </div>

          <div className="checkout-summary-line">
            <span>Shipping</span>
            <strong>{money(shipping)}</strong>
          </div>

          <div className="checkout-summary-total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>

          {mounted && canPay ? (
            <PaystackButton
              className="checkout-pay-btn-pro"
              {...paystackConfig}
            />
          ) : (
            <button className="checkout-pay-btn-pro" disabled>
              Fill all details to pay
            </button>
          )}

          <p className="checkout-safe-pro">
            🔒 Your payment is securely processed by Paystack.
          </p>
        </aside>
      </section>
    </main>
  );
}