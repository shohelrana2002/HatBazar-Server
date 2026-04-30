import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const orderRoutes = express.Router();

// user
orderRoutes.post("/", authMiddleware, createOrder);
orderRoutes.get("/my", authMiddleware, getMyOrders);

// admin
orderRoutes.get("/", authMiddleware, adminMiddleware, getAllOrders);
orderRoutes.put("/:id", authMiddleware, adminMiddleware, updateOrderStatus);

export default orderRoutes;
