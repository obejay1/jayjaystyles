'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import { getProducts, getWishlist, getCart } from '@/lib/store';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import Loading from '@/components/Loading';
import Footer from '@/components/Footer';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProducts().then(res => {
      setProducts(res.filter(p => p.type === 'product'));
      setLoading(false);
    });
    
    setWishlist(getWishlist());
    const updateCount = () => {
      const c = getCart();
      setCartCount(c.reduce((sum, item) => sum + item.qty, 0));
    };
    updateCount();
    
    const onWishlist = () => setWishlist(getWishlist());
    window.addEventListener('wishlist', onWishlist);
    window.addEventListener('cart', updateCount);
    return () => {
      window.removeEventListener('wishlist', onWishlist);
      window.removeEventListener('cart', updateCount);
    };
  }, []);

  const categories = ['All', 'Hair', 'Beauty', 'Accessories', 'Skincare'];
  // Filter by category first, then by search
  let filteredProducts = category === 'All' ? products : products.filter(p => p.category === category);
  if (search.trim()) {
    const s = search.trim().toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      (p.name && p.name.toLowerCase().includes(s)) ||
      (p.category && p.category.toLowerCase().includes(s)) ||
      (p.description && p.description.toLowerCase().includes(s))
    );
  }

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
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="nav-actions desktop-only">
            <Link href="/cart" className="nav-link">
              <div style={{ position: 'relative' }}>
                <ShoppingCart size={20} />
                {cartCount > 0 && <span style={{ position: 'absolute', top: -8, right: -8, background: '#ef4444', color: 'white', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold' }}>{cartCount}</span>}
              </div>
              <span>Cart</span>
            </Link>
            <Link href="/account" className="nav-link"><User size={20} /><span>Account</span></Link>
          </div>
        </div>
      </nav>

      <div className="shop-hero-pro">
        <div className="shop-hero-content">
          <span>Premium Collection</span>
          <h1>Elevate Your Style</h1>
          <p>Discover our curated selection of premium beauty and hair products designed to bring out your inner radiance.</p>
          <button className="shop-hero-btn" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>Shop Now</button>
        </div>
      </div>

      <div className="shop-toolbar-pro">
        <div className="shop-search-pro">
          <input
            type="text"
            placeholder="Search for products, brands, and more..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
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

        <div
          className="shop-grid-pro"
        >
          {/* Responsive grid: 1 col mobile, 2 tablet, 4 desktop */}
          <style>{`
            * { box-sizing: border-box; }
            .shop-page-pro { width: 100%; overflow-x: hidden; padding-bottom: 90px; }
            
            .shop-grid-pro { 
              display: grid;
                grid-template-columns: 1fr;
              gap: 1.5rem;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
              width: 100%;
              padding: 0 16px 80px 16px;
            }
            @media (min-width: 640px) { .shop-grid-pro { grid-template-columns: repeat(2, 1fr); } }
            @media (min-width: 768px) { .shop-grid-pro { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
            @media (min-width: 1024px) { .shop-grid-pro { grid-template-columns: repeat(4, 1fr); } }
            
            .shop-category-pro { 
              display: flex; gap: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 8px; scrollbar-width: none; 
            }
            .shop-category-pro::-webkit-scrollbar { display: none; }
            .shop-category-pro button {
              padding: 8px 16px; border-radius: 999px; border: 1px solid #e5e5e5; background: white; white-space: nowrap; cursor: pointer; flex-shrink: 0;
            }
            .shop-category-pro button.active { background: #111827; color: white; border-color: #111827; }
            
            .shop-empty-pro { text-align: center; padding: 40px 16px; color: #888; grid-column: 1 / -1; }
            
            .shop-search-pro input { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid #e5e5e5; margin-bottom: 16px; outline: none; box-sizing: border-box; font-size: 1rem; }
            .shop-search-pro input:focus { border-color: #111827; }
            
            .shop-toolbar-pro { padding: 0 16px; margin: 24px 0; width: 100%; }
            .shop-section-head { padding: 0 16px; margin-bottom: 20px; }
            .shop-section-head h2 { font-size: 1.5rem; margin-top: 4px; color: #111; }
            .shop-section-head span { color: #d4a574; font-weight: 600; text-transform: uppercase; font-size: 0.875rem; }
            .shop-section-head p { color: #6b7280; font-size: 0.875rem; margin-top: 4px; }
            
            .shop-hero-pro { background: #111827; color: white; padding: 60px 20px; text-align: center; }
            .shop-hero-content span { color: #d4a574; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; font-size: 0.875rem; }
            .shop-hero-content h1 { font-size: 2.5rem; margin: 12px 0; }
            .shop-hero-content p { color: #9ca3af; max-width: 500px; margin: 0 auto 24px; line-height: 1.5; }
            .shop-hero-btn { background: #d4af37; color: #111; border: none; padding: 12px 28px; border-radius: 999px; font-weight: 700; cursor: pointer; font-size: 1rem; }
            
            .top-nav { background: white; border-bottom: 1px solid #e5e5e5; position: sticky; top: 0; z-index: 50; }
            .nav-container { display: flex; align-items: center; justify-content: space-between; padding: 16px; max-width: 1200px; margin: 0 auto; }
            .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: #111; font-weight: 800; font-size: 1.25rem; }
            
            .search-bar { display: none; }
            @media (min-width: 768px) {
              .search-bar { display: flex; align-items: center; gap: 8px; background: #f3f4f6; padding: 8px 16px; border-radius: 999px; flex: 1; max-width: 400px; margin: 0 24px; }
              .search-bar input { border: none; background: transparent; outline: none; width: 100%; }
            }
            
            .nav-actions { display: flex; align-items: center; gap: 16px; }
            .nav-link { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #4b5563; text-decoration: none; font-size: 0.75rem; }
            @media (max-width: 767px) { .desktop-only { display: none; } }
          `}</style>
          {filteredProducts.length === 0 ? (
            <div className="shop-empty-pro">
              <h3>No products found</h3>
              <p>Try changing your category or search term.</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product.id} p={product} />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}