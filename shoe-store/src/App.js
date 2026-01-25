import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { AuthProvider } from "./context/AuthContext";

// Import halaman
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

const TRACKING_ID = "G-09QHK2B8GJ";
ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar Modern Hitam */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold fs-4" to="/">
              👟 SHOE STORE
            </Link>

            <div className="d-flex gap-4 align-items-center">
              <Link to="/" className="text-white text-decoration-none fw-bold">
                HOME
              </Link>
              <Link to="/products" className="text-white text-decoration-none">
                KOLEKSI
              </Link>
            </div>

            <div className="d-flex gap-3 align-items-center ms-auto">
              <Link
                to="/cart"
                className="text-info text-decoration-none fw-bold"
              >
                🛒 Keranjang
              </Link>
              <span className="text-white-50">|</span>
              <Link to="/login" className="text-white text-decoration-none">
                Masuk
              </Link>
              <Link
                to="/register"
                className="btn btn-warning btn-sm fw-bold text-dark px-3"
              >
                Daftar
              </Link>
            </div>
          </div>
        </nav>

        {/* Konten Utama */}
        <div style={{ minHeight: "85vh", backgroundColor: "#f8f9fa" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
