import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProperty: null,
  numDescRequired: 2,
  numPhotoRequired: 3, 
  useMlsInfo: false,
  mlsPropertyInfo : {}
}

export const property = createSlice({
    name: 'property',
    initialState,
    reducers:{
        updateSelectedProperty: (state,action) => {
            state.selectedProperty = action.payload
        },
        udpateNumDescRequired: (state, action) => {
            state.numDescRequired = action.payload
        },
        updateNumPhotoRequired: (state, action) => {
            state.numPhotoRequired = action.payload
        },
        updateUseMlsInfo: (state, action) => {
            state.useMlsInfo = action.payload
        },
        updateMlsPropertyInfo: (state,action) => {
            state.mlsPropertyInfo = action.payload
        }
    }
})

export const {updateSelectedProperty, udpateNumDescRequired, updateNumPhotoRequired,updateUseMlsInfo, updateMlsPropertyInfo } = property.actions;
export const selectSelectedProperty = (state) => state.property.selectedProperty;
export const selectNumDescRequired = (state) => state.property.numDescRequired;
export const selectNumPhotoRequired = (state) => state.property.numPhotoRequired;
export const selectUseMlsInfo = (state) => state.property.useMlsInfo;
export const selectMlsPropertyInfo = (state) => state.property.mlsPropertyInfo
export default property.reducer;