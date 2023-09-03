import React from "react";

function PageManagerButtonSet(){
    return (
        <div className="page-manager__button-set">
            <div className="page-manager__button" data-test="add-page">
                <div className="page-manager__button-background page-manager__button-background_circle">
                <svg className="icon v2-icon v2-icon-plus">
                    <use href="#v2-icon-plus" xlinkHref="#v2-icon-plus" />
                </svg>
                </div>
                <p className="page-manager__button-title">Add page</p>
            </div>
            <div className="page-manager__button-triangle">
                <div
                className="page-manager__button page-manager__button_triangle-top"
                data-test="rotate"
                >
                <div className="page-manager__button-background page-manager__button-background_circle page-manager__button-background_circle-small">
                    <svg className="icon v1-icon v1-icon-repeat">
                    <use href="#v1-icon-repeat" xlinkHref="#v1-icon-repeat" />
                    </svg>
                </div>
                <p className="page-manager__button-title">Rotate</p>
                </div>
            </div>
            <div className="page-manager__toggle">
                <div
                className="page-manager__button-background page-manager__button-background_rect"
                data-test="display"
                >
                <svg className="icon v2-icon v2-icon-left-right-arrows">
                    <use
                    href="#v2-icon-left-right-arrows"
                    xlinkHref="#v2-icon-left-right-arrows"
                    />
                </svg>
                </div>
                <p className="page-manager__button-title">Display</p>
            </div>
        </div>
    )
}

export default PageManagerButtonSet;