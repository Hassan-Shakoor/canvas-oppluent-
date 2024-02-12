// ** Import Libraries 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Import Custom Component
import Support from './Support';
import Profile from './Profile'
import LanguageDropDown from './LanguageDropDown'
import Request from './Request';

function Header(props) {
  // ** Stats
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFlag, setIsFlag] = useState('url("https://tcgimarketing.com/images/flags/en.svg")');
  const [languageButtonPosition, setlanguageButtonPosition] = useState(null)


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
      setlanguageButtonPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left - ((buttonRect.right - buttonRect.left) * 3) + window.screenY,
      });
    }
  };

  return (
    <div className="header" style={{ background: 'linear-gradient(90deg, rgb(202, 182, 125), rgb(31, 31, 31))' }}>
      <Link className="header__image-box" to='/categories'>
        <img className="header__logo" alt="Claircius Group International" src="https://dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/account/platform_logo/original/platform_logo_login_1-1-1.png?1661778656" />
      </Link>
      <div className="header__divider"></div>
      <Request />
      <Support />
      <Profile />
      {/* Language Section */}
      <i className={`${isDropdownOpen ? "language-switcher language-switcher__flag ms-2 rc-dropdown-open" : "language-switcher language-switcher__flag ms-2"}`} style={{ backgroundImage: isFlag }} onClick={handleLanguageButtonClick} />
      {isDropdownOpen && (<LanguageDropDown flag={handleFlag} position={languageButtonPosition} />)}
    </div>
  );
}

export default Header;
