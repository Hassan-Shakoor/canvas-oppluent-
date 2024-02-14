import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "rc-dropdown";
// import components
import EditPopUp from "./EditPopUp";
import MoreDropDown from "../Dropdown/MoreDropdown";
import { BASE_URL, LOCAL_STORAGE } from "../../shared/constant";
import { updateIsMyDesign } from "../../services/firebase/updateIsMyDesign";
import { getLocalStorage } from "../../services/localStorage";
import { toast } from "react-toastify";
import SpinnerOverlay from "../Loader/SpinnerOverlay";
import SpinnerContainer from "../Loader/SpinnerContainer";

function Template(props) {
  const [isCreateDesignOpen, setCreateDesginOpen] = useState(null);
  const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

  const [loading, setLoading] = useState(true);

  const handleAddMyDesign = async () => {
    try {
      await updateIsMyDesign(userData?.uid, props.item.id, !props.item.isMyDesign);
      toast.success('Added to My Design Successfully', { position: toast.POSITION.TOP_RIGHT });
    } catch (error) {
      console.error('Error updating design:', error);
      toast.error('Error updating design', { position: toast.POSITION.TOP_RIGHT });
    }
  }

  const dropdownMenu = [
    {
      key: "download",
      iconClass: "fa-solid fa-download",
      title: "Download",
      link: `${props.item.storage_url[0]}`
    },
    {
      key: "copy",
      iconClass: "fa-solid fa-link",
      title: "Copy Website Link",
      link: `/share/${props.userId}/${props.categoryId}/${props.item.id}`,
    },
    {
      key: "open",
      iconClass: "fa-solid fa-copy",
      title: "Open in new Tab",
      link: `/share/${props.userId}/${props.categoryId}/${props.item.id}`
    },
    {
      key: "add-to-my-design",
      iconClass: "fa-solid fa-star",
      title: props.item.isMyDesign ? "Remove from My Designs" : "Add to My Designs",
      function: handleAddMyDesign
    },
  ];

  function handleCreateDesign(id) {
    setCreateDesginOpen(id);
  }

  return (
    // Change the size of templete depending upon grid column state
    <div
      className="template"
      style={{ width: props.gridColumn === 2 ? "360px" : "250px" }}
    >
      <div className="template__preview-wrapper">
        <div className="template__preview">
          {/* {!loading ? */}
          <img
            alt="Email Signature"
            className="template__preview-image"
            src={props.item.storage_url[0]}
            style={
              {
                display: loading ? "none" : "block",
                width: "100%",
                animation: "fadeIn 1s",
              }
            } onLoad={(e) => { setLoading(false) }}></img>
          <SpinnerContainer loading={loading} height={'auto'} />
          {/* } */}
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
