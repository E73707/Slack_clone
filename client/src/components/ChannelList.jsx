import expandIcon from "../images/expand-icon.png";
import "../css/ChannelList.css";
import hashtag from "../images/hashtag.png";
import { useState, useEffect } from "react";
import ChannelCreateModal from "./ChannelCreateModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChannel } from "../../../features/channelSlice"; // Import setChannel action
import { auth } from "firebaseui";

export default function ChannelList({ communityData }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const [channelList, setChannelList] = useState([]);
  const [channelModal, setChanelModal] = useState(true);
  const user = useSelector((state) => state.user.user);
  const community = useSelector((state) => state.community.community);
  const [authLevel, setAuthLevel] = useState(false);

  useEffect(() => {
    setChannelList(communityData.channels);
    if (communityData.community_owner === user.uid) {
      setAuthLevel(true);
    }
  }, [communityData]);

  const handleChannelModal = () => {
    setChanelModal(!channelModal);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleChannelClick = (channel) => {
    // Dispatch the setChannel action with the selected channel
    dispatch(setChannel(channel));
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
          <p className="channels-title">Channels</p>
        </div>
      </div>

      {expanded && (
        <div className="channel-list">
          {channelList.map((channel) => (
            <div
              className="channel"
              onClick={() => handleChannelClick(channel)}
            >
              <div className="channel-icon-wrapper">
                <img className="channel-icon" src={hashtag} alt="hashtag" />
              </div>
              <div
                className="channel-name-wrapper"
                onClick={() => handleChannelClick(channel)} // Call the handler when clicked
              >
                <p className="channel-name">{channel.channel_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="channel-list">
        <div className="channel">
          <div className="channel-name-wrapper">
            {authLevel && (
              <p onClick={handleChannelModal} className="channel-name">
                Create Channel
              </p>
            )}
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
