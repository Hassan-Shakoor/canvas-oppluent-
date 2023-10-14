// ** Import Libraries
import React from "react" 
import { useState } from "react"

// ** Custom Components
import ConfirmationModal from '../../Modal/ConfirmationModal'

// ** Store
import {useDispatch, useSelector} from 'react-redux'
import {selectCanvasContainer, updateFabricData} from '../../../store/app/Edit/Canvas/canvas'

// ** Utils
import { serializeCanvasContainer } from "../../../utils/fabric"

function PageManagerButtonSet(){
    // ** State
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    // ** Vars
    const dispatch = useDispatch()
    const canvasContainer = useSelector(selectCanvasContainer)

    const handleAddPageClick = (event) => {
        event.preventDefault()
        const serialized = serializeCanvasContainer(canvasContainer)
        serialized.push("{\"version\":\"5.3.0\",\"objects\":[]}")
        dispatch(updateFabricData(serialized))
        setShowConfirmDialog(false)
    }

    return (
        <>
        <div className="page-manager__button-set">
            <div className="page-manager__button" data-test="add-page" onClick={() => setShowConfirmDialog(true)}>
                <div className="page-manager__button-background page-manager__button-background_circle">
                <svg className="icon v2-icon v2-icon-plus">
                    <use href="#v2-icon-plus" xlinkHref="#v2-icon-plus" />
                </svg>
                </div>
                <p className="page-manager__button-title">Add page</p>
            </div>
            <div className="page-manager__button-triangle">
                <div
                className="page-manager__button page-manager__button_triangle-top"
                data-test="rotate"
                >
                <div className="page-manager__button-background page-manager__button-background_circle page-manager__button-background_circle-small">
                    <svg className="icon v1-icon v1-icon-repeat">
                    <use href="#v1-icon-repeat" xlinkHref="#v1-icon-repeat" />
                    </svg>
                </div>
                <p className="page-manager__button-title">Rotate</p>
                </div>
            </div>
            <div className="page-manager__toggle">
                <div
                className="page-manager__button-background page-manager__button-background_rect"
                data-test="display"
                >
                <svg className="icon v2-icon v2-icon-left-right-arrows">
                    <use
                    href="#v2-icon-left-right-arrows"
                    xlinkHref="#v2-icon-left-right-arrows"
                    />
                </svg>
                </div>
                <p className="page-manager__button-title">Display</p>
            </div>
        </div>
        {showConfirmDialog && 
        <ConfirmationModal
            title={"Add Page Confirmation"}
            body={"You have exceeded the allowed number of pages: 2. Do you want to continue?"}
            secondaryBtnTxt={"Cancel"}
            primaryBtnTxt={"Submit"}
            close={() => {setShowConfirmDialog(false)}}
            submit={(event) => handleAddPageClick(event)}
        />}
        </>
    )
}

export default PageManagerButtonSet;