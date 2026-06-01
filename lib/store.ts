'use client';

import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  updateDoc,
} from 'firebase/firestore';

import { Product, Order } from './types';
import { seedProducts } from './seed';

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasFirebase = !!cfg.apiKey && !!cfg.projectId;
const app = hasFirebase && !getApps().length ? initializeApp(cfg) : getApps()[0];
const db = app ? getFirestore(app) : null;

export const money = (n: number) => '₦' + Number(n || 0).toLocaleString('en-NG');

const ls = typeof window !== 'undefined' ? window.localStorage : null;

export async function getProducts(): Promise<Product[]> {
  if (db) {
    const s = await getDocs(collection(db, 'products'));

    if (s.empty) {
      await Promise.all(seedProducts.map((p) => setDoc(doc(db, 'products', p.id), p)));
      return seedProducts;
    }

    return s.docs.map((d) => d.data() as Product);
  }

  const saved = ls?.getItem('products');

  if (saved) return JSON.parse(saved);

  ls?.setItem('products', JSON.stringify(seedProducts));
  return seedProducts;
}

export async function saveProduct(p: Product) {
  if (db) return setDoc(doc(db, 'products', p.id), p);

  const all = await getProducts();
  const next = [...all.filter((x) => x.id !== p.id), p];

  ls?.setItem('products', JSON.stringify(next));
}

export async function removeProduct(id: string) {
  if (db) return deleteDoc(doc(db, 'products', id));

  const all = await getProducts();
  ls?.setItem('products', JSON.stringify(all.filter((x) => x.id !== id)));
}

export function getCart() {
  return JSON.parse(ls?.getItem('cart') || '[]') as { id: string; qty: number }[];
}

export function setCart(c: { id: string; qty: number }[]) {
  ls?.setItem('cart', JSON.stringify(c));

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cart'));
  }
}

export function addToCart(id: string) {
  const c = getCart();
  const found = c.find((i) => i.id === id);

  if (found) {
    found.qty++;
  } else {
    c.push({ id, qty: 1 });
  }

  setCart(c);
}

export function getWishlist() {
  try {
    return JSON.parse(ls?.getItem('wishlist') || '[]') as string[];
  } catch {
    return [];
  }
}

export function setWishlist(ids: string[]) {
  ls?.setItem('wishlist', JSON.stringify(ids));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('wishlist'));
  }
}

export function addToWishlist(id: string) {
  const w = getWishlist();
  if (!w.includes(id)) {
    w.push(id);
    setWishlist(w);
  }
}

export function removeFromWishlist(id: string) {
  const w = getWishlist().filter((x) => x !== id);
  setWishlist(w);
}

export function toggleWishlist(id: string) {
  const w = getWishlist();
  if (w.includes(id)) removeFromWishlist(id);
  else addToWishlist(id);
}

export function isInWishlist(id: string) {
  return getWishlist().includes(id);
}

export async function createOrder(o: Order) {
  if (db) {
    await setDoc(doc(db, 'orders', o.id), o);
  } else {
    const old = JSON.parse(ls?.getItem('orders') || '[]');
    ls?.setItem('orders', JSON.stringify([o, ...old]));
  }

  setCart([]);
}

export async function getOrders(): Promise<Order[]> {
  if (db) {
    const s = await getDocs(
      query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    );

    return s.docs.map((d) => ({
      ...d.data(),
      id: d.id,
    })) as Order[];
  }

  return JSON.parse(ls?.getItem('orders') || '[]');
}

export async function updateOrderStatus(id: string, status: string) {
  if (!db) return;

  await updateDoc(doc(db, 'orders', id), { status });
}