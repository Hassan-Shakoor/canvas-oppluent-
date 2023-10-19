export const render = (selectedCanvas, canvasContainer) => {
    canvasContainer[selectedCanvas].renderAll();
}

export const serializeCanvasContainer = (canvasContainer) => {
    const serializedCont = []
    canvasContainer?.map(canvas => serializedCont.push(JSON.stringify(canvas)))
    return serializedCont
}