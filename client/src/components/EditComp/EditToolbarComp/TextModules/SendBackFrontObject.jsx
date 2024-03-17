import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { selectCanvasContainer, selectSelectedCanvas, selectSelectedObject } from '../../../../store/app/Edit/Canvas/canvas';
import arrowDownToLine from '../../../../assets/icons/arrow-down-to-line.png';
import { toast } from 'react-toastify';




const SendBackFrontObject = () => {

    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas)
    const [isLocked, setIsLocked] = useState(false)
    const [openHyperlinkDropdown, setOpenHyperlinkDropdown] = useState(false)
    const [hyperlinkText, setHyperlinkText] = useState('')

    const selectedObject = useSelector(selectSelectedObject)

    const sendBackward = () => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            canvas.sendBackwards(activeObject);
            canvas.requestRenderAll();
        }
    };

    const bringForward = () => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            canvas.bringForward(activeObject);
            canvas.requestRenderAll();
        }
    };

    const bringToFront = () => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            canvas.bringToFront(activeObject);
            canvas.requestRenderAll();
        }
    };

    const sendToBack = () => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            canvas.sendToBack(activeObject);
            canvas.requestRenderAll();
        }
    };

    const handleLockObject = () => {
        setIsLocked(!isLocked)
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            activeObject.set({
                lockMovementX: !activeObject.lockMovementX,
                lockMovementY: !activeObject.lockMovementY,
            });
            canvas.requestRenderAll();
        }
    };


    const handleRemoveObject = () => {

        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            canvas.remove(activeObject);
            canvas.requestRenderAll();
        }
    };

    const handleSaveHyperlink = () => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            activeObject.set({
                hyperlink: hyperlinkText
            });
            canvas.requestRenderAll();
            toast.success("Hyperlink Saved")
        }
    }

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas];
        if (canvas?.getActiveObject()) {
            const activeObject = canvas?.getActiveObject();
            if (activeObject?.lockMovementX && activeObject?.lockMovementY) {
                setIsLocked(true);
            }
            else {
                setIsLocked(false)
            }
            if (activeObject?.hyperlink) {
                setHyperlinkText(activeObject?.hyperlink)
            }
        }
    }, [selectedObject])

    return (
        <>
            <div className="toolbar__button-set">
                <div className="tool-button" data-tooltip="Bring Forward" onClick={bringForward}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up-long" />
                </div>
                <div className="tool-button" data-tooltip="Send Backward" onClick={sendBackward}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-down-long" />
                </div>
                <div className="tool-button" data-tooltip='Bring to Front' onClick={bringToFront}>
                    <img src={arrowDownToLine} alt="Bring To Front" style={{ width: '20px', opacity: 0.72, transform: 'rotate(180deg)', filter: 'invert(1)' }} />
                </div>
                <div className="tool-button" data-tooltip='Send to Back' onClick={sendToBack}>
                    <img src={arrowDownToLine} alt="Send to Back" style={{ width: '20px', opacity: 0.72, filter: 'invert(1)' }} />
                </div>
            </div>
            <div className="toolbar__divider" />

            {isLocked ?
                <div data-tooltip='Lock'
                    className={`tool-button ${(selectedObject?.lockMovementX && selectedObject?.lockMovementY) ? 'tool-button_active' : ''}`}
                    onClick={handleLockObject}>
                    <FontAwesomeIcon icon="fa-solid fa-lock" />
                </div>
                :
                <div data-tooltip='Unlock' className="tool-button" onClick={handleLockObject}>
                    <FontAwesomeIcon icon="fa-solid fa-unlock-keyhole" />
                </div>
            }

            <div className={`tool-button ${selectedObject.hyperlink ? 'tool-button_active' : ''}`} data-test="toolbar-hyperlink" data-tooltip='Hyperlink' onClick={() => setOpenHyperlinkDropdown(!openHyperlinkDropdown)}>
                <svg className="icon v2-icon v2-icon-chain tool-button__icon">
                    <use href="#v2-icon-chain" xlinkHref="#v2-icon-chain" />
                </svg>
            </div>
            {openHyperlinkDropdown &&
                <div>
                    <div className="rc-dropdown rc-dropdown-placement-bottom" style={{ '--arrow-x': '129.75px', '--arrow-y': '-2px', 'inset': '45px auto auto 940px', 'boxSizing': 'border-box', 'zIndex': '100', 'position': 'absolute', 'minWidth': '30px' }}>
                        <div className="toolbar__tool-dropdown toolbar__tool-dropdown_hyperlink">
                            <label className="input">
                                <input placeholder="http://example.com" autoComplete="off" type="text" className="simple-input" value={hyperlinkText} onChange={(e) => setHyperlinkText(e.target.value)} />
                            </label>
                            <button type="button" className="btn" onClick={() => handleSaveHyperlink()}>
                                <span className="btn__text">Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div data-tooltip='Remove' className="tool-button" onClick={handleRemoveObject}>
                <svg className="icon v2-icon v2-icon-trash tool-button__icon">
                    <use href="#v2-icon-trash" xlinkHref="#v2-icon-trash"></use>
                </svg>
            </div>

        </>
    )
}

export default SendBackFrontObject