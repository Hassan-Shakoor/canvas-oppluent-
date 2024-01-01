// ** React Imports
import React from "react"
import { useSelector } from 'react-redux'

// ** Store
import { selectTemplateData } from "../../../../store/app/Edit/Canvas/canvas"

function EditDocSpec(){
  // ** Vars
  const templateData = useSelector(selectTemplateData)
  const docSpecs = templateData?.docSpecs

    return (
    <>
      <div className="sidebar-module__divider mb-3"/>
      <div className="sidebar-module__title">Document Specs</div>
      <div className="settings-sidebar-module__info">
        Design type:{" "}
        <span className="settings-sidebar-module__info-value">
          {templateData?.docSpecs?.designType ?? 'Social Media Posts'}
        </span>
      </div>
      <div className="settings-sidebar-module__info">
        Minimum pages:{" "}
        <span className="settings-sidebar-module__info-value">{docSpecs?.minPages ?? '1'}</span>
      </div>
      <div className="settings-sidebar-module__info">
        Maximum pages:{" "}
        <span className="settings-sidebar-module__info-value">{docSpecs?.maxPages ?? 'unlimited'}</span>
      </div>
      <div className="settings-sidebar-module__info">
        Page count divisible by:{" "}
        <span className="settings-sidebar-module__info-value">{docSpecs?.pageCountDivisible ?? '1'}</span>
      </div>
      <div className="settings-sidebar-module__info">
        Resolution:{" "}
        <span className="settings-sidebar-module__info-value">{`${docSpecs?.resolution?.width ?? '1080'} x ${docSpecs?.resolution?.height ?? '1080'}`}</span>
      </div>
    </>
    )
}

export default EditDocSpec