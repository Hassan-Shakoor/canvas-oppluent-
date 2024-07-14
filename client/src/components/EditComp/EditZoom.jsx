// ** Import Library
import React, { useEffect, useState } from "react";
import { fabric } from 'fabric'
// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { selectCanvasContainer, selectResolution, selectSelectedCanvas, selectZoom, updateFabricData, updateResolution, updateZoom } from '../../store/app/Edit/Canvas/canvas'

import { useTranslation } from 'react-i18next';
// ** Shared
import { getCanvasRef, serializeCanvasContainer } from "../../shared/utils/fabric";

function EditZoom(props) {

    const { t } = useTranslation()

    // ** State
    const [zoomPercentage, setZoomPercentage] = useState(100)
    const [firstTime, setFirstTime] = useState(true)

    // ** Vars
    const dispatch = useDispatch()
    const resolution = useSelector(selectResolution)
    const selectedCanvas = useSelector(selectSelectedCanvas);
    // const [canvas, setCanvas] = useState(null);
    const { width, height } = resolution

    const zoom = useSelector(selectZoom);

    const canvasContainer = useSelector(selectCanvasContainer);
    // const canvas = canvasContainer[selectedCanvas];


    useEffect(() => {

        const setCanvasZoomOnStart = () => {
            // if (firstTime) {


            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // console.log('Width:', width);
            // console.log('Height:', height);
            // console.log('Screen width:', screenWidth);
            // console.log('Screen height:', screenHeight);

            setTimeout(() => {
                if (canvasContainer && canvasContainer.length > 0) {
                    const zoomWidth = width / screenWidth;
                    const zoomHeight = height / screenHeight;

                    if (zoomWidth > 0.85 || zoomHeight > 0.85) {

                        let zoomValue;
                        if (zoomWidth > zoomHeight) {
                            zoomValue = 0.85 / zoomWidth;
                        } else {
                            zoomValue = 0.85 / zoomHeight;
                        }


                        const newZoomPercentage = Math.round(zoomValue * 100);
                        if (zoomPercentage === newZoomPercentage) {
                            return;
                        }

                        // Set the zoom level and percentage

                        if (!firstTime) {
                            zoomCanvas(zoomValue);
                            setZoomPercentage(newZoomPercentage);
                        }
                    }
                }
            }, 1000);
            setFirstTime(false)
            // }
        }

        setCanvasZoomOnStart();

    }, [props.isCanvasLoaded])

    useEffect(() => {

        setTimeout(() => {

            if (canvasContainer && canvasContainer.length > 0) {
                canvasContainer?.map((canvas, index) => {
                    if (canvas) {
                        // console.log("props.zoom", props.zoom)
                        canvas?.setZoom(props.zoom);
                        // canvas.setWidth(canvas.width * zoom)
                        // canvas.setHeight(canvas.height * zoom)
                        // const newWidth = props.width * zoom;
                        // const newHeight = props.height * zoom;
                        // props.updateZoomResolution(newWidth, newHeight);


                        canvas?.renderAll();
                    }
                })
            }

        }, 100);

    }, [canvasContainer?.length])

    const handleZoomIn = () => {
        // zoomCanvas(0.1); // Increase the zoom level by 10%
        zoomCanvas(1.1); // Increase the zoom level by 10%
        setZoomPercentage(zoomPercentage + 5);
    };

    const handleZoomOut = () => {
        if (zoomPercentage <= 0) {
            return;
        }
        // zoomCanvas(-0.1); // Decrease the zoom level by 10%
        zoomCanvas(0.9); // Decrease the zoom level by 10%
        setZoomPercentage(zoomPercentage - 5);
    };

    const zoomCanvas = (zoomFactor) => {
        if (canvasContainer) {
            const currentZoom = canvasContainer[0]?.getZoom(); // Ensure canvasContainer[0] is not undefined
            canvasContainer.forEach((canvas) => {
                if (canvas) {
                    const newZoom = currentZoom * zoomFactor;
                    const newWidth = props.width * zoomFactor;
                    const newHeight = props.height * zoomFactor;
                    canvas?.setZoom(newZoom);
                    canvas?.setWidth(canvas?.width * zoomFactor);
                    canvas?.setHeight(canvas?.height * zoomFactor);
                    props.updateZoomResolution(newWidth, newHeight, newZoom);
                    dispatch(updateZoom(newZoom));
                    canvas?.renderAll();
                }
            });
        }
    };


    return (
        <div className="zoom">
            <div className="zoom__button" onClick={handleZoomIn}>
                <svg className="icon v2-icon v2-icon-lupe-in zoom__icon">
                    <use href="#v2-icon-lupe-in" xlinkHref="#v2-icon-lupe-in" />
                </svg>
                <p className="zoom__button-title">{t("zoomIn")}</p>
            </div>
            <p className="zoom__value">{zoomPercentage}%</p>
            <div className="zoom__button" onClick={handleZoomOut}>
                <svg className="icon v2-icon v2-icon-lupe-out zoom__icon">
                    <use href="#v2-icon-lupe-out" xlinkHref="#v2-icon-lupe-out" />
                </svg>
                <p className="zoom__button-title">{t("zoomOut")}</p>
            </div>
        </div>
    )
}

export default EditZoom;