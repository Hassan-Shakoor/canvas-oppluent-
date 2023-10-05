import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

export const userPreference = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {
    updateDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { updateDarkMode } = userPreference.actions;
export const selectDarkMode = (state) => state.userPreference.darkMode;
export default userPreference.reducer;