export interface Coupon {
  id: string;
  code: string;
  discount: number;
  message?: string;
}

let coupons: Coupon[] = [];

export function getCoupons(): Coupon[] {
  return [...coupons];
}

export function saveCoupon(coupon: Coupon): void {
  const idx = coupons.findIndex(c => c.id === coupon.id);
  if (idx >= 0) {
    coupons[idx] = coupon;
  } else {
    coupons.push(coupon);
  }
}

export function removeCoupon(id: string): void {
  coupons = coupons.filter(c => c.id !== id);
}

export interface CouponResult {
  valid: boolean;
  discount: number;
  message: string;
}

const COUPON_CODES: Record<string, number> = {
  JAYJAY20: 0.20,
  WELCOME10: 0.10,
  SAVE50: 0.50,
};

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<CouponResult> {
  const upper = code.trim().toUpperCase();

  if (!upper) {
    return { valid: false, discount: 0, message: 'Please enter a coupon code.' };
  }

  const rate = COUPON_CODES[upper];

  if (!rate) {
    return { valid: false, discount: 0, message: `Invalid code: "${code}"` };
  }

  const discount = Math.round(subtotal * rate);

  return {
    valid: true,
    discount,
    message: `${upper} applied! You saved ${discount} credits.`,
  };
}