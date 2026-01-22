import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./products.css";

export default function Products() {
  // 1. Inisialisasi state dengan Array Kosong []
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://shoe-store-fullstack-alpha.vercel.app/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then((data) => {
        // 2. Cek apakah data benar-benar Array sebelum disimpan
        if (Array.isArray(data)) {
          setShoes(data);
        } else {
          console.error("Data dari server bukan array:", data);
          setShoes([]); // Jaga-jaga biar gak crash
        }
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="products-page">
      <h2>Koleksi Sepatu</h2>

      {/* 3. Tampilkan pesan jika data masih kosong */}
      {shoes.length === 0 && (
        <p>Loading data... (Pastikan Backend Server nyala)</p>
      )}

      <div className="products-grid">
        {/* 4. Fungsi map ini yang biasanya bikin crash kalau shoes bukan array */}
        {shoes.map((shoe) => (
          <ProductCard
            key={shoe._id}
            name={shoe.name}
            price={shoe.price}
            image={shoe.image}
            onClick={() => navigate(`/products/${shoe._id}`)}
          />
        ))}
      </div>
    </div>
  );
}
