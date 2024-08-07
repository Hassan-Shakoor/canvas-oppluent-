import React, { useState } from 'react';
import SupportDropDown from './SupportDropDown';
import { useTranslation } from 'react-i18next';

function Support() {
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
            const leftValue = `${((buttonRect.left / buttonRect.right) * 100) - 16}%`

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
                    {t("Header.support")} <i className="icon fa-solid fa-chevron-down header__text-button_icon-chevron"></i>
                </li>
            </ul>
            {isDropdownOpen && (
                <SupportDropDown
                    position={supportButtonPosition}
                    click={handleSupportButtonClick}
                    setIsDropdownOpen={setIsDropdownOpen} />)}
        </div>

    )
}

export default Support;