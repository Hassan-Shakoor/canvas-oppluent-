import { fabric } from 'fabric';
let _canvases

export const setCanvasRef = (canvas) => {
    _canvases = canvas
}

export const getCanvasRef = () => {
    return _canvases
}

export const render = (selectedCanvas, canvasContainer) => {
    canvasContainer[selectedCanvas].renderAll();
}

export const serializeCanvasContainer = (canvasContainer) => {
    const serializedCont = [];
    canvasContainer?.map(canvas => {

        const canvasAttributes = {
            ...canvas.toObject()
        }

        const objects = canvas.getObjects().map((obj) => {
            // Extract all object attributes and include custom attributes
            const allAttributes = {
                ...obj.toObject(),
                name: obj.name,
                id: obj.id,
                isAdminLocked: obj.isAdminLocked ? obj.isAdminLocked : false,
                isHardLocked: obj.isHardLocked ? obj.isHardLocked : false,
                selectable: obj.isAdminLocked ? false : true,
                hasControls: obj.isAdminLocked ? false : true,
                lockMovementX: obj.isAdminLocked ? true : false,
                lockMovementY: obj.isAdminLocked ? true : false,
                // Add any other custom attributes you want to retain
            };

            if (obj.type === 'Shape') {
                allAttributes.svgUrl = obj.svgUrl;
                if (obj.fill instanceof fabric.Pattern) {
                    allAttributes.fill.imageURL = obj.fill.imageURL;
                }
            }

            return allAttributes;
        });

        const serializedCanvas = JSON.stringify({
            ...canvasAttributes,
            objects,
        });

        serializedCont.push(serializedCanvas);

        // serializedObjects.push(JSON.stringify(canvas.toObject()));
        // return JSON.stringify();
    })
    return serializedCont
}

export const serializeCanvas = (canvas) => {
    const canvasAttributes = {
        ...canvas.toObject()
    }

    const objects = canvas.getObjects().map((obj) => {
        // Extract all object attributes and include custom attributes
        const allAttributes = {
            ...obj.toObject(),
            name: obj.name,
            id: obj.id,
            isAdminLocked: obj.isAdminLocked ? obj.isAdminLocked : false,
            isHardLocked: obj.isHardLocked ? obj.isHardLocked : false,
            selectable: obj.isAdminLocked ? false : true,
            hasControls: obj.isAdminLocked ? false : true,
            lockMovementX: obj.isAdminLocked ? true : false,
            lockMovementY: obj.isAdminLocked ? true : false,
            // Add any other custom attributes you want to retain
        };

        if (obj.type === 'Shape') {
            allAttributes.svgUrl = obj.svgUrl;
            if (obj.fill instanceof fabric.Pattern) {
                allAttributes.fill.imageURL = obj.fill.imageURL;
            }
        }

        return allAttributes;
    });

    const serializedCanvas = JSON.stringify({
        ...canvasAttributes,
        objects,
    });

    return serializedCanvas;
};

export const updateCanvasRef = (oldCanvas, selectedCanvas, updateCanvas) => {
    const tempCanvases = [...oldCanvas]
    tempCanvases[selectedCanvas] = updateCanvas
    _canvases = tempCanvases
}