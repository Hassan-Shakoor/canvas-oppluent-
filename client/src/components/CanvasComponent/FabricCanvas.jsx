// ** Import Libraries
import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedCanvas } from "../../store/app/Edit/Canvas/canvas";
import { selectSafeZoneAndBleed } from "../../store/app/Edit/EditSidebar/EditSetting/preference";

const FabricCanvas = ({ index, width, height }) => {
  // ** Vars
  const selectedCanvas = useSelector(selectSelectedCanvas)

  const isSafeZone = useSelector(selectSafeZoneAndBleed);

  return (
    <div
      key={index}
      className={selectedCanvas === index ? "fpd-view-stage rendered" : "fpd-view-stage rendered fpd-hidden"}
      style={{
        width: isSafeZone ? width - ((width / 1000) * 12) * 2 : width,
        height: isSafeZone ? height - ((height / 1000) * 12) * 2 : height,
        position: "relative",
        userSelect: "none",
        top: 0,
      }}>
      <canvas
        key={index}
        id={`canvas-${index + 1}`}
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

          border: isSafeZone && (width >= height ? `${(width / 1000) * 12}px solid blue` : `${(height / 1000) * 12}px solid blue`)
        }} />
    </div>
  )
}

export default FabricCanvas