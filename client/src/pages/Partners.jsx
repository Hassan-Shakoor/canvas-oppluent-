// ** Import Libraries
import {useSelector} from "react-redux"

// ** Custom Component
import Header from "../components/NavBarComp/Header"
import NoPartner from "../components/PartnersComp/NoPartner"
import PartnerDashboard from "../components/PartnersComp/PartnerDashboard"
import {ToastContainer} from "react-toastify"

// ** Store
import {selectDarkMode} from "../store/app/User/userPreference"
import {selectPartner} from "../store/app/Partner/partner"
import PartnerLists from "../components/PartnersComp/PartnerLists"

function Partners() {
  // ** Vars
  const partnerList = useSelector(selectPartner)
  const darkMode = useSelector(selectDarkMode)

  return (
    <div>
      <ToastContainer
        pauseOnHover={false}
        position="top-right"
        autoClose={5000}
        closeOnClick
        theme={darkMode
        ? 'dark'
        : 'light'}/>
      <Header/>
      <div className="page page-enter-done">
        <PartnerDashboard/>
        <div className="page__content">
          {partnerList?.length ? <PartnerLists/> : <NoPartner/>}
        </div>
      </div>

    </div>
  )
}

export default Partners