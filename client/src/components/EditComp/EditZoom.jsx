import React from "react";

function EditZoom(){
    return(
        <div className="zoom">
            <div className="zoom__button">
                <svg className="icon v2-icon v2-icon-lupe-in zoom__icon">
                <use href="#v2-icon-lupe-in" xlinkHref="#v2-icon-lupe-in" />
                </svg>
                <p className="zoom__button-title">zoom in</p>
            </div>
            <p className="zoom__value">30%</p>
            <div className="zoom__button">
                <svg className="icon v2-icon v2-icon-lupe-out zoom__icon">
                <use href="#v2-icon-lupe-out" xlinkHref="#v2-icon-lupe-out" />
                </svg>
                <p className="zoom__button-title">zoom out</p>
            </div>
        </div>
    )
}

export default EditZoom;