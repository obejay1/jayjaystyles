'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, User, Heart, ShieldCheck, Truck, RotateCcw, ArrowLeft } from 'lucide-react';
import { getProducts, addToCart, toggleWishlist, isInWishlist, getCart, money } from '@/lib/store';
import { showToast } from '@/lib/toast';
import { trackEvent } from '@/lib/analytics';
import { Product } from '@/lib/types';
import Loading from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const updateCount = () => {
      const c = getCart();
      setCartCount(c.reduce((sum, item) => sum + item.qty, 0));
    };
    updateCount();
    
    getProducts().then(products => {
      const id = params.id as string;
      const found = products.find(p => p.id === id);
      
      if (found) {
        setProduct(found);
        setActiveImage(found.image || '');
        setLiked(isInWishlist(found.id));
          trackEvent('view_item', {
            item_id: found.id,
            item_name: found.name,
            item_category: found.category || 'Beauty',
            value: found.price,
            currency: 'NGN',
            items: [
              {
                item_id: found.id,
                item_name: found.name,
                item_category: found.category || 'Beauty',
                price: found.price,
                quantity: 1,
              },
            ],
          });
        
        // Find related products (same category, exclude current)
        const rel = products.filter(p => p.category === found.category && p.id !== found.id).slice(0, 4);
        // If not enough related by category, pad with other products
        if (rel.length < 4) {
            const more = products.filter(p => p.id !== found.id && !rel.find(r => r.id === p.id)).slice(0, 4 - rel.length);
            rel.push(...more);
        }
        setRelated(rel);
      }
      setLoading(false);
    });
    
    const onWishlist = () => {
      if (params.id) setLiked(isInWishlist(params.id as string));
    };
    
    window.addEventListener('wishlist', onWishlist);
    window.addEventListener('cart', updateCount);
    
    return () => {
      window.removeEventListener('wishlist', onWishlist);
      window.removeEventListener('cart', updateCount);
    };
  }, [params.id]);

  if (loading) return <Loading fullScreen />;

  if (!product) {
    return (
      <div className="product-detail-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <h2>Product Not Found</h2>
        <button className="product-back-btn" onClick={() => router.push('/shop')} style={{ marginTop: '20px' }}>Back to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    trackEvent('add_to_cart', {
      currency: 'NGN',
      value: product.price,
      item_name: product.name,
      item_category: product.category || 'Beauty',
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category || 'Beauty',
          price: product.price,
          quantity: 1,
        },
      ],
    });
    showToast('Added to cart!', 'success');
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    setLiked(!liked);
    trackEvent(liked ? 'remove_from_wishlist' : 'add_to_wishlist', {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || 'Beauty',
      value: product.price,
      currency: 'NGN',
    });
    if (!liked) {
      showToast('Added to wishlist!', 'success');
    } else {
      showToast('Removed from wishlist', 'info');
    }
  };
  
  // Simulating a gallery payload - allowing users to select thumbnails below the main image
  const galleryImages = [
    activeImage,
    activeImage,
    activeImage
  ];

  return (
    <div className="product-detail-page">
      {/* Navigation */}
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

      <div className="product-detail-wrap">
        {/* Large Image Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="product-image-box">
            <img 
              src={activeImage || `https://placehold.co/600x600/f5f5f5/333?text=${encodeURIComponent(product.name)}`} 
              alt={product.name} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/f5f5f5/333?text=Product';
              }}
            />
          </div>
          {/* Mini thumbnails for the gallery effect */}
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
             {galleryImages.map((img, i) => (
                <div key={i} onClick={() => setActiveImage(img)} style={{ width: '80px', height: '80px', borderRadius: '16px', border: activeImage === img && i === 0 ? '2px solid #111' : '1px solid #e5e5e5', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, opacity: i !== 0 ? 0.6 : 1 }}>
                   <img src={img || `https://placehold.co/100x100/f5f5f5/333?text=Image+${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Thumbnail" />
                </div>
             ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div className="product-info-box">
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '20px', padding: 0, fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back
          </button>
          
          <div className="product-breadcrumb">{product.category || 'Beauty'}</div>
          <h1>{product.name}</h1>
          <div className="product-price">{money(product.price)}</div>
          <p className="product-description">
            {product.description || 'Premium quality product designed to elevate your everyday routine. Carefully curated and crafted to deliver exceptional results for your personal care needs.'}
          </p>
          
          <div className="product-meta">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={18} /> Quality Guarantee</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Truck size={18} /> Fast Delivery</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RotateCcw size={18} /> Easy Returns</span>
          </div>

          <div className="product-actions">
            <button className="product-add-btn" onClick={handleAddToCart} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="product-back-btn" onClick={handleWishlist} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', cursor: 'pointer' }}>
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} color={liked ? '#ef4444' : 'currentColor'} /> 
              {liked ? 'Saved' : 'Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px 60px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '24px', letterSpacing: '-0.5px' }}>Related Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {related.map(p => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}