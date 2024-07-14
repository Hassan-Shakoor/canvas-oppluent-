import React, { useState } from "react";

// ** Store
import { useDispatch, useSelector } from "react-redux";
import { selectOpenDrawer, updateOpenDrawer } from "../../../store/app/Edit/EditDrawer";
import canvas, { selectSelectedCanvas, selectSelectedObject, updateSelectedObject } from "../../../store/app/Edit/Canvas/canvas";

// ** Custom Component
import FontStyleDropdown from "./ToolbarDropdown/FontStyleDropdown";
import FontSizeDropdown from "./ToolbarDropdown/FontSizeDropdown";

// ** Shared
import { getCanvasRef } from "../../../shared/utils/fabric";
import TextAlignDropdown from "./ToolbarDropdown/TextAlignDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SendBackFrontObject from "./TextModules/SendBackFrontObject";
import { fabric } from 'fabric'
import { generateRandomId } from "../../../shared/utils";


function EditToolbar() {
  // ** State

  const dispatch = useDispatch()

  const [activeBold, setActiveBold] = useState(false);
  const [activeItalic, setActiveItalic] = useState(false);
  const [activeUnderline, setActiveUnderline] = useState(false)
  const [activeStrikethrought, setActiveStikethrought] = useState(false)
  const [activeUpperCase, setActiveUpperCase] = useState(false)
  const [openTextAlignDropdown, setOpenTextAlignDropdown] = useState(false)
  const [currentCropRect, setCurrentCropRect] = useState(null);

  const [imageObjectForCrop, setImageObjectForCrop] = useState(null);
  const [isAdjustImage, setIsAdjustImage] = useState(false);
  const [initialObjectLayerIndex, setInitialObjectLayerIndex] = useState(false);
  // ** Vars
  const canvasContainer = getCanvasRef() || [];
  const selectedCanvas = useSelector(selectSelectedCanvas);
  const selectedObject = useSelector(selectSelectedObject);
  const openDrawer = useSelector(selectOpenDrawer);



  const handleBoldText = () => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas?.getActiveObject();
      textObject.set({ fontWeight: !activeBold ? "bold" : "normal" });
      canvas.requestRenderAll();
    }
  };
  const handleItalicText = () => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas?.getActiveObject();
      textObject.set({ fontStyle: !activeItalic ? "italic" : "normal" });
      canvas.requestRenderAll();
    }
  };
  const handleUnderlineText = () => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas.getActiveObject();
      textObject.set({ underline: !activeUnderline });
      canvas.requestRenderAll();
    }
  };

  const handleStrikethrought = () => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas.getActiveObject();
      textObject.set({ linethrough: !activeStrikethrought });
      canvas.requestRenderAll();
    }
  };

  const handleUpperCase = () => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas?.getActiveObject();
      textObject.set({ text: !activeUpperCase ? textObject.text.toUpperCase() : textObject.text.toLowerCase() });
      canvas.requestRenderAll();
    }
  };

  const convertToBulletPoint = () => {
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas?.getActiveObject();

    if (activeObject?.isBulletsEnabled) {
      removeBullets();
      return;
    }
    if (activeObject?.isNumbersEnabled) {
      removeNumbers();
    }

    if (activeObject && activeObject.type === 'Text') {
      // Get the current text content
      const textContent = activeObject?.text;

      // Convert the text to bullet points
      const textWithBullets = textContent
        .split('\n')
        .map(line => (line.includes('\u2022') ? line : `\u2022 ${line}`))
        .join('\n');

      // Update the textbox with the new text
      activeObject.set({ text: textWithBullets, isBulletsEnabled: true });

      canvas.discardActiveObject(activeObject);
      canvas.setActiveObject(activeObject);
      canvas.renderAll();
      // Render the canvas
    }
  };

  const removeBullets = () => {
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas?.getActiveObject();

    if (activeObject?.type === 'Text') {
      // Get the current text content
      const textContent = activeObject?.text;

      // Remove existing bullet points
      const textWithoutBullets = textContent.replace(/\u2022 /g, '');

      // Update the textbox with the new text
      activeObject.set({ text: textWithoutBullets, isBulletsEnabled: false });

      canvas.discardActiveObject(activeObject);
      canvas.setActiveObject(activeObject);
      // Render the canvas
      canvas.renderAll();
    }
  };

  const convertToNumberPoint = () => {
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas?.getActiveObject();

    if (activeObject?.isNumbersEnabled) {
      removeNumbers();
      return;
    }
    if (activeObject?.isBulletsEnabled) {
      removeBullets();
    }

    if (activeObject && activeObject.type === 'Text') {
      // Get the current text content
      const textContent = activeObject?.text;

      // Convert the text to bullet points
      const textWithBullets = textContent
        .split('\n')
        .map((line, index) => (line.includes(`${index + 1}. `) ? line : `${index + 1}. ${line}`))
        .join('\n');

      // Update the textbox with the new text
      activeObject.set({ text: textWithBullets, isNumbersEnabled: true });

      canvas.discardActiveObject(activeObject);
      canvas.setActiveObject(activeObject);
      // Render the canvas
      canvas.renderAll();
    }
  };

  const removeNumbers = () => {
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas?.getActiveObject();

    if (activeObject?.type === 'Text') {
      // Get the current text content
      const textContent = activeObject?.text;

      // Remove existing bullet points
      const textWithoutNumbers = textContent.replace(/^\d+\.\s/gm, '');

      // Update the textbox with the new text
      activeObject.set({ text: textWithoutNumbers, isNumbersEnabled: false });

      canvas.discardActiveObject(activeObject);
      canvas.setActiveObject(activeObject);
      // Render the canvas
      canvas.renderAll();
    }
  };

  // const handleCropImage = () => {

  //   // Create a rectangle for cropping
  //   const canvas = canvasContainer[selectedCanvas];

  //   if (selectedObject && selectedObject.type === 'Image') {
  //     setImageObjectForCrop(selectedObject);
  //   }

  //   const rect = new fabric.Rect({
  //     id: generateRandomId(),
  //     left: selectedObject?.left ? selectedObject.left : 50,
  //     top: selectedObject?.top ? selectedObject.top : 50,
  //     width: selectedObject?.width ? selectedObject.width : 200,
  //     height: selectedObject?.height ? selectedObject.height : 150,
  //     scaleX: selectedObject?.scaleX ? selectedObject.scaleX : 1,
  //     scaleY: selectedObject?.scaleY ? selectedObject.scaleY : 1,
  //     // fill: 'transparent',
  //     fill: 'rgba(255, 255, 255, 0.5)',
  //     stroke: 'red',
  //     strokeWidth: 2 / selectedObject?.scaleX,
  //     resizable: true,
  //     selectable: true,
  //     type: 'crop',
  //     perPixelBoundary: true, // Ensure rectangle stays within pixel boundaries
  //     cornerStyle: 'transparent',
  //     originX: 'left',
  //     originY: 'top',
  //   });

  //   rect.setControlsVisibility({
  //     mt: true,
  //     mb: true,
  //     ml: true,
  //     mr: true,
  //     tl: true,
  //     tr: true,
  //     bl: true,
  //     br: true,
  //     mtr: false,
  //   });

  //   // rect.set({
  //   //   lockScalingY: image.height / rect.height,
  //   //   maxScaleLimit: image.height / rect.height,
  //   // });

  //   // Add the rectangle to the canvas
  //   canvas.add(rect);
  //   canvas.setActiveObject(rect);
  //   setCropRect(rect);
  //   canvas?.setActiveObject(rect);
  //   dispatch(updateSelectedObject(rect))
  // };

  const handleCropImage = () => {

    const canvas = canvasContainer[selectedCanvas];

    const e = canvas.getActiveObject();

    if (e && e.type === 'Image') {
      setImageObjectForCrop(selectedObject);
    }

    const cropRect = new fabric.Rect({
      id: "crop-rect",
      top: e.top,
      left: e.left,
      angle: e.angle,
      width: e.getScaledWidth(),
      height: e.getScaledHeight(),
      stroke: "rgb(42, 67, 101)",
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      fill: "rgba(255, 255, 255, 1)",
      globalCompositeOperation: "overlay",
      lockRotation: true,
    });

    const overlayRect = new fabric.Rect({
      id: "overlay-rect",
      top: e.top,
      left: e.left,
      angle: e.angle,
      width: e.getScaledWidth(),
      height: e.getScaledHeight(),
      selectable: false,
      selection: false,
      fill: "rgba(0, 0, 0, 0.5)",
      lockRotation: true,
    });

    const s = e.cropX,
      o = e.cropY,
      c = e.width,
      l = e.height;

    e.set({
      cropX: null,
      cropY: null,
      left: e.left - s * e.scaleX,
      top: e.top - o * e.scaleY,
      width: e._originalElement.naturalWidth,
      height: e._originalElement.naturalHeight,
      dirty: false
    });

    cropRect.set({
      left: e.left + s * e.scaleX,
      top: e.top + o * e.scaleY,
      width: c * e.scaleX,
      height: l * e.scaleY,
      dirty: false
    });


    overlayRect.set({
      left: e.left,
      top: e.top,
      width: e.width * e.scaleX,
      height: e.height * e.scaleY,
      dirty: false
    });

    cropRect.oldScaleX = cropRect.scaleX;
    cropRect.oldScaleY = cropRect.scaleY;

    canvas.add(overlayRect);
    canvas.add(cropRect);
    canvas.discardActiveObject();
    canvas.setActiveObject(cropRect);
    setCurrentCropRect(cropRect);
    canvas.renderAll();

    cropRect.on("moving", function () {
      if (cropRect.top < e.top || cropRect.left < e.left) {
        cropRect.left = cropRect.left < e.left ? e.left : cropRect.left;
        cropRect.top = cropRect.top < e.top ? e.top : cropRect.top;
      }
      if (cropRect.top + cropRect.getScaledHeight() > e.top + e.getScaledHeight() ||
        cropRect.left + cropRect.getScaledWidth() > e.left + e.getScaledWidth()) {
        cropRect.top = cropRect.top + cropRect.getScaledHeight() > e.top + e.getScaledHeight()
          ? e.top + e.getScaledHeight() - cropRect.getScaledHeight()
          : cropRect.top;
        cropRect.left = cropRect.left + cropRect.getScaledWidth() > e.left + e.getScaledWidth()
          ? e.left + e.getScaledWidth() - cropRect.getScaledWidth()
          : cropRect.left;
      }
    });

    cropRect.on("scaling", function () {
      // Add scaling logic if needed
    });

    cropRect.on("deselected", function () {
      handleDoneCrop(cropRect, e);
      setTimeout(() => {
        canvas.remove(overlayRect);
      }, 400);
      setCurrentCropRect(null);
    });
  };

  const handleAdjustImage = () => {
    setIsAdjustImage(true);
    const canvas = canvasContainer[selectedCanvas];

    const selectedObject = canvas.getActiveObject();

    if (selectedObject && selectedObject.type === 'Image') {
      setImageObjectForCrop(selectedObject);
    }

    const initialLayerIndex = canvas.getObjects().indexOf(selectedObject);

    setInitialObjectLayerIndex(initialLayerIndex);

    if (selectedObject) {
      const s = selectedObject.cropX * selectedObject.scaleX;
      const o = selectedObject.cropY * selectedObject.scaleY;
      const p = selectedObject.getScaledWidth();
      const q = selectedObject.getScaledHeight();

      selectedObject.set({
        clipPath: null,
        cropX: null,
        cropY: null,
        left: selectedObject.left - s,
        top: selectedObject.top - o,
        width: selectedObject._originalElement.naturalWidth,
        height: selectedObject._originalElement.naturalHeight,
        dirty: false,
        opacity: 0.5,
        lockRotation: true,
        selectable: true,
        lockMovementX: false,
        lockMovementY: false,
        hasControls: true
      });

      const i = new fabric.Rect({
        id: 'crop-rect',
        left: selectedObject.left + s,
        top: selectedObject.top + o,
        angle: selectedObject.angle,
        width: p,
        height: q,
        stroke: 'rgb(42, 67, 101)',
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        fill: 'rgba(255, 255, 255, 1)',
        lockRotation: true,
        selectable: false,
      });

      canvas.add(i);
      canvas.bringToFront(selectedObject);
      canvas.renderAll();

      selectedObject.on('moving', function () {
        if (selectedObject.left > i.left) {
          selectedObject.left = i.left;
        }
        if (selectedObject.top > i.top) {
          selectedObject.top = i.top;
        }
        if (selectedObject.left + selectedObject.getScaledWidth() < i.left + i.getScaledWidth()) {
          selectedObject.left = i.left - (selectedObject.getScaledWidth() - i.getScaledWidth());
        }
        if (selectedObject.top + selectedObject.getScaledHeight() < i.top + i.getScaledHeight()) {
          selectedObject.top = i.top - (selectedObject.getScaledHeight() - i.getScaledHeight());
        }
        setCurrentCropRect(i);
      });

      selectedObject.on('scaling', function () {
        // Improve scaling logic as needed
        setCurrentCropRect(i);
      });

      selectedObject.on('deselected', function () {
        handleDoneAdjust(i, selectedObject, initialLayerIndex);
      });

    }
  };

  const handleDoneAdjust = (cropArea, oImg, initialLayerIndex) => {

    const canvas = canvasContainer[selectedCanvas];
    //
    var cropX = (cropArea.left - oImg.left) / oImg.scaleX,
      cropY = (cropArea.top - oImg.top) / oImg.scaleY,
      width = (cropArea.width * cropArea.scaleX) / oImg.scaleX,
      height = (cropArea.height * cropArea.scaleY) / oImg.scaleY;

    // console.log('FINISH CROP', cropX, oImg.scaleX, cropY, oImg.scaleY);

    // crop
    oImg.set({
      cropX: cropX,
      cropY: cropY,
      width: width,
      height: height,
      top: cropArea.top,
      left: cropArea.left,
      selectable: true,
      lockRotation: false,
      cropped: 1,
      opacity: 1,
    });

    // remove events
    oImg.off('scaling');
    oImg.off('deselected');
    oImg.off('moving');

    // remove crop area
    canvas.remove(cropArea);

    setImageObjectForCrop(null);
    canvas.remove(selectedObject);
    canvas.insertAt(selectedObject, initialLayerIndex);

    if (selectedObject.isAdminLocked) {
      selectedObject.set({
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false
      })
    }

    setIsAdjustImage(false);
    setInitialObjectLayerIndex(null);
    setCurrentCropRect(null);
    canvas.renderAll();

  }



  const handleDoneCrop = (cropRect, image) => {
    const canvas = canvasContainer[selectedCanvas];

    cropRect.off('scaling');
    cropRect.off('deselected');
    cropRect.off('moving');

    const s = (cropRect.left - image.left) / image.scaleX,
      o = (cropRect.top - image.top) / image.scaleY,
      c = (cropRect.width * cropRect.scaleX) / image.scaleX,
      l = (cropRect.height * cropRect.scaleY) / image.scaleY;

    canvas.remove(cropRect);

    image.set({
      cropX: s,
      cropY: o,
      width: c,
      height: l,
      top: image.top + o * image.scaleY,
      left: image.left + s * image.scaleX,
      selectable: true,
      cropped: 1
    });

    setCurrentCropRect(null);
    setImageObjectForCrop(null);

    canvas.renderAll();
  };

  // const handleResetCrop = () => {
  //   const canvas = canvasContainer[selectedCanvas];
  //   if (cropRect) {
  //     // Remove the crop rectangle from the canvas
  //     imageObjectForCrop.set({ clipPath: null })
  //     canvas?.remove(cropRect);
  //     setCropRect(null);
  //     canvas?.setActiveObject(imageObjectForCrop);
  //     dispatch(updateSelectedObject(imageObjectForCrop))
  //   }
  // };

  const handleResetCrop = () => {
    const canvas = canvasContainer[selectedCanvas];

    if (imageObjectForCrop) {
      imageObjectForCrop.set({
        cropX: 0,
        cropY: 0,
        width: imageObjectForCrop._originalElement.naturalWidth,
        height: imageObjectForCrop._originalElement.naturalHeight,
        top: (imageObjectForCrop.height / 2) - imageObjectForCrop.getScaledHeight() / 2,
        left: (imageObjectForCrop.width / 2) - imageObjectForCrop.getScaledWidth() / 2,
        selectable: true,
        cropped: 0
      });
      canvas.renderAll();
    }
  };

  // const handleCancelCrop = () => {


  //   const canvas = canvasContainer[selectedCanvas];

  //   // canvas.remove(selectedObject);
  //   // Reset the cropRect state without applying changes
  //   setCurrentCropRect(null);
  //   canvas?.setActiveObject(imageObjectForCrop);
  //   dispatch(updateSelectedObject(imageObjectForCrop))
  //   setImageObjectForCrop(null);
  //   setInitialObjectLayerIndex(null);
  // };

  const handleCancelCrop = () => {
    const canvas = canvasContainer[selectedCanvas];
    const selectedObject = canvas.getActiveObject();

    if (selectedObject && selectedObject.type === 'Image') {
      // Remove any temporary cropping elements (like crop rectangle)

      // Restore the image to its original state
      selectedObject.set({
        clipPath: null,
        cropX: 0,
        cropY: 0,
        opacity: 1,
        selectable: true,
      });

      // Reposition the image to its original layer index if needed
      if (initialObjectLayerIndex !== null) {
        canvas.remove(selectedObject);
        canvas.insertAt(selectedObject, initialObjectLayerIndex);
      }

      // Reset the cropRect state and other related state variables
      setCurrentCropRect(null);
      setImageObjectForCrop(null);
      setInitialObjectLayerIndex(null);

      // Update the active object in the canvas and dispatch the new selected object
      canvas.setActiveObject(selectedObject);
      dispatch(updateSelectedObject(selectedObject));

      // Re-render the canvas
      canvas.renderAll();
    }
  };


  return (
    // selectedObject && Object.keys(selectedObject).length > 0 && (
    <div
      className={
        openDrawer !== null ? "toolbar toolbar_type-animate-general" : "toolbar"
      }
      aria-label="clickOutsideIgnore"
    >
      {!imageObjectForCrop ? (
        <>
          <div className="toolbar__container-tools">
            <div className="toolbar__color-picker__button" onClick={() => {
              if (selectedObject.type === 'Image') {

                dispatch(updateOpenDrawer('Image-Color'));
                // console.log("TextEdit")
                // console.log(openDrawer);
              } else {

                dispatch(updateOpenDrawer('TextEdit'));
              }
            }}>
              <div className="toolbar__color-picker__flare" />
              <div className="toolbar__color-picker" />
            </div>
            {selectedObject.type === 'Text' && (
              <>
                <div className="toolbar__divider" />
                <FontStyleDropdown />
                <FontSizeDropdown />
              </>
            )}

            <div className="toolbar__divider" />

            <div className="toolbar__text-button" onClick={() => dispatch(updateOpenDrawer('TextTransform'))}>
              {selectedObject.type === 'Text' ? 'Format' : 'Transform'}
            </div>

            {(selectedObject.type === 'Text' || selectedObject.type === 'Shape') && (
              <>
                <div className="toolbar__text-button" onClick={() => dispatch(updateOpenDrawer('TextGradient'))}>Gradient</div>
                <div className="toolbar__text-button" onClick={() => dispatch(updateOpenDrawer('TextDropShadow'))}>Drop Shadow</div>
              </>
            )}

            {(selectedObject && selectedObject.type === 'Shape' && selectedObject.fill instanceof fabric.Pattern) && (
              <>
                <div className="toolbar__text-button" onClick={() => dispatch(updateOpenDrawer('UploadZone'))}>Upload Zone</div>
              </>)}

            {selectedObject.type === 'Image' && (
              <>
                {/* <div className="toolbar__text-button" onClick={() => dispatch(updateOpenDrawer('TextGradient'))}>Gradient</div> */}
                <div className="toolbar__text-button" onClick={handleCropImage}>Crop Image</div>
                <div className="toolbar__text-button" onClick={handleAdjustImage}>Adjust Image</div>
              </>
            )}
          </div>

          <div className="toolbar__container-tools">
            {selectedObject?.type === 'Text' && (
              <>
                <div className="toolbar__divider" />
                <div className="toolbar__button-set">
                  <div className="">
                    <div
                      className={
                        activeBold ? "tool-button tool-button_active" : "tool-button"
                      }
                      onClick={() => {
                        setActiveBold(!activeBold);
                        handleBoldText();
                      }}
                      data-tooltip='Bold'
                    >
                      <svg className="icon v2-icon v2-icon-text-bold tool-button__icon">
                        <use href="#v2-icon-text-bold" xlinkHref="#v2-icon-text-bold" />
                      </svg>
                    </div>
                    <div className={activeItalic ? "tool-button tool-button_active" : "tool-button"}
                      onClick={() => {
                        setActiveItalic(!activeItalic);
                        handleItalicText();
                      }}
                      data-tooltip='Italic'>
                      <svg className="icon v2-icon v2-icon-text-italic tool-button__icon">
                        <use
                          href="#v2-icon-text-italic"
                          xlinkHref="#v2-icon-text-italic"
                        />
                      </svg>
                    </div>
                    <div className={activeUnderline ? "tool-button tool-button_active" : "tool-button"}
                      data-tooltip='Underline'
                      onClick={() => {
                        setActiveUnderline(!activeUnderline);
                        handleUnderlineText();
                      }}>
                      <svg className="icon v2-icon v2-icon-text-underline tool-button__icon">
                        <use
                          href="#v2-icon-text-underline"
                          xlinkHref="#v2-icon-text-underline"
                        />
                      </svg>
                    </div>
                    <div className={activeStrikethrought ? "tool-button tool-button_active" : "tool-button"}
                      data-tooltip='Strikethrough'
                      onClick={() => {
                        setActiveStikethrought(!activeStrikethrought)
                        handleStrikethrought()
                      }}>
                      <svg className="icon v2-icon v2-icon-text-linethrough tool-button__icon">
                        <use
                          href="#v2-icon-text-linethrough"
                          xlinkHref="#v2-icon-text-linethrough"
                        />
                      </svg>
                    </div>
                    <div className={activeUpperCase ? "tool-button tool-button_active" : "tool-button"}
                      data-tooltip='Uppercase'
                      onClick={() => {
                        setActiveUpperCase(!activeUpperCase)
                        handleUpperCase()
                      }}>
                      <svg className="icon v2-icon v2-icon-text-upcase tool-button__icon">
                        <use
                          href="#v2-icon-text-upcase"
                          xlinkHref="#v2-icon-text-upcase"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="tool-button" onClick={() => setOpenTextAlignDropdown(!openTextAlignDropdown)}>


                    <svg className={`icon v2-icon v2-icon-text-align-${selectedObject.textAlign} tool-button__icon`}>
                      <use
                        href={`#v2-icon-text-align-${selectedObject.textAlign}`}
                        xlinkHref={`#v2-icon-text-align-${selectedObject.textAlign}`}
                      />
                    </svg>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" size="2xs" />
                  </div>
                  {openTextAlignDropdown && <TextAlignDropdown openTextAlignDropdown={openTextAlignDropdown} setOpenTextAlignDropdown={setOpenTextAlignDropdown} />}
                  <div className="tool-button" onClick={convertToBulletPoint}>
                    <FontAwesomeIcon icon="fa-solid fa-list-ul" />
                    {/* <FontAwesomeIcon icon="fa-solid fa-chevron-down" size="2xs" /> */}
                  </div>
                  <div className="tool-button" onClick={convertToNumberPoint}>
                    <FontAwesomeIcon icon="fa-solid fa-list-ol" />
                    {/* <FontAwesomeIcon icon="fa-solid fa-chevron-down" size="2xs" /> */}
                  </div>
                  {/* <div className="tool-button">
                <i className="icon tool-button__icon icon-designer-bulleted-lists"></i>
                <i className="icon icon-chevron-up toolbar__icon-chevron"></i>
              </div>
              <div className="tool-button">
                <i className="icon tool-button__icon icon-designer-wrap-text"></i>
              </div> */}
                </div>
              </>
            )}

            <div className="toolbar__divider" />

            <SendBackFrontObject />


          </div>
        </>) :
        <>

          <>
            <div className="toolbar__text-button" onClick={() => {
              if (isAdjustImage) {
                handleDoneAdjust(currentCropRect, imageObjectForCrop, initialObjectLayerIndex)
              }
              else {
                handleDoneCrop(currentCropRect, imageObjectForCrop)
              }
            }}>
              <FontAwesomeIcon icon="fa-solid fa-check" style={{ marginRight: 5 }} /> Done
            </div>
            {/* <div className="toolbar__text-button" onClick={handleResetCrop}>
              <FontAwesomeIcon icon="fa-solid fa-rotate-left" style={{ marginRight: 5 }} /> Reset
            </div> */}
            <div className="toolbar__text-button" onClick={handleCancelCrop}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" style={{ marginRight: 5 }} /> Cancel
            </div>
          </>
        </>}

    </div>
    // )
  );
}

export default EditToolbar;
