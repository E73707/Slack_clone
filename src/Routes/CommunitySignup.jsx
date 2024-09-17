import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function CommunitySignup() {
  const auth = getAuth();
  const user = auth.currentUser;
  const reduxUser = useSelector((state) => state.user.user);

  const [communityData, setCommunityData] = useState({
    community_name: "",
    community_description: "",
    community_image: "",
  });
  const navigate = useNavigate();

  function handleChoiceRoute() {
    navigate("/community-choice");
  }

  useEffect(() => {
    console.log("Community data updated:", communityData);
  }, [communityData]);

  const handleCommunityData = (event) => {
    setCommunityData({
      ...communityData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user) {
      console.log("Creating community with owner ID:", user.uid); // Debugging line
      createCommunity(communityData, user.uid);
    } else {
      console.error("No user logged in");
    }
  };

  const createCommunity = async (communityData, userId) => {
    try {
      console.log("Creating community:", {
        ...communityData,
        community_owner: user.uid,
      }); // Debugging line
      const response = await fetch(
        `http://localhost:3001/api/communities/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...communityData, community_owner: userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create community");
      }
      const newCommunity = await response.json();
      console.log("New community:", newCommunity);
      navigate("/community-choice");
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  return (
    <div className="community-signup-wrapper">
      <div className="community-signup-content">
        <h1>Create a community</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="community_name">Community name</label>
          <input
            type="text"
            id="community_name"
            onChange={handleCommunityData}
            value={communityData.community_name}
            required
          />

          <label htmlFor="community_description">Community description</label>
          <input
            type="text"
            id="community_description"
            onChange={handleCommunityData}
            value={communityData.community_description}
            required
          />

          <label htmlFor="community_image">Community image</label>
          <input
            type="text"
            id="community_image"
            onChange={handleCommunityData}
            value={communityData.community_image}
          />

          <button type="submit">Create Community</button>
        </form>
      </div>
    </div>
  );
}
