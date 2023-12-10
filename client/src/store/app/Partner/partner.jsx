import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, onValue, push, increment, child} from "firebase/database";
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
                    const key = childSanpshot.key
                    const keyValue = {
                        id: key,
                        ...data
                    }
                    partnerData.push(keyValue)
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

export const deletePartner = createAsyncThunk(
  "partner/deletePartner",
  async (partnerId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            if(partnerId === 0){
                const partnersRef = ref(database, `${uid}/partners`);
                await set(partnersRef, null);
                return
            }else{
                const partnerRef = ref(database, `${uid}/partners/${partnerId}`);
                await set(partnerRef, null);
            }
          }
        });
      } catch (err) {
        reject(err.message);
      }
    });
  }
);

export const updatePartner = createAsyncThunk(
  "partner/updatePartner",
  async (partnerData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const partnerRef = ref(database, `${uid}/partners/${partnerData[0].id}`);
            await set(partnerRef, partnerData);
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
  searchPartner: "",
  isSearched: false
};

export const partner = createSlice({
  name: "partner",
  initialState,
  reducers: {
    updatePartnerList: (state, action) => {
    },
    setSearchPartner: (state, action) => {
      state.searchPartner = action.payload;
    },
    setIsSearched: (state, action) => {
      state.isSearched = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPartnerData.fulfilled, (state, action) => {
      state.partnerList = action.payload.partnerData
    });
  },
});

export const { updatePartnerList } = partner.actions;
export const {setSearchPartner} = partner.actions
export const {setIsSearched} = partner.actions
export const selectPartner = (state) => state.partner.partnerList;
export const selectSearchPartner = (state) => state.partner.searchPartner;
export const selectIsSearched = (state) => state.partner.isSearched;
export default partner.reducer;
