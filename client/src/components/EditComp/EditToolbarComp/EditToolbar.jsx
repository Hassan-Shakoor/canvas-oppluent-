import React, { useState } from "react";

// ** Store
import { useDispatch, useSelector } from "react-redux";
import { selectOpenDrawer, updateOpenDrawer } from "../../../store/app/Edit/EditDrawer";
import { selectSelectedCanvas, selectSelectedObject } from "../../../store/app/Edit/Canvas/canvas";

// ** Custom Component
import FontStyleDropdown from "./ToolbarDropdown/FontStyleDropdown";
import FontSizeDropdown from "./ToolbarDropdown/FontSizeDropdown";

// ** Shared
import { getCanvasRef } from "../../../shared/utils/fabric";
import TextAlignDropdown from "./ToolbarDropdown/TextAlignDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SendBackFrontObject from "./TextModules/SendBackFrontObject";
import { fabric } from 'fabric'


function EditToobar() {
  // ** State

  const dispatch = useDispatch()

  const [activeBold, setActiveBold] = useState(false);
  const [activeItalic, setActiveItalic] = useState(false);
  const [activeUnderline, setActiveUnderline] = useState(false)
  const [activeStrikethrought, setActiveStikethrought] = useState(false)
  const [activeUpperCase, setActiveUpperCase] = useState(false)
  const [openTextAlignDropdown, setOpenTextAlignDropdown] = useState(false)

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
      <div className="toolbar__container-tools">
        <div className="toolbar__color-picker__button" onClick={() => {
          dispatch(updateOpenDrawer('TextEdit'));
          console.log("TextEdit")
          console.log(openDrawer);
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
        <div className="toolbar__text-button" onClick={() => dispatch(updateOpenDrawer('TextTransform'))}>Format</div>
        <div className="toolbar__text-button" onClick={() => dispatch(updateOpenDrawer('TextGradient'))}>Gradient</div>
        <div className="toolbar__text-button" onClick={() => dispatch(updateOpenDrawer('TextDropShadow'))}>Drop Shadow</div>
      </div>

      <div className="toolbar__container-tools">
        {selectedObject.type === 'Text' && (
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
    </div>
    // )
  );
}

export default EditToobar;
