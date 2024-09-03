import express from "express";
import { User, Community } from "../../models/index.js";

const router = express.Router();

// Route to create a new user
router.post("/", async (req, res) => {
  // The path is relative to the base path in index.js
  const { uid, email, displayName } = req.body;
  try {
    const newUser = await User.create({
      uid,
      email,
      displayName,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Community,
          as: "ownedCommunities", // Fetch communities the user owns
        },
        {
          model: Community,
          as: "memberOf", // Fetch communities the user is a member of
        },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
});

router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await User.findOne({
      where: { uid },
      include: [
        {
          model: Community,
          as: "ownedCommunities", // Fetch communities the user owns
        },
        {
          model: Community,
          as: "memberOf", // Fetch communities the user is a member of
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

router.post("/seed", async (req, res) => {
  try {
    const users = await User.bulkCreate([
      {
        uid: "123",
        email: "test1@mail.com",
        displayName: "test1",
      },
      {
        uid: "456",
        email: "test2@mail.com",
        displayName: "test2",
      },
    ]);
    res.send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

export default router;
