import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getBestSellingProducts,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const productRoutes = express.Router();

// public
productRoutes.get("/", getAllProducts);
productRoutes.get("/search", searchProducts);
productRoutes.get("/best-selling", getBestSellingProducts);
productRoutes.get("/:id", getProduct);
productRoutes.get("/category/:category", getProductsByCategory);
// admin only
productRoutes.post("/", authMiddleware, adminMiddleware, createProduct);
productRoutes.put("/:id", authMiddleware, adminMiddleware, updateProduct);
productRoutes.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default productRoutes;
