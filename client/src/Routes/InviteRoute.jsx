import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function InviteRoute() {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setMessage(`User authenticated: ${user.uid}`);
      } else {
        setMessage("User not authenticated.");
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
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

    // Send the token to the backend for validation
    const joinCommunity = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/invite/join`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, userId }), // Send userId from state
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          setLoading(false);

          // Optionally redirect to the community page
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
