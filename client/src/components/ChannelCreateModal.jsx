import "../css/ChannelCreateModal.css";
import exitIcon from "../images/exit.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCommunity } from "../../../features/communitySlice";

export default function ChannelCreateModal({
  channelModalState,
  setChannelModalState,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [data, setCommunityData] = useState([]);

  const communityData = useSelector((state) => state.community.community);
  const [newCommunityData, setNewCommunityData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (communityData.community_owner === user.uid) {
      setIsAdmin(true);
    }
  }, [communityData, user]);

  const [channelData, setChannelData] = useState({
    channel_name: "",
    isAdmin: isAdmin,
    userId: user.uid,
    communityChannelId: communityData.id,
    communityId: communityData.id,
    UserUid: user.uid,
  });

  // Function to create the channel
  const createChannel = async () => {
    console.log("Creating channel with data:", channelData);
    try {
      const response = await fetch(
        "http://localhost:3001/api/channels/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(channelData), // Only send channelData, no event
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Channel created successfully:", data);
      } else {
        console.error("Failed to create channel");
      }
    } catch (error) {
      console.error("Error creating channel: ", error);
    }
    getChannelData(); // Get the updated channel data
    setChannelModalState(false); // Close the modal after creation
  };

  const getChannelData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/communities/${communityData.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to get community");
      }
      const data = await response.json();
      console.log("Current community:", data);
      dispatch(setCommunity(data));
    } catch (error) {
      console.error("Error getting community:", error);
    }
  };

  const [nextStep, setNextStep] = useState(false);

  const handleNextStep = () => {
    setNextStep(!nextStep);
  };

  // Handles updating channel name
  const handleChannelName = (e) => {
    setChannelData({ ...channelData, channel_name: e.target.value });
  };

  // Closes the modal by calling the parent's state function
  const closeModal = () => {
    setChannelModalState(false);
  };

  return (
    <div className={`channel-modal ${channelModalState ? "open" : ""}`}>
      {!nextStep ? (
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create a Channel</h2>
            <div className="exit-icon-wrapper">
              <img
                src={exitIcon}
                alt="exit"
                className="exit-icon"
                onClick={closeModal}
              />
            </div>
          </div>

          <div className="modal-body">
            <p className="modal-body-text">Name</p>
            <input
              type="text"
              placeholder="# e.g. announcements"
              className="modal-input"
              value={channelData.channel_name}
              onChange={handleChannelName} // Capture the channel name
            />
            <p className="modal-body-description">
              Channels are where discussions happen around a specific topic.
              Choose a name which suits the topic.
            </p>
          </div>

          <div className="modal-footer">
            <button className="modal-button" onClick={handleNextStep}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create a channel</h2>
            <div className="exit-icon-wrapper">
              <img
                src={exitIcon}
                alt="exit"
                className="exit-icon"
                onClick={closeModal}
              />
            </div>
          </div>

          <div className="modal-body">
            <p className="modal-body-text">Visibility</p>
            <div className="modal-radio">
              <div className="modal-radio-option-wrapper">
                <input
                  type="radio"
                  id="public"
                  name="visibility"
                  value="public"
                  onChange={() =>
                    setChannelData({ ...channelData, private: false })
                  }
                />
                <label htmlFor="public">Public - anyone in the community</label>
              </div>
              <div className="modal-radio-option-wrapper">
                <input
                  type="radio"
                  id="private"
                  name="visibility"
                  value="private"
                  onChange={() =>
                    setChannelData({ ...channelData, private: true })
                  }
                />
                <label htmlFor="private">Private - only specific people</label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="modal-button" onClick={handleNextStep}>
              Back
            </button>
            <button className="modal-button" onClick={createChannel}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
