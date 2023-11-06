// ** Import Dependencies
import { useSelector } from "react-redux"

// ** Custom Components
import Header from "../components/NavBarComp/Header"
import NewPartnerBody from "../components/NewPartnerComp/NewPartnerBody"
import NewPartnerDashboard from "../components/NewPartnerComp/NewPartnerDashboard"
import { ToastContainer } from "react-toastify"

// ** Store
import { selectDarkMode } from "../store/app/User/userPreference"

function NewPartner () {
    // ** Vars
    const darkMode = useSelector(selectDarkMode)

    return (
        <>
        <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'}/>
        <Header/>
        <div className="page page-enter-done">
            <NewPartnerDashboard/>
            <NewPartnerBody/>
        </div>
        </>

    )
}

export default NewPartner