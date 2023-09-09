import React from "react";
import EditUploadTab from "./EditUploadModule/EditUploadTab";
import EditTextTab from "./EditTextTab";
import EditLayerTab from "./EditLayerTab"
import EditShapeTab from "./EditShapeTab";
import EditToolTab from "./EditToolTab";
import EditIntegrationTab from "./EditIntegrationModule/EditIntegrationTab";
import EditSettingTab from "./EditSettingModule/EditSettingTab";

function EditSideModuleBar(props) {
  return (
    <div>
      <aside
        className="sidebar__module-bar sidebar__module-bar_show animate-mounting__sidebar-enter-done">
        <div className="sidebar__module-block">
          <EditUploadTab/>
          <EditTextTab/>
          <EditLayerTab/>
          <EditShapeTab/>
          <EditToolTab/>
          <EditIntegrationTab/>
          <EditSettingTab/>
        </div>
      </aside>
    </div>
  )
}

export default EditSideModuleBar