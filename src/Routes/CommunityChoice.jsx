import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommunity } from "../../features/communitySlice";

export default function CommunityChoice() {
  const user = useSelector((state) => state.user.user);
  const [community, setCommunity] = useState(null);
  const dispatch = useDispatch();

  const communities = user.memberOf.concat(user.ownedCommunities);

  console.log("Communities:", communities);

  // Log user whenever it changes to ensure it's available
  useEffect(() => {
    console.log("User in CommunityChoice:", user);
  }, [user]);

  const handleCommunity = (e) => {
    setCommunity(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitting with user:", user);
    dispatch(setCommunity(community));
  };

  return (
    <div>
      <h1>Community Choice</h1>
      <div className="community-list">
        {communities.map((community) => {
          return (
            <div key={community._id}>
              <div>
                <p>{community.community_name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
