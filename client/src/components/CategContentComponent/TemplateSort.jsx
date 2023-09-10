import React, { useState } from "react";

// ** Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";

const SortJSON = [{sort:0,"title":"Default"},{sort:1,"title":"Created"},{sort:2,"title":"Modified"},{sort:3,"title":"Name A - Z"},{sort:4,"title":"Name Z - A"}]

// item-selected-dropdown
function SortDropDown(props){
    return(
        <div className="sort-dropdown-container">
            {SortJSON.map((item,index) => (
                <li key={index} className="sort-dropdown-list" role="menuitem" tabIndex="-1" data-menu-id={item.sort}>
                    <button type="button" className="sort-dropdown-button" onClick={() => props.handleSortTemplate(item.title)}>
                        <span className="sort-dropdown-title">{item.title}</span>
                    </button>
                </li>
            ))}
        </div>
    )
}

function GridDropDown(props){
    return(
        <div className="grid-dropdown-container" style={{paddingTop:'10px'}}>
            <li className="grid-dropdown-list" style={{padding:'5px 0px'}} data-value={3} onClick={() => {props.handleColumn(3)}}>
                <Icon icon='tdesign:view-column' width='1.5rem' height='1.5rem'/>
            </li>
            <li className="grid-dropdown-list" style={{padding:'5px 0px'}} data-value={4} onClick={() => {props.handleColumn(4)}}>
                <Icon icon='teenyicons:view-column-outline' width='1.5rem' height='1.5rem'/>
            </li>
        </div>
    )
}

function TemplateSort(props){
    const [isSortDropDownOpen , setSortDropDownOpen] = useState(false)
    const [isGridDropDownOpen, setGridDropDownOpen] = useState(false)
    
    function sortDropDownHandler(){
        setSortDropDownOpen(!isSortDropDownOpen)
    }

    function gridColumnHander(){
        setGridDropDownOpen(!isGridDropDownOpen)
    }
    console.log(props.gridColumn);

    return(
        <div className="dashboard-header__top-panel">
            <div className="dashboard-header__left-panel"></div>
            <div className="dashboard-header__right-panel">
                {/* Grid Column DropDown */}
                <div className="select-container select-container_with-icons me-2 select-container_has-value extra-right-padding">
                    <div className="select-container css-2b097c-container" onClick={gridColumnHander}>
                        <div className="select__control css-yk16xz-control background-template-sort" style={{padding:'5px'}}>
                            <div className="select__value-container select__value-container--has-value css-1tnzi8j">
                                <div className="select__single-value css-ah2eo0-singleValue" style={{textAlign:'center'}}>
                                {props.gridColumn === 3 ? <Icon icon='tdesign:view-column' width='1.5rem' height='1.5rem'/> : <Icon icon='teenyicons:view-column-outline' width='1.5rem' height='1.5rem'/>}
                                </div>
                            </div>
                        </div>
                    </div>
                {isGridDropDownOpen && <GridDropDown handleColumn = {props.handleColumn}/>}
                </div>
                {/* Sort DropDown */}
                <button
                    onClick={sortDropDownHandler}
                    type="button"
                    className="sort-dropdown-btn background-template-sort">
                    <FontAwesomeIcon icon="fa-solid fa-filter" className="sort-template-icon"/>
                    <span className="sort-button-txt">
                        Sort by
                    </span>
                    <FontAwesomeIcon className="sort-template-icon" icon={isSortDropDownOpen ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}/>
                </button>
                {isSortDropDownOpen && <SortDropDown handleSortTemplate={props.handleSortTemplate}/>}
            </div>
        </div>
    )
}

export default TemplateSort;