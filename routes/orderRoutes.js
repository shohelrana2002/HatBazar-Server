import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderByOrderId,
  updatePayment,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const orderRoutes = express.Router();

// user
orderRoutes.post("/", createOrder);
orderRoutes.patch("/:orderId/payment", updatePayment);
orderRoutes.get("/my", authMiddleware, getMyOrders);
orderRoutes.get("/:orderId", getOrderByOrderId);
// admin
orderRoutes.get("/", authMiddleware, adminMiddleware, getAllOrders);
orderRoutes.put("/:id", authMiddleware, adminMiddleware, updateOrderStatus);

export default orderRoutes;
