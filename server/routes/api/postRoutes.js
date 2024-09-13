import express from "express";

import Post from "../../models/CommunityPost.js";
import Community from "../../models/Community.js";
import CommunityChannel from "../../models/CommunityChannel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { communityId, userId, channelId, content, link, image, video } =
    req.body;

  if (!communityId || !userId || !channelId || !content) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const newPost = await Post.create({
      communityId,
      userId,
      channelId,
      content,
      link,
      image,
      video,
    });
    res.status(201).json(newPost);
    console.log("Post created", newPost);
  } catch (error) {
    console.error("Error creating post: ", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.get("/:channelId", async (req, res) => {
  const { channelId } = req.params;

  console.log("Fetching posts for channel ID:", channelId); // Log the channel ID

  if (!channelId) {
    return res.status(400).json({ error: "Invalid channel ID" });
  }

  try {
    const posts = await Post.findAll({
      where: { channelId },
      order: [["createdAt", "ASC"]],
    });

    if (posts.length === 0) {
      console.log(`No posts found for channelId: ${channelId}`);
    } else {
      console.log(`Posts found for channelId: ${channelId}`, posts);
    }

    res.json(posts);
  } catch (error) {
    console.error("Error getting posts: ", error);
    res.status(500).json({ error: "Failed to get posts" });
  }
});

export default router;
