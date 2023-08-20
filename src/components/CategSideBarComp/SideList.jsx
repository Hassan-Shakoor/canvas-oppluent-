import React, { useState } from "react";
import { Link } from "react-router-dom";

function SubList(props){

    function handleClick(event){
      props.handleSubItemClick(props.subList.name,props.subList.id);
  }
  
      return(
          <li className="groups__tag animation-appear-list-item-enter-done" >
          <Link to={`/categories/${props.subList.id}`} className={props.active ? "groups__tag-title groups__tag-title_selected" : "groups__tag-title"} onClick={handleClick}>
            <svg className="icon v2-icon v2-icon-file">
              <use href="#v2-icon-file" xlinkHref="#v2-icon-file" />
            </svg>
            {props.subList.name}
          </Link>
        </li>
      )
  }

function SideList(props){

    // Storing SubList Data in Variable
    let sublistData = props.sideListData.subList;

    const [activeSubItem, setActiveSubItem] = useState(null);

    function addFavorite(){
        props.addToFavorites(props.id)
    }
    function removeFavorite(){
        props.removeFromFavorites(props.id)
    }

    function handleClick(){
        props.handleItemSelected(props.sideListData.name,props.sideListData.id);
        setActiveSubItem(props.id)
    }

    // Handling both State of Which Sub Item is open and also parsing placeholder name using placeholder function
    function handleSubItemClick(name,id) {
        setActiveSubItem(id);
        props.handlePlaceholder(name)
        // props.tabTitle(item)
      }
    return(
        <li className="groups__category animation-appear-sub-menu-appear-done animation-appear-sub-menu-enter-done" >
            <Link to={`/categories/${props.id}`} className={props.active ? "groups__category-title groups__category-title_selected" : "groups__category-title"} onClick={handleClick}>
                <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                    <use xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                </svg>
                {props.sideListData.name}
                {props.sideListData.name !== "Most Popular Templates" && 
                    <svg className={props.isFavorite.includes(props.id)?"icon v2-icon v2-icon-heart-solid groups__category-favorite-btn groups__category-favorite-btn_active":"icon v2-icon v2-icon-heart-solid groups__category-favorite-btn"}
                        onClick={props.isFavorite.includes(props.id) ? removeFavorite : addFavorite}>
                        <use xlinkHref="#v2-icon-heart-solid" />
                    </svg>}
            </Link>
            <ul className="groups__category-items">
                {props.active && sublistData && sublistData.map((subList , index) => (
                    <SubList 
                        key={index}
                        subList={subList}
                        active={activeSubItem === subList.id}
                        handleSubItemClick={handleSubItemClick}
                    />)
                )}
            </ul>
        </li>
    )
}

export default SideList;