// ** Import React
import React, { useState} from 'react';

// ** Custom Component
import ProfileDropDown from './ProfileDropDown';

// ** Store
import { useSelector } from 'react-redux';
import { selectUID, selectUserData } from '../../store/app/User/userPreference';

function Profile(props){
  // ** State
  const [isSecondDropDownOpen,setIsSecondDropdownOpen] = useState(false);
  const [profileButtonPosition, setProfileButtonPosition] = useState(null);

  // ** Vars
  const uid  = useSelector(selectUID)
  const userData = useSelector(selectUserData)
  const userName = userData[uid]

  const handleSecondButtonClick = () => {
  setIsSecondDropdownOpen(!isSecondDropDownOpen);
  updateProfileButtonPosition();
  }

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
                  <span className="avatar-image__initials">{userName[0]}</span>
              </div>
              <p className="avatar-button__username">{userName}</p>
              {isSecondDropDownOpen ? <i className="icon fa-solid fa-chevron-up header__text-button_icon-chevron"/> : <i className="icon fa-solid fa-chevron-down header__text-button_icon-chevron"/>}
          </div>
          {isSecondDropDownOpen && (
              <ProfileDropDown position={profileButtonPosition}/>
          )}
      </div>
  )
}

export default Profile;