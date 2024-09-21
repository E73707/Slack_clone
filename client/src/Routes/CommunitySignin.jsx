import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function InviteLinkSignin() {
  const [inviteLink, setInviteLink] = useState(""); // State for the invite link input
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const baseUrl =
    process.env.BASE_URL ||
    "https://slack-clone1-529cef6d905b.herokuapp.com" ||
    "http://localhost:3001";

  // Check if the user is authenticated
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setMessage("User not authenticated.");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Extract token from the invite link
  const extractTokenFromLink = (link) => {
    const url = new URL(link);
    const pathParts = url.pathname.split("/");
    return pathParts[pathParts.length - 1]; // The token should be the last part of the URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Ensure the user is authenticated
    if (!userId) {
      setMessage("You must be signed in to join a community.");
      setLoading(false);
      return;
    }

    // Extract the token from the invite link
    const token = extractTokenFromLink(inviteLink);
    if (!token) {
      setMessage("Invalid invite link.");
      setLoading(false);
      return;
    }

    // Send the invite token and userId to the backend
    try {
      const response = await fetch(`${baseUrl}/api/invite/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setLoading(false);

        // Optionally redirect to the community page after success
        setTimeout(() => navigate(`/community/${data.communityId}`), 2000);
      } else {
        setMessage(data.error || "Invalid or expired invite link.");
        setLoading(false);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="community-signin-wrapper">
      <div className="community-signin-content">
        <h1>Join a Community</h1>
        <p>Enter the invite link provided by your community admin to join.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="invite-link">Invite Link</label>
          <input
            type="text"
            id="invite-link"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
            placeholder="Paste the invite link here"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Joining..." : "Join Community"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
