import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import canvas, { selectCanvasContainer, selectResolution, selectSelectedCanvas, selectSelectedObject, updateSelectedCanvas } from "../../../store/app/Edit/Canvas/canvas";

function PageManagerList(props) {

  const dispatch = useDispatch();
  const { width, height } = useSelector(selectResolution);
  const [previewWidth, setPreviewWidth] = useState(55);
  const [previewHeight, setPreviewHeight] = useState(30);

  const [firstTime, setFirstTime] = useState(true);

  const [snapshotURI, setSnapshotURI] = useState(null);

  const canvasContainer = useSelector(selectCanvasContainer)
  const selectedCanvas = useSelector(selectSelectedCanvas)

  const selectedObject = useSelector(selectSelectedObject)

  useEffect(() => {

    if (width) {
      setPreviewWidth(55);
      setPreviewHeight((height / width) * 55)
    }

    const handlePreviewRender = (time) => {
      setTimeout(() => {

        if (canvasContainer && canvasContainer.length > 0) {
          const dataURL = canvasContainer[props.index]?.toDataURL({
            format: "png",
            multiplier: 0.5,
          });

          // Set the exported image data URI in the state
          setSnapshotURI(dataURL);
        }
      }, time);
    }

    handlePreviewRender(500);

    if (firstTime) {
      handlePreviewRender(4000);
      setFirstTime(false);
    }

    // const canvas = new fabric.Canvas('canvas-1');

    // console.log(`canvas-${props.index + 1}`)

    // Add object added event listener
    // canvas.on('object:added', (options) => {
    //   console.log('Object added:', options.target);
    //   handlePreviewRender(500);
    // });

    // // Add object modified event listener
    // canvas.on('object:modified', (options) => {
    //   console.log('Object modified:', options.target);
    //   handlePreviewRender(500);
    // });

    // Add object removed event listener
    // canvas.on('object:removed', (options) => {
    //   console.log('Object removed:', options.target);
    //   handlePreviewRender(500);
    // });

    // Clean up on component unmount

    console.log("Preview Rendered")
    // const canvas = canvasRef.current

    return () => {
      // Remove event listeners to avoid memory leaks
      // canvas.off('object:added');
      // canvas.off('object:modified');
      // canvas.off('object:removed');
    };
  }, [selectedObject, canvasContainer, selectedCanvas]);

  const handleListClick = () => {
    dispatch(updateSelectedCanvas(props.index));
  }

  return (
    <li
      draggable="true"
      id={props.id}
      className={`page-manager__stage-preview ${selectedCanvas === props.index ? 'page-manager__stage-preview_active' : ''}`}
      onClick={handleListClick}
      style={{
        width: previewWidth,
        height: previewHeight
      }}
    >
      {snapshotURI && (
        <div style={{
          width: previewWidth,
          height: previewHeight,
        }}>
          <img crossOrigin="anonymous" src={snapshotURI} style={{
            width: previewWidth,
            height: previewHeight,
          }} alt="Snapshot" />
        </div>
      )}
    </li>
  );
}

export default PageManagerList;
