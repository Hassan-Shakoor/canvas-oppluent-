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

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas];

        // console.log("canvas: ", canvas)

        if (!canvas) {
            // console.error(`Canvas not found for selectedCanvas: ${selectedCanvas}`);
            return;
        }

        const handleObjectModified = () => {
            // console.log("Object modified");

            if (!undoStatus && !redoStatus && canvas) {
                const currentState = canvas.toJSON();
                if (currentState !== previousState) {
                    setUndoStack(prevStack => [...prevStack, currentState]);
                    setPreviousState(currentState);
                    setRedoStack([]);
                }
            }

            setUndoStatus(false);
            setRedoStatus(false);
        };

        // Handle object deletion and other custom events as needed
        const handleObjectRemoved = handleObjectModified;
        // const handleObjectAdded = handleObjectModified;

        canvas.on("object:modified", handleObjectModified);
        // canvas.on("object:removed", handleObjectRemoved);
        // canvas.on("object:added", handleObjectAdded);

        setMyCanvas(canvas);
        setUndoStack([canvas.toJSON()]); // Initialize with initial state

        return () => {
            //   canvas.off("object:modified", handleObjectModified);
            //   canvas.off("object:removed", handleObjectRemoved);
            //   canvas.off("object:added", handleObjectAdded);
        };
    }, [canvasContainer, selectedCanvas]);

    const handleUndo = () => {
        if (undoStack.length > 1) {
            const lastState = undoStack.pop();
            const prevState = undoStack[undoStack.length - 1];

            const prevStateObjects = prevState.objects;

            const canvas = canvasContainer[selectedCanvas]

            const prevStateWithoutObjects = {
                ...prevState,
                // objects: canvasObjectsWithPropertySearch.filter((object) => object.type !== "Shape")
                objects: []
            }

            async function processObjects(objects, index) {
                if (index >= objects.length) {
                    // End of objects array
                    return;
                }

                const object = objects[index];

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
            if (prevState) {
                processObjects(prevStateObjects, 0);


                setRedoStack((prevStack) => [lastState, ...prevStack]);
                setUndoStatus(true);
                myCanvas.loadFromJSON(prevStateWithoutObjects, () => myCanvas.renderAll());
            } else {
                console.log("No more changes to undo");
            }
            // Start processing objects

        } else {
            console.log("Undo stack is empty");
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            const nextState = redoStack.shift();
            setUndoStack([...undoStack, myCanvas.toJSON()]);
            setRedoStatus(true);
            myCanvas.loadFromJSON(nextState, () => myCanvas.renderAll());
        } else {
            console.log("Redo stack is empty");
        }
    };

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
