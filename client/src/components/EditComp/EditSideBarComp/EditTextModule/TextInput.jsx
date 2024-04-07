// ** Import Library
import React from "react";
import { fabric } from "fabric";
import { useSelector } from "react-redux/es/hooks/useSelector";

// ** Store
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import {
  selectText,
  selectUrl,
  updateText,
  updateUrl,
} from "../../../../store/app/Edit/EditSidebar/EditText/text";
import { selectSelectedCanvas, updateSelectedObject } from "../../../../store/app/Edit/Canvas/canvas";
import { updateOpenDrawer } from "../../../../store/app/Edit/EditDrawer";

// ** Shared
import { getCanvasRef, updateCanvasRef } from "../../../../shared/utils/fabric";
import { generateRandomId } from "../../../../shared/utils";

function TextInput() {
  // ** Hooks
  const dispatch = useDispatch();
  const text = useSelector(selectText);
  const hyperLink = useSelector(selectUrl);
  const selectedCanvas = useSelector(selectSelectedCanvas);

  const handleAddBtn = () => {
    const canvasArr = getCanvasRef();
    const canvas = canvasArr[selectedCanvas];
    const canvasCenter = canvas.getCenter();

    const fabricText = new fabric.Textbox(text.trim(), {
      left: canvasCenter.left - canvasCenter.left / 10,
      top: canvasCenter.top - canvasCenter.top / 10,
      selectable: true,
      hasControls: true,
      id: generateRandomId(),
      name: text,
      type: 'Text',
      cursorColor: '#000',
      textWrapping: true,
      textAlign: 'left',
      lockScalingY: true,
      // styles: {
      //   0: {
      //     0: {
      //       fill: 'black',
      //     },
      //   },
      // },
      isBulletsEnabled: false,
      isNumbersEnabled: false
    });
    // for (let i = 0; i < fabricText.text.length; i++) {
    //   // Set color based on the index (even or odd)
    //   const color = '#000';

    //   fabricText.styles[0][i] = { fill: color };
    // }

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    dispatch(updateOpenDrawer(null));
    dispatch(updateSelectedObject(fabricText));
    canvas.renderAll()
    updateCanvasRef(canvasArr, selectedCanvas, canvas)
    dispatch(updateText(''));
  };

  return (
    <>
      <div className="mb-1">
        <label className="text-module__textarea textarea item-has-value textarea_has-value">
          <textarea
            data-test="add-text-area"
            placeholder="Enter text here..."
            className="textarea__field textarea"
            spellCheck="false"
            value={text}
            onChange={(event) => dispatch(updateText(event.target.value))}
          />
        </label>
      </div>
      <label className="input text-module__input">
        <input
          placeholder="Enter URL or Email"
          autoComplete="off"
          type="text"
          className="simple-input"
          value={hyperLink}
          onChange={(event) => dispatch(updateUrl(event.target.value))}
        />
      </label>
      <div
        className="button-set button-set_padding"
        onClick={text.length > 0 ? handleAddBtn : undefined}
      >
        <span
          className={
            text.length > 0 ? "btn btn_wide" : "btn btn_disabled btn_wide"
          }
          data-test="add-text-button"
        >
          <span className="btn__text">Add Text</span>
        </span>
      </div>
    </>
  );
}

export default TextInput;
