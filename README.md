# JayJayStyles E-commerce Website

A mobile-first Nigeria-based e-commerce web app inspired by the provided Luxury Glow & Beauty UI screenshots.

## Features
- Home, shop, services, product details, cart, checkout, account, and admin pages
- Product/service CRUD from the admin dashboard
- Cart quantity management
- Nigerian Naira pricing
- Paystack checkout integration hook
- Firebase Firestore backend support with localStorage fallback for fast testing
- Ready for deployment to Vercel, Netlify, or Firebase Hosting

## Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Admin
Visit `/admin`. Default PIN is `1234`; change it in `.env.local` using `NEXT_PUBLIC_ADMIN_PIN`.

## Firebase
Create a Firebase project, enable Firestore, then fill the Firebase values in `.env.local`. Without Firebase values, the app works with localStorage.

## Paystack
Add your Paystack public key in `.env.local`. Checkout will open Paystack when configured; otherwise it simulates order placement.

## Deploy on Vercel
```bash
npm run build
```
Push to GitHub and import the repo on Vercel. Add all environment variables in Vercel Project Settings.
