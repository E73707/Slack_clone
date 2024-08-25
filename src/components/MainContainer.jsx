import react from "react";
import { getAuth, signOut } from "firebase/auth";
import "../css/MainContainer.css";
import LeftMainContainer from "./LeftMainContainer";
import RightMainContainer from "./RightMainContainer";

export default function MainContainer() {
  //   const auth = getAuth();
  //   async function handleSignout() {
  //     try {
  //       await signOut(auth);
  //       console.log("User signed out successfully");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  return (
    <div className="main-container-2">
      <div className="main-container-2-left-wrapper">
        <LeftMainContainer />
        {/* <h1>This is the MainContainer component</h1>
        <button onClick={() => handleSignout()}>Sign out</button> */}
      </div>
      <div className="main-container-2-right-wrapper">
        <RightMainContainer />
      </div>
    </div>
  );
}
