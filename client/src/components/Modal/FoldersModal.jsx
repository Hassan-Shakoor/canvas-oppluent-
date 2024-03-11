import React, { useEffect, useState } from 'react';
import { getFolders } from '../../services/firebase/FolderServices/getFolders';
import { useSelector } from 'react-redux';
import { selectUID } from '../../store/app/User/userPreference';
import { moveToFolder } from '../../services/firebase/TemplateServices/moveToFolder';
import { toast } from 'react-toastify';
import { moveToDashboard } from '../../services/firebase/TemplateServices/moveToDashboard';
import { moveFromFolderToFolder } from '../../services/firebase/TemplateServices/moveFromFolderToFolder';
import { moveFolderToFolder } from '../../services/firebase/FolderServices/moveFolderToFolder';
import { moveFoldertoDashboard } from '../../services/firebase/FolderServices/moveFoldertoDashboard';

const FoldersModal = ({ closeMoveFolderModal, templateId, items, thingToMove }) => {

    const uid = useSelector(selectUID);
    const isFoldersKeywordPresent = window.location.href.includes('folders');

    const [folders, setFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState('');

    const moveTemplateToFolder = async () => {
        if (!selectedFolderId) {
            alert('Please Select a Folder to Move.')
            return;
        }

        if (items && items.length > 0) {
            await handleMoveItems();
            return;
        }

        if (thingToMove === 'Folder') {
            if (selectedFolderId === 'Dashboard') {
                await moveFoldertoDashboard(uid, templateId)
            } else {
                await moveFolderToFolder(uid, templateId, selectedFolderId)
            }
        }
        else {
            if (selectedFolderId === 'Dashboard') {
                await moveToDashboard(uid, templateId)
            } else {
                if (isFoldersKeywordPresent) {
                    await moveFromFolderToFolder(uid, templateId, selectedFolderId)
                }
                else {
                    await moveToFolder(uid, templateId, selectedFolderId)
                }
            }
            toast.success("Template Moved Successfully")
        }
        closeMoveFolderModal();
    }

    const handleMoveItems = async () => {
        if (items?.length > 0) {
            items.map(async (item, index) => {

                if (item.type === 'Folder') {
                    if (selectedFolderId === 'Dashboard') {
                        await moveFoldertoDashboard(uid, item.id)
                    } else {
                        // if (isFoldersKeywordPresent) {

                        // } else {
                        await moveFolderToFolder(uid, item.id, selectedFolderId)
                        // }
                    }
                }
                else {
                    if (selectedFolderId === 'Dashboard') {
                        await moveToDashboard(uid, item.id)
                    } else {
                        if (isFoldersKeywordPresent) {
                            await moveFromFolderToFolder(uid, item.id, selectedFolderId)
                        }
                        else {
                            await moveToFolder(uid, item.id, selectedFolderId)
                        }
                    }
                }
            })
            toast.success("Items Moved Successfully")
        }
        closeMoveFolderModal();
    }

    const handleFolderClick = (folderId) => {
        if (selectedFolderId === folderId) {
            // If the clicked folder is already selected, unselect it
            setSelectedFolderId('');
        } else {
            // Otherwise, select the clicked folder
            setSelectedFolderId(folderId);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching folders...');
                const fetchedFolders = await getFolders(uid);
                setFolders(fetchedFolders);

                const getFoldersinFolder = async (foldersArray) => {
                    // Use Promise.all to wait for all asynchronous calls to complete
                    await Promise.all(foldersArray.map(async (folder) => {
                        if (folder.folders) {
                            // Use setFolders function to update the state correctly
                            setFolders((prevFolders) => [...prevFolders, ...folder.folders]);
                            await getFoldersinFolder(folder.folders);
                        }
                    }));
                }

                await getFoldersinFolder(fetchedFolders);

                console.log('Folders fetched successfully:', fetchedFolders);
            } catch (error) {
                console.error('Error fetching folders:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="ReactModalPortal modal">
            <div className="ReactModal__Overlay ReactModal__Overlay--after-open">
                <div className="ReactModal__Content ReactModal__Content--after-open ReactModal__Content_md" tabIndex="-1" role="dialog" aria-modal="true">
                    <div className="modal-visible" tabIndex="-1">
                        <div className="modal__content">
                            <div className="modal__header">
                                <div className="modal__title">Move to Folder</div>
                                <button type="button" className="btn btn_icon modal__close btn_close-modal-icon" onClick={() => closeMoveFolderModal()} data-test="close-button">
                                    <svg className="icon v1-icon v1-icon-cross-light">
                                        <use href="#v1-icon-cross-light" xlinkHref="#v1-icon-cross-light"></use>
                                    </svg>
                                    <span className="btn__text"></span>
                                </button>
                            </div>
                            <div className="modal__body">
                                <div className="mb-3">
                                    <ul role="tree" aria-multiselectable="false" className="MuiTreeView-root move-to-folder-modal__tree css-12mehxg" tabIndex="0" id="mui-2">
                                        {isFoldersKeywordPresent && (
                                            <li className={`MuiTreeItem-root css-105mfs8 ${selectedFolderId === 'Dashboard' ? 'selected-folder' : ''}`} role="treeitem" tabIndex="-1" id={`mui-2-0`} onClick={() => handleFolderClick('Dashboard')}>
                                                <ul className="move-to-folder-modal__item-list">
                                                    <li className="move-to-folder-modal__tree-item">
                                                        <div className="move-to-folder-modal__tree-item-icons">
                                                            <svg className="icon v2-icon v2-icon-folder move-to-folder-modal__folder-icon">
                                                                <use href="#v2-icon-folder" xlinkHref="#v2-icon-folder"></use>
                                                            </svg>
                                                        </div>
                                                        <div className="move-to-folder-modal__tree-item-label"> Dashboard</div>
                                                        <div className="move-to-folder-modal__tree-item-icons">
                                                            <div className="move-to-folder-modal__expansion-icon"></div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        )}
                                        {folders && folders?.length ?
                                            folders.map((folder, index) => (
                                                <li className={`MuiTreeItem-root css-105mfs8 ${selectedFolderId === folder.id ? 'selected-folder' : ''}`} role="treeitem" tabIndex="-1" id={`mui-2-${index + 1}`} onClick={() => handleFolderClick(folder.id)}>
                                                    <ul className="move-to-folder-modal__item-list">
                                                        <li className="move-to-folder-modal__tree-item">
                                                            <div className="move-to-folder-modal__tree-item-icons">
                                                                <svg className="icon v2-icon v2-icon-folder move-to-folder-modal__folder-icon">
                                                                    <use href="#v2-icon-folder" xlinkHref="#v2-icon-folder"></use>
                                                                </svg>
                                                            </div>
                                                            <div className="move-to-folder-modal__tree-item-label">{folder?.name}</div>
                                                            <div className="move-to-folder-modal__tree-item-icons">
                                                                <div className="move-to-folder-modal__expansion-icon"></div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            ))
                                            : <div>No Folders Available</div>
                                        }

                                        {/* Add more tree items as needed */}
                                    </ul>
                                </div>
                                <div className="button-set button-set_right">
                                    <button type="button" className="btn btn_gray me-2" onClick={() => closeMoveFolderModal()}>
                                        <span className="btn__text">Cancel</span>
                                    </button>
                                    <button className={`btn ${selectedFolderId ? '' : 'btn_disabled'}`}
                                        onClick={() => moveTemplateToFolder()}
                                        disabled={selectedFolderId?.length <= 0}>
                                        <span className="btn__text">Move to Folder</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoldersModal;
