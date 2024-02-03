// ** Import Library
import React, {useEffect} from "react";
import {fabric} from 'fabric';

// ** Custom Component
import FabricCanvas from "./FabricCanvas";

// ** Shared
import { DISPLAY_DIRECTION } from "../../shared/constant";
import { getCanvasRef, setCanvasRef } from "../../shared/utils/fabric";

// ** Store
import {useDispatch, useSelector} from 'react-redux'
import { selectCanvasContainer, selectDisplayDirection, selectFabricData, selectResolution, selectSelectedCanvas, updateCanvasContainer, updateSelectedCanvas, updateSelectedObject } from "../../store/app/Edit/Canvas/canvas";
import { updateOpenDrawer } from "../../store/app/Edit/EditDrawer";

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
          height: resolution.height,

          backgroundImageStretch: 'uniform'
          // width: 634,
          // height: 634
        });

        // console.log("canvas.getZoom(): ", canvas.getZoom())
        canvas?.loadFromJSON(canvasData,function(){
          if (canvas.backgroundImage) {
            canvas.backgroundImage.set({
              // width: 634,
              // scaleX: canvas.getZoom(),
              // scaleY: canvas.getZoom()
              // height: 634,
              // backgroundSize: 'cover'
            });
            canvas.requestRenderAll();
          }
          // canvas.renderAll()
        })
        canvas?.on("mouse:down", (event) => {
          // Check if the clicked area have object and set it active
          const target = event.target
          console.log("Target: ",target)
          if(target){
            canvas.setActiveObject(target)
          }
          else {
            dispatch(updateOpenDrawer(target))
          }
          dispatch(updateSelectedObject(target))
          // Update the selected canvas
          dispatch(updateSelectedCanvas(Number(i)))
        })
        newCanvases.push(canvas);
      }
      setCanvasRef([...newCanvases])
      dispatch(updateCanvasContainer([...newCanvases]))

      return () => {
        const canvases = getCanvasRef()
        canvases?.forEach(canvas => {
          canvas.dispose()
        });
        console.log('Canvas Disposed');
      }
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
            <FabricCanvas key={i} index={i}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Canvas;