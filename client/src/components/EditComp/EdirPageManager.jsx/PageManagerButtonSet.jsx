// ** Import Libraries
import React from "react"
import { useState } from "react"
import { useTranslation } from 'react-i18next';

// ** Custom Components
import ConfirmationModal from '../../Modal/ConfirmationModal'

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { selectCanvasContainer, selectDisplayDirection, selectSelectedCanvas, updateDisplayDirection, updateFabricData } from '../../../store/app/Edit/Canvas/canvas'

// ** Shared
import { getCanvasRef, serializeCanvasContainer } from "../../../shared/utils/fabric"
import { DISPLAY_DIRECTION } from "../../../shared/constant"

function PageManagerButtonSet() {
    const { t } = useTranslation()

    // ** State
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    // ** Vars
    const dispatch = useDispatch()
    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas);
    const displayDirection = useSelector(selectDisplayDirection);

    const handleAddPageClick = (event) => {
        event.preventDefault()
        const serialized = serializeCanvasContainer(getCanvasRef())
        serialized.push("{\"version\":\"5.3.0\",\"objects\":[]}")
        dispatch(updateFabricData(serialized))
        setShowConfirmDialog(false)
    }

    const handleRotateClick = () => {

        if (canvasContainer) {
            console.log("Rotate Button Clicked")
            canvasContainer[selectedCanvas].set({ angle: canvasContainer[selectedCanvas].angle === 0 ? 180 : 0 });
            const backgroundImage = canvasContainer[selectedCanvas].backgroundImage;
            backgroundImage.set({
                angle: backgroundImage.angle === 0 ? 180 : 0,
                originX: backgroundImage.originX === 'left' ? 'right' : 'left',
                originY: backgroundImage.originY === 'top' ? 'bottom' : 'top'
            });

            canvasContainer[selectedCanvas].getObjects().forEach(obj => {

                const left = obj.left;
                const right = obj.right;
                const top = obj.top;
                const bottom = obj.bottom;



                // obj.set({
                //     angle: obj.angle === 0 ? 180 : 0,
                //     originX: obj.originX === 'left' ? 'right' : 'left',
                //     originY: obj.originY === 'top' ? 'bottom' : 'top',
                //     // left: canvasContainer[selectedCanvas].width - left,
                //     // top: canvasContainer[selectedCanvas].height - top,
                //     // bottom: canvasContainer[selectedCanvas].width - left,
                //     // right: canvasContainer[selectedCanvas].height - top,
                //     left: left === undefined ? right : undefined,
                //     top: top === undefined ? bottom : undefined,
                //     bottom: bottom === undefined ? top : undefined,
                //     right: right === undefined ? left : undefined,
                // });
                obj.set({
                    angle: (obj.angle + 180) % 360,
                    originX: obj.originX === 'right' ? 'left' : 'right',
                    originY: obj.originY === 'bottom' ? 'top' : 'bottom',
                    // left: canvasContainer[selectedCanvas].backgroundImage.width - left - obj.width,
                    // top: canvasContainer[selectedCanvas].backgroundImage.height - top - obj.height,

                });

                // setTimeout(() => {
                //     console.log('canvasContainer[selectedCanvas].width  -> ', canvasContainer[selectedCanvas].width)
                //     console.log('canvasContainer[selectedCanvas].height  -> ', canvasContainer[selectedCanvas].height)
                //     console.log('left -> ', left)
                //     console.log('top -> ', top)
                //     console.log('originX -> ', obj.originX)
                //     console.log('originY -> ', obj.originY)
                // }, 1000);

            });
            canvasContainer[selectedCanvas].renderAll();
        }


    }

    const handleDisplayDirectionClick = () => {
        if (displayDirection === DISPLAY_DIRECTION.VERTICAL) {
            dispatch(updateDisplayDirection(DISPLAY_DIRECTION.HORIZONTAL))
        } else {
            dispatch(updateDisplayDirection(DISPLAY_DIRECTION.VERTICAL))
        }
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
                    <p className="page-manager__button-title">{t("addPage")}</p>
                </div>
                <div className="page-manager__button-triangle">
                    <div
                        className="page-manager__button page-manager__button_triangle-top"
                        data-test="rotate"
                        onClick={handleRotateClick}
                    >
                        <div className="page-manager__button-background page-manager__button-background_circle page-manager__button-background_circle-small">
                            <svg className="icon v1-icon v1-icon-repeat">
                                <use href="#v1-icon-repeat" xlinkHref="#v1-icon-repeat" />
                            </svg>
                        </div>
                        <p className="page-manager__button-title">{t("rotate")}</p>
                    </div>
                </div>
                <div className={displayDirection === DISPLAY_DIRECTION.HORIZONTAL ? "page-manager__toggle page-manager__toggle_horizontal-view" : "page-manager__toggle"} onClick={handleDisplayDirectionClick}>
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
                    <p className="page-manager__button-title">{t("display")}</p>
                </div>
            </div>
            {showConfirmDialog &&
                <ConfirmationModal
                    title={"Add Page Confirmation"}
                    body={"You have exceeded the allowed number of pages: 2. Do you want to continue?"}
                    secondaryBtnTxt={"Cancel"}
                    primaryBtnTxt={"Submit"}
                    close={() => { setShowConfirmDialog(false) }}
                    submit={(event) => handleAddPageClick(event)}
                />}
        </>
    )
}

export default PageManagerButtonSet;