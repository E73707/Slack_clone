import express from "express";
import crypto from "crypto";
import InviteToken from "../../models/InviteToken.js";
import Community from "../../models/Community.js";
import { useSelector } from "react-redux";
import CommunityMember from "../../models/CommunityMember.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { communityId, userId } = req.body;

  try {
    // Find the community
    const community = await Community.findByPk(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Generate a random invite token
    const inviteToken = crypto.randomBytes(16).toString("hex");

    // Optional: Set an expiration date (e.g., 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save the invite token to the InviteToken model
    const newInvite = await InviteToken.create({
      token: inviteToken,
      communityId: communityId,
      expiresAt: expiresAt, // Optional expiration date
    });

    // Construct the invite link
    const inviteLink = `${process.env.BASE_URL}/invite/${inviteToken}`;

    res.json({ inviteLink });
  } catch (error) {
    console.error("Error generating invite:", error);
    res.status(500).json({ error: "Failed to generate invite" });
  }
});

router.post("/join", async (req, res) => {
  const { token, userId } = req.body;

  try {
    // Find the invite by token
    const invite = await InviteToken.findOne({
      where: { token },
    });

    if (!invite) {
      return res.status(404).json({ error: "Invalid invite link" });
    }

    const { communityId } = invite;

    // Check if the user is already a member of the community
    const existingMember = await CommunityMember.findOne({
      where: { communityId, userId },
    });

    if (existingMember) {
      return res
        .status(400)
        .json({ error: "User is already a member of the community" });
    }

    // Add the user to the community
    await CommunityMember.create({
      communityId,
      userId,
      role: "member",
      UserUid: userId,
    });

    // Mark the invite token as used
    invite.isUsed = true;
    await invite.save();

    res.json({ success: true, message: "Successfully joined the community" });
  } catch (error) {
    console.error("Error joining community: ", error);
    res.status(500).json({ error: "Failed to join community" });
  }
});

export default router;
