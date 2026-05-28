'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getWishlist } from '@/lib/store';
import { Product } from '@/lib/types';

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const all = await getProducts();
      const ids = getWishlist();
      setProducts(all.filter((p) => ids.includes(p.id)));
    }
    load();
    const on = () => load();
    if (typeof window !== 'undefined') {
      window.addEventListener('wishlist', on);
      return () => window.removeEventListener('wishlist', on);
    }
  }, []);

  return (
    <div className="container">
      <h2>My Wishlist</h2>
      {products.length === 0 ? (
        <p>Your wishlist is empty. <Link href="/shop">Browse products</Link>.</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
