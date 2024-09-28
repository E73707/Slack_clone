import React, { useEffect, useState } from "react";
import "../css/SearchBarPopup.css"; // Create this CSS for styling
import blackHashtagIcon from "../images/black-hashtag.png";
import avatarPlaceholder from "../images/avatar-placeholder.jpg";
import searchIcon from "../images/search.png";
import { on } from "ws";

export default function SearchBarPopup({
  onBlur,
  currentChannel,
  allUsers,
  allChannels,
  allMessages,
}) {
  const [inputValue, setInputValue] = useState("");
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [channelRecommendations, setChannelRecommendations] = useState([]);
  const [messageRecommendations, setMessageRecommendations] = useState([]);
  useEffect(() => {
    if (inputValue.trim() !== "") {
      const matchedUsers = allUsers.filter((userObj) =>
        userObj.User.displayName
          .toLowerCase()
          .startsWith(inputValue.toLowerCase())
      );
      const matchedChannels = allChannels.filter((channel) =>
        channel.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      const matchedMessages = allMessages.filter((message) =>
        message.content.toLowerCase().includes(inputValue.toLowerCase())
      );
      setMessageRecommendations(matchedMessages);
      setUserRecommendations(matchedUsers);
      setChannelRecommendations(matchedChannels);
    } else {
      setUserRecommendations([]);
      setChannelRecommendations([]);
    }
  }, [inputValue, allUsers, allChannels, onBlur]);

  return (
    <div className="search-bar-popup" tabIndex={0} onBlur={onBlur}>
      <form className="search-bar-form">
        <input
          className="search-bar"
          type="text"
          placeholder="Type to search..."
          value={inputValue} // Bind the input value to the state
          onChange={(e) => setInputValue(e.target.value)} // Update input value on change
          autoFocus
        />
      </form>

      {/* Display current input value */}
      {inputValue && (
        <div className="search-recommendation">
          <div className="search-recommendation-text">
            <img
              className="search-recommendation-icon"
              src={searchIcon}
              alt="Search"
            />

            {inputValue}
          </div>
        </div>
      )}

      {/* Display input value combined with the current channel */}
      {currentChannel && (
        <div className="search-recommendation">
          <div className="search-recommendation-text">
            <img
              className="search-recommendation-icon"
              src={searchIcon}
              alt="Search"
            />
            {inputValue} in:#{currentChannel.name}
          </div>
        </div>
      )}

      {userRecommendations.length > 0 || channelRecommendations.length > 0 ? (
        <div className="search-recommendation-separator"></div>
      ) : null}

      {/* Display user recommendations */}
      {userRecommendations.length > 0 && (
        <div className="recommendation-section">
          {userRecommendations.map((userObj) => (
            <div key={userObj.User.id} className="search-recommendation">
              <div className="search-recommendation-text">
                <img
                  className="search-recommendation-icon"
                  src={avatarPlaceholder}
                  alt="Avatar"
                />
                {userObj.User.displayName}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display channel recommendations */}
      {channelRecommendations.length > 0 && (
        <div className="recommendation-section">
          {channelRecommendations.map((channel) => (
            <div key={channel.id} className="search-recommendation">
              <div className="search-recommendation-text">
                <img
                  className="search-recommendation-icon"
                  src={blackHashtagIcon}
                  alt="#"
                />
                {channel.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {(inputValue && messageRecommendations.length > 0) ||
      (inputValue && userRecommendations.length < 0) ? (
        <div className="messages-separator">
          <p className="messages-separator-text">
            Recent messages in #{currentChannel.name}
          </p>
        </div>
      ) : null}

      {/* Display message recommendations */}
      {inputValue &&
        messageRecommendations.length > 0 &&
        userRecommendations.length < 1 && (
          <div className="recommendation-section">
            {messageRecommendations.map((message) => (
              <div key={message.id} className="search-recommendation">
                <div className="search-recommendation-text">
                  <img
                    className="search-recommendation-icon"
                    src={avatarPlaceholder}
                    alt="Avatar"
                  />
                  <div className="message-recommendation-text">
                    <div
                      className="search-recommendation-messages"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                    <div className="search-recommendation-message-name">
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
