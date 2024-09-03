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
  const [hasCommunity, setHasCommunity] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("User:", user.uid);
      getCurrentUser(user.uid);
    }
    console.log("Redux User:", reduxUser);
  }, [auth]);

  async function getCurrentUser(uid) {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${uid}`);
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
      {hasCommunity ? (
        <div className="home-wrapper">
          <Navbar />
          <div className="home-main-container">
            <Sidebar />
            <MainContainer />
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
