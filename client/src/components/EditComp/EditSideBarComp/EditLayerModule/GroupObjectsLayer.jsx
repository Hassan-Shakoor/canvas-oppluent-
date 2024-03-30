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
import { updateOpenDrawer } from "../../../../store/app/Edit/EditDrawer";

const GroupObjectsLayer = ({ object, updateObjects, index, group }) => {
    const [layer, setLayer] = useState({ title: "", isLocked: false });

    // ** Var
    const dispatch = useDispatch()
    const canvasContainer = getCanvasRef();
    const selectedCanvas = useSelector(selectSelectedCanvas);
    const canvas = canvasContainer[selectedCanvas];
    const selectedObject = useSelector(selectSelectedObject);

    const deleteObject = () => {
        if (canvas && group && object) {
            // Remove the object from the group
            group.removeWithUpdate(object);

            // Remove the object from the canvas
            canvas.remove(object);

            // Re-render the canvas
            canvas.renderAll();
        }

        // Dispatch any necessary actions
        dispatch(updateSelectedObject(null));
    };

    const moveObjectOutOfGroup = () => {
        if (canvas && group && object) {
            group.removeWithUpdate(object);
            canvas.add(object);
            canvas.renderAll();
        }
        dispatch(updateSelectedObject(null));
        dispatch(updateOpenDrawer(null))
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

    // const activateObject = (event) => {
    //     // We check if 'icon' isn't in the class name to prevent this function from triggering and causing an error when deleting the object.
    //     // console.log(event.target.classList)
    //     if (event.target.classList.contains('icon') || event.target.classList.length === 0) return;
    //     // console.log("triggered")
    //     dispatch(updateSelectedObject(object))
    //     canvas.setActiveObject(object)
    //     canvas.renderAll()
    // }

    const handleNameChange = (text) => {
        object.set({ name: text })
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
        // console.log("Object --> ", object)
    }, [object]);

    return (
        // <Draggable id={index}>
        <div
            className={`tree__item ${object?.id === selectedObject?.id ? "tree__item_selected" : ''}
       ${layer.isLocked && "layers__item_user-lock"}`}
        // onMouseDown={event => activateObject(event)}
        >
            {/* <Draggable key={index.toString()} id={index.toString()} data={object}> */}
            <div key={index} className="tree__item" > {/* onClick={(event) => activateObject(event)}> */}
                <div className="tree__root-box" draggable="true">
                    <div className="tree__indent-box">
                        <div className="tree__indent"></div>
                    </div>
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
                                        draggable="true"
                                        value={layer.title ?? ""}
                                        onChange={(event) => handleNameChange(event.target.value)}
                                    />
                                </div>
                                <div className="layers__options" style={{ margin: 0, marginLeft: '5px' }}>
                                    <div className="d-flex flex-nowrap align-items-center" >
                                        <div className="tooltip" style={{ height: '18px' }}>
                                            <span className="tooltiptext">Ungroup</span>
                                            <Icon
                                                icon="material-symbols-light:drive-file-move-outline"
                                                className="icon icon-lock lock lock_user lock_locked cursor-pointer tooltip"
                                                style={{ margin: '0 10px', fontSize: "medium", border: 'none' }}
                                                onMouseDown={moveObjectOutOfGroup}
                                            />
                                        </div>
                                        <Icon
                                            icon="material-symbols:delete-outline"
                                            className="icon layers__remove-button"
                                            style={{ fontSize: "13px", cursor: "pointer" }}
                                            onMouseDown={deleteObject}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tree__children-box"></div>
            </div>
            {/* </Draggable> */}
            <div className="tree__children-box" />
        </div>
        // </Draggable>
    );
};

export default GroupObjectsLayer;
