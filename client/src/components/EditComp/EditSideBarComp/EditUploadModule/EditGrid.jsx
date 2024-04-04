// ** React Import
import React, { useState } from "react";

// ** Icon Import
import { Icon } from "@iconify/react";

import { fabric } from "fabric";

import { getCanvasRef, updateCanvasRef } from "../../../../shared/utils/fabric";

import { generateRandomId } from "../../../../shared/utils";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedCanvas, selectSelectedObject, updateSelectedObject } from "../../../../store/app/Edit/Canvas/canvas";
import { selectOpenDrawer, updateOpenDrawer } from "../../../../store/app/Edit/EditDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerContainer from "../../../Loader/SpinnerContainer";

function EditGrid({ searchMap, showPanel, setShowPanel }) {

  const dispatch = useDispatch();
  const selectedCanvas = useSelector(selectSelectedCanvas);
  const openDrawer = useSelector(selectOpenDrawer);
  const selectedObject = useSelector(selectSelectedObject);

  const [loading, setLoading] = useState(false);

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

    // console.log(searchMap);

    const canvasArr = getCanvasRef();
    const canvas = canvasArr[selectedCanvas];

    const maxWidth = 350;
    const maxHeight = 350;

    // TO Add the Image to Canvas

    if (openDrawer === 'Uploads') {

      if (selectedObject && selectedObject.type === 'Image') {
        fabric.Image.fromURL(image, function (img) {

          const scaleToFitWidth = selectedObject.width / (img.width / selectedObject.scaleX);
          const scaleToFitHeight = selectedObject.height / (img.height / selectedObject.scaleY);
          const scale = Math.min(scaleToFitWidth, scaleToFitHeight);


          const canvasCenter = canvas.getCenter();
          console.log('first')

          img.set({
            left: selectedObject.left,
            top: selectedObject.top,
            // width: selectedObject.width,
            // height: selectedObject.height,
            scaleX: scaleToFitWidth,
            scaleY: scaleToFitHeight,
            selectable: true,
            hasControls: true,
            name: 'image_' + new Date().getTime(),
            id: generateRandomId(),
            type: 'Image'
          });

          img.on('dblclick', () => {
            // selectedImage = img;
            img.set({ selectable: false });
            canvas.setActiveObject(img);
            // img.crop();
            canvas.renderAll();
          });

          img.scale(scale);
          canvas.remove(selectedObject)
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          updateCanvasRef(canvasArr, selectedCanvas, canvas);
          dispatch(updateSelectedObject(null));
          dispatch(updateOpenDrawer(null));
          // dispatch(updateText(''));
        }, { crossOrigin: 'Anonymous' });
        return;
      }

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
          name: 'image_' + new Date().getTime(),
          id: generateRandomId(),
          type: 'Image'
        });

        img.on('dblclick', () => {
          // selectedImage = img;
          img.set({ selectable: false });
          canvas.setActiveObject(img);
          // img.crop();
          canvas.renderAll();
        });

        img.scale(scale);

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        updateCanvasRef(canvasArr, selectedCanvas, canvas);
        dispatch(updateOpenDrawer(null));
        // dispatch(updateText(''));
      }, { crossOrigin: 'Anonymous' });

    } else if (openDrawer === 'UploadBG') {


      // Set Image Background

      fabric.Image.fromURL(image, (img) => {

        // const imgAspect = img.width / img.height;
        // const canvasAspect = canvas.width / canvas.height;

        // let scaleX, scaleY;

        // if (imgAspect > canvasAspect) {
        //   // Image is wider, fit to width
        //   scaleX = canvas.width / img.width;
        //   scaleY = canvas.width / img.width;
        // } else {
        //   // Image is taller, fit to height
        //   scaleX = canvas.height / img.height;
        //   scaleY = canvas.height / img.height;
        // }


        // Set Image Background

        const upperCanvasEl = canvas.upperCanvasEl;
        const scaleToFitWidth = upperCanvasEl.width / img.width;
        const scaleToFitHeight = upperCanvasEl.height / img.height;
        const scale = Math.min(scaleToFitWidth, scaleToFitHeight);

        // Set the image as the background
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          // scaleX,
          // scaleY,

          id: generateRandomId(),
          type: 'Image'

        });

        img.scale(scale);
        // canvas.add(img);
        canvas.renderAll();
        updateCanvasRef(canvasArr, selectedCanvas, canvas);
        dispatch(updateOpenDrawer(null));
      }, { crossOrigin: 'Anonymous' });

    }
  }

  const handleAddShape = (shape) => {

    const canvasArr = getCanvasRef();
    const canvas = canvasArr[selectedCanvas];

    fabric.loadSVGFromURL(shape.url, function (objects, options) {
      const svg = fabric.util.groupSVGElements(objects, options);
      const canvasCenter = canvas.getCenter();
      // const svgCenter = svg.getCoords();

      // // Calculate the offset to center the scaled SVG
      // const offsetX = canvasCenter.left - (svgCenter.left + (svgCenter.width * svg.scaleX) / 2);
      // const offsetY = canvasCenter.top - (svgCenter.top + (svgCenter.height * svg.scaleY) / 2);

      svg.set({
        left: canvasCenter.left,
        top: canvasCenter.top,
        selectable: true,
        hasControls: true,
        id: generateRandomId(),
        name: shape.title,
        type: 'Shape',
        originX: 'left',
        originY: 'top',
      });

      // Adjust the dimensions if needed


      // Adjust the dimensions if needed
      svg.scaleToWidth(200)
      // svg.setCoords();


      canvas.add(svg);
      canvas.setActiveObject(svg);
      // dispatch(updateSelectedObject(svg));
      canvas.renderAll();
      updateCanvasRef(canvasArr, selectedCanvas, canvas);
      dispatch(updateOpenDrawer(null));
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
            src={item.webformatURL || item.url || item}
            alt="spring bird, bird, tit"
            style={
              {
                display: loading ? "none" : "block",
                width: "100%",
                animation: "fadeIn 1s",
              }
            }
            onLoad={(e) => { setLoading(false) }}
            onClick={() => {
              if (showPanel === 'Shapes') {
                handleAddShape(item);
              }
              else if (showPanel === 'My Uploads') {
                handleUploadImage(item);
              }
              else if (showPanel === 'Social Media Icons') {
                handleUploadImage(item.url);
              }
              else if (showPanel === 'Claircius Logo') {
                handleUploadImage(item.url);
              }
              else if (showPanel === 'pixabay') {
                handleUploadImage(item.webformatURL);
              }
            }
            }
          />
          <SpinnerContainer loading={loading} height={'auto'} />

        </div>
      </div>
    );
  });
}

export default EditGrid;
