import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function InviteLinkButton() {
  const [inviteLink, setInviteLink] = useState("");
  const communityId = useSelector((state) => state.community.community.id);
  const baseUrl =
    import.meta.env.REACT_APP_BASE_URL ||
    "https://slack-clone1-529cef6d905b.herokuapp.com" ||
    "http://localhost:3001";

  const generateInvite = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/invite/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ communityId }),
      });

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
