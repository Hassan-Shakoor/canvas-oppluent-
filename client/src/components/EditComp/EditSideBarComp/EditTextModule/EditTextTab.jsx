// ** Import Library
import React from "react";

// ** Custom Component
import TextInput from "./TextInput";
import AiTextInput from "./AiTextInput";

// ** Store
import { useSelector} from 'react-redux'
import {selectOpenDrawer} from '../../../../store/app/Edit/EditDrawer/index'

function EditTextTab() {
  // States

  // ** Hooks 
  const openDrawer = useSelector(selectOpenDrawer)
  return (
    <form
      className={openDrawer === 'Text'
      ? "text-module vertical-switch-content-enter-done"
      : "sidebar-module vertical-switch-content-exit-done"}>

      <TextInput />
      <AiTextInput/>
    </form>
  )
}

export default EditTextTab