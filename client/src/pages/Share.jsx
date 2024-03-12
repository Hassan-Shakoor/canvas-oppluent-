// ** Library
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

// ** Custom Component
import SpinnerOverlay from "../components/Loader/SpinnerOverlay"
import getShareTemplateData from "../services/firebase/TemplateServices/getShareTemplateData";
import { toast } from "react-toastify";

// ** Services



const Share = () => {
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(false)
  const { userId, categoryId, templateId } = useParams();

  const getTemplateData = useCallback(async (userId, categoryId, templateId) => {
    setLoading(true)
    const response = await getShareTemplateData(userId, categoryId, templateId)
    if (response) {
      setTemplateData(response)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getTemplateData(userId, categoryId, templateId)
  }, [userId, categoryId, templateId, getTemplateData])

  const downloadImage = () => {
    if (!templateData.storage_url || templateData?.storage_url.length <= 0) {
      toast.error("Error Downloading Image.")
      return;
    }
    // Create a new XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Set the responseType to 'blob'
    xhr.responseType = 'blob';

    // Open the request with the provided URL
    xhr.open('GET', templateData.storage_url[0]);

    // Set up the onload event to handle the downloaded image
    xhr.onload = () => {
      // Create a link element
      const link = document.createElement('a');

      // Create a Blob from the response
      const blob = new Blob([xhr.response], { type: 'image/png' });

      // Create a URL for the Blob and set it as the link's href
      link.href = window.URL.createObjectURL(blob);

      // Set the download attribute and filename
      link.download = templateData.cardTitle;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    };

    xhr.send();
  };

  return (
    <>
      <SpinnerOverlay loading={loading} />
      <div className="design-public-share">
        <div className="design-public-share__content">
          <div
            className="design-public-share__left-border"
            style={{
              background: "linear-gradient(rgb(202, 182, 125), rgb(31, 31, 31))",
            }}
          ></div>
          <div className="button-set button-set_right mb-3">
            {/* <a href={`${templateData?.imageUrl}`} download className="btn__text"> */}
            <button type="button" className="btn btn__text" onClick={downloadImage}>
              <svg className="icon v2-icon v2-icon-download">
                <use
                  href="#v2-icon-download"
                  xlinkHref="#v2-icon-download"
                ></use>
              </svg>
              Download
            </button>
            {/* </a> */}
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
