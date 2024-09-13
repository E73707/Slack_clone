import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill styles

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  // Handle sending the message
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message); // Send message to the parent component
      setMessage(""); // Clear input after sending
    }
  };

  // Quill toolbar options
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  return (
    <div className="message-input-container">
      <ReactQuill
        value={message}
        onChange={setMessage}
        modules={modules}
        placeholder="Type a message here..."
        className="quill-editor"
      />
      <button onClick={handleSend}>Send</button>{" "}
      {/* You can style this button as needed */}
    </div>
  );
}
