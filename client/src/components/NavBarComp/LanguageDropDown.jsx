import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function LanguageDropDown(props) {
  console.log(props.position);
  const dropdownStyle = {
    top: props.position.top + 'px',
    left: props.position.left + 'px',
    "min-width": props.width,
  };
  
  const handleOptionClick = (event, backgroundImage) => {
    props.flag(backgroundImage);
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
                <div className="language-switcher__option" onClick={(event) => handleOptionClick(event, 'url("https://tcgimarketing.com/images/flags/en.svg")')}>
                <i className="language-switcher__option-flag language-switcher__flag" style={{ backgroundImage: 'url("https://tcgimarketing.com/images/flags/en.svg")' }}></i>
                <span className="language-switcher__option-text">English</span>
                </div>
                <div className="language-switcher__option" onClick={(event) => handleOptionClick(event, 'url("https://tcgimarketing.com/images/flags/es.svg")')}>
                <i className="language-switcher__option-flag language-switcher__flag" style={{ backgroundImage: 'url("https://tcgimarketing.com/images/flags/es.svg")' }}></i>
                <span className="language-switcher__option-text">Español</span>
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
