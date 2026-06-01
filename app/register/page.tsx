'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/lib/toast';
import { ArrowLeft } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect to account if already logged in
    if (localStorage.getItem('jj-user')) {
      router.replace('/account');
    }
  }, [router]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const users = JSON.parse(localStorage.getItem('jj-users') || '[]');
      
      // Validation: Duplicate email prevention
      if (users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        showToast('Email is already registered. Please log in.', 'error');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password,
        joined: new Date().toLocaleDateString()
      };

      // Save to standard simulated db
      users.push(newUser);
      localStorage.setItem('jj-users', JSON.stringify(users));

      // Sign user into active session directly after registering
      const { password: _, ...sessionUser } = newUser;
      localStorage.setItem('jj-user', JSON.stringify(sessionUser));

      showToast('Account created successfully!', 'success');
      router.push('/account');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', marginBottom: '24px', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 style={{ fontSize: '28px', marginBottom: '8px', color: '#111827' }}>Create an Account</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Join us to easily manage your orders, bookings, and wishlist.</p>
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} placeholder="e.g. Jane Doe" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} placeholder="Enter your email" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} placeholder="Enter your phone number" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} placeholder="Create a password (min 6 chars)" />
          </div>
          <button type="submit" disabled={loading} style={{ background: '#111827', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', opacity: loading ? 0.8 : 1 }}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '14px' }}>
          Already have an account? <Link href="/login" style={{ color: '#111827', fontWeight: 700, textDecoration: 'none' }}>Sign In here</Link>
        </p>
      </div>
    </div>
  );
}