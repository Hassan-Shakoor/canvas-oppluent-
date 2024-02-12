import React from "react";
import { Link } from "react-router-dom";

function EditPopUp(props){
    
    const id = props.item.id; // Replace with the actual ID value
    const url = `/property-search/${id}`;

    function handleClose(){
        props.handleCreateDesign(null)
    }

    return (<div className="ReactModalPortal modal">
        <div
            className="ReactModal__Overlay ReactModal__Overlay--after-open"
            style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)"
            }}
        >
            <div
            className="ReactModal__Content ReactModal__Content--after-open ReactModal__Content_lg"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            >
            <div className="modal-visible" tabIndex={-1} data-test="design-preview">
                <div className="modal__content">
                <div className="modal__header">
                    <div className="modal__title">Design Preview</div>
                    <button
                    type="button"
                    className="btn btn_icon modal__close btn_close-modal-icon"
                    data-test="close-button"
                    onClick={handleClose}
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
                    <div className="row justify-content-center align-items-center px-4">
                    <div className="react-slider mb-3 col-auto template-preview__slider">
                        <div>
                        <div className="slick-slider slick-initialized">
                            <div className="slick-list">
                            <div
                                className="slick-track"
                                style={{ width: 420, opacity: 1 }}
                            >
                                <div
                                data-index={0}
                                className="slick-slide slick-active slick-current"
                                tabIndex={-1}
                                aria-hidden="false"
                                style={{
                                    outline: "none",
                                    width: 420,
                                    position: "relative",
                                    left: 0,
                                    opacity: 1,
                                    transition:
                                    "opacity 500ms ease 0s, visibility 500ms ease 0s"
                                }}
                                >
                                <div>
                                    <div
                                    tabIndex={-1}
                                    style={{ width: "100%", display: "inline-block" }}
                                    >
                                    <div className="template-preview">
                                        <img
                                        className="template-preview__image"
                                        title={props.item.cardTitle}
                                        src={props.item.storage_url[0]}
                                        alt={props.item.cardTitle}
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="react-slider__btn react-slider__btn_next react-slider__btn_disabled">
                        <svg className="icon v2-icon v2-icon-chevron-right-light">
                            <use
                            href="#v2-icon-chevron-right-light"
                            xlinkHref="#v2-icon-chevron-right-light"
                            />
                        </svg>
                        </div>
                        <div className="react-slider__btn react-slider__btn_prev react-slider__btn_disabled">
                        <svg className="icon v2-icon v2-icon-chevron-left-light">
                            <use
                            href="#v2-icon-chevron-left-light"
                            xlinkHref="#v2-icon-chevron-left-light"
                            />
                        </svg>
                        </div>
                    </div>
                    </div>
                    <div className="row justify-content-end">
                    <div className="col-auto mb-2 button-set button-set_with-mr-2" />
                    <div className="col-auto mb-2 d-flex">
                        <Link className="btn" to={url}>
                            <span className="btn__text">Create Design</span>
                        </Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>)
}

export default EditPopUp;