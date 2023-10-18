import { createSlice } from "@reduxjs/toolkit";

// ** TODO: When Retreive Data of Tempate from DB, width and height should be 30% of actual template resolution.

const initialState = {
    fabricData :
    [
        "{\"version\":\"5.3.0\",\"objects\":[]}",
        "{\"version\":\"5.3.0\",\"objects\":[]}"
    ],
    selectedCanvas: 0,
    canvasContainer: [],
    resolution: {width: 1020, height:793}
}

export const canvas = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        updateFabricData: (state,action) => {
            state.fabricData = action.payload
        },
        updateSelectedCanvas: (state, action) => {
            state.selectedCanvas = action.payload
        },
        updateCanvasContainer: (state,action) => {
            state.canvasContainer = action.payload
        },
        updateResolution: (state,action) => {
            state.resolution = action.payload
        }
    }
})

export const { updateFabricData, updateSelectedCanvas, updateCanvasContainer, updateResolution } = canvas.actions;
export const selectFabricData = (state) => state.canvas.fabricData;
export const selectSelectedCanvas = (state) => state.canvas.selectedCanvas;
export const selectResolution = (state) => state.canvas.resolution;
export const selectCanvasContainer = (state) => state.canvas.canvasContainer
export default canvas.reducer; 
