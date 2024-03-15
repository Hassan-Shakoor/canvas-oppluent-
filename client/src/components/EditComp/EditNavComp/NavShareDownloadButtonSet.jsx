import React from "react";
import { selectOpenDrawer, updateOpenDrawer } from "../../../store/app/Edit/EditDrawer";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';


function NavShareDownloadButtonSet() {
    const { t } = useTranslation()


    const dispatch = useDispatch();

    const openDrawer = useSelector(selectOpenDrawer);

    const handleOpenDownload = () => {
        dispatch(updateOpenDrawer('Download'));
    }

    return (
        <ul className="header__button-set header__button-set_no-margin d-flex align-items-center">
            <li className="header__text-button" data-test="download-button" onClick={handleOpenDownload}>
                {t("download")}
            </li>
            <li
                className="header__text-button header__text-button"
                data-test="share-button"
            >
                {t("share")}
            </li>
        </ul>
    )
}

export default NavShareDownloadButtonSet;