import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

const CATEGORIES = [
  { name: "Hoodies", emoji: "🧥", desc: "Oversized & cozy" },
  { name: "T-Shirts", emoji: "👕", desc: "Graphic street tees" },
  { name: "Sneakers", emoji: "👟", desc: "Streetwear kicks" },
  { name: "Jackets", emoji: "🧣", desc: "Bombers & beyond" },
  { name: "Accessories", emoji: "💍", desc: "Caps, chains, bags" },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setFeatured(data.filter((p) => p.featured).slice(0, 4)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-gray to-brand-black" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 80px, #E63946 80px, #E63946 81px),
                              repeating-linear-gradient(90deg, transparent, transparent 80px, #E63946 80px, #E63946 81px)`,
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80"
            alt="Hero fashion"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-20">
          <div className="max-w-2xl animate-slide-up">
            <span className="tag mb-6 inline-block">New Collection 2025</span>
            <h1 className="font-display text-[clamp(4rem,12vw,9rem)] leading-none tracking-wider text-brand-white mb-6">
              DRESS THE
              <br />
              <span className="text-brand-red">STREETS</span>
            </h1>
            <p className="font-body text-white/50 text-lg mb-10 max-w-md leading-relaxed">
              Premium streetwear for those who live outside the lines. Raw cuts,
              bold prints, zero compromise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary text-base px-8 py-4">
                Shop Now
              </Link>
              <Link
                to="/products?category=Hoodies"
                className="btn-secondary text-base px-8 py-4"
              >
                View Lookbook
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
          <span className="text-white/20 text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="section-title">SHOP BY CATEGORY</h2>
          <Link
            to="/products"
            className="text-xs font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest"
          >
            All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group bg-brand-gray border border-white/5 p-6 flex flex-col gap-3 hover:border-brand-red/40 hover:bg-brand-lightgray transition-all duration-300"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <div>
                <p className="font-display text-xl tracking-wider text-brand-white group-hover:text-brand-red transition-colors duration-200">
                  {cat.name}
                </p>
                <p className="text-white/30 text-xs font-body">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="tag mb-3 inline-block">Handpicked</span>
            <h2 className="section-title">FEATURED DROPS</h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-brand-gray animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Banner ── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-brand-red relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative z-10 px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-5xl md:text-7xl tracking-widest text-white mb-2">
                FREE SHIPPING
              </h3>
              <p className="text-white/70 font-body text-lg">
                On all orders. No minimum. Always.
              </p>
            </div>
            <Link
              to="/products"
              className="bg-white text-brand-red font-body font-bold px-8 py-4 text-sm tracking-widest uppercase hover:bg-brand-black hover:text-white transition-all duration-200 flex-shrink-0"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
