import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RequestDropDown(props) {

  const { t } = useTranslation()

  const dropdownStyle = {
    position: 'fixed',
    // top: `${props.position.top}px`,
    // left: `${props.position.left}px`,
    top: '66px',
    left: '980px',
    minWidth: props.width,
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
            <ul className="rc-menu rc-menu-root rc-menu-vertical header__dropdown" role="menu" tabIndex="0" data-menu-list="true">
              {/* Uncomment the items you need */}
              {/* <li className="rc-menu-item" role="menuitem" tabIndex="-1" data-menu-id="rc-menu-uuid-85920-1-0">
          <button type="button" className="btn btn_menu-item">
            <span className="btn__text"><i className="icon icon-pen-board"></i>Request Design</span>
          </button>
        </li>
        <li className="rc-menu-item" role="menuitem" tabIndex="-1" data-menu-id="rc-menu-uuid-85920-1-1">
          <button type="button" className="btn btn_menu-item">
            <span className="btn__text"><i className="icon icon-calendar"></i>Request Training</span>
          </button>
        </li> */}
              <li className="rc-menu-item" role="menuitem" tabIndex="-1" data-menu-id="rc-menu-uuid-85920-1-2">
                <Link to={'/template-request'} className="btn btn_menu-item">
                  <span className="btn__text"><FontAwesomeIcon icon="fa-regular fa-image" /> {t("Header.templateRequest")}</span>
                </Link>
              </li>
              <li className="rc-menu-item" role="menuitem" tabIndex="-1" data-menu-id="rc-menu-uuid-85920-1-2">
                <Link to={'/user-registration-email'} className="btn btn_menu-item">
                  <span className="btn__text"><FontAwesomeIcon icon="fa-solid fa-user-plus" /> {t("Header.addNewUser")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default RequestDropDown;
