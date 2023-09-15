import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myUploads: [],
    shapes: [],
    logo: [],
    socialMediaIcons: []
}

export const uploads = createSlice({
    name: 'uploads',
    initialState,
    reducers:{
        updateMyUploads : (state,action) => {
            state.myUploads = action.payload
        },
        updateShapes: (state,action) => {
            state.shapes = action.payload
        },
        updateLogo: (state,action) => {
            state.logo = action.payload
        },
        updateSocialMediaIcons: (state,action) => {
            state.socialMediaIcons = action.payload
        }
    }
})

export const {updateMyUploads,updateShapes,updateLogo,updateSocialMediaIcons} = uploads.actions;
export const selectMyUploads = (state) => state.uploads.myUploads;
export const selectShapes = (state) => state.uploads.shapes;
export const selectLogo = (state) => state.uploads.logo;
export const selectSocialMediaIcons = (state) => state.uploads.socialMediaIcons;
export default uploads.reducer