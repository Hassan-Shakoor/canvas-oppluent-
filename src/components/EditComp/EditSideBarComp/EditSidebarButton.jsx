import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditSidebarButton(props){
    return(
        <div className="sidebar__button" data-test="image-module-button">
            <i className="icon"><FontAwesomeIcon icon={props.icon} style={{color: "#ffffff",}} /></i>
            <div className="sidebar__button-text">{props.title}</div>
        </div>
    )
}

export default EditSidebarButton;