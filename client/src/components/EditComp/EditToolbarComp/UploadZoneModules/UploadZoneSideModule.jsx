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

const UploadZoneSideModule = () => {

    const canvasContainer = getCanvasRef() || [];
    const selectedCanvas = useSelector(selectSelectedCanvas);
    const selectedObject = useSelector(selectSelectedObject)
    // State variables for Line Spacing, Letter Spacing, and Rotate
    const [horizontalPosition, setHorizontalPosition] = useState(0);
    const [verticalPosition, setVerticalPosition] = useState(0);
    const [rotate, setRotate] = useState(0);
    const [scalePattern, setScalePattern] = useState(1);

    const handleRotate = (rotate) => {
        setRotate(rotate);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const selectedObject = canvas?.getActiveObject();
            if (selectedObject?.type === 'Shape' && selectedObject.fill instanceof fabric.Pattern) {
                selectedObject.dirty = true;
                console.log('first')
                const source = selectedObject.fill.source;
                source.angle = rotate
                selectedObject.fill.source = source;
                canvas.renderAll();
            }
        }
    }

    const handleScalePattern = (scale) => {
        setScalePattern(scale);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const selectedObject = canvas?.getActiveObject();
            if (selectedObject?.type === 'Shape' && selectedObject.fill instanceof fabric.Pattern) {
                selectedObject.dirty = true;

                const source = selectedObject.fill?.source;
                // selectedObject.fill.scaleY = scale;
                canvas.renderAll();
            }
        }
    };

    const handleHorizontalPosition = (value) => {
        setHorizontalPosition(value);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const selectedObject = canvas?.getActiveObject();
            if (selectedObject?.type === 'Shape' && selectedObject.fill instanceof fabric.Pattern) {
                selectedObject.dirty = true;
                const offsetX = value;
                selectedObject.fill.offsetX = offsetX;
                canvas.renderAll();
                canvas.requestRenderAll();
            }
        }
    };

    const handleVerticalPosition = (value) => {
        setVerticalPosition(value);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const selectedObject = canvas?.getActiveObject();
            if (selectedObject?.type === 'Shape' && selectedObject.fill instanceof fabric.Pattern) {
                selectedObject.dirty = true;
                const offsetY = value;
                selectedObject.fill.offsetY = offsetY;
                canvas.renderAll();
                canvas.requestRenderAll();
            }
        }
    };


    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas];

        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            if (activeObject?.fill?.offsetX) {
                setHorizontalPosition(activeObject?.fill?.offsetX)
            }
            if (activeObject?.fill.offsetY) {
                setVerticalPosition(activeObject?.fill?.offsetX)
            }
            // if (activeObject?.angle) {
            //     setRotate(activeObject?.angle)
            // } else {
            //     setRotate(0)
            // }

            canvas.requestRenderAll();
        }
    }, [selectedObject])

    return (
        <>
            <div className="sidebar__tool-title">Upload Zone</div>

            {
                (selectedObject?.type === 'Shape' && selectedObject.fill instanceof fabric.Pattern) && (
                    <>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Horizontal Position</p>
                                <Slider
                                    min={selectedObject.width ? -(selectedObject.width) : -400}
                                    max={200}
                                    step={1}
                                    value={horizontalPosition}
                                    onChange={(value) => handleHorizontalPosition(value)}
                                />
                                <input inputMode="numeric" className="simple-input slider-box__input" type="text" value={horizontalPosition} />
                            </div>
                        </div>

                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Vertical Position</p>
                                <Slider
                                    min={selectedObject.height ? -(selectedObject.height) : -400}
                                    max={200}
                                    step={1}
                                    value={verticalPosition}
                                    onChange={(value) => handleVerticalPosition(value)}
                                />
                                <input inputMode="numeric" className="simple-input slider-box__input" type="text" value={verticalPosition} />
                            </div>
                        </div>

                        {/* <div className="slider-box__hokeys-wrapper">
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

                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Scale</p>
                                <Slider
                                    min={0.01}
                                    max={4}
                                    step={0.01}
                                    value={scalePattern}
                                    onChange={(value) => handleScalePattern(value)}
                                />
                                <input inputMode="numeric" className="simple-input slider-box__input" type="text" value={`${scalePattern}`} />
                            </div>
                        </div> */}
                    </>)}
        </>
    );
};

export default UploadZoneSideModule;
