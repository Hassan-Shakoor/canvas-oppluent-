import React from "react";

function Canvas() {
  return (
    <div
      id="canvases"
      aria-label="backgroundWorkArea"
      className="canvases canvases_bottom-panel-open fpd-container">
      <div id="fpd-main-wrapper" className="fpd-main-wrapper">
        <div
          id="fpd-product-stage"
          className="fpd-product-stage"
          style={{
          height: "793.277px"
        }}>
          <div
            className="fpd-view-stage rendered"
            style={{
            width: "1020.36px",
            height: "793.277px",
            position: "relative",
            userSelect: "none",
            top: 0
          }}>
            <canvas
              className="lower-canvas canvas-img"
              width={1020}
              height={793}
              style={{
              position: "absolute",
              width: "1020.36px",
              height: "793.277px",
              left: 0,
              top: 0,
              touchAction: "none",
              userSelect: "none"
            }}/>
            <canvas
              className="upper-canvas "
              width={1020}
              height={793}
              style={{
              position: "absolute",
              width: "1020.36px",
              height: "793.277px",
              left: 0,
              top: 0,
              touchAction: "none",
              userSelect: "none",
              cursor: "pointer"
            }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Canvas;