import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set , onValue} from "firebase/database";
import { auth } from "../../../configs/firebase";

export const saveProfile = createAsyncThunk(
    'profile/saveProfile',
    async (userData)=> {
        console.log({userData})
        return new Promise(async (resolve, reject) => {
            try {
                const database = getDatabase();
                onAuthStateChanged(auth, async (user)=>{
                    if(user){
                        const uid = user.uid
                        const userRef = ref(database, `${uid}/accountInformation/profile`)
                        await set(userRef, userData)
                    }
                })
            }catch (err){
                reject(err.message)
            }
        })
})

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async () => {
        return new Promise (async (resolve, reject) => {
            try {
                const database = getDatabase();
                onAuthStateChanged(auth, async (user)=>{
                    if(user){
                        const uid = user.uid
                        const userRef = ref(database, `${uid}/accountInformation/profile`)
                        onValue(userRef, (snapshot)=>{
                            const userData = snapshot.val()[0]
                            resolve({userData})
                        })
                    }
                })
            }catch (err) {
                reject(err.message)
            }
        })
    }
)

const initialState = {
    userData: []
}

export const profile = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.userData = action.payload.userData
    })
    }
  });

  export const selectProfile = (state) => state.profile.userData
  export default profile.reducer;