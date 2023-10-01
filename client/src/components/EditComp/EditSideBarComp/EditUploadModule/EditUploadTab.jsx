// ** React Import
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { fetchImagesPixabay } from "../../../../api/pixabay";

// ** Custom Components Import
import { UploadImageBox, UploadImageLinear } from "./EditUploadImage";
import EditGrid, { ImageGrid } from "./EditGrid";
import EditUploadSearch from "./EditUploadSearch";

// ** Store
import { useSelector } from "react-redux";
import { selectOpenDrawer } from "../../../../store/app/Edit/EditDrawer";

import { list, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../FirebaseAuthComp/firebase";

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
  },
];

function EditUploadTab() {
  // ** States
  const [showPanel, setShowPanel] = useState("default");
  const [imgContainer, setImgContainer] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const storageRef = ref(storage);

  // ** Hooks
  const openDrawer = useSelector(selectOpenDrawer);

  // ** Vars
  const searchMap = {
    ["pixabay"]: {
      placeholder: "Search Pixabay for Copyright Free Media",
      data: imgContainer,
    },
    ["default"]: {
      placeholder: "Search Pixabay for Copyright Free Media",
      data: multiMediaBtnJSON,
    },
    ["My Uploads"]: {
      placeholder: "Search in My Uploads",
      data: multiMediaBtnJSON,
    },
    ["Shapes"]: { placeholder: "Search in Shapes", data: multiMediaBtnJSON },
    ["Claircius Logo"]: {
      placeholder: "Search in Claircius Logo",
      data: multiMediaBtnJSON,
    },
    ["Social Media Icons"]: {
      placeholder: "Search in Social Media Icons",
      data: multiMediaBtnJSON,
    },
  };

  const handleBack = () => {
    setShowPanel("default");
    setImgContainer([]);
  };

  useEffect(() => {
    // List all files in the storage bucket
    list(storageRef)
      .then((res) => {
        const imagePromises = res.items.map((itemRef) =>
          getDownloadURL(itemRef)
        );
        // Wait for all download URLs to resolve
        Promise.all(imagePromises)
          .then((urls) => {
            // Set the image URLs in the state
            setImageUrls(urls);
          })
          .catch((error) => {
            console.error("Error getting download URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing files:", error);
      });
  }, [showPanel]);

  return (
    <div
      className={
        openDrawer === "Uploads"
          ? "sidebar-module vertical-switch-content-enter-done"
          : "sidebar-module vertical-switch-content-exit-done"
      }
    >
      <div className="media-library">
        {showPanel !== "default" && showPanel !== "pixabay" ? (
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
          setShowPanel={setShowPanel}
          setImgContainer={setImgContainer}
        />
        {showPanel === "default" && (
          <div className="sidebar-module__title">Multimedia</div>
        )}
        {showPanel !== "default" && showPanel !== "pixabay" && (
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
                {showPanel == "My Uploads" && imageUrls.length > 0 ? (
                  <ImageGrid imageUrls={imageUrls} />
                ) : (
                  <EditGrid
                    searchMap={searchMap}
                    showPanel={showPanel}
                    setShowPanel={setShowPanel}
                  />
                )}
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
  );
}

export default EditUploadTab;
