// ** Import Libraries
import React from "react";

// ** Custom Components
import BackgroundColorPicker from "./BackgroundColorPicker";

// ** Store
import {useDispatch} from 'react-redux/es/hooks/useDispatch'
import { updateOpenDrawer } from "../../../../store/app/Edit/EditDrawer";

function EditBackground({setShowPanel}){
    // ** Hooks
    const dispatch = useDispatch()
    return(
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
        <div className="background-module__image" onClick={() => dispatch(updateOpenDrawer('Uploads'))}>
            <div className="background-module__image-overlay background-module__image-overlay_without-image">
                <svg className="icon v2-icon v2-icon-plus-within-circle background-module__plus-circle">
                <use
                    href="#v2-icon-plus-within-circle"
                    xlinkHref="#v2-icon-plus-within-circle"
                />
                </svg>
                <p className="background-module__text background-module__text_title">
                No Background Image
                </p>
                <p className="background-module__text">Click here to select</p>
            </div>
        </div>
        <BackgroundColorPicker/>
        </>
    )
}

export default EditBackground;