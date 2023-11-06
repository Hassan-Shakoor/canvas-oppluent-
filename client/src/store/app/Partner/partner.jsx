import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    partnerList : []
}

export const partner = createSlice({
    name: 'property',
    initialState,
    reducers:{
        updatePartnerList: (state,action) => {
            state.partnerList = action.payload
        }
    }
})

export const {updatePartnerList} = partner.actions;
export const selectPartner = (state) => state.partner.partnerList
export default partner.reducer;