// ** Import Library
import React, { useEffect, useState } from "react";

// ** Custom Component
import TextInput from "./TextInput";
import AiTextInput from "./AiTextInput";

// ** Store
import { useSelector } from 'react-redux'
import { selectOpenDrawer } from '../../../../store/app/Edit/EditDrawer/index'
import BackgroundColorPicker from "../EditSettingModule/BackgroundColorPicker";
import TransformModule from "../../EditToolbarComp/TextModules/TransformModule";
import GradientModule from "../../EditToolbarComp/TextModules/GradientModule";
import { selectCanvasContainer, selectSelectedCanvas, selectSelectedObject } from "../../../../store/app/Edit/Canvas/canvas";
import Slider from "rc-slider";
import Select from "react-select";
import DropShadowModule from "../../EditToolbarComp/TextModules/DropShadowModule";

function EditTextTab() {
  // States

  const [transparency, setTransparency] = useState(100);

  const canvasContainer = useSelector(selectCanvasContainer);
  const selectedCanvas = useSelector(selectSelectedCanvas)
  const selectedObject = useSelector(selectSelectedObject)

  const [strokeColorActive, setStrokeColorActive] = useState(false);
  const [strokeColor, setStrokeColor] = useState('rgb(131, 23, 26)');
  const [strokeSize, setStrokeSize] = useState(2);
  const [fillStrokeFirst, setFillStrokeFirst] = useState(false);
  const [openStrokeSizeDropdown, setOpenStrokeSizeDropdown] = useState(false)

  const strokeOptions = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]

  const handleStrokeSizeChange = (size) => {
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas?.getActiveObject();
    setStrokeSize(size);

    if (activeObject) {
      activeObject.set({
        strokeWidth: size / 10,
        // fill: fillStrokeFirst ? strokeColor : activeObject.fill,
      });

      canvas.renderAll();
    }
  };
  const handleStrokeColorChange = (color) => {
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas?.getActiveObject();
    setStrokeColor(color);

    if (activeObject) {
      activeObject.set({
        stroke: color,
        // fill: fillStrokeFirst ? strokeColor : activeObject.fill,
      });

      canvas.renderAll();
    }
  };


  const handleTransparencyChange = (value) => {
    const canvas = canvasContainer[selectedCanvas];
    setTransparency(value);
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set({
        opacity: value / 100,
      });

      canvas.renderAll();
    }
  };

  // const handleStrokeColorChange = (color) => {
  //   setStrokeColor(color);
  //   const activeObject = canvas.getActiveObject();
  //   if (activeObject) {
  //     activeObject.set(fillStrokeFirst ? "fill" : "stroke", color);
  //     canvas.renderAll();
  //   }
  // };

  // const handleStrokeSizeChange = (size) => {
  //   setStrokeSize(size);
  //   const activeObject = canvas.getActiveObject();
  //   if (activeObject) {
  //     activeObject.set("strokeWidth", size);
  //     canvas.renderAll();
  //   }
  // };

  const handleToggleFillStrokeFirst = () => {
    setFillStrokeFirst(!fillStrokeFirst);
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      // const fillColor = activeObject.get("fill");
      const strokeColor = activeObject.get("stroke");
      activeObject.set({
        // fill: strokeColor,
        stroke: strokeColor ? strokeColor : '#000',
      });
      canvas.renderAll();
    }
  };

  // ** Hooks 
  const openDrawer = useSelector(selectOpenDrawer)

  useEffect(() => {
    setTransparency(selectedObject?.opacity * 100)
    setStrokeColor(selectedObject?.stroke)
    setStrokeSize(selectedObject?.strokeWidth * 10)
    // setFillStrokeFirst(selectedObject?.fill)
  }, [selectedObject])

  return (
    <>
      <form
        className={openDrawer === 'Text'
          ? "text-module vertical-switch-content-enter-done"
          : "sidebar-module vertical-switch-content-exit-done"}>

        <TextInput />
        <AiTextInput />
      </form>

      <div
        className={openDrawer === 'TextEdit'
          ? "colorize-module vertical-switch-content-enter-done"
          : "colorize-module vertical-switch-content-exit-done"} >
        <BackgroundColorPicker title={strokeColorActive ? 'Stroke' : ''} onColorChange={setStrokeColor} />

        <div className="slider-box__hokeys-wrapper">
          <div className="slider-box">
            <p className="slider-box__title">Transparency</p>
            <Slider
              min={0}
              max={100}
              step={1}
              value={transparency}
              onChange={handleTransparencyChange}
            />
            <input
              inputMode="numeric"
              className="simple-input slider-box__input"
              type="text"
              value={transparency + '%'}
            />
          </div>
        </div>

        <div class="sidebar__tool-title">Stroke</div>
        <div className="colorize-module__stroke-container">
          <div className={`colorize-module__stroke-color ${strokeColorActive ? "colorize-module__stroke-color_active" : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setStrokeColorActive(true)}>
            <div
              className="colorize-module__stroke-color-inner"
              style={{ backgroundColor: strokeColor }}
            ></div>
          </div>
          <div className="size-input__tools-container colorize-module__stroke-input" onClick={() => setOpenStrokeSizeDropdown(!openStrokeSizeDropdown)}>
            <label className="input size-input__input-container input_has-value">
              <input
                inputMode="numeric"
                max={30}
                step={0.1}
                placeholder="Select"
                pattern="\d*"
                className="simple-input size-input__input input_transparent-bg"
                type="text"
                value={strokeSize}
                onChange={(e) => handleStrokeSizeChange(e.target.value)}

              />
            </label>
            {openStrokeSizeDropdown && (
              <div className="rc-dropdown rc-dropdown-placement-topLeft" style={{
                '--arrow-x': '37.5px',
                '--arrow-y': '319.59375px',
                inset: 'auto auto 28px',
                minWidth: '75px',
                boxSizing: 'border-box',
              }}>
                <div className="size-input__font-menu">
                  <ul className="size-input__list">
                    {strokeOptions.map((size) => (
                      <li
                        key={size}
                        className={`size-input__list-item ${strokeSize === size ? 'selected' : ''}`}
                        onClick={() => { handleStrokeSizeChange(size); setOpenStrokeSizeDropdown(false) }}
                      >
                        <span className="size-input__item-title">{size}</span>
                        {strokeSize === size && (
                          <svg
                            className="icon v1-icon v1-icon-check-regular size-input__check-icon"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19 6.41L9.71 15.71a1 1 0 0 1-1.42 0L5 12.41 6.41 11l3.3 3.29L16.7 7H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V8.41z"
                            />
                          </svg>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="size-input__control-button">
              <svg
                className="icon v2-icon v2-icon-chevron-right size-input__control-icon size-input__control-icon_down"
              // Add onClick event for increasing stroke size
              >
                <use href="#v2-icon-chevron-right" xlinkHref="#v2-icon-chevron-right"></use>
              </svg>
            </div>
          </div>

          <label className="toggle mt-2 sidebar__toggle">
            <input
              type="checkbox"
              className="toggle__input"
              checked={fillStrokeFirst}
              onChange={handleToggleFillStrokeFirst}
            />
            <span className="toggle__background">
              <span className="toggle__dot"></span>
            </span>
            <span className="toggle__label colorize-module__toggle-label">
              <span>Fill stroke first</span>
            </span>
          </label>
        </div>
      </div >

      <div
        className={openDrawer === 'TextTransform'
          ? "transform-module vertical-switch-content-enter-done"
          : "transform-module vertical-switch-content-exit-done"} >
        <TransformModule />
      </div>

      <div
        className={openDrawer === 'TextGradient'
          ? "gradient-module sidebar-module  vertical-switch-content-enter-done"
          : "gradient-module sidebar-module  vertical-switch-content-exit-done"} >
        <GradientModule />
      </div>

      <div
        className={openDrawer === 'TextDropShadow'
          ? "shadow-module colorize-module vertical-switch-content-enter-done"
          : "shadow-module colorize-module vertical-switch-content-exit-done"} >
        <DropShadowModule />
      </div>
    </>
  )
}

export default EditTextTab