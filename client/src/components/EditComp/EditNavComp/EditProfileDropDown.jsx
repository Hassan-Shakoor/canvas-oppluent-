import React , {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

function EditProfileDropDown(props) {
    const dropdownStyle = {
        top: props.position.top + 'px',
        left: props.position.left + 'px',
        minWidth: props.width,
      };
    
    useEffect(() => {
    document.body.className = props.darkStatus ? "theme_dark" : "";
    }, [props.darkStatus]);
  return ReactDOM.createPortal(
    <div className="profile-drop-down">
    <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%' }}>
        <div>
            <div className="rc-dropdown rc-dropdown-placement-bottomRight" style={dropdownStyle}>
                <ul className="rc-menu rc-menu-root rc-menu-vertical" role="menu" tabIndex="0">
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <a className="btn btn_menu-item text-uppercase" rel="" href="/">
                            <span className="btn__text">Dashboard</span>
                        </a>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <a className="btn btn_menu-item text-uppercase" rel="" href="/profile">
                            <span className="btn__text">Account Information</span>
                        </a>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <a className="btn btn_menu-item text-uppercase" href="https://20923924.hs-sites.com/knowledge" target="_blank">
                            <span className="btn__text">Knowledge Center</span>
                        </a>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <a className="btn btn_menu-item text-uppercase" rel="" href="/partners">
                            <span className="btn__text">Partners</span>
                        </a>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <a className="btn btn_menu-item text-uppercase" href="/terms_of_use" target="_blank">
                            <span className="btn__text">Terms Of Use</span>
                        </a>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <button type="button" className="btn btn_menu-item text-uppercase">
                            <span className="btn__text">Log Out</span>
                        </button>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <label className="toggle avatar-button__menu-toggle-item" >
                            <input type="checkbox" className="toggle__input" checked={props.darkStatus} onChange={props.darkModeHandle}/>
                            <span className="toggle__background">
                                <span className="toggle__dot"></span>
                            </span>
                            <span className="toggle__label">
                                <span>Dark Mode</span>
                            </span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>,
    document.body
  );
}

export default EditProfileDropDown;