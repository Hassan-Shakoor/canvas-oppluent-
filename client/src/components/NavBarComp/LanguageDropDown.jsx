import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

function LanguageDropDown(props) {

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  console.log(props.position);
  const dropdownStyle = {
    position: 'fixed',
    // top: props.position.top + 'px',
    left: props.position.left,
    top: '66px',
    // left: '1310px',
    "min-width": props.width,
  };

  const handleOptionClick = (event, language, backgroundImage) => {
    event.preventDefault();
    props.flag(backgroundImage);
    changeLanguage(language);
  };

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, close it
        props.setIsDropdownOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return ReactDOM.createPortal(
    <div className="support-drop-down" ref={dropdownRef}>
      <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%' }}>
        <div>
          <div className="rc-dropdown rc-dropdown-placement-bottomRight" style={dropdownStyle}>
            <div className="language-switcher__overlay">
              <div className="language-switcher__option" onClick={(event) => handleOptionClick(event, 'en', 'url("https://tcgimarketing.com/images/flags/en.svg")')}>
                <i className="language-switcher__option-flag language-switcher__flag" style={{ backgroundImage: 'url("https://tcgimarketing.com/images/flags/en.svg")' }}></i>
                <span className="language-switcher__option-text">English</span>
              </div>
              <div className="language-switcher__option" onClick={(event) => handleOptionClick(event, 'es', 'url("https://tcgimarketing.com/images/flags/es.svg")')}>
                <i className="language-switcher__option-flag language-switcher__flag" style={{ backgroundImage: 'url("https://tcgimarketing.com/images/flags/es.svg")' }}></i>
                <span className="language-switcher__option-text">Español</span>
              </div>
              <div className="language-switcher__option" onClick={(event) => handleOptionClick(event, 'fr', 'url("https://tcgimarketing.com/images/flags/fr.svg")')}>
                <i className="language-switcher__option-flag language-switcher__flag" style={{ backgroundImage: 'url("https://tcgimarketing.com/images/flags/fr.svg")' }}></i>
                <span className="language-switcher__option-text">Français</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>,
    document.body
  );
}

export default LanguageDropDown;
