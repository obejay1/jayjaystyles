'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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

      {/* TOP NAVIGATION */}
      <nav className="top-nav">
        <div className="nav-container">
          <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, fontSize: '1.5rem' }}>
            <Image
              src="/logo.png"
              alt="JayJayStyles Logo"
              width={50}
              height={50}
              priority
              className="w-10 h-10 md:w-[50px] md:h-[50px] object-contain"
            />
            <span className="logo-text">JayJayStyles</span>
          </Link>

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
          <div className="hero-badge">Look Beautiful. Live Stylish.</div>
          <h1>Welcome to JayJayStyles</h1>
          <p>Your trusted destination for premium beauty products, fashion accessories, hair essentials, and home accessories across Nigeria.</p>
          <div className="hero-buttons">
            <Link href="/shop" className="btn-primary">Shop with Confidence <ArrowRight size={18} /></Link>
            <Link href="/services" className="btn-secondary">Book a Service <Scissors size={18} /></Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE JAYJAYSTYLES */}
      <section className="features-pro">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon"><Truck size={28} /></div>
            <h3>Fast and Secure Delivery</h3>
            <p>Convenient online shopping with reliable shipping across Nigeria.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Shield size={28} /></div>
            <h3>Premium Quality</h3>
            <p>Curated beauty, fashion and home products sourced for authenticity and style.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Headphones size={28} /></div>
            <h3>Dedicated Support</h3>
            <p>Expert customer care ready to help with orders and service bookings.</p>
          </div>
        </div>
      </section>

      <section className="offer-section">
        <div className="offer-grid">
          <div className="offer-card">
            <h3>Hair & Beauty Essentials</h3>
            <p>Discover a wide selection of products designed to keep your hair healthy, stylish, and beautiful.</p>
            <ul>
              <li>Hair extensions, wigs, and hair accessories</li>
              <li>Hair care products, maintenance essentials, and styling tools</li>
              <li>Beads, gele accessories, and premium styling accents</li>
            </ul>
          </div>
          <div className="offer-card">
            <h3>Makeup, Fashion & Home</h3>
            <p>Complete your look with elegant beauty products, fashionable accessories, and quality home essentials.</p>
            <ul>
              <li>Face makeup, lip products, skincare, and beauty tools</li>
              <li>Elegant beads, jewelry, and fashion accessories</li>
              <li>Kitchen utensils, home organizers, and everyday living essentials</li>
            </ul>
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
      </section>

      {/* PROFESSIONAL SERVICES */}
      <section className="services-info-pro">
        <div className="services-info-container">
          <div className="services-info-text">
            <h2>Professional Beauty Services</h2>
            <p>Beyond products, JayJayStyles offers tailored beauty services to help you look and feel confident for every occasion.</p>
            <ul className="services-list">
              <li>Hair styling and treatment</li>
              <li>Beauty consultations</li>
              <li>Special occasion styling</li>
              <li>Bridal beauty services</li>
              <li>Professional beauty care</li>
            </ul>
            <Link href="/services" className="btn-primary" style={{ display: 'inline-flex' }}>Explore Services <Scissors size={18} /></Link>
          </div>
          <div className="services-info-image">
             <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800" alt="Professional Beauty Services" />
          </div>
        </div>
      </section>

      {/* Professional Contact Section */}
      <section className="contact-pro">
        <div className="contact-container">
          <div style={{ marginBottom: '40px' }}>
             <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Serving Customers Across Nigeria</h2>
             <p style={{ maxWidth: '800px', margin: '0 auto', color: '#9ca3af', lineHeight: 1.6 }}>We are committed to providing a smooth shopping experience for customers across Nigeria. From beauty products to fashion accessories and home essentials, we ensure quality, affordability, and customer satisfaction in every order.</p>
          </div>
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', borderTop: 'none', marginBottom: '40px' }} />
          <h2 style={{ fontSize: '1.75rem', marginBottom: '12px', color: '#d4a574' }}>JayJayStyles</h2>
          <p style={{ color: '#fff', marginBottom: '32px', fontSize: '1.125rem' }}>Your One-Stop Destination for Beauty, Fashion, Hair Essentials, and Home Accessories.</p>
          <h2>Need help with an order or service booking?</h2>
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
