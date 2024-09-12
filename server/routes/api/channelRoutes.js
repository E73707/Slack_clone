import express from "express";

import Channel from "../../models/CommunityChannel.js";
import ChannelMember from "../../models/ChannelMember.js";
const router = express.Router();

router.post("/create", async (req, res) => {
  const { channel_name, userId, isAdmin, communityId, communityChannelId } =
    req.body;

  console.log(userId, communityId, channel_name);

  if (!userId || !communityId || !channel_name) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const newChannel = await Channel.create({
      channel_name: channel_name,
      communityId: communityId,
    });

    const existingMember = await ChannelMember.findOne({
      where: { userId: userId, channelId: newChannel.id },
    });

    if (existingMember) {
      return res.status(400).json({ error: "User is already a member" });
    }

    await ChannelMember.create({
      userId: userId,
      isAdmin,
      channelId: newChannel.id,
      UserUid: userId,
      communityChannelId: newChannel.id,
    });

    res.json({ success: true, data: newChannel });
  } catch (error) {
    console.error("Error creating channel: ", error);
    res.status(500).json({ error: "Failed to create channel" });
  }
});

export default router;
