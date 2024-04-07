// ** Import Library
import React, { useEffect, useState } from "react";

// ** Custom Component

// ** Store
import { useSelector } from 'react-redux'
import { selectOpenDrawer } from '../../../../store/app/Edit/EditDrawer/index'
import BackgroundColorPicker from "../EditSettingModule/BackgroundColorPicker";
import { selectCanvasContainer, selectSelectedCanvas, selectSelectedObject } from "../../../../store/app/Edit/Canvas/canvas";
import Slider from "rc-slider";
import Select from "react-select";

function EditImageColorTab() {
    // States

    const [transparency, setTransparency] = useState(100);

    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas)
    const selectedObject = useSelector(selectSelectedObject)

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

    // ** Hooks 
    const openDrawer = useSelector(selectOpenDrawer)

    useEffect(() => {
        // setFillStrokeFirst(selectedObject?.fill)
    }, [])

    return (
        <>
            {openDrawer === 'Image-Color' && (
                <div
                    className={openDrawer === 'Image-Color'
                        ? "colorize-module vertical-switch-content-enter-done"
                        : "colorize-module vertical-switch-content-exit-done"} >
                    <BackgroundColorPicker title={'Image'} />

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

                </div >)}

        </>
    )
}

export default EditImageColorTab;