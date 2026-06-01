'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, ShoppingBag, Scissors, ShoppingCart, User } from 'lucide-react';
import { getCart } from '@/lib/store';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/shop', icon: ShoppingBag, label: 'Shop' },
  { href: '/services', icon: Scissors, label: 'Services' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/account', icon: User, label: 'Account' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
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
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={`mobile-nav-item ${isActive ? 'active' : ''}`}>
            <div style={{ position: 'relative' }}>
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {item.href === '/cart' && cartCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: '#ef4444', color: 'white', borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 'bold' }}>{cartCount}</span>}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}