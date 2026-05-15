import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="grain min-h-screen flex flex-col bg-brand-black text-brand-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/edit/:id" element={<EditProduct />} />
              {/* 404 fallback */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                    <span className="font-display text-[8rem] leading-none text-brand-red/20">
                      404
                    </span>
                    <h2 className="font-display text-4xl tracking-widest text-white mb-4">
                      PAGE NOT FOUND
                    </h2>
                    <p className="text-white/30 font-body mb-8">
                      Looks like this thread unraveled.
                    </p>
                    <a href="/" className="btn-primary">
                      Back to Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
