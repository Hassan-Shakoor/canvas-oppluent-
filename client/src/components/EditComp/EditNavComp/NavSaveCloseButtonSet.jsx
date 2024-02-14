import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

// ** Utils
import { getCanvasRef, serializeCanvasContainer } from "../../../shared/utils/fabric";

// ** Store
import { selectTemplateData, updateFabricData } from "../../../store/app/Edit/Canvas/canvas";

// ** Services
import { updateTemplateJsonData } from "../../../services/firebase/updateTemplateJsonData";
import { getLocalStorage } from "../../../services/localStorage";

// ** Constant
import { LOCAL_STORAGE } from "../../../shared/constant";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { selectProfile } from "../../../store/app/AccountInformation/profile";
import { publishTemplate } from "../../../services/firebase/publishTemplate";

function NavSaveCloseButtonSet() {
  const navigate = useNavigate();
  // vars 
  const dispatch = useDispatch()
  const templateData = useSelector(selectTemplateData);
  const userProfile = useSelector(selectProfile);

  const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSaveCheck = () => {
    if (userProfile.isAdmin) {
      if (!templateData.published) {
        setShowConfirmationModal(true);
        return;
      }
    }
    handleSave();
  }

  const handleSave = async () => {
    const canvasContainer = getCanvasRef()
    const serializedData = serializeCanvasContainer(canvasContainer)
    dispatch(updateFabricData(serializedData))
    const updatedData = { ...templateData, fabricData: serializedData }
    await updateTemplateJsonData(userData?.uid, updatedData)
    toast.success("Changes Saved Successfully.")
  }

  const handlePublish = async () => {
    const canvasContainer = getCanvasRef()
    const serializedData = serializeCanvasContainer(canvasContainer)
    dispatch(updateFabricData(serializedData))
    const updatedData = { ...templateData, fabricData: serializedData }
    await updateTemplateJsonData(userData?.uid, updatedData)
    await publishTemplate(userData?.uid, updatedData)
    toast.success("Template Published Successfully.")
  }

  const handleClose = async () => {
    navigate('/')
  }

  return (<>
    <ul className="header__button-set">
      <li className="header__text-button header__save-button" data-test="save-button" onClick={handleSaveCheck}>
        Save
      </li>
      <li className="header__text-button" data-test="close-button" onClick={handleClose}>
        Close
      </li>
    </ul>
    {
      showConfirmationModal &&
      <ConfirmationModal
        title={"Publish Template Confirmation"}
        body={"Do you want to publish this template?"}
        secondaryBtnTxt={"Cancel"}
        primaryBtnTxt={"Publish"}
        close={() => { setShowConfirmationModal(false) }}
        submit={(event) => handlePublish(event)}
      />
    }
  </>
  )
}

export default NavSaveCloseButtonSet;