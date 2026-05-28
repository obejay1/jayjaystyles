'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  async function register() {
    // Check if they filled everything
    if (!form.fullName || !form.email || !form.phone || !form.password) {
      alert('Please fill in all required fields!');
      return;
    }

    setLoading(true);

    // Check memory box for existing users
    const users = JSON.parse(localStorage.getItem('jj-users') || '[]');
    
    // Check if email already exists
    const alreadyExists = users.find((u: any) => u.email === form.email);
    if (alreadyExists) {
      alert('This email is already registered! Try logging in instead.');
      setLoading(false);
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      password: form.password,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    // Add to users list
    users.push(newUser);
    localStorage.setItem('jj-users', JSON.stringify(users));

    // Auto-login: save as current user
    localStorage.setItem('jj-user', JSON.stringify({
      email: form.email,
      name: form.fullName,
      phone: form.phone,
    }));

    alert('Account created successfully! Welcome, ' + form.fullName);
    window.location.href = '/account';
    
    setLoading(false);
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f8f9fa',
      padding: 20
    }}>
      <div style={{
        background: '#fff',
        padding: 40,
        borderRadius: 20,
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
          Create Account 📝
        </h1>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: 32 }}>
          Join JayJayStyles today
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
            Full Name *
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
            placeholder="John Doe"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
            Email Address *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
            Phone Number *
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="08012345678"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
            Delivery Address
          </label>
          <textarea
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            placeholder="Your delivery address"
            rows={3}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
            Password *
          </label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Create a password"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              outline: 'none'
            }}
          />
        </div>

        <button
          onClick={register}
          disabled={loading}
          style={{
            width: '100%',
            background: '#d4a574',
            color: '#fff',
            border: 'none',
            padding: 16,
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 24, color: '#888' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#d4a574', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}