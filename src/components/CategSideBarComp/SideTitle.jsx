import React, { useState } from "react";
import SideList from "./SideList";

function SideTitle(props){
    // State Which Keep Track which List Category is Open and Close
    const [isListOpen,setListOpen] = useState(true);
    // Store the state of which list item is selected inside List Category
    const [activeItem, setActiveItem] = useState(null);

    // Handler for isListOpen
    function handleOpenList(){
        setListOpen(!isListOpen);
    }

    // Handler for activeItems and also send back the name of list which is selected back to CategorySideBar.jsx
    function handleItemClick(item) {
        setActiveItem(item);
        props.tabTitle(item)
      }

    var titles = props.subTitle

        return(
            <div className="groups__item">
                <span className={isListOpen ? "groups__title groups__title_open" :"groups__title"} onClick={handleOpenList}>
                <svg className="icon v2-icon v2-icon-chevron-right">
                    <use href="#v2-icon-chevron-right" xlinkHref="#v2-icon-chevron-right" />
                </svg>{props.titleName} </span>
                <ul>
                {isListOpen && titles.map((title, index) => (
                    <SideList
                        key={index}
                        ListName={title}
                        active={activeItem === title}
                        onItemClick={handleItemClick}
                        listTitle = {props.titleName}
                        placeHolderName = {props.tabTitle}
                    />
                    ))}
                </ul>
            </div>
        )
    
}

export default SideTitle;