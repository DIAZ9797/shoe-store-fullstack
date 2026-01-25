import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null); // Untuk efek hover mouse

  useEffect(() => {
    fetch("https://backend-toko-sepatu.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  // --- STYLES (JS Only) ---
  const styles = {
    container: {
      fontFamily: "sans-serif",
      backgroundColor: "#f4f4f4",
      minHeight: "100vh",
      paddingBottom: "50px",
    },
    // 1. HERO BANNER (Supaya tidak sepi di atas)
    hero: {
      backgroundColor: "#111",
      color: "white",
      padding: "60px 20px",
      textAlign: "center",
      marginBottom: "40px",
      backgroundImage: "linear-gradient(45deg, #111 0%, #333 100%)", // Gradasi elegan
    },
    heroTitle: {
      fontSize: "3rem",
      fontWeight: "bold",
      margin: "0 0 10px 0",
      letterSpacing: "2px",
    },
    heroSubtitle: {
      color: "#ccc",
      fontSize: "1.2rem",
      maxWidth: "600px",
      margin: "0 auto",
    },

    // 2. SEARCH BAR
    searchContainer: {
      maxWidth: "1200px",
      margin: "0 auto 30px auto",
      padding: "0 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    },
    searchInput: {
      padding: "12px 20px",
      borderRadius: "30px",
      border: "1px solid #ddd",
      width: "100%",
      maxWidth: "400px",
      fontSize: "1rem",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      outline: "none",
    },
    resultCount: {
      color: "#666",
      fontWeight: "bold",
    },

    // 3. GRID PRODUK
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", // Responsif otomatis
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
    },

    // 4. KARTU PRODUK
    card: (isHovered) => ({
      backgroundColor: "white",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: isHovered
        ? "0 10px 25px rgba(0,0,0,0.15)"
        : "0 4px 10px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      transform: isHovered ? "translateY(-5px)" : "translateY(0)", // Efek naik saat hover
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }),
    badge: {
      position: "absolute",
      top: "15px",
      left: "15px",
      backgroundColor: "#f1c40f",
      color: "#111",
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      zIndex: 2,
    },
    imgContainer: {
      height: "250px",
      width: "100%",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    img: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.1))",
    },
    info: {
      padding: "20px",
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "5px",
      color: "#333",
      textDecoration: "none",
    },
    price: {
      fontSize: "1.1rem",
      color: "#e74c3c", // Merah harga
      fontWeight: "bold",
      marginTop: "auto", // Dorong harga ke bawah
      paddingTop: "15px",
    },
    btnDetail: (isHovered) => ({
      marginTop: "15px",
      display: "block",
      textAlign: "center",
      backgroundColor: isHovered ? "#111" : "transparent",
      color: isHovered ? "white" : "#111",
      border: "2px solid #111",
      padding: "10px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "all 0.3s",
    }),
  };

  return (
    <div style={styles.container}>
      {/* SECTION 1: HERO BANNER */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>KOLEKSI EKSKLUSIF</h1>
        <p style={styles.heroSubtitle}>
          Temukan sepatu impian Anda dengan kualitas terbaik dan desain terbaru
          tahun ini.
        </p>
      </div>

      {/* SECTION 2: SEARCH & FILTER */}
      <div style={styles.searchContainer}>
        <span style={styles.resultCount}>
          Menampilkan {filteredProducts.length} Produk
        </span>
        <input
          type="text"
          placeholder="🔍 Cari nama sepatu..."
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* SECTION 3: PRODUCT GRID */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h3>Sedang mengambil sepatu terbaik...</h3>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <div
                key={item._id}
                style={styles.card(hoverIndex === index)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* Badge NEW (Hiasan) */}
                <span style={styles.badge}>NEW ARRIVAL</span>

                {/* Gambar */}
                <div style={styles.imgContainer}>
                  <img src={item.image} alt={item.name} style={styles.img} />
                </div>

                {/* Info */}
                <div style={styles.info}>
                  <Link to={`/products/${item._id}`} style={styles.name}>
                    {item.name}
                  </Link>
                  <div style={{ color: "#888", fontSize: "0.9rem" }}>
                    Running Series
                  </div>
                  <div style={styles.price}>
                    Rp {item.price.toLocaleString()}
                  </div>

                  {/* Tombol Lihat Detail */}
                  <Link
                    to={`/products/${item._id}`}
                    style={styles.btnDetail(hoverIndex === index)}
                  >
                    LIHAT DETAIL →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "40px",
              }}
            >
              <h3>Barang tidak ditemukan :(</h3>
              <p>Coba kata kunci lain.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
