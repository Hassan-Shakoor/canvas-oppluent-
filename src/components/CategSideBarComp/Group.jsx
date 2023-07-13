import React, { useState } from "react";
import SideList from "./SideList";

function Group(props){
    // State Which Keep Track which Group is Open and Close
    const [isGroupOpen,setListOpen] = useState(true);
    // Handler for isGroupOpen
    function handleOpenGroup(){
        setListOpen(!isGroupOpen);
    }

    // Handler for activeItems and also send back the name of list which is selected back to CategorySideBar.jsx
    function handleItemClick(item) {
        props.handleSelectedList(item);
        props.placeholder(item);
      }

    var titlesArray = props.subTitle
    console.log(titlesArray);

        return(
            <div className="groups__item">
                <span className={isGroupOpen ? "groups__title groups__title_open" :"groups__title"} onClick={handleOpenGroup}>
                <svg className="icon v2-icon v2-icon-chevron-right">
                    <use href="#v2-icon-chevron-right" xlinkHref="#v2-icon-chevron-right" />
                </svg>{props.titleName} </span>
                <ul>
                {isGroupOpen && props.subTitle.map((item, index) => (
                    <SideList
                        key={index}
                        ListName={item.name}
                        active={props.selectedList === item.name}
                        onItemClick={handleItemClick}
                        groupTitle = {props.titleName}
                        placeholder = {props.placeholder}
                        id = {item.id}
                    />
                    ))}
                </ul>
            </div>
        )
    
}

export default Group;