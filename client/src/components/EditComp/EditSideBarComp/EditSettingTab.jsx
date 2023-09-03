import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditSettingTab(props) {
  return (
    <div
      className={props.openDrawer === 'Settings'
      ? "sidebar-module settings-sidebar-module vertical-switch-content-enter-done"
      : "sidebar-module settings-sidebar-module vertical-switch-content-exit-done"}>
      <div className="sidebar-module__title">Settings</div>
      <div className="sidebar-module__divider"/>
      <div className="sidebar-tiles">
        <div className="sidebar-tiles__item">
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-sliders" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">Preferences</div>
          </div>
        </div>
        <div className="sidebar-tiles__item">
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-panorama" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">Background</div>
          </div>
        </div>
      </div>
      <div className="sidebar-module__divider mb-3"/>
      <div className="sidebar-module__title">Document Specs</div>
      <div className="settings-sidebar-module__info">
        Design type:{" "}
        <span className="settings-sidebar-module__info-value">
          Social Media Posts
        </span>
      </div>
      <div className="settings-sidebar-module__info">
        Minimum pages:{" "}
        <span className="settings-sidebar-module__info-value">1</span>
      </div>
      <div className="settings-sidebar-module__info">
        Maximum pages:{" "}
        <span className="settings-sidebar-module__info-value">unlimited</span>
      </div>
      <div className="settings-sidebar-module__info">
        Page count divisible by:{" "}
        <span className="settings-sidebar-module__info-value">1</span>
      </div>
      <div className="settings-sidebar-module__info">
        Resolution:{" "}
        <span className="settings-sidebar-module__info-value">1080 x 1080</span>
      </div>
    </div>
  )
}

export default EditSettingTab