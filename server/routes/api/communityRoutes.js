import express from "express";

import Community from "../../models/Community.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { community_name, community_description, community_image, ownerId } =
    req.body;
  try {
    const newCommunity = await Community.create({
      community_name,
      community_description,
      community_image,
      community_owner: ownerId,
      community_members: [ownerId],
    });

    res.status(201).json(newCommunity);
  } catch (error) {
    console.error("Error creating community: ", error);
    res.status(500).json({ error: "Failed to create community" });
  }
});

export default router;
