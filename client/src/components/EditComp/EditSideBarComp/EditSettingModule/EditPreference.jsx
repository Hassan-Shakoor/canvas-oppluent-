import React from "react";

// Store
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { useSelector } from "react-redux/es/hooks/useSelector";

import { fabric } from 'fabric';

// ** Third Party Comp
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { selectMagnetRange, selectSafeZoneAndBleed, selectScaleSensitive, updateMagnetRange, updateSafeZoneAndBleed, updateScaleSensitive } from "../../../../store/app/Edit/EditSidebar/EditSetting/preference";
import { selectCanvasContainer, selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas";

function EditPreference({ setShowPanel }) {
    // ** Hooks
    const dispatch = useDispatch()

    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas);

    const sliderValue = useSelector(selectScaleSensitive);
    const isSafeZone = useSelector(selectSafeZoneAndBleed)
    const isMagneticRange = useSelector(selectMagnetRange)

    const handleSliderChange = (value) => {
        dispatch(updateScaleSensitive(value))
    }
    return (
        <>
            <button type="button" className="btn btn_gray btn_back-button" onClick={() => setShowPanel('default')}>
                <svg className="icon v1-icon v1-icon-chevron-left-light">
                    <use
                        href="#v1-icon-chevron-left-light"
                        xlinkHref="#v1-icon-chevron-left-light"
                    />
                </svg>
                <span className="btn__text">Back</span>
            </button>
            <label className="toggle">
                <input type="checkbox" className="toggle__input" onChange={() => {
                    dispatch(updateSafeZoneAndBleed(!isSafeZone));

                    const canvas = canvasContainer[selectedCanvas]
                    if (!isSafeZone) {

                        const safeZoneMargin = 20;

                        const zoom = canvas.getZoom();

                        const safeZoneRect = new fabric.Rect({
                            left: safeZoneMargin, // Adjust left position for the safe zone
                            top: safeZoneMargin, // Adjust top position for the safe zone
                            width: (canvas.width - 2 * safeZoneMargin) / zoom, // Adjust width for the safe zone
                            height: (canvas.height - 2 * safeZoneMargin) / zoom, // Adjust height for the safe zone
                            fill: 'transparent', // Make the rectangle invisible
                            stroke: 'yellow',
                            selectable: false, // Disable selection
                            evented: false, // Disable events
                            type: 'safeZone'
                        });

                        canvas.add(safeZoneRect);
                    } else {
                        canvas.forEachObject((object) => {
                            if (object.type === 'safeZone') {
                                canvas.remove(object);
                            }
                        });
                    }

                    // handleBleedandSafeZone();
                }} checked={isSafeZone} />
                <span className="toggle__background">
                    <span className="toggle__dot" />
                </span>
                <span className="toggle__label settings-sidebar-module__toggle-label">
                    <span>Enable Safe Zone &amp; Bleed</span>
                </span>
            </label>
            <div className="sidebar-module__divider" />
            <label className="toggle mb-3">
                <input type="checkbox" className="toggle__input" onChange={() => { dispatch(updateMagnetRange()) }} checked={isMagneticRange} />
                <span className="toggle__background">
                    <span className="toggle__dot" />
                </span>
                <span className="toggle__label settings-sidebar-module__toggle-label">
                    <span>Magnet Range</span>
                </span>
            </label>
            <div className="sidebar-module__divider" />
            <div className="slider-box">
                <p className="slider-box__title">Scale Sensitive</p>
                <div className="rc-slider slider-box__slider" style={{ padding: 0 }}>
                    <Slider
                        min={0}
                        max={100}
                        value={sliderValue}
                        onChange={handleSliderChange}
                    />
                </div>
                <p className="slider-box__value">{sliderValue}%</p>
            </div>
            <div className="sidebar-module__divider" />
        </>
    )
}

export default EditPreference;