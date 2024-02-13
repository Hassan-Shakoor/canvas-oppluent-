import React from "react";
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

function NavSaveCloseButtonSet() {
  const navigate = useNavigate();
  // vars 
  const dispatch = useDispatch()
  const templateData = useSelector(selectTemplateData);
  const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

  const handleSave = async () => {
    const canvasContainer = getCanvasRef()
    const serializedData = serializeCanvasContainer(canvasContainer)
    dispatch(updateFabricData(serializedData))
    const updatedData = { ...templateData, fabricData: serializedData }
    await updateTemplateJsonData(userData?.uid, updatedData)
    toast.success("Changes successfully saved")
  }
  const handleClose = async () => {
    navigate('/')
  }

  return (
    <ul className="header__button-set">
      <li className="header__text-button header__save-button" data-test="save-button" onClick={handleSave}>
        Save
      </li>
      <li className="header__text-button" data-test="close-button" onClick={handleClose}>
        Close
      </li>
    </ul>
  )
}

export default NavSaveCloseButtonSet;