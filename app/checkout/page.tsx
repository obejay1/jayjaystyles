'use client';

import { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { createOrder, getCart, getProducts, money } from '@/lib/store';
import { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const [products, setProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const r = useRouter();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const cart = getCart();

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
          }
        : null;
    })
    .filter(Boolean) as unknown[];

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 1500 : 0;
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + shipping + tax;

  async function saveOrder(reference: string) {
    await createOrder({
      id: String(Date.now()),
      items,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod: 'Paystack',
      paymentReference: reference,
      customerEmail: email,
      customerName: fullName,
      customerPhone: phone,
      customerAddress: address,
      status: 'Processing',
      createdAt: new Date().toISOString(),
    });

    alert('Payment successful. Order placed!');
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
    onSuccess: (response: unknown) => saveOrder((response as { reference: string }).reference),
    onClose: () => alert('Payment cancelled'),
  };

  return (
    <main className="checkout-page-pro">
      <section className="checkout-hero-pro">
        <div>
          <p>Secure Checkout</p>
          <h1>Complete Your Order</h1>
          <span>Pay safely with Paystack — card, transfer, USSD and bank options.</span>
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
                  <div className="checkout-item-pro" key={item.id}>
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

          <div className="checkout-summary-line">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>

          <div className="checkout-summary-line">
            <span>Shipping</span>
            <strong>{money(shipping)}</strong>
          </div>

          <div className="checkout-summary-line">
            <span>Tax</span>
            <strong>{money(tax)}</strong>
          </div>

          <div className="checkout-summary-total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>

          {canPay ? (
            <PaystackButton className="checkout-pay-btn-pro" {...paystackConfig} />
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