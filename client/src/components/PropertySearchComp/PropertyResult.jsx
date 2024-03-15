// ** Import Libraries
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { useTranslation } from 'react-i18next';
// ** Store
import { useDispatch, useSelector } from "react-redux"
import { selectNumDescRequired, selectNumPhotoRequired, selectSelectedProperty, updateMlsPropertyInfo, updateSelectedProperty, updateUseMlsInfo } from "../../store/app/PropertySearch/property";

// ** Custom Components
import WarningModal from "../Modal/WarningModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PropertyResult({ templateId, isInModal, toggleModal }) {

    const { t } = useTranslation()
    // ** Vars
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectedProperty = useSelector(selectSelectedProperty)
    const noOfDesriptionRequired = useSelector(selectNumDescRequired)
    const noOfPicRequried = useSelector(selectNumPhotoRequired)
    const initialDescriptions = Array.from({ length: noOfDesriptionRequired }, (_, index) => (
        index === 0 ? selectedProperty.remarks || "" : ""
    ));

    // ** State
    const [headline, setHeadline] = useState("")
    const [street, setStreet] = useState(selectedProperty.address.full)
    const [city, setCity] = useState(selectedProperty.address.city)
    const [state, setState] = useState(selectedProperty.address.state)
    const [postalCode, setPostalCode] = useState(selectedProperty.address.postalCode)
    const [descriptions, setDescriptions] = useState(initialDescriptions)
    const [price, setPrice] = useState(selectedProperty.listPrice)
    const [mlsNo, setMlsNo] = useState(selectedProperty.listingId)
    const [sqft, setSqft] = useState(selectedProperty.property.area)
    const [bedrooms, setBedrooms] = useState(selectedProperty.property.bedrooms)
    const [halfBaths, setHalfBaths] = useState(selectedProperty.property.bathsHalf)
    const [fullBaths, setFullBaths] = useState(selectedProperty.property.bathsFull)
    const [selectedImages, setSelectedImages] = useState([])
    const [isAllImage, setIsAllImage] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)
    const [isWarn, setIsWarn] = useState(false)
    const [showWarnModal, setShowWarnModal] = useState(false)

    const handleSelectedImage = (index) => {
        if (selectedImages.includes(selectedProperty.photos[index])) {
            setSelectedImages((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages.splice(selectedImages.indexOf(selectedProperty.photos[index]), 1)
                return updatedImages;
            })
        } else {
            if (selectedImages.length < noOfPicRequried) {
                setSelectedImages([...selectedImages, selectedProperty.photos[index]]);
            } else {
                setSelectedImages((prevImages) => {
                    const updatedImages = [...prevImages];
                    updatedImages[noOfPicRequried - 1] = selectedProperty.photos[index];
                    return updatedImages;
                });
            }
        };
    }

    const handleDescriptionText = (index, newValue) => {
        setDescriptions((prevDescriptions) => {
            const clone = [...prevDescriptions];
            clone[index] = newValue;
            return clone;
        });
    };

    const handleValidation = () => {
        return descriptions.some(desc => desc.length > 500) || !isConfirm;
    };

    const handleModalCreate = (event) => {
        event.preventDefault()
        dispatch(updateUseMlsInfo(true))
        const data = {
            headline: headline,
            street: street,
            city: city,
            state: state,
            postalCode: postalCode,
            descriptions: descriptions,
            price: price,
            mlsNo: mlsNo,
            sqft: sqft,
            bedrooms: bedrooms,
            halfBaths: halfBaths,
            fullBaths: fullBaths,
            selectedImages: isAllImage ? selectedProperty.photos : selectedImages
        }
        dispatch(updateMlsPropertyInfo(data))
        if (toggleModal) {
            toggleModal();
        }
        if (!isInModal) {
            navigate(`/edit/${templateId}`)
        }
    }

    const handleCreate = () => {
        if (!isConfirm) {
            toast.error(t("Property.toastError"))
            setIsWarn(true)
            return
        }
        if (handleValidation()) {
            if (!isInModal) {
                toast.error(t("Property.toastError"))
                setIsWarn(true)
                setShowWarnModal(true)
                return
            }
        }
        dispatch(updateUseMlsInfo(true))
        dispatch(updateMlsPropertyInfo({
            headline: headline,
            street: street,
            city: city,
            state: state,
            postalCode: postalCode,
            descriptions: descriptions,
            price: price,
            mlsNo: mlsNo,
            sqft: sqft,
            bedrooms: bedrooms,
            halfBaths: halfBaths,
            fullBaths: fullBaths,
            selectedImages: isAllImage ? selectedProperty.photos : selectedImages
        }))

        if (toggleModal) {
            toggleModal();
        }

        if (!isInModal) {
            navigate(`/edit/${templateId}`)
        }
    }

    return (
        <div className="pt-4">
            <h4 className="mb-3 text-info">
                {t("Property.resultDesc")}
            </h4>
            <div className="mb-3">
                <label className="input">
                    <span className="input__label">{t("Property.headlineLabel")}</span>
                    <input
                        placeholder={t("Property.headlinePlaceholder")}
                        type="text"
                        className="simple-input"
                        value={headline}
                        onChange={(event) => setHeadline(event.target.value)}
                    />
                </label>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">{t("Property.streetLabel")}</span>
                        <input
                            placeholder={t("Property.streetPlaceholder")}
                            type="text"
                            className="simple-input"
                            value={street}
                            onChange={(event) => setStreet(event.target.value)}
                        />
                    </label>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">{t("Property.cityLabel")}</span>
                        <input
                            placeholder={t("Property.cityPlaceholder")}
                            type="text"
                            className="simple-input"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">{t("Property.stateLabel")}</span>
                        <input
                            placeholder={t("Property.statePlaceholder")}
                            type="text"
                            className="simple-input"
                            value={state}
                            onChange={event => setState(event.target.state)}
                        />
                    </label>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">{t("Property.zipCodeLabel")}</span>
                        <input
                            placeholder={t("Property.zipCodePlaceholder")}
                            type="text"
                            className="simple-input"
                            value={postalCode}
                            onChange={event => setPostalCode(event.target.value)}
                        />
                    </label>
                </div>
            </div>
            {Array.from({ length: noOfDesriptionRequired }).map((_, index) => (
                <div className="mb-3" key={index}>
                    <div className="chat-gpt-dialog-wrapper">
                        <div className="chat-gpt-module__request-field mb-4">
                            <label className="chat-gpt-dialog__text-area textarea item-has-value textarea_has-value">
                                <span className="input__label textarea__label">Description {index + 1}</span>
                                <textarea
                                    placeholder="Enter the description"
                                    className="textarea__field textarea chat-gpt-dialog-wrapper__chat-gpt-area"
                                    value={descriptions[index]}
                                    onChange={(event) => handleDescriptionText(index, event.target.value)}
                                />
                                {isWarn && descriptions[index].length > 500 && <ul className="validation-errors validation-errors_warning">
                                    <li className="validation-errors__item">Character limit exceeded, max 500</li>
                                </ul>}
                            </label>
                        </div>
                        <div className="chat-gpt-module__control-block control-block">
                            <div className="sidebar__module-divider" />
                            <div className="control-block__management-block management-block">
                                <div className="control-block__buttons-block buttons-block">
                                    <button type="button" className="btn btn_secondary">
                                        <span className="btn__text">Generate Text with AI Writer</span>
                                    </button>
                                </div>
                                <div className="management-block__info-block">
                                    <div className="textarea-length-container">
                                        <svg className="CircularProgressbar " viewBox="0 0 100 100">
                                            <path
                                                className="CircularProgressbar-trail"
                                                d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                                                strokeWidth={8}
                                                fillOpacity={0}
                                                style={{
                                                    strokeDasharray: "289.027px, 289.027px",
                                                    strokeDashoffset: 0,
                                                }}
                                            />
                                            <path
                                                className="CircularProgressbar-path"
                                                d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                                                strokeWidth={8}
                                                fillOpacity={0}
                                                style={{
                                                    strokeDasharray: `${289.027 * (descriptions[index].length / 500)}px, 289.027px`,
                                                    strokeDashoffset: 0,
                                                }}
                                            />
                                            <text className="CircularProgressbar-text" x={50} y={50}>
                                                {descriptions[index].length}
                                            </text>
                                        </svg>
                                        <span>500 characters max</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">{t("Property.priceLabel")}</span>
                        <input
                            placeholder={t("Property.pricePlaceholder")}
                            type="text"
                            className="simple-input"
                            value={price}
                            onChange={event => setPrice(event.target.value)}
                        />
                    </label>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">{t("Property.mls")}</span>
                        <input
                            placeholder={t("Property.mlsPlaceholder")}
                            type="text"
                            className="simple-input"
                            value={mlsNo}
                            onChange={event => setMlsNo(event.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">Square Footage</span>
                        <input
                            placeholder="Enter the square footage"
                            type="text"
                            className="simple-input"
                            value={sqft}
                            onChange={event => setSqft(event.target.value)}
                        />
                    </label>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">Bedrooms</span>
                        <input
                            placeholder="Enter the count of bedrooms"
                            type="text"
                            className="simple-input"
                            value={bedrooms}
                            onChange={event => setBedrooms(event.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">Half Bathrooms</span>
                        <input
                            placeholder="Enter the count of half bath"
                            type="text"
                            className="simple-input"
                            value={halfBaths}
                            onChange={event => setHalfBaths(event.target.value)}
                        />
                    </label>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="input input_has-value">
                        <span className="input__label">Full Baths</span>
                        <input
                            placeholder="Enter the count of full bath"
                            type="text"
                            className="simple-input"
                            value={fullBaths}
                            onChange={event => setFullBaths(event.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="property-search__image-list">
                <div className="property-search__list-title">Select Pictures {selectedImages.length} of {noOfPicRequried}</div>
                <div className="property-search__image-box">
                    <div className="picture-box">
                        {selectedProperty.photos.map((photo, index) => {
                            const isSelected = selectedImages.includes(photo);
                            const selectedIndex = isSelected ? selectedImages.indexOf(photo) + 1 : null;

                            return (
                                <div
                                    className="picture-box__item"
                                    data-url={photo}
                                    data-selected={isSelected && 'selected'}
                                    onClick={() => handleSelectedImage(index)}
                                >
                                    {isSelected && <div className="picture-box__icon">{selectedIndex}</div>}
                                    <img
                                        className={`picture-box__image ${isSelected ? 'picture-box__image_selected' : ''}`}
                                        alt="property images"
                                        src={photo}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="button-set button-set_right button-set_padding-top">
                        <label className="checkbox checkbox_mb-30">
                            <input className="checkbox__input" type="checkbox" value={isAllImage} onChange={() => setIsAllImage(!isAllImage)} />
                            <div className="checkbox__box">
                                <div className="checkbox__tick">
                                    <FontAwesomeIcon icon="fa-solid fa-check" color='#fff' />
                                </div>
                            </div>
                            <div className="checkbox__label property-search__confirmation checkbox__label_no-space">
                                Upload All Pictures
                            </div>
                        </label>
                        <button type="button" className="btn btn_gray" onClick={() => setSelectedImages([])}>
                            <span className="btn__text">Deselect</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label className="checkbox checkbox_wide">
                    <input className="checkbox__input" type="checkbox" value={isConfirm} onChange={() => setIsConfirm(!isConfirm)} />
                    <div className="checkbox__box" style={{ width: '24px' }}>
                        <div className="checkbox__tick">
                            <FontAwesomeIcon icon="fa-solid fa-check" color='#fff' />
                        </div>
                    </div>
                    <div className="checkbox__label property-search__confirmation checkbox__label_no-space">
                        {t("Property.confirmDesc")}
                    </div>
                    {isWarn && !isConfirm && <div className="validation-errors validation-errors_checkbox">
                        <li className="validation-errors__item">{t("Property.acceptToContinue")}</li>
                    </div>}
                </label>
            </div>
            <div className="button-set button-set_space-between">
                <button type="button" className="btn btn_gray" onClick={() => dispatch(updateSelectedProperty(null))}>
                    <span className="btn__text">{t("Home.back")}</span>
                </button>
                <div className="button-set__divider" />
                <button type="submit" className="btn" onClick={() => handleCreate()}>
                    <span className="btn__text">{t('create')}</span>
                </button>
            </div>
            {showWarnModal &&
                <WarningModal
                    title={"Warning!"}
                    body={"Your description character count surpassed the amount that will properly fit and will most likely bleed into your design. Please shorten your text or click CREATE DESIGN to continue customizing your text formatting in the designer."}
                    secondayBtnTxt={"Fix Warnings"}
                    primaryBtnTxt={t('createDesign')}
                    onClose={() => setShowWarnModal(false)}
                    handleSecodnaryBtn={() => setShowWarnModal(false)}
                    handlePrimaryBtn={(event) => handleModalCreate(event)}
                    isOverflowY={true}
                />}
        </div>
    )
}

export default PropertyResult;