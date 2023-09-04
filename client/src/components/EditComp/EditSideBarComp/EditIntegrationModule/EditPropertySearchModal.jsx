import React from "react"

function EditPropertySearchModal({isModalOpen, toggleModal}) {
  return (
    <div className="ReactModalPortal modal">
      {isModalOpen && <div
        className="ReactModal__Overlay ReactModal__Overlay--after-open"
        style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255, 255, 255, 0.75)"
      }}>
        <div
          className="ReactModal__Content ReactModal__Content--after-open ReactModal__Content_lg">
          <div className="property-search-modal modal-visible">
            <div className="modal__content">
              <div className="modal__header">
                <div className="modal__title">Property Search</div>
                <button
                  type="button"
                  className="btn btn_icon modal__close btn_close-modal-icon"
                  data-test="close-button"
                  onClick={toggleModal}>
                  <svg className="icon v1-icon v1-icon-cross-light">
                    <use href="#v1-icon-cross-light" xlinkHref="#v1-icon-cross-light"/>
                  </svg>
                  <span className="btn__text"/>
                </button>
              </div>
              <div className="modal__body">
                <div className="mb-3 search-input_full-width search-input">
                  <div className="">
                    <input
                      autoComplete="off"
                      id="search"
                      name="search"
                      placeholder="Enter Address or MLS # here"
                      type="search"
                      className="search-input__simple-input"
                      defaultValue=""/>
                  </div>
                </div>
                <div className="mb-3 property-search__list">
                  <div className="empty-data-set" data-test="empty-data-set">
                    <div className="empty-data-set__icon-wrapper">
                      <img
                        src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/512dae34bbe771ada018.svg"
                        alt="properties"
                        className="empty-data-set__icon"/>
                    </div>
                    <div className="empty-data-set__label">
                      Your search results will be here
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>

  )
}

export default EditPropertySearchModal