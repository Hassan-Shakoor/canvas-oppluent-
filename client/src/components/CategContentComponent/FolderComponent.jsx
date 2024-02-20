import Dropdown from 'rc-dropdown';
import React, { useEffect, useState } from 'react';
import MoreDropDown from '../Dropdown/MoreDropdown';
import { selectUID } from '../../store/app/User/userPreference';
import { useSelector } from 'react-redux';
import { getLocalStorage } from '../../services/localStorage';
import { LOCAL_STORAGE } from '../../shared/constant';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import InputModal from '../Modal/InputModal';
import { renameFolder } from '../../services/firebase/renameFolder';

const FolderComponent = ({ folderTitle, folderId, itemCount, templates, gridColumn }) => {

    const uid = useSelector(selectUID)

    const navigate = useNavigate()

    const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

    const [folderName, setFolderName] = useState('')
    const [showInputModal, setShowInputModal] = useState(false)

    const handleOpenFolder = async () => {
        try {
            // await updateIsMyDesign(userData?.uid, props.item.id, !props.item.isMyDesign);
            navigate(`/folders/${folderId}`)

        } catch (error) {
            console.error('Error updating design:', error);
            toast.error('Error updating design', { position: toast.POSITION.TOP_RIGHT });
        }
    }

    // const downloadCanvasAsImage = () => {
    //     const jsonData = JSON.parse(props.item.fabricData[0]);
    //     const canvas = new fabric.Canvas('canvas');

    //     // Load the parsed data into the canvas
    //     console.log('first')
    //     canvas.loadFromJSON(jsonData, () => {
    //         // Once the data is loaded, render the canvas
    //         canvas.renderAll();

    //         setTimeout(() => {

    //             // Listen for the 'renderAll' event to ensure rendering is complete
    //             // Download the canvas as an image
    //             const dataURL = canvas.toDataURL({
    //                 format: 'png', // You can change the format (png, jpeg, etc.)
    //                 quality: 1.0,   // You can adjust the quality
    //             });
    //             // Cleanup: Remove all objects from the canvas
    //             canvas.clear();

    //             // Dispose of the canvas
    //             canvas.dispose();

    //             // Generate the desired filename (you can customize this)
    //             const fileName = `${props.item.cardTitle}.png`;

    //             // Create a link and trigger the download
    //             const link = document.createElement('a');
    //             link.href = dataURL;
    //             link.download = fileName;

    //             document.body.appendChild(link);
    //             link.click();
    //             document.body.removeChild(link);
    //         }, 3000);

    //     });

    // };

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
                    // await duplicateTemplate(uid, props.item.id)
                    toast.success("File Duplicated Successfully.")
                } catch (error) {
                    console.error("Error: ", error)
                }
            }
        },
        {
            key: "move-to-folder",
            iconClass: "fa-solid fa-star",
            title: "Move to Folder",
            function: () => handleOpenFolder
        },
        {
            key: "delete",
            iconClass: "fa-regular fa-trash-can",
            title: "Delete",
            function: async () => {
                try {
                    // await deleteTemplate(uid, props.item.id)
                    toast.success("File Deleted Successfully.")
                } catch (error) {
                    console.error("Error: ", error)
                }
            }
        },
    ];

    useEffect(() => {
        setFolderName(folderTitle);

    }, [])


    return (
        <>

            {showInputModal && (
                <InputModal
                    title="Rename Folder"
                    body={
                        <div className="password-input">
                            <label className="input">
                                <span className="input__label">Folder Name</span>
                                <input
                                    placeholder="Enter Folder Name"
                                    type="text"
                                    className="simple-input"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
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
                        const response = await renameFolder(uid, folderId, folderName);
                        if (response) {
                            setShowInputModal(false);
                            toast.success("Folder Name Updated Successfully.")
                        }
                    }}
                />)}

            <div className="folder" style={{ width: gridColumn === 2 ? "360px" : "240px" }}>
                <div className="folder__preview-container">
                    <div className="folder__preview" style={{ height: gridColumn === 2 ? "360px" : "240px" }}>
                        {templates && templates?.length > 0 ?
                            templates?.slice(0, 4).map((template, index) => (
                                <div className="folder__preview-box">
                                    <img src={template?.storage_url?.length ? template?.storage_url[0] : ""} alt="" style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%'
                                    }} />
                                </div>
                            )) : <></>}
                        <button
                            type="button"
                            className="btn btn_no-min-width template__edit-btn"
                            onClick={() => handleOpenFolder()}
                        >
                            <span className="btn__text" style={{ fontFamily: 'Montserrat' }}>Open</span>
                        </button>
                        <div className="folder__preview-info-icon">
                            <i className="icon icon-dashboard-folder-open"></i>
                        </div>
                        <div className="design__menu folder__menu_top-left">
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
                </div>
                <div className="folder__panel">
                    <div className="folder__panel-title" title={folderTitle}>{folderTitle}</div>
                    <div className="folder__panel-info" title={`${itemCount} items`}>{itemCount} items</div>
                </div>
            </div >
        </>
    );
};

export default FolderComponent;
