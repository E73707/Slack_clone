import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { setUser } from "../../../features/userSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  const baseUrl =
    import.meta.env.REACT_APP_BASE_URL ||
    "https://slack-clone1-529cef6d905b.herokuapp.com" ||
    "http://localhost:3001";

  const [hasCommunity, setHasCommunity] = useState(false);
  const [communityData, setCommunityData] = useState([]); // State for the community data
  const [loading, setLoading] = useState(true); // Loading state for the community
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user.user);
  const reduxCommunity = useSelector((state) => state.community.community);
  const membersList = useSelector((state) => state.member.members);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getCurrentUser(user.uid);
    }
    if (reduxCommunity && reduxCommunity.id) {
      getCurrentCommunity(reduxCommunity.id);
    }
    getAllMembers(reduxCommunity.id);
  }, [auth, reduxCommunity, membersList]);

  async function getCurrentCommunity(communityId) {
    setLoading(true); // Set loading to true when fetching starts
    console.log("Fetching community:", communityId);
    try {
      const response = await fetch(`${baseUrl}/api/communities/${communityId}`);
      if (!response.ok) {
        throw new Error("Failed to get community");
      }
      const data = await response.json();
      console.log("Current community:", data);
      dispatch(setCommunityData(data));
    } catch (error) {
      console.error("Error getting community:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  }

  async function getCurrentUser(uid) {
    try {
      const response = await fetch(`${baseUrl}/api/users/${uid}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache", // Disable caching
          Pragma: "no-cache",
          Expires: "0",
        },
      });
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

  async function getAllMembers() {
    try {
      const response = await fetch(
        `${baseUrl}/api/members/${reduxCommunity.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to get members");
      }
      const data = await response.json();
      console.log("Members data:", data);
      setMembers(data);
    } catch (error) {
      console.error("Error getting members:", error);
    } finally {
      setLoadingMembers(false);
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
