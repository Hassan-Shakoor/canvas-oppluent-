// ** Import Library
import React, {useEffect} from "react";
import {fabric} from 'fabric';

// ** Custom Component
import FabricCanvas from "./FabricCanvas";

// ** Shared
import { DISPLAY_DIRECTION } from "../../shared/constant";

// ** Store
import {useDispatch, useSelector} from 'react-redux'
import { selectCanvasContainer, selectDisplayDirection, selectFabricData, selectResolution, updateCanvasContainer, updateSelectedCanvas } from "../../store/app/Edit/Canvas/canvas";

function Canvas() {

  // ** Hooks
  const dispatch = useDispatch()
  const fabricData = useSelector(selectFabricData)
  const canvasContainer = useSelector(selectCanvasContainer) 
  const resolution = useSelector(selectResolution)

  // ** Vars
  const stageHeight = fabricData.length * resolution.height
  const displayDirection = useSelector(selectDisplayDirection)

  useEffect(() => {
    if (document.getElementById('canvas-1')) {
      const newCanvases = [];
      for (let i = 0; i < fabricData.length; i++) {
        const canvasData = JSON.parse(fabricData[i])
        const canvas = new fabric.Canvas(`canvas-${i + 1}`, {
          width: resolution.width,
          height: resolution.height
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

  }, [dispatch, fabricData, resolution]);
  console.log(canvasContainer)
  return (
    <div
      id="canvases"
      aria-label="backgroundWorkArea"
      className={displayDirection === DISPLAY_DIRECTION.HORIZONTAL ? "canvases canvases_horizontal canvases_bottom-panel-open fpd-container" : "canvases canvases_bottom-panel-open fpd-container"}>
      <div id="fpd-main-wrapper" className="fpd-main-wrapper">
        <div
          id="fpd-product-stage"
          className="fpd-product-stage"
          style={{
          height: {stageHeight}
        }}>
          {Array.from({ length: fabricData.length }).map((_, i) => (
            <FabricCanvas index={i}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Canvas;