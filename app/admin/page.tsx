'use client';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  getOrders,
  getProducts,
  saveProduct,
  removeProduct,
  money,
  updateOrderStatus,
  getCategories,
  saveCategory,
  removeCategory,
} from '@/lib/store';
import {
  getBookings, 
  removeBooking,
  updateBookingStatus,
  Booking,
} from '@/lib/bookings';
import { getCoupons, saveCoupon, removeCoupon, Coupon } from '@/lib/coupons';
import { getCheckoutSettings, saveCheckoutSettings } from '@/lib/settings';
import { Product, Order, Category } from '@/lib/types';
import { showToast } from '@/lib/toast';


type AdminOrder = Omit<Order, 'items'> & {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  customerAddress?: string;
  address?: string;
  deliveryDays?: string;
  deliveryDaysText?: string;
  estimatedDeliveryDate?: string;
  paymentMethod?: string;
  paymentReference?: string;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  createdAt?: string;
  status?: string;
  items?: Array<{
    id?: string;
    name?: string;
    category?: string;
    price?: number;
    qty?: number;
    quantity?: number;
    image?: string;
    description?: string;
    stock?: number;
  }>;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate?: string;
  orders: AdminOrder[];
};

const blankProduct: Product = {
  id: '',
  name: '',
  price: 0,
  category: 'Hair Extensions & Wigs',
  type: 'product',
  description: '',
  image: '',
  stock: 1,
  featured: false,
  active: true,
};

const blankCategory: Category = {
  id: '',
  name: '',
  type: 'product',
  image: '',
  description: '',
  active: true,
};

