import React from 'react';
import Header from '../components/NavBarComp/Header';
import CategorySideBar from '../components/CategSideBarComp/CategorySideBar';
import CategoryContent from '../components/CategContentComponent/CategoryContent';




function Category() {
  // Category component code
  return (
    <div>
      <Header name="Faizan"/>
      <div className='page page_without-animation page_with-container page_with-sidebar page_show-sidebar'>
        <CategorySideBar/>
        <CategoryContent/>
      </div>
    </div>
  );
}

export default Category;
