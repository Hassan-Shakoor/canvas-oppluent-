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
import ConfirmationModal from "../../../Modal/ConfirmationModal";
import SpinnerOverlay from "../../../Loader/SpinnerOverlay";
import { toast } from "react-toastify";

function EditGrid({ searchMap, showPanel, setShowPanel }) {

  const dispatch = useDispatch();
  const selectedCanvas = useSelector(selectSelectedCanvas);
  const openDrawer = useSelector(selectOpenDrawer);
  const selectedObject = useSelector(selectSelectedObject);

  const [loading, setLoading] = useState(true);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);

  const [isReplaceImageConfirmationModal, setIsReplaceImageConfirmationModal] = useState(false);
  const [imageToReplace, setImageToReplace] = useState(null);

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

    setIsOverlayLoading(true);

    const canvasArr = getCanvasRef();
    const canvas = canvasArr[selectedCanvas];

    const maxWidth = 350;
    const maxHeight = 350;

    // TO Add the Image to Canvas

    if (openDrawer === 'Uploads') {

      if (selectedObject && selectedObject.type === 'Image') {

        const replaceImage = async () => {
          const insertImgFile = (fileStr) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                resolve(img);
              };
              img.src = fileStr;
            });
          };

          const imgEl = await insertImgFile(image);
          const originalWidth = selectedObject.get('width');
          const originalHeight = selectedObject.get('height');
          const originalScaleX = selectedObject.get('scaleX');
          const originalScaleY = selectedObject.get('scaleY');

          const previousWidth = originalWidth * originalScaleX;
          const previousHeight = originalHeight * originalScaleY;

          const originalAspectRatio = previousWidth / previousHeight;
          const newImageAspectRatio = imgEl.width / imgEl.height;

          let scaleX = 1, scaleY = 1;

          // if (imgEl.width < previousWidth || imgEl.height < previousHeight) {
          //   scaleX = previousWidth / imgEl.width;
          //   scaleY = previousHeight / imgEl.height;
          // }

          let newWidth = previousWidth;
          let newHeight = previousHeight;

          if (imgEl.width > previousWidth && imgEl.height > previousHeight) {
            if (imgEl.width < imgEl.height) {
              scaleX = previousWidth / imgEl.width;
              scaleY = scaleX
            } else {
              scaleY = previousHeight / imgEl.height;
              scaleX = scaleY
            }
            newWidth = previousWidth / scaleX;
            newHeight = previousHeight / scaleY;
          }

          let cropRatio = Math.min(newWidth / imgEl.width, newHeight / imgEl.height);

          console.log('cropRatio: ', cropRatio)

          selectedObject.setSrc(imgEl.src, () => {
            selectedObject.set({
              cropX: 0,
              cropY: 0,
              width: newWidth,
              height: newHeight,
              scaleX,
              scaleY,
            });
            canvas.renderAll();
          }, { crossOrigin: 'anonymous' });
        };

        replaceImage();

        return;
      }


      if (selectedObject && selectedObject.type === 'Shape') {

        if (selectedObject.isHardLocked) {
          toast.info("Unable to Replace. Locked by Admin.")
          return;
        }

        fabric.Image.fromURL(image, function (img) {

          const scaleToFitWidth = selectedObject.width / (img.width / 0.65);
          const scaleToFitHeight = selectedObject.height / (img.height / 0.65);
          const scale = Math.max(scaleToFitWidth, scaleToFitHeight);
          img.scale(scale)

          var patternSourceCanvas = new fabric.StaticCanvas();
          patternSourceCanvas.add(img);
          patternSourceCanvas.setWidth(selectedObject.width)
          patternSourceCanvas.setHeight(selectedObject.height)
          patternSourceCanvas.renderAll();

          // console.log('firstdasd')
          // Set the image as a pattern fill for the shape
          selectedObject.set('fill', new fabric.Pattern({
            source: patternSourceCanvas.getElement(),
            repeat: 'no-repeat',
            crossOrigin: 'anonymous',
            offsetX: 0,
            offsetY: 0,
            imageURL: image
          }));

          canvas.renderAll();
        }, { crossOrigin: 'Anonymous' });
        return
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

    setIsOverlayLoading(false);
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

  const checkReplaceModal = (image) => {
    if (openDrawer === 'Uploads') {
      if (selectedObject && selectedObject.type === 'Image') {
        if (selectedObject.isHardLocked) {
          toast.info("Unable to Replace. Locked by Admin.")
          return true;
        }

        setIsReplaceImageConfirmationModal(true);
        setImageToReplace(image)
        return true;
      }
    }
  }


  return (
    <>{
      searchMap[showPanel]?.data?.map((item, index) => {
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

                    if (checkReplaceModal(item)) {
                      return;
                    }

                    handleUploadImage(item);
                    setIsOverlayLoading(false);
                  }
                  else if (showPanel === 'Social Media Icons') {

                    if (checkReplaceModal(item.url)) {
                      return;
                    }

                    handleUploadImage(item.url);
                    setIsOverlayLoading(false);
                  }
                  else if (showPanel === 'Opulent Logo') {

                    if (checkReplaceModal(item.url)) {
                      return;
                    }

                    handleUploadImage(item.url);
                    setIsOverlayLoading(false);
                  }
                  else if (showPanel === 'pixabay') {

                    if (checkReplaceModal(item.webformatURL)) {
                      return;
                    }

                    handleUploadImage(item.webformatURL);
                    setIsOverlayLoading(false);
                  }
                }
                }
              />
              <SpinnerContainer loading={loading} height={'auto'} />

            </div>
          </div>
        );
      })}

      <SpinnerOverlay loading={isOverlayLoading} />

      {isReplaceImageConfirmationModal && (
        <ConfirmationModal
          title={<p style={{ color: '#000', margin: 0 }}>{"Replace Image Confirmation"}</p>}
          body={<p style={{ color: '#000', margin: 0 }}>{"Are you sure you want to replace the image?"}</p>}
          secondaryBtnTxt={"Cancel"}
          primaryBtnTxt={"Confirm"}
          close={() => setIsReplaceImageConfirmationModal(false)}
          submit={async (event) => {
            event.preventDefault();
            handleUploadImage(imageToReplace);
            setIsReplaceImageConfirmationModal(false);
            setIsOverlayLoading(false);
          }}
        />
      )}
    </>)

}

export default EditGrid;