type UserDoc = {
  id: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [pin, setPin] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [users, setUsers] = useState<UserDoc[]>([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [ordersPage, setOrdersPage] = useState(1);
  const [customersPage, setCustomersPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [form, setForm] = useState<Product>(blankProduct);
  const [categoryForm, setCategoryForm] = useState<Category>(blankCategory);

  const [couponForm, setCouponForm] = useState({
    id: '',
    code: '',
    discount: 10,
    type: 'percentage',
    minOrder: 0,
    expiryDate: '',
    active: true,
  });

  const [checkoutTaxRate, setCheckoutTaxRate] = useState<number>(7.5);
  const [checkoutShippingFee, setCheckoutShippingFee] = useState<number>(1500);
  const [checkoutDeliveryDaysText, setCheckoutDeliveryDaysText] = useState<string>('2–5 business days');
  const [checkoutDeliveryDaysCount, setCheckoutDeliveryDaysCount] = useState<number>(5);
  const [storeMode, setStoreMode] = useState<'Live' | 'Maintenance'>('Live');
  const [maintenanceEndDate, setMaintenanceEndDate] = useState<string>('');

  async function load() {
    setProducts(await getProducts());
    setOrders(await getOrders() as AdminOrder[]);
    setBookings(await getBookings());
    setCoupons(await getCoupons());
    setCategories(await getCategories());

    try {
      const s = await getCheckoutSettings() as Awaited<ReturnType<typeof getCheckoutSettings>> & {
        deliveryDaysText?: string;
        deliveryDaysCount?: number;
        storeMode?: 'Live' | 'Maintenance';
        maintenanceEndDate?: string;
      };
      setCheckoutTaxRate(s.taxRate);
      setCheckoutShippingFee(s.shippingFee);
      if (s.deliveryDaysText) setCheckoutDeliveryDaysText(s.deliveryDaysText);
      if (s.deliveryDaysCount !== undefined) setCheckoutDeliveryDaysCount(s.deliveryDaysCount);

      const maintenanceHasEnded =
        s.storeMode === 'Maintenance' &&
        !!s.maintenanceEndDate &&
        new Date(s.maintenanceEndDate).getTime() <= Date.now();

      if (maintenanceHasEnded) {
        setStoreMode('Live');
        setMaintenanceEndDate('');
        await saveCheckoutSettings({
          storeMode: 'Live',
          maintenanceEndDate: '',
        });
      } else {
        if (s.storeMode) setStoreMode(s.storeMode);
        setMaintenanceEndDate(s.maintenanceEndDate || '');
      }
    } catch {
      /* ignore */
    }

    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error('Error loading users', err);
    }
  }

  useEffect(() => {
    if (ok) load();
  }, [ok]);

  async function submitProduct() {
    const p = {
      ...form,
      id: form.id || Date.now().toString(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    await saveProduct(p);
    showToast('✅ Product saved successfully!');
    setForm(blankProduct);
    load();
  }

  function uploadCategoryImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setCategoryForm((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  }

  async function submitCategory() {
    if (!categoryForm.name.trim()) {
      alert('Please enter category name');
      return;
    }

    const newCategory: Category = {
      ...categoryForm,
      id: categoryForm.id || Date.now().toString(),
    };

    await saveCategory(newCategory);
    setCategoryForm(blankCategory);
    load();
  }

  function editCategory(category: Category) {
    setCategoryForm(category);
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  }

  async function deleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;
    await removeCategory(id);
    load();
  }

  async function submitCoupon() {
    await saveCoupon({
      ...couponForm,
      id: couponForm.id || Date.now().toString(),
      discount: Number(couponForm.discount),
      minOrder: Number(couponForm.minOrder),
    } as Coupon);

    setCouponForm({
      id: '',
      code: '',
      discount: 10,
      type: 'percentage',
      minOrder: 0,
      expiryDate: '',
      active: true,
    });

    load();
  }

  async function handleRefund(order: AdminOrder) {
    if (!confirm(`Are you sure you want to refund and cancel order #${order.id}?`)) return;

    const method = order.paymentMethod;
    if (method === 'OPay') {
      try {
        const res = await fetch('/api/opay/refund', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            reference: order.paymentReference,
            amount: order.total,
          }),
        });
        const data = await res.json();
        
        if (data.success) {
          showToast('Refund processed successfully', 'success');
          await updateOrderStatus(order.id, 'Refunded');
          load();
        } else {
          showToast('Refund failed: ' + (data.error || 'Unknown error'), 'error');
        }
      } catch (err) {
        console.error(err);
        showToast('Error processing refund', 'error');
      }
    }
  }

  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const activeCategories = categories.filter((c) => c.active).length;
  const productCategories = categories.filter((c) => c.type === 'product').length;
  const serviceCategories = categories.filter((c) => c.type === 'service').length;

  const customers = useMemo(() => {
    const map = new Map<string, Customer>();

    users.forEach(u => {
      const key = (u.email || u.phone || u.id || '').toLowerCase().trim();
      if (!key) return;
      if (!map.has(key)) {
        map.set(key, {
          id: u.id || key,
          name: u.name || u.fullName || 'Unknown',
          email: u.email || 'N/A',
          phone: u.phone || 'N/A',
          address: u.address || 'N/A',
          orderCount: 0,
          totalSpent: 0,
          orders: []
        });
      }
    });

    orders.forEach(o => {
      const key = (o.customerEmail || o.customerPhone || o.id || '').toLowerCase().trim();
      if (!key) return;

      if (!map.has(key)) {
        map.set(key, {
          id: key,
          name: o.customerName || 'Unknown',
          email: o.customerEmail || 'N/A',
          phone: o.customerPhone || 'N/A',
          address: o.shippingAddress || o.customerAddress || o.address || 'N/A',
          orderCount: 0,
          totalSpent: 0,
          orders: []
        });
      }

      const c = map.get(key)!;
      c.orders.push(o);
      c.orderCount++;
      c.totalSpent += Number(o.total || 0);

      const oDate = new Date(o.createdAt || 0);
      if (!c.lastOrderDate || oDate > new Date(c.lastOrderDate)) {
        c.lastOrderDate = o.createdAt;
      }
    });

    return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [users, orders]);

  const filteredCustomers = customers.filter(c => {
    const q = customerSearch.toLowerCase();
    return c.name.toLowerCase().includes(q) || 
           c.email.toLowerCase().includes(q) || 
           c.phone.toLowerCase().includes(q);
  });

  useEffect(() => {
    setCustomersPage(1);
  }, [customerSearch]);

  const filteredOrders = orders.filter(o => {
    const q = orderSearch.toLowerCase();
    return (
      String(o.id).toLowerCase().includes(q) ||
      (o.status || '').toLowerCase().includes(q) ||
      (o.paymentMethod || '').toLowerCase().includes(q) ||
      (o.paymentReference || '').toLowerCase().includes(q) ||
      (o.customerName || '').toLowerCase().includes(q) ||
      (o.customerEmail || '').toLowerCase().includes(q) ||
      (o.customerPhone || '').toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setOrdersPage(1);
  }, [orderSearch]);

  const totalOrdersPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
  const paginatedOrders = filteredOrders.slice((ordersPage - 1) * ITEMS_PER_PAGE, ordersPage * ITEMS_PER_PAGE);

  const totalCustomersPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE) || 1;
  const paginatedCustomers = filteredCustomers.slice((customersPage - 1) * ITEMS_PER_PAGE, customersPage * ITEMS_PER_PAGE);

  function getEstimatedDeliveryDate(order: AdminOrder) {
    if (order.estimatedDeliveryDate) {
      const savedDate = new Date(order.estimatedDeliveryDate);
      if (!Number.isNaN(savedDate.getTime())) return savedDate;
    }

    if (order.createdAt && checkoutDeliveryDaysCount > 0) {
      const createdDate = new Date(order.createdAt);
      if (!Number.isNaN(createdDate.getTime())) {
        const estimatedDate = new Date(createdDate);
        estimatedDate.setDate(estimatedDate.getDate() + Number(checkoutDeliveryDaysCount));
        return estimatedDate;
      }
    }

    return null;
  }

  function getEstimatedDeliveryDisplay(order: AdminOrder) {
    const estimatedDate = getEstimatedDeliveryDate(order);
    return estimatedDate ? estimatedDate.toLocaleDateString() : 'N/A';
  }

  function getDeliveryLabel(order: AdminOrder) {
    return (
      order.deliveryDays ||
      order.deliveryDaysText ||
      (getEstimatedDeliveryDate(order)
        ? `Estimated by ${getEstimatedDeliveryDisplay(order)}`
        : checkoutDeliveryDaysText || 'N/A')
    );
  }

  async function saveAdminCheckoutSettings() {
    const nextMode = storeMode;
    const nextMaintenanceEndDate = nextMode === 'Maintenance' ? maintenanceEndDate : '';

    await saveCheckoutSettings({
      taxRate: Number(checkoutTaxRate),
      shippingFee: Number(checkoutShippingFee),
      deliveryDaysText: checkoutDeliveryDaysText.trim() || '2–5 business days',
      deliveryDaysCount: Number(checkoutDeliveryDaysCount),
      storeMode: nextMode,
      maintenanceEndDate: nextMaintenanceEndDate,
    });

    setMaintenanceEndDate(nextMaintenanceEndDate);
    showToast(
      nextMode === 'Maintenance'
        ? 'Maintenance mode saved successfully'
        : 'Live mode saved successfully',
      'success'
    );
  }

  const exportCustomersCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Address', 'Orders', 'Total Spent', 'Last Order'];
    const rows = filteredCustomers.map(c => [
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.email || '').replace(/"/g, '""')}"`,
      `"${(c.phone || '').replace(/"/g, '""')}"`,
      `"${(c.address || 'N/A').replace(/"/g, '""')}"`,
      c.orderCount,
      c.totalSpent,
      `"${c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleString() : 'N/A'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jayjaystyles-customers-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportOrdersCSV = () => {
    const headers = ['Order ID', 'Status', 'Total', 'Payment Method', 'Payment Reference', 'Date', 'Customer Name', 'Customer Email', 'Customer Phone', 'Estimated Delivery Date'];
    const rows = filteredOrders.map(o => [
      `"${o.id}"`,
      `"${o.status || 'Processing'}"`,
      Number(o.total || 0),
      `"${o.paymentMethod || 'Paystack'}"`,
      `"${o.paymentReference || 'N/A'}"`,
      `"${o.createdAt ? new Date(o.createdAt).toLocaleString() : 'N/A'}"`,
      `"${(o.customerName || 'N/A').replace(/"/g, '""')}"`,
      `"${(o.customerEmail || 'N/A').replace(/"/g, '""')}"`,
      `"${(o.customerPhone || 'N/A').replace(/"/g, '""')}"`,
      `"${getEstimatedDeliveryDisplay(o)}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jayjaystyles-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCustomerPDF = () => {
    if (!selectedCustomer) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>Customer Details - ${selectedCustomer.name}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1a1a1a; }
            h2 { border-bottom: 2px solid #eaeaea; padding-bottom: 10px; }
            .details-grid { display: flex; gap: 40px; margin-bottom: 40px; background: #f8fafc; padding: 20px; border-radius: 8px; }
            .details-grid p { margin: 8px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            th { background-color: #f1f5f9; font-weight: 600; }
          </style>
        </head>
        <body>
          <h2>Customer Details</h2>
          <div class="details-grid">
            <div>
              <p><strong>Name:</strong> ${selectedCustomer.name}</p>
              <p><strong>Email:</strong> ${selectedCustomer.email}</p>
              <p><strong>Phone:</strong> ${selectedCustomer.phone}</p>
              <p><strong>Address:</strong> ${selectedCustomer.address}</p>
            </div>
            <div>
              <p><strong>Total Orders:</strong> ${selectedCustomer.orderCount}</p>
              <p><strong>Total Spent:</strong> ${money(selectedCustomer.totalSpent)}</p>
              <p><strong>Last Order:</strong> ${selectedCustomer.lastOrderDate ? new Date(selectedCustomer.lastOrderDate).toLocaleString() : 'N/A'}</p>
            </div>
          </div>

          <h3>Order History</h3>
          ${selectedCustomer.orders.length === 0 ? '<p>No orders yet.</p>' : `
            <table>
              <thead>
                <tr><th>Order ID</th><th>Date</th><th>Status</th><th>Total</th></tr>
              </thead>
              <tbody>
                ${selectedCustomer.orders.map(o => `<tr><td>#${o.id}</td><td>${o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'N/A'}</td><td>${o.status || 'Processing'}</td><td>${money(Number(o.total || 0))}</td></tr>`).join('')}
              </tbody>
            </table>
          `}
          <script>window.onload = () => setTimeout(() => { window.print(); window.close(); }, 250);</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const exportOrderInvoicePDF = (order: AdminOrder) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const items = order.items || [];
    const subtotal = order.subtotal || order.total || 0;
    const shipping = order.shipping || 0;
    const tax = order.tax || 0;
    const total = order.total || 0;

    const html = `
      <html>
        <head>
          <title>Invoice - Order #${order.id}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1a1a1a; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #eaeaea; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { margin: 0; color: #d4af37; }
            .header p { margin: 4px 0; color: #666; }
            .invoice-details { display: flex; gap: 40px; margin-bottom: 40px; }
            .invoice-details div { flex: 1; }
            h3 { border-bottom: 1px solid #eaeaea; padding-bottom: 8px; margin-bottom: 16px; font-size: 16px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { border-bottom: 1px solid #e2e8f0; padding: 12px 8px; text-align: left; }
            th { background-color: #f8fafc; font-weight: 600; color: #333; }
            .totals { width: 300px; margin-left: auto; }
            .totals-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f8fafc; }
            .totals-row.grand-total { font-weight: bold; font-size: 1.1em; border-bottom: none; border-top: 2px solid #eaeaea; padding-top: 12px; margin-top: 8px; }
            .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
            .badge.green { background: #dcfce7; color: #166534; }
            .badge.gold { background: #fef08a; color: #92400e; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>JayJayStyles</h1>
              <p>Luxury Beauty, Fashion &amp; Lifestyle Store</p>
            </div>
            <div style="text-align: right;">
              <h2 style="margin: 0 0 8px 0;">INVOICE</h2>
              <p><strong>Order ID:</strong> #${order.id}</p>
              <p><strong>Date:</strong> ${order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</p>
              ${getDeliveryLabel(order) !== 'N/A' ? `<p><strong>Estimated Delivery:</strong> ${getDeliveryLabel(order)}</p>` : ''}
              <p><strong>Status:</strong> <span class="badge ${order.status === 'Delivered' ? 'green' : 'gold'}">${order.status || 'Processing'}</span></p>
            </div>
          </div>

          <div class="invoice-details">
            <div>
              <h3>Bill To:</h3>
              <p><strong>${order.customerName || 'N/A'}</strong></p>
              <p>${order.customerEmail || 'N/A'}</p>
              <p>${order.customerPhone || 'N/A'}</p>
            </div>
            <div>
              <h3>Ship To:</h3>
              <p>${order.shippingAddress || order.customerAddress || order.address || 'N/A'}</p>
            </div>
            <div>
              <h3>Payment Info:</h3>
              <p><strong>Method:</strong> ${order.paymentMethod || 'Paystack'}</p>
              <p><strong>Reference:</strong> ${order.paymentReference || 'N/A'}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.length > 0 ? items.map((item) => `
                <tr>
                  <td>
                    <div style="font-weight: 500;">${item.name || 'Product'}</div>
                    <div style="font-size: 0.9em; color: #666;">${item.category || ''}</div>
                  </td>
                  <td>${money(Number(item.price || 0))}</td>
                  <td>${item.qty || item.quantity || 1}</td>
                  <td style="text-align: right;">${money(Number(item.price || 0) * Number(item.qty || item.quantity || 1))}</td>
                </tr>
              `).join('') : `<tr><td colSpan="4" style="text-align: center;">No items found.</td></tr>`}
            </tbody>
          </table>

          <div class="totals">
            <div class="totals-row">
              <span>Subtotal:</span>
              <span>${money(Number(subtotal))}</span>
            </div>
            <div class="totals-row">
              <span>Shipping:</span>
              <span>${money(Number(shipping))}</span>
            </div>
            <div class="totals-row">
              <span>Tax:</span>
              <span>${money(Number(tax))}</span>
            </div>
            <div class="totals-row grand-total">
              <span>Total:</span>
              <span>${money(Number(total))}</span>
            </div>
          </div>

          <script>window.onload = () => setTimeout(() => { window.print(); window.close(); }, 250);</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  if (!ok) {
    const handleLogin = () => {
      if (pin === (process.env.NEXT_PUBLIC_ADMIN_PIN || '1234')) {
        setOk(true);
        sessionStorage.setItem('jayjay_admin', 'true');
      } else {
        showToast('Incorrect Admin PIN', 'error');
      }
    };

    return (
      <main className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-login-brand">
            <img src="/logo.png" alt="JayJayStyles" />
            <h1>JayJayStyles</h1>
            <p>Luxury Beauty, Fashion &amp; Lifestyle Store</p>
          </div>

          <div className="admin-login-content">
            <h2>Admin Dashboard</h2>
            <p>
              Manage products, services, categories, orders, bookings, customers and coupons.
            </p>

            <input
              className="admin-pin-input"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              type="password"
              placeholder="Enter Admin PIN"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />

            <button
              className="admin-login-btn"
              onClick={handleLogin}
            >
              Login to Dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>JayJayStyles</h2>
        <p className="admin-subtitle">Admin Dashboard</p>

        <a href="#admin">🏠 Dashboard</a>
        <a href="#products">📦 Products &amp; Services</a>
        <a href="#categories">🗂 Categories</a>
        <a href="#bookings">📅 Bookings</a>
        <a href="#customers">👥 Customers</a>
        <Link href="/admin/reports">📊 Financial Reports</Link>
        <a href="#coupons">🎟 Coupons</a>
        <a href="#" style={{ marginTop: 20 }} onClick={(e) => { 
          e.preventDefault(); 
          setOk(false); 
          setPin(''); 
          sessionStorage.removeItem('jayjay_admin');
        }}>
          🚪 Logout
        </a>
      </aside>

      <main className="admin-content">
        <div className="topbar" id="admin">
          <div>
            <h1>Welcome Back Admin</h1>
            <p>Manage JayJayStyles products, services, categories, orders and bookings.</p>
          </div>

<div
  style={{
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
  }}
>
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      borderRadius: '999px',
      fontWeight: 900,
      fontSize: '14px',
      background: storeMode === 'Live' ? '#dcfce7' : '#fef3c7',
      color: storeMode === 'Live' ? '#166534' : '#92400e',
      border:
        storeMode === 'Live'
          ? '1px solid #86efac'
          : '1px solid #facc15',
      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    }}
  >
    {storeMode === 'Live' ? '🟢 Live Mode' : '🟡 Maintenance Mode'}
  </span>
  <button className="btn" onClick={load}>
    Refresh
  </button>
</div>

  <input
    className="input"
    placeholder="Search..."
    style={{ maxWidth: 120 }}
  />
          
        </div>

        <div className="stats-grid">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="stat-card dark">
            <h3>Total Revenue</h3>
            <h1>{money(revenue)}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.1 }} className="stat-card">
            <h3>Products</h3>
            <h1>{products.length}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.2 }} className="stat-card">
            <h3>Categories</h3>
            <h1>{categories.length}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.3 }} className="stat-card">
            <h3>Orders</h3>
            <h1>{orders.length}</h1>
          </motion.div>
        </div>

        <section className="table-card" id="settings">
  <h2>Store & Checkout Settings</h2>
  <p style={{ color: '#64748b', marginBottom: '22px' }}>
    Store status, tax percentage, shipping fee, and delivery estimates.
  </p>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '18px',
      alignItems: 'end',
    }}
  >
    <div>
      <label
        style={{
          display: 'block',
          fontWeight: 800,
          marginBottom: '8px',
          color: '#111827',
        }}
      >
        Store Mode
      </label>
      <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '13px' }}>
        Choose if customers can shop or if the store is under maintenance.
      </p>

      <select
        className="input"
        value={storeMode}
        onChange={(e) =>
          setStoreMode(e.target.value as 'Live' | 'Maintenance')
        }
      >
        <option value="Live">Live Mode</option>
        <option value="Maintenance">Maintenance Mode</option>
      </select>
    </div>

    <div>
      <label
        style={{
          display: 'block',
          fontWeight: 800,
          marginBottom: '8px',
          color: '#111827',
        }}
      >
        Tax Rate
      </label>
      <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '13px' }}>
        Percentage added as tax at checkout.
      </p>

      <input
        className="input"
        type="number"
        value={checkoutTaxRate}
        onChange={(e) => setCheckoutTaxRate(Number(e.target.value))}
        placeholder="Example: 7.5"
      />
    </div>

    <div>
      <label
        style={{
          display: 'block',
          fontWeight: 800,
          marginBottom: '8px',
          color: '#111827',
        }}
      >
        Shipping Fee
      </label>
      <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '13px' }}>
        Delivery fee customers will pay at checkout.
      </p>

      <input
        className="input"
        type="number"
        value={checkoutShippingFee}
        onChange={(e) => setCheckoutShippingFee(Number(e.target.value))}
        placeholder="Example: 1500"
      />
    </div>

    <div>
      <label
        style={{
          display: 'block',
          fontWeight: 800,
          marginBottom: '8px',
          color: '#111827',
        }}
      >
        Delivery Text
      </label>
      <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '13px' }}>
        This is what customers will see, like “1–2 business days”.
      </p>

      <input
        className="input"
        value={checkoutDeliveryDaysText}
        onChange={(e) => setCheckoutDeliveryDaysText(e.target.value)}
        placeholder="Example: 1–2 business days"
      />
    </div>

    <div>
      <label
        style={{
          display: 'block',
          fontWeight: 800,
          marginBottom: '8px',
          color: '#111827',
        }}
      >
        Delivery Days Count
      </label>
      <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '13px' }}>
        Used to calculate the estimated delivery date.
      </p>

      <input
        className="input"
        type="number"
        value={checkoutDeliveryDaysCount}
        onChange={(e) => setCheckoutDeliveryDaysCount(Number(e.target.value))}
        placeholder="Example: 2"
      />
    </div>

    <div>
      <label
        style={{
          display: 'block',
          fontWeight: 800,
          marginBottom: '8px',
          color: '#111827',
        }}
      >
        Maintenance End Date
      </label>
      <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '13px' }}>
        Optional date when maintenance should end.
      </p>

      <input
        className="input"
        type="datetime-local"
        value={maintenanceEndDate}
        onChange={(e) => setMaintenanceEndDate(e.target.value)}
        disabled={storeMode !== 'Maintenance'}
      />
    </div>
  </div>

  <button
    className="btn"
    onClick={saveAdminCheckoutSettings}
    style={{ marginTop: '22px' }}
  >
    Save Settings
  </button>
