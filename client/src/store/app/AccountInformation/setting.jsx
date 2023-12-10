import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set , onValue} from "firebase/database";
import { auth } from "../../../configs/firebase";

export const saveUserSetting = createAsyncThunk(
    'setting/saveUserSetting',
    async (userData)=> {
        return new Promise(async (resolve, reject) => {
            try {
                const database = getDatabase();
                onAuthStateChanged(auth, async (user)=>{
                    if(user){
                        const uid = user.uid
                        const userRef = ref(database, `${uid}/accountInformation/setting`)
                        await set(userRef, userData)
                    }
                })
            }catch (err){
                reject(err.message)
            }
        })
})

export const fetchUserSetting = createAsyncThunk(
    'setting/fetchUserSetting',
    async () => {
        return new Promise (async (resolve, reject) => {
            try {
                const database = getDatabase();
                onAuthStateChanged(auth, async (user)=>{
                    if(user){
                        const uid = user.uid
                        const userRef = ref(database, `${uid}/accountInformation/setting`)
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

export const setting = createSlice({
    name: 'setting',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUserSetting.fulfilled, (state, action) => {
            state.userData = action.payload.userData
    })
    }
  });

  export const selectUserSetting = (state) => state.setting.userData
  export default setting.reducer;