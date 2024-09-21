import express from "express";
import CommunityMember from "../../models/CommunityMember.js";
import User from "../../models/User.js";
import Community from "../../models/Community.js";

const router = express.Router();

// Route to get members of a specific community
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
          as: "User",
        },
        {
          model: Community,
          as: "community",
        },
      ],
    });

    if (!members.length) {
      return res
        .status(404)
        .json({ error: "No members found for this community" });
    }

    res.json(members);
  } catch (error) {
    console.error("Error fetching community members:", error);
    res.status(500).json({ error: "Failed to fetch community members" });
  }
});

export default router;
