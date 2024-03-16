import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RequestDropDown from './RequestDropDown';

function Request() {
    const { t } = useTranslation()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [supportButtonPosition, setSupportButtonPosition] = useState(null);


    const handleSupportButtonClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
        updateSupportButtonPosition();
    };

    const updateSupportButtonPosition = () => {
        const buttonElement = document.querySelector('[data-test="support-button"]');
        if (buttonElement) {
            const buttonRect = buttonElement.getBoundingClientRect();
            const leftValue = `${((buttonRect.left / buttonRect.right) * 100) - 21}%`

            setSupportButtonPosition({
                top: buttonRect.bottom + window.scrollY + 10,
                left: leftValue,
                width: buttonRect.width
            });
        }
    };

    return (
        <div>
            <ul className="header__button-set">
                <li className={`${isDropdownOpen ? "header__text-button rc-dropdown-open" : "header__text-button"}`} data-test="support-button" onClick={handleSupportButtonClick}>
                    {t("Header.request")} <i className="icon fa-solid fa-chevron-down header__text-button_icon-chevron"></i>
                </li>
            </ul>
            {isDropdownOpen && (<RequestDropDown position={supportButtonPosition} click={handleSupportButtonClick} setIsDropdownOpen={setIsDropdownOpen} />)}
        </div>

    )
}

export default Request;