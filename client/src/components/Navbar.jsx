import React from "react";
import "../css/Navbar.css";
import backArrow from "../images/back-icon.png";
import forwardArrow from "../images/forward-icon.png";
import historyIcon from "../images/history-icon.png";

export default function Navbar() {
  return (
    <header className="header">
      <nav className="navbar-left">
        <img className="nav-icon" src={backArrow} alt="Back Arrow" />
        <img className="nav-icon" src={forwardArrow} alt="Forward Arrow" />
        <img className="history-icon" src={historyIcon} alt="History Icon" />
      </nav>
      <nav className="navbar-middle">
        <form className="search-bar-form">
          <input className="search-bar" type="text" placeholder="Search" />
        </form>
      </nav>
      <nav className="navbar-right">
        <img className="nav-icon" src={forwardArrow} alt="Forward Arrow" />
      </nav>
    </header>
  );
}
