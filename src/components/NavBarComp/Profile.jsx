import React, { useState} from 'react';
import ProfileDropDown from './ProfileDropDown';

function Profile(props){
    const [isSecondDropDownOpen,setIsSecondDropdownOpen] = useState(false);

    const handleSecondButtonClick = () => {
    setIsSecondDropdownOpen(!isSecondDropDownOpen);
    }

    
    return(
        <div>
            <div className={`${isSecondDropDownOpen ? "avatar-button rc-dropdown-open" : "avatar-button"}`} onClick={handleSecondButtonClick}>
                <div className="avatar-image" style={{ backgroundColor: 'rgb(193, 139, 190)' }}>
                    <span className="avatar-image__initials">{props.name[0]}</span>
                </div>
                <p className="avatar-button__username">{props.name}</p>
                {isSecondDropDownOpen ? <i className="icon fa-solid fa-chevron-up header__text-button_icon-chevron"/> : <i className="icon fa-solid fa-chevron-down header__text-button_icon-chevron"/>}
            </div>
            {isSecondDropDownOpen && (
                <ProfileDropDown />
            )}
        </div>
    )
}

export default Profile;