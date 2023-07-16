import React from "react";

function NavShareDownloadButtonSet(){
    return (
        <ul className="header__button-set header__button-set_no-margin d-flex align-items-center">
            <li className="header__text-button" data-test="download-button">
                Download
            </li>
            <li
                className="header__text-button header__text-button"
                data-test="share-button"
            >
                Share
            </li>
        </ul>
    )
}

export default NavShareDownloadButtonSet;