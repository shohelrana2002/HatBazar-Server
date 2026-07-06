import express from "express";
import { createJWT, logout } from "../controllers/authController.js";
const authRouter = express.Router();
authRouter.post("/jwt", createJWT);

authRouter.post("/logout", logout);

export default authRouter;
