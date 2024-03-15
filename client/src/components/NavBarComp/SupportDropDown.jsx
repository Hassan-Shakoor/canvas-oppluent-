import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

function SupportDropDown(props) {

  const { t } = useTranslation()

  const dropdownStyle = {
    position: 'fixed',
    // top: props.position.top + 'px',
    // left: props.position.left + 'px',
    top: '66px',
    left: '1100px',
    "min-width": props.width,
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
      <div className="styleSDD" style={{ position: 'absolute', top: '0px', left: '0px', width: '100%' }}>
        <div>
          <div className="rc-dropdown rc-dropdown-placement-bottomLeft" style={dropdownStyle}>
            <div className="header__dropdown header__dropdown_support">
              <header className="support-overlay__header">
                <div className="support-overlay__name text-uppercase">{t("Header.support")}</div>
              </header>
              <div className="support-overlay__panel">
                <div className="support-overlay__description">Platform Customer Service:</div>
                <a className="btn support-overlay__email btn_link" href="mailto:support@maxadesigns.com" target="_blank" rel="noopener noreferrer">
                  <span onClick={props.click} className="btn__text">support@maxadesigns.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
export default SupportDropDown;