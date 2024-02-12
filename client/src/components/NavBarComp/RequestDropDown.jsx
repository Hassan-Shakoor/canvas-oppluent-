import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function RequestDropDown(props) {

  const dropdownStyle = {
    top: `${props.position.top}px`,
    left: `${props.position.left}px`,
    minWidth: props.width,
  };

  return ReactDOM.createPortal(
    <div className="support-drop-down">
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
                  <span className="btn__text"><FontAwesomeIcon icon="fa-regular fa-image" /> Template Requests</span>
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
