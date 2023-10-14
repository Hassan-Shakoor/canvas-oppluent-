import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fabricData :
    [
        "{\"version\":\"5.3.0\",\"objects\":[]}",
        "{\"version\":\"5.3.0\",\"objects\":[]}"
    ],
    selectedCanvas: 0,
    canvasContainer: [],
    width: 1020,
    height: 793
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
        }
    }
})

export const { updateFabricData, updateSelectedCanvas, updateCanvasContainer } = canvas.actions;
export const selectFabricData = (state) => state.canvas.fabricData;
export const selectSelectedCanvas = (state) => state.canvas.selectedCanvas;
export const selectWidth = (state) => state.canvas.width;
export const selectHeight = (state) => state.canvas.height;
export const selectCanvasContainer = (state) => state.canvas.canvasContainer
export default canvas.reducer; 
