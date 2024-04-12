import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCanvasContainer, selectSelectedCanvas } from "../../../store/app/Edit/Canvas/canvas";
import { fabric } from 'fabric';
import { useTranslation } from 'react-i18next';


function NavUndoRedoButtonSet() {

    const { t } = useTranslation()

    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas);

    const [myCanvas, setMyCanvas] = useState(null);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const [undoStatus, setUndoStatus] = useState(false);
    const [redoStatus, setRedoStatus] = useState(false);

    const [previousState, setPreviousState] = useState(null);

    // useEffect(() => {
    //     const canvas = canvasContainer[selectedCanvas];

    //     // console.log("canvas: ", canvas)

    //     if (!canvas) {
    //         // console.error(`Canvas not found for selectedCanvas: ${selectedCanvas}`);
    //         return;
    //     }

    //     canvasContainer?.forEach((canvas, index) => {
    //         setUndoStack(prevStack => ({
    //             ...prevStack,
    //             [index]: [canvas?.toJSON()] // Initialize with initial state
    //         }));
    //     });

    //     const handleObjectModified = (event) => {
    //         // console.log("Object modified");

    //         if (canvas && event) {
    //             const currentState = canvas.toJSON();
    //             if (currentState !== previousState) {
    //                 setUndoStack(prevStack => ({ ...prevStack, [selectedCanvas]: [...prevStack[selectedCanvas], currentState] }));
    //                 setRedoStack(prevStack => ({ ...prevStack, [selectedCanvas]: [] }));
    //                 setPreviousState(currentState);
    //             }
    //         }

    //         setUndoStatus(false);
    //         setRedoStatus(false);
    //     };

    //     // Handle object deletion and other custom events as needed
    //     const handleObjectRemoved = handleObjectModified;
    //     // const handleObjectAdded = handleObjectModified;

    //     canvas.on("object:modified", handleObjectModified);
    //     // canvas.on("object:removed", handleObjectRemoved);
    //     // canvas.on("object:added", handleObjectAdded);

    //     setMyCanvas(canvas);
    //     canvasContainer.forEach((canvas, index) => {
    //         setUndoStack(prevStack => ({
    //             ...prevStack,
    //             [index]: [canvas.toJSON()] // Initialize with initial state
    //         }));
    //     });

    //     return () => {
    //         //   canvas.off("object:modified", handleObjectModified);
    //         //   canvas.off("object:removed", handleObjectRemoved);
    //         //   canvas.off("object:added", handleObjectAdded);
    //     };
    // }, [canvasContainer, selectedCanvas]);

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas];

        if (!canvas) {
            console.error(`Canvas not found for selectedCanvas: ${selectedCanvas}`);
            return;
        }

        try {
            // Set initial undo stack for each canvas in canvasContainer
            const initialUndoStack = canvasContainer.reduce((stack, c, index) => {
                stack[index] = [c.toJSON()];
                return stack;
            }, {});
            setUndoStack(initialUndoStack);

            const handleObjectModified = (event) => {

                const canvasClass = event.target?.canvas?.lowerCanvasEl?.id;
                const canvasId = canvasClass.split('-')[1];
                const canvas = canvasContainer[canvasId - 1];

                if (canvas && event) {
                    // const currentState = canvas.toJSON();
                    const currentState = {
                        background: canvas.backgroundColor ? canvas.backgroundColor : canvas.backgroundImage,
                        objects: canvas.getObjects().map((obj) => {
                            // Extract all object attributes and include custom attributes
                            const allAttributes = {
                                ...obj,
                                name: obj.name,
                                id: obj.id,
                                isAdminLocked: obj.isAdminLocked ? obj.isAdminLocked : false,
                                selectable: obj.isAdminLocked ? false : true,
                                hasControls: obj.isAdminLocked ? false : true,
                                lockMovementX: obj.isAdminLocked ? true : false,
                                lockMovementY: obj.isAdminLocked ? true : false,
                                // Add any other custom attributes you want to retain
                            };

                            if (obj.type === 'Shape') {
                                allAttributes.svgUrl = obj.svgUrl;
                            }

                            return allAttributes;
                        }),
                        version: canvas.version
                    }
                    if (currentState !== previousState) {
                        setUndoStack(prevStack => ({
                            ...prevStack,
                            [canvasId - 1]: [...prevStack[canvasId - 1], currentState]
                        }));
                        setRedoStack(prevStack => ({
                            ...prevStack,
                            [canvasId - 1]: []
                        }));
                        setPreviousState(currentState);
                    }
                }

                setUndoStatus(false);
                setRedoStatus(false);
            };

            // Handle object modification event
            canvasContainer.map((canvas, index) => {
                canvas.on("object:modified", handleObjectModified);
            })

            // Clean up event listener
            return () => {
                // canvas.off("object:modified", handleObjectModified);
            };
        } catch (error) {
            console.error("Error in useEffect:", error);
        }
    }, [canvasContainer, selectedCanvas]);

    async function processObjects(objects, index) {
        if (index >= objects.length) {
            // End of objects array
            return;
        }

        const object = objects[index];

        const canvas = canvasContainer[selectedCanvas];

        if (object.type === 'Text') {
            const textbox = new fabric.Textbox(object.text, object);
            canvas.add(textbox);
        } else if (object.type === 'Shape') {
            if (object?.path?.length > 0) {
                const path = new fabric.Path(object.path, object);
                canvas.add(path);
            } else if (object?.objects?.length > 0) {
                let svgPaths = [];
                object.objects.forEach(svgObject => {
                    if (svgObject.path) {
                        try {
                            const path = new fabric.Path(svgObject.path, { ...svgObject });
                            svgPaths.push(path);
                        } catch (error) {
                            console.error('Error creating Fabric.js path:', error);
                        }
                    }
                });

                if (svgPaths.length > 0) {
                    const group = new fabric.Group(svgPaths, { ...object });
                    canvas.add(group);
                }
            } else if (object?.svgUrl) {
                const svg = await new Promise((resolve, reject) => {
                    fabric.loadSVGFromURL(object.svgUrl, function (objects, options) {
                        const svg = fabric.util.groupSVGElements(objects, options);
                        svg.set({ ...object });
                        resolve(svg);
                    });
                });
                canvas.add(svg);
            }
        } else if (object.type === 'Image') {
            const img = await new Promise((resolve, reject) => {
                fabric.Image.fromURL(object.src, function (img) {
                    img.set({ ...object, crossOrigin: 'anonymous' });
                    resolve(img);
                }, { crossOrigin: 'anonymous' });
            });
            canvas.add(img);
        } else {
            console.error("Unsupported object type:", object.type);
        }

        // Process next object
        await processObjects(objects, index + 1);
    }

    // const handleUndo = () => {

    //     if (undoStack.length > 2) {
    //         const lastState = undoStack.pop();
    //         const prevState = undoStack[undoStack.length - 1];

    //         const prevStateObjects = prevState.objects;

    //         const canvas = canvasContainer[selectedCanvas]

    //         const prevStateWithoutObjects = {
    //             ...prevState,
    //             // objects: canvasObjectsWithPropertySearch.filter((object) => object.type !== "Shape")
    //             objects: []
    //         }

    //         if (prevState) {
    //             setRedoStack((prevStack) => [lastState, ...prevStack]);
    //             setUndoStatus(true);
    //             myCanvas.loadFromJSON(prevStateWithoutObjects, () => myCanvas.renderAll());
    //             processObjects(prevStateObjects, 0);
    //         } else {
    //             console.log("No more changes to undo");
    //         }
    //         // Start processing objects

    //     } else {
    //         console.log("Undo stack is empty");
    //     }
    // };

    const handleUndo = () => {
        if (canvasContainer[selectedCanvas]) {
            const canvasId = selectedCanvas;
            const stack = undoStack[canvasId];
            if (stack.length > 2) {
                const lastState = stack.pop();
                const prevState = stack[stack.length - 1];

                const prevStateObjects = prevState.objects;

                const canvas = canvasContainer[selectedCanvas]

                const prevStateWithoutObjects = {
                    ...prevState,
                    // objects: canvasObjectsWithPropertySearch.filter((object) => object.type !== "Shape")
                    objects: []
                }

                if (prevState) {
                    setRedoStack(prevStack => ({ ...prevStack, [canvasId]: [lastState, ...prevStack[canvasId]] }));
                    setUndoStatus(true);
                    canvas.loadFromJSON(prevStateWithoutObjects, () => canvas.renderAll());
                    processObjects(prevStateObjects, 0);
                } else {
                    console.log("No more changes to undo");
                }
            } else {
                console.log("Undo stack is empty");
            }
        }
    };


    const handleRedo = () => {
        if (canvasContainer[selectedCanvas]) {
            const canvasId = selectedCanvas;
            const stack = redoStack[canvasId];
            if (stack.length > 0) {
                const nextState = stack.shift();
                const nextStateObjects = nextState.objects;

                const canvas = canvasContainer[selectedCanvas];

                const nextStateWithoutObjects = {
                    ...nextState,
                    objects: []
                };

                if (nextState) {
                    setUndoStack(prevStack => ({ ...prevStack, [canvasId]: [...prevStack[canvasId], canvas.toJSON()] }));
                    setRedoStack({ ...redoStack, [canvasId]: stack });
                    setRedoStatus(true);
                    canvas.loadFromJSON(nextStateWithoutObjects, () => canvas.renderAll());
                    processObjects(nextStateObjects, 0);
                } else {
                    console.log("No more changes to redo");
                }
            } else {
                console.log("Redo stack is empty");
            }
        }
    };


    // const handleRedo = () => {
    //     if (redoStack.length > 0) {
    //         const nextState = redoStack.shift();
    //         setUndoStack([...undoStack, myCanvas.toJSON()]);
    //         setRedoStatus(true);
    //         myCanvas.loadFromJSON(nextState, () => myCanvas.renderAll());
    //     } else {
    //         console.log("Redo stack is empty");
    //     }
    // };



    return (
        <ul className="header__button-set">
            <li
                className="header__text-button"
                data-test="undo-button"
                onClick={handleUndo}
                disabled={undoStack.length <= 1}
            >
                {t("undo")}
            </li>
            <li
                className="header__text-button"
                data-test="redo-button"
                onClick={handleRedo}
                disabled={redoStack.length === 0}
            >
                {t("redo")}
            </li>
        </ul>
    );
}

export default NavUndoRedoButtonSet;
