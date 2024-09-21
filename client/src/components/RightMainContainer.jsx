import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/RightMainContainer.css";
import MessageInput from "./MessageInput";
import InviteLinkButton from "./InviteLinkButton";
import { setChannel } from "../../../features/channelSlice";

export default function RightMainContainer() {
  const user = useSelector((state) => state.user.user);
  const channel = useSelector((state) => state.channel.channel);
  const [webSocket, setWebSocket] = useState(null); // WebSocket state
  const [messages, setMessages] = useState([]);
  const community = useSelector((state) => state.community.community);
  const baseUrl =
    import.meta.env.REACT_APP_BASE_URL ||
    "https://slack-clone1-529cef6d905b.herokuapp.com" ||
    "http://localhost:3001";

  useEffect(() => {
    const fetchPosts = async () => {
      if (!channel || !channel.id) {
        console.error("Invalid channel ID");
        if (!community.channel[0]) {
          return;
        }
        if (community.channel[0]) {
          useDispatch(setChannel(community.channel[0]));
        }
      }

      console.log("fetching posts for channelId", channel.id);

      try {
        const response = await fetch(
          `${baseUrl}/api/posts/${channel.id}` // Use environment variable
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        console.log("Posts fetched:", data);
        setMessages(data); // Set fetched messages
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (channel && channel.id) {
      fetchPosts();
    }
  }, [channel]);

  // Initialize WebSocket connection inside useEffect
  useEffect(() => {
    if (!channel || !channel.id) return; // Check if channel is available

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
  }, [channel]); // WebSocket should depend on `channel`

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
          const response = await fetch(`${baseUrl}/api/posts/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData),
          });
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

  // Render only when `channel` exists
  if (!channel) {
    return <p>Loading channel...</p>;
  }

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
