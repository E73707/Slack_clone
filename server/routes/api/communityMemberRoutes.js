import express from "express";

import CommunityMember from "../../models/CommunityMember.js";
import Community from "../../models/Community.js";
import User from "../../models/User.js";

const router = express.Router();

router.get("/members/:communityId", async (req, res) => {
  const { communityId } = req.params;

  if (!communityId) {
    return res.status(400).json({ error: "Invalid community ID" });
  }

  try {
    const members = await CommunityMember.findAll({
      where: { communityId },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Community,
          as: "community",
        },
      ],
    });
    res.json(members);
  } catch (error) {
    console.error("Error getting members: ", error);
    res.status(500).json({ error: "Failed to get members" });
  }
});

export default router;
