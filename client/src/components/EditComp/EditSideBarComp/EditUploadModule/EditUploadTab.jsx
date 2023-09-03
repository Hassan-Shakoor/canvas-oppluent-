// ** React Import
import React, {useEffect, useState} from "react";
import _ from 'lodash'
import { fetchImagesPixabay } from "../../../../api/pixabay";

// ** Icon Import
import { Icon } from "@iconify/react";

// ** Custom Components Import
import {UploadImageBox,UploadImageLinear} from "./EditUploadImage";
import EditGrid from "./EditGrid";

// ** Vars
const multiMediaBtnJSON = [
  {
    title: 'My Uploads',
    icon: "bi:upload"
  }, {
    title: 'Shapes',
    icon: "fluent-mdl2:shapes"
  }, {
    title: 'Claircius Logo',
    icon: "ph:folder-open"
  }, {
    title: 'Social Media Icons',
    icon: "ph:folder-open"
  }
]

function EditUploadTab(props) {
  // ** States
  const [showPanel,setShowPanel] = useState('default')
  const [imgContainer,setImgContainer] = useState([])

  // ** Vars
  const searchMap = {
    ['pixabay'] : {placeholder:"Search Pixabay for Copyright Free Media" , data:imgContainer},
    ['default'] : {placeholder:"Search Pixabay for Copyright Free Media" , data:multiMediaBtnJSON},
    ['My Uploads']: {placeholder:"Search in My Uploads", data:multiMediaBtnJSON},
    ['Shapes'] : {placeholder: 'Search in Shapes', data:multiMediaBtnJSON},
    ['Claircius Logo'] : {placeholder:'Search in Claircius Logo', data:multiMediaBtnJSON},
    ['Social Media Icons'] : {placeholder:'Search in Social Media Icons', data:multiMediaBtnJSON}
  }

  const handleBack = () => {
    setShowPanel('default')
    setImgContainer([])
  }

  const searchChangeHandler = async (event) => {
    const inputValue = event.target.value;
    if (event.target.name === 'default') {
        const formattedInput = _.replace(_.trim(inputValue), /\s+/g, '+')
        try {
          const imagesResponse = await fetchImagesPixabay(formattedInput);
          setImgContainer(imagesResponse.data.hits);
          setShowPanel('pixabay');
        } catch (error) {
          console.error('Error fetching images:', error);
        }
    }
  };
  
  console.log(imgContainer);

  return (
    <div
      className={props.openDrawer === 'Uploads'
      ? "sidebar-module vertical-switch-content-enter-done"
      : "sidebar-module vertical-switch-content-exit-done"}>
      <div className="media-library">
        {showPanel !== 'default'
          ? <button type="button" className="btn btn_gray btn_back-button mb-2" onClick={handleBack}>
            <svg className="icon v1-icon v1-icon-chevron-left-light">
                <use
                  href="#v1-icon-chevron-left-light"
                  xlinkHref="#v1-icon-chevron-left-light"/>
              </svg>
              <span className="btn__text">Back</span>
            </button>
          : <UploadImageBox/>}
        <div className="input-group input-group_without-separators mb-2">
          <div className="small-search small-search_bordered">
            <div className="small-search__icon-wrapper">
              <Icon icon="ph:magnifying-glass" />
            </div>
            <div className="small-search__input">
              <input
                autoComplete="off"
                id="small-search"
                name={showPanel}
                placeholder={searchMap[showPanel].placeholder}
                type="search"
                className="simple-input"
                onChange={searchChangeHandler}/>
            </div>
          </div>
        </div>
        {showPanel === 'default' && <div className="sidebar-module__title">Multimedia</div>}
        {showPanel !== 'default' && showPanel !== 'pixabay' && <UploadImageLinear/>}
        <div className="sidebar-module__divider"/>
        <div className="media-library__container-wrapper">
          <div
            className="media-library__container"
            id="library-scroll-target-c8fc07b7-7e3d-4249-afe9-681c698f89e7">
            <span>
              <div className="m-auto mb-3 upload-multimedia-container">
                <EditGrid searchMap={searchMap} showPanel={showPanel} setShowPanel={setShowPanel} />
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className="media-library-terms">
        <div>
          Maxa Designs, Inc. does not claim any ownership rights to your content.
        </div>
        <div>
          By uploading, you hereby expressly acknowledge and agree that your content
          complies with our{" "}
          <a
            className="text-info text-no-decoration fw-bolder"
            href="/terms_of_use"
            target="_blank"
            data-reactroot="">
            Terms of Use
          </a>{" "}
          and does not infringe any third party rights.
        </div>
      </div>
    </div>
  )
}

export default EditUploadTab