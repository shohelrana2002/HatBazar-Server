import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import socketHandler from "./socket/socket.js";

import authRouter from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const io = new Server(server, {
  cors: corsOptions,
});

// Express Controller থেকে io ব্যবহার করার জন্য
app.set("io", io);

// Socket Start
socketHandler(io);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("HaatBazar is Running Now...");
});

// MongoDB Connect
connectDB();

// Start Server
server.listen(PORT, () => {
  console.log(` Server Running on Port ${PORT}`);
});
