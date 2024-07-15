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
import ContextMenu from "./ContextMenu";
import { initAligningGuidelines } from "../../services/canvas/aligningGuidelines";
import { initCenteringGuidelines } from "../../services/canvas/centerAlignGuidelines";
import { toast } from "react-toastify";

function Canvas(props) {

  const [loading, setLoading] = useState(true);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextLeftPosition, setContextLeftPosition] = useState(100);
  const [contextTopPosition, setContextTopPosition] = useState(100);
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
    fabric.Object.prototype.borderColor = 'dodgerblue';
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'white';
    fabric.Object.prototype.cornerStrokeColor = 'dodgerblue';
    fabric.Object.prototype.cornerSize = 7;
    fabric.Object.prototype.cornerStyle = 'circle';


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
            return { ...object, text: newTextValue.toString() }
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
          preserveObjectStacking: true,
          backgroundImageStretch: 'uniform'

        }, { crossOrigin: 'Anonymous' });


        canvas?.loadFromJSON(canvasDataWithoutObjects, function () {

        })

        // hover border on objects code start

        canvas.on('mouse:over', (event) => {
          const { target } = event;
          if (canvas.getActiveObjects().length) {
            // skip group hover
            return;
          }

          // skip group hover
          if (target instanceof fabric.Object && !(target instanceof Array)) {
            const bound = target.getBoundingRect();
            const ctx = canvas.getContext();
            ctx.strokeStyle = 'dodgerblue';
            ctx.strokeRect(
              bound.left,
              bound.top,
              bound.width,
              bound.height
            );
          }
        });

        canvas.on('mouse:out', (event) => {
          const { target } = event;
          if (canvas.getActiveObjects().length) {
            return;
          }

          // skipp group hover
          if (target instanceof fabric.Object && !(target instanceof Array)) {
            canvas.renderAll(); // render all, will clear bounds box drawed by mouse:over
          }
        });

        // hover border on objects code end --

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

              if (object.fill?.type === 'pattern') {
                fabric.Image.fromURL(object.fill?.imageURL, function (img) {

                  const scaleToFitWidth = object.width / (img.width / 0.65);
                  const scaleToFitHeight = object.height / (img.height / 0.65);
                  const scale = Math.max(scaleToFitWidth, scaleToFitHeight);
                  img.scale(scale)

                  var patternSourceCanvas = new fabric.StaticCanvas();
                  patternSourceCanvas.add(img);
                  patternSourceCanvas.setWidth(object.width)
                  patternSourceCanvas.setHeight(object.height)
                  patternSourceCanvas.renderAll();

                  // Set the image as a pattern fill for the shape
                  path.set('fill', new fabric.Pattern({
                    ...object.fill,
                    source: patternSourceCanvas.getElement(),
                  }));

                  canvas.renderAll();
                }, { crossOrigin: 'Anonymous' });
              }
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
                if (object.fill?.type === 'pattern') {

                  fabric.Image.fromURL(object.fill?.imageURL, function (img) {

                    const scaleToFitWidth = object.width / (img.width / 0.5);
                    const scaleToFitHeight = object.height / (img.height / 0.5);
                    const scale = Math.max(scaleToFitWidth, scaleToFitHeight);
                    img.scale(scale)

                    var patternSourceCanvas = new fabric.StaticCanvas();
                    patternSourceCanvas.add(img);
                    patternSourceCanvas.setWidth(object.width)
                    patternSourceCanvas.setHeight(object.height)
                    patternSourceCanvas.renderAll();

                    // Set the image as a pattern fill for the shape
                    group.set('fill', new fabric.Pattern({
                      ...object.fill,
                      source: patternSourceCanvas.getElement(),
                    }));

                    canvas.renderAll();
                  }, { crossOrigin: 'Anonymous' });
                }
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

              if (object.fill?.type === 'pattern') {

                fabric.Image.fromURL(object.fill?.imageURL, function (img) {

                  const scaleToFitWidth = object.width / (img.width / 0.5);
                  const scaleToFitHeight = object.height / (img.height / 0.5);
                  const scale = Math.max(scaleToFitWidth, scaleToFitHeight);
                  img.scale(scale)

                  var patternSourceCanvas = new fabric.StaticCanvas();
                  patternSourceCanvas.add(img);
                  patternSourceCanvas.setWidth(object.width)
                  patternSourceCanvas.setHeight(object.height)
                  patternSourceCanvas.renderAll();

                  // Set the image as a pattern fill for the shape
                  svg.set('fill', new fabric.Pattern({
                    ...object.fill,
                    source: patternSourceCanvas.getElement(),
                  }));

                  canvas.renderAll();
                }, { crossOrigin: 'Anonymous' });
              }
            }
          } else if (object.type === 'Image') {
            const img = await new Promise((resolve, reject) => {


              fabric.Image.fromURL(object.src, function (img) {
                img.set({ ...object, crossOrigin: 'anonymous' });

                // For Color Filter on image

                if (object.filters?.length > 0) {
                  let colorFilter = new fabric.Image.filters.BlendColor({
                    color: object.filters[0]?.color,
                    mode: 'tint',
                    alpha: object.filters[0]?.alpha
                  });
                  img.filters = [colorFilter];
                  img.applyFilters();
                }

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
          console.log("Target: ", target)
          if (target) {
            canvas.setActiveObject(target)
          }
          else {
            dispatch(updateOpenDrawer(target))
          }
          setShowContextMenu(false);
          dispatch(updateSelectedObject(target))
          // Update the selected canvas
          dispatch(updateSelectedCanvas(Number(i)))
        })

        const handleContextMenu = (e) => {
          if (e.target.closest("canvas")) {
            console.log("You've tried to open context menu");
            e.preventDefault();
            // if(activeObject?.isAdminLocked) {
            //   return;
            // }

            setContextLeftPosition(e?.x - 92);
            setContextTopPosition(e?.y - 82);
            // setContextLeftPosition(e?.offsetX);
            // setContextTopPosition(e?.offsetY);
            setShowContextMenu(true);
          }
        };

        document.addEventListener('contextmenu', handleContextMenu, false);


        canvas?.on("mouse:down:before", (event) => {
          // Check if the clicked area have object and set it active
          const target = event.target
          console.log("Target: ", target)
          if (event.button == 0) { // left click for mouse
            // console.log("left click");
          } else if (event.button == 1) { // wheel click for mouse
            // console.log("wheel click");
            // console.log("right click");
            if (target) {
              // canvas.setActiveObject(target)
              console.log('Context Object: ',target)
              if(target?.isAdminLocked) {
                setTimeout(() => {
                  setShowContextMenu(false);
                }, 10);
                // return;
              }
              dispatch(updateSelectedObject(target))
              // setShowContextMenu(true);
            }
          } else if (event.button == 2) {
          }
        })


        // guidelines start

        initAligningGuidelines(canvas);
        // initCenteringGuidelines(canvas);

        // guidelines end

        document.addEventListener("mousedown", event => {
          if (event.button == 0) { // left click for mouse
            // console.log("left click");
          } else if (event.button == 2) {
            event.preventDefault();
            // console.log("right click");
          }
        });

        document.addEventListener('keydown', (event) => {
          const selectedObject = canvas?.getActiveObject();
          if (event.key === 'Delete' && selectedObject) {
            if (selectedObject) {
              if (selectedObject.isAdminLocked) {
                toast.info(`Can't Delete Object. Locked by Admin`)
                return
              }
              canvas?.remove(selectedObject);
              canvas?.setActiveObject(null);
            }
          }
        });

        canvas.on('after:render', function () {
          props.handleCanvasLoaded();
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
      {showContextMenu && (<ContextMenu
        left={contextLeftPosition}
        top={contextTopPosition}
        showContextMenu={showContextMenu}
        setShowContextMenu={setShowContextMenu} />)}
    </div>
  )
}

export default Canvas;