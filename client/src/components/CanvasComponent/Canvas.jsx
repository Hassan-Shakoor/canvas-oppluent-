// ** Import Library
import React, {useEffect} from "react";
import {fabric} from 'fabric';

// ** Import Store
import {useDispatch, useSelector} from 'react-redux'
import { selectCanvasContainer, selectFabricData, selectHeight, selectSelectedCanvas, selectWidth, updateCanvasContainer, updateSelectedCanvas } from "../../store/app/Edit/Canvas/canvas";

function Canvas() {
  // ** States

  // ** Hooks
  const dispatch = useDispatch()
  const selectedCanvas = useSelector(selectSelectedCanvas)
  const fabricData = useSelector(selectFabricData)
  const canvasContainer = useSelector(selectCanvasContainer)
  const width = useSelector(selectWidth)
  const height = useSelector(selectHeight)

  // ** Vars
  const stageHeight = fabricData.length * height

  useEffect(() => {
    if (document.getElementById('canvas-1')) {
      const newCanvases = [];
      for (let i = 0; i < fabricData.length; i++) {
        const canvasData = JSON.parse(fabricData[i])
        const canvas = new fabric.Canvas(`canvas-${i + 1}`, {
          width: width,
          height: height
        });
        canvas.loadFromJSON(canvasData,function(){
          canvas.renderAll()
          newCanvases.push(canvas);
        })
        canvas.on("mouse:down", () => {
          dispatch(updateSelectedCanvas(Number(i)))
        })
      }
      dispatch(updateCanvasContainer([...newCanvases]));
    }

  }, [fabricData]);
  console.log(canvasContainer);
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
          height: {stageHeight}
        }}>
          {Array.from({ length: fabricData.length }).map((_, i) => (
            <div
            className="fpd-view-stage rendered"
            style={{
            width: width,
            height: height,
            position: "relative",
            userSelect: "none",
            top: 0
          }}>
            <canvas
              key={i}
              id={`canvas-${i+1}`}
              style={{
              position: "absolute",
              left: 0,
              top: 0,
              touchAction: "none",
              userSelect: "none"
            }}/>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Canvas;