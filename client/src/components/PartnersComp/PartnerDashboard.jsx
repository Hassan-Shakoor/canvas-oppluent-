// ** Import Library
import {useState} from "react"
import {Link} from "react-router-dom"

// "search-input_button search-input search-input_focused search-input_expanded"

function PartnerDashboard() {
  // ** State
  const [searchFocused,
    setSearchFocused] = useState(false)
  const [search,
    setSearch] = useState("")

  return (
    <div className="dashboard-header dashboard-header_margin-bottom">
      <div className="dashboard-header__top-panel flex-row">
        <div className="dashboard-header__left-panel justify-content-start">
          <Link className="back-button" to="/categories">
            <svg className="icon v2-icon v2-icon-chevron-left back-button__icon">
              <use href="#v2-icon-chevron-left" xlinkHref="#v2-icon-chevron-left"/>
            </svg>
            <span className="back-button__text">Dashboard</span>
          </Link>
        </div>
        <div className="dashboard-header__right-panel justify-content-end flex-grow-1">
          <div
            className={searchFocused
            ? "search-input_button search-input search-input_focused search-input_expanded"
            : "search-input_button search-input"}>
            <label htmlFor="search">
              <svg className="icon v2-icon v2-icon-loupe search-input__icon">
                <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe"/>
              </svg>
            </label>
            <div className="">
              <input
                autoComplete="off"
                id="search"
                name="search"
                placeholder="Search"
                type="search"
                className="search-input__input"
                value={search}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(event) => setSearch(event.target.value)}/>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="mb-2">Partners</h1>
        <h4 className="text-info">Partner Accounts</h4>
      </div>
    </div>
  )
}

export default PartnerDashboard