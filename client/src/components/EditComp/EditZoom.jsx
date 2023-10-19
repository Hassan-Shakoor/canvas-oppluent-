// ** Import Library
import React, { useState } from "react";
 
// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { selectCanvasContainer, selectResolution, updateFabricData, updateResolution }from '../../store/app/Edit/Canvas/canvas'

// ** Shared
import { serializeCanvasContainer } from "../../shared/utils/fabric";

function EditZoom(){
    // ** State
    const [zoomPercentage, setZoomPercentage] = useState(30)

    // ** Vars
    const dispatch = useDispatch()
    const canvasContainer = useSelector(selectCanvasContainer)
    const resolution = useSelector(selectResolution)
    const {height, width} = resolution
    const handleZoomIn = () => {
        const serialized = serializeCanvasContainer(canvasContainer)
        dispatch(updateFabricData(serialized))
        dispatch(updateResolution({height:(height + (height*0.05)), width:(width + (width*0.05))}))
        setZoomPercentage(zoomPercentage+5)
    }

    const handleZoomOut = () => {
        const serialized = serializeCanvasContainer(canvasContainer)
        dispatch(updateFabricData(serialized))
        dispatch(updateResolution({height:(height - (height*0.05)), width:(width - (width*0.05))}))
        setZoomPercentage(zoomPercentage-5)
    }

    return(
        <div className="zoom">
            <div className="zoom__button" onClick = {handleZoomIn}>
                <svg className="icon v2-icon v2-icon-lupe-in zoom__icon">
                <use href="#v2-icon-lupe-in" xlinkHref="#v2-icon-lupe-in" />
                </svg>
                <p className="zoom__button-title">zoom in</p>
            </div>
            <p className="zoom__value">{zoomPercentage}%</p>
            <div className="zoom__button" onClick = {handleZoomOut}>
                <svg className="icon v2-icon v2-icon-lupe-out zoom__icon">
                <use href="#v2-icon-lupe-out" xlinkHref="#v2-icon-lupe-out" />
                </svg>
                <p className="zoom__button-title">zoom out</p>
            </div>
        </div>
    )
}

export default EditZoom;