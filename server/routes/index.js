import express from "express";
import userRoutes from "./api/userRoutes.js"; // This will automatically resolve to api/index.js
import communityRoutes from "./api/communityRoutes.js";

const router = express.Router();

router.use("/communities", communityRoutes);
router.use("/users", userRoutes);

export default router;
