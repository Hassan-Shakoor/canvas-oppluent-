// ** Import Libraries
import { configureStore } from '@reduxjs/toolkit'

// ** Import Reducers
import editDrawer from './app/Edit/EditDrawer/index'
import background  from './app/Edit/EditSidebar/EditSetting/background'
import preference from './app/Edit/EditSidebar/EditSetting/preference'
import text from './app/Edit/EditSidebar/EditText/text'
import uploads from './app/Edit/EditSidebar/EditUploads/uploads'
import property from './app/PropertySearch/property'


export const store = configureStore({
    reducer:{
        editDrawer,
        background,
        preference,
        text,
        uploads,
        property
    }
})