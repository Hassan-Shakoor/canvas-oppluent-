import React , {useEffect} from 'react';
// ** import React and Dependencies
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';

// ** Store
import {useDispatch, useSelector} from 'react-redux'
import { selectDarkMode, updateDarkMode } from '../../store/app/User/userPreference';

// ** Firebase
import { auth } from '../../configs/firebase';

function ProfileDropDown({position}) {
    // ** Vars
    const darkMode = useSelector(selectDarkMode)
    const dispatch = useDispatch()
    
    const dropdownStyle = {
        top: position.top + 'px',
        left: position.left + 'px'
      };

      const navigate = useNavigate();

      const handleLogout = () => {
        auth.signOut()
          .then(() => {
            console.log('Logged out');
            navigate('/'); 
          })
          .catch((error) => {
            console.error('Logout error:', error);
          });
      };

    useEffect(() => {
    document.body.className = darkMode ? "theme_dark" : "";
    }, [darkMode]);
    
  return ReactDOM.createPortal(
    <div className="profile-drop-down">
    <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%' }}>
        <div>
            <div className="rc-dropdown rc-dropdown-placement-bottomRight" style={dropdownStyle}>
                <ul className="rc-menu rc-menu-root rc-menu-vertical" role="menu" tabIndex="0">
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <Link className="btn btn_menu-item text-uppercase" rel="" to="/profile">
                            <span className="btn__text">Account Information</span>
                        </Link>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <a className="btn btn_menu-item text-uppercase" href="https://20923924.hs-sites.com/knowledge" target="_blank" rel="noopener noreferrer">
                            <span className="btn__text">Knowledge Center</span>
                        </a>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <Link className="btn btn_menu-item text-uppercase" rel="" to="/partners">
                            <span className="btn__text">Partners</span>
                        </Link>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <a className="btn btn_menu-item text-uppercase" href="/terms_of_use" target="_blank">
                            <span className="btn__text">Terms Of Use</span>
                        </a>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <button type="button" className="btn btn_menu-item text-uppercase" onClick={handleLogout}>
                            <span className="btn__text">Log Out</span>
                        </button>
                    </li>
                    <li className="rc-menu-item rc-dropdown-menu-item__button" role="menuitem">
                        <label className="toggle avatar-button__menu-toggle-item" >
                            <input type="checkbox" className="toggle__input" checked={darkMode} onChange={() => dispatch(updateDarkMode(!darkMode))}/>
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

export default ProfileDropDown;