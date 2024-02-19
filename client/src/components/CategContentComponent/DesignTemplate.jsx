import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "rc-dropdown";
// import components
import EditPopUp from "./EditPopUp";
import MoreDropDown from "../Dropdown/MoreDropdown";
import { BASE_URL, LOCAL_STORAGE } from "../../shared/constant";
import { toast } from "react-toastify";
import { getLocalStorage } from "../../services/localStorage";
import { updateIsMyDesign } from "../../services/firebase/updateIsMyDesign";
import SpinnerContainer from "../Loader/SpinnerContainer";
import InputModal from "../Modal/InputModal";
import { selectUID } from "../../store/app/User/userPreference";
import { useSelector } from "react-redux";
import { renameTemplate } from "../../services/firebase/renameTemplate";
import { duplicateTemplate } from "../../services/firebase/duplicateTemplate";
import { useNavigate } from "react-router-dom";
import { fabric } from 'fabric';
import { deleteTemplate } from "../../services/firebase/deleteTemplate";
import { moveToFolder } from "../../services/firebase/moveToFolder";
import FoldersModal from "../Modal/FoldersModal";

function DesignTemplate(props) {

    const navigate = useNavigate();
    const [isCreateDesignOpen, setCreateDesginOpen] = useState(null);
    const [loading, setLoading] = useState(true)
    const [showInputModal, setShowInputModal] = useState(false)

    const [fileName, setFileName] = useState('')

    const uid = useSelector(selectUID)

    const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

    const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false)

    const closeMoveFolderModal = () => {
        setOpenMoveFolderModal(false);
    }

    const handleAddMyDesign = async () => {
        try {
            await updateIsMyDesign(userData?.uid, props.item.id, !props.item.isMyDesign);
            toast.success('Successfully Removed From My Design.', { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            console.error('Error updating design:', error);
            toast.error('Error updating design', { position: toast.POSITION.TOP_RIGHT });
        }
    }

    const downloadCanvasAsImage = () => {
        const jsonData = JSON.parse(props.item.fabricData[0]);
        const canvas = new fabric.Canvas('canvas');

        // Load the parsed data into the canvas
        console.log('first')
        canvas.loadFromJSON(jsonData, () => {
            // Once the data is loaded, render the canvas
            canvas.renderAll();

            setTimeout(() => {

                // Listen for the 'renderAll' event to ensure rendering is complete
                // Download the canvas as an image
                const dataURL = canvas.toDataURL({
                    format: 'png', // You can change the format (png, jpeg, etc.)
                    quality: 1.0,   // You can adjust the quality
                });
                // Cleanup: Remove all objects from the canvas
                canvas.clear();

                // Dispose of the canvas
                canvas.dispose();

                // Generate the desired filename (you can customize this)
                const fileName = `${props.item.cardTitle}.png`;

                // Create a link and trigger the download
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = fileName;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 3000);

        });

    };



    const dropdownMenu = [
        {
            key: "rename",
            iconClass: "fa-regular fa-pen-to-square",
            title: "Rename",
            function: () => { setShowInputModal(true); }
        },
        {
            key: "duplicate",
            iconClass: "fa-regular fa-clone",
            title: "Duplicate",
            function: async () => {
                try {
                    await duplicateTemplate(uid, props.item.id)
                    toast.success("File Duplicated Successfully.")
                } catch (error) {
                    console.error("Error: ", error)
                }
            }
        },
        {
            key: "edit",
            iconClass: "fa-solid fa-pen",
            title: "Edit",
            function: () => { navigate(`/edit/${props.item.id}`) }
        },
        // {
        //     key: "share",
        //     iconClass: "fa-solid fa-share-nodes",
        //     title: "Share",
        //     function: `/share/${props.userId}/${props.categoryId}/${props.item.id}`
        // },
        {
            key: "download",
            iconClass: "fa-solid fa-download",
            title: "Download",
            function: () => downloadCanvasAsImage()
        },
        {
            key: "copy",
            iconClass: "fa-solid fa-copy",
            title: "Copy Link",
            link: `share/${uid}/0/${props.item.id}`,
        },
        {
            key: "add-to-my-design",
            iconClass: "fa-solid fa-star",
            title: props.item.isMyDesign ? "Remove from My Designs" : "Add to My Designs",
            function: handleAddMyDesign
        },
        {
            key: "move-to-folder",
            iconClass: "fa-solid fa-star",
            title: "Move to Folder",
            function: () => {
                setOpenMoveFolderModal(true);
            }
        },
        {
            key: "delete",
            iconClass: "fa-regular fa-trash-can",
            title: "Delete",
            function: async () => {
                try {
                    await deleteTemplate(uid, props.item.id)
                    toast.success("File Deleted Successfully.")
                } catch (error) {
                    console.error("Error: ", error)
                }
            }
        },
    ];

    function handleCreateDesign(id) {
        setCreateDesginOpen(id);
    }

    useEffect(() => {
        setFileName(props.item.cardTitle);
    }, [])

    return (
        // Change the size of templete depending upon grid column state
        <>
            {showInputModal && (
                <InputModal
                    title="Rename"
                    body={
                        <div className="password-input">
                            <label className="input">
                                <span className="input__label">File Name</span>
                                <input
                                    placeholder="Enter File Name"
                                    type="text"
                                    className="simple-input"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                />
                            </label>
                        </div>
                    }
                    secondayBtnTxt={"Cancel"}
                    primaryBtnTxt={"Submit"}
                    onClose={() => setShowInputModal(false)}
                    handleSecodnaryBtn={() => setShowInputModal(false)}
                    handlePrimaryBtn={async (e) => {
                        e.preventDefault();
                        const response = await renameTemplate(uid, props.item.id, fileName);
                        if (response) {
                            setShowInputModal(false);
                            toast.success("File Name Updated Successfully.")
                        }
                    }}
                />)}

            {openMoveFolderModal &&
                <FoldersModal
                    closeMoveFolderModal={closeMoveFolderModal}
                    templateId={props.item.id}
                    />}


            <div
                className="template"
                style={{ width: props.gridColumn === 2 ? "360px" : "240px" }}
            >
                <div className="template__preview-wrapper">
                    <div className="template__preview">
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
                            } onLoad={(e) => { setLoading(false) }} />
                        <SpinnerContainer loading={loading} height={'auto'} />
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
        </>
    );
}

export default DesignTemplate;
