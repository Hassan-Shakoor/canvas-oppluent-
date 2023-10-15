// ** Store
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// ** Firebase
import { onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../../../configs/firebase';
import { getDatabase, ref, onValue } from "firebase/database";


export const fetchUserInfo = createAsyncThunk(
  'userPreference/fetchUserInfo',
  async () => {
    return new Promise((resolve, reject) => {
      const database = getDatabase();
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const userJsonRef = ref(database, `${uid}/userData`);
          const unsubscribeValue = onValue(userJsonRef, (snapshot) => {
            const userDataFromDB = snapshot.val();
            if (userDataFromDB) {
              resolve({ uid: uid, userData: userDataFromDB });
            }
          });
        }
      });
    });
  }
);

const initialState = {
  darkMode: false,
  uid: "",
  userData: ""
};

export const userPreference = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {
    updateDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state,action) => {
        state.uid = action.payload.uid;
        state.userData = action.payload.userData;
      })
  }
});

export const { updateDarkMode } = userPreference.actions;
export const selectDarkMode = (state) => state.userPreference.darkMode;
export const selectUID = (state) => state.userPreference.uid;
export const selectUserData = (state) => state.userPreference.userData;
export default userPreference.reducer;