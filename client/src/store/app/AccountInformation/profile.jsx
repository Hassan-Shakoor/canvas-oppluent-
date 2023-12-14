import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue, update,  child } from "firebase/database";
import { auth } from "../../../configs/firebase";

export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (userData) => {
    console.log({ userData });
    return new Promise(async (resolve, reject) => {
      try {
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const userRef = ref(database, `${uid}/accountInformation/profile`);
            const firstNameRef = child(userRef, "firstName");
            const lastNameRef = child(userRef, "lastName");
            const contactNoRef = child(userRef, "contactNo");
            const profileImageRef = child(userRef, "profileImage");
            const emailRef = child(userRef, "email");
            await set(emailRef, userData?.email);
            await set(firstNameRef, userData?.firstName);
            await set(lastNameRef, userData?.lastName);
            await set(contactNoRef, userData?.contactNo);
            await set(profileImageRef, userData?.profileImage);
          }
        });
        resolve("success");
      } catch (err) {
        reject(err.message);
      }
    });
  }
);

export const saveSetting = createAsyncThunk(
  "profile/saveSetting",
  async (userData) => {
    console.log({ userData });
    return new Promise(async (resolve, reject) => {
      try {
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const userRef = ref(database, `${uid}/accountInformation/profile`);
            const languageRef = child(userRef, "language");
            const emailRef = child(userRef, "email");
            await set(languageRef, userData?.language);
            await set(emailRef, userData?.email)
          }
        });
        resolve("success");
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
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const userRef = ref(database, `${uid}/accountInformation/profile`);
            onValue(userRef, (snapshot) => {
              const userData = snapshot.val();
              resolve({ userData });
            });
          }
        });
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
