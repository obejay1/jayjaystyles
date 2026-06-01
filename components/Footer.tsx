import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="global-footer-pro">
      <style>{`
        .global-footer-pro {
          background: #111827;
          color: white;
          padding: 60px 20px 20px;
          margin-top: 60px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .global-footer-grid {
          max-width: 1200px;
          margin: 0 auto 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }
        .global-footer-brand h3 { font-size: 1.5rem; font-weight: 800; margin: 0 0 16px 0; color: white; }
        .global-footer-brand p { color: #9ca3af; line-height: 1.6; margin: 0; }
        .global-footer-links h4 { font-size: 1.125rem; margin: 0 0 20px 0; color: white; }
        .global-footer-links ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .global-footer-links a { color: #9ca3af; text-decoration: none; transition: color 0.2s; }
        .global-footer-links a:hover { color: #d4a574; }
        .global-footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 20px;
          border-top: 1px solid #1f2937;
          text-align: center;
          color: #9ca3af;
          font-size: 0.875rem;
        }
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #9ca3af;
          margin-bottom: 16px;
        }
        .contact-item a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1.6;
        }
        .contact-item a:hover {
          color: #d4a574;
        }
        .contact-icon {
          color: #d4a574;
          margin-top: 2px;
        }
      `}</style>
      <div className="global-footer-grid">
        <div className="global-footer-brand">
          <h3>✨ JayJayStyles</h3>
          <p>Your premium destination for professional beauty services and luxury products.</p>
        </div>
        
        <div className="global-footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/account">Account</Link></li>
          </ul>
        </div>

        <div className="global-footer-links">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <Mail size={20} className="contact-icon" />
            <div>
              <span style={{display: 'block', color: 'white', marginBottom: '4px', fontSize: '0.875rem'}}>Email:</span>
              <a href="mailto:mercyjayjay89@gmail.com" style={{display: 'block'}}>mercyjayjay89@gmail.com</a>
              <a href="mailto:Josephgloria1121@icloud.com" style={{display: 'block', marginTop: '4px'}}>Josephgloria1121@icloud.com</a>
            </div>
          </div>
          <div className="contact-item">
            <Phone size={20} className="contact-icon" />
            <div>
              <span style={{display: 'block', color: 'white', marginBottom: '4px', fontSize: '0.875rem'}}>Phone:</span>
              <a href="tel:+2349022483595" style={{display: 'block'}}>+234 902 248 3595</a>
              <a href="tel:+2349155997846" style={{display: 'block', marginTop: '4px'}}>+234 915 599 7846</a>
            </div>
          </div>
        </div>
      </div>
      <div className="global-footer-bottom">
        <p>Copyright © JayJayStyles</p>
      </div>
    </footer>
  );
}