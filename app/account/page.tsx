'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Package, Heart, Settings, LogOut, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getOrders, getWishlist, getProducts, toggleWishlist } from '@/lib/store';
import { showToast } from '@/lib/toast';
import { Product } from '@/lib/types';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter();
  const [orders, setOrders] = useState<Array<Record<string, unknown>>>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<{ name: string; email: string; phone: string; joined: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('jj-user');
    if (!saved) {
      // Not logged in, redirect to login
      router.replace('/login');
      return;
    }
    const parsedUser = JSON.parse(saved);
    setUser({ ...parsedUser, joined: parsedUser.joined || new Date().toLocaleDateString() });
    setIsLoading(false);

    getOrders().then(setOrders);
    getProducts().then(products => {
      const wIds = getWishlist();
      setWishlistItems(products.filter(p => wIds.includes(p.id)));
    });
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('jj-user');
    // Optionally clear other session data here
    router.push('/');
  };

  if (isLoading || !user) {
    return <Loading fullScreen />;
  }

  return (
    <div className="account-page-pro" style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '90px' }}>
      <nav className="top-nav" style={{ position: 'static' }}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">JayJayStyles</span>
          </Link>
          <div className="nav-actions desktop-only">
            <Link href="/shop" className="nav-link"><span>Shop</span></Link>
            <Link href="/cart" className="nav-link"><span>Cart</span></Link>
          </div>
        </div>
      </nav>

      <div className="account-hero" style={{ background: '#111827', color: 'white', padding: '60px 20px 80px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', color: '#111', margin: '0 auto 16px' }}>
          {user.name.charAt(0)}
        </div>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome back, {user.name.split(' ')[0]}</h1>
        <p style={{ color: '#9ca3af' }}>Manage your account, orders, and preferences.</p>
      </div>

      <div className="account-layout" style={{ maxWidth: '1100px', margin: '-40px auto 0', padding: '0 20px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px', position: 'relative', zIndex: 10 }}>
        
        {/* Sidebar */}
        <div className="account-sidebar" style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => setActiveTab('profile')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: activeTab === 'profile' ? '#f3f4f6' : 'transparent', color: activeTab === 'profile' ? '#111' : '#64748b', fontWeight: activeTab === 'profile' ? 700 : 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            >
              <User size={18} /> My Profile
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: activeTab === 'orders' ? '#f3f4f6' : 'transparent', color: activeTab === 'orders' ? '#111' : '#64748b', fontWeight: activeTab === 'orders' ? 700 : 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            >
              <Package size={18} /> Orders & Bookings
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: activeTab === 'wishlist' ? '#f3f4f6' : 'transparent', color: activeTab === 'wishlist' ? '#111' : '#64748b', fontWeight: activeTab === 'wishlist' ? 700 : 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            >
              <Heart size={18} /> Wishlist
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: activeTab === 'settings' ? '#f3f4f6' : 'transparent', color: activeTab === 'settings' ? '#111' : '#64748b', fontWeight: activeTab === 'settings' ? 700 : 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            >
              <Settings size={18} /> Settings
            </button>
            <div style={{ height: '1px', background: '#e2e8f0', margin: '12px 0' }}></div>
            <button 
              onClick={handleSignOut}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: 'transparent', color: '#ef4444', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="account-content" style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', minHeight: '500px' }}>
          
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#111827' }}>Personal Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Full Name</label>
                  <input type="text" value={user.name || ''} readOnly style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', background: '#f8fafc' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Email Address</label>
                  <input type="email" value={user.email || ''} readOnly style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', background: '#f8fafc' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Phone Number</label>
                  <input type="tel" value={user.phone || ''} readOnly style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px', background: '#f8fafc' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Member Since</label>
                  <input type="text" value={user.joined} disabled style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#94a3b8', fontSize: '15px' }} />
                </div>
              </div>
              <button 
                onClick={() => showToast('Changes saved successfully!', 'success')}
                style={{ marginTop: '32px', background: '#111827', color: 'white', padding: '14px 28px', borderRadius: '999px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#111827' }}>Order History</h2>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
                {orders.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                    <Package size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: '18px', color: '#64748b' }}>No orders yet</h3>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '14px' }}>
                      <div>
                        <span style={{ display: 'inline-block', background: order.status === 'Delivered' ? '#dcfce7' : '#fef3c7', color: order.status === 'Delivered' ? '#166534' : '#92400e', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>{order.status || 'Processing'}</span>
                        <h3 style={{ margin: 0, fontSize: '16px' }}>Order #{order.id.slice(-6)}</h3>
                        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: '18px' }}>₦{order.total?.toLocaleString()}</p>
                        <Link href={`/order/${order.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, marginTop: '8px', cursor: 'pointer', textDecoration: 'none', fontSize: '14px' }}>
                          View Details <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#111827' }}>My Wishlist</h2>
              {wishlistItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <Heart size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Your wishlist is empty</h3>
                  <p style={{ color: '#64748b', marginBottom: '24px' }}>Save items you love to your wishlist and review them here.</p>
                  <Link href="/shop" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '14px 28px', borderRadius: '999px', fontWeight: 700, textDecoration: 'none' }}>
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                  {wishlistItems.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px' }}>
                      <img src={item.image || `https://placehold.co/400x400/f5f5f5/333?text=${encodeURIComponent(item.name)}`} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                      <p style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>₦{item.price?.toLocaleString()}</p>
                      <button 
                        onClick={() => {
                          toggleWishlist(item.id);
                          setWishlistItems(prev => prev.filter(p => p.id !== item.id));
                          showToast('Removed from wishlist', 'info');
                        }}
                        style={{ width: '100%', background: '#fef2f2', color: '#dc2626', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#111827' }}>Account Settings</h2>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Change Password</h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <input type="password" placeholder="Current Password" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px' }} />
                  <input type="password" placeholder="New Password" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '15px' }} />
                  <button 
                    onClick={() => showToast('Password updated successfully!', 'success')}
                    style={{ background: '#111827', color: 'white', padding: '14px', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer', width: 'fit-content' }}
                  >
                    Update Password
                  </button>
                </div>
              </div>
              <div style={{ border: '1px solid #fecaca', borderRadius: '16px', padding: '24px', background: '#fef2f2' }}>
                <h3 style={{ fontSize: '18px', color: '#991b1b', marginBottom: '8px' }}>Danger Zone</h3>
                <p style={{ color: '#7f1d1d', marginBottom: '16px', fontSize: '14px' }}>Once you delete your account, there is no going back. Please be certain.</p>
                <button 
                  onClick={() => showToast('Account deletion requested.', 'error')}
                  style={{ background: '#dc2626', color: 'white', padding: '12px 20px', borderRadius: '10px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) {
          .account-layout { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}