import React, { useState } from "react";
import Group from "./Group";

const categories = [
    {
      title: "Brand Assets",
      subTitle: [
        "Logos",
        "Magnetic Signs",
        "Name Tags"
        ],
    },
    {
      title: "Digital",
      subTitle: [
        "Email Signatures",
        "HTML Email Newsletters",
        "HTML Email Signatures",
        "Instagram Stories",
        "Office Social Media",
        "Social Media Banners",
        "Social Media Posts",
      ],
    },
    {
      title: "Luxury",
      subTitle: [
        "Business Cards",
        "Email Newsletter Campaigns",
        "Email Signatures",
        "Instagram Stories",
        "Postcards",
        "Porperty Brochure",
        "Property Flyers",
        "Social Media",
      ],
    },
    {
      title: "Print",
      subTitle: [
        "Business Cards",
        "Buyer's Guides",
        "Door Hangers",
        "For Sale Signs",
        "Letterheads",
        "Open House Signs",
        "Postcards",
        "Property Brochures",
        "Property Flyers",
        "Recruiting Packet",
        "Sign Rider",
        "Thank You Cards",
        "Tri-Folds",
      ],
    },
  ];
  
  function CategorySideBar(){
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
    }

  // Render the SideTitle components dynamically using map()
  const sideTitles = categories.map((category, index) => (
    <Group key={index} titleName={category.title} subTitle={category.subTitle} placeholder={handleSelected} handleSelectedList={handleSelectedList} selectedList={activeList}/>
  ));


    return(
        <div>
            <aside className="page__sidebar">
                <div className="sidebar-dashboard">
                    <div className="groups">
                    <div className="container">
                        <div className="groups__item">
                        <a aria-current="page" className="groups__title groups__title_hovered groups__title_active" href="/">My Designs</a>
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
        </div>
    )
}

export default CategorySideBar;