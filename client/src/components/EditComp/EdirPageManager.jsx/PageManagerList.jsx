import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedCanvas, updateSelectedCanvas } from "../../../store/app/Edit/Canvas/canvas";

function PageManagerList(props) {

  const dispatch = useDispatch();
  // const canvasRef = useRef(null);

  // const[bgImage, setBgImage] = useState(props.page.backgroundImage);

  const selectedCanvas = useSelector(selectSelectedCanvas)

  useEffect(() => {
    //   // Create a fabric.js canvas instance
    //   const canvas = new fabric.Canvas(canvasRef.current);
    console.log('props.page -->> ', props.page)
    //   if (props.canvas) {
    //     canvas.loadFromJSON(props.canvas, () => {
    //       // Canvas has been loaded
    //       console.log("Canvas loaded:", canvas);
    //     });
    //   }
    //   console.log("selectedCanvas --> ", selectedCanvas)
    //   console.log('props.key: ', props.index)

    //   // Clean up on component unmount
    //   return () => {
    //     canvas.dispose();
    //   };
  }, [props.canvas]);

  const handleListClick = () => {
    dispatch(updateSelectedCanvas(props.index));
  }

  return (
    <li
      draggable="true"
      id={props.id}
      className={`page-manager__stage-preview ${selectedCanvas === props.index ? 'page-manager__stage-preview_active' : ''}`}
      onClick={handleListClick}
    >
      <canvas
        // ref={canvasRef}
        className="page-manager__stage-minimap lower-canvas"
        style={{
          width: 55,
        }}
      // width={props.canvas.width}
      // height={props.canvas.height}
      // style={{
      //   height: "42.4816px"
      // }}
      />
    </li>
  );
}

export default PageManagerList;
