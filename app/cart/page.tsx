'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';

export default function Cart() {
  // Mock cart state for visual redesign. Replace this with your actual global state/hook (e.g., useCart)
  const [cart, setCart] = useState([
    { id: '1', name: 'Luxury Hair Extensions', price: 45000, quantity: 1, image: '', category: 'Hair' },
    { id: '2', name: 'Premium Skincare Set', price: 25000, quantity: 2, image: '', category: 'Beauty' }
  ]);

  const updateQuantity = (id: string, newQty: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="checkout-page-pro">
      <nav className="top-nav" style={{ position: 'static' }}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">JayJayStyles</span>
          </Link>
          <Link href="/shop" className="nav-link" style={{ flexDirection: 'row', gap: '8px', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </nav>

      <div className="checkout-hero-pro" style={{ minHeight: '300px' }}>
        <div>
          <p>Your Bag</p>
          <h1>Review Your Cart</h1>
          <span>{cart.length} items in your bag</span>
        </div>
      </div>

      <div className="checkout-layout-pro" style={{ marginTop: '-60px' }}>
        <div className="checkout-card-pro">
          <h2>Cart Items</h2>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <ShoppingBag size={48} color="#ccc" style={{ margin: '0 auto 16px' }} />
              <h3>Your cart is empty</h3>
              <Link href="/shop" style={{ display: 'inline-block', marginTop: '16px', background: '#111', color: '#d4af37', padding: '12px 24px', borderRadius: '999px', fontWeight: 'bold' }}>
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="checkout-items-pro">
              {cart.map(item => (
                <div key={item.id} className="checkout-item-pro" style={{ gridTemplateColumns: '80px 1fr auto auto' }}>
                  <img src={item.image || `https://placehold.co/80x80/f5f5f5/333?text=${encodeURIComponent(item.name.substring(0,2))}`} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p style={{ fontSize: '13px', color: '#888' }}>{item.category}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', padding: 0 }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <div className="qty" style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '12px', background: '#f5f5f5', padding: '6px 12px', borderRadius: '999px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.quantity}</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div style={{ fontWeight: '800', fontSize: '16px', alignSelf: 'center' }}>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="checkout-summary-pro">
          <h2>Order Summary</h2>
          <div className="checkout-summary-line">
            <span>Subtotal</span>
            <span style={{ fontWeight: 600 }}>₦{cartTotal.toLocaleString()}</span>
          </div>
          <div className="checkout-summary-line">
            <span>Shipping</span>
            <span style={{ color: '#666' }}>Calculated at checkout</span>
          </div>
          <div className="checkout-summary-line">
            <span>Tax</span>
            <span style={{ color: '#666' }}>Included</span>
          </div>
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>
          <button 
            className="checkout-pay-btn-pro" 
            disabled={cart.length === 0}
            onClick={() => alert('Proceeding to checkout')}
          >
            Proceed to Checkout
          </button>
          <p className="checkout-safe-pro">🔒 Safe and secure checkout</p>
        </div>
      </div>
    </div>
  );
}