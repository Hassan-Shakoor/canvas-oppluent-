// ** Import Libraries 
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

// ** Import Custom Component
import Support from './Support';
import Profile from './Profile'
import LanguageDropDown from './LanguageDropDown'

// ** Firebase
import { onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../FirebaseAuthComp/firebase';
import { getDatabase, ref, set, onValue } from "firebase/database";

function Header(props) {
  // ** Stats
  const [isDropdownOpen,setIsDropdownOpen] = useState(false);
  const [isFlag, setIsFlag] = useState('url("https://tcgimarketing.com/images/flags/en.svg")');
  const [languageButtonPosition, setlanguageButtonPosition] = useState(null)
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const database = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        
        // Fetch user data from the Realtime Database
        const userJsonRef = ref(database, `${uid}/userData`);
        onValue(userJsonRef, (snapshot) => {
          const userDataFromDB = snapshot.val();
          if (userDataFromDB) {
            setUserData(userDataFromDB);
          }
        });
      } else {
        // User is signed out
        setUserId(""); // Reset userId when the user signs out
        setUserData(""); // Clear user data
      }
    });

    // Clean up the listener when the component unmounts.
    return () => {
      unsubscribe();
    };
  }, []);
  
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
        left:buttonRect.left - ((buttonRect.right - buttonRect.left)*3) + window.screenY,
      });
    }
  };

  return (
    <div className="header" style={{ background: 'linear-gradient(90deg, rgb(202, 182, 125), rgb(31, 31, 31))' }}>
      <Link className="header__image-box" to='/categories'>
        <img className="header__logo" alt="Claircius Group International" src="https://dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/account/platform_logo/original/platform_logo_login_1-1-1.png?1661778656" />
      </Link>
      <div className="header__divider"></div>
      <Support/>
      <Profile name={userData && userData[userId]}/>
      {/* Language Section */}
      <i className={`${isDropdownOpen ? "language-switcher language-switcher__flag ms-2 rc-dropdown-open" : "language-switcher language-switcher__flag ms-2"}`} style={{backgroundImage:isFlag}} onClick={handleLanguageButtonClick}/>
      {isDropdownOpen && (<LanguageDropDown flag={handleFlag} position={languageButtonPosition} />)}
    </div>
  );
}

export default Header;
