// import React from "react";
// import { ResizableBox } from "react-resizable";
// import "../css/MainContainer.css";
// import LeftMainContainer from "./LeftMainContainer";
// import RightMainContainer from "./RightMainContainer";
// import "react-resizable/css/styles.css";

// export default function MainContainer() {
//   return (
//     <div className="main-container-2">
//       <ResizableBox
//         className="main-container-2-left-wrapper"
//         width={300}
//         height={Infinity}
//         minConstraints={[100, Infinity]}
//         maxConstraints={[600, Infinity]}
//         axis="x"
//       >
//         <LeftMainContainer />
//       </ResizableBox>
//       <ResizableBox
//         className="main-container-2-right-wrapper"
//         width={300}
//         height={Infinity}
//         minConstraints={[100, Infinity]}
//         maxConstraints={[600, Infinity]}
//         axis="x"
//       >
//         <RightMainContainer />
//       </ResizableBox>
//     </div>
//   );
// }

import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import "../css/MainContainer.css";
import LeftMainContainer from "./LeftMainContainer";
import RightMainContainer from "./RightMainContainer";

export default function MainContainer() {
  return (
    <div className="main-container-2">
      <PanelGroup direction="horizontal">
        <Panel className="left-panel" defaultSize={25} minSize={10}>
          <div className="main-container-2-left-wrapper">
            <LeftMainContainer />
          </div>
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel defaultSize={75} minSize={20}>
          <div className="main-container-2-right-wrapper">
            <RightMainContainer />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
