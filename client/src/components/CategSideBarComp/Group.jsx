import React, { useState } from "react";
import SideList from "./SideList";

function Group(props){
    // State Which Keep Track which Group is Open and Close
    const [isGroupOpen,setListOpen] = useState(true);
    // Handler for isGroupOpen
    function handleOpenGroup(){
        setListOpen(!isGroupOpen);
    }

    // Handler which send value of which item is selected and it's placeholder back to Category.jsx
    function handleItemSelected(name,id) {
        props.handleSelectedList(id);
        props.handlePlaceholder(name);
      }

        return(
            <div className="groups__item">
            { props.groupTitle === "Favorites" ? 
                <div>
                    <span className="groups__title groups__title_cursor-text">Favorites</span>
                    <ul>
                        {isGroupOpen && props.subTitle.map((item, index) => (
                            <SideList
                                key={index}
                                sideListData = {item}
                                active={props.activeList === item.id}
                                handleItemSelected={handleItemSelected}
                                handlePlaceholder = {props.handlePlaceholder}
                                id = {item.id}
                                isFavorite={props.isFavorite}
                                addToFavorites={props.addToFavorites}
                                removeFromFavorites={props.removeFromFavorites}
                            />
                        ))}
                    </ul>
                </div>
                    :
                <div>
                    <span className={isGroupOpen ? "groups__title groups__title_open" :"groups__title"} onClick={handleOpenGroup}>
                    <svg className="icon v2-icon v2-icon-chevron-right">
                        <use href="#v2-icon-chevron-right" xlinkHref="#v2-icon-chevron-right" />
                    </svg>{props.groupTitle} </span>
                        <ul>
                        {isGroupOpen && props.subTitle.map((item, index) => (
                            <SideList
                                key={index}
                                sideListData = {item}
                                active={props.activeList === item.id}
                                handleItemSelected={handleItemSelected}
                                handlePlaceholder = {props.handlePlaceholder}
                                id = {item.id}
                                isFavorite={props.isFavorite}
                                addToFavorites={props.addToFavorites}
                                removeFromFavorites={props.removeFromFavorites}
                            />
                            ))}
                        </ul>
                </div>
            }
            </div>
        )
    
}

export default Group;