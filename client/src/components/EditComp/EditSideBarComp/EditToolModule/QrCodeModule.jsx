// ** Import React
import React, { useEffect, useState } from "react"
import { fabric } from "fabric";

// ** Custom Components
import SpinnerOverlay from '../../../Loader/SpinnerOverlay'

// ** Store
import {useDispatch, useSelector} from 'react-redux'
import { selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas"
import { updateOpenDrawer } from "../../../../store/app/Edit/EditDrawer";

// ** API
import { fetchQrCode } from "../../../../api/qrCodeGenerator"

// ** Shared
import { getCanvasRef } from "../../../../shared/utils/fabric"

function QrCodeModule (){
    // ** State
    const [url,setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)

    // ** Vars
    const dispatch = useDispatch()
    const selectedCanvas = useSelector(selectSelectedCanvas)
    const canvasContainer = getCanvasRef()
    const canvas = canvasContainer[selectedCanvas]
    const activeObject = canvas.getActiveObject()

    const updateQrCode = (qrCodeDataURL) => {
        fabric.Image.fromURL(qrCodeDataURL, (img) => {
            canvas.remove(activeObject)
            img.set({
                left: activeObject.left,
                top: activeObject.top,
                scaleX: activeObject.scaleX,
                scaleY: activeObject.scaleY,
                angle: activeObject.angle,
                name: "qrCode",
                url:url
            });
            canvas.add(img);
            canvas.renderAll();
          });
    }

    const generateQrCode = (qrCodeDataURL) => {
        fabric.Image.fromURL(qrCodeDataURL, (img) => {
            img.set({
              left: 50,
              top: 50,
              scaleX: 0.5,
              scaleY: 0.5,
              name: "qrCode",
              url:url

            });
            canvas.add(img);
            canvas.renderAll();
          });
    }

    const generateQR = async () => {
        setLoading(true)
        try {
            const response = await fetchQrCode(url)
            if(response?.qrCodeDataURL){
                update ? updateQrCode(response?.qrCodeDataURL) : generateQrCode(response.qrCodeDataURL)
                setUrl('')
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
        dispatch(updateOpenDrawer(null))
    }

    useEffect(() => {
        setUpdate((activeObject?.type === "image" && activeObject?.name === "qrCode") ? true : false)
        setUrl(activeObject?.url ?? "")
    },[])

    return(
        <>
        <SpinnerOverlay loading={loading}/>
        <div className="mb-3 text-info">
        Add a URL and we’ll create a QR code for you to add to your design. People can
        scan the QR code to reach the URL
        </div>
        <label className="input mb-3">
            <span className="input__label">URL</span>
            <input
                placeholder="https://..."
                type="text"
                className="simple-input"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
            />
        </label>
        <span className={url === "" ? "btn btn_disabled btn_wide" : "btn btn_wide"} onClick={url !== "" ? generateQR : undefined}>
            <span className="btn__text">{!update ? "Generate Code": "Update Code"}</span>
        </span>
        </>
    )
}

export default QrCodeModule