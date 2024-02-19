import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SortDropDown from '../Dropdown/SortDropdown';

const DashboardHeaderButtons = (props) => {
  const [openSortDropDown, setOpenSortDropDown] = useState(false);
  const [openGridDropDown, setOpenGridDropDown] = useState(false);

  const [sortGrid, setSortGrid] = useState(3)

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

  return (
    <div className="dashboard-header">
      <div className="dashboard-header__top-panel">
        <div className="dashboard-header__left-panel">
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
                placeholder="Search My Dashboard"
                type="search"
                className="dashboard-header__search-input search-input__input"
                value=""
              />
            </div>
          </div>
        </div>
        <div className="dashboard-header__right-panel">
          <button type="button" className="btn_secondary btn_secondary dashboard-header__buttons">
            <span className="btn__text"><FontAwesomeIcon icon="fa-solid fa-circle-plus" size='lg' /> Create Folder</span>
          </button>
          <button className="btn_secondary btn_disabled btn_dropdown dashboard-header__buttons-dropdown-batch dashboard-header__buttons">
            <span className="btn__text"> <FontAwesomeIcon icon="fa-regular fa-copy" flip="horizontal" /> Batch Actions</span>
            <svg className="icon v2-icon v2-icon-chevron-down">
              <use href="#v2-icon-chevron-down" xlinkHref="#v2-icon-chevron-down"></use>
            </svg>
          </button>
          <div style={{ position: 'relative' }}>

            <button type="button" onClick={() => setOpenSortDropDown(!openSortDropDown)} className="btn_secondary btn_dropdown btn_secondary dashboard-header__buttons-dropdown dashboard-header__buttons">
              <span className="btn__text"><FontAwesomeIcon icon="fa-solid fa-right-left" rotation={90} size='lg' /> Sort by</span>
              <svg className="icon v2-icon v2-icon-chevron-down">
                <use href="#v2-icon-chevron-down" xlinkHref="#v2-icon-chevron-down"></use>
              </svg>
            </button>
            {openSortDropDown && (<SortDropDown dropdown={sortDropdownOptions} handleSortTemplate={props.handleSortTemplate} />)}
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
                  <div className="select__menu css-26l3qy-menu">
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
    </div>
  );
};

export default DashboardHeaderButtons;
