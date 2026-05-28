'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { addToCart, getProducts, money } from '@/lib/store';
import { Product } from '@/lib/types';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState<Product | null>(null);
  const r = useRouter();

  useEffect(() => {
    getProducts().then((a) => {
      setP(a.find((x) => x.id === id) || null);
    });
  }, [id]);

  if (!p) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-loading">Loading product...</div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <section className="product-detail-wrap">
        <div className="product-image-box">
          <img src={p.image} alt={p.name} />
        </div>

        <div className="product-info-box">
          <p className="product-breadcrumb">JayJayStyles / {p.category}</p>

          <h1>{p.name}</h1>

          <p className="product-description">
            {p.description || 'Premium quality product from JayJayStyles.'}
          </p>

          <div className="product-price">{money(p.price)}</div>

          <div className="product-meta">
            <span>Category: {p.category}</span>
            <span>Stock: {p.stock || 0}</span>
          </div>

          <div className="product-actions">
            <button
              className="product-add-btn"
              onClick={() => {
                addToCart(p.id);
                r.push('/cart');
              }}
            >
              Add to Cart
            </button>

            <button
              className="product-back-btn"
              onClick={() => r.push('/shop')}
            >
              Back to Shop
            </button>
          </div>

          <div className="product-trust">
            <div>🚚 Fast delivery in Nigeria</div>
            <div>💳 Secure Paystack checkout</div>
            <div>✅ Quality checked products</div>
          </div>
        </div>
      </section>

      <Nav />
    </main>
  );
}