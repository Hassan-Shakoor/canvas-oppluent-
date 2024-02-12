import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "rc-dropdown";
// import components
import EditPopUp from "./EditPopUp";
import MoreDropDown from "../Dropdown/MoreDropdown";
import { BASE_URL, LOCAL_STORAGE } from "../../shared/constant";
import { toast } from "react-toastify";
import { getLocalStorage } from "../../services/localStorage";
import { updateIsMyDesign } from "../../services/firebase/updateIsMyDesign";

function DesignTemplate(props) {
    const [isCreateDesignOpen, setCreateDesginOpen] = useState(null);

    const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

    const handleAddMyDesign = async () => {
        try {
            await updateIsMyDesign(userData?.uid, props.item.id, !props.item.isMyDesign);
            toast.success('Successfully Removed From My Design.', { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            console.error('Error updating design:', error);
            toast.error('Error updating design', { position: toast.POSITION.TOP_RIGHT });
        }
    }

    const dropdownMenu = [
        {
            key: "rename",
            iconClass: "fa-regular fa-pen-to-square",
            title: "Rename",
            link: `/share/${props.userId}/${props.categoryId}/${props.item.id}`
        },
        {
            key: "duplicate",
            iconClass: "fa-regular fa-clone",
            title: "Duplicate",
            link: `/share/${props.userId}/${props.categoryId}/${props.item.id}`
        },
        {
            key: "edit",
            iconClass: "fa-solid fa-pen",
            title: "Edit",
            link: `/share/${props.userId}/${props.categoryId}/${props.item.id}`
        },
        {
            key: "share",
            iconClass: "fa-solid fa-share-nodes",
            title: "Share",
            link: `/share/${props.userId}/${props.categoryId}/${props.item.id}`
        },
        {
            key: "download",
            iconClass: "fa-solid fa-download",
            title: "Download",
            link: `${props.item.storage_url[0]}`
        },
        {
            key: "copy",
            iconClass: "fa-solid fa-copy",
            title: "Copy Link",
            link: `/share/${props.userId}/${props.categoryId}/${props.item.id}`,
        },
        {
            key: "add-to-my-design",
            iconClass: "fa-solid fa-star",
            title: props.item.isMyDesign ? "Remove from My Designs" : "Add to My Designs",
            function: handleAddMyDesign
        },
        {
            key: "archive",
            iconClass: "fa-regular fa-trash-can",
            title: "Archive",
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
            // style={{ width: props.gridColumn === 3 ? "380px" : "280px" }}
        >
            <div className="template__preview-wrapper">
                <div className="template__preview">
                    <img
                        alt="Email Signature"
                        className="template__preview-image"
                        src={props.item.storage_url[0]}
                    />
                    <button
                        type="button"
                        className="btn btn_no-min-width template__edit-btn"
                        onClick={() => handleCreateDesign(props.item.id)}
                    >
                        <span className="btn__text" style={{ fontFamily: 'Montserrat' }}>Edit</span>
                    </button>
                    {isCreateDesignOpen && (
                        <EditPopUp
                            item={props.item}
                            handleCreateDesign={handleCreateDesign}
                        />
                    )}
                </div>

                <div className="design__menu design__menu_top-left">
                    <label className="checkbox folder__menu-checkbox" data-test="select-for-batch-action">
                        <input className="checkbox__input" type="checkbox" />
                        <div className="checkbox__box">
                            <div className="checkbox__tick">
                                <FontAwesomeIcon icon="fa-solid fa-check" color="#fff" />
                            </div>
                        </div>
                    </label>
                </div>

                <div className="template__menu">
                    <div className="template__menu-btn-set">
                        {/* <button
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
            </button> */}
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

export default DesignTemplate;
