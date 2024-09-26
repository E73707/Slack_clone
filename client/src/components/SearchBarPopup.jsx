import React from "react";
import "../css/SearchBarPopup.css"; // Create this CSS for styling

export default function SearchBarPopup({ onBlur }) {
  return (
    <div className="search-bar-popup" tabIndex={0} onBlur={onBlur}>
      <form className="search-bar-form">
        <input
          className="search-bar"
          type="text"
          placeholder="Type to search..."
          autoFocus
        />
      </form>
      <div className="search-bar-popup-results">
        <div className="search-bar-popup-result">
          <p>Result 1</p>
        </div>
        <div className="search-bar-popup-result">
          <p>Result 2</p>
        </div>
        <div className="search-bar-popup-result">
          <p>Result 3</p>
        </div>
      </div>
    </div>
  );
}
