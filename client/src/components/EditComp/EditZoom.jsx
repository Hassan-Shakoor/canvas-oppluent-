// ** Import Library
import React, { useEffect, useState } from "react";

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { selectCanvasContainer, selectResolution, selectSelectedCanvas, updateFabricData, updateResolution } from '../../store/app/Edit/Canvas/canvas'

// ** Shared
import { getCanvasRef, serializeCanvasContainer } from "../../shared/utils/fabric";

function EditZoom() {
    // ** State
    const [zoomPercentage, setZoomPercentage] = useState(100)

    // ** Vars
    const dispatch = useDispatch()
    const resolution = useSelector(selectResolution)
    const selectedCanvas = useSelector(selectSelectedCanvas);
    // const [canvas, setCanvas] = useState(null);
    const { width, height } = resolution

    const canvasContainer = useSelector(selectCanvasContainer);
    // const canvas = canvasContainer[selectedCanvas];

    useEffect(() => {
        setTimeout(() => {
            // setCanvas(canvasContainer[selectedCanvas]);
        }, 1000);

    }, [])

    // const handleZoomIn = () => {
    //     // const serialized = serializeCanvasContainer(getCanvasRef())
    //     // dispatch(updateFabricData(serialized))
    //     // dispatch(updateResolution({ height: (height + (height * 0.05)), width: (width + (width * 0.05)) }))
    //     zoomCanvas(canvas, 1.1)
    //     setZoomPercentage(zoomPercentage + 5)
    // }

    // const handleZoomOut = () => {
    //     if (zoomPercentage <= 0) {
    //         return;
    //     }
    //     const serialized = serializeCanvasContainer(getCanvasRef())
    //     dispatch(updateFabricData(serialized))
    //     dispatch(updateResolution({ height: (height - (height * 0.05)), width: (width - (width * 0.05)) }))
    //     setZoomPercentage(zoomPercentage - 5)
    // }

    const handleZoomIn = () => {
        zoomCanvas(0.1); // Increase the zoom level by 10%
        setZoomPercentage(zoomPercentage + 5);
    };

    const handleZoomOut = () => {
        if (zoomPercentage <= 0) {
            return;
        }
        zoomCanvas(-0.1); // Decrease the zoom level by 10%
        setZoomPercentage(zoomPercentage - 5);
    };

    const zoomCanvas = (zoomFactor) => {


        if (canvasContainer) {
            const currentZoom = canvasContainer[0].getZoom();
            canvasContainer.map((canvas, index) => {
                if (canvas) {
                    console.log("currentZoom: ", currentZoom)
                    const newZoom = currentZoom + zoomFactor;
                    canvas.setZoom(newZoom);
                    canvas.renderAll();
                    // dispatch(updateResolution({ height: (height + (height * zoomFactor)), width: (width + (width * zoomFactor)) }))
                }
            })
        }
    };

    return (
        <div className="zoom">
            <div className="zoom__button" onClick={handleZoomIn}>
                <svg className="icon v2-icon v2-icon-lupe-in zoom__icon">
                    <use href="#v2-icon-lupe-in" xlinkHref="#v2-icon-lupe-in" />
                </svg>
                <p className="zoom__button-title">Zoom In</p>
            </div>
            <p className="zoom__value">{zoomPercentage}%</p>
            <div className="zoom__button" onClick={handleZoomOut}>
                <svg className="icon v2-icon v2-icon-lupe-out zoom__icon">
                    <use href="#v2-icon-lupe-out" xlinkHref="#v2-icon-lupe-out" />
                </svg>
                <p className="zoom__button-title">Zoom Out</p>
            </div>
        </div>
    )
}

export default EditZoom;