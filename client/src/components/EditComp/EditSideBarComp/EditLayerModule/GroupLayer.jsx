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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "../../../DragnDrop/Draggable";
import GroupObjectsLayer from "./GroupObjectsLayer";
import { selectProfile } from "../../../../store/app/AccountInformation/profile";
import { toast } from "react-toastify";

const GroupLayer = ({ object, updateObjects, index }) => {
    const [layer, setLayer] = useState({ title: "", isLocked: false, isAdminLocked: false });
    const [isExpanded, setIsExpanded] = useState(false);

    // ** Var
    const dispatch = useDispatch()
    const canvasContainer = getCanvasRef();
    const selectedCanvas = useSelector(selectSelectedCanvas);
    const userProfile = useSelector(selectProfile);
    const canvas = canvasContainer[selectedCanvas];
    const selectedObject = useSelector(selectSelectedObject);

    const deleteObject = () => {
        dispatch(updateSelectedObject(null))
        updateObjects(object.id);
        canvas.remove(object);
        canvas.renderAll()
    };

    const lockObject = () => {
        if (object?.isAdminLocked) {
            toast.info('This Layer is Locked by Admin')
            return;
        }

        object.set({
            selectable: !layer.isLocked ? false : true,
            hasControls: !layer.isLocked ? false : true,
            lockMovementX: !layer.isLocked ? true : false,
            lockMovementY: !layer.isLocked ? true : false,
            isLocked: !layer.isLocked,
            isAdminLocked: false
        });
        setLayer(prevState => ({
            ...prevState,
            isLocked: !prevState.isLocked,
            isAdminLocked: false
        }));
        canvas.renderAll();
    };

    const lockAdminObject = () => {
        object.set({
            selectable: !layer.isAdminLocked ? false : true,
            hasControls: !layer.isAdminLocked ? false : true,
            lockMovementX: !layer.isAdminLocked ? true : false,
            lockMovementY: !layer.isAdminLocked ? true : false,
            isLocked: !layer.isAdminLocked,
            isAdminLocked: !layer.isAdminLocked
        });

        setLayer(prevState => ({
            ...prevState,
            isLocked: !prevState.isAdminLocked,
            isAdminLocked: !prevState.isAdminLocked
        }));

        canvas?.renderAll();
    };

    const activateObject = (event) => {
        // We check if 'icon' isn't in the class name to prevent this function from triggering and causing an error when deleting the object.
        // console.log(event.target.classList)
        if (event.target.classList.contains('icon') || event.target.classList.length === 0) return;
        dispatch(updateSelectedObject(object))
        canvas.setActiveObject(object)
        canvas.renderAll()
    }

    const handleNameChange = (text) => {
        object.set({ name: text })
        setLayer(prevState => ({
            ...prevState,
            title: text
        }));
        canvas.renderAll()
    }

    const handleGroupObjectNameChange = (text) => {

    }

    useEffect(() => {
        // console.log("ObjectImageLayer --> ", object)
        if (object?.isAdminLocked) {
            object?.set({
                selectable: false,
                hasControls: false,
                lockMovementX: true,
                lockMovementY: true,
                isLocked: true,
                isAdminLocked: true
            })
        }

        setLayer({
            title: object?.name ? object?.name : object?.text,
            isLocked: object?.isLocked,
            isAdminLocked: object?.isAdminLocked,
        });
    }, [object]);

    return (
        <div className={`tree__item ${object?.id === selectedObject?.id ? "tree__item_selected" : ''} 
        ${layer.isLocked ? "layers__item_user-lock" : ''} ${isExpanded ? 'tree__item_expanded' : ''}`}
            style={{ background: layer.isAdminLocked && '#ffdcdc' }}>

            <Draggable key={index.toString()} id={index.toString()} data={object}>
                <div className="tree__root-box" draggable="true" onMouseDown={event => activateObject(event)}>
                    <div className="tree__indent-box" onMouseDown={event => activateObject(event)} />
                    <div className="tree__root">
                        <div className="layers__item">
                            <div className="layers__root">
                                <div className="layers__chevron-box" onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" rotation={isExpanded ? 180 : 90} size="xs" />
                                </div>
                                <div className="layers__title">
                                    <FontAwesomeIcon icon="fa-regular fa-folder" style={{ marginLeft: 5, marginRight: 5 }} size="2xs" />
                                    <input
                                        className="layers__title-input"
                                        value={layer.title ?? ""}
                                        draggable={false}
                                        aria-selected
                                        onChange={(event) => handleNameChange(event.target.value)}
                                        onClick={(event) => {
                                            // event.preventDefault();
                                            event.target.focus();
                                        }}
                                    />
                                </div>
                                <div className="layers__options">
                                    <div className="d-flex flex-nowrap">
                                        {userProfile?.isAdmin && (
                                            <Icon
                                                icon={
                                                    layer.isAdminLocked
                                                        ? "material-symbols-light:lock-open"
                                                        : "material-symbols-light:lock-outline"
                                                }
                                                className="icon icon-lock lock lock_user lock_locked cursor-pointer"
                                                style={{ margin: "0 5px", fontSize: "medium", color: 'maroon' }}
                                                onMouseDown={lockAdminObject}
                                            />
                                        )}

                                        <Icon
                                            icon={
                                                layer.isLocked
                                                    ? "material-symbols-light:lock-open"
                                                    : "material-symbols-light:lock-outline"
                                            }
                                            className="icon icon-lock lock lock_user lock_locked cursor-pointer"
                                            style={{ margin: "0 5px", fontSize: "medium" }}
                                            onMouseDown={lockObject}
                                        />
                                    </div>
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
            </Draggable>


            <div className="tree__children-box">
                {object?._objects?.length > 0 && object?._objects?.map((groupObject, index) => (
                    <GroupObjectsLayer key={index.toString()} index={index.toString()} object={groupObject} group={object} updateObjects={updateObjects} />
                ))}
            </div>
        </div>
    );
}

export default GroupLayer