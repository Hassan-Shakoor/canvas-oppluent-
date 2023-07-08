import React from 'react';
import Header from './NavBarComp/Header';
import CategorySideBar from './CategSideBarComp/CategorySideBar';

function Category() {
  // Category component code
  return (
    <div>
    <Header name="Faizan"/>
    <div className='page page_without-animation page_with-container page_with-sidebar page_show-sidebar'>
      <CategorySideBar/>
    </div>
    </div>
  );
}

export default Category;
