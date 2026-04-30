import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const productRoutes = express.Router();

// public
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProduct);

// admin only
productRoutes.post("/", authMiddleware, adminMiddleware, createProduct);
productRoutes.put("/:id", authMiddleware, adminMiddleware, updateProduct);
productRoutes.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default productRoutes;
