// ** Import React
import React, { useState } from "react"

// ** Custom Components
import SpinnerOverlay from '../../../Loader/SpinnerOverlay'

// ** API
import { fetchQrCode } from "../../../../api/qrCodeGenerator"

function QrCodeModule (){
    // ** State
    const [url,setUrl] = useState('')
    const [qrCode,setQrCode] = useState('')
    const [loading, setLoading] = useState(false)

    const generateQR = async () => {
        setLoading(true)
        try {
            const response = await fetchQrCode(url)
            setQrCode(response.qrCodeDataURL)
            console.log(response.qrCodeDataURL);
            setUrl('')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

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
            <span className="btn__text">{qrCode === '' ? "Generate Code": "Update Code"}</span>
        </span>
        </>
    )
}

export default QrCodeModule