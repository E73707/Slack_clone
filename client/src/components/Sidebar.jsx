import React from "react";
import homeIcon from "../images/home-icon.png";
import dmsIcon from "../images/DMs-logo.png";
import activityIcon from "../images/activity-icon.png";
import moreIcon from "../images/more-icon.png";
import plusIcon from "../images/plus-icon.png";
import { signOut } from "firebase/auth";

import "../css/Sidebar.css";

export default function Sidebar({ communityData }) {
  const baseUrl =
    import.meta.env.REACT_APP_BASE_URL ||
    "https://slack-clone1-529cef6d905b.herokuapp.com" ||
    "http://localhost:3001";

  async function handleSignout() {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllMembers() {
    console.log("Getting members for community:", communityData.id);
    try {
      const response = await fetch(
        `${baseUrl}/api/members/${communityData.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to get members");
      }
      const data = await response.json();
      console.log("Members data:", data);
    } catch (error) {
      console.error("Error getting members:", error);
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-menu-community-wrapper">
          <div className="sidebar-menu sidebar-menu-community">
            <p className="sidebar-menu-community-text">
              {communityData.community_name[0].toUpperCase()}
            </p>
          </div>
        </div>

        <div className="sidebar-menu sidebar-menu-home">
          <div className="sidebar-menu-icon-wrapper">
            <img className="sidebar-icon" src={homeIcon}></img>
          </div>
          <p className="sidebar-menu-icon-text">Home</p>
        </div>

        <div className="sidebar-menu sidebar-menu-dms">
          <div className="sidebar-menu-icon-wrapper">
            <img className="sidebar-icon" src={dmsIcon}></img>
          </div>
          <p className="sidebar-menu-icon-text">Dms</p>
        </div>

        <div className="sidebar-menu sidebar-menu-activity">
          <div className="sidebar-menu-icon-wrapper">
            <img className="sidebar-icon" src={activityIcon}></img>
          </div>
          <p className="sidebar-menu-icon-text">Activity</p>
        </div>

        <div onClick={getAllMembers} className="sidebar-menu sidebar-menu-more">
          <div className="sidebar-menu-icon-wrapper">
            <img className="sidebar-icon" src={moreIcon}></img>
          </div>
          <p className="sidebar-menu-icon-text">More</p>
        </div>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-menu sidebar-menu-help">
          <div className="sidebar-menu-icon-wrapper">
            <img className="sidebar-icon" src={plusIcon}></img>
          </div>
        </div>

        <div className="sidebar-menu sidebar-menu-logout">
          <div onClick={handleSignout} className="sidebar-menu-icon-wrapper">
            <img></img>
          </div>
          <p className="sidebar-menu-icon-text sidebar-menu-icon-text">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}
