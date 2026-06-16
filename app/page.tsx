'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Scissors,
  Phone,
  Mail,
  ArrowRight,
  Truck,
  Shield,
  Headphones,
  Heart,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { getProducts, getWishlist, getCart, getCategories } from '@/lib/store';
import { Product, Category } from '@/lib/types';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const updateWishlist = () => setWishlistCount(getWishlist().length);
    const updateCart = () => {
      const c = getCart();
      setCartCount(c.reduce((sum, item) => sum + item.qty, 0));
    };

    updateWishlist();
    updateCart();

    window.addEventListener('wishlist', updateWishlist);
    window.addEventListener('cart', updateCart);

    return () => {
      window.removeEventListener('wishlist', updateWishlist);
      window.removeEventListener('cart', updateCart);
    };
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  let displayProducts = featured.length > 0 ? featured : products.slice(0, 8);

  // Filter locally based on the search query
  if (searchQuery.trim()) {
    const s = searchQuery.trim().toLowerCase();
    displayProducts = products.filter(p =>
      (p.name && p.name.toLowerCase().includes(s)) ||
      (p.category && p.category.toLowerCase().includes(s)) ||
      (p.description && p.description.toLowerCase().includes(s))
    );
  }

  return (
    <main className="jj-home">
      <nav className="jj-nav">
        <div className="jj-nav-inner">
          <Link href="/" className="jj-logo">
            <Image src="/logo.png" alt="JayJayStyles Logo" width={52} height={52} priority />
            <div>
              <span>JayJayStyles</span>
              <small>Beauty • Fashion • Lifestyle</small>
            </div>
          </Link>

          <div className="jj-search mobile-search-small">
  <Search size={18} />
  <input
    className="mobile-search-input"
    placeholder="Search product"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }
    }}
  />
</div>

          <div className="jj-actions">
            <Link href="/wishlist">
              <Heart size={22} />
              {wishlistCount > 0 && <b>{wishlistCount}</b>}
            </Link>

            <Link href="/cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && <b>{cartCount}</b>}
            </Link>

            <Link href="/account">
              <User size={22} />
            </Link>
          </div>
        </div>
      </nav>

      <section className="jj-hero">
        <div className="jj-hero-overlay" />

        <Image
          src="/hero-banner.png"
          alt="JayJayStyles Nigerian beauty and lifestyle hero banner"
          fill
          priority
          className="jj-hero-img"
        />

        <motion.div 
          className="jj-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="jj-badge">
            <Sparkles size={16} />
            Premium Beauty & Lifestyle
          </div>

          <h1>Look Good, Live Clean</h1>

          <p>
            Premium hair products, beauty essentials, fashion accessories, gele,
            beads, kitchen accessories and professional beauty services across Nigeria.
          </p>

          <div className="jj-hero-buttons">
            <Link href="/shop" className="jj-btn jj-btn-gold">
              Shop Now <ArrowRight size={18} />
            </Link>

            <Link href="/services" className="jj-btn jj-btn-outline">
              Book a Service <Scissors size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="jj-trust">
        <div>
          <Truck />
          <h3>Fast Delivery</h3>
          <p>Across Nigeria</p>
        </div>

        <div>
          <Shield />
          <h3>Quality Products</h3>
          <p>Trusted & reliable</p>
        </div>

        <div>
          <Headphones />
          <h3>Customer Support</h3>
          <p>We are here for you</p>
        </div>
      </section>

      <section className="jj-categories">
        <h2>Shop by Category</h2>

        <div className="jj-category-grid">
          {categories.filter(c => c.active !== false).map((c) => (
            <Link href={c.type === 'service' ? `/services?category=${encodeURIComponent(c.name)}` : `/shop?category=${encodeURIComponent(c.name)}`} key={c.id}>
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="jj-products" id="products">
        <div className="jj-section-header">
          <div>
            <small>Our Products</small>
            <h2>Latest Arrivals</h2>
          </div>

          <Link href="/shop">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {displayProducts.length > 0 ? (
          <div className="jj-product-grid">
            {displayProducts.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <ProductCard p={p} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>No products found for &quot;{searchQuery}&quot;.</p>
        )}
      </section>

      <section className="jj-services">
        <div>
          <small>Professional Services</small>
          <h2>Beauty Services Made for Every Occasion</h2>
          <p>
            Book professional hair styling, makeup, gele styling, beauty consultation,
            bridal beauty services and special occasion styling.
          </p>

          <Link href="/services" className="jj-btn jj-btn-gold">
            Explore Services <Scissors size={18} />
          </Link>
        </div>
      </section>

      <section className="jj-contact">
        <h2>Need help with an order or service booking?</h2>
        <p>Contact JayJayStyles customer service for orders, delivery, products and bookings.</p>

        <div className="jj-contact-grid">
          <a href="mailto:mercyjayjay89@gmail.com">
            <Mail />
            mercyjayjay89@gmail.com
          </a>

          <a href="mailto:Josephgloria1121@icloud.com">
            <Mail />
            Josephgloria1121@icloud.com
          </a>

          <a href="tel:+2349022483595">
            <Phone />
            +234 902 248 3595
          </a>

          <a href="tel:+2349155997846">
            <Phone />
            +234 915 599 7846
          </a>
        </div>

        <a href="https://wa.me/2349022483595" className="jj-whatsapp">
          <MessageCircle />
          Chat on WhatsApp
        </a>
      </section>

      <Footer />
    </main>
  );
}