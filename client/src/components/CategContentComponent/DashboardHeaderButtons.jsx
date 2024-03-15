import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import SortDropDown from '../Dropdown/SortDropdown';
import InputModal from '../Modal/InputModal';
import { selectUID } from '../../store/app/User/userPreference';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createFolder } from '../../services/firebase/FolderServices/createFolder';
import { useNavigate, useParams } from 'react-router-dom';
import SpinnerOverlay from '../Loader/SpinnerOverlay';
import { createFolderinFolder } from '../../services/firebase/FolderServices/createFolderinFolder';
import MoreDropDown from '../Dropdown/MoreDropdown';
import Dropdown from 'rc-dropdown';
import { deleteFolder } from '../../services/firebase/FolderServices/deleteFolder';
import { deleteTemplate } from '../../services/firebase/TemplateServices/deleteTemplate';
import FoldersModal from '../Modal/FoldersModal';
import { getFolders } from '../../services/firebase/FolderServices/getFolders';

import { useTranslation } from 'react-i18next';


const DashboardHeaderButtons = (props) => {

  const navigate = useNavigate();

  const { t } = useTranslation();

  const uid = useSelector(selectUID)

  const { id } = useParams();

  const [overlayLoading, setOverlayLoading] = useState(false);

  const [openSortDropDown, setOpenSortDropDown] = useState(false);
  const [openGridDropDown, setOpenGridDropDown] = useState(false);
  const [openBatchDropdown, setOpenBatchDropdown] = useState(false);

  const isFoldersKeywordPresent = window.location.href.includes('folders');
  const dropdownRef = useRef();

  const [showInputFolderModal, setShowInputFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [sortGrid, setSortGrid] = useState(3)

  const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false)

  const closeMoveFolderModal = () => {
    setOpenMoveFolderModal(false);
  }

  const sortDropdownOptions = [
    {
      key: "default",
      title: "Default",
    },
    {
      key: "created",
      title: "Created",
    },
    {
      key: "modified",
      title: "Modified",
    },
    {
      key: "a-z",
      title: "Name A - Z",
    },
    {
      key: "z-a",
      title: "Name Z - A",
    },
  ]

  const batchDropdownMenu = [
    {
      key: "move-to-folder",
      iconClass: "fa-solid fa-arrow-right-arrow-left",
      title: t("Home.moveToFolder"),
      function: async () => {
        try {
          // props.selectedItems?.map((item, index) => {
          //   if (item.type === 'folder') {

          //   } else if (item.type === 'template') {

          //     // await deleteTemplate(uid, props.item.id)
          //   }
          // })
          // toast.success("Files Moved Successfully.")
          setOpenMoveFolderModal(true);
        } catch (error) {
          console.error("Error: ", error)
          toast.error("Error Moving Files.")
        }
      }
    },
    {
      key: "delete",
      iconClass: "fa-regular fa-trash-can",
      title: t("delete"),
      function: async () => {
        try {
          await Promise.all(
            props.selectedItems?.map(async (item) => {
              if (item.type === 'folder') {
                return deleteFolder(uid, item.id);
              } else if (item.type === 'template') {
                return deleteTemplate(uid, item.id);
              }
            })
          );
          // await deleteTemplate(uid, props.item.id)
          props.setRenderTriggerFromDashboard(!props.renderTriggerFromDashboard)
          toast.success("Files Deleted Successfully.")
        } catch (error) {
          console.error("Error: ", error)
          toast.error("Error Deleting Files.")
        }
      }
    },
  ]

  const findFolderByIdRecursive = (folders, id) => {
    for (const folder of folders) {
      if (folder.id === id) {
        return folder; // Found the folder with the matching id
      }
      if (folder.folders) {
        const recursiveResult = findFolderByIdRecursive(folder.folders, id);
        if (recursiveResult) {
          return recursiveResult; // Return the result from the recursive call
        }
      }
    }

    return null;
  };

  const handleBack = async () => {
    setOverlayLoading(true);
    const isFoldersKeywordPresent = window.location.href.includes('folders');
    const fetchedFolders = await getFolders(uid);
    if (isFoldersKeywordPresent) {
      const folder = await findFolderByIdRecursive(fetchedFolders, id)
      if (folder?.parentID) {
        setOverlayLoading(false);
        navigate(`/folders/${folder.parentID}`)
      } else {
        setOverlayLoading(false);
        navigate('/categories')
      }
    }
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, close it
        setOpenGridDropDown(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-header">
      <SpinnerOverlay loading={overlayLoading} />
      {showInputFolderModal && (
        <InputModal
          title="Rename"
          body={
            <div className="password-input">
              <label className="input">
                <span className="input__label">{t("Home.folderNameLabel")}</span>
                <input
                  placeholder={t("Home.folderNamePlaceholder")}
                  type="text"
                  className="simple-input"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </label>
            </div>
          }
          secondayBtnTxt={t("cancel")}
          primaryBtnTxt={t("submit")}
          onClose={() => setShowInputFolderModal(false)}
          handleSecodnaryBtn={() => setShowInputFolderModal(false)}
          handlePrimaryBtn={async (e) => {
            e.preventDefault();
            setOverlayLoading(true);
            if (isFoldersKeywordPresent) {
              const response = await createFolderinFolder(uid, id, folderName);
              if (response) {
                setShowInputFolderModal(false);
                toast.success(t("Folder.folderCreatedSuccess"))
                props.setRenderTriggerFromDashboard(!props.renderTriggerFromDashboard)
              } else {
                setShowInputFolderModal(false);
                toast.error(t("Folder.folderCreatedError"))
              }
            } else {
              const response = await createFolder(uid, folderName);
              if (response) {
                setShowInputFolderModal(false);
                toast.success(t("Folder.folderCreatedSuccess"))
                props.setRenderTriggerFromDashboard(!props.renderTriggerFromDashboard)
              } else {
                setShowInputFolderModal(false);
                toast.error(t("Folder.folderCreatedError"))
              }
            }
            setOverlayLoading(false);
          }}
        />)}

      {openMoveFolderModal &&
        <FoldersModal
          closeMoveFolderModal={closeMoveFolderModal}
          items={props.selectedItems}
        />}


      <div className="dashboard-header__top-panel">
        <div className="dashboard-header__left-panel">
          {isFoldersKeywordPresent &&
            <button type="button" className="btn_secondary dashboard-header__buttons-back dashboard-header__buttons" onClick={handleBack}>
              <span className="btn__text">
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" /> {t("Home.back")}
              </span>
            </button>}
          <div className="dashboard-header__search search-input">
            <label htmlFor="search">
              <svg className="icon v2-icon v2-icon-loupe search-input__icon">
                <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe"></use>
              </svg>
            </label>
            <div className="">
              <input
                autoComplete="off"
                id="search"
                name="search"
                placeholder={t("Home.searchDashboard")}
                type="search"
                className="dashboard-header__search-input search-input__input"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  props.getSearchInput(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="dashboard-header__right-panel">
          <button type="button" className={`btn_secondary dashboard-header__buttons`}
            onClick={() => setShowInputFolderModal(true)}>
            <span className="btn__text"><FontAwesomeIcon icon="fa-solid fa-circle-plus" size='lg' /> {t("Home.createFolder")}</span>
          </button>
          <Dropdown
            trigger={["click"]}
            overlay={
              <MoreDropDown
                dropdown={batchDropdownMenu}
              />
            }
          >
            <button className={`btn_secondary btn_dropdown dashboard-header__buttons-dropdown-batch dashboard-header__buttons ${props.selectedItems.length === 0 ? 'btn_disabled' : ''}`}
              disabled={props.selectedItems.length === 0} onClick={() => setOpenBatchDropdown(!openBatchDropdown)}>
              <span className="btn__text"> <FontAwesomeIcon icon="fa-regular fa-copy" flip="horizontal" /> {t("Home.batchActions")}</span>
              <svg className="icon v2-icon v2-icon-chevron-down">
                <use href="#v2-icon-chevron-down" xlinkHref="#v2-icon-chevron-down"></use>
              </svg>
            </button>
          </Dropdown>

          {/* {openBatchDropdown && (
            <MoreDropDown
              dropdown={batchDropdownMenu}
            />
          )} */}
          <div style={{ position: 'relative' }}>

            <button type="button" onClick={() => setOpenSortDropDown(!openSortDropDown)} className="btn_secondary btn_dropdown btn_secondary dashboard-header__buttons-dropdown dashboard-header__buttons">
              <span className="btn__text"><FontAwesomeIcon icon="fa-solid fa-right-left" rotation={90} size='lg' /> {t("Home.sortBy")}</span>
              <svg className="icon v2-icon v2-icon-chevron-down">
                <use href="#v2-icon-chevron-down" xlinkHref="#v2-icon-chevron-down"></use>
              </svg>
            </button>
            {openSortDropDown && (<SortDropDown
              dropdown={sortDropdownOptions}
              handleSortTemplate={props.handleSortTemplate}
              setOpenSortDropDown={setOpenSortDropDown} />)}
          </div>
          <div className="select-container select-container_with-icons select-container_has-value">
            <div className="select-container css-2b097c-container">
              <div className="select__control css-yk16xz-control" onClick={() => setOpenGridDropDown(!openGridDropDown)}>
                <div className="select__value-container select__value-container--has-value css-1tnzi8j">
                  <div className="select__single-value css-ah2eo0-singleValue">
                    {/* <i className="icon icon-column"></i>
                    <i className="icon icon-column"></i>
                    <i className="icon icon-column"></i> */}
                    {/* <FontAwesomeIcon icon="fa-solid fa-square" /> */}
                    <div className='rect-block'></div>
                    <div className='rect-block'></div>
                    {props.gridColumn === 3 ? (<div className='rect-block'></div>) : (<></>)}
                  </div>
                  <input id="react-select-4-input" readOnly="" tabIndex="0" aria-autocomplete="list" className="css-62g3xt-dummyInput" value="" />
                </div>

                {openGridDropDown ?
                  <div className="select__menu css-26l3qy-menu" ref={dropdownRef}>
                    <div className="select__menu-list css-a8xhzo">
                      <div className="select__option css-1dkp1dt-option" id="react-select-2-option-0" tabIndex="-1" onClick={() => props.handleColumn(2)}>
                        <div className='rect-block'></div>
                        <div className='rect-block'></div>
                      </div>
                      <div className="select__option select__option--is-focused select__option--is-selected css-z06zfw-option" id="react-select-2-option-1" tabIndex="-1" onClick={() => props.handleColumn(3)}>
                        <div className='rect-block'></div>
                        <div className='rect-block'></div>
                        <div className='rect-block'></div>
                      </div>
                    </div>
                  </div> : <></>}
                <div className="select__indicators css-1wy0on6">
                  <span className="select__indicator-separator css-18jcpcz-indicatorSeparator"></span>
                  <svg className="icon v2-icon v2-icon-chevron-right select__icon">
                    <use href="#v2-icon-chevron-right" xlinkHref="#v2-icon-chevron-right"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default DashboardHeaderButtons;
