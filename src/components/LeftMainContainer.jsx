import "../css/LeftMainContainer.css";
import ChannelList from "./ChannelList";
import DirectMessagesList from "./DirectMessagesList";

export default function LeftMainContainer({ communityData }) {
  return (
    <div className="left-main-container">
      <div className="lmh">
        <div className="lmhl">
          <p className="lmhcn">{communityData.community_name}</p>
          <p className="lmhc-dropdown">v</p>
        </div>
        <div className="lmhr">
          <p className="lmhr-new-conversation">+</p>
        </div>
      </div>

      <div className="left-main-container-content">
        <div>
          <ChannelList communityData={communityData} />
        </div>
        <div className="Direct-messages">
          <DirectMessagesList />
        </div>
      </div>
    </div>
  );
}
