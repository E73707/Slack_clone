import expandIcon from "../images/expand-icon.png";
import "../css/ChannelList.css";
import hashtag from "../images/hashtag.png";
import { useState, useEffect } from "react";
import ChannelCreateModal from "./ChannelCreateModal";

export default function ChannelList({ communityData }) {
  const [expanded, setExpanded] = useState(true);
  const [channelList, setChannelList] = useState([]);

  const [channelModal, setChanelModal] = useState(true);

  useEffect(() => {
    console.log("Community data:", communityData);
    setChannelList(communityData.channels);
  }, [communityData]);

  const handleChannelModal = () => {
    setChanelModal(!channelModal);
  };

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

          <div />
        </div>
        <div className="channels-title-container">
          <p className="channels-title">Channels</p>
        </div>
      </div>

      {expanded && (
        <div className="channel-list">
          {channelList.map((channel) => (
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

      <div className="channel-list">
        <div className="channel">
          <div className="channel-name-wrapper">
            <p onClick={handleChannelModal} className="channel-name">
              Create Channel
            </p>
          </div>
        </div>
      </div>

      {channelModal && (
        <ChannelCreateModal
          channelModalState={channelModal}
          setChannelModalState={setChanelModal}
        />
      )}
    </div>
  );
}
