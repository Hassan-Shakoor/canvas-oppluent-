import React, { useRef, useState } from "react";

// ** Third Party Component
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpinnerContainer from "../Loader/SpinnerContainer";

function SlickSlider({ images }) {
  // ** Hooks
  const sliderRef = useRef(null);

  const [loading, setLoading] = useState(true);

  // ** Vars
  const settings = {
    dots: false,
    autoplay: false,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const slidePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const slideNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="react-slider react-slider_with-shadow">
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) =>
          <div
            key={index}
            className="design-preview"
            tabIndex={-1}
            style={{ width: "100%", display: "inline-block" }}
          >
            <img
              className="design-preview__image"
              alt="slider"
              src={image}
              style={
                {
                  display: loading ? "none" : "block",
                  width: "100%",
                  animation: "fadeIn 1s",
                }
              } onLoad={(e) => { setLoading(false) }} />
            <SpinnerContainer loading={loading} />
          </div>)}
      </Slider>
      {images.length > 1 && <><div className="react-slider__btn react-slider__btn_next" onClick={slideNext}>
        <svg className="icon v2-icon v2-icon-chevron-right-light">
          <use
            href="#v2-icon-chevron-right-light"
            xlinkHref="#v2-icon-chevron-right-light"
          />
        </svg>
      </div>
        <div className="react-slider__btn react-slider__btn_prev" onClick={slidePrev}>
          <svg className="icon v2-icon v2-icon-chevron-left-light">
            <use
              href="#v2-icon-chevron-left-light"
              xlinkHref="#v2-icon-chevron-left-light"
            />
          </svg>
        </div></>}
    </div>
  );
}

export default SlickSlider;
