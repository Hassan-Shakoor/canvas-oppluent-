// ** Import Libraries
import { configureStore } from '@reduxjs/toolkit'

// ** Import Reducers
import editDrawer from './app/Edit/EditSidebar/EditDrawer/index'
import background  from './app/Edit/EditSidebar/EditSetting/background'
import preference from './app/Edit/EditSidebar/EditSetting/preference'
import text from './app/Edit/EditSidebar/EditText/text'


export const store = configureStore({
    reducer:{
        editDrawer,
        background,
        preference,
        text
    }
})