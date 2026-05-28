'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Scissors, ArrowLeft } from 'lucide-react';
import { getProducts } from '@/lib/store';
import { Product } from '@/lib/types';
import { saveBooking } from '@/lib/bookings';
import { sendBookingConfirmation } from '@/lib/email';
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

  useEffect(() => {
    getProducts().then(products => {
      setServices(products.filter(p => p.type === 'service'));
      setLoading(false);
    });
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
      await saveBooking(booking);
      
      // Send confirmation email
      await sendBookingConfirmation({
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        date: form.date,
        time: form.time,
      });
      
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="services-desktop-page">
      {/* Top Nav */}
      <nav className="top-nav">
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">JayJayStyles</span>
          </Link>
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search services..." />
          </div>
          <div className="nav-actions">
            <Link href="/shop" className="nav-link"><ShoppingCart size={20} /><span>Shop</span></Link>
            <Link href="/account" className="nav-link"><User size={20} /><span>Account</span></Link>
          </div>
        </div>
      </nav>

      <main className="services-main">
        <div className="services-container">
          {!selectedService ? (
            <>
              <div className="services-header">
                <h1>Book an Appointment</h1>
                <p>Choose from our professional beauty and cleaning services</p>
              </div>

              <div className="services-grid">
                {services.length === 0 ? (
                  <div className="empty-services">
                    <Scissors size={48} />
                    <h3>No services available</h3>
                    <p>Add services in the admin panel</p>
                  </div>
                ) : (
                  services.map(service => (
                    <div key={service.id} className="service-card-pro">
                      <div className="service-img-wrap">
                        <img 
                          src={service.image || `https://placehold.co/400x300/d4a574/ffffff?text=${encodeURIComponent(service.name)}`}
                          alt={service.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/333/fff?text=Service';
                          }}
                        />
                      </div>
                      <div className="service-card-content">
                        <h3>{service.name}</h3>
                        <p>{service.description || 'Professional service'}</p>
                        <div className="service-card-footer">
                          <span className="service-price">₦{service.price?.toLocaleString()}</span>
                          <button className="btn-book-pro" onClick={() => { setSelectedService(service); setSubmitted(false); }}>
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
            <div className="booking-form-pro">
              <button className="btn-back-pro" onClick={() => setSelectedService(null)}>
                <ArrowLeft size={18} /> Back to services
              </button>
              
              <div className="form-card-pro">
                <h2>Book: {selectedService.name}</h2>
                <p className="form-price-pro">₦{selectedService.price?.toLocaleString()}</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group-pro">
                    <label>Your Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
                  </div>

                  <div className="form-group-pro">
                    <label>Email Address *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@gmail.com" />
                  </div>

                  <div className="form-group-pro">
                    <label>Phone Number *</label>
                    <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="08012345678" />
                  </div>

                  <div className="form-row-pro">
                    <div className="form-group-pro">
                      <label>Date *</label>
                      <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                    </div>
                    <div className="form-group-pro">
                      <label>Time *</label>
                      <input type="time" required value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
                    </div>
                  </div>

                  <div className="form-group-pro">
                    <label>Additional Notes</label>
                    <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Any special requests..." rows={3} />
                  </div>

                  <button type="submit" className="btn-submit-pro">Confirm Booking</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="success-card-pro">
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