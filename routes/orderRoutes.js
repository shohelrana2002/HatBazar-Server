import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderByOrderId,
  updatePaymentStatus,
  updatePayment,
} from "../controllers/orderController.js";
import verifyJWT from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const orderRoutes = express.Router();

// user
orderRoutes.post("/", createOrder);
orderRoutes.patch("/:orderId/payment", updatePayment);
orderRoutes.get("/my", verifyJWT, getMyOrders);
orderRoutes.get("/:orderId", getOrderByOrderId);

// admin
orderRoutes.get("/", getAllOrders);
orderRoutes.put("/:id", verifyJWT, adminMiddleware, updatePaymentStatus);

export default orderRoutes;
