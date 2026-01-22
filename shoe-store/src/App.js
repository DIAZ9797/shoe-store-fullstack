import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Import halaman toko (sesuaikan nama file kalau beda)
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

// Import halaman login & register
import Login from "./pages/Login";
import Register from "./pages/Register";

import React, { useEffect } from "react"; // Pastikan ada { useEffect }
import ReactGA from "react-ga4"; // Tambahkan baris ini
// ... biarkan import lain (seperti BrowserRouter, Navbar) di bawahnya ...

const TRACKING_ID = "G-09QHK2B8GJ";
ReactGA.initialize(TRACKING_ID);

function App() {
  // Lacak kunjungan halaman
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    // ...
    // Provider ditaruh paling luar supaya data user bisa dibaca di semua page
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar sederhana */}
        <nav
          style={{
            padding: "15px 20px",
            background: "#222",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              HOME
            </Link>
            <Link
              to="/products"
              style={{ color: "white", textDecoration: "none" }}
            >
              KOLEKSI SEPATU
            </Link>
          </div>

          {/* Menu login ditaruh di ujung kanan */}
          <div style={{ marginLeft: "auto", display: "flex", gap: "15px" }}>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Masuk
            </Link>
            <Link
              to="/register"
              style={{ color: "#fbbf24", textDecoration: "none" }}
            >
              Daftar
            </Link>
          </div>
        </nav>

        {/* Konten Utama */}
        <div style={{ padding: "20px" }}>
          <Routes>
            {/* Rute Toko */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />

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
