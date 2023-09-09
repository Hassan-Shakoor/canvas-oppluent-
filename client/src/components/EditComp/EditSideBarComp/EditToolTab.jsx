import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ** Store
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectOpenDrawer } from "../../../store/app/Edit/EditSidebar/EditDrawer";

function EditToolTab() {
  const openDrawer = useSelector(selectOpenDrawer)

  return (
    <div
      className={openDrawer === 'Tools'
      ? "sidebar-module vertical-switch-content-enter-done"
      : "sidebar-module vertical-switch-content-exit-done"}>
      <div className="sidebar-module__title">Tools</div>
      <div className="sidebar-module__divider"/>
      <div className="sidebar-tiles">
        <div className="sidebar-tiles__item" data-test="qr-code-module-button">
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-qrcode" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">QR Code</div>
          </div>
        </div>
        <div className="sidebar-tiles__item" data-test="chat-gpt-module-button">
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-file-lines" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">AI Writer</div>
          </div>
        </div>
        <div className="sidebar-tiles__item" data-test="cart-module-button">
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-chart-area" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">Chart</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditToolTab