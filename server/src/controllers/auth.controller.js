import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Kunci Rahasia untuk Token (Idealnya di .env, tapi kita set default di sini biar aman)
const JWT_SECRET = process.env.JWT_SECRET || "kunci_rahasia_super_aman_123";

// 1. REGISTER (Daftar Akun)
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah email sudah ada?
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Acak Password (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan User Baru
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. LOGIN (Masuk Akun)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ email });

    // Jika user ada DAN password cocok
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // Kirim "tiket" token ke frontend
      });
    } else {
      res.status(401).json({ message: "Email atau Password salah" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi pembantu bikin Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d", // Token berlaku 30 hari
  });
};
