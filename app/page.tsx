'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Scissors, Phone, Mail, MapPin, Star, ArrowRight, Truck, Shield, Headphones, Heart } from 'lucide-react';
import { getProducts } from '@/lib/store';
import { Product } from '@/lib/types';
import Loading from '@/components/loading';
import ProductCard from '@/components/ProductCard';
import { getWishlist } from '@/lib/store';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    setWishlistCount(getWishlist().length);
    const on = () => setWishlistCount(getWishlist().length);
    if (typeof window !== 'undefined') {
      window.addEventListener('wishlist', on);
      return () => window.removeEventListener('wishlist', on);
    }
  }, []);

  const featured = products.filter((p) => p.featured);
  const bestsellers = products.filter((p) => p.bestseller);

  return (
    <div className="jayjay-home">
      {/* TOP NAVIGATION */}
      <nav className="top-nav">
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">JayJayStyles</span>
          </Link>

          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search products or services..." />
            <button className="search-btn">Search</button>
          </div>

          <div className="nav-actions">
            <Link href="/services" className="nav-link">
              <Scissors size={20} />
              <span>Services</span>
            </Link>
            <Link href="/wishlist" className="nav-link nav-wishlist">
              <Heart size={20} />
              <span>Wishlist</span>
              <span className="count">{wishlistCount}</span>
            </Link>
            <Link href="/cart" className="nav-link">
              <ShoppingCart size={20} />
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
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">✨ Premium Beauty & Cleaning</span>
            <h1>Look Good, Live Clean</h1>
            <p>Professional beauty services and premium cleaning products delivered to your doorstep in Nigeria.</p>
            <div className="hero-buttons">
              <Link href="/shop" className="btn-primary">Shop Now</Link>
              <Link href="/services" className="btn-secondary">Book a Service</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1615984381207-1e5f2c40ee3f?w=600&h=500&fit=crop" alt="Beauty services" />
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="trust-badges">
        <div className="trust-container">
          <div className="trust-item">
            <Truck size={32} />
            <h4>Fast Delivery</h4>
            <p>Same-day delivery in Lagos</p>
          </div>
          <div className="trust-item">
            <Shield size={32} />
            <h4>Quality Guaranteed</h4>
            <p>100% authentic products</p>
          </div>
          <div className="trust-item">
            <Headphones size={32} />
            <h4>24/7 Support</h4>
            <p>We're always here to help</p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="products-section">
          <div className="section-container">
            <div className="section-header">
              <h2>Featured Products</h2>
              <Link href="/shop" className="view-all">View All <ArrowRight size={16} /></Link>
            </div>
            <div className="products-grid">
              {featured.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES BANNER */}
      <section className="services-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2>Professional Beauty Services</h2>
            <p>Book hair styling, makeup, spa treatments and more with our expert team.</p>
            <Link href="/services" className="btn-primary">Book Appointment</Link>
          </div>
          <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=350&fit=crop" alt="Beauty services" />
        </div>
      </section>

      {/* BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="products-section">
          <div className="section-container">
            <div className="section-header">
              <h2>Bestsellers</h2>
              <Link href="/shop" className="view-all">View All <ArrowRight size={16} /></Link>
            </div>
            <div className="products-grid">
              {bestsellers.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROMO SECTION */}
      <section className="promo-section">
        <div className="promo-container">
          <div className="promo-card">
            <div className="promo-text">
              <span className="promo-tag">Limited Time Offer</span>
              <h2>20% Off Beauty & Cleaning Supplies</h2>
              <p>Shop quality products with fast delivery across Nigeria. Use code <strong>JAYJAY20</strong> at checkout.</p>
              <Link href="/shop" className="btn-primary">Shop Now</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop" alt="Products" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-container">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars"><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /></div>
              <p>"Amazing service! My hair looks fantastic and the products are top quality."</p>
              <span className="customer-name">— Sarah O.</span>
            </div>
            <div className="testimonial-card">
              <div className="stars"><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /></div>
              <p>"Fast delivery and great prices. JayJayStyles is now my go-to for beauty products."</p>
              <span className="customer-name">— Michael K.</span>
            </div>
            <div className="testimonial-card">
              <div className="stars"><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /><Star size={16} fill="#f59e0b" /></div>
              <p>"The booking system is so easy. Got my appointment confirmed instantly!"</p>
              <span className="customer-name">— Blessing A.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>JayJayStyles</h3>
            <p>Your one-stop shop for beauty services and premium cleaning products in Nigeria.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link href="/shop">Shop</Link>
            <Link href="/services">Services</Link>
            <Link href="/account">My Account</Link>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><Phone size={14} /> +234 801 234 5678</p>
            <p><Mail size={14} /> hello@jayjaystyles.com</p>
            <p><MapPin size={14} /> Lagos, Nigeria</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 JayJayStyles. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

