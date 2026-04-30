import express from "express";
const app = express();
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
  res.send("HaatBazar is Running Now ............... ");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`HaatBazar is Running Now: ${PORT}`);
});
