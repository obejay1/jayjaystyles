'use client';

import { useEffect, useState } from 'react';
import {
  getOrders,
  getProducts,
  saveProduct,
  removeProduct,
  money,
  updateOrderStatus,
} from '@/lib/store';
import {
  getBookings,
  removeBooking,
  updateBookingStatus,
  Booking,
} from '@/lib/bookings';
import { getCoupons, saveCoupon, removeCoupon, Coupon } from '@/lib/coupons';
import { Product, Order } from '@/lib/types';

type Category = {
  id: string;
  name: string;
  slug: string;
  type: 'product' | 'service' | 'both';
  image: string;
  description: string;
  active: boolean;
};

const defaultCategories: Category[] = [
  {
    id: 'hair',
    name: 'Hair Extensions & Wigs',
    slug: 'hair-extensions-wigs',
    type: 'product',
    image: '',
    description: 'Premium wigs, hair extensions, closures, frontals and hair care products.',
    active: true,
  },
  {
    id: 'makeup',
    name: 'Makeup & Skincare',
    slug: 'makeup-skincare',
    type: 'product',
    image: '',
    description: 'Professional makeup, skincare and beauty products.',
    active: true,
  },
  {
    id: 'gele',
    name: 'Gele & Beads',
    slug: 'gele-beads',
    type: 'both',
    image: '',
    description: 'Gele accessories, coral beads and fashion accessories.',
    active: true,
  },
  {
    id: 'kitchen',
    name: 'Kitchen Accessories',
    slug: 'kitchen-accessories',
    type: 'product',
    image: '',
    description: 'Stylish and useful kitchen accessories.',
    active: true,
  },
];

const blankProduct: Product = {
  id: '',
  name: '',
  price: 0,
  category: 'Hair Extensions & Wigs',
  type: 'product',
  description: '',
  image: '',
  stock: 1,
};

