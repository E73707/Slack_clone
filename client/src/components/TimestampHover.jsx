import React, { useEffect } from "react";
import "../css/rightMainContainer.css";

export default function TimestampHover({ timestamp, onBlur }) {
  return (
    <div className="timestamp-hover">
      <div className="timestamp-hover__content">
        <div className="timestamp-hover__content__text">{timestamp}</div>
      </div>
    </div>
  );
}
