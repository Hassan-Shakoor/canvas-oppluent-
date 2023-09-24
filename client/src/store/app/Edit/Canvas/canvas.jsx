import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCanvas: "",
    canvasContainer: [],
    canvasCount: 2,
    width: 1020,
    height: 793
}

export const canvas = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        updateSelectedCanvas: (state, action) => {
            state.selectedCanvas = action.payload
        },
        incrementCanvasCount: (state) => {
            state.canvasCount = state.canvasCount + 1
        },
        updateCanvasContainer: (state,action) => {
            state.canvasContainer = action.payload
        }
    }
})

export const { updateSelectedCanvas, incrementCanvasCount, updateCanvasContainer } = canvas.actions;
export const selectSelectedCanvas = (state) => state.canvas.selectedCanvas;
export const selectCanvasCount = (state) => state.canvas.canvasCount;
export const selectWidth = (state) => state.canvas.width;
export const selectHeight = (state) => state.canvas.height;
export const selectCanvasContainer = (state) => state.canvas.canvasContainer
export default canvas.reducer; 
