import React, { useState } from "react";
import "../css/Navbar.css";
import backArrow from "../images/back-icon.png";
import forwardArrow from "../images/forward-icon.png";
import historyIcon from "../images/history-icon.png";
import SearchBarPopup from "./SearchBarPopup";
import { useSelector } from "react-redux";

const allUsers = [
  { id: 1, email: "Alice" },
  { id: 2, email: "Bob" },
  { id: 3, email: "Charlie" },
];

const allChannels = [
  { id: 1, name: "intros" },
  { id: 2, name: "random" },
  { id: 3, name: "projects" },
];
export default function Navbar() {
  const channel = useSelector((state) => state.channel.channel);
  const baseUrl =
    import.meta.env.REACT_APP_BASE_URL ||
    "https://slack-clone1-529cef6d905b.herokuapp.com" ||
    "http://localhost:3001";
  const [allUsers, setAllUsers] = useState([]);
  const community = useSelector((state) => state.community.community);
  const users = useSelector((state) => state.members.members);
  const currentChannel = { id: channel.id, name: channel.channel_name };
  const allMessages = useSelector(
    (state) => state.channelMessages.channelMessages
  );

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleFocus = () => {
    setIsPopupVisible(!isPopupVisible);
    fetchMembers();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsPopupVisible(!isPopupVisible);
    }, 200);
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/members/${community.id}`);
      if (!response.ok) {
        throw new Error("Failed to get members");
      }
      const data = await response.json();
      console.log("Members data:", data);
      setAllUsers(data);
    } catch (error) {
      console.error("Error getting members:", error);
    }
  };

  return (
    <header className="header">
      <nav className="navbar-left">
        <img className="nav-icon" src={backArrow} alt="Back Arrow" />
        <img className="nav-icon" src={forwardArrow} alt="Forward Arrow" />
        <img className="history-icon" src={historyIcon} alt="History Icon" />
      </nav>
      <nav className="navbar-middle">
        <div className="search-bar-placeholder-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onFocus={handleFocus}
            readOnly
          />
        </div>
        {isPopupVisible && (
          <SearchBarPopup
            currentChannel={currentChannel}
            allUsers={allUsers}
            allChannels={allChannels}
            allMessages={allMessages}
            onBlur={handleBlur}
          />
        )}
      </nav>
      <nav className="navbar-right">
        <img className="nav-icon" src={forwardArrow} alt="Forward Arrow" />
      </nav>
    </header>
  );
}
