// ** Import React
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

// ** Store
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode } from "../store/app/User/userPreference";
import { selectCanvasContainer, selectSelectedObject, selectZoomResolution, updateFabricData, updateResolution, updateTemplateData, updateZoom } from "../store/app/Edit/Canvas/canvas"

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
import EditToolbar from "../components/EditComp/EditToolbarComp/EditToolbar";
import SpinnerOverlay from "../components/Loader/SpinnerOverlay";

// ** Service
import { getTemplateJsonData } from "../services/firebase/TemplateServices/getTemplateData";
import EditExportSidebar from "../components/EditComp/EditExportSidebar";
import { updateMlsPropertyInfo } from "../store/app/PropertySearch/property";

function Edit() {
    // ** State
    const [loading, setLoading] = useState(false)

    const selectedObject = useSelector(selectSelectedObject)
    const canvasContainer = useSelector(selectCanvasContainer)
    // ** Vars
    const dispatch = useDispatch();
    const darkMode = useSelector(selectDarkMode);
    const { id } = useParams();
    const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)
    const [zoom, setZoom] = useState(1)

    const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

    const handleCanvasLoaded = () => {
        setIsCanvasLoaded(true);
    };

    // TODO: Remove hardcoded else condition in fetch tempate data
    const fetchTemplateData = useCallback(async () => {
        setLoading(true);
        const response = await getTemplateJsonData(userData?.uid, id)
        if (response) {
            // console.log(response);
            dispatch(updateTemplateData(response));
            // Will store data of fabric resolution
            const resolution = response?.docSpecs?.resolution
            dispatch(updateResolution({ width: resolution?.width ?? 1020, height: resolution?.height ?? 793 }));

            setWidth(resolution?.width);
            setHeight(resolution?.height);
            // dispatch(updateZoom()

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

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message = 'Are you sure you want to leave?';
            event.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            dispatch(updateZoom(1));
            // dispatch(updateMlsPropertyInfo({}))
        };
    }, []);

    const updateZoomResolution = (newWidth, newHeight, newZoom) => {
        console.log("Zoom Resolution Updated...")
        setZoom(newZoom);
        setWidth(newWidth);
        setHeight(newHeight);
    }

    // console.log(canvasContainer)

    return (
        <div>
            <SpinnerOverlay loading={loading} />
            <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'} />
            {canvasContainer && canvasContainer?.length > 0 && (<EditHeader />)}
            {/* <button onClick={() => console.log("Edit --- selectedObject --->> ", selectedObject)} style={{ zIndex: 2000, position: 'fixed' }}>Selected Object</button> */}
            {selectedObject && !selectedObject?.isHardLocked && (<EditToolbar />)}
            <EditSidebar />
            <EditExportSidebar />
            {width && height && canvasContainer?.length > 0 && (<EditZoom width={width} height={height} zoom={zoom} updateZoomResolution={updateZoomResolution} isCanvasLoaded={isCanvasLoaded} />)}
            <div className="page-manager">
                <PageManagerStage />
                <PageManagerButtonSet />
            </div>
            {width && height && (<Canvas width={width} height={height} handleCanvasLoaded={handleCanvasLoaded} />)}
        </div>
    )
}

export default Edit;