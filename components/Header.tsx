'use client';
import{ArrowLeft,Bell,ShoppingBag}from'lucide-react';import Link from'next/link';
import { useEffect, useState } from 'react';
import { getCart } from '@/lib/store';

export default function Header({ title, brand = false, back = false, bell = false }: { title?: string; brand?: boolean; back?: boolean; bell?: boolean }) {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const updateCount = () => {
      const c = getCart();
      setCartCount(c.reduce((sum, item) => sum + item.qty, 0));
    };
    updateCount();
    window.addEventListener('cart', updateCount);
    return () => window.removeEventListener('cart', updateCount);
  }, []);
  return (
    <div className="top">
      {back && <Link className="back" href="/"><ArrowLeft /></Link>}
      <div className={brand ? 'brand' : 'page-title'}>{brand ? 'JayJayStyles' : title}</div>
      {bell && <Bell className="bell desktop-only" />}
      {brand && <Link href="/cart" style={{ position: 'relative', color: 'inherit' }}>
        <ShoppingBag className="bell desktop-only" size={21} />
        {cartCount > 0 && <span style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: 'white', borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 'bold' }}>{cartCount}</span>}
      </Link>}
    </div>
  );
}
