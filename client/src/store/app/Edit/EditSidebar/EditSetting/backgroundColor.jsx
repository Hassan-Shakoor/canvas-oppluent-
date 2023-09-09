import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  standardColor: {
    [1]:"rgba(38, 34, 98,1)",
    [2]:"rgba(43, 57, 144,1)",
    [3]:"rgba(28, 117, 188,1)",
    [4]:"rgba(39, 170, 225,1)",
    [5]:"rgba(126, 211, 242,1)",
    [6]:"rgba(63, 92, 122,1)",
    [7]:"rgba(112, 132, 156,1)",
    [8]:"rgba(45, 76, 44,1)",
    [9]:"rgba(0, 104, 56,1)",
    [10]:"rgba(0, 148, 68,1)",
    [11]:"rgba(57, 181, 74,1)",
    [12]:"rgba(141, 198, 63,1)",
    [13]:"rgba(193, 219, 5,1)",
    [14]:"rgba(102, 45, 145,1)",
    [15]:"rgba(73, 49, 132,1)",
    [16]:"rgba(97, 63, 170,1)",
    [17]:"rgba(143, 115, 166,1)",
    [18]:"rgba(146, 39, 143,1)",
    [19]:"rgba(158, 31, 99,1)",
    [20]:"rgba(218, 28, 92,1)",
    [21]:"rgba(238, 42, 123,1)",
    [22]:"rgba(0, 0, 0,1)",
    [23]:"rgba(65, 64, 66,1)",
    [24]:"rgba(88, 89, 91,1)",
    [25]:"rgba(109, 110, 113,1)",
    [26]:"rgba(128, 130, 133,1)",
    [27]:"rgba(167, 169, 172,1)",
    [28]:"rgba(209, 211, 212,1)",
    [29]:"rgba(255, 255, 255,1)",
    [30]:"rgba(131, 23, 26,1)",
    [31]:"rgba(196, 22, 28,1)",
    [32]:"rgba(237, 28, 36,1)",
    [33]:"rgba(240, 78, 35,1)",
    [34]:"rgba(242, 101, 34,1)",
    [35]:"rgba(247, 148, 29,1)",
    [36]:"rgba(254, 194, 52,1)",
    [37]:"rgba(255, 222, 23,1)",
    [38]:"rgba(255, 242, 0,1)",
    [39]:"rgba(84, 54, 27,1)",
    [40]:"rgba(140, 70, 32,1)",
    [41]:"rgba(171, 137, 47,1)",
    [42]:"rgba(214, 90, 63,1)",
    [43]:"rgba(224, 131, 113,1)",
    [44]:"rgba(232, 164, 153,1)",
    [45]:"rgba(229, 211, 191,1)",
    [46]:"rgba(3, 73, 79,1)",
    [47]:"rgba(0, 109, 118,1)",
    [48]:"rgba(3, 130, 155,1)",
    [49]:"rgba(2, 155, 171,1)",
    [50]:"rgba(37, 187, 178,1)",
    [51]:"rgba(142, 210, 203,1)",
    [52]:"rgba(187, 224, 226,1)"
  } ,
  brandColor : {
    [1]:"rgba(184, 158, 81,1)",
    [2]:"rgba(202, 182, 125,1)",
    [3]:"rgba(31, 31, 31,1)",
    [4]:"rgba(51, 51, 51,1)",
    [5]:"rgba(255, 255, 255,1)"
  },
  userColor : {}
}

export const backgroundColor = createSlice({
    name: 'backgroundColor',
    initialState,
    reducers:{
        updateUserColor: (state,action) => {
            state.userColor = action.payload
        }
    }
})

export const {updateUserColor} = backgroundColor.actions;
export const selectStandardColor = (state) => state.backgroundColor.standardColor;
export const selectBrandColor = (state) => state.backgroundColor.brandColor;
export const selectUserColor = (state) => state.backgroundColor.userColor;
export default backgroundColor.reducer;