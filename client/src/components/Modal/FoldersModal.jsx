import React, { useEffect, useState } from 'react';
import { getFolders } from '../../services/firebase/getFolders';
import { useSelector } from 'react-redux';
import { selectUID } from '../../store/app/User/userPreference';
import { moveToFolder } from '../../services/firebase/moveToFolder';
import { toast } from 'react-toastify';
import { moveToDashboard } from '../../services/firebase/moveToDashboard';

const FoldersModal = ({ closeMoveFolderModal, templateId }) => {

    const uid = useSelector(selectUID);
    const isFoldersKeywordPresent = window.location.href.includes('folders');

    const [folders, setFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState('');

    const moveTemplateToFolder = async () => {
        if (!selectedFolderId) {
            alert('Please Select a Folder to Move.')
            return;
        }
        if (selectedFolderId === 'Dashboard') {
            await moveToDashboard(uid, templateId)
        } else {
            await moveToFolder(uid, templateId, selectedFolderId)
        }
        toast.success("Template Moved Successfully")
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

                console.log('Folders fetched successfully:', fetchedFolders);
            } catch (error) {
                console.error('Error fetching folders:', error);
            }
        };
        fetchData();

    }, [])

    return (
        <div className="ReactModalPortal modal">
            <div className="ReactModal__Overlay ReactModal__Overlay--after-open">
                <div className="ReactModal__Content ReactModal__Content--after-open ReactModal__Content_md" tabIndex="-1" role="dialog" aria-modal="true">
                    <div className="modal-visible" tabIndex="-1">
                        <div className="modal__content">
                            <div className="modal__header">
                                <div className="modal__title">Move to Folder</div>
                                <button type="button" className="btn btn_icon modal__close btn_close-modal-icon" onClick={() => closeMoveFolderModal} data-test="close-button">
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
                                    <button type="button" className="btn btn_gray me-2" onClick={() => closeMoveFolderModal}>
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
