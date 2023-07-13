import React from 'react';
import Header from './NavBarComp/Header';
import CategorySideBar from './CategSideBarComp/CategorySideBar';
import CategoryContent from './CategContentComponent/CategoryContent';

function Category() {
  // Category component code
  return (
    <div>
      <Header name="Faizan"/>
      <div className='page page_without-animation page_with-container page_with-sidebar page_show-sidebar'>
        <CategorySideBar
        />
        <CategoryContent/>
      </div>
    </div>
  );
}

export default Category;
