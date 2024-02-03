// ** Library
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {DndContext} from '@dnd-kit/core';

// ** Store
import { selectOpenDrawer } from "../../../../store/app/Edit/EditDrawer";
import { selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas";

// ** Custom Component
import TextLayer from "./TextLayer";
import ImageLayer from "./ImageLayer";

// Shared
import { getCanvasRef } from "../../../../shared/utils/fabric";
import { OBJECT_TYPE } from "../../../../shared/constant";
import { Droppable } from "../../../DragnDrop/Droppable";

function EditLayerTab() {
  // ** State
  const [objects, setObjects] = useState([]);

  // ** Vars
  const openDrawer = useSelector(selectOpenDrawer);
  const canvasContainer = getCanvasRef();
  const selectedCanvas = useSelector(selectSelectedCanvas);

  const updateObjects = (objectId) => {
    setObjects(objects.filter((object) => object.id !== objectId));
  };

  const handleDragEnd = (event) => {
    const {active, over} = event
    const fromIndex = active?.id
    const toIndex = over?.id
    if(fromIndex !== toIndex && toIndex !== undefined && fromIndex !== undefined){
      console.log(fromIndex, toIndex)
      const updatedObjects = [...objects];
      console.log({updateObjects})
      const [movedObject] = updatedObjects.splice(fromIndex, 1);
      console.log({movedObject})
      updatedObjects.splice(toIndex, 0, movedObject);
      setObjects(updatedObjects)
    }
  }

  

  useEffect(() => {
    setObjects(canvasContainer[selectedCanvas].getObjects());
    console.log("Objects --> ", objects)
  }, [selectedCanvas, canvasContainer]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
    <div
      className={
        openDrawer === "Layers"
          ? "layers-module vertical-switch-content-enter-done"
          : "layers-module vertical-switch-content-exit-done"
      }
    >
      <div className="layers">
        <div className="layers__search-box">
          <div className="small-search small-search_bordered">
            <div className="small-search__icon-wrapper">
              <svg className="icon v2-icon v2-icon-loupe">
                <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe" />
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
                defaultValue=""
              />
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
              {objects?.map((object, index) => 
                object?.type === OBJECT_TYPE.ITEXT ? (
                  <Droppable key={index} id={index}>
                    <TextLayer key={index} index={index} object={object} updateObjects={updateObjects} />
                  </Droppable>
                ) : (
                  <ImageLayer object={object} updateObjects={updateObjects} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </DndContext>
  );
}

export default EditLayerTab;
