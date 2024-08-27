import React from "react";

export default function RightMainContainer() {
  async function getAllUsers() {
    try {
      const response = await fetch("http://localhost:3001/api/users");
      if (!response.ok) {
        throw new Error("Failed to get users");
      }
      const data = await response.json();
      console.log("Users:", data);
    } catch (error) {
      console.error("Error getting users:", error);
    }
  }

  return (
    <div className="right-main-container">
      <div>
        <h1>This is the RightMainContainer component</h1>
      </div>
      <div className="right-main-container-content">
        <h2>Content goes here</h2>
      </div>
      <div>
        <button onClick={getAllUsers}>Get all users</button>
      </div>
    </div>
  );
}
