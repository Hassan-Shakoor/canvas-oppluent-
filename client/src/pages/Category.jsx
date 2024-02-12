// ** Import React
import React from 'react';
import { ToastContainer} from 'react-toastify';

// ** Store
import { useSelector } from "react-redux";
import { selectDarkMode } from "../store/app/User/userPreference";

// ** Custom Components
import Header from '../components/NavBarComp/Header';
import CategorySideBar from '../components/CategSideBarComp/CategorySideBar';
import CategoryContent from '../components/CategContentComponent/CategoryContent';
import { selectProfile } from '../store/app/AccountInformation/profile';




function Category() {
  // ** Vars
  const darkMode = useSelector(selectDarkMode)
  const userProfile = useSelector(selectProfile);

  return (
    <div>
      <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'}/>
      <Header name={userProfile.firstName} />
      <div className='page page_without-animation page_with-container page_with-sidebar page_show-sidebar'>
        <CategorySideBar/>
        <CategoryContent/>
      </div>
    </div>
  );
}

export default Category;
