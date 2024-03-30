// ** Library
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
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
import { Icon } from "@iconify/react";

function EditLayerTab() {
  // ** State
  const [objects, setObjects] = useState([]);
  const [render, setRender] = useState(false);
  const [isOpenLockDropdown, setIsOpenLockDropdown] = useState(false);

  // ** Vars
  const openDrawer = useSelector(selectOpenDrawer);
  const canvasContainer = getCanvasRef();
  const selectedCanvas = useSelector(selectSelectedCanvas);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.2,
      },
    })
  )


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

    if (fromIndex !== toIndex && !isNaN(toIndex) && !isNaN(fromIndex)) {
      const updatedObjects = [...objects];
      const [movedObject] = updatedObjects.splice(fromIndex, 1);

      if (overObject?.type === OBJECT_TYPE.GROUP) {
        const groupId = overObject?.id;
        const group = canvas?.getObjects().find(obj => obj.type === OBJECT_TYPE.GROUP && obj.id === groupId);

        if (group) {
          // If the object is being moved into a group
          // Keep the id, name, and type unchanged
          movedObject.id = objects[fromIndex].id // Keep id unchanged
          movedObject.name = objects[fromIndex].name; // Keep name unchanged
          movedObject.type = objects[fromIndex].type; // Keep type unchanged
          console.log("movedObjectBefore: ", updatedObjects)
          group.addWithUpdate(movedObject);
          canvas?.remove(movedObject);
          canvas?.renderAll();
          setRender(!render);
          return;
        }
      }

      // If the object is not moved into a group
      // Keep the id, name, and type unchanged
      console.log("movedObjectAfter: ", objects[fromIndex])
      movedObject.id = objects[fromIndex].id; // Keep id unchanged
      movedObject.name = objects[fromIndex].name; // Keep name unchanged
      movedObject.type = objects[fromIndex].type; // Keep type unchanged

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
      });
      canvas?.add(group);
      setRender(!render);
      canvas?.renderAll();
    }
  };

  const ungroupObjects = () => {
    const canvas = canvasContainer[selectedCanvas];
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "Group") {
      canvas?.discardActiveObject();
      const items = activeObject.getObjects();
      canvas?.remove(activeObject);
      items.forEach((item) => {
        canvas?.add(item);
      });
      canvas?.renderAll();
    }
  };

  const lockAllObjects = () => {
    const canvas = canvasContainer[selectedCanvas];
    const objects = canvas.getObjects();
    const updatedObjects = objects.map(obj => obj.set({
      selectable: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true
    }));
    setObjects(updatedObjects);
    canvas.renderAll();
    setIsOpenLockDropdown(false)

  };

  const unlockAllObjects = () => {
    const canvas = canvasContainer[selectedCanvas];
    const updatedObjects = objects.map(obj => obj.set({
      selectable: true,
      hasControls: true,
      lockMovementX: false,
      lockMovementY: false
    }));
    setObjects(updatedObjects);
    canvas.renderAll();
    setIsOpenLockDropdown(false)
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
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
                  <div className="layers__points" onClick={() => setIsOpenLockDropdown(!isOpenLockDropdown)}>
                    <div className="" style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                    </div>
                  </div>
                  {isOpenLockDropdown && (
                    <div>
                      <div className="rc-dropdown rc-dropdown-placement-bottomRight" style={{
                        '--arrow-x': '141.2265625px',
                        '--arrow-y': '-2px',
                        inset: '177px auto auto 260.773px',
                        boxSizing: 'border-box',
                        minWidth: '14px',
                        position: 'fixed'
                      }}>
                        <ul className="rc-menu rc-menu-root rc-menu-vertical" role="menu" tabIndex="0" data-menu-list="true">
                          <li className="rc-menu-item" role="menuitem" tabIndex="-1" data-menu-id="rc-menu-uuid-45905-6-0">
                            <button type="button" className="btn btn_menu-item" onClick={lockAllObjects}>
                              <span className="btn__text">
                                <Icon
                                  icon="material-symbols-light:lock-open"
                                  className="icon icon-lock lock lock_user lock_locked cursor-pointer"
                                  style={{ margin: "-3px 5px", fontSize: "20px", width: '18px', height: '18px' }}
                                />
                                Lock All Layers
                              </span>
                            </button>
                          </li>
                          <li className="rc-menu-item" role="menuitem" tabIndex="-1" data-menu-id="rc-menu-uuid-45905-6-1">
                            <button type="button" className="btn btn_menu-item" onClick={unlockAllObjects}>
                              <span className="btn__text">
                                <Icon
                                  icon="material-symbols-light:lock-outline"
                                  className="icon icon-lock lock lock_user lock_locked cursor-pointer"
                                  style={{ margin: "-3px 5px", fontSize: "medium", width: '18px', height: '18px' }}
                                />
                                Unlock All Layers
                              </span>
                            </button>
                          </li>
                        </ul>
                        <div aria-hidden="true" style={{ display: 'none' }}></div>
                      </div>
                    </div>)}

                </div>
              </div>
              <div className="tree__items-box">
                {objects?.map((object, index) =>
                  <Droppable key={index.toString()} id={index.toString()}>
                    {object?.type === OBJECT_TYPE.ITEXT ? (
                      <TextLayer key={index} index={index} object={object} updateObjects={updateObjects} />
                    ) : object?.type === OBJECT_TYPE.GROUP ? (
                      <GroupLayer key={index} index={index} object={object} updateObjects={updateObjects} />
                    ) : (
                      <ImageLayer key={index} index={index} object={object} updateObjects={updateObjects} />
                    )}
                    {/* // </Draggable> */}
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
