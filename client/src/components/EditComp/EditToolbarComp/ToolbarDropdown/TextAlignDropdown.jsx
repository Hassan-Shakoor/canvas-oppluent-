import React, { useEffect, useState } from 'react';
import { selectSelectedCanvas } from '../../../../store/app/Edit/Canvas/canvas';
import { getCanvasRef } from '../../../../shared/utils/fabric';
import { useSelector } from 'react-redux';

const TextAlignDropdown = () => {

    const [textAlign, setTextAlign] = useState('left')

    // ** Vars
    const canvasContainer = getCanvasRef() || []
    const selectedCanvas = useSelector(selectSelectedCanvas)

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas]
        if (canvas?.getActiveObject()) {
            const textObject = canvas?.getActiveObject()
            textObject.set({ textAlign: textAlign })
            canvas.requestRenderAll()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textAlign])

    return (
        <div className="rc-dropdown rc-dropdown-placement-bottomLeft" style={{ '--arrow-x': '15px', '--arrow-y': '-2px', inset: '40px auto auto 1016.633px', boxSizing: 'border-box', zIndex: 200, position: 'absolute', minWidth: '30px' }}>
            <div className="toolbar__tool-dropdown">
                <div className={`tool-button ${textAlign === 'left' ? 'tool-button_active' : ''}`} onClick={() => setTextAlign('left')}>
                    <svg className="icon v2-icon v2-icon-text-align-left tool-button__icon">
                        <use href="#v2-icon-text-align-left" xlinkHref="#v2-icon-text-align-left"></use>
                    </svg>
                </div>
                <div className={`tool-button ${textAlign === 'center' ? 'tool-button_active' : ''}`} onClick={() => setTextAlign('center')}>
                    <svg className="icon v2-icon v2-icon-text-align-center tool-button__icon">
                        <use href="#v2-icon-text-align-center" xlinkHref="#v2-icon-text-align-center"></use>
                    </svg>
                </div>
                <div className={`tool-button ${textAlign === 'right' ? 'tool-button_active' : ''}`} onClick={() => setTextAlign('right')}>
                    <svg className="icon v2-icon v2-icon-text-align-right tool-button__icon">
                        <use href="#v2-icon-text-align-right" xlinkHref="#v2-icon-text-align-right"></use>
                    </svg>
                </div>
                <div className={`tool-button ${textAlign === 'justify' ? 'tool-button_active' : ''}`} onClick={() => setTextAlign('justify')}>
                    <svg className="icon v2-icon v2-icon-text-align-justify tool-button__icon">
                        <use href="#v2-icon-text-align-justify" xlinkHref="#v2-icon-text-align-justify"></use>
                    </svg>
                </div>
                {/* <div className={`tool-button ${textAlign === 'left' ? 'tool-button_active' : ''}`} onClick={() => setTextAlign('left')}>
                    <svg className="icon v2-icon v2-icon-text-align-justify-left tool-button__icon">
                        <use href="#v2-icon-text-align-justify-left" xlinkHref="#v2-icon-text-align-justify-left"></use>
                    </svg>
                </div>
                <div className={`tool-button ${textAlign === 'left' ? 'tool-button_active' : ''}`} onClick={() => setTextAlign('left')}>
                    <svg className="icon v2-icon v2-icon-text-align-justify-right tool-button__icon">
                        <use href="#v2-icon-text-align-justify-right" xlinkHref="#v2-icon-text-align-justify-right"></use>
                    </svg>
                </div>
                <div className={`tool-button ${textAlign === 'left' ? 'tool-button_active' : ''}`} onClick={() => setTextAlign('left')}>
                    <svg className="icon v2-icon v2-icon-text-align-justify-center tool-button__icon">
                        <use href="#v2-icon-text-align-justify-center" xlinkHref="#v2-icon-text-align-justify-center"></use>
                    </svg>
                </div> */}
            </div>
        </div>
    );
}

export default TextAlignDropdown;
