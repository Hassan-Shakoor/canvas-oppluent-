import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "rc-dropdown";
import { useTranslation } from 'react-i18next';

// import components
import EditPopUp from "./EditPopUp";
import MoreDropDown from "../Dropdown/MoreDropdown";
import { BASE_URL, LOCAL_STORAGE } from "../../shared/constant";
import { toast } from "react-toastify";
import { getLocalStorage } from "../../services/localStorage";
import { updateIsMyDesign } from "../../services/firebase/TemplateServices/updateIsMyDesign";
import SpinnerContainer from "../Loader/SpinnerContainer";
import InputModal from "../Modal/InputModal";
import { selectUID } from "../../store/app/User/userPreference";
import { useSelector } from "react-redux";
import { renameTemplate } from "../../services/firebase/TemplateServices/renameTemplate";
import { duplicateTemplate } from "../../services/firebase/TemplateServices/duplicateTemplate";
import { useNavigate } from "react-router-dom";
import { fabric } from 'fabric';
import { deleteTemplate } from "../../services/firebase/TemplateServices/deleteTemplate";
import { moveToFolder } from "../../services/firebase/TemplateServices/moveToFolder";
import FoldersModal from "../Modal/FoldersModal";
import { addDesignToCategory } from "../../services/firebase/TemplateServices/addDesignToCategory";
import Select from "react-select";
import { getDatabase, onValue, ref } from 'firebase/database'

import { selectProfile } from "../../store/app/AccountInformation/profile";

