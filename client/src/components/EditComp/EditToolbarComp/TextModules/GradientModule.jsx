import React, { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { getCanvasRef } from '../../../../shared/utils/fabric';
import { useSelector } from 'react-redux';
import { selectSelectedCanvas, selectSelectedObject } from '../../../../store/app/Edit/Canvas/canvas';
import { fabric } from 'fabric'
import BackgroundColorPicker from '../../EditSideBarComp/EditSettingModule/BackgroundColorPicker';

const GradientModule = () => {

    const canvasContainer = getCanvasRef() || [];
    const selectedCanvas = useSelector(selectSelectedCanvas);
    const selectedObject = useSelector(selectSelectedObject);
    // State variables for Line Spacing, Letter Spacing, and Rotate

    const [opacity, setOpacity] = useState(0);
    const [horizontalOffset, setHorizontalOffset] = useState(0);
    const [verticalOffset, setVerticalOffset] = useState(0);
    const [fromX, setFromX] = useState(0);
    const [fromY, setFromY] = useState(0);
    const [toX, setToX] = useState(0);
    const [toY, setToY] = useState(0);
    const [isChecked, setChecked] = useState(false);

    const [colorStops, setColorStops] = useState([])

    const [activePointIndex, setActivePointIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [activeGradient, setActiveGradient] = useState('linear')
    const gradientContainerRef = useRef(null);

    const gradientContainerWidth = gradientContainerRef.current
        ? gradientContainerRef.current.offsetWidth
        : 0;

    const updateGradientInCanvas = (newColorStops) => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            const existingFill = activeObject.get('fill');

            if (existingFill && existingFill.type === 'linear') {
                existingFill.colorStops = newColorStops;

                activeObject.set({
                    fill: existingFill,
                });

                canvas.requestRenderAll();
            }
        }
    };


    const handleToggle = () => {

        if (isChecked) {
            const canvas = canvasContainer[selectedCanvas];
            if (canvas?.getActiveObject()) {
                const activeObject = canvas?.getActiveObject();
                const existingFill = activeObject.get('fill');

                if (existingFill && (existingFill.type === 'linear' || existingFill.type === 'radial')) {

                    activeObject.set({
                        fill: '#000',
                        styles: []
                    });

                    canvas.requestRenderAll();
                }
            }
        } else {
            handleLinearGradient();
        }

        setChecked(!isChecked);

    };

    const handleOpacityChange = (value) => {
        setOpacity(value);
    };



    const handleHorizontalOffsetChange = (value) => {
        setHorizontalOffset(value);
    }
    const handleVerticalOffsetChange = (value) => {
        setVerticalOffset(value);
    };
    const handleFromXChange = (value) => {
        setFromX(value);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();

            const existingFill = activeObject.get('fill');

            // Check if the fill is a gradient
            console.log(value)
            if (existingFill && existingFill.type === 'linear') {
                // Modify the color stops
                existingFill.coords = {
                    ...existingFill.coords,
                    x1: value,
                }


                activeObject.set({
                    fill: existingFill,
                });
                canvas.requestRenderAll();
            }
        }
    };
    const handleFromYChange = (value) => {
        setFromY(value);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();

            const existingFill = activeObject.get('fill');

            // Check if the fill is a gradient
            if (existingFill && existingFill.type === 'linear') {
                // Modify the color stops
                existingFill.coords = {
                    ...existingFill.coords,
                    y1: value,
                }

                console.log(existingFill)

                activeObject.set({
                    fill: existingFill,
                });
                canvas.requestRenderAll();
            }
        }
    };
    const handleToXChange = (value) => {
        setToX(value);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();

            const existingFill = activeObject.get('fill');

            // Check if the fill is a gradient
            if (existingFill && existingFill.type === 'linear') {
                // Modify the color stops
                existingFill.coords = {
                    ...existingFill.coords,
                    x2: value * activeObject.width,
                }

                console.log(existingFill)

                activeObject.set({
                    fill: existingFill,
                });
                canvas.requestRenderAll();
            }
        }
    };
    const handleToYChange = (value) => {
        setToY(value);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();

            const existingFill = activeObject.get('fill');

            // Check if the fill is a gradient
            if (existingFill && existingFill.type === 'linear') {
                // Modify the color stops
                existingFill.coords = {
                    ...existingFill.coords,
                    y2: value * activeObject.height,
                }

                console.log(value * activeObject.height)

                activeObject.set({
                    fill: existingFill,
                });
                canvas.requestRenderAll();
            }
        }
    };

    const handleLinearGradient = () => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            console.log('linear')
            // Create a linear gradient
            const linearGradient = new fabric.Gradient({
                type: 'linear',
                // gradientUnits: 'percentage',
                coords: { x1: 0, y1: 0, x2: 0, y2: activeObject.height },
                colorStops: [
                    { offset: 0, color: 'red' },
                    { offset: 1, color: 'blue' },
                ],
            });

            // Set the linear gradient as the fill
            activeObject.set({
                fill: linearGradient, styles: {
                    0: {
                        0: {
                            fill: linearGradient,
                        },
                    },
                },
            });

            setActiveGradient('linear');

            canvas.requestRenderAll();
        }
    }

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            const existingFill = activeObject.get('fill');
    
            if (existingFill && existingFill.coords) { 
                const values = existingFill.coords;
    
                if ('r1' in values) setHorizontalOffset(values.r1 / 100);
                if ('r2' in values) setVerticalOffset(values.r2 / 100);
                if ('x1' in values) setFromX(values.x1 / 100);
                if ('y1' in values) setFromY(values.y1 / 100);
                if ('x2' in values) setToX(values.x2 / selectedObject.width);
                if ('y2' in values) setToY(values.y2 / selectedObject.height);
            }
        }
    }, []);
    

    const handleChange = (value, property, multiplier = 100) => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            const existingFill = activeObject.get('fill');

            if (existingFill && (existingFill.type === 'linear' || existingFill.type === 'radial')) {
                existingFill.coords = {
                    ...existingFill.coords,
                    [property]: value * multiplier,
                };

                console.log('value')

                activeObject.set({
                    fill: existingFill,
                    dirty: true
                });

                // Update the corresponding state
                switch (property) {
                    case 'opacity':
                        setOpacity(value);
                        break;
                    case 'r1':
                        setHorizontalOffset(value);
                        break;
                    case 'r2':
                        setVerticalOffset(value);
                        break;
                    case 'x1':
                        setFromX(value);
                        break;
                    case 'y1':
                        setFromY(value);
                        break;
                    case 'x2':
                        setToX(value);
                        break;
                    case 'y2':
                        setToY(value);
                        break;
                    // Add cases for other properties as needed
                    default:
                        break;
                }

                canvas.renderAll();
                canvas.requestRenderAll();
            }
        }
    };


    const handleRadialGradient = () => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            console.log('radial');

            // Create a radial gradient
            const radialGradient = new fabric.Gradient({
                type: 'radial',
                coords: { r1: 0, r2: activeObject.width / 2, x1: activeObject.width / 2, y1: activeObject.height / 2, x2: activeObject.width / 2, y2: activeObject.height / 2 },
                colorStops: [
                    { offset: 0, color: 'red' },
                    { offset: 1, color: 'blue' },
                ],
            });

            // Set the radial gradient as the fill
            activeObject.set({
                fill: radialGradient, styles: {
                    0: {
                        0: {
                            fill: radialGradient,
                        },
                    },
                },
            });

            setActiveGradient('radial')

            canvas.requestRenderAll();
        }
    };

    const handleSaveGradient = () => {

    }

    const handleDeleteGradient = () => {

    }

    const onColorChange = (color) => {
        if (color && color.length > 0) {
            // console.log(color)
            setColorStops(color);
            // console.log(colorStops)
        }
    }

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            const existingFill = activeObject.get('fill');

            // Check if the fill is a gradient
            if (existingFill && existingFill.type === 'linear') {
                // It's a linear gradient
                console.log('Fill is a linear gradient');
                setChecked(true);
                // Modify the gradient or perform other actions
            } else if (existingFill && existingFill.type === 'radial') {
                // It's a radial gradient
                console.log('Fill is a radial gradient');
                setChecked(true);
                // Modify the gradient or perform other actions
            } else {
                // It's not a gradient
                setChecked(false);
                console.log('Fill is not a gradient');
                // Handle non-gradient fill or perform other actions
            }

        }
    }, [])

    useEffect(() => {
        if (selectedObject && selectedObject.fill) {
            const existingFill = selectedObject.get('fill');
            // Check if the fill is a gradient
            if (existingFill && (existingFill.type === 'linear' || existingFill.type === 'radial')) {
                setColorStops(existingFill.colorStops);
            }
        }

    }, [canvasContainer, selectedObject])

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (dragging) {
                handlePointMove(activePointIndex, e.clientX);
            }
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, activePointIndex]);

    const handlePointMove = (index, offsetX) => {

        console.log(offsetX)
        const newColorStops = [...colorStops];
        const newPosition = ((offsetX) / gradientContainerWidth) - 0.41; // Adjust based on the width of the container
        console.log("NewPosition: ", newPosition)

        newColorStops[index] = {
            ...newColorStops[index],
            offset: Math.max(0, Math.min(1, newPosition)),
        };

        // Update the colorStops state
        setColorStops(newColorStops);

        // Update the gradient in the fabric.js object using the new colorStops
        updateGradientInCanvas(newColorStops);
    };


    const linearGradientStyle = {
        background: `linear-gradient(90deg, ${colorStops
            .map((stop) => `${stop.color} ${stop.offset * 100}%`)
            .join(', ')})`,
    };

    const raidalGradientStyle = {
        background: `radial-gradient(${colorStops
            .map((stop) => `${stop.color} ${stop.offset * 100}%`)
            .join(', ')})`,
    };



    return (


        <>
            <div class="sidebar-module__divider"></div>
            <label className={`toggle toggle-gradient`}>
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
                        <BackgroundColorPicker title={'Gradient'} activeColorIndex={activePointIndex} onColorChange={onColorChange} />

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
                        <div className="gradient-module__gradient mb-4" style={activeGradient === 'linear' ? linearGradientStyle : raidalGradientStyle}>
                            <div className="gradient-module__container" ref={gradientContainerRef}>
                                {colorStops.map((stop, index) => (
                                    <div
                                        key={index}
                                        className={`gradient-module__point ${index === activePointIndex ? 'gradient-module__point_active' : ''
                                            }`}
                                        style={{
                                            left: `calc(${stop.offset * 100}% - 6px)`,
                                            background: stop.color,
                                        }}
                                        onMouseDown={(e) => {
                                            setActivePointIndex(index);
                                            setDragging(true);
                                            handlePointMove(index, e.clientX);
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Opacity</p>
                                <Slider min={0} max={100} step={1} value={opacity} onChange={(value) => handleChange(value, 'opacity')} />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    value={`${opacity}%`}
                                />
                            </div>
                        </div> */}

                        <div className="sidebar__tool-title">Gradient Settings</div>

                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Horizontal offset</p>
                                <Slider min={-1} max={1} step={0.01} value={horizontalOffset} onChange={(value) => handleChange(value, 'r1')} />
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
                                <Slider min={-1} max={1} step={0.01} value={verticalOffset} onChange={(value) => handleChange(value, 'r2')} />
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
                                <Slider min={-1} max={1} step={0.01} value={fromX} onChange={(value) => handleChange(value, 'x1')} />
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
                                <Slider min={-1} max={1} step={0.01} value={fromY} onChange={(value) => handleChange(value, 'y1')} />
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
                                <Slider min={-1} max={1} step={0.01} value={toX} onChange={(value) => handleChange(value, 'x2', selectedObject.width)} />
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
                                <Slider min={-1} max={1} step={0.01} value={toY} onChange={(value) => handleChange(value, 'y2', selectedObject.height)} />
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
