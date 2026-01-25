import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { AuthProvider } from "./context/AuthContext";

// Import halaman toko
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart"; // Pastikan file ini ada

// Import halaman login & register
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

// KODE GOOGLE ANALYTICS ANDA
const TRACKING_ID = "G-09QHK2B8GJ";
ReactGA.initialize(TRACKING_ID);

function App() {
  // Lacak kunjungan halaman otomatis
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar Inline */}
        <nav
          style={{
            padding: "15px 20px",
            background: "#222",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Biar rapi kanan-kiri
          }}
        >
          {/* Menu Kiri */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              HOME
            </Link>
            <Link
              to="/products"
              style={{
                color: "white",
                textDecoration: "none",
                marginTop: "5px",
              }}
            >
              KOLEKSI SEPATU
            </Link>
          </div>

          {/* Menu Kanan (Keranjang & Login) */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {/* TOMBOL KERANJANG (BARU) */}
            <Link
              to="/cart"
              style={{
                color: "#00d4ff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              🛒 Keranjang
            </Link>

            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Masuk
            </Link>
            <Link
              to="/register"
              style={{
                color: "#222",
                background: "#fbbf24",
                padding: "5px 10px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Daftar
            </Link>
          </div>
        </nav>

        {/* Konten Utama */}
        <div style={{ padding: "20px", minHeight: "80vh" }}>
          <Routes>
            {/* Rute Toko */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Rute Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
