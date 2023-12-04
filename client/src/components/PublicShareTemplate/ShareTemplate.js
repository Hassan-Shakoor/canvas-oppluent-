import React from "react";
import { useLocation } from "react-router-dom";

const DesignPublicShare = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  return (
    <div className="design-public-share">
      <div className="design-public-share__content">
        <div
          className="design-public-share__left-border"
          style={{
            background: "linear-gradient(rgb(202, 182, 125), rgb(31, 31, 31))",
          }}
        ></div>
        <div className="button-set button-set_right mb-3">
          <a href={`${currentPath}`} download className="btn__text">
            <button type="button" className="btn btn">
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
        <img
          className="design-public-share__design-image"
          src={`${currentPath}`}
          alt="Template"
        />
      </div>
    </div>
  );
};

export default DesignPublicShare;
