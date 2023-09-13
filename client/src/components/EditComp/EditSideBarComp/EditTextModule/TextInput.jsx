// ** Import Library
import React from "react";
import { useState } from "react";

function TextInput(){
    // ** States
    const [text,setText] = useState('')
    const [hyperLink, setHyperLink] = useState('')

    const addTextBtn = () => {
        if (hyperLink.length > 0){
            console.log(text.link(hyperLink))
        }else{
            console.log(text)
        }
    }

    return (
        <>
        <div className="mb-1">
        <label
        className="text-module__textarea textarea item-has-value textarea_has-value">
        <textarea
          data-test="add-text-area"
          placeholder="Enter text here..."
          className="textarea__field textarea"
          spellCheck="false"
          value={text}
          onChange={(event) => setText(event.target.value)}/>
        <grammarly-extension
          data-grammarly-shadow-root="true"
          style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: "auto"
        }}
          className="dnXmp"/>
      </label>
      </div>
      <label className="input text-module__input">
        <input
          placeholder="Enter URL or Email"
          autoComplete="off"
          type="text"
          className="simple-input"
          value={hyperLink}
          onChange={(event) => setHyperLink(event.target.value)}/>
      </label>
      <div className="button-set button-set_padding" onClick={text.length > 0 ? addTextBtn : undefined}>
        <span className={text.length > 0 ? "btn btn_wide" : "btn btn_disabled btn_wide"} data-test="add-text-button">
          <span className="btn__text">Add Text</span>
        </span>
      </div>
        </>
    )
}

export default TextInput