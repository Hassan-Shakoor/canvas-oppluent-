import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrowDownToLine from '../../assets/icons/arrow-down-to-line.png';
import arrowUpToLine from '../../assets/icons/arrow-up-to-line.png';
import React, { useEffect } from "react";
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { selectCanvasContainer, selectCopiedObject, selectSelectedCanvas, selectSelectedObject, updateCopiedObject } from "../../store/app/Edit/Canvas/canvas";

const MenuItem = ({ iconClass, label, hotKeys, imgSrc, handleClick }) => (
    <div className="contexify_item" tabIndex="-1" role="menuitem" aria-disabled="false" onClick={handleClick}>
        <div className="contexify_itemContent">
            {imgSrc && <img src={imgSrc} alt="" className="" width={20} style={{ marginLeft: '-4.4px', marginRight: '5px', opacity: 0.75 }} />}
            {iconClass && <span className="context-menu__item-icon me-2"><FontAwesomeIcon icon={iconClass} /></span>}
            <span style={{ fontSize: '13px' }}>{label}</span>
            {hotKeys && <span className="context-menu__item-hot-keys">{hotKeys}</span>}
        </div>
    </div>
);

const Separator = () => <div className="contexify_separator" style={{ background: "#d1d1d1", height: "0.5px" }}></div>;

