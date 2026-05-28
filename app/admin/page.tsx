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

const blank: Product = {
  id: '',
  name: '',
  price: 0,
  category: 'Cleaning Products',
  type: 'product',
  description: '',
  image: '',
  stock: 1,
};

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [pin, setPin] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [form, setForm] = useState<Product>(blank);

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
  }

  useEffect(() => {
    if (ok) load();
  }, [ok]);

  async function submit() {
    const p = {
      ...form,
      id: form.id || Date.now().toString(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    await saveProduct(p);
    setForm(blank);
    load();
  }

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

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
            onClick={() =>
              setOk(pin === (process.env.NEXT_PUBLIC_ADMIN_PIN || '1234'))
            }
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
        <a href="#dashboard">Dashboard</a>
        <a href="#products">Products</a>
        <a href="#orders">Orders</a>
        <a href="#bookings">Bookings</a>
        <a href="#coupons">Coupons</a>
      </aside>

      <main className="admin-content">
        <div className="topbar" id="dashboard">
          <div>
            <h1>Welcome Back Admin</h1>
            <p>Manage products, orders, bookings, and coupons.</p>
          </div>

          <input
            className="input"
            placeholder="Search..."
            style={{ maxWidth: 320 }}
          />
        </div>

        <div className="stats-grid">
          <div className="stat-card dark">
            <h3>Total Revenue</h3>
            <h1>{money(revenue)}</h1>
          </div>

          <div className="stat-card">
            <h3>Orders</h3>
            <h1>{orders.length}</h1>
          </div>

          <div className="stat-card">
            <h3>Products</h3>
            <h1>{products.length}</h1>
          </div>

          <div className="stat-card">
            <h3>Bookings</h3>
            <h1>{bookings.length}</h1>
          </div>
        </div>

        <section className="table-card" id="products">
          <h2>Add / Edit Product</h2>

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

          <input
            className="input"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <select
            className="input"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as any })
            }
          >
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>

          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();

              reader.onloadend = async () => {
                const res = await fetch('/api/upload', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ image: reader.result }),
                });

                const data = await res.json();

                setForm((prev) => ({
                  ...prev,
                  image: data.url,
                }));

                alert('Image uploaded successfully!');
              };

              reader.readAsDataURL(file);
            }}
          />

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              width={120}
              style={{ marginTop: 10, borderRadius: 12 }}
            />
          )}

          <textarea
            className="input"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: +e.target.value })}
          />

          <label>
            <input
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.checked })
              }
            />{' '}
            Featured
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={!!form.bestseller}
              onChange={(e) =>
                setForm({ ...form, bestseller: e.target.checked })
              }
            />{' '}
            Bestseller
          </label>

          <br />
          <br />

          <button className="btn" onClick={submit}>
            Save Product
          </button>
        </section>

        <section className="table-card">
          <h2>Inventory</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
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
                  <td>
                    {o.createdAt
                      ? new Date(o.createdAt).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td>
                    <button
                      onClick={async () => {
                        await updateOrderStatus(o.id, 'Shipped');
                        load();
                      }}
                    >
                      Ship
                    </button>

                    <button
                      onClick={async () => {
                        await updateOrderStatus(o.id, 'Delivered');
                        load();
                      }}
                    >
                      Deliver
                    </button>

                    <button
                      onClick={async () => {
                        await updateOrderStatus(o.id, 'Cancelled');
                        load();
                      }}
                    >
                      Cancel
                    </button>
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
                      <button
                        onClick={async () => {
                          await updateBookingStatus(b.id, 'confirmed');
                          load();
                        }}
                      >
                        Confirm
                      </button>

                      <button
                        onClick={async () => {
                          await updateBookingStatus(b.id, 'completed');
                          load();
                        }}
                      >
                        Complete
                      </button>

                      <button
                        onClick={async () => {
                          await updateBookingStatus(b.id, 'cancelled');
                          load();
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        onClick={async () => {
                          if (confirm(`Delete booking #${b.id}?`)) {
                            await removeBooking(b.id);
                            load();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <section className="table-card" id="coupons">
          <h2>Coupons 🎟️</h2>

          <div className="card" style={{ marginBottom: 24 }}>
            <h3>Create New Coupon</h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
              }}
            >
              <input
                className="input"
                placeholder="Coupon Code e.g JAYJAY20"
                value={couponForm.code}
                onChange={(e) =>
                  setCouponForm({
                    ...couponForm,
                    code: e.target.value.toUpperCase(),
                  })
                }
              />

              <input
                className="input"
                type="number"
                placeholder="Discount"
                value={couponForm.discount}
                onChange={(e) =>
                  setCouponForm({
                    ...couponForm,
                    discount: Number(e.target.value),
                  })
                }
              />

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
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₦)</option>
              </select>

              <input
                className="input"
                type="number"
                placeholder="Minimum Order"
                value={couponForm.minOrder}
                onChange={(e) =>
                  setCouponForm({
                    ...couponForm,
                    minOrder: Number(e.target.value),
                  })
                }
              />

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

              <label>
                <input
                  type="checkbox"
                  checked={couponForm.active}
                  onChange={(e) =>
                    setCouponForm({
                      ...couponForm,
                      active: e.target.checked,
                    })
                  }
                />{' '}
                Active
              </label>
            </div>

            <button
              className="btn"
              style={{ marginTop: 12 }}
              onClick={async () => {
                if (!couponForm.code) {
                  alert('Enter coupon code');
                  return;
                }

                await saveCoupon({
                  ...couponForm,
                  id: couponForm.id || Date.now().toString(),
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
                alert('Coupon saved!');
              }}
            >
              Save Coupon
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Type</th>
                <th>Min Order</th>
                <th>Expires</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center' }}>
                    No coupons yet
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.code}</strong>
                    </td>
                    <td>
                      {c.type === 'percentage'
                        ? `${c.discount}%`
                        : `₦${c.discount}`}
                    </td>
                    <td>{c.type}</td>
                    <td>{c.minOrder ? `₦${c.minOrder}` : '-'}</td>
                    <td>{c.expiryDate || '-'}</td>
                    <td>{c.active ? 'Active' : 'Inactive'}</td>
                    <td>
                      <button onClick={() => setCouponForm(c as any)}>
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          if (confirm(`Delete coupon ${c.code}?`)) {
                            await removeCoupon(c.id);
                            load();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}