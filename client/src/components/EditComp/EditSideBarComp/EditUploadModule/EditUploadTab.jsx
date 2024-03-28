// ** React Import
import React, { useState, useEffect } from "react";

// ** Service
import getUploadImage from '../../../../services/firebase/getUploadImg'

// ** Custom Components Import
import { UploadImageBox, UploadImageLinear } from "./EditUploadImage";
import EditGrid from "./EditGrid";
import EditUploadSearch from "./EditUploadSearch";
import SpinnerContainer from "../../../Loader/SpinnerContainer";

// ** Store
import { useSelector } from "react-redux";
import { selectOpenDrawer } from "../../../../store/app/Edit/EditDrawer";
import { selectMlsPropertyInfo, selectUseMlsInfo } from "../../../../store/app/PropertySearch/property";
import { CLAIRCIUS_LOGO, SHAPES, SOCIAL_MEDIA_ICONS } from "../../../../shared/constant";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../configs/firebase";
import { selectUID } from "../../../../store/app/User/userPreference";
import getUploadImages from "../../../../services/getUploadImages";

// ** Vars
const Modes = {
  Pixabay: 'pixabay',
  Main: 'default',
  MyUploads: 'My Uploads',
  Shapes: 'Shapes',
  Icons: 'Social Media Icons',
  Logo: "Claircius Logo"
}

function EditUploadTab() {

  const userId = useSelector(selectUID);
  // ** States
  const [showPanel, setShowPanel] = useState(Modes.Main);
  const [imgContainer, setImgContainer] = useState([]);
  const [shapesContainer, setShapesContainer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [triggerRender, setTriggerRender] = useState(false);
  const [multiMediaBtn, setMultiMediaBtn] = useState([
    {
      title: "My Uploads",
      icon: "bi:upload",
    },
    {
      title: "Shapes",
      icon: "fluent-mdl2:shapes",
    },
    {
      title: "Claircius Logo",
      icon: "ph:folder-open",
    },
    {
      title: "Social Media Icons",
      icon: "ph:folder-open",
    }
  ])
  const [searchMap, setSearchMap] = useState({
    [Modes.Pixabay]: {
      placeholder: "Search Pixabay for Copyright Free Media",
      data: imgContainer,
    },
    [Modes.Main]: {
      placeholder: "Search Pixabay for Copyright Free Media",
      data: multiMediaBtn,
    },
    [Modes.MyUploads]: {
      placeholder: "Search in My Uploads",
      data: imgContainer,
    },
    [Modes.Shapes]: {
      placeholder: "Search in Shapes",
      data: SHAPES
    },
    [Modes.Logo]: {
      placeholder: "Search in Claircius Logo",
      data: CLAIRCIUS_LOGO,
    },
    [Modes.Icons]: {
      placeholder: "Search in Social Media Icons",
      data: SOCIAL_MEDIA_ICONS,
    },
  })

  // ** Hooks
  const openDrawer = useSelector(selectOpenDrawer);

  // ** Vars
  const useMlsInfo = useSelector(selectUseMlsInfo)
  const mlsPropertyInfo = useSelector(selectMlsPropertyInfo)


  const handleBack = () => {
    setShowPanel(Modes.Main);
    setImgContainer([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (showPanel === Modes.MyUploads) {
        try {
          const urls = await getUploadImages(userId);
          setImgContainer(urls);
          setLoading(false)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false)
    };

    setLoading(true)
    fetchData();
  }, [showPanel, triggerRender]);

  useEffect(() => {
    // Fix for multiMediaBtn not array error
    if (!Array.isArray(multiMediaBtn)) return
    // Checking if mls button for property is not already created
    const mlsBtnExists = multiMediaBtn?.some((item) => item.title === mlsPropertyInfo.street)
    if (mlsBtnExists) return
    if (useMlsInfo) {
      setMultiMediaBtn(multiMediaBtn.push({
        title: mlsPropertyInfo.street,
        icon: "ph:house"
      }))

      const updatedSearchMap = { ...searchMap }

      updatedSearchMap[mlsPropertyInfo.street] = {
        placeholder: `Search in ${mlsPropertyInfo.street}`,
        data: mlsPropertyInfo.selectedImages,
      };

      setSearchMap(updatedSearchMap)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMlsInfo, openDrawer])

  //  Update Search Map with new imgContainer
  useEffect(() => {
    setSearchMap(prevSearchMap => ({
      ...prevSearchMap,
      [Modes.Pixabay]: {
        ...prevSearchMap[Modes.Pixabay],
        data: imgContainer,
      }, [Modes.MyUploads]: {
        placeholder: "Search in My Uploads",
        data: imgContainer,
      },
    }))
  }, [imgContainer])

  return (
    <>
      <div
        className={
          openDrawer === "Uploads" || openDrawer === "UploadBG"
            ? "sidebar-module vertical-switch-content-enter-done"
            : "sidebar-module vertical-switch-content-exit-done"
        }
      >
        <div className="media-library">
          {showPanel !== Modes.Main && showPanel !== Modes.Pixabay ? (
            <button
              type="button"
              className="btn btn_gray btn_back-button mb-2"
              onClick={handleBack}
            >
              <svg className="icon v1-icon v1-icon-chevron-left-light">
                <use
                  href="#v1-icon-chevron-left-light"
                  xlinkHref="#v1-icon-chevron-left-light"
                />
              </svg>
              <span className="btn__text">Back</span>
            </button>
          ) : (
            <UploadImageBox userId={userId} triggerRender={triggerRender} setTriggerRender={setTriggerRender} />
          )}
          <EditUploadSearch
            showPanel={showPanel}
            searchMap={searchMap}
            setLoading={setLoading}
            setShowPanel={setShowPanel}
            setImgContainer={setImgContainer}
          />
          {showPanel === Modes.Main && (
            <div className="sidebar-module__title">Multimedia</div>
          )}
          {showPanel !== Modes.Main && showPanel !== Modes.Pixabay && (
            <UploadImageLinear userId={userId} triggerRender={triggerRender} setTriggerRender={setTriggerRender} />
          )}
          <div className="sidebar-module__divider" />
          <div className="media-library__container-wrapper">
            <div
              className="media-library__container"
              id="library-scroll-target-c8fc07b7-7e3d-4249-afe9-681c698f89e7"
            >
              <span>
                <div className="m-auto mb-3 upload-multimedia-container">
                  {/* {showPanel == "My Uploads" && imageUrls.length > 0 ? (
                  <ImageGrid imageUrls={imageUrls} />
                ) : ( */}
                  {loading ? <SpinnerContainer loading={loading} /> :

                    <EditGrid
                      searchMap={searchMap}
                      showPanel={showPanel}
                      setShowPanel={setShowPanel}
                    />}
                  {/* )} */}
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="media-library-terms">
          <div>
            Maxa Designs, Inc. does not claim any ownership rights to your
            content.
          </div>
          <div>
            By uploading, you hereby expressly acknowledge and agree that your
            content complies with our{" "}
            <a
              className="text-info text-no-decoration fw-bolder"
              href="/terms_of_use"
              target="_blank"
              data-reactroot=""
            >
              Terms of Use
            </a>{" "}
            and does not infringe any third party rights.
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUploadTab;
