// ** React Import
import React from "react";

// ** Icon Import
import { Icon } from "@iconify/react";

import { fabric } from "fabric";

import { getCanvasRef, updateCanvasRef } from "../../../../shared/utils/fabric";

import { generateRandomId } from "../../../../shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas";
import { updateOpenDrawer } from "../../../../store/app/Edit/EditDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditGrid({ searchMap, showPanel, setShowPanel }) {

  const dispatch = useDispatch();
  const selectedCanvas = useSelector(selectSelectedCanvas);

  const handleUploadImage = (image) => {
    // const canvasArr = getCanvasRef();
    // const canvas = canvasArr[selectedCanvas];
    // const fabricText = new fabric.IText(text.trim(), {
    //   selectable: true,
    //   hasControls: true,
    //   id: generateRandomId()
    // });
    // canvas.add(fabricText);
    // canvas.setActiveObject(fabricText);
    // dispatch(updateOpenDrawer(null));
    // canvas.renderAll()
    // updateCanvasRef(canvasArr, selectedCanvas, canvas)
    // dispatch(updateText(''));

    console.log(searchMap);

    const canvasArr = getCanvasRef();
    const canvas = canvasArr[selectedCanvas];

    const maxWidth = 350;
    const maxHeight = 350;

    // Create a fabric.Image object with the provided image URL
    fabric.Image.fromURL(image, function (img) {

      const scaleToFitWidth = maxWidth / img.width;
      const scaleToFitHeight = maxHeight / img.height;
      const scale = Math.min(scaleToFitWidth, scaleToFitHeight);


      const canvasCenter = canvas.getCenter();

      img.set({
        left: canvasCenter.left,
        top: canvasCenter.top,
        selectable: true,
        hasControls: true,
        id: generateRandomId(),
        type: 'Image'
      });

      img.scale(scale);

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      updateCanvasRef(canvasArr, selectedCanvas, canvas);
      dispatch(updateOpenDrawer(null));
      // dispatch(updateText(''));
    });
  }

  return searchMap[showPanel]?.data?.map((item, index) => {
    return showPanel === "default" ? (
      <div
        key={index}
        className="media-library__item-container"
        onClick={() => setShowPanel(item.title)}
      >
        <div className="media-library__folder">
          <div className="media-library__folder-preview" title={item.title}>
            <div className="media-library__folder-icon">
              <Icon icon={item.icon} width="1.0rem" height="1.0rem" />
            </div>
            <div className="media-library__folder-title">{item.title}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="media-library__item-container" key={index}>
        <div className="media-library__image">
          {showPanel !== 'pixabay' && <label className="checkbox media-library__image-select">
            <input className="checkbox__input" type="checkbox" />
            <div className="checkbox__box">
              <div className="checkbox__tick">
                {/* <i className="icon icon-checkbox-regular" /> */}
                <FontAwesomeIcon icon="fa-solid fa-check" style={{ color: 'white', fontSize: '12px' }} />
              </div>
            </div>
          </label>}
          <img
            className="media-library__image-thumbnail"
            src={item.webformatURL || item}
            alt="spring bird, bird, tit"
            onClick={() => handleUploadImage(item)}
          />
        </div>
      </div>
    );
  });
}

export default EditGrid;
