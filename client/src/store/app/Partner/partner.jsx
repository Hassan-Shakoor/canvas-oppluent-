import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, onValue, push, increment, child, runTransaction} from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../configs/firebase";
import { deletePartnerById, updatePrimaryPartner, updatePartnerInformation , fetchPartner, createPartnerData} from "../../../services/updatePartner"

export const createPartner = createAsyncThunk(
  "partner/createPartner",
  async (partnerData) => {
    console.log(partnerData)
    return new Promise(async (resolve, reject) => {
      try {
        const response = await createPartnerData(partnerData)
        resolve(response)
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
        await fetchPartner((partnerData) => {
          resolve({partnerData})
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
        const response = deletePartnerById(partnerId)
        resolve(response)
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
       const response = await updatePartnerInformation(partnerData)
       resolve(response)
      } catch (err) {
        reject(err.message);
      }
    });
  }
);

export const primaryPartner = createAsyncThunk(
  "partner/updatePrimaryPartner",
  async (partnerData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await updatePrimaryPartner(partnerData)
        resolve(response)
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
    },
    makePrimary: (state, action) => {
      const { partnerId } = action.payload;

      state.partnerList.forEach((partner) => {
        partner.primary = partner.id === partnerId;
      });

      state.partnerList.sort((a, b) => (b.primary ? 1 : -1));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPartnerData.fulfilled, (state, action) => {
      state.partnerList = action.payload.partnerData
      state.partnerList.sort((a, b) => (b.primary ? 1 : -1));
    });
  },
});

export const { makePrimary } = partner.actions
export const { updatePartnerList } = partner.actions;
export const {setSearchPartner} = partner.actions
export const {setIsSearched} = partner.actions
export const selectPartner = (state) => state.partner.partnerList;
export const selectSearchPartner = (state) => state.partner.searchPartner;
export const selectIsSearched = (state) => state.partner.isSearched;
export default partner.reducer;
