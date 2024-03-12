// ** Import Library
import React, { useEffect, useState } from "react";
import { fabric } from 'fabric';

// ** Custom Component
import FabricCanvas from "./FabricCanvas";

// ** Shared
import { DISPLAY_DIRECTION } from "../../shared/constant";
import { getCanvasRef, setCanvasRef } from "../../shared/utils/fabric";

// ** Store
import { useDispatch, useSelector } from 'react-redux'
import { selectCanvasContainer, selectDisplayDirection, selectFabricData, selectResolution, selectSelectedCanvas, selectTemplateData, selectZoom, updateCanvasContainer, updateSelectedCanvas, updateSelectedObject } from "../../store/app/Edit/Canvas/canvas";
import { updateOpenDrawer } from "../../store/app/Edit/EditDrawer";
import SpinnerOverlay from "../Loader/SpinnerOverlay";
import { selectMlsPropertyInfo } from "../../store/app/PropertySearch/property";

function Canvas(props) {

  const [loading, setLoading] = useState(true);
  // ** Hooks
  const dispatch = useDispatch()
  const fabricData = useSelector(selectFabricData)
  const canvasContainer = useSelector(selectCanvasContainer)
  const zoom = useSelector(selectZoom);
  const resolution = useSelector(selectResolution)
  const propertyInfo = useSelector(selectMlsPropertyInfo)
  const templateData = useSelector(selectTemplateData);


  // ** Vars
  const stageHeight = fabricData.length * resolution.height
  const displayDirection = useSelector(selectDisplayDirection)

  useEffect(() => {

    // if (document.getElementById('canvas-1')) {
    const newCanvases = [];
    for (let i = 0; i < fabricData.length; i++) {
      const canvasData = JSON.parse(fabricData[i])
      const canvasObjects = canvasData.objects;
      const objectsWithoutShape = canvasObjects.filter(object => object.type !== 'Shape')

      let imageIndex = 0;
      const canvasObjectsWithPropertySearch = canvasObjects.map((object, index) => {
        if (object.type === 'Image') {
          if (imageIndex < propertyInfo?.selectedImages?.length) {
            // Return the updated object
            return { ...object, src: propertyInfo.selectedImages[imageIndex++] };
            // return { ...object, src: 'https://firebasestorage.googleapis.com/v0/b/clarious-f4f45.appspot.com/o/Untitled%20design-9.png?alt=media&token=943839e2-6ebc-4251-aadd-465aa6093074' };
          }
        } else if (object.type === 'Text') {
          if (Object.keys(propertyInfo).includes(object.name)) {
            const newTextValue = propertyInfo[object.name];
            return { ...object, text: newTextValue }
          }
        }
        else {
          console.error("Unsupported object type:", object.type);
        }

        // Return the original object if no update is needed
        return object;
      });

      const canvasDataWithoutObjects = {
        ...canvasData,
        // objects: canvasObjectsWithPropertySearch.filter((object) => object.type !== "Shape")
        objects: []
      }
      console.log(canvasObjectsWithPropertySearch)

      try {

        const canvas = new fabric.Canvas(`canvas-${i + 1}`, {
          width: props.width,
          height: props.height,

          backgroundImageStretch: 'uniform'
          // width: 634,
          // height: 634
        }, { crossOrigin: 'Anonymous' });


        // console.log("canvas.getZoom(): ", canvas.getZoom())
        canvas?.loadFromJSON(canvasDataWithoutObjects, function () {
          // if (canvas.backgroundImage) {
          //   canvas.backgroundImage.set({ crossOrigin: 'Anonymous' });
          //   canvas.requestRenderAll();
          // }
          // canvas?.objects?.set(canvasData.objects);
          // canvas.requestRenderAll();

        })

        // Objects Addition to Canvas
        // setTimeout(() => {

        let fabricObjects = [];

        canvasObjectsWithPropertySearch.map((object, index) => {
          if (object.type === 'Text') {
            fabricObjects.push(new fabric.Textbox(object.text, object));
          } else if (object.type === 'Shape') {
            fabricObjects.push(new fabric.Path(object.path, object));
          } else if (object.type === 'Image') {
            fabric.Image.fromURL(object.src, function (img) {
              // img is an instance of fabric.Image
              // You can add it to the canvas or perform other operations
              img.set({
                ...object,
                crossOrigin: 'anonymous'
              });

              canvas.add(img); // Add the image to the canvas
            }, { crossOrigin: 'anonymous' });
          }
          else {
            console.error("Unsupported object type:", object.type);
          }
        })

        if (templateData.description && !templateData.published) {
          if (templateData.description.length > 0) {
            fabricObjects.push(new fabric.Textbox(templateData.description));
          }
        }

        // const images = canvas.getObjects().filter(obj => obj.type === 'Image'); // Select all image objects

        // if (propertyInfo && propertyInfo.selectedImages) {
        //   // Handle cases where the number of images and selected images match
        //   if (images.length === propertyInfo.selectedImages.length) {
        //     for (let i = 0; i < images.length; i++) {
        //       images[i].setSrc('https://firebasestorage.googleapis.com/v0/b/clarious-f4f45.appspot.com/o/Untitled%20design-9.png?alt=media&token=943839e2-6ebc-4251-aadd-465aa6093074', () => {
        //         canvas.renderAll()
        //       })
        //     }
        //   } else {
        //     console.warn(`Number of images on canvas (${images.length}) does not match selected images length (${propertyInfo.selectedImages.length})`);
        //   }
        //   // Update the canvas
        //   canvas.renderAll();
        // } else {
        //   console.warn("Missing propertyInfo or selectedImages data");
        // }

        // Add objects to canvas
        canvas.add(...fabricObjects);
        canvas.setZoom(zoom);
        canvas.renderAll();
        // }, 100);

        canvas?.on("mouse:down", (event) => {
          // Check if the clicked area have object and set it active
          const target = event.target
          console.log("Target: ", target)
          if (target) {
            canvas.setActiveObject(target)
          }
          else {
            dispatch(updateOpenDrawer(target))
          }
          dispatch(updateSelectedObject(target))
          // Update the selected canvas
          dispatch(updateSelectedCanvas(Number(i)))
        })

        document.addEventListener('keydown', (event) => {
          const selectedObject = canvas?.getActiveObject();
          if (event.key === 'Delete' && selectedObject) {
            if (selectedObject) {
              canvas?.remove(selectedObject);
              canvas?.setActiveObject(null);
            }
          }
        });

        newCanvases.push(canvas);
      } catch (error) {
        console.error('Error Creating Canvas. ', error)
      }
    }
    setCanvasRef([...newCanvases])
    dispatch(updateCanvasContainer([...newCanvases]))

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      const canvases = getCanvasRef()
      canvases?.forEach(canvas => {
        canvas.dispose()
      });
      // document.removeEventListener('keydown');
      console.log('Canvas Disposed');
    }
    // }


  }, [dispatch, fabricData, resolution, propertyInfo]);

  console.log(canvasContainer)
  return (
    <div
      id="canvases"
      aria-label="backgroundWorkArea"
      className={displayDirection === DISPLAY_DIRECTION.HORIZONTAL ? "canvases canvases_horizontal canvases_bottom-panel-open fpd-container" : "canvases canvases_bottom-panel-open fpd-container"}>
      <SpinnerOverlay loading={loading} />
      <div id="fpd-main-wrapper" className="fpd-main-wrapper">
        <div
          id="fpd-product-stage"
          className="fpd-product-stage"
          style={{
            height: { stageHeight }
          }}>
          {Array.from({ length: fabricData.length }).map((_, i) => (
            <FabricCanvas key={i} index={i} width={props.width} height={props.height} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Canvas;