import React, { useState } from "react";
import "../css/Navbar.css";
import backArrow from "../images/back-icon.png";
import forwardArrow from "../images/forward-icon.png";
import historyIcon from "../images/history-icon.png";
import SearchBarPopup from "./SearchBarPopup";

export default function Navbar() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const handleFocus = () => {
    setIsPopupVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsPopupVisible(true);
    }, 200);
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
        {isPopupVisible && <SearchBarPopup onBlur={handleBlur} />}
      </nav>
      <nav className="navbar-right">
        <img className="nav-icon" src={forwardArrow} alt="Forward Arrow" />
      </nav>
    </header>
  );
}
