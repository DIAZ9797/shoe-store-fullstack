import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

// 1. IMPORT ROUTES (Panggil file rute di sini)
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js"; // <--- INI TAMBAHAN BARU (Bagian Atas)

dotenv.config();

// Koneksi Database (Pakai IP 127.0.0.1 biar aman)
mongoose
  .connect(
    "mongodb+srv://projectSPD:mahasiswa123@cluster0.vgkmcjd.mongodb.net/?appName=Cluster0",
  )
  .then(() => console.log("✅ MongoDB Berhasil Terhubung!"))
  .catch((err) => {
    console.error("❌ Gagal Konek DB:", err);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://shoe-store-fullstack-theta.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());

// 2. PASANG ROUTES (Daftarkan rute di sini)
app.get("/", (req, res) => {
  res.send("API Shoe Store Berjalan Lancar!");
});

// Route Produk (Yang lama)
app.use("/api/products", productRoutes);

// Route Auth (YANG BARU DITAMBAHKAN DI BAWAHNYA)
app.use("/api/auth", authRoutes);

// Error Handling
app.use((req, res) => {
  res.status(404).json({ message: "Halaman tidak ditemukan" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
