import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="global-footer-pro">
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