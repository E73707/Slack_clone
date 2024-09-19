import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function InviteLinkButton() {
  const [inviteLink, setInviteLink] = useState("");
  const communityId = useSelector((state) => state.community.community.id);

  const generateInvite = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/invite/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ communityId }),
        }
      );

      const data = await response.json();
      setInviteLink(data.inviteLink); // Store the invite link
      console.log("Invite link generated:", data);
    } catch (error) {
      console.error("Error generating invite link:", error);
    }
  };

  return (
    <div>
      <button onClick={generateInvite}>Generate Invite Link</button>
      {inviteLink && (
        <div>
          <p>
            Invite Link: <a href={inviteLink}>{inviteLink}</a>
          </p>
        </div>
      )}
    </div>
  );
}
