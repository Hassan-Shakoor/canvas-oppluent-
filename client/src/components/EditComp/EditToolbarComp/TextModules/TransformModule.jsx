import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { getCanvasRef } from '../../../../shared/utils/fabric';
import { useSelector } from 'react-redux';
import { selectSelectedCanvas } from '../../../../store/app/Edit/Canvas/canvas';
import { fabric } from 'fabric'

const TransformModule = () => {

  const canvasContainer = getCanvasRef() || [];
  const selectedCanvas = useSelector(selectSelectedCanvas);
  // State variables for Line Spacing, Letter Spacing, and Rotate
  const [lineSpacing, setLineSpacing] = useState(1);
  const [letterSpacing, setLetterSpacing] = useState(100);
  const [rotate, setRotate] = useState(0);

  const handleLineSpacing = (spacing) => {
    setLineSpacing(spacing);
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      console.log(spacing)
      const textObject = canvas?.getActiveObject();
      textObject.set({ lineHeight: spacing });
      canvas.requestRenderAll();
    }
  }

  const handleLetterSpacing = (spacing) => {
    setLetterSpacing(spacing);
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      console.log(spacing)
      const textObject = canvas?.getActiveObject();
      textObject.set({ charSpacing: spacing });
      canvas.requestRenderAll();
    }
  }

  const handleRotate = (rotate) => {
    setRotate(rotate);
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      console.log(rotate)
      const textObject = canvas?.getActiveObject();
      textObject.set({ angle: rotate });
      canvas.requestRenderAll();
    }
  }

  const handleDuplicate = () => {
    const canvas = canvasContainer[selectedCanvas];

    if (canvas?.getActiveObject() instanceof fabric.Textbox) {
      const textObject = canvas?.getActiveObject();

      // Clone the textObject
      const clonedTextObject = new fabric.Textbox(textObject.text, {
        ...textObject,
        left: textObject.left + 10, // Example: Add an offset to avoid overlap
        top: textObject.top + 10, // Example: Add an offset to avoid overlap
      });
      canvas.add(clonedTextObject);
      canvas.setActiveObject(clonedTextObject);
      canvas.requestRenderAll();
    }
  };

  const handleFlip = (value) => {
    const canvas = canvasContainer[selectedCanvas];

    if (canvas?.getActiveObject() instanceof fabric.Textbox) {
      const textObject = canvas?.getActiveObject();

      if (value === 'X') {
        console.log(!textObject.flipX)
        textObject.set({ flipX: !textObject.flipX });
      } else if (value === 'Y') {
        textObject.set({ flipY: !textObject.flipY });
      }

      canvas.requestRenderAll();
    }
  };

  const handleAlignment = (direction) => {
    const canvas = canvasContainer[selectedCanvas];

    const activeObject = canvas?.getActiveObject();

    if (activeObject) {
      switch (direction) {
        case 'left':
          activeObject.set({ left: 0 });
          break;
        case 'centerH':
          activeObject.centerH();
          break;
        case 'right':
          activeObject.set({ left: canvas.width - activeObject.width });
          break;
        case 'up':
          activeObject.set({ top: 0 });
          break;
        case 'centerV':
          activeObject.centerV();
          break;
        case 'down':
          activeObject.set({ top: canvas.height - activeObject.height });
          break;
        default:
          break;
      }

      canvas.requestRenderAll();
    }
  }

  return (
    <>
      <div className="sidebar__tool-title">Transform</div>

      <div className="slider-box__hokeys-wrapper">
        <div className="slider-box">
          <p className="slider-box__title">Line Spacing</p>
          <Slider
            min={0.1}
            max={5}
            step={0.1}
            value={lineSpacing}
            onChange={(value) => handleLineSpacing(value)}
          />
          <input inputMode="numeric" className="simple-input slider-box__input" type="text" value={lineSpacing} />
        </div>
      </div>

      {/* Letter Spacing */}
      <div className="slider-box__hokeys-wrapper">
        <div className="slider-box">
          <p className="slider-box__title">Letter Spacing</p>
          <Slider
            min={-100}
            max={1000}
            step={1}
            value={letterSpacing}
            onChange={(value) => handleLetterSpacing(value)}
          />
          <input inputMode="numeric" className="simple-input slider-box__input" type="text" value={letterSpacing} />
        </div>
      </div>

      {/* Rotate */}
      <div className="slider-box__hokeys-wrapper">
        <div className="slider-box">
          <p className="slider-box__title">Rotate</p>
          <Slider
            min={0}
            max={360}
            step={1}
            value={rotate}
            onChange={(value) => handleRotate(value)}
          />
          <input inputMode="numeric" className="simple-input slider-box__input" type="text" value={`${rotate}°`} />
        </div>
      </div>

      <div class="sidebar__tool-title mt-2">Tools</div>
      <div className="transform-module__button-set">
        <div className="tool-button" data-tooltip='Duplicate' onClick={handleDuplicate}>
          <FontAwesomeIcon icon="fa-solid fa-clone" />
        </div>
        <div className="tool-button" data-tooltip='Flip Horizontally' onClick={() => handleFlip('X')}>
          <i className="icon tool-button__icon icon-designer-reflect-horizontal"></i>
        </div>
        <div className="tool-button" data-tooltip='Flip Vertically' onClick={() => handleFlip('Y')}>
          <i className="icon tool-button__icon icon-designer-reflect-vertical"></i>
        </div>
      </div>

      <div class="sidebar__tool-title mt-3">Alignment</div>
      <p class="sidebar__tool-sub-title">Align to Artboard</p>

      <div className="transform-module__button-set">
        <div className="tool-button" data-tooltip='Left' onClick={() => handleAlignment('left')}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </div>
        <div className="tool-button" data-tooltip='Horizontal Center' onClick={() => handleAlignment('centerH')}>
          <FontAwesomeIcon icon={faAlignCenter} />
        </div>
        <div className="tool-button" data-tooltip='Right' onClick={() => handleAlignment('right')}>
          <FontAwesomeIcon icon={faAlignRight} />
        </div>
        {/* <div className="tool-button" data-tooltip='Top' onClick={() => handleAlignment('up')}>
          <FontAwesomeIcon icon={faAlign} />
        </div>
        <div className="tool-button" data-tooltip='Vertical Center' onClick={() => handleAlignment('centerV')}>
          <FontAwesomeIcon icon={faAlignCenterV} />
        </div>
        <div className="tool-button" data-tooltip='Bottom' onClick={() => handleAlignment('down')}>
          <FontAwesomeIcon icon={faAlignDown} />
        </div> */}
      </div>
    </>
  );
};

export default TransformModule;
