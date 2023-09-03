import React from "react";
import EditHeader from "../components/EditComp/EditNavComp/EditHeader"
import EditSidebar from "../components/EditComp/EditSideBarComp/EditSidebar";
import EditZoom from "../components/EditComp/EditZoom";
import PageManagerStage from "../components/EditComp/EdirPageManager.jsx/PageManagerStage";
import PageManagerButtonSet from "../components/EditComp/EdirPageManager.jsx/PageManagerButtonSet";
import Canvas from "../components/CanvasComponent/Canvas";

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