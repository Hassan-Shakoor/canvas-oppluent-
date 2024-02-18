import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { getCanvasRef } from '../../../../shared/utils/fabric';
import { useSelector } from 'react-redux';
import canvas, { selectSelectedCanvas, selectSelectedObject } from '../../../../store/app/Edit/Canvas/canvas';
import { fabric } from 'fabric'
import BackgroundColorPicker from '../../EditSideBarComp/EditSettingModule/BackgroundColorPicker';

const DropShadowModule = () => {

    const canvasContainer = getCanvasRef() || [];
    const selectedCanvas = useSelector(selectSelectedCanvas);
    const selectedObject = useSelector(selectSelectedObject)
    // State variables for Line Spacing, Letter Spacing, and Rotate

    const [opacity, setOpacity] = useState(0);
    const [offsetByX, setOffsetByX] = useState(0);
    const [offsetByY, setOffsetByY] = useState(0);
    const [blur, setBlur] = useState(0);

    const [isChecked, setChecked] = useState(false);

    const handleToggle = () => {
        if (!isChecked) {
            const canvas = canvasContainer[selectedCanvas];
            if (canvas?.getActiveObject()) {
                const activeObject = canvas?.getActiveObject();
                const existingShadow = activeObject?.get('shadow');
                console.log("ExistingShadow: ", existingShadow)
                if (existingShadow) {
                    setChecked(true)
                    console.log('Shadow is applied to the text.');
                }
            }
        }
        setChecked(!isChecked);
    };

    const handleOffsetByX = (value) => {
        setOffsetByX(value);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            const existingShadow = activeObject?.get('shadow');

            if (existingShadow) {
                existingShadow.offsetX = value
                activeObject.set({ shadow: existingShadow })
            }
        }
        canvas?.renderAll();
    };

    const handleOffsetByY = (value) => {
        setOffsetByY(value);
        console.log(value)
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            const existingShadow = activeObject?.get('shadow');

            if (existingShadow) {
                existingShadow.offsetY = value
                activeObject.set({ shadow: existingShadow })
            }
        }
        canvas?.renderAll();
    };

    const handleBlur = (value) => {
        setBlur(value);
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            const existingShadow = activeObject?.get('shadow');

            if (existingShadow) {
                existingShadow.blur = value
                activeObject.set({ shadow: existingShadow })
            }
        }
        canvas?.renderAll();
    };

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            const existingShadow = activeObject?.get('shadow');
            console.log("ExistingShadow: ", existingShadow)
            if (existingShadow) {
                setChecked(true)
                setOffsetByX(existingShadow.offsetX);
                setOffsetByY(existingShadow.offsetY);
                setBlur(existingShadow.blur);
                console.log('Shadow is applied to the text.');
            }
        }
    }, [selectedObject])


    return (


        <>
            <div class="sidebar-module__divider"></div>
            <label className={`toggle toggle-shadow`}>
                <input type="checkbox" className="toggle__input" checked={isChecked} onChange={handleToggle} />
                <span className="toggle__background">
                    <span className="toggle__dot"></span>
                </span>
                <span className={`toggle__label ${isChecked ? 'toggle-gradient__label' : ''}`}>
                    <span>Drop Shadow</span>
                </span>
            </label>
            <div class="sidebar-module__divider"></div>
            {
                isChecked && (
                    <>
                        <BackgroundColorPicker title={'DropShadow'} />

                        
                        <div className="sidebar__tool-title">Shadow Options</div>

                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Offset by X</p>
                                <Slider
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={offsetByX}
                                    onChange={handleOffsetByX}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    onChange={(e) => setOffsetByX(e.target.value)}
                                    value={`${Math.round(offsetByX)}%`}
                                />
                            </div>
                        </div>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Offset by Y</p>
                                <Slider
                                    min={-100}
                                    max={100}
                                    step={1}
                                    value={offsetByY}
                                    onChange={handleOffsetByY}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    onChange={(e) => setOffsetByY(e.target.value)}
                                    value={`${Math.round(offsetByY)}%`}
                                />
                            </div>
                        </div>
                        <div className="slider-box__hokeys-wrapper">
                            <div className="slider-box">
                                <p className="slider-box__title">Blur</p>
                                <Slider
                                    min={0}
                                    max={500}
                                    step={0.5}
                                    value={blur}
                                    onChange={handleBlur}
                                />
                                <input
                                    inputMode="numeric"
                                    className="simple-input slider-box__input"
                                    type="text"
                                    onChange={(e) => setBlur(e.target.value)}
                                    value={`${Math.round(blur)}`}
                                />
                            </div>
                        </div>

                    </>
                )}
        </>
    );
};

export default DropShadowModule;
