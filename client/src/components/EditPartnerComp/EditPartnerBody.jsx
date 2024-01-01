// ** Import Dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// ** Custom Component
import {toast} from 'react-toastify'
import SpinnerOverlay from '../Loader/SpinnerOverlay'
import ValidationError from "../ValidationErrorComp/ValidationError";

// ** Store
import { selectPartner, updatePartner, updatePartnerList } from "../../store/app/Partner/partner";

// ** Services
import uploadFileAndGetURL from "../../services/uploadFileAndGetURL";

function EditPartnerBody({id, partner}) {
    // ** State
    const [firstName, setFirstName] = useState(partner.firstName || "")
    const [lastName, setLastName] = useState(partner.lastName || "")
    const [email, setEmail] = useState(partner.email || "")
    const [contactNumber, setContactNumber] = useState(partner.contactNumber || "")
    const [selectedProfilePhoto, setSelectedProfilePhoto] = useState(partner.profilePhoto || "")
    const [showValidationError, setShowValidationError] = useState(false)
    const [loading, setLoading] = useState(false)

    // ** Vars
    const dispatch = useDispatch()
    const partnersList = useSelector(selectPartner)
    const navigate = useNavigate()


    const handleSavePartnerSubmit = () => {
        if (firstName.length === 0 || lastName.length === 0){
            setShowValidationError(true)
            toast.error("All required fields must be filled")
            return
        }

        const updatedPartner = {id : partner.id , firstName, lastName, email, contactNumber, profilePhoto: selectedProfilePhoto, primary: partner.primary}

        dispatch(updatePartner(updatedPartner))
        toast.success("Partner successfully updated")
        navigate('/partners')
      }

    const handleUploadPhoto = async (image) => {
      setLoading(true)
      try {
        const imageURL = await uploadFileAndGetURL(image)
        setSelectedProfilePhoto(imageURL)
      } catch (error) {
        toast.error("Failed to Upload Image")
        console.log(error)
      }
      setLoading(false)
    }

  return (
    <>
    {loading && <SpinnerOverlay loading={loading}/>}
    <div className="page__content">
      <div className="row">
        <div className="col col-md-7 col-xl-8 page__column">
          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <label className="input">
                  <span className="input__label">
                    First Name<span>*</span>
                  </span>
                  <input
                    required
                    placeholder="Enter partner First Name"
                    type="text"
                    className="simple-input"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    />
                  {showValidationError && firstName.length === 0 && <ValidationError text="First Name can't be blank"/>}
                </label>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb-3">
                <label className="input">
                  <span className="input__label">
                    Last Name<span>*</span>
                  </span>
                  <input
                    required
                    placeholder="Enter partner Last Name"
                    type="text"
                    className="simple-input"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}/>
                    {showValidationError && lastName.length === 0 && <ValidationError text="Last Name can't be blank"/>}
                </label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="input">
              <span className="input__label">Email</span>
              <input
                placeholder="Enter partner email"
                type="text"
                className="simple-input"
                value={email}
                onChange={event => setEmail(event.target.value)}/>
            </label>
          </div>
          <div className="row"/>
          <div className="row"/>
          <div className="row"/>
          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <label className="input">
                  <span className="input__label">Mobile Phone</span>
                  <input
                    inputMode="numeric"
                    placeholder="Enter partner mobile phone number"
                    className="simple-input"
                    type="text"
                    value={contactNumber}
                    onChange={event => setContactNumber(event.target.value)}/>
                </label>
              </div>
            </div>
          </div>
          <div className="row"/>
          <div className="row"/>
        </div>
        <div className="col-md-5 col-xl-4 page__column">
          <div className="image-upload">
            <div className="image-upload__header">
              <span className="input__label my-2">Profile Photo</span>
            </div>
            {selectedProfilePhoto 
            ?
            <img
              className="image-upload__profile-image"
              src={selectedProfilePhoto} alt= 'partners'/>  
            : 
            <label className="image-upload__profile-photo">
              <img
                className="image-upload__logo-image"
                src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/5bfd0c77f2db530b34c9.svg"
                alt="partners"/>
                <input
                type="file"
                className="image-upload__file-input"
                accept=".png, .jpg, .jpeg"
                onChange={event => handleUploadPhoto(event.target.files[0])}/>
            </label>}
            <div className="image-upload__button-set">
              <label type="file" className="btn btn_secondary me-2">
                <input
                    type="file"
                    className="image-upload__file-input"
                    accept=".png, .jpg, .jpeg"
                    onChange={event => handleUploadPhoto(event.target.files[0])}/>
                    <span className="btn__text">Upload</span>
              </label>
              <span className={selectedProfilePhoto ? "btn btn_red me-2" : "btn btn_disabled btn_red me-2"} onClick={() => setSelectedProfilePhoto("")}>
                <span className="btn__text">Delete</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="button-set">
        <button type="button" className="btn btn_secondary" onClick={() => navigate('/partners')}>
          <span className="btn__text">Cancel</span>
        </button>
        <button type="submit" className="btn" onClick={handleSavePartnerSubmit}>
          <span className="btn__text">Save</span>
        </button>
      </div>
    </div>
    </>
  )
}

export default EditPartnerBody;