import React, { useEffect, useRef } from 'react';
// ** import React and Dependencies
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { selectDarkMode, updateDarkMode } from '../../store/app/User/userPreference';

// ** Firebase
import { auth } from '../../configs/firebase';

function ProfileDropDown({ position, setIsSecondDropdownOpen }) {

    const isEditKeywordPresent = window.location.href.includes('/edit/');

    const { t } = useTranslation()

    // ** Vars
    const darkMode = useSelector(selectDarkMode)
    const dispatch = useDispatch()

    const dropdownStyle = {
        position: 'fixed',
        // top: position.top + 'px',
        top: '66px',
        left: position.left
    };

    const navigate = useNavigate();

    const dropdownRef = useRef();

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                console.log('Logged out');
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    useEffect(() => {
        document.body.className = darkMode ? "theme_dark" : "";
    }, [darkMode]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Clicked outside the dropdown, close it
                setIsSecondDropdownOpen(false);
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return ReactDOM.createPortal(
        <div className="profile-drop-down" ref={dropdownRef}>
            <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%' }}>
                <div>
                    <div className="rc-dropdown rc-dropdown-placement-bottomRight" style={dropdownStyle}>
                        <ul className="rc-menu rc-menu-root rc-menu-vertical" role="menu" tabIndex="0">
                            {
                                isEditKeywordPresent && (
                                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                        <Link className="btn btn_menu-item text-uppercase" rel="" to="/">
                                            <span className="btn__text">{t("dashboard")}</span>
                                        </Link>
                                    </li>)
                            }
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <Link className="btn btn_menu-item text-uppercase" rel="" to="/profile">
                                    <span className="btn__text">{t("Header.accountInfo")}</span>
                                </Link>
                            </li>
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <a className="btn btn_menu-item text-uppercase" href="https://20923924.hs-sites.com/knowledge" target="_blank" rel="noopener noreferrer">
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
                                <button type="button" className="btn btn_menu-item text-uppercase" onClick={handleLogout}>
                                    <span className="btn__text">{t("Header.logOut")}</span>
                                </button>
                            </li>
                            <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                                <label className="toggle avatar-button__menu-toggle-item" >
                                    <input type="checkbox" className="toggle__input" checked={darkMode} onChange={() => dispatch(updateDarkMode(!darkMode))} />
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

export default ProfileDropDown;