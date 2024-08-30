import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { setUser } from "../../features/userSlice"; // Assuming you have a userSlice set up
import Navbar from "../components/Navbar"; // Replace with your actual component imports
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";

export default function Home() {
  const [hasCommunity, setHasCommunity] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      console.log("User:", user.uid);
      getAllUsers();
      getCurrentUser();
    }
  }, [user]);

  async function getAllUsers() {
    try {
      const response = await fetch("http://localhost:3001/api/users");
      if (!response.ok) {
        throw new Error("Failed to get users");
      }
      const data = await response.json();
      console.log("All users:", data);
    } catch (error) {
      console.error("Error getting users:", error);
    }
  }

  async function getCurrentUser() {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${user.uid}`
      );
      if (!response.ok) {
        throw new Error("Failed to get user");
      }
      const data = await response.json();

      if (data) {
        dispatch(setUser(data));
      }

      if (data.communities && data.communities.length > 0) {
        setHasCommunity(true);
      }
    } catch (error) {
      console.error("Error getting user:", error);
    }
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
            <button onClick={getCurrentUser}>Create Community</button>
            <button>Join Community</button>
          </div>
        </div>
      )}
    </>
  );
}
