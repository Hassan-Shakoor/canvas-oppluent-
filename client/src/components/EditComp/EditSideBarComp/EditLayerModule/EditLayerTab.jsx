// ** Library
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

// ** Store
import { selectOpenDrawer } from "../../../../store/app/Edit/EditDrawer";
import { selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas";

// ** Custom Component
import TextLayer from "./TextLayer";
import ImageLayer from "./ImageLayer";

// Shared
import { getCanvasRef } from "../../../../shared/utils/fabric";
import { OBJECT_TYPE } from "../../../../shared/constant";

function EditLayerTab() {
  // ** State
  const [objects, setObjects] = useState([])

  // ** Vars
  const openDrawer = useSelector(selectOpenDrawer)
  const canvasContainer = getCanvasRef()
  const selectedCanvas = useSelector(selectSelectedCanvas)


  const updateObjects = (objectId) => {
    setObjects(objects.filter(object => object.id !== objectId))
  } 

  useEffect(() => {
    setObjects(canvasContainer[selectedCanvas].getObjects())
  },[selectedCanvas, canvasContainer])

  return (
    <div
      className=
      {openDrawer === 'Layers' ? "layers-module vertical-switch-content-enter-done" : "layers-module vertical-switch-content-exit-done"}>
      <div className="layers">
        <div className="layers__search-box">
          <div className="small-search small-search_bordered">
            <div className="small-search__icon-wrapper">
              <svg className="icon v2-icon v2-icon-loupe">
                <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe"/>
              </svg>
            </div>
            <div className="small-search__input">
              <input
                autoComplete="off"
                id="small-search"
                name="small-search"
                placeholder="Search through layers"
                type="search"
                className="simple-input"
                defaultValue=""/>
            </div>
          </div>
        </div>
        <div className="layers__content-box">
          <div className="tree">
            <div className="layers__admin-panel">
              <div className="layers__root">
                <div className="fw-bolder">Actions</div>
                <div className="ms-auto layers__options">
                  <FontAwesomeIcon icon="fa-solid fa-folder-plus" />
                </div>
                <div className="layers__points">
                  <div className="">
                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                  </div>
                </div>
              </div>
            </div>
            <div className="tree__items-box">
              {objects?.map(object => (
                object?.type === OBJECT_TYPE.ITEXT ? <TextLayer object={object} updateObjects={updateObjects}/> : <ImageLayer object={object} updateObjects={updateObjects}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLayerTab