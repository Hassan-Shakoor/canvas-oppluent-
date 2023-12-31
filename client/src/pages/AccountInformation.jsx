// ** Import Dependencies
import { useState, useEffect } from "react";

// ** Custom Component
import AccountInformationDashboard from "../components/AccountInformationComp/AccountInformationDashboard";
import AccountInformationTab from "../components/AccountInformationComp/AccountInformationTab";
import Header from "../components/NavBarComp/Header";
import { ToastContainer } from "react-toastify";

// ** Constant
import { ACCOUNT_INFORMATION } from "../shared/constant";
import AccountInformationBody from "../components/AccountInformationComp/AccountInformationBody";

// ** Store
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode } from "../store/app/User/userPreference";
import { fetchProfile, selectProfile } from "../store/app/AccountInformation/profile"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function AccountInformation () {
    const [mode, setMode] = useState(ACCOUNT_INFORMATION.PROFILE)
    const navigate = useNavigate();

    const location = useLocation();
   
    console.log({location})

    // ** Vars
    const darkMode = useSelector(selectDarkMode)
    const userProfileData = useSelector(selectProfile)

    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(fetchProfile())
    }, [dispatch, location.pathname])

    return (
        <>
        <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'}/>
            <Header/>
            <div className="page page_with-container page-enter-done">
                <div className="container">
                    <AccountInformationDashboard mode={mode}/>
                    <AccountInformationTab mode={mode} setMode={setMode}/>
                    <AccountInformationBody mode={mode} userProfileData={userProfileData} />
                </div>
            </div>
        </>

    )
}

export default AccountInformation