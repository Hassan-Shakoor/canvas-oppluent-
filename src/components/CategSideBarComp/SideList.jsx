import React, { useState } from "react";
import SubList from "./SubList";

function SideList(props){

    const [activeSubItem, setActiveSubItem] = useState(null);

    let DigitalInstagramStoriesTitles = ["Browse All","Branding","Holidays","Listing","Recognition"]
    let SocialMediaPostsTitles = ["Browse All","Branding","Holidays","Listing","Real Estate Tips","Recognition"]

    function handleClick(){
        props.onItemClick(props.ListName);
    }

    // Handling both State of Which Sub Item is open and also parsing placeholder name using placeholder function
    function handleSubItemClick(item) {
        setActiveSubItem(item);
        props.placeholder(item)
        // props.tabTitle(item)
      }

    if (props.groupTitle === "Digital" && props.ListName === "Instagram Stories"){
        return(
            <li className="groups__category animation-appear-sub-menu-appear-done animation-appear-sub-menu-enter-done" >
                <span className={props.active ? "groups__category-title groups__category-title_selected" :"groups__category-title"} onClick={handleClick}>
                <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                    <use href={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                </svg>{props.ListName} <svg className="icon v2-icon v2-icon-heart-solid groups__category-favorite-btn">
                    <use href="#v2-icon-heart-solid" xlinkHref="#v2-icon-heart-solid" />
                </svg>
                </span>
                <ul className="groups__category-items">
                    {props.active && DigitalInstagramStoriesTitles.map((title,index) => (
                        <SubList key={index} subTitle={title} active={activeSubItem === title} onSubItemClick={handleSubItemClick}/>
                    ))}
                </ul>
            </li>
        )
    }
    else{
        return(
            <li className="groups__category animation-appear-sub-menu-appear-done animation-appear-sub-menu-enter-done" >
                <span className={props.active ? "groups__category-title groups__category-title_selected" :"groups__category-title"} onClick={handleClick}>
                <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                    <use href={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                </svg>{props.ListName} <svg className="icon v2-icon v2-icon-heart-solid groups__category-favorite-btn">
                    <use href="#v2-icon-heart-solid" xlinkHref="#v2-icon-heart-solid" />
                </svg>
                </span>
                <ul className="groups__category-items">
                </ul>
            </li>
        )
    }
}

export default SideList;