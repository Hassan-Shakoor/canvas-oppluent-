import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text:"",
    url: ""
}

export const text = createSlice({
    name: 'text',
    initialState,
    reducers:{
        updateText: (state,action) => {
            state.text = action.payload
        },
        updateUrl: (state,action) => {
            state.url = action.payload
        }
    }
})

export const {updateText,updateUrl} = text.actions;
export const selectText = (state) => state.text.text;
export const selectUrl  = (state) => state.text.url
export default text.reducer