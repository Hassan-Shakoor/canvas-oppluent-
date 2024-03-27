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
          }
        } else if (object.type === 'Text') {
          if (Object.keys(propertyInfo).includes(object.name)) {
            const newTextValue = propertyInfo[object.name];
            return { ...object, text: newTextValue }
          }
        } else if (object.type === 'Shape') {
          return { ...object };
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
      // console.log(canvasObjectsWithPropertySearch)

      try {

        const canvas = new fabric.Canvas(`canvas-${i + 1}`, {
          width: props.width,
          height: props.height,

          backgroundImageStretch: 'uniform'

        }, { crossOrigin: 'Anonymous' });


        canvas?.loadFromJSON(canvasDataWithoutObjects, function () {

        })

        let fabricObjects = [];

        // for (let i = 0; i < canvasObjectsWithPropertySearch.length; i++) {

        //   const object = canvasObjectsWithPropertySearch[i];

        //   if (object.type === 'Text') {
        //     // fabricObjects.push(new fabric.Textbox(object.text, object));
        //     const textbox = new fabric.Textbox(object.text, object);
        //     canvas.add(textbox);

        //   } else if (object.type === 'Shape') {
        //     // fabricObjects.push(new fabric.Path(object.path, object));
        //     if (object?.path?.length > 0) {
        //       // fabricObjects.push(new fabric.Path(object.path, object));
        //       const path = new fabric.Path(object.path, object);
        //       canvas.add(path);

        //     } else if (object?.objects?.length > 0) {
        //       let svgPaths = [];
        //       object.objects.forEach(svgObject => {
        //         // Check if the SVG path data is available
        //         if (svgObject.path) {
        //           try {
        //             // Create a Fabric.js path object for the SVG path data
        //             const path = new fabric.Path(svgObject.path, {
        //               ...svgObject
        //             });
        //             svgPaths.push(path);
        //           } catch (error) {
        //             console.error('Error creating Fabric.js path:', error);
        //           }
        //         }
        //       });

        //       if (svgPaths.length > 0) {
        //         // Create a Fabric.js group from the added paths
        //         const group = new fabric.Group(svgPaths, {
        //           ...object
        //         });

        //         // Add the group to the canvas
        //         canvas.add(group);
        //       }
        //     } else if (object?.svgUrl) {
        //       fabric.loadSVGFromURL(object.svgUrl, function (objects, options) {
        //         const svg = fabric.util.groupSVGElements(objects, options);
        //         svg.set({
        //           ...object
        //         });
        //         canvas.add(svg);
        //       })
        //     }
        //   } else if (object.type === 'Image') {
        //     fabric.Image.fromURL(object.src, function (img) {
        //       // img is an instance of fabric.Image
        //       // You can add it to the canvas or perform other operations
        //       img.set({
        //         ...object,
        //         crossOrigin: 'anonymous'
        //       });

        //       canvas.add(img); // Add the image to the canvas
        //       // })
        //     }, { crossOrigin: 'anonymous' });
        //   }
        //   else {
        //     console.error("Unsupported object type:", object.type);
        //   }


        // }

        async function processObjects(objects, index) {
          if (index >= objects.length) {
            // End of objects array
            return;
          }

          const object = objects[index];

          if (object.type === 'Text') {
            const textbox = new fabric.Textbox(object.text, object);
            canvas.add(textbox);
          } else if (object.type === 'Shape') {
            if (object?.path?.length > 0) {
              const path = new fabric.Path(object.path, object);
              canvas.add(path);
            } else if (object?.objects?.length > 0) {
              let svgPaths = [];
              object.objects.forEach(svgObject => {
                if (svgObject.path) {
                  try {
                    const path = new fabric.Path(svgObject.path, { ...svgObject });
                    svgPaths.push(path);
                  } catch (error) {
                    console.error('Error creating Fabric.js path:', error);
                  }
                }
              });

              if (svgPaths.length > 0) {
                const group = new fabric.Group(svgPaths, { ...object });
                canvas.add(group);
              }
            } else if (object?.svgUrl) {
              const svg = await new Promise((resolve, reject) => {
                fabric.loadSVGFromURL(object.svgUrl, function (objects, options) {
                  const svg = fabric.util.groupSVGElements(objects, options);
                  svg.set({ ...object });
                  resolve(svg);
                });
              });
              canvas.add(svg);
            }
          } else if (object.type === 'Image') {
            const img = await new Promise((resolve, reject) => {
              fabric.Image.fromURL(object.src, function (img) {
                img.set({ ...object, crossOrigin: 'anonymous' });
                resolve(img);
              }, { crossOrigin: 'anonymous' });
            });
            canvas.add(img);
          } else {
            console.error("Unsupported object type:", object.type);
          }

          // Process next object
          await processObjects(objects, index + 1);
        }

        // Start processing objects
        processObjects(canvasObjectsWithPropertySearch, 0);


        if (templateData.description && !templateData.published) {
          if (templateData.description.length > 0) {
            fabricObjects.push(new fabric.Textbox(templateData.description));
          }
        }
        // Add objects to canvas
        canvas.add(...fabricObjects);
        canvas.setZoom(zoom);
        canvas.renderAll();
        // }, 100);

        canvas?.on("mouse:down", (event) => {
          // Check if the clicked area have object and set it active
          const target = event.target
          // console.log("Target: ", target)
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
    }, 4000);

    return () => {
      const canvases = getCanvasRef()
      canvases?.forEach(canvas => {
        canvas.dispose()
      });
      // document.removeEventListener('keydown');
      // console.log('Canvas Disposed');
    }
    // }


  }, [dispatch, fabricData, resolution, propertyInfo]);

  // console.log(canvasContainer)
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