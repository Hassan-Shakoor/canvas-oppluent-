import React, { useState } from "react";
import SubList from "./SubList";
import { Link } from "react-router-dom";

function SideList(props){

    const [activeSubItem, setActiveSubItem] = useState(null);

    // Data of Sublist
    const DigitalInstagramStoriesTitles = [
        { id: 32, name: "Browse All" },
        { id: 33, name: "Branding" },
        { id: 34, name: "Holidays" },
        { id: 35, name: "Listing" },
        { id: 36, name: "Recognition" },
      ];
    const SocialMediaPostsTitles = [
        { id: 37, name: "Browse All" },
        { id: 38, name: "Branding" },
        { id: 39, name: "Holidays" },
        { id: 40, name: "Listing" },
        { id: 41, name: "Real Estate Tips" },
        { id: 42, name: "Recognition" },
      ];
    const BusinessCardsTitles = [
        { id: 43, name: "Browse All" },
        { id: 44, name: 'Horizontal - 3.5" x 2"' },
        { id: 45, name: 'Vertical - 3.5" x 2"' }
      ];

    const PostcardsTitles = [
        { id: 46, name: "Browse All" },
        { id: 47, name: '6" x 11"' },
        { id: 48, name: '6" x 9"' }
    ];

    const PropertyFlyersTitles = [
        { id: 49, name: "Browse All" },
        { id: 50, name: 'Double Sided' },
        { id: 51, name: 'Single Sided' }
    ];

    function handleClick(){
        props.onItemClick(props.ListName);
        setActiveSubItem("Browse All")
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
                <Link to={`/categories/32`} className={props.active ? "groups__category-title groups__category-title_selected" :"groups__category-title"} onClick={handleClick}>
                    <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                        <use href={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                    </svg>{props.ListName} <svg className="icon v2-icon v2-icon-heart-solid groups__category-favorite-btn">
                        <use href="#v2-icon-heart-solid" xlinkHref="#v2-icon-heart-solid" />
                    </svg>
                </Link>
                <ul className="groups__category-items">
                    {props.active && DigitalInstagramStoriesTitles.map((item,index) => (
                        <SubList key={index} subTitle={item.name} active={activeSubItem === item.name} onSubItemClick={handleSubItemClick} id={item.id}/>
                    ))}
                </ul>
            </li>
        )
    }
    else if(props.groupTitle === "Digital" && props.ListName === "Social Media Posts"){
        return(
            <li className="groups__category animation-appear-sub-menu-appear-done animation-appear-sub-menu-enter-done" >
                <Link to={`/categories/37`} className={props.active ? "groups__category-title groups__category-title_selected" :"groups__category-title"} onClick={handleClick}>
                    <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                        <use href={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                    </svg>{props.ListName} <svg className="icon v2-icon v2-icon-heart-solid groups__category-favorite-btn">
                        <use href="#v2-icon-heart-solid" xlinkHref="#v2-icon-heart-solid" />
                    </svg>
                </Link>
                <ul className="groups__category-items">
                    {props.active && SocialMediaPostsTitles.map((item,index) => (
                        <SubList key={index} subTitle={item.name} active={activeSubItem === item.name} onSubItemClick={handleSubItemClick} id={item.id}/>
                    ))}
                </ul>
            </li>
        )
    }
    else if(props.groupTitle === "Print" && props.ListName === "Business Cards"){
        return(
            <li className="groups__category animation-appear-sub-menu-appear-done animation-appear-sub-menu-enter-done" >
                <Link to={`/categories/43`} className={props.active ? "groups__category-title groups__category-title_selected" :"groups__category-title"} onClick={handleClick}>
                    <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                        <use href={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                    </svg>{props.ListName} <svg className="icon v2-icon v2-icon-heart-solid groups__category-favorite-btn">
                        <use href="#v2-icon-heart-solid" xlinkHref="#v2-icon-heart-solid" />
                    </svg>
                </Link>
                <ul className="groups__category-items">
                    {props.active && BusinessCardsTitles.map((item,index) => (
                        <SubList key={index} subTitle={item.name} active={activeSubItem === item.name} onSubItemClick={handleSubItemClick} id={item.id}/>
                    ))}
                </ul>
            </li>
        )
    }
    else if(props.groupTitle === "Print" && props.ListName === "Postcards"){
        return(
            <li className="groups__category animation-appear-sub-menu-appear-done animation-appear-sub-menu-enter-done" >
                <Link to={`/categories/46`} className={props.active ? "groups__category-title groups__category-title_selected" :"groups__category-title"} onClick={handleClick}>
                    <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                        <use href={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                    </svg>{props.ListName} <svg className="icon v2-icon v2-icon-heart-solid groups__category-favorite-btn">
                        <use href="#v2-icon-heart-solid" xlinkHref="#v2-icon-heart-solid" />
                    </svg>
                </Link>
                <ul className="groups__category-items">
                    {props.active && PostcardsTitles.map((item,index) => (
                        <SubList key={index} subTitle={item.name} active={activeSubItem === item.name} onSubItemClick={handleSubItemClick} id={item.id}/>
                    ))}
                </ul>
            </li>
        )
    }
    else if(props.groupTitle === "Print" && props.ListName === "Property Flyers"){
        return(
            <li className="groups__category animation-appear-sub-menu-appear-done animation-appear-sub-menu-enter-done" >
                <Link to={`/categories/49`} className={props.active ? "groups__category-title groups__category-title_selected" :"groups__category-title"} onClick={handleClick}>
                    <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                        <use href={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                    </svg>{props.ListName} <svg className="icon v2-icon v2-icon-heart-solid groups__category-favorite-btn">
                        <use href="#v2-icon-heart-solid" xlinkHref="#v2-icon-heart-solid" />
                    </svg>
                </Link>
                <ul className="groups__category-items">
                    {props.active && PropertyFlyersTitles.map((item,index) => (
                        <SubList key={index} subTitle={item.name} active={activeSubItem === item.name} onSubItemClick={handleSubItemClick} id={item.id}/>
                    ))}
                </ul>
            </li>
        )
    }
    else{
        return(
            <li className="groups__category animation-appear-sub-menu-appear-done animation-appear-sub-menu-enter-done" >
                <Link to={`/categories/${props.id}`} className={props.active ? "groups__category-title groups__category-title_selected" :"groups__category-title"} onClick={handleClick}>
                    <svg className={props.active ? "icon v2-icon v2-icon-folder-open" : "icon v2-icon v2-icon-folder"}>
                        <use href={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} xlinkHref={props.active ? "#v2-icon-folder-open" : "#v2-icon-folder"} />
                    </svg>{props.ListName} <svg className="icon v2-icon v2-icon-heart-solid groups__category-favorite-btn">
                        <use href="#v2-icon-heart-solid" xlinkHref="#v2-icon-heart-solid" />
                    </svg>
                </Link>
                <ul className="groups__category-items">
                </ul>
            </li>
        )
    }
}

export default SideList;