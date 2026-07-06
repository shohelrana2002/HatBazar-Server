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

import adminMiddleware from "../middleware/adminMiddleware.js";
import verifyJWT from "../middleware/authMiddleware.js";

const productRoutes = express.Router();

// publics
productRoutes.get("/", getAllProducts);
productRoutes.get("/search", searchProducts);
productRoutes.get("/best-selling", getBestSellingProducts);
productRoutes.get("/:id", getProduct);
productRoutes.get("/category/:category", getProductsByCategory);
// admin only
productRoutes.post("/", verifyJWT, adminMiddleware, createProduct);
productRoutes.put("/:id", verifyJWT, adminMiddleware, updateProduct);
productRoutes.delete("/:id", verifyJWT, adminMiddleware, deleteProduct);

export default productRoutes;
