import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)',
      color: '#e5e7eb',
      padding: '80px 0 40px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Main Content */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 40px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 40,
          marginBottom: 60,
        }}>

          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
                  <rect x="5" y="5" width="12" height="18" rx="2" fill="white" />
                  <rect x="13" y="5" width="12" height="18" rx="2" fill="rgba(255,255,255,0.5)" />
                </svg>
              </div>
              <span style={{
                fontSize: 26,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Bookstore
              </span>
            </div>

            <p style={{
              fontSize: 15,
              color: '#9ca3af',
              lineHeight: 1.7,
              marginBottom: 24,
            }}>
              Discover your next favorite book. From timeless classics to the latest bestsellers,
              we have something for every reader.
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { icon: <FaFacebook size={18} />, href: '#' },
                { icon: <FaTwitter size={18} />, href: '#' },
                { icon: <FaInstagram size={18} />, href: '#' },
                { icon: <FaYoutube size={18} />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.08)',
                  color: '#d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#f97316';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f97316', marginBottom: 24, letterSpacing: '-0.01em' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Bestsellers', 'New Releases', 'Genres', 'Authors', 'Special Deals'].map(link => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(' ', '-')}`} style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: 15,
                    lineHeight: 2,
                    display: 'block',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#f97316';
                      e.currentTarget.style.paddingLeft = '6px';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#d1d5db';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f97316', marginBottom: 24, letterSpacing: '-0.01em' }}>
              Categories
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi & Fantasy', "Children's"].map(cat => (
                <li key={cat}>
                  <Link href={`/${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: 15,
                    lineHeight: 2,
                    display: 'block',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#f97316';
                      e.currentTarget.style.paddingLeft = '6px';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#d1d5db';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f97316', marginBottom: 24, letterSpacing: '-0.01em' }}>
              Stay Updated
            </h3>
            <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.6, marginBottom: 20 }}>
              Get the latest book recommendations and exclusive deals!
            </p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '13px 16px',
                  borderRadius: 10,
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#e5e7eb',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#f97316'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button style={{
                padding: '13px 20px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(249,115,22,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(249,115,22,0.4)';
                }}
              >
                Subscribe
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 14, color: '#d1d5db', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📞</span> +91 (753) 997-6864
              </p>
              <p style={{ fontSize: 14, color: '#d1d5db', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>✉️</span> hello@bookstore.com
              </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 32 }} />

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            © 2026 BookHaven. All rights reserved. | Built with ❤️ for book lovers.
          </p>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Privacy Policy', 'Terms of Service', 'Returns', 'Shipping'].map(item => (
              <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} style={{
                fontSize: 13,
                color: '#9ca3af',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;