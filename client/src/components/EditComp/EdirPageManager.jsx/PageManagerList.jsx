import React from "react";

function PageManagerList(props) {

    console.log(props.id)
  return (
    <li
      draggable="true"
      id={props.id}
      className="page-manager__stage-preview page-manager__stage-preview_active">
      <canvas
        className="page-manager__stage-minimap lower-canvas"
        width={55}
        height={42}
        style={{
        width: 55,
        height: "42.4816px"
      }}/>
    </li>

  )
}

export default PageManagerList;