function DesignTemplate(props) {

    const { t } = useTranslation()

    const userProfile = useSelector(selectProfile);

    const navigate = useNavigate();
    const [isCreateDesignOpen, setCreateDesignOpen] = useState(null);
    const [loading, setLoading] = useState(true)
    const [showInputModal, setShowInputModal] = useState(false)
    const [showSelectModal, setShowSelectModal] = useState(false)
    const [designCategories, setDesignCategories] = useState(['Business Category', 'Instagram Stories', 'Facebook Banner']);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [fileName, setFileName] = useState('')

    const uid = useSelector(selectUID)

    const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

    const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false)

    const closeMoveFolderModal = () => {
        setOpenMoveFolderModal(false);
    }

    // const handleAddDesignToCategory = async () => {
    //     try {
    //         await addDesignToCategory(userData?.uid, props.item, !props.item.isMyDesign);
    //         toast.success('Successfully Removed From My Design.', { position: toast.POSITION.TOP_RIGHT });
    //     } catch (error) {
    //         console.error('Error updating design:', error);
    //         toast.error('Error updating design', { position: toast.POSITION.TOP_RIGHT });
    //     }
    // }


    const downloadCanvasAsImage = () => {
        // Create a new XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Set the responseType to 'blob'
        xhr.responseType = 'blob';

        // Open the request with the provided URL
        xhr.open('GET', props.item.storage_url[0]);

        toast.success("Downloading Started...")

        // Set up the onload event to handle the downloaded image
        xhr.onload = () => {
            // Create a link element
            const link = document.createElement('a');

            // Create a Blob from the response
            const blob = new Blob([xhr.response], { type: 'image/png' });

            // Create a URL for the Blob and set it as the link's href
            link.href = window.URL.createObjectURL(blob);

            // Set the download attribute and filename
            link.download = props.item.cardTitle;

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        };

        // Send the request
        xhr.send();
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
        userProfile.isAdmin && {
            key: "add-to-category",
            iconClass: "fa-solid fa-star",
            title: "Add Design to Category",
            function: () => setShowSelectModal(true)
        },
        {
            key: "move-to-folder",
            iconClass: "fa-solid fa-arrow-right-arrow-left",
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
    ].filter(Boolean);;

    function handleCreateDesign(id) {
        setCreateDesignOpen(id);
    }

    const handleCheckboxChange = () => {
        const templateIndex = props.selectedItems.findIndex(template => template.id === props.item.id);

        if (typeof templateIndex !== 'undefined' && (templateIndex !== -1 || templateIndex === 0)) {
            // If the item ID is already in the array, remove it
            props.setSelectedItems(props.selectedItems.filter(template => template.id !== props.item.id));
        } else {
            // If the item ID is not in the array, add it
            props.setSelectedItems([
                ...props.selectedItems,
                {
                    id: props.item.id,
                    type: 'template'
                }]);
        }
    };

    const fetchDataFromDatabase = () => {
        const database = getDatabase();
        const userJsonRef = ref(database, `${uid}/userJson`);

        onValue(userJsonRef, (snapshot) => {
            try {
                const updatedCategories = snapshot.val();

                if (updatedCategories) {
                    console.log(updatedCategories);

                    // Assuming subTitle is an array of objects with 'name' and 'id' properties
                    const transformedArray = updatedCategories
                        .filter(category => category.title !== 'Favorites')
                        .reduce((accumulator, category) => {
                            const categoryItems = category.subTitle.map(item => ({ label: item.name, value: item.id }));
                            return accumulator.concat(categoryItems);
                        }, []);

                    console.log(transformedArray);
                    setDesignCategories(transformedArray);
                }
            } catch (error) {
                console.error('Error fetching data from the database:', error);
                // Handle the error as needed
            }
        });
    };

    useEffect(() => {
        fetchDataFromDatabase()

        console.log(dropdownMenu)

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
            {showSelectModal && (
                <InputModal
                    title="Add to Category"
                    body={
                        <div className="password-input">
                            <label className="input">
                                <span className="input__label">Select Category</span>
                                <Select
                                    options={designCategories}
                                    styles={customStyles}
                                    placeholder='Select category'
                                    onChange={(option) => setSelectedCategory(option)} />
                            </label>
                        </div>
                    }
                    secondayBtnTxt={"Cancel"}
                    primaryBtnTxt={"Submit"}
                    onClose={() => setShowSelectModal(false)}
                    handleSecodnaryBtn={() => setShowSelectModal(false)}
                    handlePrimaryBtn={async (e) => {
                        e.preventDefault();
                        const response = await addDesignToCategory(uid, props.item, selectedCategory);
                        if (response) {
                            setShowSelectModal(false);
                            toast.success("File Name Updated Successfully.")
                        } else {
                            toast.error('Error Moving to Category..')
                        }
                    }}
                />)}

            {openMoveFolderModal &&
                <FoldersModal
                    closeMoveFolderModal={closeMoveFolderModal}
                    templateId={props.item.id}
                    renderTriggerFromDashboard={props.renderTriggerFromDashboard}
                    setRenderTriggerFromDashboard={props.setRenderTriggerFromDashboard}
                />}


            <div
                className={`template ${props.selectedItems?.findIndex(template => template.id === props.item.id) !== -1 ? 'design_selected' : ''}`}
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
                            onClick={() => navigate(`/edit/${props.item.id}`)}
                        // handleCreateDesign(props.item.id)}
                        >
                            <span className="btn__text" style={{ fontFamily: 'Montserrat' }}>{t('edit')}</span>
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
                            <input className="checkbox__input" type="checkbox"
                                checked={(props.selectedItems.findIndex(template => template.id === props.item.id) !== -1)}
                                onChange={() => handleCheckboxChange(props.item.id)} />

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
            </div >
        </>
    );
}

const customStyles = {
    container: (provided) => ({
        ...provided,
        minWidth: "50px",
        position: "relative",
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "var(--secondary-bg-color)",
        border: "1px solid var(--input-border-color)",
        borderRadius: "4px",
        padding: "0px 0px",
        cursor: "pointer",
        minHeight: "26px",
    }),
    valueContainer: (provided) => ({
        ...provided,
        fontSize: "14px",
        fontWeight: "bold",
        minHeight: "20px",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "var(--font-color)",
    }),
    input: (provided) => ({
        ...provided,
        color: "var(--dark-color)",
        width: '75px',
        height: '26px'
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: "none",
    }),
    menu: (provided) => ({
        ...provided,
        minWidth: "220px",
        backgroundColor: "var(--secondary-bg-color)",
        zIndex: "11",
    }),
    menuList: (provided) => ({
        ...provided,
        paddingBottom: "4px",
        paddingTop: "4px",
        maxHeight: "60vh",
        overflowX: "hidden",
        overflowY: "auto",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: (state.isFocused || state.isSelected) ? 'var(--primary-color-light)' : "var(--secondary-bg-color)",
        letterSpacing: "1px",
        cursor: "pointer",
        padding: "13px",
    }),
};


export default DesignTemplate;
