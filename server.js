import express from "express";
import routes from "./server/routes/index.js";
import cors from "cors";
import sequelize from "./server/config/connection.js";

// Dynamically import the ws module (WebSocket)
const { WebSocketServer, WebSocket } = await import("ws");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.use("/api", routes);

// Serve static files from the React app
import path from "path";
import { fileURLToPath } from "url";

// These two lines are required to resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If in production, serve the static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // Serve the React app for any routes not starting with /api
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Sync with the database
sequelize.sync({ force: false }).then(async () => {
  // Create HTTP server and wrap WebSocket around it
  const server = app.listen(PORT, () =>
    console.log(`Now listening on port ${PORT}`)
  );

  // Create a WebSocket server
  const wss = new WebSocketServer({ server });

  // Broadcast function to send messages to all connected clients
  const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  };

  // Handle new WebSocket connections
  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      try {
        // Convert buffer to string and parse JSON
        const parsedMessage = JSON.parse(message.toString());
        // Process the received message and send it to all clients
        broadcastMessage(parsedMessage);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  // Assuming you're creating posts via an API call
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
});
