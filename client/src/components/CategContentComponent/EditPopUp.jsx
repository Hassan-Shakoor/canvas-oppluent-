import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { LOCAL_STORAGE } from "../../shared/constant";
import { getLocalStorage } from "../../services/localStorage";
import { createMyDesign } from "../../services/firebase/createMyDesign";
import { isTemplateInMyDesigns } from "../../services/firebase/TemplateServices/isTemplateInMyDesigns";
import SpinnerOverlay from "../Loader/SpinnerOverlay";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditPopUp(props) {
    const { t } = useTranslation()

    const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

    const navigate = useNavigate()

    const [selectedImage, setSelectedImage] = useState(0);

    const [overlayLoading, setOverlayLoading] = useState(false)

    const id = props.item.id; // Replace with the actual ID value
    const url = `/property-search/${id}`;


    const handleCreateDesign = async () => {
        if (!props.item?.isPropertySearchEnabled) {
            const templateObject = await isTemplateInMyDesigns(userData?.uid, id)
            if (templateObject.isTemplateInMyDesigns) {
                setTimeout(() => {
                    setOverlayLoading(false);
                    navigate(`/edit/${id}`);
                }, 40);
            }
            else {
                const templateId = uuidv4();
                await createMyDesign(userData?.uid, templateObject.templateObject, templateId)
                setTimeout(() => {
                    setOverlayLoading(false);
                    navigate(`/edit/${templateId}`);
                }, 40);
            }
            // navigate(`/edit/${id}`)
        } else {
            setTimeout(() => {
                navigate(url)
            }, 40);
        }

    }

    const handlePrev = () => {
        if (selectedImage <= 0) {
            setSelectedImage(props.item?.storage_url?.length - 1)
        } else {
            setSelectedImage(selectedImage - 1)
        }
    }

    const handleNext = () => {
        if (selectedImage >= props.item?.storage_url?.length - 1) {
            setSelectedImage(0)
        } else {
            setSelectedImage(selectedImage + 1)
        }
    }

    function handleClose() {
        props.handleCreateDesign(null)
    }

    return (<div className="ReactModalPortal modal">
        <SpinnerOverlay loading={overlayLoading} />
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
                            <div className="row justify-content-center align-items-center px-4" style={{ textAlignLast: 'center' }}>
                                <div className="thumbnail-slider px-4">

                                    <img
                                        className='thumbnail-slider__preview mb-5'
                                        src={props.item?.storage_url[selectedImage]}
                                        alt={``}
                                        // style={{ width: '200px' }}
                                    />

                                    <div className="react-slider thumbnail-slider__slider mb-3">
                                        <div>
                                            <div className="slick-slider slick-initialized">
                                                <div className="slick-list">
                                                    <div className="slick-track" style={{ width: `${props.item?.storage_url?.length * 130}px`, opacity: 1, transform: 'translate3d(0px, 0px, 0px)', margin: 'auto', justifyContent: 'center' }}>
                                                        {props.item?.storage_url?.map((imageUrl, index) => (
                                                            <div key={index} data-index={index} className={`slick-slide slick-active ${index === selectedImage ? 'slick-current' : ''}`} tabIndex="-1" aria-hidden="false">
                                                                <div onClick={() => setSelectedImage(index)}>
                                                                    <img
                                                                        className={`thumbnail-slider__thumbnail thumbnail-slider__thumbnail-img ${index === selectedImage ? 'thumbnail-slider__thumbnail_active' : ''}`}
                                                                        src={imageUrl}
                                                                        alt={`Image ${index + 1}`}
                                                                        tabIndex="-1"
                                                                        style={{ width: '80px', display: 'inline-block', margin: '0 10px' }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="react-slider__btn react-slider__btn_next" onClick={handleNext}>
                                            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                                        </button>
                                        <button className="react-slider__btn react-slider__btn_prev" onClick={handlePrev}>
                                            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                                        </button>
                                    </div>
                                    <div className="thumbnail-slider__counter mb-3">{selectedImage + 1} / {props.item?.storage_url?.length}</div>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-auto mb-2 button-set button-set_with-mr-2" />
                                <div className="col-auto mb-2 d-flex">
                                    <Link className="btn" onClick={handleCreateDesign}>
                                        <span className="btn__text">{t('createDesign')}</span>
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