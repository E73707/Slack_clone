import express from "express";
import routes from "./server/routes/index.js";
import cors from "cors";
import sequelize from "./server/config/connection.js";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer, WebSocket } from "ws"; // No need for dynamic import

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // Serve React app for any non-API route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Route for creating posts (moved outside sequelize.sync)
app.post("/api/posts/create", async (req, res) => {
  const { communityId, userId, channelId, content } = req.body;

  try {
    // Logic for saving the post to the database
    const newPost = {
      communityId,
      userId,
      channelId,
      content,
      createdAt: new Date(),
    };

    // Broadcast the new post to all connected WebSocket clients
    broadcastMessage(newPost);

    // Send a response to the client that posted the message
    res.json({ success: true, newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Sync with the database and start the server
sequelize.sync({ force: false }).then(() => {
  const server = app.listen(PORT, () =>
    console.log(`Now listening on port ${PORT}`)
  );

  // WebSocket setup
  const wss = new WebSocketServer({ server });

  // Broadcast function
  const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  };

  // Handle WebSocket connections
  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());
        broadcastMessage(parsedMessage);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
});
