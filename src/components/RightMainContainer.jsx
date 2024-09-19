import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../css/RightMainContainer.css";
import MessageInput from "./MessageInput";
import InviteLinkButton from "./InviteLinkButton";

export default function RightMainContainer() {
  const user = useSelector((state) => state.user.user);
  const channel = useSelector((state) => state.channel.channel);
  const [webSocket, setWebSocket] = useState(null); // WebSocket state
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetching posts for channelId", channel.id);
      try {
        const response = await fetch(
          `http://localhost:3001/api/posts/${channel.id}`
        ); // Hardcoded channelId
        if (!response.ok) {
          throw new Error("Failed to fetch posts"); // Error if the response isn't OK
        }
        const data = await response.json();
        console.log("Posts fetched:", data); // Log the fetched data
        setMessages(data);
      } catch (error) {
        console.error("Error fetching posts:", error); // Log any errors
      }
    };

    fetchPosts(); // Call the function to fetch posts
  }, [channel.id]);

  // Initialize WebSocket connection inside useEffect
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      setWebSocket(ws); // Set WebSocket connection to state
    };

    ws.onmessage = (event) => {
      try {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onclose = () => {
      setWebSocket(null);
    };

    return () => {
      if (ws) ws.close();
    };
  }, [messages]);

  const handleSendMessage = (message) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const messageData = {
        communityId: channel.communityId,
        userId: user.uid,
        channelId: channel.id,
        content: message,
      };

      const createPost = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/posts/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(messageData),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to create post");
          }
          const data = await response.json();
          console.log("Post created:", data);
        } catch (error) {
          console.error("Error creating post:", error);
          return;
        }
      };

      createPost(); // Call the function to create a post

      // Send the message via WebSocket
      webSocket.send(JSON.stringify(messageData));
    } else {
      console.error("WebSocket connection is not open");
    }
  };

  return (
    <div className="right-main-container">
      <div className="right-main-container-content">
        {/* Fixed header */}
        <div className="right-main-container-header">
          <h4># {channel.channel_name}</h4>
        </div>

        {/* Scrollable posts area */}
        <div className="right-main-container-posts">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.userId}:</strong> {msg.content}
              </p>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </div>

        {/* Message input */}
        <div className="right-main-container-input">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>

        {/* Invite link button */}
        <div className="right-main-container-invite">
          <InviteLinkButton />
        </div>
      </div>
    </div>
  );
}
