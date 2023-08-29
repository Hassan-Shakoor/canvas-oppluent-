import React from "react";

function EditTextTab(props) {
  return (
    <form
      className={props.openDrawer === 'Text'
      ? "text-module vertical-switch-content-enter-done"
      : "sidebar-module vertical-switch-content-exit-done"}>
      <div className="mb-1">
        <label
          className="text-module__textarea textarea item-has-value textarea_has-value">
          <textarea
            data-test="add-text-area"
            placeholder="Enter text here..."
            className="textarea__field textarea"
            spellCheck="false"
            defaultValue={""}/>
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
          defaultValue=""/>
      </label>
      <div className="button-set button-set_padding">
        <span className="btn btn_disabled btn_wide" data-test="add-text-button">
          <span className="btn__text">Add Text</span>
        </span>
      </div>
      <div className="chat-gpt-module in-text-module">
        <div className="mb-3 mt-2">
          <div className="sidebar-module__title">
            AI Writer<span className="badge chat-gpt-module__bagde">New</span>
          </div>
          <div className="sidebar-module__divider"/>
          <div className="chat-gpt-module__info mb-2">
            Generate text with AI using a brief prompt. The AI Writer will respond with a
            description to match the context provided.
            <i className="icon icon-info"/>
          </div>
        </div>
        <div className="chat-gpt-module__request-field request-field">
          <label className="textarea item-has-value textarea_has-value">
            <textarea
              placeholder="Tell AI what you want to write."
              className="textarea__field textarea designer-generate__chat-gpt-prompt-area"
              defaultValue={""}/>
          </label>
          <div className="request-field__divider">
            <div className="sidebar__module-divider"/>
          </div>
          <label className="chat-gpt-control__text-area designer-generate textarea">
            <textarea
              readOnly=""
              className="textarea__field textarea designer-generate__chat-gpt-area mb-2 in-text-module"
              defaultValue={""}/>
          </label>
        </div>
        <div className="chat-gpt-module__control-block control-block mb-2">
          <div className="control-block__management-block management-block">
            <div className="control-block__buttons-block buttons-block">
              <span className="btn btn_disabled buttons-block__btn-submit btn_blue">
                <span className="btn__text">Submit</span>
              </span>
              <span
                className="btn btn_disabled btn_small-icon buttons-block__button btn_gray">
                <svg className="icon v2-icon v2-icon-copy">
                  <use href="#v2-icon-copy" xlinkHref="#v2-icon-copy"/>
                </svg>
                <span className="btn__text"/>
              </span>
              <span
                className="btn btn_disabled btn_gray btn_small-icon buttons-block__button">
                <svg className="icon v1-icon v1-icon-undo">
                  <use href="#v1-icon-undo" xlinkHref="#v1-icon-undo"/>
                </svg>
                <span className="btn__text"/>
              </span>
              <span
                className="btn btn_disabled btn_gray btn_small-icon buttons-block__button regenerate-button">
                <span className="btn__text">
                  <i className="icon icon-regenerate"/>
                </span>
              </span>
            </div>
            <div className="management-block__info-block">
              <span>
                <label className="input control-block__chars-counter input_has-value">
                  <input placeholder={0} type="text" className="simple-input" defaultValue={0}/>
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="chat-gpt-module__length-block mb-3">
          <div className="slider-box control_block__slider slider-box_full-width">
            <p className="slider-box__title">Maximum Length</p>
            <div className="rc-slider slider-box__slider">
              <div className="rc-slider-rail"/>
              <div
                className="rc-slider-track"
                style={{
                left: "0%",
                right: "auto",
                width: "18.75%"
              }}/>
              <div className="rc-slider-step"/>
              <div
                tabIndex={0}
                className="rc-slider-handle"
                role="slider"
                aria-valuemin={0}
                aria-valuemax={1600}
                aria-valuenow={300}
                aria-disabled="false"
                style={{
                left: "18.75%",
                right: "auto",
                transform: "translateX(-50%)"
              }}/>
              <div className="rc-slider-mark"/>
            </div>
          </div>
          <span className="management-block__length-counter">
            <label className="input control-block__chars-counter input_has-value">
              <input placeholder={0} type="text" className="simple-input" defaultValue={300}/>
            </label>
          </span>
        </div>
        <div className="mb-3 mt-2">
          <div className="sidebar-module__title">Instance</div>
          <div className="sidebar-module__divider"/>
          <div className="chat-gpt-module__info mb-2">
            Apply generated text to specific instances. To do so, select a text box on your
            design and select “Replace”.
          </div>
        </div>
        <span className="btn btn_disabled btn_wide">
          <span className="btn__text">Replace</span>
        </span>
      </div>
    </form>
  )
}

export default EditTextTab