'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import { getProducts } from '@/lib/store';
import { Product } from '@/lib/types';
import Loading from '@/components/Loading';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    getProducts().then(res => {
      setProducts(res.filter(p => p.type === 'product'));
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Hair', 'Beauty', 'Accessories', 'Skincare'];
  const filteredProducts = category === 'All' ? products : products.filter(p => p.category === category);

  if (loading) return <Loading fullScreen />;

  return (
    <div className="shop-page-pro">
      {/* Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">JayJayStyles</span>
          </Link>
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search products..." />
          </div>
          <div className="nav-actions desktop-only">
            <Link href="/cart" className="nav-link"><ShoppingCart size={20} /><span>Cart</span></Link>
            <Link href="/account" className="nav-link"><User size={20} /><span>Account</span></Link>
          </div>
        </div>
      </nav>

      <div className="shop-hero-pro">
        <div className="shop-hero-content">
          <span>Premium Collection</span>
          <h1>Elevate Your Style</h1>
          <p>Discover our curated selection of premium beauty and hair products designed to bring out your inner radiance.</p>
          <button className="shop-hero-btn">Shop Now</button>
        </div>
      </div>

      <div className="shop-toolbar-pro">
        <div className="shop-search-pro">
          <input type="text" placeholder="Search for products, brands, and more..." />
          <div className="shop-category-pro">
            {categories.map(c => (
              <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="shop-section-pro">
        <div className="shop-section-head">
          <div>
            <span>Our Products</span>
            <h2>Latest Arrivals</h2>
          </div>
          <p>Showing {filteredProducts.length} products</p>
        </div>

        <div className="shop-grid-pro">
          {filteredProducts.length === 0 ? (
            <div className="shop-empty-pro" style={{ gridColumn: '1 / -1' }}>
              <h3>No products found</h3>
              <p>Try changing your category or search term.</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <Link href={`/product/${product.id}`} key={product.id} className="product-card" style={{ display: 'block', textDecoration: 'none' }}>
                <div className="product-image">
                  <img 
                    src={product.image || `https://placehold.co/400x400/f5f5f5/333?text=${encodeURIComponent(product.name)}`}
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/f5f5f5/333?text=Product';
                    }}
                  />
                  <button className="wishlist-btn" onClick={(e) => { e.preventDefault(); }}>
                    <Heart size={18} />
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category || 'Beauty'}</div>
                  <h3 style={{ color: '#111' }}>{product.name}</h3>
                  <div className="product-footer">
                    <span className="product-price">₦{product.price?.toLocaleString()}</span>
                    <button className="btn-add" onClick={(e) => { 
                      e.preventDefault();
                      // Integrate your actual cart addition logic here
                      alert('Added to cart!'); 
                    }}>Add to Cart</button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}