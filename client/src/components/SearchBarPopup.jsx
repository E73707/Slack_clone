import React, { useEffect, useState } from "react";
import "../css/SearchBarPopup.css"; // Create this CSS for styling
import blackHashtagIcon from "../images/black-hashtag.png";
import avatarPlaceholder from "../images/avatar-placeholder.jpg";
import searchIcon from "../images/search.png";

export default function SearchBarPopup({
  onBlur,
  currentChannel,
  allUsers,
  allChannels,
}) {
  const [inputValue, setInputValue] = useState("");
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [channelRecommendations, setChannelRecommendations] = useState([]);

  console.log("allUsers:", allUsers);
  console.log("allChannels:", allChannels);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      // Exact match for users
      const matchedUsers = allUsers.filter((user) =>
        user.email.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      // Exact match for channels
      const matchedChannels = allChannels.filter((channel) =>
        channel.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );

      setUserRecommendations(matchedUsers);
      setChannelRecommendations(matchedChannels);
    } else {
      setUserRecommendations([]);
      setChannelRecommendations([]);
    }
  }, [inputValue, allUsers, allChannels]);

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
          {userRecommendations.map((user) => (
            <div key={user.id} className="search-recommendation">
              <div className="search-recommendation-text">
                <img
                  className="search-recommendation-icon"
                  src={avatarPlaceholder}
                  alt="Avatar"
                />
                {user.email}
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
    </div>
  );
}
