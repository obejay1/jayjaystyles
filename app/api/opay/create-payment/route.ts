import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { amount, email, name, phone, orderId } = await req.json();

    const merchantId = process.env.OPAY_MERCHANT_ID || '';
    const privateKey = process.env.OPAY_PRIVATE_KEY || '';
    const baseUrl = process.env.OPAY_BASE_URL || 'https://liveapi.opayweb.com';
    const sanitizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const payload = {
      reference: orderId,
      mchShortName: name || "Customer",
      productName: "JayJayStyles Order",
      productDesc: "Ecommerce Order",
      userPhone: phone,
      userRequestIp: "127.0.0.1",
      amount: {
        total: Math.round(amount * 100).toString(),
        currency: "NGN"
      },
      returnUrl: `${appUrl}/opay/callback?orderId=${orderId}`,
      callbackUrl: `${appUrl}/api/opay/webhook`,
      customerName: name,
      customerEmail: email,
      customerPhone: phone
    };

    const hmac = crypto.createHmac('sha512', privateKey);
    hmac.update(JSON.stringify(payload));
    const signature = hmac.digest('hex');

    const response = await fetch(`${sanitizedBaseUrl}/api/v3/cashier/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${signature}`,
        'MerchantId': merchantId,
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return NextResponse.json(data?.data?.cashierUrl ? { url: data.data.cashierUrl } : { error: 'Failed to initialize OPay' }, { status: data?.data?.cashierUrl ? 200 : 400 });
  } catch (error) {
    console.error('OPay Initialization Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}