import { signOut, getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";
import "../css/Home.css";

export default function Home() {
  const auth = getAuth();
  async function handleSignout() {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="sidebar-wrapper"></div>
      <h1>This is the Home page</h1>
      <button onClick={() => handleSignout()}>Sign out</button>
    </div>
  );
}
