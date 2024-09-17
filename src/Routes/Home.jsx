import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { setUser } from "../../features/userSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
   const API_URL = "https://slack-clone1-529cef6d905b.herokuapp.com" || 'http://localhost:3001'
  const [hasCommunity, setHasCommunity] = useState(false);
  const [communityData, setCommunityData] = useState([]); // State for the community data
  const [loading, setLoading] = useState(true); // Loading state for the community
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user.user);
  const reduxCommunity = useSelector((state) => state.community.community);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getCurrentUser(user.uid);
    }
    if (reduxCommunity && reduxCommunity.id) {
      getCurrentCommunity(reduxCommunity.id);
    }
  }, [auth, reduxCommunity]);

  async function getCurrentCommunity(communityId) {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch(
        `http://localhost:3001/api/communities/${communityId}`
      );
      if (!response.ok) {
        throw new Error("Failed to get community");
      }
      const data = await response.json();
      dispatch(setCommunityData(data));
    } catch (error) {
      console.error("Error getting community:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  }

  async function getCurrentUser(uid) {
    try {
      const response = await fetch(`${API_URL}/api/users/${uid}`);
      if (!response.ok) {
        throw new Error("Failed to get user");
      }
      const data = await response.json();

      if (data) {
        dispatch(setUser(data));
        console.log("Current user:", data);
      }

      // Check if the user is part of any community
      if (
        (data.memberOf && data.memberOf.length > 0) ||
        (data.ownedCommunities && data.ownedCommunities.length > 0)
      ) {
        setHasCommunity(true);
      }
    } catch (error) {
      console.error("Error getting user:", error);
    }
  }

  function handleCreateRoute() {
    navigate("/community-signup");
  }

  function handleJoinRoute() {
    navigate("/community-signin");
  }

  return (
    <>
      {loading ? ( // Show loading spinner or message while loading is true
        <div className="loading">
          <p>Loading community...</p>
        </div>
      ) : hasCommunity ? (
        <div className="home-wrapper">
          <Navbar />
          <div className="home-main-container">
            <Sidebar communityData={communityData} />
            <MainContainer communityData={communityData} />
          </div>
        </div>
      ) : (
        <div className="home-wrapper">
          <div className="home-main-content">
            <h1>Welcome to Synk!</h1>
            <p>
              You don't have any communities yet. Create a community or join one
              to get started.
            </p>
            <button onClick={handleCreateRoute}>Create Community</button>
            <button onClick={handleJoinRoute}>Join Community</button>
          </div>
        </div>
      )}
    </>
  );
}
