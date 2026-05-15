import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, onDelete, isAdmin = false }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const fallbackImg =
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80";

  return (
    <div className="group relative bg-brand-gray border border-white/5 overflow-hidden card-hover animate-fade-in">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-brand-lightgray">
        <img
          src={imgError ? fallbackImg : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="tag bg-brand-black/80 backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Stock indicator */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 right-3">
            <span className="tag bg-brand-red/90 border-brand-red text-white">
              Low Stock
            </span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="font-display text-2xl tracking-widest text-white/60">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Hover overlay — quick add */}
        {!isAdmin && product.stock > 0 && (
          <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/30 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className={`btn-primary text-xs px-4 py-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${added ? "bg-green-600 hover:bg-green-600" : ""
                }`}
            >
              {added ? "✓ Added" : "Quick Add"}
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-body font-semibold text-brand-white text-sm mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-white/40 text-xs font-body mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-brand-red text-lg">
            ${product.price}
          </span>

          {isAdmin ? (
            <div className="flex gap-2">
              <Link
                to={`/edit/${product.id}`}
                className="text-xs font-mono border border-brand-beige/40 text-brand-beige px-3 py-1.5 hover:bg-brand-beige hover:text-brand-black transition-all duration-200"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(product.id)}
                className="text-xs font-mono border border-brand-red/40 text-brand-red px-3 py-1.5 hover:bg-brand-red hover:text-white transition-all duration-200"
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`btn-primary text-xs px-4 py-2 ${added
                ? "bg-green-600 hover:bg-green-600"
                : product.stock === 0
                  ? "opacity-30 cursor-not-allowed"
                  : ""
                }`}
            >
              {added ? "✓ Added" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
