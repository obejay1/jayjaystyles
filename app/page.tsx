'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Scissors, Phone, Mail, MapPin, ArrowRight, Truck, Shield, Headphones, Heart, MessageCircle } from 'lucide-react';
import { getProducts, getWishlist, getCart } from '@/lib/store';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const updateWishlist = () => setWishlistCount(getWishlist().length);
    const updateCart = () => {
      const c = getCart();
      setCartCount(c.reduce((sum, item) => sum + item.qty, 0));
    };
    
    updateWishlist();
    updateCart();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('wishlist', updateWishlist);
      window.addEventListener('cart', updateCart);
      return () => {
        window.removeEventListener('wishlist', updateWishlist);
        window.removeEventListener('cart', updateCart);
      };
    }
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 8);

  return (
    <div className="home-page-pro">
      <style>{`
        * { box-sizing: border-box; }
        .home-page-pro { width: 100%; overflow-x: hidden; padding-bottom: 90px; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        
        /* Top Nav */
        .top-nav { background: white; border-bottom: 1px solid #e5e5e5; position: sticky; top: 0; z-index: 50; }
        .nav-container { display: flex; align-items: center; justify-content: space-between; padding: 16px; max-width: 1200px; margin: 0 auto; gap: 16px; }
        .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: #111; font-weight: 800; font-size: 1.25rem; white-space: nowrap; }
        
        .search-bar { display: flex; align-items: center; gap: 8px; background: #f3f4f6; padding: 10px 16px; border-radius: 999px; flex: 1; max-width: 500px; }
        .search-bar input { border: none; background: transparent; outline: none; width: 100%; font-size: 1rem; }
        
        .nav-actions { display: flex; align-items: center; gap: 20px; }
        .nav-link { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #4b5563; text-decoration: none; font-size: 0.75rem; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #d4a574; }
        
        @media (max-width: 767px) { 
          .desktop-only { display: none !important; } 
          .nav-container { flex-wrap: wrap; }
          .search-bar { order: 3; max-width: 100%; margin-top: 8px; }
        }

        /* Hero Section */
        .hero-pro {
          background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .hero-badge {
          display: inline-block;
          background: rgba(212, 165, 116, 0.2);
          color: #d4a574;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 24px;
          border: 1px solid rgba(212, 165, 116, 0.4);
        }
        .hero-content h1 {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 20px 0;
          line-height: 1.2;
          letter-spacing: -1px;
        }
        .hero-content p {
          font-size: 1.125rem;
          color: #9ca3af;
          margin: 0 auto 32px 0;
          line-height: 1.6;
          max-width: 600px;
        }
        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #d4a574;
          color: #111;
          padding: 14px 32px;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #c49464; }
        .btn-secondary {
          background: transparent;
          color: white;
          padding: 14px 32px;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 2px solid white;
          transition: all 0.2s;
        }
        .btn-secondary:hover { background: white; color: #111; }
        
        @media (max-width: 640px) {
          .hero-content h1 { font-size: 2.25rem; }
          .hero-content p { font-size: 1rem; }
          .hero-buttons { flex-direction: column; width: 100%; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
        }

        /* Features */
        .features-pro {
          background: white;
          padding: 40px 20px;
          border-bottom: 1px solid #e5e5e5;
        }
        .features-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }
        .feature-icon {
          width: 64px;
          height: 64px;
          background: #f8fafc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4a574;
        }
        .feature-item h3 { font-size: 1.125rem; margin: 0; color: #111; }
        .feature-item p { font-size: 0.875rem; color: #6b7280; margin: 0; }
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr; }
        }

        /* Products Section */
        .section-pro {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 16px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
        }
        .section-title h2 { font-size: 2rem; margin: 0 0 8px 0; color: #111; letter-spacing: -0.5px; }
        .section-title p { margin: 0; color: #6b7280; }
        .view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #d4a574;
          font-weight: 600;
          text-decoration: none;
        }
        
        .product-grid-pro {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 768px) { .product-grid-pro { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
        @media (min-width: 1024px) { .product-grid-pro { grid-template-columns: repeat(4, 1fr); } }

        /* Contact Section */
        .contact-pro {
          background: #111827;
          color: white;
          padding: 60px 20px;
          border-radius: 24px;
          margin: 40px 16px;
        }
        .contact-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        .contact-container h2 { font-size: 2rem; margin: 0 0 16px 0; }
        .contact-container p { color: #9ca3af; margin: 0 0 40px 0; font-size: 1.125rem; }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          text-align: left;
        }
        .contact-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 32px;
          border-radius: 16px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .contact-icon {
          color: #d4a574;
          background: rgba(212, 165, 116, 0.1);
          padding: 12px;
          border-radius: 12px;
        }
        .contact-card h3 { margin: 0 0 12px 0; font-size: 1.125rem; }
        .contact-card a { color: #e5e5e5; text-decoration: none; display: block; margin-bottom: 8px; font-size: 0.9375rem; }
        .contact-card a:hover { color: #d4a574; }

        /* Footer */
        .footer-pro {
          background: white;
          border-top: 1px solid #e5e5e5;
          padding: 60px 20px 20px;
        }
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }
        .footer-brand h3 { font-size: 1.5rem; font-weight: 800; margin: 0 0 16px 0; color: #111; }
        .footer-brand p { color: #6b7280; line-height: 1.6; margin: 0; }
        .footer-links h4 { font-size: 1.125rem; margin: 0 0 20px 0; color: #111; }
        .footer-links ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .footer-links a { color: #6b7280; text-decoration: none; }
        .footer-links a:hover { color: #d4a574; }
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;
          text-align: center;
          color: #9ca3af;
          font-size: 0.875rem;
        }
      `}</style>

      {/* TOP NAVIGATION */}
      <nav className="top-nav">
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">JayJayStyles</span>
          </Link>

          <div className="search-bar">
            <Search size={18} color="#6b7280" />
            <input type="text" placeholder="Search products or services..." />
          </div>

          <div className="nav-actions desktop-only">
            <Link href="/services" className="nav-link">
              <Scissors size={20} />
              <span>Services</span>
            </Link>
            <Link href="/wishlist" className="nav-link">
              <div style={{ position: 'relative' }}>
                <Heart size={20} />
                {wishlistCount > 0 && <span style={{ position: 'absolute', top: -8, right: -8, background: '#ef4444', color: 'white', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold' }}>{wishlistCount}</span>}
              </div>
              <span>Wishlist</span>
            </Link>
            <Link href="/cart" className="nav-link">
              <div style={{ position: 'relative' }}>
                <ShoppingCart size={20} />
                {cartCount > 0 && <span style={{ position: 'absolute', top: -8, right: -8, background: '#ef4444', color: 'white', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold' }}>{cartCount}</span>}
              </div>
              <span>Cart</span>
            </Link>
            <Link href="/account" className="nav-link">
              <User size={20} />
              <span>Account</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-pro">
        <div className="hero-content">
          <div className="hero-badge">Premium Beauty & Cleaning</div>
          <h1>Look Good, Live Clean</h1>
          <p>Professional beauty services and premium products delivered to your doorstep in lagos.</p>
          <div className="hero-buttons">
            <Link href="/shop" className="btn-primary">Shop Now <ArrowRight size={18} /></Link>
            <Link href="/services" className="btn-secondary">Book a Service <Scissors size={18} /></Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="features-pro">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon"><Truck size={28} /></div>
            <h3>Fast Delivery</h3>
            <p>Reliable and fast delivery to your doorstep anywhere in Lagos.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Shield size={28} /></div>
            <h3>Quality Guaranteed</h3>
            <p>100% authentic premium beauty and cleaning products.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Headphones size={28} /></div>
            <h3>24/7 Support</h3>
            <p>Our dedicated team is always ready to assist you.</p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-pro">
        <div className="section-header">
          <div className="section-title">
            <h2>Our Collections</h2>
            <p>Explore our premium products tailored for you.</p>
          </div>
          <Link href="/shop" className="view-all desktop-only">View All Products <ArrowRight size={16} /></Link>
        </div>
        <div className="product-grid-pro">
          {displayProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }} className="mobile-only-block">
          <Link href="/shop" className="btn-secondary" style={{ color: '#111', borderColor: '#e5e5e5', display: 'inline-flex', padding: '12px 24px' }}>
            View All Products
          </Link>
        </div>
        <style>{`
          .mobile-only-block { display: none; }
          @media (max-width: 767px) { .mobile-only-block { display: block; } }
        `}</style>
      </section>

      {/* Professional Contact Section */}
      <section className="contact-pro">
        <div className="contact-container">
          <h2>Need help or want to make an order?</h2>
          <p>Reach out to our customer service team. We are available to help you with your bookings and orders.</p>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon"><Mail size={24} /></div>
              <div>
                <h3>Email Us</h3>
                <a href="mailto:mercyjayjay89@gmail.com">mercyjayjay89@gmail.com</a>
                <a href="mailto:Josephgloria1121@icloud.com">Josephgloria1121@icloud.com</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><Phone size={24} /></div>
              <div>
                <h3>Call or WhatsApp</h3>
                <a href="tel:+2349022483595">+234 902 248 3595</a>
                <a href="tel:+2349155997846">+234 915 599 7846</a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '32px' }}>
            <a href="https://wa.me/2349022483595" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: '#25D366', color: 'white' }}>
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
