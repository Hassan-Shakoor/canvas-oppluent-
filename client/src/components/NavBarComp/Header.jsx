// ** Import Libraries 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Import Custom Component
import Support from './Support';
import Profile from './Profile'
import LanguageDropDown from './LanguageDropDown'
import Request from './Request';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/app/AccountInformation/profile';

function Header(props) {
  // ** Stats
  const userProfile = useSelector(selectProfile);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFlag, setIsFlag] = useState('url("https://tcgimarketing.com/images/flags/en.svg")');
  const [languageButtonPosition, setlanguageButtonPosition] = useState(null)


  // console.log("userProfile -> ", userProfile)

  const handleFlag = (backgroundImage) => {
    setIsFlag(backgroundImage);
    setIsDropdownOpen(!isDropdownOpen)
  }
  const handleLanguageButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    updatelanguageButtonPosition()
  }

  const updatelanguageButtonPosition = () => {
    const buttonElement = document.querySelector('.language-switcher');
    if (buttonElement) {
      const buttonRect = buttonElement.getBoundingClientRect();
      console.log(buttonRect);
      const leftValue = `${((buttonRect.left / buttonRect.right) * 100) - 6.8}%`

      setlanguageButtonPosition({
        top: buttonRect.bottom + window.scrollY + 15,
        left: leftValue,
      });
    }
  };

  return (
    <div className="header" style={{ background: 'linear-gradient(90deg, rgb(202, 182, 125), rgb(31, 31, 31))' }}>
      <Link className="header__image-box" to='/categories'>
        <img className="header__logo" alt="Claircius Group International" src="https://dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/account/platform_logo/original/platform_logo_login_1-1-1.png?1661778656" />
      </Link>
      <div className="header__divider"></div>
      {userProfile.isAdmin && <Request />}
      <Support />
      <Profile />
      {/* Language Section */}
      <i className={`${isDropdownOpen ? "language-switcher language-switcher__flag ms-2 rc-dropdown-open" : "language-switcher language-switcher__flag ms-2"}`} style={{ backgroundImage: isFlag }} onClick={handleLanguageButtonClick} />
      {isDropdownOpen && (
        <LanguageDropDown
          flag={handleFlag}
          position={languageButtonPosition}
          setIsDropdownOpen={setIsDropdownOpen} />)}
    </div>
  );
}

export default Header;