const blankCategory: Category = {
  id: '',
  name: '',
  slug: '',
  type: 'product',
  image: '',
  description: '',
  active: true,
};

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [pin, setPin] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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

  async function load() {
    setProducts(await getProducts());
    setOrders(await getOrders());
    setBookings(await getBookings());
    setCoupons(await getCoupons());

    const saved = localStorage.getItem('jj-categories');
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      localStorage.setItem('jj-categories', JSON.stringify(defaultCategories));
      setCategories(defaultCategories);
    }
  }

  useEffect(() => {
    if (ok) load();
  }, [ok]);

  function saveCategories(next: Category[]) {
    setCategories(next);
    localStorage.setItem('jj-categories', JSON.stringify(next));
  }

  async function submitProduct() {
    const p = {
      ...form,
      id: form.id || Date.now().toString(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    await saveProduct(p);
    setForm(blankProduct);
    load();
  }

  function submitCategory() {
    if (!categoryForm.name.trim()) {
      alert('Please enter category name');
      return;
    }

    const slug =
      categoryForm.slug ||
      categoryForm.name
        .toLowerCase()
        .trim()
        .replaceAll(' ', '-')
        .replace(/[^a-z0-9-]/g, '');

    const newCategory: Category = {
      ...categoryForm,
      id: categoryForm.id || Date.now().toString(),
      slug,
    };

    const exists = categories.some((c) => c.id === newCategory.id);

    const next = exists
      ? categories.map((c) => (c.id === newCategory.id ? newCategory : c))
      : [newCategory, ...categories];

    saveCategories(next);
    setCategoryForm(blankCategory);
  }

  function editCategory(category: Category) {
    setCategoryForm(category);
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  }

  function deleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;
    saveCategories(categories.filter((c) => c.id !== id));
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

  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const activeCategories = categories.filter((c) => c.active).length;
  const productCategories = categories.filter((c) => c.type === 'product').length;
  const serviceCategories = categories.filter((c) => c.type === 'service').length;

  if (!ok) {
    return (
      <main className="admin-shell">
        <h1>JayJayStyles Admin</h1>

        <div className="card" style={{ maxWidth: 420 }}>
          <p>Enter admin PIN</p>

          <input
            className="input"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            type="password"
          />

          <button
            className="btn"
            onClick={() => setOk(pin === (process.env.NEXT_PUBLIC_ADMIN_PIN || '1234'))}
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>JayJayStyles</h2>
        <p className="admin-subtitle">Admin Dashboard</p>

        <a href="#dashboard">🏠 Dashboard</a>
        <a href="#products">📦 Products & Services</a>
        <a href="#categories">🗂 Categories</a>
        <a href="#orders">🛒 Orders</a>
        <a href="#bookings">📅 Bookings</a>
        <a href="#coupons">🎟 Coupons</a>
      </aside>

      <main className="admin-content">
        <div className="topbar" id="dashboard">
          <div>
            <h1>Welcome Back Admin</h1>
            <p>Manage JayJayStyles products, services, categories, orders and bookings.</p>
          </div>

          <input className="input" placeholder="Search anything..." style={{ maxWidth: 320 }} />
        </div>

        <div className="stats-grid">
          <div className="stat-card dark">
            <h3>Total Revenue</h3>
            <h1>{money(revenue)}</h1>
          </div>

          <div className="stat-card">
            <h3>Products</h3>
            <h1>{products.length}</h1>
          </div>

          <div className="stat-card">
            <h3>Categories</h3>
            <h1>{categories.length}</h1>
          </div>

          <div className="stat-card">
            <h3>Orders</h3>
            <h1>{orders.length}</h1>
          </div>
        </div>

        <section className="table-card" id="categories">
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

            <input
              className="input"
              placeholder="Slug e.g hair-extensions"
              value={categoryForm.slug}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, slug: e.target.value })
              }
            />

            <select
              className="input"
              value={categoryForm.type}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  type: e.target.value as 'product' | 'service' | 'both',
                })
              }
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
              <option value="both">Both</option>
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

            <input
              className="input"
              placeholder="Image URL"
              value={categoryForm.image}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, image: e.target.value })
              }
            />

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
          <div className="stat-card">
            <h3>Total Categories</h3>
            <h1>{categories.length}</h1>
          </div>

          <div className="stat-card">
            <h3>Product Categories</h3>
            <h1>{productCategories}</h1>
          </div>

          <div className="stat-card">
            <h3>Service Categories</h3>
            <h1>{serviceCategories}</h1>
          </div>

          <div className="stat-card">
            <h3>Active Categories</h3>
            <h1>{activeCategories}</h1>
          </div>
        </div>

        <section className="table-card">
          <h2>All Categories</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Type</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
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
                  <td>{c.slug}</td>
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
              {categories
                .filter((c) => c.active)
                .map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>

            <select
              className="input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as any })}
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>

            <input
              className="input"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

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
                <tr key={p.id}>
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
          <h2>Orders</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.status || 'Processing'}</td>
                  <td>{money(Number(o.total || 0))}</td>
                  <td>{o.createdAt ? new Date(o.createdAt).toLocaleString() : 'N/A'}</td>
                  <td>
                    <button onClick={async () => { await updateOrderStatus(o.id, 'Shipped'); load(); }}>Ship</button>
                    <button onClick={async () => { await updateOrderStatus(o.id, 'Delivered'); load(); }}>Deliver</button>
                    <button onClick={async () => { await updateOrderStatus(o.id, 'Cancelled'); load(); }}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  <tr key={b.id}>
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

        <section className="table-card" id="coupons">
          <h2>Coupons</h2>

          <div className="admin-form-grid">
            <input
              className="input"
              placeholder="Coupon Code"
              value={couponForm.code}
              onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
            />

            <input
              className="input"
              placeholder="Discount"
              type="number"
              value={couponForm.discount}
              onChange={(e) => setCouponForm({ ...couponForm, discount: +e.target.value })}
            />

            <input
              className="input"
              placeholder="Minimum Order"
              type="number"
              value={couponForm.minOrder}
              onChange={(e) => setCouponForm({ ...couponForm, minOrder: +e.target.value })}
            />

            <input
              className="input"
              type="date"
              value={couponForm.expiryDate}
              onChange={(e) => setCouponForm({ ...couponForm, expiryDate: e.target.value })}
            />
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
                <tr key={c.id}>
                  <td>{c.code}</td>
                  <td>{c.discount}</td>
                  <td>{money(Number(c.minOrder || 0))}</td>
                  <td>{c.expiryDate}</td>
                  <td>
                    <button onClick={() => setCouponForm(c as any)}>Edit</button>
                    <button onClick={async () => { await removeCoupon(c.id); load(); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}