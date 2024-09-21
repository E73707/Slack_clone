import express from "express";
import userRoutes from "./api/userRoutes.js"; // This will automatically resolve to api/index.js
import communityRoutes from "./api/communityRoutes.js";
import channelRoutes from "./api/channelRoutes.js";
import postRoutes from "./api/postRoutes.js";
import inviteRoutes from "./api/invite.js";
import memberRoutes from "./api/communityMemberRoutes.js";

const router = express.Router();

router.use("/communities", communityRoutes);
router.use("/users", userRoutes);
router.use("/channels", channelRoutes);
router.use("/posts", postRoutes);
router.use("/invite", inviteRoutes);
router.use("/members", memberRoutes);

export default router;
