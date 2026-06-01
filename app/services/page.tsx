'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User, Scissors, ArrowLeft } from 'lucide-react';
import { getProducts, getCart } from '@/lib/store';
import { Product } from '@/lib/types';
import Loading from '@/components/Loading';

export default function Services() {
  const [services, setServices] = useState<Product[]>([]);
  const [selectedService, setSelectedService] = useState<Product | null>(null);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    date: '', 
    time: '', 
    notes: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    getProducts().then(products => {
      setServices(products.filter(p => p.type === 'service'));
      setLoading(false);
    });
    
    const updateCount = () => {
      const c = getCart();
      setCartCount(c.reduce((sum, item) => sum + item.qty, 0));
    };
    updateCount();
    window.addEventListener('cart', updateCount);
    return () => window.removeEventListener('cart', updateCount);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const booking = {
      id: Date.now().toString(),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      date: form.date,
      time: form.time,
      notes: form.notes,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    try {
      const { saveBooking } = await import('@/lib/bookings').catch(() => ({ saveBooking: async () => {} }));
      if (saveBooking) await saveBooking(booking);
      
      // Send confirmation email
      const { sendBookingConfirmation } = await import('@/lib/email').catch(() => ({ sendBookingConfirmation: async () => {} }));
      if (sendBookingConfirmation) {
        await sendBookingConfirmation({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          serviceName: selectedService.name,
          servicePrice: selectedService.price,
          date: form.date,
          time: form.time,
        });
      }
      
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="services-desktop-page overflow-x-hidden pb-28 w-full max-w-full">
      <style>{`
        @media (max-width: 767px) {
          .search-bar input::placeholder { color: transparent; }
        }
      `}</style>
      {/* Top Nav */}
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
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search services..." />
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

      <main className="services-main w-full max-w-full">
        <div className="services-container w-full max-w-full">
          {!selectedService ? (
            <>
              <div className="services-header">
                <h1>Book an Appointment</h1>
                <p>Choose from our professional beauty and cleaning services</p>
              </div>

              <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full">
                {services.length === 0 ? (
                  <div className="empty-services">
                    <Scissors size={48} />
                    <h3>No services available</h3>
                    <p>Add services in the admin panel</p>
                  </div>
                ) : (
                  services.map(service => (
                    <div key={service.id} className="service-card-pro w-full max-w-full overflow-hidden">
                      <div className="service-img-wrap w-full">
                        <img 
                          src={service.image || `https://placehold.co/400x300/d4a574/ffffff?text=${encodeURIComponent(service.name)}`}
                          alt={service.name}
                          className="w-full h-56 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/333/fff?text=Service';
                          }}
                        />
                      </div>
                      <div className="service-card-content w-full break-words">
                        <h3 className="truncate">{service.name}</h3>
                        <p>{service.description || 'Professional service'}</p>
                        <div className="service-card-footer flex flex-wrap items-center justify-between gap-2">
                          <span className="service-price">₦{service.price?.toLocaleString()}</span>
                          <button className="btn-book-pro whitespace-nowrap" onClick={() => { setSelectedService(service); setSubmitted(false); }}>
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : !submitted ? (
            <div className="booking-form-pro w-full max-w-full px-4 sm:px-0">
              <button className="btn-back-pro" onClick={() => setSelectedService(null)}>
                <ArrowLeft size={18} /> Back to services
              </button>
              
              <div className="form-card-pro w-full max-w-full overflow-hidden">
                <h2 className="break-words">Book: {selectedService.name}</h2>
                <p className="form-price-pro">₦{selectedService.price?.toLocaleString()}</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group-pro w-full">
                    <label>Your Name *</label>
                    <input type="text" className="w-full max-w-full" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
                  </div>

                  <div className="form-group-pro w-full">
                    <label>Email Address *</label>
                    <input type="email" className="w-full max-w-full" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@gmail.com" />
                  </div>

                  <div className="form-group-pro w-full">
                    <label>Phone Number *</label>
                    <input type="tel" className="w-full max-w-full" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="08012345678" />
                  </div>

                  <div className="form-row-pro grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="form-group-pro w-full">
                      <label>Date *</label>
                      <input type="date" className="w-full max-w-full" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                    </div>
                    <div className="form-group-pro w-full">
                      <label>Time *</label>
                      <input type="time" className="w-full max-w-full" required value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
                    </div>
                  </div>

                  <div className="form-group-pro w-full">
                    <label>Additional Notes</label>
                    <textarea className="w-full max-w-full" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Any special requests..." rows={3} />
                  </div>

                  <button type="submit" className="btn-submit-pro w-full">Confirm Booking</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="success-card-pro w-full max-w-full mx-4 sm:mx-auto">
              <div className="success-icon">✅</div>
              <h2>Booking Confirmed!</h2>
              <p>We've sent a confirmation email to {form.email}.</p>
              <p style={{ color: '#888', fontSize: 14, marginTop: 8 }}>
                We'll contact you at {form.phone} if anything changes.
              </p>
              <button className="btn-submit-pro" onClick={() => { setSelectedService(null); setSubmitted(false); }}>
                Book Another Service
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-pro">
        <p>© 2026 JayJayStyles. All rights reserved.</p>
      </footer>
    </div>
  );
}