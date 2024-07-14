import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { getCanvasRef } from '../../../../shared/utils/fabric';
import { useSelector } from 'react-redux';
import { selectSelectedCanvas, selectSelectedObject } from '../../../../store/app/Edit/Canvas/canvas';
import { fabric } from 'fabric'
import flipIcon from '../../../../assets/icons/flip-reflect-icon.png'

import horizontalCenterIcon from '../../../../assets/icons/horizontal-center.png'
import horizontalLeftIcon from '../../../../assets/icons/horizontal-left.png'
import horizontalRightIcon from '../../../../assets/icons/horizontal-right.png'
import verticalCenterIcon from '../../../../assets/icons/vertical-center.png'
import verticalDownIcon from '../../../../assets/icons/vertical-down.png'
import { toast } from 'react-toastify';

const TransformModule = () => {

  const canvasContainer = getCanvasRef() || [];
  const selectedCanvas = useSelector(selectSelectedCanvas);
  const selectedObject = useSelector(selectSelectedObject)
  // State variables for Line Spacing, Letter Spacing, and Rotate
  const [lineSpacing, setLineSpacing] = useState(1);
  const [letterSpacing, setLetterSpacing] = useState(100);
  const [horizontalScale, setHorizontalScale] = useState(0);
  const [verticalScale, setVerticalScale] = useState(0);
  const [rotate, setRotate] = useState(0);

  const [isLockScaling, setIsLockScaling] = useState(true)

  const handleLineSpacing = (spacing) => {
    setLineSpacing(spacing);
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      // console.log(spacing)
      const textObject = canvas?.getActiveObject();
      textObject.set({ lineHeight: spacing });
      canvas.requestRenderAll();
    }
  }

  const handleLetterSpacing = (spacing) => {
    setLetterSpacing(spacing);
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      // console.log(spacing)
      const textObject = canvas?.getActiveObject();
      textObject.set({ charSpacing: spacing });
      canvas.requestRenderAll();
    }
  }

  const handleRotate = (rotate) => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      // console.log(rotate)
      const textObject = canvas?.getActiveObject();

      if (textObject.isAdminLocked) {
        toast.info('Locked by Admin.');
        return;
      }

      setRotate(rotate);
      textObject.set({ angle: rotate });
      canvas.requestRenderAll();
    }
  }

  const handleHorizontalScale = (value) => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas?.getActiveObject();
      if (textObject.isAdminLocked) {
        toast.info('Locked by Admin.');
        return;
      }
      setHorizontalScale(value);
      textObject.set({ scaleX: value / 10 });
      if (isLockScaling) {
        textObject.set({ scaleY: value / 10 })
        setVerticalScale(value);
      }
      canvas.requestRenderAll();
    }
  }

  const handleVerticalScale = (value) => {
    const canvas = canvasContainer[selectedCanvas];
    if (canvas?.getActiveObject()) {
      const textObject = canvas?.getActiveObject();

      if (textObject.isAdminLocked) {
        toast.info('Locked by Admin.');
        return;
      }

      setVerticalScale(value);
      textObject.set({ scaleY: value / 10 });
      if (isLockScaling) {
        textObject.set({ scaleX: value / 10 })
        setHorizontalScale(value);
      }
      canvas.requestRenderAll();
    }
  }

  const handleToggleLockScaling = () => {
    setIsLockScaling(!isLockScaling);
  }

  const handleDuplicate = () => {
    const canvas = canvasContainer[selectedCanvas];

    if (canvas?.getActiveObject()) {
      const activeObject = canvas?.getActiveObject();

      if (activeObject?.type === 'Text') {
        // Clone Textbox
        const clonedObject = new fabric.Textbox(activeObject.text, {
          ...activeObject.toObject(),
          left: activeObject.left + 10,
          top: activeObject.top + 10,
        });

        canvas?.add(clonedObject);
      }

      if (activeObject?.type === 'Shape' || activeObject?.type === 'Image') {
        // Duplicate Shape (SVG)
        const activeObject = canvas?.getActiveObject();

        if (activeObject) {
          activeObject.clone(function (clone) {
            canvas.add(clone.set({
              left: activeObject.left + 10,
              top: activeObject.top + 10
            }));
          });
          canvas?.renderAll();
        }
      }
      canvas?.requestRenderAll();
    }
  };

  const handleFlip = (value) => {
    const canvas = canvasContainer[selectedCanvas];

    if (canvas?.getActiveObject()) {
      const textObject = canvas?.getActiveObject();

      if (value === 'X') {
        // console.log(!textObject.flipX)
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

  useEffect(() => {
    const canvas = canvasContainer[selectedCanvas];

    if (canvas?.getActiveObject()) {
      const activeObject = canvas?.getActiveObject();

      if (activeObject?.lineHeight) {
        setLineSpacing(activeObject?.lineHeight)
      }

      if (activeObject?.charSpacing) {
        setLetterSpacing(activeObject?.charSpacing)
      }

      if (activeObject?.scaleX) {
        setHorizontalScale(activeObject?.scaleX * 10)
      }
      if (activeObject?.scaleY) {
        setVerticalScale(activeObject?.scaleY * 10)
      }
      if (activeObject?.angle) {
        setRotate(activeObject?.angle)
      } else {
        setRotate(0)
      }

      canvas.requestRenderAll();
    }
  }, [selectedObject])

  return (
    <>
      <div className="sidebar__tool-title">Transform</div>

      {
        selectedObject?.type === 'Text' ?
          <>
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
                <input
                  inputMode="numeric"
                  className="simple-input slider-box__input"
                  type="text"
                  onChange={(e) => handleRotate(e.target.value)}
                  value={rotate}
                />
              </div>
            </div>
          </> :
          <>
            <label className="toggle sidebar__toggle">
              <input type="checkbox" className="toggle__input" checked={isLockScaling} onChange={handleToggleLockScaling} />
              <span className="toggle__background">
                <span className="toggle__dot"></span>
              </span>
              <span className="toggle__label">
                <span>Lock Uni Scaling</span>
              </span>
            </label>
            <div className="slider-box__hokeys-wrapper">
              <div className="slider-box">
                <p className="slider-box__title">Horizontal Scale</p>
                <Slider
                  min={0.01}
                  max={5}
                  step={0.01}
                  value={horizontalScale}
                  onChange={(value) => handleHorizontalScale(value)}
                />
                <input
                  inputMode="numeric"
                  className="simple-input slider-box__input"
                  type="text"
                  onChange={(e) => handleHorizontalScale(e.target.value)}
                  value={horizontalScale} />
              </div>
            </div>

            <div className="slider-box__hokeys-wrapper">
              <div className="slider-box">
                <p className="slider-box__title">Vertical Scale</p>
                <Slider
                  min={0.01}
                  max={5}
                  step={0.01}
                  value={verticalScale}
                  onChange={(value) => handleVerticalScale(value)}
                />
                <input
                  inputMode="numeric"
                  className="simple-input slider-box__input"
                  type="text"
                  onChange={(e) => handleVerticalScale(e.target.value)}
                  value={verticalScale} />
              </div>
            </div>

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
                <input
                  inputMode="numeric"
                  className="simple-input slider-box__input"
                  type="text"
                  onChange={(e) => handleRotate(e.target.value)}
                  value={rotate} />
              </div>
            </div>
          </>
      }

      <div className="sidebar__tool-title mt-2">Tools</div>
      <div className="transform-module__button-set">
        <div className="tool-button" data-tooltip='Duplicate' onClick={handleDuplicate}>
          <FontAwesomeIcon icon="fa-solid fa-clone" />
        </div>
        <div className="tool-button" data-tooltip='Flip Horizontally' onClick={() => handleFlip('X')}>
          <img src={flipIcon} alt="Flip Horizontal" style={{ width: '20px', opacity: 0.72 }} />
        </div>
        <div className="tool-button" data-tooltip='Flip Vertically' onClick={() => handleFlip('Y')}>
          <img src={flipIcon} alt="Flip Horizontal" style={{ width: '20px', opacity: 0.72, transform: 'rotate(90deg)' }} />
        </div>
      </div>

      <div className="sidebar__tool-title mt-3">Alignment</div>
      <p className="sidebar__tool-sub-title">Align to Artboard</p>

      <div className="transform-module__button-set">
        <div className="tool-button" data-tooltip='Left' onClick={() => handleAlignment('left')}>
          <img src={horizontalLeftIcon} alt="" style={{ width: '20px', opacity: 0.72 }} />
        </div>
        <div className="tool-button" data-tooltip='Horizontal Center' onClick={() => handleAlignment('centerH')}>
          <img src={horizontalCenterIcon} alt="" style={{ width: '20px', opacity: 0.72 }} />
        </div>
        <div className="tool-button" data-tooltip='Right' onClick={() => handleAlignment('right')}>
          <img src={horizontalRightIcon} alt="" style={{ width: '20px', opacity: 0.72 }} />
        </div>
        <div className="tool-button" data-tooltip='Top' onClick={() => handleAlignment('up')}>
          <img src={horizontalLeftIcon} alt="" style={{ width: '20px', opacity: 0.72, transform: 'rotate(90deg)' }} />
        </div>
        <div className="tool-button" data-tooltip='Vertical Center' onClick={() => handleAlignment('centerV')}>
          <img src={verticalCenterIcon} alt="" style={{ width: '20px', opacity: 0.72 }} />
        </div>
        <div className="tool-button" data-tooltip='Bottom' onClick={() => handleAlignment('down')}>
          <img src={verticalDownIcon} alt="" style={{ width: '20px', opacity: 0.72 }} />
        </div>
      </div>
    </>
  );
};

export default TransformModule;
