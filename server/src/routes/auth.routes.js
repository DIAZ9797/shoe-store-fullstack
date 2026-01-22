import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();

// URL: /api/auth/register
router.post("/register", registerUser);

// URL: /api/auth/login
router.post("/login", loginUser);

export default router;
