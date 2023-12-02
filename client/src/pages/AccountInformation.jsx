// ** Import Dependencies
import { useState } from "react";

// ** Custom Component
import AccountInformationDashboard from "../components/AccountInformationComp/AccountInformationDashboard";
import AccountInformationTab from "../components/AccountInformationComp/AccountInformationTab";
import Header from "../components/NavBarComp/Header";
import { ToastContainer } from "react-toastify";

// ** Constant
import { ACCOUNT_INFORMATION } from "../shared/constant";
import AccountInformationBody from "../components/AccountInformationComp/AccountInformationBody";

// ** Store
import { useSelector } from "react-redux";
import { selectDarkMode } from "../store/app/User/userPreference";


function AccountInformation () {
    const [mode, setMode] = useState(ACCOUNT_INFORMATION.PROFILE)

    // ** Vars
    const darkMode = useSelector(selectDarkMode)

    return (
        <>
        <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'}/>
            <Header/>
            <div className="page page_with-container page-enter-done">
                <div className="container">
                    <AccountInformationDashboard mode={mode}/>
                    <AccountInformationTab mode={mode} setMode={setMode}/>
                    <AccountInformationBody mode={mode}/>
                </div>
            </div>
        </>

    )
}

export default AccountInformation