// ** Import Library
import React, {useEffect} from "react";
import {fabric} from 'fabric';

// ** Custom Component
import FabricCanvas from "./FabricCanvas";

// ** Import Store
import {useDispatch, useSelector} from 'react-redux'
import { selectCanvasContainer, selectFabricData, selectResolution, selectSelectedCanvas, updateCanvasContainer, updateSelectedCanvas } from "../../store/app/Edit/Canvas/canvas";

function Canvas() {
  // ** States

  // ** Hooks
  const dispatch = useDispatch()
  const selectedCanvas = useSelector(selectSelectedCanvas)
  const fabricData = useSelector(selectFabricData)
  const canvasContainer = useSelector(selectCanvasContainer) 
  const resolution = useSelector(selectResolution)

  // ** Vars
  const stageHeight = fabricData.length * resolution.height

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

  }, [fabricData]);
  console.log(canvasContainer)
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
            <FabricCanvas index={i}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Canvas;