import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <div className="w-24 h-24 border border-white/10 flex items-center justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="font-display text-4xl tracking-widest text-white/30 mb-4">
          YOUR BAG IS EMPTY
        </h2>
        <p className="text-white/30 text-sm font-body mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link to="/products" className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 border-b border-white/5 pb-6">
          <div>
            <span className="tag mb-2 inline-block">Shopping Bag</span>
            <h1 className="font-display text-5xl tracking-widest text-brand-white">
              YOUR CART
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-mono text-white/30 hover:text-brand-red transition-colors duration-200 uppercase tracking-widest"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-brand-gray border border-white/5 p-4 animate-slide-up"
              >
                {/* Image */}
                <div className="w-24 h-28 flex-shrink-0 overflow-hidden bg-brand-lightgray">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                    (e.src =
                      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80")
                    }
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="tag text-xs mb-1 inline-block">
                      {item.category}
                    </span>
                    <h3 className="font-body font-semibold text-brand-white text-sm">
                      {item.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors font-mono text-lg"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-mono text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors font-mono text-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-brand-red">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/20 hover:text-brand-red transition-colors duration-200"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-gray border border-white/5 p-6 sticky top-28">
              <h3 className="font-display text-2xl tracking-widest text-brand-white mb-6">
                ORDER SUMMARY
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-body text-white/50">
                  <span>Subtotal</span>
                  <span className="font-mono">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-white/50">
                  <span>Shipping</span>
                  <span className="font-mono text-green-400">Free</span>
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between font-body font-bold text-brand-white">
                  <span>Total</span>
                  <span className="font-mono text-brand-red text-xl">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="btn-primary w-full mb-3">
                Checkout
              </button>
              <Link
                to="/products"
                className="btn-secondary w-full text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
