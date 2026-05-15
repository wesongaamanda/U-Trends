import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { getProducts, createProduct, deleteProduct } from "../services/api";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products. Is json-server running?"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (formData) => {
    setFormLoading(true);
    try {
      const newProduct = await createProduct(formData);
      setProducts((prev) => [...prev, newProduct]);
      setShowForm(false);
      showToast("Product added successfully!");
    } catch {
      showToast("Failed to add product.", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted.");
    } catch {
      showToast("Failed to delete product.", "error");
    }
  };

  // Stats
  const totalProducts = products.length;
  const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0);
  const categories = [...new Set(products.map((p) => p.category))].length;
  const featuredCount = products.filter((p) => p.featured).length;

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-24 right-6 z-50 px-6 py-4 font-mono text-sm animate-slide-down border ${
            toast.type === "error"
              ? "bg-brand-red/10 border-brand-red text-brand-red"
              : "bg-green-900/20 border-green-500/50 text-green-400"
          }`}
        >
          {toast.type === "error" ? "✗" : "✓"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="tag mb-3 inline-block">Admin Panel</span>
          <h1 className="font-display text-6xl tracking-widest text-brand-white">
            DASHBOARD
          </h1>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="btn-primary flex items-center gap-2"
        >
          <span>{showForm ? "✕ Cancel" : "+ Add Product"}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Products", value: totalProducts },
          { label: "Total Stock", value: totalStock },
          { label: "Categories", value: categories },
          { label: "Featured", value: featuredCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-brand-gray border border-white/5 p-6"
          >
            <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">
              {stat.label}
            </p>
            <p className="font-display text-4xl text-brand-red">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-brand-gray border border-white/5 p-6 mb-10 animate-slide-down">
          <h2 className="font-display text-2xl tracking-widest text-brand-white mb-6">
            ADD NEW PRODUCT
          </h2>
          <ProductForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            loading={formLoading}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-brand-red/10 border border-brand-red/30 p-4 mb-8 font-mono text-sm text-brand-red">
          ⚠ {error}
        </div>
      )}

      {/* Product Grid */}
      <div className="border-t border-white/5 pt-8">
        <h2 className="font-display text-2xl tracking-widest text-brand-white mb-6">
          ALL PRODUCTS ({totalProducts})
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-brand-gray animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-white/30 font-body text-center py-20">
            No products yet. Add your first one above.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isAdmin
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
