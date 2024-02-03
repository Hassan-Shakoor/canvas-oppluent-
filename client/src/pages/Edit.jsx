// ** Import React
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

// ** Store
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode } from "../store/app/User/userPreference";
import { selectSelectedObject, updateFabricData, updateResolution, updateTemplateData } from "../store/app/Edit/Canvas/canvas"

// ** Utils
import { getLocalStorage } from "../services/localStorage";

// ** Constant
import { LOCAL_STORAGE } from "../shared/constant";

// ** Custom Component
import EditHeader from "../components/EditComp/EditNavComp/EditHeader"
import EditSidebar from "../components/EditComp/EditSideBarComp/EditSidebar";
import EditZoom from "../components/EditComp/EditZoom";
import PageManagerStage from "../components/EditComp/EdirPageManager.jsx/PageManagerStage";
import PageManagerButtonSet from "../components/EditComp/EdirPageManager.jsx/PageManagerButtonSet";
import Canvas from "../components/CanvasComponent/Canvas";
import EditToobar from "../components/EditComp/EditToolbarComp/EditToolbar";
import SpinnerOverlay from "../components/Loader/SpinnerOverlay";

// ** Service
import { getTemplateJsonData } from "../services/firebase/getTemplateData";

function Edit() {
    // ** State
    const [loading, setLoading] = useState(false)

    const selectedObject = useSelector(selectSelectedObject)
    // ** Vars
    const dispatch = useDispatch();
    const darkMode = useSelector(selectDarkMode);
    const { id } = useParams();
    const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

    // TODO: Remove hardcoded else condition in fetch tempate data
    const fetchTemplateData = useCallback(async () => {
        setLoading(true);
        const response = await getTemplateJsonData(userData?.uid, id)
        if (response) {
            console.log(response);
            dispatch(updateTemplateData(response));
            // Will store data of fabric resolution
            const resolution = response?.docSpecs?.resolution
            dispatch(updateResolution({ width: resolution?.width ?? 1020, height: resolution?.height ?? 793 }));
            // Will store data of fabric canvas
            dispatch(updateFabricData(response.fabricData ? response.fabricData : [
                "{\"version\":\"5.3.0\",\"objects\":[]}"
            ]));
        }
        setLoading(false)
    }, [id, userData?.uid])

    useEffect(() => {
        fetchTemplateData()
    }, [fetchTemplateData, id])

    return (
        <div>
            <SpinnerOverlay loading={loading} />
            <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'} />
            <EditHeader />
            {/* <button onClick={() => console.log("Edit --- selectedObject --->> ", selectedObject)} style={{ zIndex: 2000, position: 'fixed' }}>Selected Object</button> */}
            <EditToobar />
            <EditSidebar />
            <EditZoom />
            <div className="page-manager">
                <PageManagerStage />
                <PageManagerButtonSet />
            </div>
            <Canvas />
        </div>
    )
}

export default Edit;