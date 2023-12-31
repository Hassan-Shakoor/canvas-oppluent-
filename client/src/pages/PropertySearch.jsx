// ** Import React
import React, { useEffect, useState } from "react";
import { ToastContainer} from 'react-toastify';

// ** Store
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode } from "../store/app/User/userPreference";
import { updateSelectedProperty } from "../store/app/PropertySearch/property";

// ** Custom Components
import Header from "../components/NavBarComp/Header";
import PropertyDashboardHeader from "../components/PropertySearchComp/PropertyDashboardHeader";
import ColumnMLS from "../components/PropertySearchComp/ColumnMLS";
import ColumnDesign from "../components/PropertySearchComp/ColumnDesign";
import SpinnerOverlay from "../components/Loader/SpinnerOverlay";

function PropertySearch(){
    // ** Vars
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const darkMode = useSelector(selectDarkMode);

    useEffect(() => {
        dispatch(updateSelectedProperty(null));
    },[])

    return(
        <div>
            <SpinnerOverlay loading={loading}/>
            <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'}/>
            <Header/>
            <div className="page page-enter-done">
                <PropertyDashboardHeader/>
                <div className="page__content">
                    <div className="row">
                        <ColumnMLS/>
                        <ColumnDesign setLoading={setLoading}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertySearch;