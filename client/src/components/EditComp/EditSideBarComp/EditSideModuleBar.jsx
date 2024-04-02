import React from "react";
import EditUploadTab from "./EditUploadModule/EditUploadTab";
import EditTextTab from "./EditTextModule/EditTextTab";
import EditLayerTab from "./EditLayerModule/EditLayerTab"
import EditShapeTab from "./EditShapeTab";
import EditToolTab from "./EditToolModule/EditToolTab";
import EditIntegrationTab from "./EditIntegrationModule/EditIntegrationTab";
import EditSettingTab from "./EditSettingModule/EditSettingTab";
import EditImageColorTab from "./EditUploadModule/EditImageColorTab";

function EditSideModuleBar(props) {
  return (
    <div>
      <aside
        className="sidebar__module-bar sidebar__module-bar_show animate-mounting__sidebar-enter-done">
        <div className="sidebar__module-block">
          <EditUploadTab />
          <EditTextTab />
          <EditLayerTab />
          <EditShapeTab />
          <EditToolTab />
          <EditIntegrationTab />
          <EditSettingTab />
          <EditImageColorTab />
        </div>
      </aside>
    </div>
  )
}

export default EditSideModuleBar