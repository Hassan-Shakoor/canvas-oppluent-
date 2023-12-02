import { Link } from "react-router-dom"
import { ACCOUNT_INFORMATION } from "../../shared/constant"

function AccountInformationDashboard ({mode}) {
    return (
        <div className="dashboard-header dashboard-header_margin-bottom">
            <div className="dashboard-header__top-panel flex-row">
                <div className="dashboard-header__left-panel justify-content-start">
                <Link className="back-button" to={"/categories"}>
                    <svg className="icon v2-icon v2-icon-chevron-left back-button__icon">
                    <use href="#v2-icon-chevron-left" xlinkHref="#v2-icon-chevron-left" />
                    </svg>
                    <span className="back-button__text">Dashboard</span>
                </Link>
                </div>
                <div className="dashboard-header__right-panel justify-content-end flex-grow-1" />
            </div>
            <div className="mt-4">
                <h1 className="mb-2">Account Information</h1>
                <h4 className="text-info">
                {mode === ACCOUNT_INFORMATION.PROFILE ? 
                "We can use fields below to pre-populate your designs and help you to get underway" : 
                "Update your email or password here"
            }
                </h4>
            </div>
        </div>
    )
}

export default AccountInformationDashboard