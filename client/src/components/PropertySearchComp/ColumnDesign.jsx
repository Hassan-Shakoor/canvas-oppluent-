// ** Library
import React, { useCallback, useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

// ** Custom Component
import SlickSlider from "../Sliders/SlickSlider";
import PropertySearchPreview from "./PropertySearchPreview";

// ** Services
import { getTemplateJsonData } from "../../services/firebase/getTemplateData";
import { getLocalStorage } from "../../services/localStorage";
import { LOCAL_STORAGE } from "../../shared/constant";

function ColumnDesign() {
    // ** State
    const [showPreview, setShowPreview] = useState(false)
    const [images, setImages] = useState([
      '//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1610/image/original/4-Paged_Property_Brochure-0.jpg?1677558956',
      '//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1611/image/original/4-Paged_Property_Brochure-1.jpg?1677558957',
      '//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1612/image/original/4-Paged_Property_Brochure-2.jpg?1677558957',
      '//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1613/image/original/4-Paged_Property_Brochure-3.jpg?1677558958'
  ])

  // ** Vars
  const {id} = useParams()
  
  const fetchData = useCallback(async() => {
    const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)
    const response = await getTemplateJsonData(userData.uid,id)
    if(response){
      setImages([response.imageUrl])
    }
  },[id])

  useEffect(() => {
    fetchData()
  },[fetchData, id])

  return (
    <div className="col-md-4 page__column order-first order-md-last mb-3 mb-md-0">
      <h3 className="design-preview__title">Selected Design</h3>
      <div className="design-preview__slider-wrapper m-auto m-md-0">
        <SlickSlider images={images}/>
        <div className="react-slider__btn react-slider__btn_small mt-2 ms-auto" onClick={() => setShowPreview(true)}>
          <svg className="icon v2-icon v2-icon-expand-alt-light">
            <use
              href="#v2-icon-expand-alt-light"
              xlinkHref="#v2-icon-expand-alt-light"
            />
          </svg>
        </div>
      </div>
      {showPreview && <PropertySearchPreview close={() => setShowPreview(false)} images={images}/>}
    </div>
  );
}

export default ColumnDesign;