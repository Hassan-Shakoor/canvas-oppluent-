import { createSlice } from "@reduxjs/toolkit";

export const preference = createSlice({
    name: 'preference',
    initialState: {
        safeZoneAndBleed: false,
        magnetRange: true,
        scaleSensitive: 25
    },
    reducers: {
        updateSafeZoneAndBleed: (state) => {
            state.safeZoneAndBleed = !state.safeZoneAndBleed;
        },
        updateMagnetRange: (state) => {
            state.magnetRange = !state.magnetRange;
        },
        updateScaleSensitive: (state, action) => {
            state.scaleSensitive = action.payload;
        }
    }
});

export const { updateMagnetRange, updateSafeZoneAndBleed, updateScaleSensitive } = preference.actions;
export const selectSafeZoneAndBleed = (state) => state.preference.safeZoneAndBleed;
export const selectMagnetRange = (state) => state.preference.magnetRange;
export const selectScaleSensitive = (state) => state.preference.scaleSensitive;
export default preference.reducer;
