// ** Import React
import React, { useEffect, useState} from 'react';

// ** Custom Component
import ProfileDropDown from './ProfileDropDown';

// ** Store
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo } from '../../store/app/User/userPreference';
import { fetchProfile, selectProfile } from '../../store/app/AccountInformation/profile';

function Profile(){
  // ** State
  const [isSecondDropDownOpen,setIsSecondDropdownOpen] = useState(false);
  const [profileButtonPosition, setProfileButtonPosition] = useState(null);
  const [userName, setUserName] = useState({fullName: '', firstLetter: ''})
  // ** Vars
  const dispatch = useDispatch()
  const userProfileData = useSelector(selectProfile)

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

  useEffect(() => {
    dispatch(fetchUserInfo())
    dispatch(fetchProfile())
  },[dispatch])

  useEffect(() => {
    if (userProfileData?.firstName) {
      setUserName({fullName: userProfileData?.firstName, firstLetter:userProfileData?.firstName[0]})
    }
  },[userProfileData])

  return(
      <div>
          <div className={`${isSecondDropDownOpen ? "avatar-button rc-dropdown-open" : "avatar-button"}`} onClick={handleSecondButtonClick}>
              <div className="avatar-image" style={{ backgroundColor: 'rgb(193, 139, 190)' }}>
                  <span className="avatar-image__initials">{userName.firstLetter}</span>
              </div>
              <p className="avatar-button__username">{userName.fullName}</p>
              {isSecondDropDownOpen ? <i className="icon fa-solid fa-chevron-up header__text-button_icon-chevron"/> : <i className="icon fa-solid fa-chevron-down header__text-button_icon-chevron"/>}
          </div>
          {isSecondDropDownOpen && (
              <ProfileDropDown position={profileButtonPosition}/>
          )}
      </div>
  )
}

export default Profile;