// ** Import Library
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom"
import { setSearchPartner, fetchPartnerData, selectSearchPartner, setIsSearched, selectIsSearched } from "../../store/app/Partner/partner";
import { useTranslation } from 'react-i18next';

// "search-input_button search-input search-input_focused search-input_expanded"

function PartnerDashboard() {
  // ** State
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const search = useSelector(selectSearchPartner)
  const isSearched = useSelector(selectIsSearched)

  useEffect(() => {
    dispatch(fetchPartnerData())
  }, [dispatch])

  return (
    <div className="dashboard-header dashboard-header_margin-bottom">
      <div className="dashboard-header__top-panel flex-row">
        <div className="dashboard-header__left-panel justify-content-start">
          <Link className="back-button" to="/categories">
            <svg className="icon v2-icon v2-icon-chevron-left back-button__icon">
              <use href="#v2-icon-chevron-left" xlinkHref="#v2-icon-chevron-left" />
            </svg>
            <span className="back-button__text">{t("dashboard")}</span>
          </Link>
        </div>
        <div className="dashboard-header__right-panel justify-content-end flex-grow-1">
          <div
            className={isSearched
              ? "search-input_button search-input search-input_focused search-input_expanded"
              : "search-input_button search-input"}>
            <label htmlFor="search">
              <svg className="icon v2-icon v2-icon-loupe search-input__icon">
                <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe" />
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
                onFocus={() => dispatch(setIsSearched(true))}
                onBlur={() => dispatch(setIsSearched(false))}
                onChange={(event) => dispatch(setSearchPartner(event.target.value))} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="mb-2">{t("Partners.title")}</h1>
        <h4 className="text-info">{t("Partners.partnerAccounts")}</h4>
      </div>
    </div>
  )
}

export default PartnerDashboard