import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCanvasContainer, selectSelectedCanvas } from "../../../store/app/Edit/Canvas/canvas";
import { fabric } from 'fabric';

function NavUndoRedoButtonSet() {
    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas);

    const [myCanvas, setMyCanvas] = useState(null);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    // useEffect(() => {
    //     const canvas = canvasContainer[selectedCanvas];

    //     console.log("canvas: ", canvas)

    //     if (!canvas) {
    //         console.error(`Canvas not found for selectedCanvas: ${selectedCanvas}`);
    //         return;
    //     }

    //     const handleObjectModified = () => {
    //         console.log("Object modified");
    //         // const currentState = JSON.parse(JSON.stringify(myCanvas.toJSON()));
    //         // setUndoStack(prevStack => [...undoStack, currentState]);
    //     };


    //     // Handle object deletion and other custom events as needed
    //     const handleObjectRemoved = handleObjectModified;
    //     const handleObjectAdded = handleObjectModified;

    //     canvas.on("object:modified", handleObjectModified);
    //     canvas.on("object:removed", handleObjectRemoved);
    //     canvas.on("object:added", handleObjectAdded);

    //     setMyCanvas(canvas);
    //     setUndoStack([canvas.toJSON()]); // Initialize with initial state

    //     return () => {
    //         //   canvas.off("object:modified", handleObjectModified);
    //         //   canvas.off("object:removed", handleObjectRemoved);
    //         //   canvas.off("object:added", handleObjectAdded);
    //     };
    // }, [selectedCanvas]);

    const handleUndo = () => {
        if (undoStack.length > 1) {
            const lastState = undoStack.pop();
            const prevState = undoStack[undoStack.length - 1];

            if (prevState) {
                setRedoStack((prevStack) => [lastState, ...prevStack]);
                myCanvas.loadFromJSON(prevState, () => myCanvas.renderAll());
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
            setUndoStack([...undoStack, myCanvas.toJSON()]);
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
