// ** Import Libraries
import React from "react";
import { useSelector } from "react-redux";
import { selectResolution, selectSelectedCanvas} from "../../store/app/Edit/Canvas/canvas";

const FabricCanvas = ({index}) => {
    // ** Vars
    const resolution = useSelector(selectResolution)
    const selectedCanvas = useSelector(selectSelectedCanvas)

    return (
        <div
            key={index}
            className={selectedCanvas === index ? "fpd-view-stage rendered" : "fpd-view-stage rendered fpd-hidden" }
            style={{
            width: resolution.width,
            height: resolution.height,
            position: "relative",
            userSelect: "none",
            top: 0
          }}>
            <canvas
              key={index}
              id={`canvas-${index+1}`}
              style={{
              position: "absolute",
              left: 0,
              top: 0,
              touchAction: "none",
              userSelect: "none"
            }}/>
          </div>
    )
}

export default FabricCanvas