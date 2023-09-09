// ** React Imports
import React from "react"

function EditDocSpec({designType, minPages, maxPages, divisibleBy, resolution}){
    return (
    <>
      <div className="sidebar-module__divider mb-3"/>
      <div className="sidebar-module__title">Document Specs</div>
      <div className="settings-sidebar-module__info">
        Design type:{" "}
        <span className="settings-sidebar-module__info-value">
          {designType}
        </span>
      </div>
      <div className="settings-sidebar-module__info">
        Minimum pages:{" "}
        <span className="settings-sidebar-module__info-value">{minPages}</span>
      </div>
      <div className="settings-sidebar-module__info">
        Maximum pages:{" "}
        <span className="settings-sidebar-module__info-value">{maxPages}</span>
      </div>
      <div className="settings-sidebar-module__info">
        Page count divisible by:{" "}
        <span className="settings-sidebar-module__info-value">{divisibleBy}</span>
      </div>
      <div className="settings-sidebar-module__info">
        Resolution:{" "}
        <span className="settings-sidebar-module__info-value">{resolution}</span>
      </div>
    </>
    )
}

export default EditDocSpec