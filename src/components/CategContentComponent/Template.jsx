import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditPopUp from "./EditPopUp";

function MoreDropDown(){
    return(
        <div
            className="rc-dropdown rc-dropdown-placement-bottomLeft"
            style={{
            inset: "100% 3% auto auto",
            boxSizing: "border-box",
            minWidth: "25.3335px"
            }}
        >
            <ul
                className="rc-menu rc-menu-root rc-menu-vertical"
                role="menu"
                tabIndex="0"
                data-menu-list="true"
            >
                <li
                    className="rc-menu-item"
                    role="menuitem"
                    tabIndex="-1"
                    data-menu-id="rc-menu-uuid-15312-1-0"
                >
                    <button type="button" className="btn btn_menu-item">
                        <span className="btn__text">Share</span>
                    </button>
                </li>
                <li
                    className="rc-menu-item"
                    role="menuitem"
                    tabIndex="-1"
                    data-menu-id="rc-menu-uuid-15312-1-1"
                >
                    <button type="button" className="btn btn_menu-item">
                        <span className="btn__text">Share link</span>
                    </button>
                </li>
                <li
                    className="rc-menu-item"
                    role="menuitem"
                    tabIndex="-1"
                    data-menu-id="rc-menu-uuid-15312-1-2"
                >
                    <button type="button" className="btn btn_menu-item">
                        <span className="btn__text">Edit Master Template</span>
                    </button>
                </li>
            </ul>
            <div aria-hidden="true" style={{ display: "none" }}></div>
        </div>
    )
}

function Template(props){
    const [isCreateDesignOpen,setCreateDesginOpen] = useState(null)
    const [isMoreDropDown, setMoreDropDown] = useState(false);
  
    function dropdownHandler(){
      setMoreDropDown(!isMoreDropDown)
    }

    function handleCreateDesign(id){
      setCreateDesginOpen(id)
    }
  
    return(
      // Change the size of templete depending upon grid column state
      <div className="template" style={{ width: props.gridColumn === 3 ? "380px" : "280px" }}>
        <div className="template__preview-wrapper">
          <div className="template__preview">
            <img
              alt="Email Signature"
              className="template__preview-image"
              src= {props.item.imageUrl}
            />
            <button type="button" className="btn btn_no-min-width template__edit-btn" onClick={() => handleCreateDesign(props.item.id)}>
              <span className="btn__text">Create Design</span>
            </button>
            {isCreateDesignOpen && <EditPopUp item={props.item} handleCreateDesign={handleCreateDesign}/>}
          </div>
          <div className="template__menu">
            <div className="template__menu-btn-set">
              <button
                type="button"
                className="btn btn_black btn_no-text template__menu-btn"
              >
                <span className="btn__text">
                  <FontAwesomeIcon icon="fa-regular fa-heart" style={{color: "#7a7a7a",}} />
                </span>
              </button>
            </div>
            <button
              type="button"
              className="btn btn_black btn_no-text template__menu-dropdown"
              data-test="design-menu-button"
              onClick={dropdownHandler}
            >
              <svg className="icon v2-icon v2-icon-ellipsis-h">
                <use href="#v2-icon-ellipsis-h" xlinkHref="#v2-icon-ellipsis-h" />
              </svg>
              <span className="btn__text" />
              {/* Dropdown */}
              {isMoreDropDown && <MoreDropDown/>}
            </button>
          </div>
        </div>
        <div className="template__panel">
          <div
            className="template__title template__title_editable"
            title="Email Signature"
          >
            {props.item.cardTitle}
          </div>
        </div>
      </div>
    )
  }

  export default Template;