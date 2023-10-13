// ** Import Libraries
import React, { useEffect, useState } from "react";
import {RgbaColorPicker} from 'react-colorful'

// ** Import Utils
import { getRgbaCSS, getHexColor, getRgbaColor, getRGBAtoSet } from "../../../../utils/color";
import { render } from "../../../../utils/fabric";

// ** Icon
import { Icon } from "@iconify/react";

// ** Store
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectBrandColor, selectStandardColor, selectUserColor } from "../../../../store/app/Edit/EditSidebar/EditSetting/background";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import {updateUserColor} from "../../../../store/app/Edit/EditSidebar/EditSetting/background"
import { selectCanvasContainer, selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas";

function BackgroundColorPicker() {
  // ** State
  const [selectedColor , setSelectedColor] = useState(undefined)
  const [color, setColor] = useState({ r: 51, g: 51, b: 51, a: 1 })
  const [colorInput, setColorInput] = useState(getHexColor(color))

  // ** Hooks
  const dispatch = useDispatch()
  const selectedCanvas = useSelector(selectSelectedCanvas)
  const canvasContainer = useSelector(selectCanvasContainer)
  const standardColor = useSelector(selectStandardColor)
  const brandColor = useSelector(selectBrandColor)
  const userColor = useSelector(selectUserColor)
  
  const handleColorChange = (value) => {
    setColorInput(getHexColor(value ))
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

  const handleUserColorBtnClick = (rgba,index) => {
    setSelectedColor(index)
    getRGBAtoSet(rgba)
    setColor(getRGBAtoSet(rgba))
    setColorInput(getHexColor(getRGBAtoSet(rgba))) 
  }

  const handleNewUserColor = (rgba) => {
    const keys = Object.keys(userColor);
    const lastKey = keys[keys.length - 1] || 0
    const newColor = {...userColor,[Number(lastKey)+1]:getRgbaCSS(rgba)}
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
    if('EyeDropper' in window){
      const dropper = new window.EyeDropper()
      dropper.open().then((result) => {
        setColor(getRgbaColor(result.sRGBHex));
        setSelectedColor(getRgbaColor(result.sRGBHex));
      })
    }else{
      alert('Eye Dropper Not Supported in your Browser Current Version.\nPlease Update your Browser to use this feature')
    }
  }

  

  return (
    <div className="color-picker">
      <RgbaColorPicker color={color} onChange={handleColorChange}/>
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
            <Icon icon="grommet-icons:add-circle" className="font-icon-black"/>
          </button>
          {Object.keys(userColor).length > 0 && <button className="color-picker__button" onClick={handleDeleteUserColor}>
          <Icon icon="uiw:delete" className="font-icon-black" style={selectedColor ? { color: '#ff0000' } : {}} />
          </button>}
          {Object.keys(userColor).map((index) => (
          <i
            key={index}
            className="color-picker__color-item"
            onClick={() => handleUserColorBtnClick(userColor[index],index)}
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