</section>

        <section className="table-card category-card" id="categories">
          <div className="admin-section-title">
            <div>
              <h2>Add / Edit Category</h2>
              <p>Create categories for products and services.</p>
            </div>
          </div>

          <div className="admin-form-grid">
            <input
              className="input"
              placeholder="Category Name"
              value={categoryForm.name}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, name: e.target.value })
              }
            />

            <select
              className="input"
              value={categoryForm.type}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  type: e.target.value as 'product' | 'service',
                })
              }
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>

            <select
              className="input"
              value={categoryForm.active ? 'active' : 'inactive'}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  active: e.target.value === 'active',
                })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="category-upload-box">
              <label>Category Image</label>
              <input type="file" accept="image/*" onChange={uploadCategoryImage} />

              {categoryForm.image && (
                <img
                  src={categoryForm.image}
                  alt="Category Preview"
                  className="category-preview"
                />
              )}
            </div>

            <textarea
              className="input"
              placeholder="Description"
              value={categoryForm.description}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, description: e.target.value })
              }
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="btn" onClick={submitCategory}>
              {categoryForm.id ? 'Update Category' : 'Save Category'}
            </button>

            <button
              className="btn light"
              onClick={() => setCategoryForm(blankCategory)}
            >
              Clear
            </button>
          </div>
        </section>

        <div className="stats-grid">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="stat-card">
            <h3>Total Categories</h3>
            <h1>{categories.length}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }} className="stat-card">
            <h3>Product Categories</h3>
            <h1>{productCategories}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.2 }} className="stat-card">
            <h3>Service Categories</h3>
            <h1>{serviceCategories}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.3 }} className="stat-card">
            <h3>Active Categories</h3>
            <h1>{activeCategories}</h1>
          </motion.div>
        </div>

        <section className="table-card">
          <h2>All Categories</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((c) => (
                <tr key={String(c.id)}>
                  <td>
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.name}
                        width={45}
                        height={45}
                        style={{ objectFit: 'cover', borderRadius: 10 }}
                      />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{c.name}</td>
                  <td>
                    <span className="badge gold">{c.type}</span>
                  </td>
                  <td>
                    <span className={c.active ? 'badge green' : 'badge red'}>
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{c.description}</td>
                  <td>
                    <button onClick={() => editCategory(c)}>Edit</button>
                    <button onClick={() => deleteCategory(c.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="table-card" id="products">
          <h2>Add / Edit Product or Service</h2>

          <div className="admin-form-grid">
            <input
              className="input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="input"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: +e.target.value })}
            />

            <select
              className="input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories
                .filter((c) => c.active)
                .map((cat) => (
                  <option key={String(cat.id)} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>

            <select
              className="input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as 'product' | 'service' })}
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>

            <div className="product-upload-box">
  <label>Product Image</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        setForm({
          ...form,
          image: reader.result as string,
        });
      };

      reader.readAsDataURL(file);
    }}
  />

  {form.image && (
    <img
      src={form.image}
      alt="Preview"
      className="product-preview"
    />
  )}
</div>

            <input
              className="input"
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: +e.target.value })}
            />

            <textarea
              className="input"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <label className="input" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={form.featured || false}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>

            <label className="input" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={form.active ?? true}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Active
            </label>
          </div>

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              width={120}
              style={{ marginTop: 10, borderRadius: 12 }}
            />
          )}

          <br />
          <br />

          <button className="btn" onClick={submitProduct}>
            Save Product / Service
          </button>
        </section>

        <section className="table-card">
          <h2>Inventory</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={String(p.id)}>
                  <td>{p.name}</td>
                  <td>{p.type}</td>
                  <td>{p.category}</td>
                  <td>{money(p.price)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => setForm(p)}>Edit</button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete ${p.name}?`)) {
                          await removeProduct(p.id);
                          load();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="table-card" id="orders">
          <div className="admin-section-title" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2>Orders</h2>
              <p>Manage and process customer orders.</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={exportOrdersCSV} className="btn light" style={{ whiteSpace: 'nowrap' }}>
                Download CSV
              </button>
              <input 
                className="input" 
                placeholder="Search ID, customer, ref..." 
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                style={{ maxWidth: 300 }}
              />
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Total</th>
                <th>Method</th>
                <th>Reference</th>
                <th>Date</th>
                <th>Est. Delivery</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center' }}>No orders found</td>
                </tr>
              ) : (
                paginatedOrders.map((o) => (
                  <tr key={String(o.id)}>
                    <td>#{o.id}</td>
                    <td>{o.status || 'Processing'}</td>
                    <td>{money(Number(o.total || 0))}</td>
                    <td>{o.paymentMethod || 'Paystack'}</td>
                    <td>{o.paymentReference || 'N/A'}</td>
                    <td>{o.createdAt ? new Date(o.createdAt).toLocaleString() : 'N/A'}</td>
                    <td>{getEstimatedDeliveryDisplay(o)}</td>
                    <td>
                      <button onClick={() => window.open(`/invoice/${o.id}`, '_blank')}>View Invoice</button>
                      <button onClick={() => exportOrderInvoicePDF(o)}>Print Invoice</button>
                      <button onClick={async () => { 
                        if (confirm(`Mark order #${o.id} as Shipped?`)) {
                          await updateOrderStatus(o.id, 'Shipped'); 
                          load(); 
                        }
                      }}>Ship</button>
                      <button onClick={async () => { 
                        if (confirm(`Mark order #${o.id} as Delivered?`)) {
                          await updateOrderStatus(o.id, 'Delivered'); 
                          load(); 
                        }
                      }}>Deliver</button>
                      {o.paymentMethod === 'OPay' ? (
                        <button onClick={() => handleRefund(o)}>Refund & Cancel</button>
                      ) : (
                        <button onClick={async () => { 
                          if (confirm(`Cancel order #${o.id}?`)) {
                            await updateOrderStatus(o.id, 'Cancelled'); 
                            load(); 
                          }
                        }}>Cancel</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
            <button 
              className="btn light" 
              disabled={ordersPage === 1} 
              onClick={() => setOrdersPage(p => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Page {ordersPage} of {totalOrdersPages}</span>
            <button 
              className="btn light" 
              disabled={ordersPage === totalOrdersPages} 
              onClick={() => setOrdersPage(p => Math.min(totalOrdersPages, p + 1))}
            >
              Next
            </button>
          </div>
        </section>

        <section className="table-card" id="bookings">
          <h2>Bookings</h2>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Service</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center' }}>
                    No bookings yet
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={String(b.id)}>
                    <td>#{b.id}</td>
                    <td>{b.serviceName}</td>
                    <td>{b.customerName}</td>
                    <td>{b.customerPhone}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>{b.status || 'Pending'}</td>
                    <td>
                      <button onClick={async () => { await updateBookingStatus(b.id, 'confirmed'); load(); }}>Confirm</button>
                      <button onClick={async () => { await updateBookingStatus(b.id, 'completed'); load(); }}>Complete</button>
                      <button onClick={async () => { await updateBookingStatus(b.id, 'cancelled'); load(); }}>Cancel</button>
                      <button onClick={async () => { if (confirm(`Delete booking #${b.id}?`)) { await removeBooking(b.id); load(); } }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <section className="table-card" id="customers">
          <div className="admin-section-title" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2>Customers</h2>
              <p>Manage customers and view their order history.</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={exportCustomersCSV} className="btn light" style={{ whiteSpace: 'nowrap' }}>
                Download CSV
              </button>
              <input 
                className="input" 
                placeholder="Search name, email, phone..." 
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                style={{ maxWidth: 300 }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginTop: 16 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Last Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>No customers found</td>
                  </tr>
                ) : (
                  paginatedCustomers.map(c => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.orderCount}</td>
                      <td>{money(c.totalSpent)}</td>
                      <td>{c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <button onClick={() => setSelectedCustomer(c)}>View Details</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
            <button 
              className="btn light" 
              disabled={customersPage === 1} 
              onClick={() => setCustomersPage(p => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Page {customersPage} of {totalCustomersPages}</span>
            <button 
              className="btn light" 
              disabled={customersPage === totalCustomersPages} 
              onClick={() => setCustomersPage(p => Math.min(totalCustomersPages, p + 1))}
            >
              Next
            </button>
          </div>
        </section>

        <section className="table-card" id="coupons">
          <h2>Coupons</h2>

          <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px',
    alignItems: 'end',
  }}
>
  <div>
    <label
      style={{
        display: 'block',
        fontWeight: 800,
        marginBottom: '8px',
        color: '#111827',
      }}
    >
      Coupon Code
    </label>

    <p
      style={{
        margin: '0 0 8px',
        color: '#64748b',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      The code customers will type at checkout, like WELCOME10.
    </p>

    <input
      className="input"
      placeholder="Example: WELCOME10"
      value={couponForm.code}
      onChange={(e) =>
        setCouponForm({
          ...couponForm,
          code: e.target.value.toUpperCase(),
        })
      }
    />
  </div>

  <div>
    <label
      style={{
        display: 'block',
        fontWeight: 800,
        marginBottom: '8px',
        color: '#111827',
      }}
    >
      Discount Amount
    </label>

    <p
      style={{
        margin: '0 0 8px',
        color: '#64748b',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      Enter the discount value. Example: 10 for 10% or ₦10.
    </p>

    <input
      className="input"
      placeholder="Example: 10"
      type="number"
      value={couponForm.discount}
      onChange={(e) =>
        setCouponForm({
          ...couponForm,
          discount: Number(e.target.value),
        })
      }
    />
  </div>

  <div>
    <label
      style={{
        display: 'block',
        fontWeight: 800,
        marginBottom: '8px',
        color: '#111827',
      }}
    >
      Discount Type
    </label>

    <p
      style={{
        margin: '0 0 8px',
        color: '#64748b',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      Choose percentage discount or fixed naira discount.
    </p>

    <select
      className="input"
      value={couponForm.type}
      onChange={(e) =>
        setCouponForm({
          ...couponForm,
          type: e.target.value,
        })
      }
    >
      <option value="percentage">Percentage</option>
      <option value="fixed">Fixed Amount</option>
    </select>
  </div>

  <div>
    <label
      style={{
        display: 'block',
        fontWeight: 800,
        marginBottom: '8px',
        color: '#111827',
      }}
    >
      Minimum Order
    </label>

    <p
      style={{
        margin: '0 0 8px',
        color: '#64748b',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      Minimum cart amount before this coupon can work.
    </p>

    <input
      className="input"
      placeholder="Example: 5000"
      type="number"
      value={couponForm.minOrder}
      onChange={(e) =>
        setCouponForm({
          ...couponForm,
          minOrder: Number(e.target.value),
        })
      }
    />
  </div>

  <div>
    <label
      style={{
        display: 'block',
        fontWeight: 800,
        marginBottom: '8px',
        color: '#111827',
      }}
    >
      Expiry Date
    </label>

    <p
      style={{
        margin: '0 0 8px',
        color: '#64748b',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      The date this coupon should stop working.
    </p>

    <input
      className="input"
      type="date"
      value={couponForm.expiryDate}
      onChange={(e) =>
        setCouponForm({
          ...couponForm,
          expiryDate: e.target.value,
        })
      }
    />
  </div>

  <div>
    <label
      style={{
        display: 'block',
        fontWeight: 800,
        marginBottom: '8px',
        color: '#111827',
      }}
    >
      Coupon Status
    </label>

    <p
      style={{
        margin: '0 0 8px',
        color: '#64748b',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      Turn this on if customers are allowed to use the coupon.
    </p>

    <label
      className="input"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <input
        type="checkbox"
        checked={couponForm.active}
        onChange={(e) =>
          setCouponForm({
            ...couponForm,
            active: e.target.checked,
          })
        }
      />
      Active Coupon
    </label>
  </div>
</div>

          <br />

          <button className="btn" onClick={submitCoupon}>Save Coupon</button>

          <table className="table" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Min Order</th>
                <th>Expiry</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={String(c.id)}>
                  <td>{c.code}</td>
                  <td>{c.discount}</td>
                  <td>{money(Number(c.minOrder || 0))}</td>
                  <td>{c.expiryDate}</td>
                  <td>
                    <button onClick={() => setCouponForm({
                      id: c.id,
                      code: c.code,
                      discount: c.discount,
                      type: c.type || 'percentage',
                      minOrder: c.minOrder || 0,
                      expiryDate: c.expiryDate || '',
                      active: c.active ?? true,
                    })}>Edit</button>
                    <button onClick={async () => {
                      if (confirm(`Delete coupon ${c.code}?`)) {
                        await removeCoupon(c.id);
                        load();
                      }
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {selectedCustomer && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div className="modal-content table-card" style={{ maxWidth: 800, width: '100%', maxHeight: '90vh', overflowY: 'auto', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <h2 style={{ margin: 0 }}>Customer Details</h2>
                <button onClick={exportCustomerPDF} className="btn light" style={{ padding: '6px 12px', fontSize: 14 }}>Export PDF</button>
              </div>
              <button onClick={() => setSelectedCustomer(null)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#333' }}>&times;</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 30, padding: 16, background: '#f8fafc', borderRadius: 12 }}>
              <div>
                <p style={{ margin: '4px 0' }}><strong>Name:</strong> {selectedCustomer.name}</p>
                <p style={{ margin: '4px 0' }}><strong>Email:</strong> {selectedCustomer.email}</p>
                <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p style={{ margin: '4px 0' }}><strong>Address:</strong> {selectedCustomer.address}</p>
              </div>
              <div>
                <p style={{ margin: '4px 0' }}><strong>Total Orders:</strong> {selectedCustomer.orderCount}</p>
                <p style={{ margin: '4px 0' }}><strong>Total Spent:</strong> {money(selectedCustomer.totalSpent)}</p>
                <p style={{ margin: '4px 0' }}><strong>Last Order:</strong> {selectedCustomer.lastOrderDate ? new Date(selectedCustomer.lastOrderDate).toLocaleString() : 'N/A'}</p>
              </div>
            </div>

            <h3>Order History</h3>
            {selectedCustomer.orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="table" style={{ marginTop: 10 }}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomer.orders.map(o => (
                      <tr key={String(o.id)}>
                        <td>#{o.id}</td>
                        <td>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <span className={o.status === 'Delivered' ? 'badge green' : o.status === 'Cancelled' ? 'badge red' : 'badge gold'}>
                            {o.status || 'Processing'}
                          </span>
                        </td>
                        <td>{money(Number(o.total || 0))}</td>
                        <td><button onClick={() => window.open(`/invoice/${o.id}`, '_blank')}>View Invoice</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}