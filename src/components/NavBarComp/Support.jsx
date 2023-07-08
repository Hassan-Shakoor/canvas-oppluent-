import React, { useState } from 'react';
import SupportDropDown from './SupportDropDown';

function Support(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSupportButtonClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

    return(
        <div>
            <ul className="header__button-set">
                <li className={`${isDropdownOpen ? "header__text-button rc-dropdown-open" : "header__text-button"}`} data-test="support-button" onClick={handleSupportButtonClick}>
                Support <i className="icon fa-solid fa-chevron-down header__text-button_icon-chevron"></i>
                </li>
            </ul>
            {isDropdownOpen && (<SupportDropDown click={handleSupportButtonClick}/>)}
        </div>
            
    )
}

export default Support;