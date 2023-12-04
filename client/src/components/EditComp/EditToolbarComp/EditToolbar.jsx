import React, { useState } from "react";

// ** Store
import { useSelector } from "react-redux";
import { selectOpenDrawer } from "../../../store/app/Edit/EditDrawer";
import { selectSelectedCanvas } from "../../../store/app/Edit/Canvas/canvas";

// ** Custom Component
import FontStyleDropdown from "./ToolbarDropdown/FontStyleDropdown";
import FontSizeDropdown from "./ToolbarDropdown/FontSizeDropdown";

// ** Shared
import { getCanvasRef } from "../../../shared/utils/fabric";

function EditToobar() {
  // ** State
  const [activeBold, setActiveBold] = useState(false);
  const [activeItalic, setActiveItalic] = useState(false);
  const [activeUnderline, setActiveUnderline] = useState(false)
  const [activeStrikethrought, setActiveStikethrought] = useState(false)
  const [activeUpperCase, setActiveUpperCase] = useState(false)

  // ** Vars
  const canvasContainer = getCanvasRef() || [];
  const selectedCanvas = useSelector(selectSelectedCanvas);
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
      textObject.set({underline: !activeUnderline});
      canvas.requestRenderAll();
    }
  };

  const handleStrikethrought = () => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas.getActiveObject();
      textObject.set({linethrough: !activeStrikethrought});
      canvas.requestRenderAll();
    }
  };
  
  const handleUpperCase = () => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas?.getActiveObject();
      textObject.set({ text: !activeUpperCase ? textObject.text.toUpperCase() : textObject.text.toLowerCase()});
      canvas.requestRenderAll();
    }
  };

  return (
    <div
      className={
        openDrawer !== null ? "toolbar toolbar_type-animate-general" : "toolbar"
      }
      aria-label="clickOutsideIgnore"
    >
      <div className="toolbar__container-tools">
        <div className="toolbar__color-picker__button">
          <div className="toolbar__color-picker__flare" />
          <div className="toolbar__color-picker" />
        </div>
        <div className="toolbar__divider" />
        <FontStyleDropdown />
        <FontSizeDropdown />
        <div className="toolbar__divider" />
        <div className="toolbar__text-button">Format</div>
        <div className="toolbar__text-button">Gradient</div>
        <div className="toolbar__text-button">Drop Shadow</div>
      </div>
      <div className="toolbar__container-tools">
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
            >
              <svg className="icon v2-icon v2-icon-text-bold tool-button__icon">
                <use href="#v2-icon-text-bold" xlinkHref="#v2-icon-text-bold" />
              </svg>
            </div>
            <div className={activeItalic ? "tool-button tool-button_active": "tool-button"} 
              onClick={() => {
                setActiveItalic(!activeItalic);
                handleItalicText();
              }}>
              <svg className="icon v2-icon v2-icon-text-italic tool-button__icon">
                <use
                  href="#v2-icon-text-italic"
                  xlinkHref="#v2-icon-text-italic"
                />
              </svg>
            </div>
            <div className={activeUnderline ? "tool-button tool-button_active": "tool-button"} 
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
            <div className={activeStrikethrought ? "tool-button tool-button_active": "tool-button"} onClick={() => {
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
            <div className={activeUpperCase ? "tool-button tool-button_active": "tool-button"} onClick={() => {
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
          <div className="tool-button">
            <svg className="icon v2-icon v2-icon-text-align-left tool-button__icon">
              <use
                href="#v2-icon-text-align-left"
                xlinkHref="#v2-icon-text-align-left"
              />
            </svg>
            <i className="icon icon-chevron-up toolbar__icon-chevron" />
          </div>
          <div className="tool-button">
            <i className="icon tool-button__icon icon-designer-bulleted-lists" />
            <i className="icon icon-chevron-up toolbar__icon-chevron" />
          </div>
          <div className="tool-button">
            <i className="icon tool-button__icon icon-designer-numbered-lists" />
            <i className="icon icon-chevron-up toolbar__icon-chevron" />
          </div>
          <div className="tool-button">
            <i className="icon tool-button__icon icon-designer-bulleted-lists" />
            <i className="icon icon-chevron-up toolbar__icon-chevron" />
          </div>
          <div className="tool-button">
            <i className="icon tool-button__icon icon-designer-wrap-text" />
          </div>
        </div>
        <div className="toolbar__divider" />
        <div className="toolbar__button-set">
          <div className="tool-button">
            <i className="icon tool-button__icon icon-designer-zindex-arrow-up" />
          </div>
          <div className="tool-button">
            <i className="icon tool-button__icon icon-designer-zindex-arrow-down" />
          </div>
          <div className="tool-button">
            <i className="icon tool-button__icon icon-designer-zindex-bring-up" />
          </div>
          <div className="tool-button">
            <i className="icon tool-button__icon icon-designer-zindex-bring-down" />
          </div>
        </div>
        <div className="toolbar__divider" />
        <div className="toolbar__button-set">
          <div className="tool-button" data-test="toolbar-hyperlink">
            <svg className="icon v2-icon v2-icon-chain tool-button__icon">
              <use href="#v2-icon-chain" xlinkHref="#v2-icon-chain" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditToobar;
