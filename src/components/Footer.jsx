import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-gray border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center">
                <span className="font-display text-white text-sm">UT</span>
              </div>
              <span className="font-display text-2xl tracking-[0.2em] text-brand-white">
                URBANTHREADZ
              </span>
            </div>
            <p className="text-white/40 text-sm font-body leading-relaxed max-w-xs">
              Street-first fashion for those who move different. Quality cuts,
              raw aesthetics, urban soul.
            </p>
            <div className="flex gap-4 mt-6">
              {["IG", "TW", "TK", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-xs font-mono text-white/40 hover:border-brand-red hover:text-brand-red transition-all duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-brand-white mb-4">
              SHOP
            </h4>
            <ul className="space-y-2">
              {["Hoodies", "T-Shirts", "Jackets", "Sneakers", "Accessories"].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${cat}`}
                    className="text-white/40 text-sm font-body hover:text-white transition-colors duration-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-brand-white mb-4">
              CONTACT
            </h4>
            <ul className="space-y-2 text-white/40 text-sm font-body">
              <li>hello@urbanthreadz.com</li>
              <li>+254 700 000 000</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-mono tracking-widest">
            © {year} URBANTHREADZ. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Shipping"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/20 text-xs font-mono hover:text-white/60 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
