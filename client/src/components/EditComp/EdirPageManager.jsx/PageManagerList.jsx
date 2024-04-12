import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import canvas, { selectCanvasContainer, selectResolution, selectSelectedCanvas, selectSelectedObject, updateCanvasContainer, updateFabricData, updateSelectedCanvas } from "../../../store/app/Edit/Canvas/canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { serializeCanvasContainer, setCanvasRef } from "../../../shared/utils/fabric";

function PageManagerList(props) {

  const dispatch = useDispatch();
  const { t } = useTranslation()
  const { width, height } = useSelector(selectResolution);
  const [previewWidth, setPreviewWidth] = useState(55);
  const [previewHeight, setPreviewHeight] = useState(30);
  const [firstTime, setFirstTime] = useState(true);
  const [snapshotURI, setSnapshotURI] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePageModal, setShowDeletePageModal] = useState(false);

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

  const handleMouseEnter = (e) => {
    console.log(e);
    setShowPopup(true);
  };

  const handleMouseLeave = (e) => {
    // Check if the mouse is actually leaving the list item
    // If the mouse is moving to the popup, don't close it
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      setShowPopup(false);
    }
  };

  const handleCopyPage = () => {

    const indexToCopy = props.index;

    const newCanvases = [...canvasContainer];
    const canvasToCopy = newCanvases[indexToCopy];

    if (indexToCopy < canvasContainer.length - 1) {
      newCanvases.splice(indexToCopy + 1, 0, canvasToCopy);
      const serialized = serializeCanvasContainer(newCanvases)
      dispatch(updateFabricData(serialized))

      console.log("Item removed from canvasContainer:", canvasContainer);
    } else {
      newCanvases.push(canvasToCopy)
      const serialized = serializeCanvasContainer(newCanvases)
      dispatch(updateFabricData(serialized))

      console.log("Invalid index to remove from canvasContainer");
    }
  }

  const handleDeletePage = (event) => {
    event.preventDefault()

    const indexToRemove = props.index;

    const newCanvases = [...canvasContainer];

    if (indexToRemove >= 0 && indexToRemove < canvasContainer.length) {
      newCanvases.splice(indexToRemove, 1);

      const serialized = serializeCanvasContainer(newCanvases)
      setCanvasRef([...newCanvases])
      dispatch(updateCanvasContainer([...newCanvases]));
      dispatch(updateFabricData(serialized))


      console.log("Item removed from canvasContainer:", canvasContainer);
    } else {
      console.log("Invalid index to remove from canvasContainer");
    }
    setShowDeletePageModal(false);
  }

  return (
    <li
      draggable="true"
      id={props.id}
      className={`page-manager__stage-preview ${selectedCanvas === props.index ? 'page-manager__stage-preview_active' : ''}`}
      onClick={handleListClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: previewWidth,
        height: previewHeight,
      }}
    >
      {showPopup && (
        <div style={{
          paddingRight: '8px',
          width: '90px',
          height: '100px',
          position: 'absolute',
          right: '52px',
        }}>
          <div className="popup-page-manager"
            onMouseEnter={handleMouseEnter}
            style={{
              background: '#183062f0',
              // marginRight: '8px',
              borderRadius: '8px',
              border: '1px solid',
              padding: '10px'
            }}>
            <ul style={{ lineHeight: '1.6rem', color: "white", fontSize: '12px' }}>
              <li style={{ display: 'flex' }} onClick={handleCopyPage} >
                <div style={{ width: '20px' }}><FontAwesomeIcon icon="fa-regular fa-copy" /></div> Copy
              </li>
              <li style={{ display: 'flex' }}>
                <div style={{ width: '20px', paddingLeft: '3px' }}>{props.index + 1}</div> Page
              </li>
              <li style={{ display: 'flex' }} onClick={() => setShowDeletePageModal(true)}>
                <div style={{ width: '20px' }}><FontAwesomeIcon icon="fa-solid fa-trash" /></div> {t("delete")}
              </li>
            </ul>
          </div>
        </div>
      )}
      {showDeletePageModal && (
        <ConfirmationModal
          title={<p style={{ color: '#000', margin: 0 }}>{t("EditHeader.deletePageConfirmation")}</p>}
          body={<p style={{ color: '#000', margin: 0 }}>{t("EditHeader.deletePageConfirmationMessage")}</p>}
          secondaryBtnTxt={t("cancel")}
          primaryBtnTxt={t("delete")}
          close={() => { setShowDeletePageModal(false) }}
          submit={(event) => handleDeletePage(event)}
        />
      )}

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
