// ** Import Dependencies
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// ** Custom Component
import { toast } from 'react-toastify'
import SpinnerOverlay from '../Loader/SpinnerOverlay'
import ValidationError from "../ValidationErrorComp/ValidationError";

import { useTranslation } from 'react-i18next';

// ** Store
import { createPartner, selectPartner, updatePartnerList, fetchPartnerData } from "../../store/app/Partner/partner";

// ** Services
import uploadFileAndGetURL from "../../services/uploadFileAndGetURL";
import { selectUID } from "../../store/app/User/userPreference";


function NewPartnerBody() {

  const { t } = useTranslation()

  // ** State
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState("")
  const [showValidationError, setShowValidationError] = useState(false)
  const [loading, setLoading] = useState(false)

  // ** Vars
  const dispatch = useDispatch()
  const partnersList = useSelector(selectPartner)
  const navigate = useNavigate()

  const handleNewPartnerSubmit = () => {
    if (firstName.length === 0 || lastName.length === 0) {
      setShowValidationError(true)
      toast.error("All required fields must be filled")
      return
    }

    const data = { firstName, lastName, email, contactNumber, profilePhoto: selectedProfilePhoto, primary: partnersList?.length === 0 || false }
    dispatch(createPartner(data))
    toast.success(t("Partners.partnerCreationSuccess"))
    navigate('/partners')
  }

  const handleUploadPhoto = async (image) => {
    setLoading(true)
    try {
      const imageURL = await uploadFileAndGetURL(image)
      setSelectedProfilePhoto(imageURL)
    } catch (error) {
      toast.error(t("Partners.uploadImageFailed"))
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <>
      {loading && <SpinnerOverlay loading={loading} />}
      <div className="page__content">
        <div className="row">
          <div className="col col-md-7 col-xl-8 page__column">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label className="input">
                    <span className="input__label">
                      {t("Partners.firstNameLabel")}<span>*</span>
                    </span>
                    <input
                      required
                      placeholder={t("Partners.firstNamePlaceholder")}
                      type="text"
                      className="simple-input"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    {showValidationError && firstName.length === 0 && <ValidationError text="First Name can't be blank" />}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label className="input">
                    <span className="input__label">
                      {t("Partners.lastNameLabel")}<span>*</span>
                    </span>
                    <input
                      required
                      placeholder={t("Partners.lastNamePlaceholder")}
                      type="text"
                      className="simple-input"
                      value={lastName}
                      onChange={event => setLastName(event.target.value)} />
                    {showValidationError && lastName.length === 0 && <ValidationError text="Last Name can't be blank" />}
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="input">
                <span className="input__label">{t("Partners.emailLabel")}</span>
                <input
                  placeholder={t("Partners.emailPlaceholder")}
                  type="text"
                  className="simple-input"
                  value={email}
                  onChange={event => setEmail(event.target.value)} />
              </label>
            </div>
            <div className="row" />
            <div className="row" />
            <div className="row" />
            <div className="row">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label className="input">
                    <span className="input__label">{t("Partners.mobilePhoneLabel")}</span>
                    <input
                      inputMode="numeric"
                      placeholder={t("Partners.mobilePhonePlaceholder")}
                      className="simple-input"
                      type="text"
                      value={contactNumber}
                      onChange={event => setContactNumber(event.target.value)} />
                  </label>
                </div>
              </div>
            </div>
            <div className="row" />
            <div className="row" />
          </div>
          <div className="col-md-5 col-xl-4 page__column">
            <div className="image-upload">
              <div className="image-upload__header">
                <span className="input__label my-2">{t("UserRegistration.profilePhoto")}</span>
              </div>
              {selectedProfilePhoto
                ?
                <img
                  className="image-upload__profile-image"
                  src={selectedProfilePhoto} alt='partners' />
                :
                <label className="image-upload__profile-photo">
                  <img
                    className="image-upload__logo-image"
                    src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/5bfd0c77f2db530b34c9.svg"
                    alt="partners" />
                  <input
                    type="file"
                    className="image-upload__file-input"
                    accept=".png, .jpg, .jpeg"
                    onChange={event => handleUploadPhoto(event.target.files[0])} />
                </label>}
              <div className="image-upload__button-set">
                <label type="file" className="btn btn_secondary me-2">
                  <input
                    type="file"
                    className="image-upload__file-input"
                    accept=".png, .jpg, .jpeg"
                    onChange={event => handleUploadPhoto(event.target.files[0])} />
                  <span className="btn__text">{t("upload")}</span>
                </label>
                <span className={selectedProfilePhoto ? "btn btn_red me-2" : "btn btn_disabled btn_red me-2"} onClick={() => setSelectedProfilePhoto("")}>
                  <span className="btn__text">{t("delete")}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="button-set">
          <button type="button" className="btn btn_secondary" onClick={() => navigate('/partners')}>
            <span className="btn__text">{t("cancel")}</span>
          </button>
          <button type="submit" className="btn" onClick={handleNewPartnerSubmit}>
            <span className="btn__text">{t("Partners.createPartner")}</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default NewPartnerBody;