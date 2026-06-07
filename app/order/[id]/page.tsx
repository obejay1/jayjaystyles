'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust this import based on your actual Firebase config path

export default function OrderTracking() {
  const { id } = useParams() as { id: string };
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!id) return;
      try {
        const docRef = doc(db, 'orders', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder(docSnap.data());
        } else {
          const q = query(collection(db, 'orders'), where('id', '==', id));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setOrder(querySnapshot.docs[0].data());
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <p style={{ color: '#d4af37', fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Loading Order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '20px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '50px 30px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', textAlign: 'center', maxWidth: '450px', width: '100%' }}>
          <h2 style={{ color: '#111827', fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Order Not Found</h2>
          <p style={{ color: '#6b7280', marginBottom: '35px', lineHeight: '1.5' }}>We couldn't find an order matching ID <strong style={{color: '#111827'}}>#{id}</strong>. Please check your order ID and try again.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link href="/" style={{ padding: '12px 24px', backgroundColor: '#111827', color: '#d4af37', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', flex: 1 }}>
              Back to Home
            </Link>
            <Link href="/account" style={{ padding: '12px 24px', backgroundColor: '#f1f5f9', color: '#111827', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', flex: 1 }}>
              Go to Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusProgress = ['Processing', 'Packed', 'Shipped', 'Delivered'];
  const currentStatusIndex = statusProgress.indexOf(order.status || 'Processing');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1 style={{ color: '#d4af37', fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>JayJayStyles</h1>
          <p style={{ color: '#111827', fontSize: '16px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>Order Tracking</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)' }}>
          
          {/* Order Status Banner */}
          <div style={{ backgroundColor: '#111827', padding: '35px 20px', color: '#ffffff', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Order #{order.id}</p>
            <h2 style={{ fontSize: '32px', color: '#d4af37', margin: '0', fontWeight: 'bold' }}>{order.status || 'Processing'}</h2>
          </div>

          {/* Progress Tracker */}
          <div style={{ padding: '40px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', width: '100%', maxWidth: '600px' }}>
              <div style={{ position: 'absolute', top: '15px', left: '0', right: '0', height: '4px', backgroundColor: '#f1f5f9', zIndex: '0' }}>
                <div style={{ height: '100%', backgroundColor: '#d4af37', width: `${Math.max(0, currentStatusIndex) * (100 / (statusProgress.length - 1))}%`, transition: 'width 0.4s ease' }}></div>
              </div>
              
              {statusProgress.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                
                return (
                  <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: '1', width: '60px' }}>
                    <div style={{ 
                      width: '34px', height: '34px', borderRadius: '50%', 
                      backgroundColor: isCompleted ? '#d4af37' : '#ffffff',
                      border: isCompleted ? '4px solid #111827' : '4px solid #f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '10px', transition: 'all 0.3s ease'
                    }}>
                      {isCompleted && (
                        <svg style={{ width: '16px', height: '16px', color: '#111827' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: isCurrent ? 'bold' : '500', color: isCurrent ? '#111827' : '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details Grid */}
          <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', borderBottom: '1px solid #f1f5f9' }}>
            <div><p style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 5px 0' }}>Customer</p><p style={{ fontSize: '16px', color: '#111827', fontWeight: 'bold', margin: '0' }}>{order.customerName}</p><p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>{order.customerEmail}</p></div>
            <div><p style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 5px 0' }}>Order Date</p><p style={{ fontSize: '16px', color: '#111827', fontWeight: '600', margin: '0' }}>{new Date(order.createdAt).toLocaleString()}</p></div>
            <div><p style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 5px 0' }}>Delivery Address</p><p style={{ fontSize: '15px', color: '#111827', margin: '0', lineHeight: '1.5' }}>{order.customerAddress}</p></div>
            <div><p style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 5px 0' }}>Total Amount</p><p style={{ fontSize: '22px', color: '#d4af37', fontWeight: 'bold', margin: '0' }}>₦{order.total?.toLocaleString() || '0'}</p></div>
          </div>

          {/* Product List */}
          {order.items && order.items.length > 0 && (
            <div style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '14px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 20px 0' }}>Items Ordered</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', marginRight: '15px', flexShrink: 0 }}>
                      {item.image ? (<img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />) : (<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '12px' }}>N/A</div>)}
                    </div>
                    <div style={{ flexGrow: 1 }}><p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>{item.name}</p><p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Qty: {item.qty}</p></div>
                    <div style={{ textAlign: 'right' }}><p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0' }}>₦{(item.price * item.qty).toLocaleString()}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          <a href={`https://wa.me/+23490222483595?text=Hi, I need help with my order #${id}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '320px', padding: '16px', backgroundColor: '#25D366', color: '#ffffff', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', borderRadius: '9999px', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)', transition: 'transform 0.2s' }}>
            <svg style={{ width: '22px', height: '22px', marginRight: '10px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Contact Support
          </a>
          <div style={{ display: 'flex', gap: '15px', width: '100%', maxWidth: '320px' }}>
            <Link href="/" style={{ flex: 1, padding: '14px', backgroundColor: '#111827', color: '#d4af37', textAlign: 'center', textDecoration: 'none', borderRadius: '9999px', fontWeight: 'bold', fontSize: '14px' }}>Home</Link>
            <Link href="/account" style={{ flex: 1, padding: '14px', backgroundColor: '#ffffff', color: '#111827', border: '1px solid #e5e7eb', textAlign: 'center', textDecoration: 'none', borderRadius: '9999px', fontWeight: 'bold', fontSize: '14px' }}>Account</Link>
          </div>
        </div>

      </div>
    </div>
  );
}