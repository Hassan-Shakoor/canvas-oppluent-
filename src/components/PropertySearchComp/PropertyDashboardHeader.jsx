import React from "react";

function PropertyDashboardHeader(){
    return(
        <div className="dashboard-header dashboard-header_margin-bottom">
            <div className="dashboard-header__top-panel">
                <div className="dashboard-header__left-panel">
                <a className="back-button" href="/categories">
                    <svg className="icon v2-icon v2-icon-chevron-left back-button__icon">
                    <use href="#v2-icon-chevron-left" xlinkHref="#v2-icon-chevron-left" />
                    </svg>
                    <span className="back-button__text">Dashboard</span>
                </a>
                </div>
                <div className="dashboard-header__right-panel" />
            </div>
            <div className="mt-4">
                <h1 className="mb-2">Create Design</h1>
                <h4 className="text-info">
                Choose what information you would like to populate into your template.
                </h4>
            </div>
        </div>

    )
}

export default PropertyDashboardHeader;