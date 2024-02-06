// ** Import Libraries
import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedCanvas} from "../../store/app/Edit/Canvas/canvas";

const FabricCanvas = ({index, width, height}) => {
    // ** Vars
    const selectedCanvas = useSelector(selectSelectedCanvas)


    return (
        <div
            key={index}
            className={selectedCanvas === index ? "fpd-view-stage rendered" : "fpd-view-stage rendered fpd-hidden" }
            style={{
            width: width,
            height: height,
            position: "relative",
            userSelect: "none",
            top: 0,
          }}>
            <canvas
              key={index}
              id={`canvas-${index+1}`}
              // width={width}
              // height={height}
              style={{
              position: "absolute",
              left: 0,
              top: 0,
              // width: width,
              // height: height,
              touchAction: "none",
              userSelect: "none",
            }}/>
          </div>
    )
}

export default FabricCanvas