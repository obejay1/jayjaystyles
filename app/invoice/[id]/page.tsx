'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QRCodeSVG } from 'qrcode.react';
import { useRouter } from 'next/navigation';

const money = (amount: number) => `₦${Math.round(amount || 0).toLocaleString()}`;

export default function InvoicePage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const docRef = doc(db, 'orders', params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error('Error fetching order', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [params.id]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('print') === 'true' && order) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [order]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-content');
    if (!element) return;

    setIsGeneratingPdf(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        logging: false 
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${order.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
        <p style={{ color: '#d4af37', fontSize: 20, fontWeight: 800 }}>Loading Invoice...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', gap: 16 }}>
        <p style={{ color: '#dc2626', fontSize: 20, fontWeight: 800 }}>Invoice not found.</p>
        <button onClick={() => router.push('/admin')} style={{ padding: '10px 20px', background: '#111827', color: '#fff', borderRadius: 8, cursor: 'pointer', border: 'none', fontWeight: 600 }}>Back to Dashboard</button>
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = order.subtotal || order.total || 0;
  const shipping = order.shipping || 0;
  const tax = order.tax || 0;
  const discount = order.discount || 0;
  const total = order.total || 0;

  let watermarkText = 'JAYJAYSTYLES';
  let watermarkColor = 'rgba(0, 0, 0, 0.05)';

  if (order.paymentStatus === 'Paid') {
    watermarkText = 'PAID ✅';
    watermarkColor = 'rgba(22, 163, 74, 0.05)'; // Green
  } else if (order.paymentStatus === 'Pending') {
    watermarkText = 'PENDING ⏳';
    watermarkColor = 'rgba(217, 119, 6, 0.05)'; // Amber
  } else if (order.paymentStatus === 'Failed') {
    watermarkText = 'FAILED ❌';
    watermarkColor = 'rgba(220, 38, 38, 0.05)'; // Red
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .invoice-container { box-shadow: none !important; padding: 0 !important; max-width: 100% !important; margin: 0 !important; }
        }
      `}} />
      
      <div className="no-print" style={{ maxWidth: 850, margin: '0 auto 20px', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button onClick={() => router.push('/admin')} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #d1d5db', color: '#374151', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Back to Dashboard</button>
        <button onClick={handlePrint} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #d4af37', color: '#d4af37', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Print Invoice</button>
        <button 
          onClick={handleDownloadPDF} 
          disabled={isGeneratingPdf}
          style={{ padding: '10px 16px', background: '#111827', border: 'none', color: '#d4af37', borderRadius: 8, cursor: isGeneratingPdf ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: isGeneratingPdf ? 0.7 : 1 }}
        >
          {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      <div className="invoice-container" id="invoice-content" style={{ position: 'relative', overflow: 'hidden', maxWidth: 850, margin: '0 auto', background: '#ffffff', borderRadius: 16, padding: '48px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        <div className="invoice-watermark" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: '150px',
          fontWeight: 900,
          color: watermarkColor,
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}>
          {watermarkText}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #f1f5f9', paddingBottom: 30, marginBottom: 30, flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src="/logo.png" alt="JayJayStyles Logo" style={{ width: 60, height: 60, objectFit: 'contain' }} />
            <div>
              <h1 style={{ margin: 0, color: '#d4af37', fontSize: 28, fontWeight: 900 }}>JayJayStyles</h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Luxury Beauty, Fashion & Lifestyle</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <QRCodeSVG 
              value={`https://jayjaystyles-azee.vercel.app/invoice/${order.id}`} 
              size={80} 
              fgColor="#d4af37" 
              bgColor="#ffffff" 
            />
            <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: 11, fontWeight: 500 }}>Scan to verify invoice</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ margin: '0 0 10px', color: '#0f172a', fontSize: 24, textTransform: 'uppercase', letterSpacing: 1 }}>Invoice</h2>
            <p style={{ margin: '4px 0', color: '#475569', fontSize: 14 }}><strong>Invoice No:</strong> INV-{order.id.slice(0, 8).toUpperCase()}</p>
            <p style={{ margin: '4px 0', color: '#475569', fontSize: 14 }}><strong>Order ID:</strong> #{order.id}</p>
            <p style={{ margin: '4px 0', color: '#475569', fontSize: 14 }}><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
            {order.deliveryDays && <p style={{ margin: '4px 0', color: '#475569', fontSize: 14 }}><strong>Estimated Delivery:</strong> {order.deliveryDays}</p>}
            {order.estimatedDeliveryDate && <p style={{ margin: '4px 0', color: '#475569', fontSize: 14 }}><strong>Est. Delivery Date:</strong> {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>}
          </div>
        </div>

        {/* Status Section */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 30, flexWrap: 'wrap' }}>
          <div style={{ padding: '8px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Payment Method</span>
            <span style={{ color: '#0f172a', fontSize: 15, fontWeight: 700 }}>{order.paymentMethod || 'Credit Card'}</span>
          </div>
          <div style={{ padding: '8px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Payment Status</span>
            <span style={{ color: '#16a34a', fontSize: 15, fontWeight: 700 }}>Paid</span>
          </div>
          <div style={{ padding: '8px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Order Status</span>
            <span style={{ color: '#d4af37', fontSize: 15, fontWeight: 700 }}>{order.status || 'Processing'}</span>
          </div>
          <div style={{ padding: '8px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Reference</span>
            <span style={{ color: '#0f172a', fontSize: 15, fontWeight: 700 }}>{order.paymentReference || 'N/A'}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 30, marginBottom: 40 }}>
          <div>
            <h3 style={{ margin: '0 0 12px', color: '#0f172a', fontSize: 16, borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>Billed To</h3>
            <p style={{ margin: '4px 0', color: '#334155', fontWeight: 600 }}>{order.customerName || 'N/A'}</p>
            <p style={{ margin: '4px 0', color: '#475569', fontSize: 14 }}>{order.customerEmail || 'N/A'}</p>
            <p style={{ margin: '4px 0', color: '#475569', fontSize: 14 }}>{order.customerPhone || 'N/A'}</p>
          </div>
          <div>
            <h3 style={{ margin: '0 0 12px', color: '#0f172a', fontSize: 16, borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>Shipped To</h3>
            <p style={{ margin: '4px 0', color: '#475569', fontSize: 14, lineHeight: 1.5 }}>{order.shippingAddress || order.address || order.customerAddress || 'N/A'}</p>
          </div>
        </div>

        {/* Products Table */}
        <div style={{ marginBottom: 40, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ padding: '16px 12px', background: '#0f172a', color: '#fff', fontWeight: 600, fontSize: 14, borderRadius: '8px 0 0 8px' }}>Product</th>
                <th style={{ padding: '16px 12px', background: '#0f172a', color: '#fff', fontWeight: 600, fontSize: 14 }}>Qty</th>
                <th style={{ padding: '16px 12px', background: '#0f172a', color: '#fff', fontWeight: 600, fontSize: 14 }}>Price</th>
                <th style={{ padding: '16px 12px', background: '#0f172a', color: '#fff', fontWeight: 600, fontSize: 14, borderRadius: '0 8px 8px 0', textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? items.map((item: any, i: number) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, background: '#f8fafc' }} />
                    ) : (
                      <div style={{ width: 48, height: 48, background: '#f1f5f9', borderRadius: 8 }} />
                    )}
                    <div>
                      <p style={{ margin: 0, color: '#0f172a', fontWeight: 600, fontSize: 14 }}>{item.name || 'Unknown Product'}</p>
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px', color: '#475569', fontSize: 14 }}>{item.qty || item.quantity || 1}</td>
                  <td style={{ padding: '16px 12px', color: '#475569', fontSize: 14 }}>{money(Number(item.price || 0))}</td>
                  <td style={{ padding: '16px 12px', color: '#0f172a', fontWeight: 600, fontSize: 14, textAlign: 'right' }}>
                    {money(Number(item.price || 0) * Number(item.qty || item.quantity || 1))}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} style={{ padding: '24px 12px', textAlign: 'center', color: '#64748b' }}>No items found in this order.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: 350 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9', color: '#475569', fontSize: 14 }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{money(Number(subtotal))}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9', color: '#ef4444', fontSize: 14 }}>
                <span>Discount</span>
                <span style={{ fontWeight: 600 }}>-{money(Number(discount))}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9', color: '#475569', fontSize: 14 }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{money(Number(shipping))}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9', color: '#475569', fontSize: 14 }}>
              <span>Tax</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{money(Number(tax))}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 0', marginTop: 8, fontSize: 18 }}>
              <span style={{ fontWeight: 800, color: '#0f172a' }}>Grand Total</span>
              <span style={{ fontWeight: 900, color: '#d4af37' }}>{money(Number(total))}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 60, paddingTop: 30, borderTop: '2px solid #f1f5f9', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 600 }}>Thank you for shopping with JayJayStyles!</p>
          <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>If you have any questions about this invoice, please contact support@jayjaystyles.com</p>
        </div>

        </div>
      </div>
    </div>
  );
}
