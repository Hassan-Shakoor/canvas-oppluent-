// ** Library
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// ** Shared
import { getCanvasRef } from "../../../../shared/utils/fabric";

// ** Store
import {
  selectSelectedCanvas,
  selectSelectedObject,
  updateSelectedObject,
} from "../../../../store/app/Edit/Canvas/canvas";

// ** Icon
import { Icon } from "@iconify/react";
import { Draggable } from "../../../DragnDrop/Draggable";

const TextLayer = ({ object, updateObjects, index }) => {
  const [layer, setLayer] = useState({ title: "", isLocked: false });

  // ** Var
  const dispatch = useDispatch()
  const canvasContainer = getCanvasRef();
  const selectedCanvas = useSelector(selectSelectedCanvas);
  const canvas = canvasContainer[selectedCanvas];
  const selectedObject = useSelector(selectSelectedObject);

  const deleteObject = () => {
    dispatch(updateSelectedObject(null))
    updateObjects(object.id);
    canvas.remove(object);
    canvas.renderAll()
  };

  const lockObject = () => {
    object.set({
      selectable: object?.selectable ? false : true,
      hasControls: object?.hasControls ? false : true,
      lockMovementX: object?.lockMovementX ? false : true,
      lockMovementY: object?.lockMovementY ? false : true
    });
    setLayer(prevState => ({
      ...prevState,
      isLocked: !prevState.isLocked
    }));
    canvas.renderAll();
  };

  const activateObject = (event) => {
    // We check if 'icon' isn't in the class name to prevent this function from triggering and causing an error when deleting the object.
    console.log(event.target.classList)
    if(event.target.classList.contains('icon') || event.target.classList.length === 0) return;
    console.log("triggered")
    dispatch(updateSelectedObject(object))
    canvas.setActiveObject(object)
    canvas.renderAll()
  }

  const handleNameChange = (text) => {
    object.set({name: text})
    setLayer(prevState => ({
      ...prevState,
      title: text
    }));
    canvas.renderAll()
  }

  useEffect(() => {
    setLayer({
      title: object?.name ? object?.name : object?.text,
      isLocked: !object?.selectable && !object?.hasControls && object?.lockMovementX && object?.lockMovementY,
    });
  }, [object]);

  return (
    // <Draggable id={index}>
      <div
        className={`tree__item ${
          object?.id === selectedObject?.id && "tree__item_selected"
        } ${layer.isLocked && "layers__item_user-lock"}`}
        onClick={event => activateObject(event)}
      >
        <div className="tree__root-box" draggable="true">
          <div className="tree__indent-box" />
          <div className="tree__root">
            <div className="layers__item">
              <div className="layers__root">
                <div className="layers__title">
                  <Icon
                    icon="solar:layers-linear"
                    className="icon"
                    style={{ margin: "0 5px" }}
                  />
                  <input
                    className="layers__title-input"
                    value={layer.title ?? ""}
                    onChange={(event) => handleNameChange(event.target.value)}
                  />
                </div>
                <div className="layers__options">
                  <div className="d-flex flex-nowrap">
                    <Icon
                      icon={
                        layer.isLocked
                          ? "material-symbols-light:lock-open"
                          : "material-symbols-light:lock-outline"
                      }
                      className="icon icon-lock lock lock_user lock_locked cursor-pointer"
                      style={{ margin: "0 5px", fontSize: "medium" }}
                      onClick={lockObject}
                    />
                  </div>
                </div>
                <Icon
                  icon="material-symbols:delete-outline"
                  className="icon layers__remove-button"
                  style={{ fontSize: "13px", cursor: "pointer" }}
                  onClick={deleteObject}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="tree__children-box" />
      </div>
    // </Draggable>
  );
};

export default TextLayer;
