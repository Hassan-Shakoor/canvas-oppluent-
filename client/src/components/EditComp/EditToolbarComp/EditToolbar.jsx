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
  const [cropRect, setCropRect] = useState(null);

  const [imageObjectForCrop, setImageObjectForCrop] = useState(null);
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
  //   const canvas = canvasContainer[selectedCanvas];
  //   if (selectedObject && selectedObject.type === 'Image') {
  //     selectedObject.set({ selectable: true });
  //     canvas?.setActiveObject(selectedObject);
  //     selectedObject.crop();
  //     canvas?.renderAll();
  //   }
  // }

  // const handleCropImage = () => {
  //   const canvas = canvasContainer[selectedCanvas];
  //   const activeObject = canvas?.getActiveObject();

  //   if (activeObject && activeObject.type === 'Image') {
  //     const { left, top, width, height } = activeObject;

  //     // Create a clipping rectangle to simulate cropping
  //     const clipRect = new fabric.Rect({
  //       left,
  //       top,
  //       width,
  //       height,
  //       fill: 'white', // You can set the color to match your canvas background
  //     });

  //     // Apply the clipPath to the image
  //     activeObject.set({
  //       clipPath: clipRect,
  //       scaleX: 1,
  //       scaleY: 1,
  //       width,
  //       height,
  //     });

  //     canvas.renderAll();
  //   }
  // };

  const handleCropImage = () => {

    // Create a rectangle for cropping
    const canvas = canvasContainer[selectedCanvas];

    if (selectedObject && selectedObject.type === 'Image') {
      setImageObjectForCrop(selectedObject);
    }

    const rect = new fabric.Rect({
      id: generateRandomId(),
      left: selectedObject?.left ? selectedObject.left : 50,
      top: selectedObject?.top ? selectedObject.top : 50,
      width: selectedObject?.width ? selectedObject.width : 200,
      height: selectedObject?.height ? selectedObject.height : 150,
      scaleX: selectedObject?.scaleX ? selectedObject.scaleX : 1,
      scaleY: selectedObject?.scaleY ? selectedObject.scaleY : 1,
      // fill: 'transparent',
      fill: 'rgba(255, 255, 255, 0.5)',
      stroke: 'red',
      strokeWidth: 2 / selectedObject?.scaleX,
      resizable: true,
      selectable: true,
      type: 'crop',
      perPixelBoundary: true, // Ensure rectangle stays within pixel boundaries
      cornerStyle: 'transparent',
      originX: 'left',
      originY: 'top',
    });

    rect.setControlsVisibility({
      mt: true,
      mb: true,
      ml: true,
      mr: true,
      tl: true,
      tr: true,
      bl: true,
      br: true,
      mtr: false,
    });

    // rect.set({
    //   lockScalingY: image.height / rect.height,
    //   maxScaleLimit: image.height / rect.height,
    // });

    // Add the rectangle to the canvas
    canvas.add(rect);
    canvas.setActiveObject(rect);
    setCropRect(rect);
    canvas?.setActiveObject(rect);
    dispatch(updateSelectedObject(rect))
  };

  const handleDoneCrop = () => {
    const canvas = canvasContainer[selectedCanvas];

    if (cropRect && imageObjectForCrop) {

      const image = canvas.getActiveObject();
      const scaleX = image.width / image.getScaledWidth();
      const scaleY = image.height / image.getScaledHeight();
      const cropLeft = cropRect.left - image.left;
      const cropTop = cropRect.top - image.top;
      const cropWidth = cropRect.width * scaleX;
      const cropHeight = cropRect.height * scaleY;
      // Convert cropRect coordinates to be relative to the image
      // const scaleX = imageObjectForCrop.scaleX;
      // const scaleY = imageObjectForCrop.scaleY;

      // const relativeLeft = (cropRect.left - imageObjectForCrop.left) / scaleX;
      // const relativeTop = (cropRect.top - imageObjectForCrop.top) / scaleY;
      // const relativeWidth = cropRect.width / scaleX;
      // const relativeHeight = cropRect.height / scaleY;

      // Create a clipping rectangle
      const clipRect = new fabric.Rect({
        left: cropLeft,
        top: cropTop,
        width: cropWidth,
        height: cropHeight,
        fill: 'white',
        type: 'crop', // Adjust the color to match your canvas background
      });
      // Apply the clipPath to the image
      imageObjectForCrop.set({
        clipPath: clipRect,
      });

      // Remove the crop rectangle from the canvas
      canvas.remove(cropRect);

      // Render the canvas
      canvas.renderAll();

      // Reset the cropRect state
      setCropRect(null);

      // Set the image as the active object
      canvas.setActiveObject(imageObjectForCrop);
      dispatch(updateSelectedObject(imageObjectForCrop));
    }
  };


  const handleResetCrop = () => {
    const canvas = canvasContainer[selectedCanvas];
    if (cropRect) {
      // Remove the crop rectangle from the canvas
      imageObjectForCrop.set({ clipPath: null })
      canvas?.remove(cropRect);
      setCropRect(null);
      canvas?.setActiveObject(imageObjectForCrop);
      dispatch(updateSelectedObject(imageObjectForCrop))
    }
  };

  const handleCancelCrop = () => {


    const canvas = canvasContainer[selectedCanvas];

    canvas.remove(selectedObject);
    // Reset the cropRect state without applying changes
    setCropRect(null);
    canvas?.setActiveObject(imageObjectForCrop);
    dispatch(updateSelectedObject(imageObjectForCrop))
  };

  // const handleMouseDown = (event) => {
  //   const canvas = canvasContainer[selectedCanvas]
  //   if (!event.target || event.target.type !== 'image') {
  //     return;
  //   }

  //   const image = event.target;
  //   const pointer = cropRect.getPointer(event.e);

  //   // Create a new crop rectangle
  //   cropRect = new fabric.Rect({
  //     left: pointer.x,
  //     top: pointer.y,
  //     width: 1,
  //     height: 1,
  //     fill: 'rgba(255, 255, 255, 0.5)',
  //     stroke: 'red',
  //     strokeWidth: 2,
  //     selectable: false,
  //     hasControls: false,
  //     originX: 'left',
  //     originY: 'top',
  //   });

  //   canvas.add(cropRect);
  //   canvas.renderAll();

  //   // Event listener for mouse move to resize the crop rectangle
  //   canvas.on('mouse:move', handleMouseMove);

  //   // Event listener for mouse up to finish cropping
  //   canvas.on('mouse:up', handleMouseUp);
  // };

  // const handleMouseMove = (event) => {
  //   const canvas = canvasContainer[selectedCanvas]
  //   if (!cropRect) {
  //     return;
  //   }

  //   const pointer = canvas.getPointer(event.e);
  //   const { left, top } = cropRect;

  //   cropRect.set({
  //     width: pointer.x - left,
  //     height: pointer.y - top,
  //   });

  //   canvas.renderAll();
  // };

  // const handleMouseUp = () => {
  //   const canvas = canvasContainer[selectedCanvas]
  //   canvas.off('mouse:move', handleMouseMove);
  //   canvas.off('mouse:up', handleMouseUp);

  //   if (cropRect) {
  //     // Perform cropping logic here
  //     const croppedImage = handleDoneCrop(cropRect);
  //     console.log('Cropped Image:', croppedImage);

  //     // Remove the crop rectangle
  //     canvas.remove(cropRect);
  //     cropRect = null;
  //   }
  // };

  // const bulletText = createBulletText();
  // canvas.add(bulletText);
  // canvas.renderAll();

  // // Example: Toggle bullet points
  // document.getElementById('toggleBullets').addEventListener('click', function () {
  //   bulletText.bulletsEnabled = !bulletText.bulletsEnabled;
  // });



  return (
    // selectedObject && Object.keys(selectedObject).length > 0 && (
    <div
      className={
        openDrawer !== null ? "toolbar toolbar_type-animate-general" : "toolbar"
      }
      aria-label="clickOutsideIgnore"
    >
      {selectedObject.type !== 'crop' ? (
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
                  {openTextAlignDropdown && <TextAlignDropdown />}
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
            <div className="toolbar__text-button" onClick={handleDoneCrop}>
              <FontAwesomeIcon icon="fa-solid fa-check" style={{ marginRight: 5 }} /> Done
            </div>
            <div className="toolbar__text-button" onClick={handleResetCrop}>
              <FontAwesomeIcon icon="fa-solid fa-rotate-left" style={{ marginRight: 5 }} /> Reset
            </div>
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
