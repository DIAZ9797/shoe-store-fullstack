import Product from "../models/Product.js";

// 1. AMBIL SEMUA DATA (GET)
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. AMBIL 1 DATA DETAIL (GET)
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Sepatu tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. TAMBAH DATA BARU (POST)
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. HAPUS DATA (DELETE)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Sepatu berhasil dihapus" });
    } else {
      res.status(404).json({ message: "Sepatu tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
