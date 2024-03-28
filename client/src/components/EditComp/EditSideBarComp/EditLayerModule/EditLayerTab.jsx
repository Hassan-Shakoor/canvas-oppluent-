// ** Library
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { DndContext } from '@dnd-kit/core';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

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
import GroupLayer from "./GroupLayer";
import { Draggable } from "../../../DragnDrop/Draggable";

function EditLayerTab() {
  // ** State
  const [objects, setObjects] = useState([]);
  const [render, setRender] = useState(false);

  // ** Vars
  const openDrawer = useSelector(selectOpenDrawer);
  const canvasContainer = getCanvasRef();
  const selectedCanvas = useSelector(selectSelectedCanvas);

  const updateObjects = (objectId) => {
    setObjects(objects.filter((object) => object.id !== objectId));
  };

  // const handleDragEnd = (event) => {
  //   const { active, over } = event
  //   const fromIndex = parseInt(active?.id,10)
  //   const toIndex = parseInt(over?.id,10)
  //   if (fromIndex !== toIndex && toIndex !== undefined && fromIndex !== undefined) {
  //     // console.log(fromIndex, toIndex)
  //     const updatedObjects = [...objects];
  //     // console.log({updateObjects})
  //     const [movedObject] = updatedObjects.splice(fromIndex, 1);
  //     // console.log({movedObject})
  //     updatedObjects.splice(toIndex, 0, movedObject);
  //     setObjects(updatedObjects)
  //   }
  // }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const fromIndex = parseInt(active?.id, 10);
    const toIndex = parseInt(over?.id, 10);

    const canvas = canvasContainer[selectedCanvas];

    const overObject = objects[toIndex];

    if (fromIndex !== toIndex && toIndex !== undefined && fromIndex !== undefined && fromIndex !== NaN && toIndex !== NaN) {
      const updatedObjects = [...objects];
      const [movedObject] = updatedObjects.splice(fromIndex, 1);

      if (overObject?.type === OBJECT_TYPE.GROUP) {
        const groupId = overObject?.id;
        const canvas = canvasContainer[selectedCanvas];
        const group = canvas?.getObjects().find(obj => obj.type === OBJECT_TYPE.GROUP && obj.id === groupId);

        if (group) {
          group.addWithUpdate(movedObject);
          canvas?.remove(movedObject);
          canvas?.renderAll();
          setRender(!render);
          return;
        }
      }

      canvas.moveTo(movedObject, toIndex);

      canvas?.renderAll();

      updatedObjects.splice(toIndex, 0, movedObject);
      setObjects(updatedObjects);
    }
  };



  const createGroup = () => {
    const canvas = canvasContainer[selectedCanvas]
    const group = new fabric.Group([], {
      left: 0,
      top: 0,
      type: 'Group',
      name: 'New Group Layer',
      id: uuidv4(),
      selectable: true, // Allow the group to be selected
    });
    canvas.add(group);
    setRender(!render);
    // setNewGroup(group);
  };

  const groupObjects = () => {
    const canvas = canvasContainer[selectedCanvas];
    const selectedObjects = canvas?.getActiveObjects();
    if (selectedObjects && selectedObjects?.length > 1) {
      const group = new fabric.Group(selectedObjects, {
        left: 0,
        top: 0,
        id: uuidv4(),
        name: 'Group Layer',
        type: 'Group'
      });
      canvas?.add(group);
      setRender(!render);
      canvas?.renderAll();
    }
  };

  const ungroupObjects = () => {
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "group") {
      canvas?.discardActiveObject();
      const items = activeObject.getObjects();
      canvas?.remove(activeObject);
      items.forEach((item) => {
        canvas?.add(item);
      });
      canvas?.renderAll();
    }
  };

  const handleDrop = (event) => {
    // console.log('Dropped data:', data);
    // Handle the dropped data here
    const { active, over } = event;

    if (!over) {
      return;
    }

    const fromIndex = parseInt(active?.id, 10);
    const toIndex = parseInt(over?.id, 10);

    const canvas = canvasContainer[selectedCanvas];

    const overObject = objects[toIndex];

    if (fromIndex !== toIndex && toIndex !== undefined && fromIndex !== undefined && fromIndex !== NaN && toIndex !== NaN) {
      const updatedObjects = [...objects];
      const [movedObject] = updatedObjects.splice(fromIndex, 1);

      if (overObject?.type === OBJECT_TYPE.GROUP) {
        const groupId = overObject?.id;
        const canvas = canvasContainer[selectedCanvas];
        const group = canvas?.getObjects().find(obj => obj.type === OBJECT_TYPE.GROUP && obj.id === groupId);

        if (group) {
          group.addWithUpdate(movedObject);
          canvas?.remove(movedObject);
          canvas?.renderAll();
          setRender(!render);
          return;
        }
      }

      canvas.moveTo(movedObject, toIndex);

      canvas?.renderAll();

      updatedObjects.splice(toIndex, 0, movedObject);
      setObjects(updatedObjects);
    }
  };

  useEffect(() => {
    setObjects(canvasContainer[selectedCanvas].getObjects());
    console.log("Objects --> ", objects)
  }, [selectedCanvas, canvasContainer, render]);

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
                  <div className="ms-auto layers__options" >
                    <FontAwesomeIcon icon="fa-solid fa-folder-plus" onClick={createGroup} data-tooltip='Create New Group'
                      className="icon icon-folder-plus layers__folder-button cursor-pointer" />
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
                  <Droppable key={index.toString()} id={index.toString()} onDrop={handleDrop}>
                    {/* <Draggable key={index.toString()} id={index.toString()} data={object}> */}
                      {object?.type === OBJECT_TYPE.ITEXT ? (
                        <TextLayer key={index} index={index} object={object} updateObjects={updateObjects} />
                      ) : object?.type === OBJECT_TYPE.GROUP ? (
                        <GroupLayer key={index} object={object} updateObjects={updateObjects} />
                      ) : (
                        <ImageLayer key={index} object={object} updateObjects={updateObjects} />
                      )}
                    {/* </Draggable> */}
                  </Droppable>
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
