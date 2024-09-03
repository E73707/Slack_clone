import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommunity } from "../../features/communitySlice";

export default function CommunityChoice() {
  const user = useSelector((state) => state.user.user);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const dispatch = useDispatch();

  // Combine both owned and member communities
  const communities = user ? user.memberOf.concat(user.ownedCommunities) : [];

  // Log user and communities whenever they change to ensure they are available
  useEffect(() => {
    console.log("User in CommunityChoice:", user);
    console.log("Communities:", communities);
  }, [user]);

  const handleCommunityClick = (community) => {
    console.log("Selected community:", community);
    setSelectedCommunity(community);
  };

  const handleSubmit = () => {
    if (selectedCommunity) {
      console.log("Submitting with selected community:", selectedCommunity);
      dispatch(setCommunity(selectedCommunity));
    } else {
      console.log("No community selected");
    }
  };

  return (
    <div>
      <h1>Community Choice</h1>
      <div className="community-list">
        {communities.map((community) => (
          <div
            key={community._id}
            onClick={() => handleCommunityClick(community)}
            style={{
              padding: "10px",
              margin: "5px",
              border:
                selectedCommunity && selectedCommunity._id === community._id
                  ? "2px solid blue"
                  : "1px solid gray",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <p>{community.community_name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={!selectedCommunity}>
        Submit
      </button>
    </div>
  );
}
