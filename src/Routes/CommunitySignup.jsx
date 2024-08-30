import { useState } from "react";
import { useSelector } from "react-redux";

export default function CommunitySignup() {
  const user = useSelector((state) => state.user.user);

  const handleUser = () => {
    console.log("User:", user);
  };

  const createCommunity = async (communityData, userId) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/communities/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...communityData, ownerId: userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create community");
      }
      const newCommunity = await response.json();
      console.log("New community:", newCommunity);
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  return (
    <div className="community-signup-wrapper">
      <div className="community-signup-content">
        <h1>Create a community</h1>

        <form>
          <label htmlFor="community-code">Community Code</label>
          <input type="text" id="community-code" />
          <button onClick={handleUser}>Join Community</button>
        </form>
      </div>
    </div>
  );
}
