// ** Import React
import React from "react";
import { ToastContainer} from 'react-toastify';

// ** Store
import { useSelector } from "react-redux";
import { selectDarkMode } from "../store/app/User/userPreference";

// ** Custom Components
import Header from "../components/NavBarComp/Header";
import PropertyDashboardHeader from "../components/PropertySearchComp/PropertyDashboardHeader";
import ColumnMLS from "../components/PropertySearchComp/ColumnMLS";
import ColumnDesign from "../components/PropertySearchComp/ColumnDesign";

function PropertySearch(){
    // ** Vars
    const darkMode = useSelector(selectDarkMode)

    return(
        <div>
            <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'}/>
            <Header/>
            <div className="page page-enter-done">
                <PropertyDashboardHeader/>
                <div className="page__content">
                    <div className="row">
                        <ColumnMLS/>
                        <ColumnDesign/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertySearch;