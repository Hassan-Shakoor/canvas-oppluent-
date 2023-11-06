// ** Import Library
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

// ** Custom Component
import Header from "../components/NavBarComp/Header"
import EditPartner from "../components/EditPartnerComp/EditPartnerDashboard"

// ** Store
import { selectPartner } from "../store/app/Partner/partner"
import EditPartnerBody from "../components/EditPartnerComp/EditPartnerBody"

function PartnerEdit () {
    // ** Vars
    const { id } = useParams()
    const partnerList = useSelector(selectPartner)
    const partner = partnerList[id]

    return (
        <>
            <Header/>
            <div className="page page-enter-done">
                <EditPartner partner={partner}/>
                <EditPartnerBody id={id} partner={partner}/>
            </div>
        </>
    )
}

export default PartnerEdit