// ** Import Dependencies
import React from "react";

// ** Icons
import { Icon } from "@iconify/react";

function InputModal({title, body, secondayBtnTxt, primaryBtnTxt,onClose, handleSecodnaryBtn, handlePrimaryBtn}){
    return (
        <div className="ReactModal__Overlay ReactModal__Overlay--after-open confirmation-modal-overlay">
            <div
                className="ReactModal__Content ReactModal__Content--after-open ReactModal__Content_md"
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
            >
                <div className="confirmation-modal modal-visible" tabIndex={-1}>
                <div className="modal__content">
                    <div className="modal__header confirmation-modal__modal-header">
                    <Icon icon="pajamas:warning" className="modal__header_icon-warning"/>
                    <div className="modal__title">{title}</div>
                    <button
                        onClick={() => onClose()}
                        type="button"
                        className="btn btn_icon modal__close btn_close-modal-icon"
                        data-test="close-button"
                    >
                        <svg className="icon v1-icon v1-icon-cross-light">
                        <use
                            href="#v1-icon-cross-light"
                            xlinkHref="#v1-icon-cross-light"
                        />
                        </svg>
                        <span className="btn__text" />
                    </button>
                    </div>
                    <div className="modal__body">
                    {body}
                    <form className="button-set button-set_padding-top button-set_space-between">
                        <button type="button" className="btn btn_border btn_secondary" 
                        onClick={() => handleSecodnaryBtn()}>
                        <span className="btn__text">{secondayBtnTxt}</span>
                        </button>
                        <button type="submit" className="btn btn" onClick={(event) => handlePrimaryBtn(event)}>
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

export default InputModal