// ** Import Library
import rgbHex from 'rgb-hex'
import hexRgb from 'hex-rgb'

// convert { r: 200, g: 150, b: 35, a: 1 } format to rgba(r,g,b,a)
export const getRgbaCSS = (rgba) => {
    const {r,g,b,a} = rgba
    return `rgba(${r},${g},${b},${a})`
  }

//   convert rgba to hex
export const getHexColor = (rgba) => {
    const string = Array.from(Object.values(rgba)).join(",");
    const rgbaColor = "rgba("+string+")";
    return '#' + rgbHex(rgbaColor)
}

// convert hex to rgba
export const getRgbaColor = (hex) => {
    const {red:r , green:g ,blue:b , alpha:a} = hexRgb(hex)
    return {r,g,b,a}
}

// convert rgba to { r: 200, g: 150, b: 35, a: 1 }
export const getRGBAtoSet = (rgba) => {
    const colorValues = rgba.substring(5, rgba.length - 1).split(",");
    const [r,g,b,a] = colorValues
    const color = ({r:parseFloat(r),g:parseFloat(g),b:parseFloat(b),a:parseFloat(a)});
    return color
}