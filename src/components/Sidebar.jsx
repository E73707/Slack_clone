import React from "react";
import homeIcon from "../images/home-icon.png";
import dmsIcon from "../images/DMs-logo.png";
import activityIcon from "../images/activity-icon.png";
import moreIcon from "../images/more-icon.png";
import plusIcon from "../images/plus-icon.png";

import "../css/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-menu-community-wrapper">
          <div className="sidebar-menu sidebar-menu-community">
            <p className="sidebar-menu-community-text">E</p>
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

        <div className="sidebar-menu sidebar-menu-more">
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
          <div className="sidebar-menu-icon-wrapper">
            <img></img>
          </div>
          <p className="sidebar-menu-icon-text">Logout</p>
        </div>
      </div>
    </div>
  );
}
