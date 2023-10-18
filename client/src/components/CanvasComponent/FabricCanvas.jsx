// ** Import Libraries
import React from "react";
import { useSelector } from "react-redux";
import { selectHeight, selectResolution, selectWidth } from "../../store/app/Edit/Canvas/canvas";

const FabricCanvas = ({index}) => {
    // ** Vars
    const resolution = useSelector(selectResolution)

    return (
        <div
            className="fpd-view-stage rendered"
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