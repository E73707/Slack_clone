import express from "express";

import Community from "../../models/Community.js";
import CommunityChannel from "../../models/CommunityChannel.js";
const router = express.Router();

router.post("/create", async (req, res) => {
  const {
    community_name,
    community_description,
    community_image,
    community_owner,
  } = req.body;

  console.log("recieved data", req.body);

  try {
    const newCommunity = await Community.create({
      community_name,
      community_description,
      community_image,
      community_owner,
    });

    res.status(201).json(newCommunity);
  } catch (error) {
    console.error("Error creating community: ", error);
    res.status(500).json({ error: "Failed to create community" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ error: "Invalid community ID" });
  }

  try {
    const community = await Community.findOne({
      where: { id },
      include: [
        {
          model: CommunityChannel,
          as: "channels",
        },
      ],
    });

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    res.json(community);
  } catch (error) {
    console.error("Error getting community: ", error);
    res.status(500).json({ error: "Failed to get community" });
  }
});

router.get("/", async (req, res) => {
  try {
    const communities = await Community.findAll();
    res.status(200).json(communities);
  } catch (error) {
    console.error("Error getting communities: ", error);
    res.status(500).json({ error: "Failed to get communities" });
  }
});

export default router;
