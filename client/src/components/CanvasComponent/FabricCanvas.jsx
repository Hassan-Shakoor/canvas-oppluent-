// ** Import Libraries
import React from "react";
import { useSelector } from "react-redux";
import { selectResolution, selectSelectedCanvas} from "../../store/app/Edit/Canvas/canvas";

const FabricCanvas = ({index}) => {
    // ** Vars
    const resolution = useSelector(selectResolution)
    const selectedCanvas = useSelector(selectSelectedCanvas)

    return (
        <div
            key={index}
            className={selectedCanvas === index ? "fpd-view-stage rendered" : "fpd-view-stage rendered fpd-hidden" }
            style={{
            width: resolution.width,
            height: resolution.height,
            // background: 'url(https://firebasestorage.googleapis.com/v0/b/clarious-f4f45.appspot.com/o/images%2FHoliday_Post-0.jpg?alt=media&token=2446008f-07d3-4342-aaa1-a70092e186a4)',
            // width: 634,
            // height: 634,
            position: "relative",
            userSelect: "none",
            top: 0
          }}>
            <canvas
              key={index}
              id={`canvas-${index+1}`}
              // width={resolution.width}
              // height={resolution.height}
              style={{
              position: "absolute",
              left: 0,
              top: 0,
              // background: 'url(https://firebasestorage.googleapis.com/v0/b/clarious-f4f45.appspot.com/o/images%2FHoliday_Post-0.jpg?alt=media&token=2446008f-07d3-4342-aaa1-a70092e186a4)',
              // width: resolution.width,
              // height: resolution.height,
              // backgroundSize: 'cover'
              touchAction: "none",
              userSelect: "none",
            }}/>
          </div>
    )
}

export default FabricCanvas