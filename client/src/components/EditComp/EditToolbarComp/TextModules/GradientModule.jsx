import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { getCanvasRef } from '../../../../shared/utils/fabric';
import { useSelector } from 'react-redux';
import { selectSelectedCanvas } from '../../../../store/app/Edit/Canvas/canvas';
import { fabric } from 'fabric'
import BackgroundColorPicker from '../../EditSideBarComp/EditSettingModule/BackgroundColorPicker';

const GradientModule = () => {

    const canvasContainer = getCanvasRef() || [];
    const selectedCanvas = useSelector(selectSelectedCanvas);
    // State variables for Line Spacing, Letter Spacing, and Rotate

    const [opacity, setOpacity] = useState(0);
    const [horizontalOffset, setHorizontalOffset] = useState(0);
    const [verticalOffset, setVerticalOffset] = useState(0);
    const [fromX, setFromX] = useState(0);
    const [fromY, setFromY] = useState(0);
    const [toX, setToX] = useState(0);
    const [toY, setToY] = useState(0);
    const [isChecked, setChecked] = useState(false);

    const handleToggle = () => {
        setChecked(!isChecked);
    };

    const handleOpacityChange = (value) => {
        setOpacity(value);
    };
    const handleHorizontalOffsetChange = (value) => {
        setHorizontalOffset(value);
    };
    const handleVerticalOffsetChange = (value) => {
        setVerticalOffset(value);
    };
    const handleFromXChange = (value) => {
        setFromX(value);
    };
    const handleFromYChange = (value) => {
        setFromY(value);
    };
    const handleToXChange = (value) => {
        setToX(value);
    };
    const handleToYChange = (value) => {
        setToY(value);
    };



    // const handleLineSpacing = (spacing) => {
    //     setLineSpacing(spacing);
    //     const canvas = canvasContainer[selectedCanvas];
    //     if (canvas?.getActiveObject()) {
    //         console.log(spacing)
    //         const textObject = canvas?.getActiveObject();
    //         textObject.set({ lineHeight: spacing });
    //         canvas.requestRenderAll();
    //     }
    // }

    // const handleLetterSpacing = (spacing) => {
    //     setLetterSpacing(spacing);
    //     const canvas = canvasContainer[selectedCanvas];
    //     if (canvas?.getActiveObject()) {
    //         console.log(spacing)
    //         const textObject = canvas?.getActiveObject();
    //         textObject.set({ charSpacing: spacing });
    //         canvas.requestRenderAll();
    //     }
    // }

    // const handleRotate = (rotate) => {
    //     setRotate(rotate);
    //     const canvas = canvasContainer[selectedCanvas];
    //     if (canvas?.getActiveObject()) {
    //         console.log(rotate)
    //         const textObject = canvas?.getActiveObject();
    //         textObject.set({ angle: rotate });
    //         canvas.requestRenderAll();
    //     }
    // }

    const handleLinearGradient = () => {

    }

    const handleRadialGradient = () => {

    }

    const handleSaveGradient = () => {

    }

    const handleDeleteGradient = () => {

    }


    return (


        <>
            <div class="sidebar-module__divider"></div>
            <label className={`toggle ${isChecked ? 'toggle-gradient' : ''}`}>
                <input type="checkbox" className="toggle__input" checked={isChecked} onChange={handleToggle} />
                <span className="toggle__background">
                    <span className="toggle__dot"></span>
                </span>
                <span className={`toggle__label ${isChecked ? 'toggle-gradient__label' : ''}`}>
                    <span>Gradient</span>
                </span>
            </label>
            <div class="sidebar-module__divider"></div>
            {
                isChecked && (
                    <>
                        <BackgroundColorPicker title={'Gradient'} />

                        <div className="gradient-controls mb-2 mt-3">
                            <div className="gradient-controls__title">New gradient</div>
                            <div className="gradient-controls__container">
                                <div className="tool-button" data-tooltip='Linear Gradient' onClick={handleLinearGradient}>
                                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                                </div>
                                <div className="tool-button" data-tooltip='Radial Gradient' onClick={handleRadialGradient}>
                                    <FontAwesomeIcon icon="fa-regular fa-circle-dot" />
                                </div>
                                <div className="gradient-controls__divider"></div>
                                <div className="tool-button" data-tooltip='Save' onClick={handleSaveGradient}>
                                    <FontAwesomeIcon icon="fa-regular fa-floppy-disk" />
                                </div>
                                <div className="tool-button" data-tooltip='Delete' onClick={handleDeleteGradient}>
                                    <svg className="icon v2-icon v2-icon-trash tool-button__icon gradient-controls__icon gradient-controls__icon-trash">
                                        <use href="#v2-icon-trash" xlinkHref="#v2-icon-trash"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="gradient-module__gradient_border"></div>
                        <div className="gradient-module__gradient mb-4" style={{ background: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 100%)' }}>
                            <div className="gradient-module__container">
                                <div className="gradient-module__point" style={{ left: '-6px', background: 'rgb(255, 255, 255)' }}></div>
                                <div className="gradient-module__point gradient-module__point_active" style={{ left: '280px', background: 'rgb(0, 0, 0)' }}></div>
                            </div>
                        </div>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Opacity</p>
                                <Slider
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={opacity}
                                    onChange={handleOpacityChange}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    value={opacity + '%'}
                                />
                            </div>
                        </div>
                        <div className="sidebar__tool-title">Gradient Settings</div>

                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Horizontal offset</p>
                                <Slider
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    value={horizontalOffset}
                                    onChange={handleHorizontalOffsetChange}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    value={`${Math.round(horizontalOffset * 100)}%`}
                                />
                            </div>
                        </div>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Vertical offset</p>
                                <Slider
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    value={verticalOffset}
                                    onChange={handleVerticalOffsetChange}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    value={`${Math.round(verticalOffset * 100)}%`}
                                />
                            </div>
                        </div>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">From X</p>
                                <Slider
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    value={fromX}
                                    onChange={handleFromXChange}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    value={`${Math.round(fromX * 100)}%`}
                                />
                            </div>
                        </div>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">From Y</p>
                                <Slider
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    value={fromY}
                                    onChange={handleFromYChange}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    value={`${Math.round(fromY * 100)}%`}
                                />
                            </div>
                        </div>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">To X</p>
                                <Slider
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    value={toX}
                                    onChange={handleToXChange}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    value={`${Math.round(toX * 100)}%`}
                                />
                            </div>
                        </div>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">To Y</p>
                                <Slider
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    value={toY}
                                    onChange={handleToYChange}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    value={`${Math.round(toY * 100)}%`}
                                />
                            </div>
                        </div>

                    </>
                )}
        </>
    );
};

export default GradientModule;
