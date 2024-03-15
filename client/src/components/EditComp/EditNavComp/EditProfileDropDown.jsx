import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function EditProfileDropDown(props) {
    const { t } = useTranslation()

    const dropdownStyle = {
        top: props.position.top + 'px',
        left: props.position.left + 'px',
        minWidth: props.width,
    };

    useEffect(() => {
        document.body.className = props.darkStatus ? "theme_dark" : "";
    }, [props.darkStatus]);
    return ReactDOM.createPortal(
        <div className="profile-drop-down">
            <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%' }}>
                <div>
                    <div className="rc-dropdown rc-dropdown-placement-bottomRight" style={dropdownStyle}>
                        <ul className="rc-menu rc-menu-root rc-menu-vertical" role="menu" tabIndex="0">
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <Link className="btn btn_menu-item text-uppercase" rel="" to="/">
                                    <span className="btn__text">{t("dashboard")}</span>
                                </Link>
                            </li>
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <Link className="btn btn_menu-item text-uppercase" rel="" to="/profile">
                                    <span className="btn__text">{t("Header.accountInfo")}</span>
                                </Link>
                            </li>
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <a
                                    className="btn btn_menu-item text-uppercase"
                                    href="https://20923924.hs-sites.com/knowledge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="btn__text">{t("Header.knowledgeCenter")}</span>
                                </a>
                            </li>
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <Link className="btn btn_menu-item text-uppercase" rel="" to="/partners">
                                    <span className="btn__text">{t("Header.partners")}</span>
                                </Link>
                            </li>
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <a className="btn btn_menu-item text-uppercase" href="/terms_of_use" target="_blank">
                                    <span className="btn__text">{t("Header.termsOfUse")}</span>
                                </a>
                            </li>
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <button type="button" className="btn btn_menu-item text-uppercase">
                                    <span className="btn__text">{t("Header.logOut")}</span>
                                </button>
                            </li>
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <label className="toggle avatar-button__menu-toggle-item" >
                                    <input type="checkbox" className="toggle__input" checked={props.darkStatus} onChange={props.darkModeHandle} />
                                    <span className="toggle__background">
                                        <span className="toggle__dot"></span>
                                    </span>
                                    <span className="toggle__label">
                                        <span>{t("Header.darkMode")}</span>
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default EditProfileDropDown;