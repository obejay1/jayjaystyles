'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    
    // Check memory box for users
    const users = JSON.parse(localStorage.getItem('jj-users') || '[]');
    
    // Find user with matching email AND password
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      // Yay! Found them! Save to "current user" memory box
      localStorage.setItem('jj-user', JSON.stringify({
        email: user.email,
        name: user.name,
        phone: user.phone
      }));
      
      alert('Login successful! Welcome back, ' + user.name);
      window.location.href = '/account';
    } else {
      alert('Wrong email or password! Try again.');
    }
    
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
          Welcome Back! 👋
        </h1>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: 32 }}>
          Sign in to your JayJayStyles account
        </p>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e5e5e5',
              borderRadius: 12,
              fontSize: 16,
              outline: 'none'
            }}
          />
        </div>

        <button
          onClick={login}
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
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 24, color: '#888' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{ color: '#d4a574', fontWeight: 600, textDecoration: 'none' }}>
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}