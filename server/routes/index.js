import express from "express";
import userRoutes from "./api/userRoutes.js"; // This will automatically resolve to api/index.js

const router = express.Router();

router.use("/users", userRoutes);

export default router;
