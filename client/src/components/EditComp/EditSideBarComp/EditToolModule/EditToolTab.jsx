// ** Import Libraries
import React, { useState } from "react";

 // ** Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ** Import Custom Components
import QrCodeModule from "./QrCodeModule";
import AiTextModule from "./AiTextModule";
import ChartModule from "./ChartModule"

// ** Store
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectOpenDrawer } from "../../../../store/app/Edit/EditSidebar/EditDrawer/index"

// ** Vars
const toolsBtn = [
  {title: 'QR Code', icon:'fa-solid fa-qrcode'},
  {title: 'AI Writer', icon:'fa-solid fa-file-lines'},
  {title: 'Chart', icon:'fa-solid fa-chart-area'}
]

function EditToolTab() {
  // ** State
  const [showPanel, setShowPanel] = useState('default')

  // ** Hooks
  const openDrawer = useSelector(selectOpenDrawer)

  return (
    <div
      className={openDrawer === 'Tools'
      ? "sidebar-module vertical-switch-content-enter-done"
      : "sidebar-module vertical-switch-content-exit-done"}>
      {showPanel === 'default' && <div className="sidebar-module__title">Tools</div>}
      {showPanel !== 'default' && <button type="button" className="btn btn_gray btn_back-button" onClick={() => setShowPanel('default')}>
        <svg className="icon v1-icon v1-icon-chevron-left-light">
          <use
            href="#v1-icon-chevron-left-light"
            xlinkHref="#v1-icon-chevron-left-light"
          />
        </svg>
        <span className="btn__text">Back</span>
      </button>}
      {showPanel === 'default' && <div className="sidebar-module__divider"/>}
      <div className="sidebar-tiles">
      {showPanel === 'default' && toolsBtn.map((btn, index) => (
        <div className="sidebar-tiles__item" data-test="qr-code-module-button" key={index} onClick={() => setShowPanel(btn.title)}>
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon={btn.icon} className="sidebar-tiles__tile-icon" />
            <div className="sidebar-tiles__tile-title">{btn.title}</div>
          </div>
        </div>
      ))}

      {showPanel === 'QR Code' && <QrCodeModule/>}
      {showPanel === 'AI Writer' && <AiTextModule/>}
      {showPanel === 'Chart' && <ChartModule/>}
      </div>
    </div>
  )
}

export default EditToolTab