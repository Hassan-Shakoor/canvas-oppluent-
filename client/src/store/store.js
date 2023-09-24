// ** Import Libraries
import {configureStore} from '@reduxjs/toolkit'

// ** Import Reducers
import editDrawer from './app/Edit/EditDrawer/index'
import background from './app/Edit/EditSidebar/EditSetting/background'
import preference from './app/Edit/EditSidebar/EditSetting/preference'
import text from './app/Edit/EditSidebar/EditText/text'
import uploads from './app/Edit/EditSidebar/EditUploads/uploads'
import canvas from './app/Edit/Canvas/canvas'

export const store = configureStore({
  reducer: {
    editDrawer,
    background,
    preference,
    text,
    uploads,
    canvas
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['canvas/updateCanvasContainer','canvas/updateSelectedCanvas'],
      ignoredPaths: ['canvas.canvasContainer','canvas.selectedCanvas']
    }
  })
})