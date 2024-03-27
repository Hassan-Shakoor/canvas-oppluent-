// ** Import Libraries
import React, { useEffect, useState } from "react";
import { RgbaColorPicker } from 'react-colorful'

// ** Shared
import { getRgbaCSS, getHexColor, getRgbaColor, getRGBAtoSet } from "../../../../shared/utils/color";
import { getCanvasRef, render } from "../../../../shared/utils/fabric";

// ** Icon
import { Icon } from "@iconify/react";

// ** Store
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectBrandColor, selectStandardColor, selectUserColor } from "../../../../store/app/Edit/EditSidebar/EditSetting/background";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { updateUserColor } from "../../../../store/app/Edit/EditSidebar/EditSetting/background"
import { selectCanvasContainer, selectSelectedCanvas, selectSelectedObject } from "../../../../store/app/Edit/Canvas/canvas";

import { fabric } from 'fabric'

function BackgroundColorPicker({ title, activeColorIndex, onColorChange }) {
  // ** State
  const [selectedColor, setSelectedColor] = useState(undefined)
  const [color, setColor] = useState({ r: 51, g: 51, b: 51, a: 1 })
  const [prevColor, setPrevColor] = useState()
  const [colorInput, setColorInput] = useState(getHexColor(color))

  // ** Hooks
  const dispatch = useDispatch()
  const selectedCanvas = useSelector(selectSelectedCanvas)
  const canvasContainer = getCanvasRef()
  const standardColor = useSelector(selectStandardColor)
  const selectedObject = useSelector(selectSelectedObject)
  const brandColor = useSelector(selectBrandColor)
  const userColor = useSelector(selectUserColor)

  const handleColorChange = (value) => {
    setColorInput(getHexColor(value))
    setColor(value)
  }

  const handleColorInput = (event) => {
    try {
      setColorInput(event.target.value);
      const rgbaColor = getRgbaColor(event.target.value)
      setColor(rgbaColor)
    } catch (error) {
      console.log(error);
    }
  }

  const handleColorBtnClick = (rgba) => {
    setSelectedColor(undefined)
    getRGBAtoSet(rgba)
    setColor(getRGBAtoSet(rgba))
    setColorInput(getHexColor(getRGBAtoSet(rgba)))
  }

  const handleUserColorBtnClick = (rgba, index) => {
    setSelectedColor(index)
    getRGBAtoSet(rgba)
    setColor(getRGBAtoSet(rgba))
    setColorInput(getHexColor(getRGBAtoSet(rgba)))
  }

  const handleNewUserColor = (rgba) => {
    const keys = Object.keys(userColor);
    const lastKey = keys[keys.length - 1] || 0
    const newColor = { ...userColor, [Number(lastKey) + 1]: getRgbaCSS(rgba) }
    dispatch(updateUserColor(newColor))
  }

  const handleDeleteUserColor = () => {
    const filteredColors = Object.entries(userColor).reduce((result, [key, value]) => {
      if (key !== selectedColor) {
        result[key] = value;
      }
      return result;
    }, {});
    dispatch(updateUserColor(filteredColors))
    setSelectedColor(undefined)
  }

  const handleEyeDropper = () => {
    if ('EyeDropper' in window) {
      const dropper = new window.EyeDropper()
      dropper.open().then((result) => {
        setColor(getRgbaColor(result.sRGBHex));
        setSelectedColor(getRgbaColor(result.sRGBHex));
      })
    } else {
      alert('Eye Dropper Not Supported in your Browser Current Version.\nPlease Update your Browser to use this feature')
    }
  }

  useEffect(() => {
    if (title === 'Gradient') {
      const canvas = canvasContainer[selectedCanvas];
      if (canvas?.getActiveObject()) {
        const textObject = canvas?.getActiveObject();

        const existingFill = textObject.get('fill');

        // Check if the fill is a gradient
        if (existingFill && (existingFill.type === 'linear' || existingFill.type === 'radial')) {
          // Modify the color stops
          // existingFill.colorStops = [
          //   { offset: 0, color: getRgbaCSS(color) },
          //   // { offset: 0.5, color: 'red' },
          //   { offset: 1, color: getRgbaCSS(color) },
          // ];
          let colorChangeFill = existingFill;
          existingFill.colorStops[activeColorIndex] = { offset: existingFill?.colorStops[activeColorIndex]?.offset, color: getRgbaCSS(color) }
          colorChangeFill.colorStops[activeColorIndex] = { offset: existingFill?.colorStops[activeColorIndex]?.offset, color: getRgbaCSS(color) }
          textObject.set({
            styles: {
              0: {
                0: {
                  fill: existingFill,
                },
              },
            },
          })

          // console.log(existingFill)

          textObject.set({
            fill: existingFill,
          });
          // canvas.requestRenderAll();
          onColorChange(colorChangeFill.colorStops)
        }

        textObject.set('dirty', true);

        // Render the canvas
        canvas.requestRenderAll()
        render(selectedCanvas, canvasContainer)
      }

    } else if (title === 'DropShadow') {

      const canvas = canvasContainer[selectedCanvas];
      if (canvas?.getActiveObject()) {
        const activeObject = canvas?.getActiveObject();

        const existingShadow = activeObject?.get('shadow');

        if (existingShadow) {
          console.log('Shadow is applied to the text.');

          const existingShadow = activeObject.get('shadow')

          existingShadow.color = getRgbaCSS(color)

          activeObject.set(existingShadow)

          // console.log(existingShadow)
        }
        else {
          activeObject.set({
            shadow: new fabric.Shadow({
              color: getRgbaCSS(color),
              blur: 10,
              offsetX: 5,
              offsetY: 5,
            }),
          });
        }
        canvas.requestRenderAll();
      }
    } else if (title === 'Stroke') {

      const canvas = canvasContainer[selectedCanvas];
      if (canvas?.getActiveObject()) {
        const activeObject = canvas?.getActiveObject();

        const existingStroke = activeObject?.get('stroke');

        if (existingStroke) {
          console.log('Stroke is applied to the text.');

          activeObject.set({ stroke: getRgbaCSS(color) })

          // console.log(existingStroke)
        }
        else {
          activeObject.set({
            shadow: '#000',
          });
        }
        onColorChange(getRgbaCSS(color));

        canvas.requestRenderAll();
      }
    } else {
      if (color?.r === prevColor?.r && color?.g === prevColor?.g && color?.b === prevColor?.b && color?.a === prevColor?.a) {
        // Update the previous color
        // Perform other actions if needed
        return;
      } else {
        // console.log('Color changed:', color);
        setPrevColor(color);
      }

      if (color.r === 51 && color.g === 51 && color.b === 51 && color.a === 1) {
        if (!selectedObject) {
          setColor({ r: 51, g: 51, b: 51, a: 1 })
          // console.log('asansjx', canvasContainer[selectedCanvas].getBackgroundColor, "<-->")
        }
        else {
          if (selectedObject.type === 'Text') {
            // setColor({ r: 51, g: 51, b: 51, a: 1 })
          }
          else if (selectedObject.type === 'Shape') {
            // setColor({ r: 51, g: 51, b: 51, a: 1 })
          }
        }
        return;
      }

      if (color && !selectedObject) {
        // console.log("color: ", color)

        canvasContainer[selectedCanvas].setBackgroundColor(getRgbaCSS(color), render(selectedCanvas, canvasContainer))
      }
      else if (color && selectedObject) {
        if (selectedObject.type === 'Text') {
          // selectedObject.fill = getRgbaCSS(color);
          if (selectedObject.selectionStart !== selectedObject.selectionEnd) {
            // Prepare new styles for the selected characters
            let newStyles = {
              fill: getRgbaCSS(color) // Change the fill color to blue (replace 'blue' with your desired color)
            };

            // Apply new styles to the selected range
            selectedObject.setSelectionStyles(newStyles, selectedObject.selectionStart, selectedObject.selectionEnd);
          }
          else {
            if (selectedObject?.textLines?.length > 0) {
              let newStyles = {
                fill: getRgbaCSS(color) // Change the fill color to blue (replace 'blue' with your desired color)
              };
              selectedObject.setSelectionStyles(newStyles, 0, selectedObject?.text?.length);

            }
            selectedObject.set({ fill: getRgbaCSS(color) })
          }
          canvasContainer[selectedCanvas].requestRenderAll()
          render(selectedCanvas, canvasContainer)
        }
        if (selectedObject.type === 'Shape') {
          // selectedObject.fill = getHexColor((color));;
          selectedObject.set({ fill: getHexColor(color) });
          // if (selectedObject.selectionStart !== selectedObject.selectionEnd) {
          // for (let i = selectedObject.selectionStart; i < selectedObject.selectionEnd; i++) {
          //   selectedObject.styles[0][i] = {
          //     fill: getRGBAtoSet(color),
          //   };
          //   }
          // }
          // selectedObject.styles = {
          //   0: {
          //     fill: getRgbaCSS(color),
          //   }
        };
        canvasContainer[selectedCanvas].renderAll()
        // selectedObject.renderAll();
        render(selectedCanvas, canvasContainer)
      }
    }

  }, [canvasContainer, color, selectedCanvas])

  return (
    <div className="color-picker">
      <RgbaColorPicker color={color} onChange={handleColorChange} />
      <div className="color-picker__different">
        <div className="color-picker__different-color" />
        <div
          className="color-picker__different-color"
          style={{ backgroundColor: getRgbaCSS(color) }}
        />
      </div>
      <div className="color-picker__input">
        <p className="color-picker__input-title">HEX</p>
        <div style={{ position: "relative" }}>
          <input
            id="rc-editable-input-1"
            spellCheck="false"
            value={colorInput}
            onChange={(handleColorInput)}
            onBlur={() => setColorInput(getHexColor(color))}
          />
        </div>
      </div>
      <button type="button" className="btn btn_icon color-picker__eye-dropper" onClick={handleEyeDropper}>
        <svg className="icon v1-icon v1-icon-eye-dropper">
          <use href="#v1-icon-eye-dropper" xlinkHref="#v1-icon-eye-dropper" />
        </svg>
        <span className="btn__text" />
      </button>
      <div className="color-picker__color-palette">
        <p className="color-picker__color-list-title sidebar__tool-title">
          Standard Colors
        </p>
        <div className="color-picker__color-list">
          {Object.keys(standardColor).map((index) => (
            <i
              key={index}
              className="color-picker__color-item"
              onClick={() => handleColorBtnClick(standardColor[index])}
              style={{
                backgroundColor: standardColor[index],
              }}
            />
          ))}
        </div>
      </div>
      <div className="color-picker__color-palette">
        <p className="color-picker__color-list-title sidebar__tool-title">
          Brand Colors
        </p>
        <div className="color-picker__color-list">
          {Object.keys(brandColor).map((index) => (
            <i
              key={index}
              className="color-picker__color-item"
              onClick={() => handleColorBtnClick(brandColor[index])}
              style={{
                backgroundColor: brandColor[index],
              }}
            />
          ))}
        </div>
      </div>
      <div className="mb-2 color-picker__color-palette">
        <p className="color-picker__color-list-title sidebar__tool-title">
          User Colors
        </p>
        <div className="color-picker__color-list">
          <button className="color-picker__button" onClick={() => handleNewUserColor(color)}>
            <Icon icon="grommet-icons:add-circle" className="font-icon-black" />
          </button>
          {Object.keys(userColor).length > 0 && <button className="color-picker__button" onClick={handleDeleteUserColor}>
            <Icon icon="uiw:delete" className="font-icon-black" style={selectedColor ? { color: '#ff0000' } : {}} />
          </button>}
          {Object.keys(userColor).map((index) => (
            <i
              key={index}
              className="color-picker__color-item"
              onClick={() => handleUserColorBtnClick(userColor[index], index)}
              style={{
                backgroundColor: userColor[index],
              }}
            />
          ))}
        </div>
      </div>
    </div>

  )
}

export default BackgroundColorPicker;