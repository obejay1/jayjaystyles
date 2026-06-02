'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/lib/toast';
import { db } from '@/lib/firebase';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect to account if already logged in
    if (localStorage.getItem('jj-user')) {
      router.replace('/account');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API authorization layer
    setTimeout(() => {
      setLoading(false);
      const users = JSON.parse(localStorage.getItem('jj-users') || '[]');
      const user = users.find((u: { email?: string; password?: string }) => u.email === email && u.password === password);

      if (user) {
        // Build a safe session user object (exclude password)
        const sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          joined: user.joined,
        };

        localStorage.setItem('jj-user', JSON.stringify(sessionUser));
        try {
          if (db) {
            // log the login event
            await addDoc(collection(db, 'logins'), {
              userId: sessionUser.id,
              email: sessionUser.email,
              ts: new Date().toISOString(),
            });

            // ensure user doc exists / update lastSeen
            await setDoc(doc(db, 'users', sessionUser.id), {
              ...sessionUser,
              lastSeen: new Date().toISOString(),
            }, { merge: true });
          }
        } catch {
          // ignore firestore errors on client
        }
        showToast('Successfully logged in!', 'success');
        router.push('/account');
      } else {
        showToast('Invalid email or password. Please try again.', 'error');
      }
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', marginBottom: '24px', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 style={{ fontSize: '28px', marginBottom: '8px', color: '#111827' }}>Welcome Back</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Sign in to manage your account and orders.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Email Address</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} placeholder="Enter your email"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#475569' }}>Password</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} placeholder="Enter your password"
            />
          </div>
          <button type="submit" disabled={loading} style={{ background: '#111827', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', opacity: loading ? 0.8 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '14px' }}>
          Don&apos;t have an account? <Link href="/register" style={{ color: '#111827', fontWeight: 700, textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}