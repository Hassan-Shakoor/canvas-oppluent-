// ** Custom Component
import SlickSliderPreview from "../Sliders/SlickSliderPreview";

function PropertySearchPreview({close, images}) {
  return (
    <div
      className="ReactModal__Overlay ReactModal__Overlay--after-open"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255, 255, 255, 0.75)",
      }}
    >
      <div
        className="ReactModal__Content ReactModal__Content--after-open ReactModal__Content_lg"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-visible" tabIndex={-1}>
          <div className="modal__content">
            <div className="modal__header">
              <div className="modal__title">Design Preview</div>
              <button
                type="button"
                className="btn btn_icon modal__close btn_close-modal-icon"
                data-test="close-button"
                onClick={close}
              >
                <svg className="icon v1-icon v1-icon-cross-light">
                  <use
                    href="#v1-icon-cross-light"
                    xlinkHref="#v1-icon-cross-light"
                  />
                </svg>
                <span className="btn__text" />
              </button>
            </div>
            <div className="react-slider react-slider_with-shadow">
              <SlickSliderPreview images={images}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertySearchPreview;
