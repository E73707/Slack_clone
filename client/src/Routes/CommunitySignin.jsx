import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function InviteSignin() {
  const { token } = useParams(); // Get the token from the invite link URL
  const navigate = useNavigate();
  const auth = getAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const baseUrl =
    process.env.BASE_URL ||
    "https://slack-clone1-529cef6d905b.herokuapp.com" ||
    "http://localhost:3001";

  // Check for Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setMessage("User not authenticated.");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, [auth]);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid invite link.");
      setLoading(false);
      return;
    }

    if (!userId) {
      setMessage("User not authenticated.");
      setLoading(false);
      return;
    }

    // Send the invite token and userId to the backend
    const joinCommunity = async () => {
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

    joinCommunity();
  }, [token, userId, navigate]);

  return <div>{loading ? <p>Processing invite...</p> : <p>{message}</p>}</div>;
}
