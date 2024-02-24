import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCanvasContainer, selectSelectedCanvas } from "../../../store/app/Edit/Canvas/canvas";

import { fabric } from 'fabric'

function NavUndoRedoButtonSet() {
    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas);

    const [myCanvas, setMyCanvas] = useState(null);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas];

        if (!canvas) {
            console.error(`Canvas not found for selectedCanvas: ${selectedCanvas}`);
            return;
        }

        const handleObjectModified = () => {
            // Create a deep copy of the canvas state to avoid mutations
            console.log('modified')
            const currentState = JSON.parse(JSON.stringify(myCanvas.toJSON()));
            setUndoStack((prevStack) => [...prevStack, currentState]);
            // setRedoStack([]); // Clear redo stack when an object is modified
        };

        // Handle object deletion and other custom events as needed
        const handleObjectRemoved = () => {
            handleObjectModified();
        };

        const handleObjectAdded = () => {
            handleObjectModified();
        };

        canvas.on("object:modified", handleObjectModified);
        canvas.on("object:removed", handleObjectRemoved);
        canvas.on("object:added", handleObjectAdded);

        setMyCanvas(canvas);
        setUndoStack([canvas.toJSON()]); // Initialize with initial state

        return () => {
            canvas.off("object:modified", handleObjectModified);
            canvas.off("object:removed", handleObjectRemoved);
            canvas.off("object:added", handleObjectAdded);
        };
    }, [selectedCanvas]);

    const handleUndo = () => {

        if (undoStack.length > 1) {
            const lastState = undoStack.pop(); // Remove the last state
            const prevState = undoStack[undoStack.length - 1]; // Get the previous state

            // Check if there's any change to undo
            if (prevState) {
                console.log(lastState)
                setRedoStack((prevStack) => [lastState, ...prevStack]); // Store the undone state in redoStack
                myCanvas.loadFromJSON(prevState, () => myCanvas.renderAll());
                // Revert to the previous state



                // const canvasData = prevState
                // const canvasObjects = canvasData.objects;
                // const objectsWithoutShape = canvasObjects.filter(object => object.type !== 'Shape')

                // let imageIndex = 0;
                // const canvasObjectsWithPropertySearch = canvasObjects.map((object, index) => {
                //     // if (object.type === 'Image') {
                //     //     if (imageIndex < propertyInfo?.selectedImages?.length) {
                //     //         return { ...object, src: 'https://firebasestorage.googleapis.com/v0/b/clarious-f4f45.appspot.com/o/Untitled%20design-9.png?alt=media&token=943839e2-6ebc-4251-aadd-465aa6093074' };
                //     //     }
                //     // } else {
                //     //     console.error("Unsupported object type:", object.type);
                //     // }

                //     return object;
                // });

                // const canvasDataWithoutObjects = {
                //     ...canvasData,
                //     objects: []
                // }
                // console.log(canvasObjectsWithPropertySearch)

                // myCanvas?.loadFromJSON(canvasDataWithoutObjects, function () {

                // })

                // let fabricObjects = [];

                // canvasObjectsWithPropertySearch.map((object, index) => {
                //     if (object.type === 'Text') {
                //         fabricObjects.push(new fabric.Textbox(object.text, object));
                //     } else if (object.type === 'Shape') {
                //         fabricObjects.push(new fabric.Path(object.path, object));
                //     } else if (object.type === 'Image') {
                //         fabric.Image.fromURL(object.src, function (img) {
                //             img.set({
                //                 ...object
                //             });

                //             myCanvas.add(img); // Add the image to the canvas
                //         }, { crossOrigin: 'anonymous' });
                //     }
                //     else {
                //         console.error("Unsupported object type:", object.type);
                //     }
                // })


                // myCanvas.add(...fabricObjects);
                // myCanvas.renderAll();

            } else {
                console.log("No more changes to undo");
            }
        } else {
            console.log("Undo stack is empty");
        }

    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            const nextState = redoStack.shift();
            console.log("nextState: ", nextState)
            setUndoStack((prevStack) => [...prevStack, myCanvas.toJSON()]);
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
                Undo
            </li>
            <li
                className="header__text-button"
                data-test="redo-button"
                onClick={handleRedo}
                disabled={redoStack.length === 0}
            >
                Redo
            </li>
        </ul>
    );
}

export default NavUndoRedoButtonSet;
