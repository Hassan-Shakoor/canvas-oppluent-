import React from "react";
import EditHeader from "./EditComp/EditNavComp/EditHeader";
import EditSidebar from "./EditComp/EditSideBarComp/EditSidebar";
import EditZoom from "./EditComp/EditZoom";
import PageManagerStage from "./EditComp/EdirPageManager.jsx/PageManagerStage";
import PageManagerButtonSet from "./EditComp/EdirPageManager.jsx/PageManagerButtonSet";
import Canvas from "./CanvasComponent/Canvas";

function Edit(){
    return (
        <div>
            <EditHeader/>
            <EditSidebar/>
            <EditZoom/>
            <div className="page-manager">
                <PageManagerStage/>
                <PageManagerButtonSet/>
            </div>
            <Canvas/>
        </div>
    )
}

export default Edit;