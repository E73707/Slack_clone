import "../css/ChannelCreateModal.css";
import exitIcon from "../images/exit.png";
import { useState } from "react";

export default function ChannelCreateModal({
  channelModalState,
  setChannelModalState,
}) {
  const [channelData, setChannelData] = useState({
    channel_name: null,
  });

  const [nextStep, setNextStep] = useState(false);

  const handleNextStep = () => {
    setNextStep(!nextStep);
  };

  // Handles updating channel name
  const handleChannelName = (e) => {
    setChannelData({ ...channelData, channel_name: e.target.value });
  };

  const createChannel = () => {
    console.log("Creating channel:", channelData.channel_name);
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
            <p className="modal-body-text">Description</p>
            <input
              type="text"
              placeholder="e.g. A channel for announcements"
              className="modal-input"
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
                onClick={closeModal} // Call the parent's function to close the modal
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
                />
                <label htmlFor="public">Public - anyone in community</label>
              </div>
              <div className="modal-radio-option-wrapper">
                <input
                  type="radio"
                  id="private"
                  name="visibility"
                  value="private"
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
      <div />
    </div>
  );
}
