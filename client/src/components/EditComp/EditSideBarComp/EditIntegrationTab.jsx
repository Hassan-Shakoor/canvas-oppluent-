import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditIntegrationTab(props) {
  return (
    <div
      className={props.openDrawer === 'Integrations'
      ? "sidebar-module vertical-switch-content-enter-done"
      : "sidebar-module vertical-switch-content-exit-done"}>
      <div className="sidebar-module__title">Integrations</div>
      <div className="sidebar-module__divider"/>
      <div className="sidebar-tiles">
        <div className="sidebar-tiles__item sidebar-tiles__item_disabled">
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-house" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">Property Search</div>
          </div>
        </div>
        <div className="sidebar-tiles__item sidebar-tiles__item_disabled">
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-comments" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">Testimonials</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditIntegrationTab;