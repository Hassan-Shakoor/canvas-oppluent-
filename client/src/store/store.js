// ** Import Libraries
import { configureStore } from '@reduxjs/toolkit'

// ** Import Reducers
import editDrawer from './app/Edit/EditSidebar/EditDrawer/index'
import backgroundColor from './app/Edit/EditSidebar/EditSetting/backgroundColor'


export const store = configureStore({
    reducer:{
        editDrawer,
        backgroundColor
    }
})