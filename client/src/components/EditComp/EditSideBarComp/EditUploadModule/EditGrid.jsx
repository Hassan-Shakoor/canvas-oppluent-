// ** React Import
import React from "react";

// ** Icon Import
import {Icon} from "@iconify/react";

function EditGrid({searchMap, showPanel, setShowPanel}) {;
  return (searchMap[showPanel].data
    ?.map((item, index) => {
      return (showPanel === 'default'
        ? (
          <div
            key={index}
            className="media-library__item-container"
            onClick={() => setShowPanel(item.title)}>
            <div className="media-library__folder">
              <div className="media-library__folder-preview" title={item.title}>
                <div className="media-library__folder-icon">
                  <Icon icon={item.icon} width='1.0rem' height='1.0rem'/>
                </div>
                <div className="media-library__folder-title">{item.title}</div>
              </div>
            </div>
          </div>
        )
        : (
          <div
            className="media-library__item-container" key={item.id}>
            <div className="media-library__image" >
              <img
                className="media-library__image-thumbnail"
                src={item.webformatURL}
                alt="spring bird, bird, tit"/>
            </div>
          </div>

        ));
    }))
}

export default EditGrid