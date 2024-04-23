import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { fabric } from 'fabric';

// ** Utils
import { getCanvasRef, serializeCanvasContainer } from "../../../shared/utils/fabric";

// ** Store
import { selectTemplateData, updateFabricData } from "../../../store/app/Edit/Canvas/canvas";

// ** Services
import { updateTemplateJsonData } from "../../../services/firebase/TemplateServices/updateTemplateJsonData";
import { getLocalStorage } from "../../../services/localStorage";

// ** Constant
import { LOCAL_STORAGE } from "../../../shared/constant";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { selectProfile } from "../../../store/app/AccountInformation/profile";
import { publishTemplate } from "../../../services/firebase/TemplateServices/publishTemplate";
import SpinnerOverlay from "../../Loader/SpinnerOverlay";
import { getUserInformation } from "../../../services/firebase/getUserInformation";
import uploadTemplateImage from "../../../services/uploadTemplateImage";
import { useTranslation } from 'react-i18next';

function NavSaveCloseButtonSet() {
  const { t } = useTranslation()

  const navigate = useNavigate();
  const location = useLocation();

  // vars 
  const dispatch = useDispatch()
  const templateData = useSelector(selectTemplateData);


  const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUserInfo = async () => {
    const userProfile = await getUserInformation()
    if (userProfile) {
      setIsAdmin(userProfile?.isAdmin);
      // console.log(userProfile)
    }
  }

  const copyFabricCanvas = async (originalCanvas) => {
    // Create a new fabric canvas with the same properties as the original
    const copyCanvas = new fabric.Canvas(null, {
      width: originalCanvas.width,
      height: originalCanvas.height,
      backgroundColor: originalCanvas.backgroundColor,
      backgroundImage: originalCanvas.backgroundImage ? originalCanvas.backgroundImage : null
      // Add any other properties you need to copy
    });

    // Clone objects from the original canvas to the copy canvas
    await originalCanvas.getObjects().forEach(obj => {
      const clonedObj = fabric.util.object.clone(obj);
      copyCanvas.add(clonedObj);
    });

    return copyCanvas;
  };

  const handleSaveCheck = () => {
    if (isAdmin) {
      if (!templateData.published) {
        setShowConfirmationModal(true);
        return;
      }
    }
    else {
    }
    handleSave();
  }

  const handleSave = async () => {
    setLoading(true);
    const canvasContainer = getCanvasRef()

    const templateImageUrls = [];

    // Iterate through each canvas element in the canvasContainer array
    for (let i = 0; i < canvasContainer.length; i++) {
      const canvas = canvasContainer[i];

      const copiedCanvas = await copyFabricCanvas(canvas);

      // Reset the dimensions and zoom of the copied canvas
      const scaleFactor = canvas.getZoom();
      copiedCanvas.setDimensions({
        width: canvas.width / scaleFactor,
        height: canvas.height / scaleFactor
      });
      copiedCanvas.setZoom(1);

      // Get the data URL of the canvas
      const dataURL = copiedCanvas.toDataURL({
        format: "png",
        quality: 1,
      });

      // Convert the data URL to a Blob
      const blob = await fetch(dataURL).then((res) => res.blob());

      // Upload the template image and get the URL
      const templateImageUrl = await uploadTemplateImage(blob, templateData.id, i);

      // Push the template image URL to the array
      if (templateImageUrl) {
        templateImageUrls.push(templateImageUrl);
      } else {
        toast.error(t("EditHeader.savedError"));
        setLoading(false);
        setShowConfirmationModal(false);
        return;
      }
    }

    const serializedData = serializeCanvasContainer(canvasContainer)
    dispatch(updateFabricData(serializedData))
    const updatedData = { ...templateData, fabricData: serializedData }
    await updateTemplateJsonData(userData?.uid, updatedData, templateImageUrls)
    toast.success(t("EditHeader.savedSuccess"))
    setLoading(false);
  }

  const handlePublish = async (event) => {
    setLoading(true);
    event.preventDefault()
    const canvasContainer = getCanvasRef()

    const templateImageUrls = [];

    // Iterate through each canvas element in the canvasContainer array
    for (let i = 0; i < canvasContainer.length; i++) {
      const canvas = canvasContainer[i];

      const copiedCanvas = await copyFabricCanvas(canvas);

      // Reset the dimensions and zoom of the copied canvas
      const scaleFactor = canvas.getZoom();
      copiedCanvas.setDimensions({
        width: canvas.width / scaleFactor,
        height: canvas.height / scaleFactor
      });
      copiedCanvas.setZoom(1);

      // Get the data URL of the canvas
      const dataURL = copiedCanvas.toDataURL({
        format: "png",
        quality: 1,
      });

      // Convert the data URL to a Blob
      const blob = await fetch(dataURL).then((res) => res.blob());

      // Upload the template image and get the URL
      const templateImageUrl = await uploadTemplateImage(blob, templateData.id, i);

      // Push the template image URL to the array
      if (templateImageUrl) {
        templateImageUrls.push(templateImageUrl);
      } else {
        toast.error(t("EditHeader.savedError"));
        setLoading(false);
        setShowConfirmationModal(false);
        return;
      }
    }

    const serializedData = serializeCanvasContainer(canvasContainer)
    dispatch(updateFabricData(serializedData))
    const updatedData = { ...templateData, fabricData: serializedData }
    const response = await publishTemplate(userData?.uid, updatedData, templateImageUrls)
    if (!response) {
      setLoading(false);
      setShowConfirmationModal(false)
      toast.error(t("EditHeader.publishTemplateError"))
      return;
    }
    await updateTemplateJsonData(userData?.uid, updatedData, templateImageUrls)
    toast.success(t("EditHeader.publishTemplateSuccess"));
    setLoading(false);
    setShowConfirmationModal(false)
  }

  const handleClose = async () => {

    // Check if we can navigate back
    const canGoBack = location.key !== 'default';
    if (canGoBack) {
      navigate(-1)
    } else {
      navigate('/')
    }

  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (<>
    <ul className="header__button-set">
      <li className="header__text-button header__save-button" data-test="save-button" onClick={() => handleSaveCheck()}>
        {t("save")}
      </li>
      <li className="header__text-button" data-test="close-button" onClick={() => handleClose()}>
        {t("close")}
      </li>
    </ul>
    <SpinnerOverlay loading={loading} />
    {
      showConfirmationModal &&
      <ConfirmationModal
        title={<p style={{ color: '#000', margin: 0 }}>{t("EditHeader.publishTemplateConfirmation")}</p>}
        body={<p style={{ color: '#000', margin: 0 }}>{t("EditHeader.wantToPublish")}</p>}
        secondaryBtnTxt={t("cancel")}
        primaryBtnTxt={t("publish")}
        close={() => { setShowConfirmationModal(false) }}
        submit={(event) => handlePublish(event)}
      />
    }
  </>
  )
}

export default NavSaveCloseButtonSet;