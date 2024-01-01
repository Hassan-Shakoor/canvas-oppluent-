// ** Import Library
import React from "react";
import { fabric } from "fabric";

// ** Store
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import {
  selectText,
  selectUrl,
  updateText,
  updateUrl,
} from "../../../../store/app/Edit/EditSidebar/EditText/text";
import { selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getCanvasRef, setCanvasRef, updateCanvasRef } from "../../../../shared/utils/fabric";
import { updateOpenDrawer } from "../../../../store/app/Edit/EditDrawer";

function TextInput() {
  // ** Hooks
  const dispatch = useDispatch();
  const text = useSelector(selectText);
  const hyperLink = useSelector(selectUrl);
  const selectedCanvas = useSelector(selectSelectedCanvas);

  const handleAddBtn = () => {
    const canvasArr = getCanvasRef();
    const canvas = canvasArr[selectedCanvas];
    const fabricText = new fabric.IText(text.trim(), {
      selectable: true,
      hasControls: true,
    });
    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll()
    updateCanvasRef(canvasArr, selectedCanvas, canvas)
    dispatch(updateOpenDrawer(null))
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
