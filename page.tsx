'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created!');
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: '50px auto' }}>
      <h1>Create Account</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={register}>Register</button>
    </main>
  );
}