import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4";
import { AuthProvider } from "./context/AuthContext";

// Import Halaman
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout"; // <--- 1. TAMBAHKAN IMPORT INI

const TRACKING_ID = "G-09QHK2B8GJ";
ReactGA.initialize(TRACKING_ID);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send({ hitType: "pageview", page: pathname });
  }, [pathname]);
  return null;
};

function App() {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 5%",
      backgroundColor: "#111",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    brand: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#fff",
      textDecoration: "none",
      letterSpacing: "1px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    menuGroup: { display: "flex", alignItems: "center", gap: "25px" },
    link: {
      color: "#ccc",
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "0.95rem",
      transition: "color 0.3s",
      cursor: "pointer",
    },
    cartBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#00d4ff",
      textDecoration: "none",
      fontWeight: "bold",
      border: "1px solid #333",
      padding: "6px 15px",
      borderRadius: "20px",
      backgroundColor: "#222",
    },
    loginBtn: { color: "white", textDecoration: "none", fontWeight: "500" },
    registerBtn: {
      backgroundColor: "#f1c40f",
      color: "#111",
      padding: "8px 20px",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "0.9rem",
      border: "none",
    },
    mainContainer: {
      minHeight: "85vh",
      backgroundColor: "#f4f4f4",
      paddingBottom: "50px",
      fontFamily: "sans-serif",
    },
  };

  const [hover, setHover] = useState(null);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <nav style={styles.navbar}>
          <Link to="/" style={styles.brand}>
            👟 SHOE STORE
          </Link>
          <div style={styles.menuGroup}>
            <Link
              to="/"
              style={
                hover === "home"
                  ? { ...styles.link, color: "white" }
                  : styles.link
              }
              onMouseEnter={() => setHover("home")}
              onMouseLeave={() => setHover(null)}
            >
              HOME
            </Link>
            <Link
              to="/products"
              style={
                hover === "products"
                  ? { ...styles.link, color: "white" }
                  : styles.link
              }
              onMouseEnter={() => setHover("products")}
              onMouseLeave={() => setHover(null)}
            >
              KOLEKSI
            </Link>
            <div
              style={{ width: "1px", height: "24px", backgroundColor: "#444" }}
            ></div>
            <Link to="/cart" style={styles.cartBtn}>
              🛒 Keranjang
            </Link>
            <Link to="/login" style={styles.loginBtn}>
              Masuk
            </Link>
            <Link to="/register" style={styles.registerBtn}>
              Daftar
            </Link>
          </div>
        </nav>

        <div style={styles.mainContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* 2. TAMBAHKAN RUTE INI */}
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
