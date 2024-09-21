import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommunity } from "../../../features/communitySlice";

export default function CommunityChoice() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const baseUrl =
    import.meta.env.REACT_APP_BASE_URL ||
    "https://slack-clone1-529cef6d905b.herokuapp.com" ||
    "http://localhost:3001";

  const communities = user.memberOf.concat(user.ownedCommunities);

  // Log user whenever it changes to ensure it's available
  useEffect(() => {
    console.log("User in CommunityChoice:", user);
  }, [user]);

  const handleCommunityClick = async (communityId) => {
    console.log("Selected community:", communityId);
    try {
      const response = await fetch(`${baseUrl}/api/communities/${communityId}`);
      if (!response.ok) {
        throw new Error("Failed to get community");
      }
      const data = await response.json();
      dispatch(setCommunity(data));
      console.log("Current community:", data);
    } catch (error) {
      console.error("Error getting community:", error);
    }
  };

  return (
    <div>
      <h1>Community Choice</h1>
      <div className="community-list">
        {communities.map((community) => (
          <div
            key={community.id}
            onClick={() => handleCommunityClick(community.id)}
            style={{ cursor: "pointer" }}
          >
            <p>{community.community_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
