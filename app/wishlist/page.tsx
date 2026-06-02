'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getWishlist } from '@/lib/store';
import { Product } from '@/lib/types';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);

  async function loadWishlist() {
    const all = await getProducts();
    const ids = getWishlist();
    setProducts(all.filter((p) => ids.includes(p.id)));
  }

  useEffect(() => {
    loadWishlist();

    const on = () => loadWishlist();

    if (typeof window !== 'undefined') {
      window.addEventListener('wishlist', on);
      return () => window.removeEventListener('wishlist', on);
    }
  }, []);

  return (
    <main className="wishlist-page">
      <section className="wishlist-hero">
        <div className="wishlist-icon">
          <Heart size={34} fill="currentColor" />
        </div>

        <p className="wishlist-label">Your saved favourites</p>
        <h1>My Wishlist</h1>
        <p className="wishlist-subtitle">
          Keep track of the beauty products, hair essentials, accessories, and services you love.
        </p>
      </section>

      <section className="wishlist-content">
        <div className="wishlist-header">
          <div>
            <p className="wishlist-small-title">Saved Items</p>
            <h2>{products.length} item{products.length === 1 ? '' : 's'} saved</h2>
          </div>

          <Link href="/shop" className="wishlist-shop-link">
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <Heart size={42} />
            </div>

            <h2>Your wishlist is empty</h2>
            <p>
              Browse JayJayStyles products and tap the heart icon to save your favourite items here.
            </p>

            <Link href="/shop" className="wishlist-empty-btn">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}