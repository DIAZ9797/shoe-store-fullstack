import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// URL: /api/products
router.route("/").get(listProducts).post(createProduct);

// URL: /api/products/:id (dengan ID spesifik)
router.route("/:id").get(getProduct).delete(deleteProduct);

export default router;
