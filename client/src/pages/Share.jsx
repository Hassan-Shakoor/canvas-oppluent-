// ** Library
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

// ** Custom Component
import SpinnerOverlay from "../components/Loader/SpinnerOverlay"

// ** Services
import getShareTemplateData from "../services/firebase/TemplateServices/getShareTemplateData";


const Share = () => {
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(false)
  const {userId, categoryId, templateId } = useParams();

  const getTemplateData = useCallback(async (userId, categoryId, templateId) => {
    setLoading(true)
    const response = await getShareTemplateData(userId, categoryId, templateId)
    if(response){
      setTemplateData(response)
    }
    setLoading(false)
  },[])

  useEffect(() => {
    getTemplateData(userId, categoryId, templateId)
  }, [userId, categoryId, templateId, getTemplateData])
  
  return (
    <>
      <SpinnerOverlay loading={loading}/>
      <div className="design-public-share">
        <div className="design-public-share__content">
          <div
            className="design-public-share__left-border"
            style={{
              background: "linear-gradient(rgb(202, 182, 125), rgb(31, 31, 31))",
            }}
          ></div>
          <div className="button-set button-set_right mb-3">
            <a href={`${templateData?.imageUrl}`} download className="btn__text">
              <button type="button" className="btn btn__text">
                <svg className="icon v2-icon v2-icon-download">
                  <use
                    href="#v2-icon-download"
                    xlinkHref="#v2-icon-download"
                  ></use>
                </svg>
                Download
              </button>
            </a>
          </div>
          {templateData?.storage_url.map(imageUrl => 
            <img
              className="design-public-share__design-image"
              src={`${imageUrl}`}
              alt="Template"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Share;
