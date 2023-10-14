// ** Import Dependencies
import React from "react";

// ** Icons
import { Icon } from "@iconify/react";

const ConfirmationModal = ({title, body, secondaryBtnTxt, primaryBtnTxt, close, submit}) => {
  return (
    <div
      className="ReactModal__Overlay ReactModal__Overlay--after-open confirmation-modal-overlay">
      <div
        className="ReactModal__Content ReactModal__Content--after-open ReactModal__Content_md"
        tabIndex={-1}
        role="dialog"
        aria-modal="true">
        <div className="confirmation-modal modal-visible" tabIndex={-1}>
          <div className="modal__content">
            <div className="modal__header confirmation-modal__modal-header">
            <Icon icon="pajamas:warning" className="modal__header_icon-warning"/>
              <div className="modal__title">
                <div className="modal__title">{title}</div>
              </div>
              <button
                type="button"
                className="btn btn_icon modal__close btn_close-modal-icon"
                data-test="close-button"
                onClick={() => close()}>
                <svg className="icon v1-icon v1-icon-cross-light">
                  <use href="#v1-icon-cross-light" xlinkHref="#v1-icon-cross-light"/>
                </svg>
                <span className="btn__text"/>
              </button>
            </div>
            <div className="modal__body">
              {body}
              <form className="button-set button-set_padding-top button-set_right">
                <button type="button" className="btn btn_secondary" onClick={() => close()}>
                  <span className="btn__text">{secondaryBtnTxt}</span>
                </button>
                <button type="submit" className="btn btn_blue" onClick={(event) => submit(event)}>
                  <span className="btn__text">{primaryBtnTxt}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ConfirmationModal