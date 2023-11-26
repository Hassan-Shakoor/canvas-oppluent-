// ** Import React
import React, { useEffect, useState} from 'react';

// ** Custom Component
import ProfileDropDown from './ProfileDropDown';

// ** Store
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInfo, selectUID, selectUserData } from '../../store/app/User/userPreference';

function Profile(){
  // ** State
  const [isSecondDropDownOpen,setIsSecondDropdownOpen] = useState(false);
  const [profileButtonPosition, setProfileButtonPosition] = useState(null);
  const [userName, setUserName] = useState("")
  const [letterName, setLetterName] = useState("")

  // ** Vars
  const dispatch = useDispatch()
  const uid  = useSelector(selectUID)
  const userData = useSelector(selectUserData)

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
  },[dispatch])

  useEffect(() => {
    if (userData) {
      setUserName(userData[uid])
      setLetterName(userData[uid][0])
    }
  },[uid, userData])

  return(
      <div>
          <div className={`${isSecondDropDownOpen ? "avatar-button rc-dropdown-open" : "avatar-button"}`} onClick={handleSecondButtonClick}>
              <div className="avatar-image" style={{ backgroundColor: 'rgb(193, 139, 190)' }}>
                  <span className="avatar-image__initials">{letterName}</span>
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