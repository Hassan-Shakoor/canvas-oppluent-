import React, { useState } from 'react';
import RequestDropDown from './RequestDropDown';

function Request() {
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
            setSupportButtonPosition({
                top: buttonRect.bottom + window.scrollY + 10,
                left: buttonRect.left + window.scrollX,
                width: buttonRect.width
            });
        }
    };

    return (
        <div>
            <ul className="header__button-set">
                <li className={`${isDropdownOpen ? "header__text-button rc-dropdown-open" : "header__text-button"}`} data-test="support-button" onClick={handleSupportButtonClick}>
                    Request <i className="icon fa-solid fa-chevron-down header__text-button_icon-chevron"></i>
                </li>
            </ul>
            {isDropdownOpen && (<RequestDropDown position={supportButtonPosition} click={handleSupportButtonClick} setIsDropdownOpen={setIsDropdownOpen} />)}
        </div>

    )
}

export default Request;