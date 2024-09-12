import express from "express";
import routes from "./server/routes/index.js";
import cors from "cors";
import sequelize from "./server/config/connection.js";
import User from "./server/models/User.js";
import Community from "./server/models/Community.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.use("/api", routes);

async function seedDatabase() {
  try {
    await User.bulkCreate([
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
    await Community.bulkCreate([
      {
        community_name: "Community 1",
        community_description: "A cool community",
        community_owner: "123", // Valid UID from User table
      },
      {
        community_name: "Community 2",
        community_description: "Another cool community",
        community_owner: "456", // Valid UID from User table
      },
    ]);
    console.log("DATABSE SEEDED SUCCESSFULLY");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

sequelize.sync({ force: true }).then(async () => {
  // await seedDatabase();
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
