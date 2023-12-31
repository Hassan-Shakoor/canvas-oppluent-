import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "rc-dropdown";
// import components
import EditPopUp from "./EditPopUp";
import MoreDropDown from "../Dropdown/MoreDropdown";
import { BASE_URL } from "../../shared/constant";

function Template(props) {
  const [isCreateDesignOpen, setCreateDesginOpen] = useState(null);

  const dropdownMenu = [
    { key : "download" , title: "Download", link: `${props.item.imageUrl}` },
    {
      key : "copy",
      title: "Copy Website Link",
      link: `/share/${props.userId}/${props.categoryId}/${props.item.id}`,
    },
    { 
      key : "open",
      title: "Open in new Tab", 
      link: `/share/${props.userId}/${props.categoryId}/${props.item.id}` 
    },
  ];

  function handleCreateDesign(id) {
    setCreateDesginOpen(id);
  }

  return (
    // Change the size of templete depending upon grid column state
    <div
      className="template"
      style={{ width: props.gridColumn === 3 ? "380px" : "280px" }}
    >
      <div className="template__preview-wrapper">
        <div className="template__preview">
          <img
            alt="Email Signature"
            className="template__preview-image"
            src={props.item.imageUrl}
          />
          <button
            type="button"
            className="btn btn_no-min-width template__edit-btn"
            onClick={() => handleCreateDesign(props.item.id)}
          >
            <span className="btn__text">Create Design</span>
          </button>
          {isCreateDesignOpen && (
            <EditPopUp
              item={props.item}
              handleCreateDesign={handleCreateDesign}
            />
          )}
        </div>
        <div className="template__menu">
          <div className="template__menu-btn-set">
            <button
              type="button"
              className="btn btn_black btn_no-text template__menu-btn"
              onClick={() => props.updateFavorite(props.item.id)}
            >
              <span className="btn__text">
                {props.item.favorite ? (
                  <FontAwesomeIcon
                    icon="fa-solid fa-heart"
                    style={{ color: "#FF6661" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="fa-regular fa-heart"
                    style={{ color: "#7a7a7a" }}
                  />
                )}
              </span>
            </button>
          </div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <MoreDropDown
                dropdown={dropdownMenu}
              />
            }
          >
            <button
              type="button"
              className="btn btn_black btn_no-text template__menu-dropdown"
            >
              <svg className="icon v2-icon v2-icon-ellipsis-h">
                <use
                  href="#v2-icon-ellipsis-h"
                  xlinkHref="#v2-icon-ellipsis-h"
                />
              </svg>
              <span className="btn__text" />
            </button>
          </Dropdown>
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
  );
}

export default Template;
