import { ACCOUNT_INFORMATION } from "../../shared/constant";
import { useTranslation } from 'react-i18next';

function AccountInformationTab({ mode, setMode }) {
    const { t } = useTranslation()

    return (
        <ul className="tabs tabs_relative tabs_scrollable">
            <li
                onClick={() => setMode(ACCOUNT_INFORMATION.PROFILE)}
                className={mode === ACCOUNT_INFORMATION.PROFILE ? "tabs__item tabs__item_hide-bottom-slider tabs__item_active" : "tabs__item tabs__item_hide-bottom-slider"}>
                <span aria-current="page" className="tabs__item-child active">
                    {t("accountInfo.profile")}
                </span>
            </li>
            <li
                onClick={() => setMode(ACCOUNT_INFORMATION.SETTINGS)}
                className={mode === ACCOUNT_INFORMATION.SETTINGS ? "tabs__item tabs__item_hide-bottom-slider tabs__item_active" : "tabs__item tabs__item_hide-bottom-slider"}>
                <span className="tabs__item-child">
                    {t("accountInfo.settings")}
                </span>
            </li>
        </ul>
    )
}

export default AccountInformationTab;