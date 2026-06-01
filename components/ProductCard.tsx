'use client';

import { Product } from '@/lib/types';
import { money, toggleWishlist, isInWishlist, addToCart } from '@/lib/store';
import { showToast } from '@/lib/toast';
import { trackEvent } from '@/lib/analytics';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

export default function ProductCard({ p }: { p: Product }) {
  const r = useRouter();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isInWishlist(p.id));
    const on = () => setLiked(isInWishlist(p.id));

    if (typeof window !== 'undefined') {
      window.addEventListener('wishlist', on);
      return () => window.removeEventListener('wishlist', on);
    }
  }, [p.id]);

  const openProduct = () => {
    trackEvent('select_item', {
      item_name: p.name,
      item_category: p.category || 'Beauty',
      value: p.price,
      currency: 'NGN',
    });

    r.push('/product/' + p.id);
  };

  const onHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    toggleWishlist(p.id);
    setLiked((v) => !v);

    trackEvent(liked ? 'remove_from_wishlist' : 'add_to_wishlist', {
      item_name: p.name,
      item_category: p.category || 'Beauty',
      value: p.price,
      currency: 'NGN',
    });

    if (!liked) {
      showToast('Added to wishlist!', 'success');
    } else {
      showToast('Removed from wishlist', 'info');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    addToCart(p.id);

    trackEvent('add_to_cart', {
      currency: 'NGN',
      value: p.price,
      item_name: p.name,
      item_category: p.category || 'Beauty',
      items: [
        {
          item_id: p.id,
          item_name: p.name,
          item_category: p.category || 'Beauty',
          price: p.price,
          quantity: 1,
        },
      ],
    });

    showToast('Added to cart!', 'success');
  };

  return (
    <div className="product-card-shared" onClick={openProduct}>
      <style>{`
        .product-card-shared {
          cursor: pointer;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          background: white;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          text-decoration: none;
          height: 100%;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .product-card-shared:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .product-img-shared {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }
        .wishlist-btn-shared {
          background: #fff;
          border: none;
          border-radius: 50%;
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          padding: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          cursor: pointer;
        }
        .wishlist-btn-shared.active {
          color: #ef4444;
          background: #fef2f2;
        }
        .product-info-shared {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }
        .product-category-shared {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .product-name-shared {
          font-size: 1rem;
          margin: 0 0 8px 0;
          color: #111;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
        }
        .product-footer-shared {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .product-price-shared {
          font-weight: bold;
          font-size: 1rem;
          color: #111;
          white-space: nowrap;
        }
        .btn-add-shared {
          background: #111827;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 10px;
          font-weight: 600;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-add-shared:active {
          background: #d4af37;
          color: #111;
        }

        @media (max-width: 640px) {
          .product-img-shared {
            height: 150px;
          }
          .product-info-shared {
            padding: 10px;
          }
          .product-category-shared {
            font-size: 0.65rem;
          }
          .product-name-shared {
            font-size: 0.875rem;
            margin-bottom: 8px;
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .product-footer-shared {
            flex-direction: row;
            align-items: center;
            gap: 6px;
          }
          .product-price-shared {
            font-size: 0.9rem;
          }
          .btn-add-shared {
            width: auto;
            padding: 8px;
            font-size: 0;
          }
          .btn-add-shared span {
            display: none;
          }
        }
      `}</style>

      <div style={{ position: 'relative' }}>
        <img
          src={p.image || `https://placehold.co/400x400/f5f5f5/333?text=${encodeURIComponent(p.name)}`}
          className="product-img-shared"
          alt={p.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/400x400/f5f5f5/333?text=Product';
          }}
        />

        <button
          className={'wishlist-btn-shared' + (liked ? ' active' : '')}
          onClick={onHeart}
          aria-label="Toggle wishlist"
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-info-shared">
        <div className="product-category-shared">{p.category || 'Beauty'}</div>
        <div className="product-name-shared">{p.name}</div>

        <div className="product-footer-shared">
          <div className="product-price-shared">{money(p.price)}</div>

          <button className="btn-add-shared" onClick={handleAddToCart}>
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}