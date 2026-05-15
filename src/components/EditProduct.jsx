import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { getProductById, updateProduct } from "../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (formData) => {
    setSaving(true);
    try {
      await updateProduct(id, formData);
      navigate("/admin", { state: { toast: "Product updated!" } });
    } catch {
      setError("Failed to update product. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-32 text-center px-4">
        <p className="font-display text-4xl tracking-widest text-white/30 mb-4">
          NOT FOUND
        </p>
        <p className="text-brand-red font-mono text-sm mb-8">{error}</p>
        <button
          onClick={() => navigate("/admin")}
          className="btn-secondary"
        >
          ← Back to Admin
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 md:px-8 max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <button
          onClick={() => navigate("/admin")}
          className="text-xs font-mono text-white/30 hover:text-white transition-colors uppercase tracking-widest mb-4 flex items-center gap-2"
        >
          ← Back to Admin
        </button>
        <span className="tag mb-3 inline-block">Edit Product #{id}</span>
        <h1 className="font-display text-5xl tracking-widest text-brand-white">
          EDIT PRODUCT
        </h1>
      </div>

      {/* Current product preview */}
      <div className="flex gap-4 bg-brand-gray border border-white/5 p-4 mb-8">
        <div className="w-16 h-20 overflow-hidden flex-shrink-0 bg-brand-lightgray">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-1">
            Currently editing
          </p>
          <p className="font-body font-semibold text-brand-white">{product.name}</p>
          <p className="font-mono text-brand-red text-sm">${product.price}</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-brand-gray border border-white/5 p-6">
        <ProductForm
          initialData={product}
          onSubmit={handleUpdate}
          onCancel={() => navigate("/admin")}
          loading={saving}
        />
      </div>
    </div>
  );
};

export default EditProduct;
