import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditSideModuleBar from "./EditSideModuleBar";

let SidebarButtonData = [
  { name: "Uploads", iconClass: "fa-solid fa-cloud-arrow-up" },
  { name: "Text", iconClass: "fa-solid fa-file-lines" },
  { name: "Layers", iconClass: "fa-solid fa-layer-group" },
  { name: "Shapes", iconClass: "fa-solid fa-shapes" },
  { name: "Tools", iconClass: "fa-solid fa-wrench" },
  { name: "Integrations", iconClass: "fa-solid fa-puzzle-piece" },
  { name: "Settings", iconClass: "fa-solid fa-gear" }
];

function EditSidebarButton(props){
  return(
      <div className={props.openDrawer === props.title ? "sidebar__button sidebar__button_active" : "sidebar__button"} data-test="image-module-button" onClick={() => props.handleToggleDrawer(props.title)}>
          <i className="icon"><FontAwesomeIcon icon={props.icon} style={{color: "#ffffff",}} /></i>
          <div className="sidebar__button-text">{props.title}</div>
      </div>
  )
}

function EditSidebar() {
  // ** State
  const [openDrawer, setDrawerOpen] = useState(null)


  // ** Handlers
  const handleToggleDrawer = (tabName) => {
    if (openDrawer === tabName){
      setDrawerOpen(null)
      console.log('closed');
    }else{
      setDrawerOpen(tabName)
      console.log('Settings' === tabName);
      console.log("("+tabName+")");
      console.log(tabName + ' opened');
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
