import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserProfile, updateUserSetting } from "../../../services/firebase/updateUserInformation";
import { getUserInformation } from "../../../services/firebase/getUserInformation";

export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await updateUserProfile(userData);
        resolve(response);
      } catch (err) {
        reject(err.message);
      }
    });
  }
);

export const saveSetting = createAsyncThunk(
  "profile/saveSetting",
  async (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await updateUserSetting(userData);
        resolve(response);
      } catch (err) {
        reject(err.message);
      }
    });
  }
);

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await getUserInformation()
        resolve({ userData: response });
      } catch (err) {
        reject(err.message);
      }
    });
  }
);

const initialState = {
  userData: [],
};

export const profile = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
    });
  },
});

export const selectProfile = (state) => state.profile.userData;
export default profile.reducer;
