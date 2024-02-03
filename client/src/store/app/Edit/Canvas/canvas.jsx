// ** Import Libraries
import { createSlice } from "@reduxjs/toolkit";

// ** Shared
import { DISPLAY_DIRECTION } from "../../../../shared/constant";

// ** TODO: When Retreive Data of Tempate from DB, width and height should be 30% of actual template resolution.

const initialState = {
  templateData: {},
  fabricData: [],
  selectedCanvas: 0,
  canvasContainer: [],
  resolution: { width: 'fit-content', height: 'auto' },
  displayDirection: DISPLAY_DIRECTION.VERTICAL,
  selectedObject: {},
};

export const canvas = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    updateFabricData: (state, action) => {
      state.fabricData = action.payload;
    },
    updateSelectedCanvas: (state, action) => {
      state.selectedCanvas = action.payload;
    },
    updateCanvasContainer: (state, action) => {
      state.canvasContainer = action.payload;
    },
    updateResolution: (state, action) => {
      state.resolution = action.payload;
    },
    updateDisplayDirection: (state, action) => {
      state.displayDirection = action.payload;
    },
    updateSelectedObject: (state, action) => {
      state.selectedObject = action.payload;
    },
    updateTemplateData: (state, action) => {
      state.templateData = action.payload;
    },
  },
});

export const {
  updateFabricData,
  updateSelectedCanvas,
  updateCanvasContainer,
  updateResolution,
  updateDisplayDirection,
  updateTemplateData,
  updateSelectedObject,
} = canvas.actions;
export const selectFabricData = (state) => state.canvas.fabricData;
export const selectSelectedCanvas = (state) => state.canvas.selectedCanvas;
export const selectResolution = (state) => state.canvas.resolution;
export const selectCanvasContainer = (state) => state.canvas.canvasContainer;
export const selectDisplayDirection = (state) => state.canvas.displayDirection;
export const selectSelectedObject = (state) => state.canvas.selectedObject;
export const selectTemplateData = (state) => state.canvas.templateData;
export default canvas.reducer;
