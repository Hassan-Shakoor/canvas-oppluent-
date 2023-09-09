import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openDrawer: null,
}

export const editDrawer = createSlice({
    name: 'editDrawer',
    initialState,
    reducers:{
        updateOpenDrawer: (state,action) => {
            state.openDrawer = action.payload
        }
    }
})

export const {updateOpenDrawer} = editDrawer.actions;
export const selectOpenDrawer = (state) => state.editDrawer.openDrawer;
export default editDrawer.reducer;