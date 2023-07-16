import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditSidebarButton from "./EditSidebarButton";

let SidebarButtonData = [
  { name: "Uploads", iconClass: "fa-solid fa-cloud-arrow-up" },
  { name: "Text", iconClass: "fa-solid fa-file-lines" },
  { name: "Layers", iconClass: "fa-solid fa-layer-group" },
  { name: "Shapes", iconClass: "fa-solid fa-shapes" },
  { name: "Tools", iconClass: "fa-solid fa-wrench" },
  { name: "Integrations", iconClass: "fa-solid fa-puzzle-piece" },
  { name: "Settings", iconClass: "fa-solid fa-gear" }
];

function EditSidebar() {
  return (
    <div className="sidebar">
      <aside className="sidebar__button-bar">
        {SidebarButtonData.map(({ name, iconClass }) => (
          <EditSidebarButton title={name} icon={iconClass} key={name} />
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
    </div>
  );
}

export default EditSidebar;
