import express from "express";
import { getUser, userCreate } from "../controllers/userController.js";
const userRoutes = express.Router();
userRoutes.get("/:email", getUser);
userRoutes.post("/save", userCreate);

export default userRoutes;
