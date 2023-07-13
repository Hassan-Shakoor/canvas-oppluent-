import React, { useState } from "react";
import Group from "./Group";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Brand Assets",
    subTitle: [
      { id: 1, name: "Logos" },
      { id: 2, name: "Magnetic Signs" },
      { id: 3, name: "Name Tags" }
    ],
  },
  {
    title: "Digital",
    subTitle: [
      { id: 4, name: "Email Signatures" },
      { id: 5, name: "HTML Email Newsletters" },
      { id: 6, name: "HTML Email Signatures" },
      { id: 7, name: "Instagram Stories" },
      { id: 8, name: "Office Social Media" },
      { id: 9, name: "Social Media Banners" },
      { id: 10, name: "Social Media Posts" }
    ],
  },
  {
    title: "Luxury",
    subTitle: [
      { id: 11, name: "Business Cards" },
      { id: 12, name: "Email Newsletter Campaigns" },
      { id: 13, name: "Email Signatures" },
      { id: 14, name: "Instagram Stories" },
      { id: 15, name: "Postcards" },
      { id: 16, name: "Property Brochure" },
      { id: 17, name: "Property Flyers" },
      { id: 18, name: "Social Media" }
    ],
  },
  {
    title: "Print",
    subTitle: [
      { id: 19, name: "Business Cards" },
      { id: 20, name: "Buyer's Guides" },
      { id: 21, name: "Door Hangers" },
      { id: 22, name: "For Sale Signs" },
      { id: 23, name: "Letterheads" },
      { id: 24, name: "Open House Signs" },
      { id: 25, name: "Postcards" },
      { id: 26, name: "Property Brochures" },
      { id: 27, name: "Property Flyers" },
      { id: 28, name: "Recruiting Packet" },
      { id: 29, name: "Sign Rider" },
      { id: 30, name: "Thank You Cards" },
      { id: 31, name: "Tri-Folds" }
    ],
  },
];
  
  function CategorySideBar(){
    const [isDesignClicked , setDesignClicked] = useState(true)
    // Store the state of which list item is selected inside List Category
    const [activeList, setActiveList] = useState(null);
    // React State in which we can store value of selected item title so can be placed in search PlaceHolder.
    const [isSelected,setSelected] = useState(null);
    // Handler for Above State
    function handleSelected(item){
      setSelected(item)
    }
    function handleSelectedList(item){
      setActiveList(item)
      setDesignClicked(false)
    }

    function handleDesignClick(){
      setDesignClicked(true)
    }
  // Render the SideTitle components dynamically using map()
  const sideTitles = categories.map((category, index) => (
    <Group
    key={index}
    titleName={category.title}
    subTitle={category.subTitle}
    placeholder={handleSelected}
    handleSelectedList={handleSelectedList}
    selectedList={activeList}
  />
  ));

  

    return(
          <aside className="page__sidebar">
              <div className="sidebar-dashboard">
                  <div className="groups">
                  <div className="container">
                      <div className="groups__item">
                      <Link aria-current="page" className={isDesignClicked ? "groups__title groups__title_hovered groups__title_active" : "groups__title groups__title_hovered"} to="/categories" onClick={handleDesignClick}>My Designs</Link>
                      </div>
                  </div>
                  </div>
                  <div className="container">
                  <div className="sidebar-dashboard__search">
                      <div className="row">
                      <div className="col">
                          <div className="sidebar-dashboard__search-title">Templates</div>
                      </div>
                      <div className="col-auto" />
                      </div>
                      <div className="search-input_expanded search-input">
                      <label htmlFor="search">
                          <svg className="icon v2-icon v2-icon-loupe search-input__icon">
                          <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe" />
                          </svg>
                      </label>
                      <div className>
                          <input autoComplete="off" id="search" name="search" placeholder={isSelected === null ? "Search" : "Search in " + isSelected} type="search" className="search-input__input"  />
                      </div>
                      </div>
                  </div>
                  </div>
                  <div className="sidebar-dashboard__categories">
                  <div className="groups groups_scrollable">
                      <div className="container">
                      <div className="groups__item">
                          <span className="groups__title groups__title_cursor-text">Favorites</span>
                          <ul>
                          <li className="groups__category">
                              <a className="groups__category-title" href="/categories/popular">
                              <svg className="icon v2-icon v2-icon-folder">
                                  <use href="#v2-icon-folder" xlinkHref="#v2-icon-folder" />
                              </svg>Most Popular Templates </a>
                          </li>
                          </ul>
                      </div>
                      {/* Rendering All The Components of Side title */}
                      <>{sideTitles}</>
                      </div>
                  </div>
                  </div>
                  <div className="container">
                  <div className="sidebar-dashboard__tutorials">
                      <a className="sidebar-dashboard__btn" href="/tutorials">
                      <svg className="icon v2-icon v2-icon-document">
                          <use href="#v2-icon-document" xlinkHref="#v2-icon-document" />
                      </svg>Knowledge Center </a>
                  </div>
                  </div>
              </div>
              </aside>
    )
}

export default CategorySideBar;