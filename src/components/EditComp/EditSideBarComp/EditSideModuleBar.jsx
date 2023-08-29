import React from "react";
import EditUploadTab from "./EditUploadTab";
import EditTextTab from "./EditTextTab";
import EditLayerTab from "./EditLayerTab"
import EditShapeTab from "./EditShapeTab";
import EditToolTab from "./EditToolTab";
import EditIntegrationTab from "./EditIntegrationTab";
import EditSettingTab from "./EditSettingTab";

function EditSideModuleBar(props) {
  return (
    <div>
      <aside
        className="sidebar__module-bar sidebar__module-bar_show animate-mounting__sidebar-enter-done">
        <div className="sidebar__module-block">
          <EditUploadTab openDrawer={props.openDrawer}/>
          <EditTextTab openDrawer={props.openDrawer}/>
          <EditLayerTab openDrawer={props.openDrawer}/>
          <EditShapeTab openDrawer={props.openDrawer}/>
          <EditToolTab openDrawer={props.openDrawer}/>
          <EditIntegrationTab openDrawer={props.openDrawer}/>
          <EditSettingTab openDrawer={props.openDrawer}/>
        </div>
      </aside>
    </div>
  )
}

export default EditSideModuleBar