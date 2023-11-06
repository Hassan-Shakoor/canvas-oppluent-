import { Link } from "react-router-dom"

function EditPartner({partner}) {
  return (
    <div className="dashboard-header dashboard-header_margin-bottom">
      <div className="dashboard-header__top-panel flex-row">
        <div className="dashboard-header__left-panel justify-content-start">
          <Link className="back-button" to="/partners">
            <svg className="icon v2-icon v2-icon-chevron-left back-button__icon">
              <use href="#v2-icon-chevron-left" xlinkHref="#v2-icon-chevron-left"/>
            </svg>
            <span className="back-button__text">Partners</span>
          </Link>
        </div>
        <div className="dashboard-header__right-panel justify-content-end flex-grow-1"/>
      </div>
      <div className="mt-4">
        <h1 className="mb-2">Edit {partner.firstName}</h1>
      </div>
    </div>

  )
}

export default EditPartner