import React, { useState, useEffect } from "react";

const CATEGORIES = ["Hoodies", "T-Shirts", "Jackets", "Sneakers", "Accessories", "Pants"];

const defaultForm = {
  name: "",
  price: "",
  category: "Hoodies",
  description: "",
  image: "",
  stock: "",
  featured: false,
};

const ProductForm = ({ initialData = null, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        price: initialData.price || "",
        category: initialData.category || "Hoodies",
        description: initialData.description || "",
        image: initialData.image || "",
        stock: initialData.stock || "",
        featured: initialData.featured || false,
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Product name is required.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0)
      newErrors.stock = "Enter a valid stock count.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up" noValidate>
      {/* Product Name */}
      <div>
        <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-1.5">
          Product Name *
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Urban Oversized Hoodie"
          className="input-style"
        />
        {errors.name && (
          <p className="text-brand-red text-xs font-mono mt-1">{errors.name}</p>
        )}
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-1.5">
            Price ($) *
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="input-style"
          />
          {errors.price && (
            <p className="text-brand-red text-xs font-mono mt-1">{errors.price}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-1.5">
            Stock *
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
            className="input-style"
          />
          {errors.stock && (
            <p className="text-brand-red text-xs font-mono mt-1">{errors.stock}</p>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-1.5">
          Category
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="input-style"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-brand-gray">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-1.5">
          Description *
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Describe the product..."
          className="input-style resize-none"
        />
        {errors.description && (
          <p className="text-brand-red text-xs font-mono mt-1">{errors.description}</p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-xs font-mono text-white/50 uppercase tracking-widest mb-1.5">
          Image URL
        </label>
        <input
          type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://..."
          className="input-style"
        />
        {form.image && (
          <div className="mt-2 w-20 h-20 overflow-hidden border border-white/10">
            <img
              src={form.image}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          checked={form.featured}
          onChange={handleChange}
          className="w-4 h-4 accent-brand-red"
        />
        <label
          htmlFor="featured"
          className="text-xs font-mono text-white/50 uppercase tracking-widest cursor-pointer"
        >
          Feature on Homepage
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : initialData ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary px-6"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
