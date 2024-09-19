import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import "../css/MainContainer.css";
import LeftMainContainer from "./LeftMainContainer";
import RightMainContainer from "./RightMainContainer";

export default function MainContainer({ communityData }) {
  return (
    <div className="main-container-2">
      <PanelGroup direction="horizontal">
        <Panel className="left-panel" defaultSize={25} minSize={10}>
          <div className="main-container-2-left-wrapper">
            <LeftMainContainer communityData={communityData} />
          </div>
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel className="right-panel" defaultSize={75} minSize={20}>
          <div className="main-container-2-right-wrapper">
            <RightMainContainer communityData={communityData} />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
