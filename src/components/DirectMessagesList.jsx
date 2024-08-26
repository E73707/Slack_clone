import { useState } from "react";
import expandIcon from "../images/expand-icon.png";
import "../css/ChannelList.css";
import hashtag from "../images/hashtag.png";

export default function DirectMessagesList() {
  const [expanded, setExpanded] = useState(true);

  const directMessagesList = [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
  ];

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="channels">
      <div className="channels-title-wrapper">
        <div onClick={handleExpand} className="channels-icon-wrapper">
          <img
            className={`expand-icon ${expanded ? "" : "rotated"}`}
            src={expandIcon}
            alt="expand"
          />
        </div>
        <div className="channels-title-container">
          <p className="channels-title">Direct Messages</p>
        </div>
      </div>
      {expanded && (
        <div className="channel-list">
          {directMessagesList.map((channel) => (
            <div className="channel" key={channel}>
              <div className="channel-icon-wrapper">
                <img className="channel-icon" src={hashtag} alt="hashtag" />
              </div>
              <div className="channel-name-wrapper">
                <p className="channel-name">{channel}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
