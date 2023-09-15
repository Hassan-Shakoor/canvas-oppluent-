// ** Import Libraries
import React, { useState } from "react";

// ** Icons
import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Custom Components
import EditSideModuleBar from "./EditSideModuleBar";

// ** Store
import { useSelector, useDispatch } from 'react-redux'
import { selectOpenDrawer, updateOpenDrawer } from "../../../store/app/Edit/EditDrawer";

// ** Vars
let SidebarButtonData = [
  { name: "Uploads", iconClass: "clarity:upload-cloud-line" },
  { name: "Text", iconClass: "bi:filetype-ai" },
  { name: "Layers", iconClass: "solar:layers-outline" },
  { name: "Shapes", iconClass: "fluent-mdl2:shapes" },
  { name: "Tools", iconClass: "clarity:wrench-line" },
  { name: "Integrations", iconClass: "cil:puzzle" },
  { name: "Settings", iconClass: "ph:gear-six" }
];

function EditSidebarButton(props){
  return(
      <div className={props.openDrawer === props.title ? "sidebar__button sidebar__button_active" : "sidebar__button"} data-test="image-module-button" onClick={() => props.handleToggleDrawer(props.title)}>
          <i className="icon"><Icon icon={props.icon} width='1.5rem' height='1.5rem'/></i>
          <div className="sidebar__button-text">{props.title}</div>
      </div>
  )
}

function EditSidebar() {
  // ** Hooks
  const openDrawer = useSelector(selectOpenDrawer)
  const dispatch = useDispatch()

  // ** Handlers
  const handleToggleDrawer = (tabName) => {
    if (openDrawer === tabName){
      dispatch(updateOpenDrawer(null))
    }else{
      dispatch(updateOpenDrawer(tabName))
    }
  }


  
  return (
    <div className="sidebar">
      <aside className="sidebar__button-bar">
        {SidebarButtonData.map(({ name, iconClass }) => (
          <EditSidebarButton title={name} icon={iconClass} key={name} handleToggleDrawer={handleToggleDrawer} openDrawer={openDrawer}/>
        ))}
        <div className="sidebar__divider" />
        <div className="sidebar__button_rounded-icon sidebar__button" data-test="support-button">
          <i className="icon">
            <FontAwesomeIcon icon="fa-regular fa-envelope" style={{ color: "#ffffff" }} />
          </i>
          <div className="sidebar__button-text">Support</div>
          <div className="support-overlay__tooltip-anchor" />
        </div>
      </aside>
      {openDrawer !== null && <EditSideModuleBar openDrawer={openDrawer}/>}
    </div>
  );
}

export default EditSidebar;
