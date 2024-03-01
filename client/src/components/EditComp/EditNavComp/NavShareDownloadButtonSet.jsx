import React from "react";
import { selectOpenDrawer, updateOpenDrawer } from "../../../store/app/Edit/EditDrawer";
import { useDispatch, useSelector } from "react-redux";

function NavShareDownloadButtonSet() {

    const dispatch = useDispatch();

    const openDrawer = useSelector(selectOpenDrawer);

    const handleOpenDownload = () => {
        dispatch(updateOpenDrawer('Download'));
    }

    return (
        <ul className="header__button-set header__button-set_no-margin d-flex align-items-center">
            <li className="header__text-button" data-test="download-button" onClick={handleOpenDownload}>
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