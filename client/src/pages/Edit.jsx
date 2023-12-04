// ** Import React
import React from "react";
import { ToastContainer} from 'react-toastify';

// ** Store
import { useSelector } from "react-redux";
import { selectDarkMode } from "../store/app/User/userPreference";

// ** Custom Component
import EditHeader from "../components/EditComp/EditNavComp/EditHeader"
import EditSidebar from "../components/EditComp/EditSideBarComp/EditSidebar";
import EditZoom from "../components/EditComp/EditZoom";
import PageManagerStage from "../components/EditComp/EdirPageManager.jsx/PageManagerStage";
import PageManagerButtonSet from "../components/EditComp/EdirPageManager.jsx/PageManagerButtonSet";
import Canvas from "../components/CanvasComponent/Canvas";
import EditToobar from "../components/EditComp/EditToolbarComp/EditToolbar";

function Edit(){
    // ** Vars
    const darkMode = useSelector(selectDarkMode)
    
    return (
        <div>
            <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'}/>
            <EditHeader/>
            <EditToobar/>
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