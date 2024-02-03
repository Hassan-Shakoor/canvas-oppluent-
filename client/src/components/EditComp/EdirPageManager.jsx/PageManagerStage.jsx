import React, { useEffect, useState } from "react";
import PageManagerList from "./PageManagerList";
import { useSelector } from "react-redux";
import { selectCanvasContainer } from "../../../store/app/Edit/Canvas/canvas";

function PageManagerStage() {
  let stages = ["frhstqpt2d", "hcqwusyyb5", "mhpcoj2vc7", "x41bm0fkwd"];

  const canvasContainer = useSelector(selectCanvasContainer)

  const [pages, setPages] = useState([]);

  useEffect(() => {

  }, [])

  return (
    <ul className="page-manager__stages-list">
      {canvasContainer.map((canvas, index) => (
        <PageManagerList key={index} id={`canvas-${index}`} index={index} page={canvas} />
      ))}
    </ul>
  );
}

export default PageManagerStage;