const ContextMenu = ({ left, top, showContextMenu, setShowContextMenu }) => {

    const dispatch = useDispatch()

    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas);
    const selectedObject = useSelector(selectSelectedObject);
    const copiedObject = useSelector(selectCopiedObject);

    useEffect(() => {
        if (!selectedObject) {
            setShowContextMenu(false);
        }
        if (selectedObject?.isAdminLocked) {
            setShowContextMenu(false);
        }
    }, [selectedObject])

    const handleCopy = () => {

        if (selectedObject) {
            const canvas = canvasContainer[selectedCanvas];
            const clonedObject = fabric.util.object.clone(selectedObject);
            // Modify the clonedObject properties if needed
            clonedObject.set({
                left: selectedObject.left + 10,
                top: selectedObject.top + 10
            });

            dispatch(updateCopiedObject(clonedObject));
            // Store the cloned object in a variable or state
            // setCopiedObject(clonedObject);
        }
        setShowContextMenu(false);
    };

    const handleCut = () => {
        // Store the selected object's properties in the clipboard

        // Remove the selected object from the canvas
        if (selectedObject) {
            const canvas = canvasContainer[selectedCanvas];
            const clonedObject = fabric.util.object.clone(selectedObject);

            clonedObject.set({
                left: selectedObject.left + 10,
                top: selectedObject.top + 10
            });

            dispatch(updateCopiedObject(clonedObject));

            // setCopiedObject(clonedObject);
            canvas?.remove(selectedObject);
            canvas?.renderAll();
        }
        setShowContextMenu(false);
    };

    const handleDuplicate = async () => {
        if (selectedObject) {
            const canvas = canvasContainer[selectedCanvas];
            const object = selectedObject.toObject();

            let duplicatedObject;

            if (selectedObject.type === 'Text') {
                duplicatedObject = new fabric.Textbox(object.text, { ...object, id: uuidv4() });
            } else if (selectedObject.type === 'Shape') {
                if (object.path?.length > 0) {
                    duplicatedObject = new fabric.Path(object.path, { ...object, id: uuidv4() });
                } else if (object.objects?.length > 0) {
                    const svgObjects = object.objects.map(svgObject => {
                        if (svgObject.path) {
                            return new fabric.Path(svgObject.path, { ...svgObject });
                        }
                    }).filter(Boolean);
                    duplicatedObject = new fabric.Group(svgObjects, { ...object, id: uuidv4() });
                } else if (object.svgUrl) {
                    const svg = await new Promise((resolve, reject) => {
                        fabric.loadSVGFromURL(object.svgUrl, function (objects, options) {
                            const group = fabric.util.groupSVGElements(objects, options);
                            resolve(group);
                        });
                    });
                    duplicatedObject = svg.set({ ...object, id: uuidv4() });
                }
            } else if (selectedObject.type === 'Image') {
                const img = await new Promise((resolve, reject) => {
                    fabric.Image.fromURL(object.src, function (img) {
                        resolve(img.set({ ...object, id: uuidv4(), crossOrigin: 'anonymous' }));
                    }, { crossOrigin: 'anonymous' });
                });
                duplicatedObject = img;
            } else {
                console.error("Unsupported object type:", selectedObject.type);
                return;
            }

            if (duplicatedObject) {
                duplicatedObject.set({
                    left: object.left + 20, // Adjust position so the duplicate doesn't overlap with the original
                    top: object.top + 20,
                });
                canvas.add(duplicatedObject);
                canvas.renderAll(); // Ensure canvas is rerendered after adding the duplicated object
            }
        }

        setShowContextMenu(false);
    };

    const handlePaste = async () => {
        if (copiedObject) {
            const canvas = canvasContainer[selectedCanvas];
            const object = copiedObject.toObject();

            let duplicatedObject;

            if (copiedObject.type === 'Text') {
                duplicatedObject = new fabric.Textbox(object.text, { ...object, id: uuidv4() });
            } else if (copiedObject.type === 'Shape') {
                if (object.path?.length > 0) {
                    duplicatedObject = new fabric.Path(object.path, { ...object, id: uuidv4() });
                } else if (object.objects?.length > 0) {
                    const svgObjects = object.objects.map(svgObject => {
                        if (svgObject.path) {
                            return new fabric.Path(svgObject.path, { ...svgObject });
                        }
                    }).filter(Boolean);
                    duplicatedObject = new fabric.Group(svgObjects, { ...object, id: uuidv4() });
                } else if (object.svgUrl) {
                    const svg = await new Promise((resolve, reject) => {
                        fabric.loadSVGFromURL(object.svgUrl, function (objects, options) {
                            const group = fabric.util.groupSVGElements(objects, options);
                            resolve(group);
                        });
                    });
                    duplicatedObject = svg.set({ ...object, id: uuidv4() });
                }
            } else if (copiedObject.type === 'Image') {
                const img = await new Promise((resolve, reject) => {
                    fabric.Image.fromURL(object.src, function (img) {
                        resolve(img.set({ ...object, id: uuidv4(), crossOrigin: 'anonymous' }));
                    }, { crossOrigin: 'anonymous' });
                });
                duplicatedObject = img;
            } else {
                console.error("Unsupported object type:", copiedObject.type);
                return;
            }

            if (duplicatedObject) {
                duplicatedObject.set({
                    left: object.left + 20, // Adjust position so the duplicate doesn't overlap with the original
                    top: object.top + 20,
                });
                canvas.add(duplicatedObject);
                canvas.renderAll(); // Ensure canvas is rerendered after adding the duplicated object
            }
        }
        setShowContextMenu(false);
    };

    const handleBringForward = () => {
        if (selectedObject) {
            const canvas = canvasContainer[selectedCanvas];
            canvas?.bringForward(selectedObject);
            canvas?.renderAll();
        }
        setShowContextMenu(false);
    };

    const handleBringToFront = () => {
        if (selectedObject) {
            const canvas = canvasContainer[selectedCanvas];
            canvas?.bringToFront(selectedObject);
            canvas?.renderAll();
        }
        setShowContextMenu(false);
    };

    const handleSendBackward = () => {
        if (selectedObject) {
            const canvas = canvasContainer[selectedCanvas];
            canvas?.sendBackwards(selectedObject);
            canvas?.renderAll();
        }
        setShowContextMenu(false);
    };

    const handleSendToBack = () => {
        if (selectedObject) {
            const canvas = canvasContainer[selectedCanvas];
            canvas?.sendToBack(selectedObject);
            canvas?.renderAll();
        }
        setShowContextMenu(false);
    };

    const handleDelete = () => {
        if (selectedObject) {
            const canvas = canvasContainer[selectedCanvas];
            canvas?.remove(selectedObject);
            canvas?.renderAll();
        }
        setShowContextMenu(false);
    };


    return (
        <div className="contexify context-menu contexify_willEnter-fade" role="menu" style={{ left: `${left}px`, top: `${top}px`, opacity: selectedObject.isAdminLocked ? 0 : 1 }}>
            <MenuItem iconClass="fa-regular fa-copy" label="Copy" hotKeys="⌘C" handleClick={handleCopy} />
            <MenuItem iconClass="fa-solid fa-scissors" label="Cut" hotKeys="⌘X" handleClick={handleCut} />
            <MenuItem iconClass="fa-solid fa-clone" label="Duplicate" hotKeys="⌘D" handleClick={handleDuplicate} />
            {copiedObject && Object.entries(copiedObject)?.length > 0 && (<MenuItem iconClass="fa-regular fa-paste" label="Paste" hotKeys="⌘V" handleClick={handlePaste} />)}
            <Separator />
            <MenuItem iconClass="fa-solid fa-arrow-up-long" label="Bring Forward" hotKeys="" handleClick={handleBringForward} />
            <MenuItem imgSrc={arrowUpToLine} label="Bring to Front" hotKeys="" handleClick={handleBringToFront} />
            <MenuItem iconClass="fa-solid fa-arrow-down-long" label="Send Backward" hotKeys="" handleClick={handleSendBackward} />
            <MenuItem imgSrc={arrowDownToLine} label="Send to Back" hotKeys="" handleClick={handleSendToBack} />
            <Separator />
            <MenuItem iconClass="fa-solid fa-trash" label="Delete" hotKeys="Delete" handleClick={handleDelete} />
        </div>
    );
};

export default ContextMenu;
