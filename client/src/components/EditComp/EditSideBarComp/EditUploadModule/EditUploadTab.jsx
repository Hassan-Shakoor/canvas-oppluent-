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

// ** Vars
const multiMediaBtnJSON = [
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
];
const Modes = {
  Pixabay:'pixabay',
  Main: 'default',
  MyUploads: 'My Uploads',
  Shapes: 'Shapes',
  Icons: 'Social Media Icons',
  Logo: "Claircius Logo"
}

function EditUploadTab() {
  // ** States
  const [showPanel, setShowPanel] = useState(Modes.Main);
  const [imgContainer, setImgContainer] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchMap, setSearchMap] = useState({
    [Modes.Pixabay]: {
      placeholder: "Search Pixabay for Copyright Free Media",
      data: imgContainer,
    },
    [Modes.Main]: {
      placeholder: "Search Pixabay for Copyright Free Media",
      data: multiMediaBtnJSON,
    },
    [Modes.MyUploads]: {
      placeholder: "Search in My Uploads",
      data: imgContainer,
    },
    [Modes.Shapes]: { placeholder: "Search in Shapes", data: multiMediaBtnJSON },
    [Modes.Logo]: {
      placeholder: "Search in Claircius Logo",
      data: multiMediaBtnJSON,
    },
    [Modes.Icons]: {
      placeholder: "Search in Social Media Icons",
      data: multiMediaBtnJSON,
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
          const urls = await getUploadImage(); 
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
  }, [showPanel]);

  useEffect(() => {
    const mlsBtnExists = multiMediaBtnJSON.some((item) => item.title === mlsPropertyInfo.street)
    
    if (useMlsInfo){
      !mlsBtnExists && multiMediaBtnJSON.push({
        title:mlsPropertyInfo.street,
        icon:"ph:house"})
     const updatedSearchMap = {...searchMap}
    
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
      },[Modes.MyUploads]: {
        placeholder: "Search in My Uploads",
        data: imgContainer,
      },
    }))
  },[imgContainer])

  return (
    <>
    {loading ? <SpinnerContainer loading={loading}/> :
    <div
      className={
        openDrawer === "Uploads"
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
          <UploadImageBox />
        )}
        <EditUploadSearch
          showPanel={showPanel}
          searchMap={searchMap}
          setLoading = {setLoading}
          setShowPanel={setShowPanel}
          setImgContainer={setImgContainer}
        />
        {showPanel === Modes.Main && (
          <div className="sidebar-module__title">Multimedia</div>
        )}
        {showPanel !== Modes.Main && showPanel !== Modes.Pixabay && (
          <UploadImageLinear />
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
                <EditGrid
                  searchMap={searchMap}
                  showPanel={showPanel}
                  setShowPanel={setShowPanel}
                />
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
    </div>}
    </>
  );
}

export default EditUploadTab;
