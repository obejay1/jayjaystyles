import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

export type CheckoutSettings = {
  taxRate: number;
  shippingFee: number;
  updatedAt?: string;
};

const DEFAULTS: CheckoutSettings = {
  taxRate: 7.5,
  shippingFee: 1500,
};

export async function getCheckoutSettings(): Promise<CheckoutSettings> {
  try {
    const db = getFirestore();
    const d = await getDoc(doc(db, 'settings', 'checkout'));
    if (d.exists()) {
      const data = d.data() as Partial<CheckoutSettings>;
      return {
        taxRate: typeof data.taxRate === 'number' ? data.taxRate : DEFAULTS.taxRate,
        shippingFee: typeof data.shippingFee === 'number' ? data.shippingFee : DEFAULTS.shippingFee,
        updatedAt: data.updatedAt,
      };
    }
  } catch (e) {
    console.warn('Firebase not available, falling back to localStorage', e);
  }

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('jj-checkout-settings');
      if (saved) return JSON.parse(saved) as CheckoutSettings;
    } catch {
      /* ignore */
    }
  }

  return DEFAULTS;
}

export async function saveCheckoutSettings(s: CheckoutSettings): Promise<void> {
  const payload = { ...s, updatedAt: new Date().toISOString() };

  try {
    const db = getFirestore();
    await setDoc(doc(db, 'settings', 'checkout'), payload);
  } catch (e) {
    console.warn('Firebase not available, falling back to localStorage', e);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('jj-checkout-settings', JSON.stringify(payload));
      } catch {
        /* ignore */
      }
    }
  }
}
