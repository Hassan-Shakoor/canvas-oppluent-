import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, onValue, push, increment} from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../configs/firebase";

export const createPartner = createAsyncThunk(
  "partner/createPartner",
  async (partnerData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const partnerListRef = ref(database, `${uid}/partners`);
            const newPostRef = push(partnerListRef)
            await set(newPostRef, partnerData);
          }
        });
      } catch (err) {
        reject(err.message);
      }
    });
  }
);
export const fetchPartnerData = createAsyncThunk(
  "partner/fetchPartner",
  async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const partnersRef = ref(database, `${uid}/partners`);
            onValue(partnersRef, (snapshot)=>{
                let partnerData = []
                snapshot.forEach((childSanpshot)=>{
                    const data = childSanpshot.val()[0]
                    partnerData.push(data)
                })
                resolve({partnerData})
            })
          }
        });
      } catch (err) {
        reject(err.message);
      }
    });
  }
);

const initialState = {
  partnerList: [],
};

export const partner = createSlice({
  name: "partner",
  initialState,
  reducers: {
    updatePartnerList: (state, action) => {
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPartnerData.fulfilled, (state, action) => {
      state.partnerList = action.payload.partnerData
    });
  },
});

export const { updatePartnerList } = partner.actions;
export const selectPartner = (state) => state.partner.partnerList;
export default partner.reducer;
