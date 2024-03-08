import React, { useEffect, useState } from "react";
import PageManagerList from "./PageManagerList";
import { useDispatch, useSelector } from "react-redux";
import canvas, { selectCanvasContainer, selectSelectedCanvas, updateSelectedObject } from "../../../store/app/Edit/Canvas/canvas";

function PageManagerStage() {
  let stages = ["frhstqpt2d", "hcqwusyyb5", "mhpcoj2vc7", "x41bm0fkwd"];

  const canvasContainer = useSelector(selectCanvasContainer)

  const dispatch = useDispatch();

  const [pages, setPages] = useState([]);

  useEffect(() => {
    dispatch(updateSelectedObject(null));

  }, [])

  return (
    <ul className="page-manager__stages-list">
      {canvasContainer.map((canvas, index) => (
        <PageManagerList key={index} id={`canvas-box-${index}`} index={index} canvas={canvas} />
      ))}
    </ul>
  );
}

export default PageManagerStage;
