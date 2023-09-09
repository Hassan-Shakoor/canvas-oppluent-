import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// ** Custom Components
import EditDocSpec from "./EditDocSpec";
import EditPreference from "./EditPreference";
import EditBackground from "./EditBackground";

// ** Store
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectOpenDrawer } from "../../../../store/app/Edit/EditSidebar/EditDrawer";

// ** Const / Vars
const settBtns = [
  {name:'Preference' , icon: 'fa-solid fa-sliders'},
  {name:'Background' , icon: 'fa-solid fa-panorama'}
]

function SettingsBtn(props){
  return (
    <div className="sidebar-tiles__item" onClick={() => props.setShowPanel(props.name)}>
      <div className="sidebar-tiles__tile">
        <FontAwesomeIcon
          icon={props.icon}
          className="sidebar-tiles__tile-icon"/>
        <div className="sidebar-tiles__tile-title">{props.name}</div>
      </div>
    </div>
  )
}

function EditSettingTab() {
  // ** State
  const [showPanel,setShowPanel] = useState('default')

  // ** Hooks
  const openDrawer = useSelector(selectOpenDrawer)

  return (
    <div
      className={openDrawer === 'Settings'
      ? "sidebar-module settings-sidebar-module vertical-switch-content-enter-done"
      : "sidebar-module settings-sidebar-module vertical-switch-content-exit-done"}>

      {showPanel === 'default' && <>
      <div className="sidebar-module__title">Settings</div>
      <div className="sidebar-module__divider"/>
      <div className="sidebar-tiles">
        {settBtns.map((btn,index) => (<SettingsBtn name={btn.name} icon={btn.icon} setShowPanel={setShowPanel}/>))}
      </div>
      <EditDocSpec designType='Social Media Posts' minPages='1' maxPages='unlimited' divisibleBy='1' resolution='1080 x 1080'/></>}

      {/* Settings & Preference Page */}

      {showPanel === 'Preference' && <EditPreference setShowPanel={setShowPanel}/>}
      {showPanel === 'Background' && <EditBackground setShowPanel={setShowPanel}/>}
    </div>
  )
}

export default EditSettingTab