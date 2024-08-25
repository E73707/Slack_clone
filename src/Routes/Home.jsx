import { signOut, getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";
import "../css/Home.css";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";

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
      <div className="home-main-container">
        <Sidebar />
        <MainContainer />
      </div>
    </div>
  );
}
