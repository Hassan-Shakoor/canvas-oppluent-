import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ** Store
import { useSelector } from "react-redux";
import { selectOpenDrawer } from "../../../store/app/Edit/EditDrawer";

function EditLayerTab() {
  // ** Hooks
  const openDrawer = useSelector(selectOpenDrawer)

  return (
    <div
      className=
      {openDrawer === 'Layers' ? "layers-module vertical-switch-content-enter-done" : "layers-module vertical-switch-content-exit-done"}>
      <div className="layers">
        <div className="layers__search-box">
          <div className="small-search small-search_bordered">
            <div className="small-search__icon-wrapper">
              <svg className="icon v2-icon v2-icon-loupe">
                <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe"/>
              </svg>
            </div>
            <div className="small-search__input">
              <input
                autoComplete="off"
                id="small-search"
                name="small-search"
                placeholder="Search through layers"
                type="search"
                className="simple-input"
                defaultValue=""/>
            </div>
          </div>
        </div>
        <div className="layers__content-box">
          <div className="tree">
            <div className="layers__admin-panel">
              <div className="layers__root">
                <div className="fw-bolder">Actions</div>
                <div className="ms-auto layers__options">
                  <FontAwesomeIcon icon="fa-solid fa-folder-plus" />
                </div>
                <div className="layers__points">
                  <div className="">
                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                  </div>
                </div>
              </div>
            </div>
            <div className="tree__items-box">
              <div className="tree__item">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i
                            className="icon icon-plus-circle-fill layers__title-icon layers__title-icon_clickable cursor-pointer"/>
                          <input
                            className="layers__title-input"
                            draggable="true"
                            defaultValue="agent photo"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock-open lock lock_user cursor-pointer"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i className="icon icon-trash-alt layers__remove-button cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item layers__item_user-lock">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            draggable="true"
                            defaultValue="gradient overlay"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock lock lock_user lock_locked cursor-pointer"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i className="icon icon-trash-alt layers__remove-button cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item layers__item_admin-lock">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            disabled=""
                            draggable="true"
                            defaultValue="office icon overlay"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock lock lock_admin lock_locked lock_disabled"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i
                          className="icon icon-trash-alt layers__remove-button layers__remove-button_hidden cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            draggable="true"
                            defaultValue="full name"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock-open lock lock_user cursor-pointer"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i className="icon icon-trash-alt layers__remove-button cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            draggable="true"
                            defaultValue="mobile phone"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock-open lock lock_user cursor-pointer"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i className="icon icon-trash-alt layers__remove-button cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input className="layers__title-input" draggable="true" defaultValue="email"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock-open lock lock_user cursor-pointer"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i className="icon icon-trash-alt layers__remove-button cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item layers__item_user-lock">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input className="layers__title-input" draggable="true" defaultValue="line"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock lock lock_user lock_locked cursor-pointer"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i className="icon icon-trash-alt layers__remove-button cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item layers__item_admin-lock">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            disabled=""
                            draggable="true"
                            defaultValue="office logo"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock lock lock_admin lock_locked lock_disabled"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i
                          className="icon icon-trash-alt layers__remove-button layers__remove-button_hidden cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item layers__item_admin-lock">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            disabled=""
                            draggable="true"
                            defaultValue="website"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock lock lock_admin lock_locked lock_disabled"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i
                          className="icon icon-trash-alt layers__remove-button layers__remove-button_hidden cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item layers__item_admin-lock">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            disabled=""
                            draggable="true"
                            defaultValue="equal housing"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock lock lock_admin lock_locked lock_disabled"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i
                          className="icon icon-trash-alt layers__remove-button layers__remove-button_hidden cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item layers__item_admin-lock">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            disabled=""
                            draggable="true"
                            defaultValue="realtor logo"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock lock lock_admin lock_locked lock_disabled"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i
                          className="icon icon-trash-alt layers__remove-button layers__remove-button_hidden cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
              <div className="tree__item layers__item_admin-lock">
                <div className="tree__root-box" draggable="true">
                  <div className="tree__indent-box"/>
                  <div className="tree__root">
                    <div className="layers__item">
                      <div className="layers__root">
                        <div className="layers__title">
                          <i className="icon icon-layers layers__title-icon"/>
                          <input
                            className="layers__title-input"
                            disabled=""
                            draggable="true"
                            defaultValue="mls logo"/>
                        </div>
                        <div className="layers__options">
                          <div className="d-flex flex-nowrap">
                            <i className="icon icon-lock lock lock_admin lock_locked lock_disabled"/>
                          </div>
                          <i
                            className="icon icon-designer-text-underline layers__font-button ms-1 layers__font-button_hidden layers__font-button_disable"/>
                        </div>
                        <i
                          className="icon icon-trash-alt layers__remove-button layers__remove-button_hidden cursor-pointer"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tree__children-box"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLayerTab