import React, { useState} from 'react';
import EditProfileDropDown from "./EditProfileDropDown"

function ProfileEdit(props){
  const [darkMode, setDarkMode] = useState(false);
  const [isSecondDropDownOpen,setIsSecondDropdownOpen] = useState(false);
  const [profileButtonPosition, setProfileButtonPosition] = useState(null);

  const handleSecondButtonClick = () => {
  setIsSecondDropdownOpen(!isSecondDropDownOpen);
  updateProfileButtonPosition();
  }

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const updateProfileButtonPosition = () => {
      const buttonElement = document.querySelector('.avatar-button');
      if (buttonElement) {
        const buttonRect = buttonElement.getBoundingClientRect();
      //   console.log(buttonRect);
        setProfileButtonPosition({
          top: buttonRect.bottom + window.scrollY,
          left:buttonRect.left - (buttonRect.right - buttonRect.left) + window.scrollY + 10,
        });
      }
    };

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
              <EditProfileDropDown position={profileButtonPosition} darkModeHandle={handleDarkModeToggle} darkStatus={darkMode}/>
          )}
      </div>
  )
}

export default ProfileEdit;