import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleKonsultasi = () => {
    const phoneNumber = '6289615219160';
    const message = 'Halo, saya tertarik untuk konsultasi pembuatan website. Boleh saya tanya-tanya lebih lanjut?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const socialLinks = [
    { icon: <FiInstagram />, url: 'https://instagram.com', label: 'Instagram', color: '#E4405F' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn', color: '#0A66C2' },
    { icon: <FiFacebook />, url: 'https://facebook.com', label: 'Facebook', color: '#1877F2' },
    { icon: <FiTwitter />, url: 'https://twitter.com', label: 'Twitter', color: '#1DA1F2' },
  ];

  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'process' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Testimonials', id: 'testimonials' },
  ];

  const services = [
    'Web Development',
    'E-Commerce Solutions',
    'Company Profile',
    'Landing Page',
    'Website Maintenance',
  ];

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="gradient-orb footer-orb-1"></div>
        <div className="gradient-orb footer-orb-2"></div>
        <div className="footer-grid-pattern"></div>
      </div>
      
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h3 className="newsletter-title">
              <span className="newsletter-icon">📧</span>
              Dapatkan Update Terbaru
            </h3>
            <p className="newsletter-desc">
              Subscribe untuk mendapatkan tips, promo, dan info terbaru tentang web development
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubscribed}
              />
            </div>
            <motion.button
              type="submit"
              className="subscribe-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubscribed}
            >
              {isSubscribed ? (
                <>✓ Subscribed!</>
              ) : (
                <>
                  Subscribe <FiSend />
                </>
              )}
            </motion.button>
          </form>
              </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-col footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">W</div>
              <span className="logo-text">WebAgency</span>
            </div>
            <p className="brand-desc">
              Membangun masa depan digital Anda dengan solusi web yang inovatif, 
              modern, dan hasil yang terukur.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ '--hover-color': social.color }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button onClick={() => scrollToSection(link.id)}>
                    <span className="link-arrow">→</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-title">Layanan</h4>
            <ul className="footer-list">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="service-item">
                    <span className="service-dot"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-list contact-list">
              <li>
                <FiMail className="contact-icon" />
                <a href="mailto:hello@webagency.com">hello@webagency.com</a>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <a href="tel:+6289615219160">+62 896-1521-9160</a>
              </li>
              <li>
                <FiMapPin className="contact-icon" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
            <button className="contact-btn" onClick={handleKonsultasi}>
              Konsultasi Gratis
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {currentYear} <strong>WebAgency</strong>. All rights reserved.</p>
            <p className="made-with">Made with ❤️ in Indonesia</p>
          </div>
          <div className="footer-links-bottom">
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="separator">•</span>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
