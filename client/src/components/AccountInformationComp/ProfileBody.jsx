import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

// ** Custom Component
import WarningModal from "../Modal/WarningModal";

// TODO: Change this hardcode default value once API for user info implemented.
import {
  saveProfile,
  fetchProfile,
} from "../../store/app/AccountInformation/profile";
import { toast } from "react-toastify";
import { isEmailValid } from "../../shared/constant";
import { set } from "lodash";
import InputModal from "../Modal/InputModal";
import { auth } from "../../configs/firebase";
import { updateUserEmail } from "../../services/firebase/updateUserInformation";
import { getUserInformation } from "../../services/firebase/getUserInformation";

function ProfileBody({ profile }) {
  // ** State
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [contactNo, setContactNo] = useState(profile.contactNo);
  const [base64Image, setBase64Image] = useState(profile.profileImage)
  const [selectedUploadProfile, setSelectedUploadFile] = useState(

  );
  const [isChanged, setIsChanged] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const dispatch = useDispatch();

  const { t } = useTranslation()

  // ** Vars
  const navigate = useNavigate();

  const handleSave = () => {
    const data = {
      firstName,
      lastName,
      email,
      contactNo,
      profileImage: !!selectedUploadProfile
        ? URL.createObjectURL(selectedUploadProfile)
        : "",
    };

    if (email && email !== profile.email && isEmailValid.test(email)) {
      setShowInputModal(true);
    } else {
      dispatch(saveProfile(data));
      toast.success(t("accountInfo.profileChangedSuccess"))
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());

    const getAndSetUserData = async () => {
      const userData = await getUserInformation();
      setFirstName(userData.firstName);
      setLastName(userData.lastName)
      setEmail(userData.email);
      setContactNo(userData.contactNo);
      setBase64Image(userData.profileImage)
    }

    getAndSetUserData()

  }, [dispatch, loading]);
  return (
    <>
      <div className="pt-4">
        <div className="row">
          <div className="col col-md-7 page__column">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label className="input input_has-value">
                    <span className="input__label">
                      {t("accountInfo.firstNameLabel")}<span>*</span>
                    </span>
                    <input
                      required
                      placeholder={t("accountInfo.firstNamePlaceholder")}
                      type="text"
                      className="simple-input"
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                        setIsChanged(true);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label className="input input_has-value">
                    <span className="input__label">
                      {t("accountInfo.lastNameLabel")}<span>*</span>
                    </span>
                    <input
                      required
                      placeholder={t("accountInfo.lastNamePlaceholder")}
                      type="text"
                      className="simple-input"
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value);
                        setIsChanged(true);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="input">
                <span className="input__label">
                  {t("accountInfo.profileEmailLabel")}
                </span>
                <input
                  placeholder={t("accountInfo.profileEmailPlaceholder")}
                  type="text"
                  className="simple-input"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setIsChanged(true);
                  }}
                />
              </label>
            </div>
            <div className="row" />
            <div className="row" />
            <div className="row">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label className="input">
                    <span className="input__label">{t("accountInfo.mobilePhoneLabel")}</span>
                    <input
                      placeholder={t("accountInfo.mobilePhonePlaceholder")}
                      type="text"
                      className="simple-input"
                      value={contactNo}
                      onChange={(event) => {
                        setContactNo(event.target.value);
                        setIsChanged(true);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="row" />
            <div className="row" />
          </div>
          <div className="col-md-5 page__column">
            <div className="image-upload">
              <div className="image-upload__header">
                <span className="input__label my-2">{t("accountInfo.profilePhotoLabel")}</span>
              </div>
              <div className="image-upload__profile-photo">

                {base64Image ?
                  <img
                    className="image-upload__logo-image"
                    src={base64Image}
                    alt="partners"
                  /> :
                  <img
                    className="image-upload__logo-image"
                    src={'https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/5bfd0c77f2db530b34c9.svg'}
                    style={{ width: '50px', height: '50px' }}
                    alt="partners"
                  />}
                <input
                  type="file"
                  multiple={false}
                  className="image-upload__file-input"
                  accept=".png, .jpg, .jpeg"
                  autoComplete="off"
                  onChange={(event) => {
                    // console.log('Profile Image: ', event.target.files[0])
                    if (event.target.files[0]) {
                      const reader = new FileReader();

                      reader.onloadend = () => {
                        // The result contains the base64 image data
                        const base64ImageData = reader.result;
                        setBase64Image(base64ImageData);
                        // console.log(base64ImageData)
                      };

                      // Read the file as a data URL (base64)
                      reader.readAsDataURL(event.target.files[0]);
                    }
                    setSelectedUploadFile(event.target.files[0])
                    setIsChanged(true);
                  }}
                />
              </div>
              <div className="image-upload__button-set">
                <label type="file" className="btn btn_secondary me-2">
                  <input
                    type="file"
                    multiple={false}
                    className="image-upload__file-input"
                    accept=".png, .jpg, .jpeg"
                    autoComplete="off"
                    onChange={(event) => {
                      // console.log('Profile Image: ', event.target.files[0])
                      if (event.target.files[0]) {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                          // The result contains the base64 image data
                          const base64ImageData = reader.result;
                          setBase64Image(base64ImageData);
                          // console.log(base64ImageData)
                        };

                        // Read the file as a data URL (base64)
                        reader.readAsDataURL(event.target.files[0]);
                      }
                      setSelectedUploadFile(event.target.files[0])
                      setIsChanged(true);
                    }}
                  />
                  <span className="btn__text">{t("upload")}</span>
                </label>
                <span className={`btn btn_red me-2 ${base64Image ? '' : 'btn_disabled'}`} onClick={() => { setSelectedUploadFile(null); setBase64Image(null) }}>
                  <span className="btn__text">{t("delete")}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="button-set">
          <button
            type="button"
            className="btn btn_secondary"
            onClick={() => {
              isChanged ? setShowWarning(true) : navigate("/categories");
            }}
          >
            <span className="btn__text">{t("cancel")}</span>
          </button>
          <button type="submit" className="btn" onClick={handleSave}>
            <span className="btn__text">{t("save")}</span>
          </button>
        </div>
      </div>
      {showWarning && (
        <WarningModal
          title="Warning!"
          body={"Changes that you made may not be saved, do you want to leave?"}
          secondayBtnTxt={"Cancel"}
          primaryBtnTxt={"Ok"}
          onClose={() => setShowWarning(false)}
          handleSecodnaryBtn={() => setShowWarning(false)}
          handlePrimaryBtn={() => navigate("/categories")}
        />
      )}
      {showInputModal && (
        <InputModal
          title="Enter your current password"
          body={
            <div className="password-input">
              <label className="input">
                <span className="input__label">{t("accountInfo.currentPasswordLabel")}</span>
                <input
                  placeholder={t("accountInfo.currentPasswordPlaceholder")}
                  type="password"
                  className="simple-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <span className="password-input__icon-wrapper">
                  <i className="icon icon-eye password-input__icon" />
                </span>
              </label>
            </div>
          }
          secondayBtnTxt={t("cancel")}
          primaryBtnTxt={t("submit")}
          onClose={() => setShowInputModal(false)}
          handleSecodnaryBtn={() => setShowInputModal(false)}
          handlePrimaryBtn={async (e) => {
            e.preventDefault();
            const response = await updateUserEmail(email, currentPassword);
            if (response) {
              const data = {
                firstName,
                lastName,
                email,
                contactNo,
                profileImage: !!selectedUploadProfile
                  ? URL.createObjectURL(selectedUploadProfile)
                  : "",
              };
              dispatch(saveProfile(data));
              setShowInputModal(false);
              toast.success(t("accountInfo.profileChangedSuccess"))
            }
          }}
        />
      )}
    </>
  );
}

export default ProfileBody;
