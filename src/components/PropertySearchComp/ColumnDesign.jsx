import React from "react";

function ColumnDesign(){
    return (
        <div className="col-md-4 page__column order-first order-md-last mb-3 mb-md-0">
            <h3 className="design-preview__title">Selected Design</h3>
            <div className="design-preview__slider-wrapper m-auto m-md-0">
                <div className="react-slider react-slider_with-shadow">
                <div>
                    <div className="slick-slider slick-initialized" dir="ltr">
                    <div className="slick-list">
                        <div className="slick-track" style={{ width: 1500, opacity: 1 }}>
                        <div
                            data-index={0}
                            className="slick-slide slick-active slick-current"
                            tabIndex={-1}
                            aria-hidden="false"
                            style={{
                            outline: "none",
                            width: 300,
                            position: "relative",
                            left: 0,
                            opacity: 1,
                            transition: "opacity 500ms ease 0s, visibility 500ms ease 0s"
                            }}
                        >
                            <div>
                            <div
                                className="design-preview"
                                tabIndex={-1}
                                style={{ width: "100%", display: "inline-block" }}
                            >
                                <img
                                className="design-preview__image"
                                alt="6 x 9 Postcard"
                                src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1606/image/original/6_x_9_Postcard-0.jpg?1677558787"
                                />
                            </div>
                            </div>
                        </div>
                        <div
                            data-index={1}
                            className="slick-slide"
                            tabIndex={-1}
                            aria-hidden="true"
                            style={{
                            outline: "none",
                            width: 300,
                            position: "relative",
                            left: "-300px",
                            opacity: 0,
                            transition: "opacity 500ms ease 0s, visibility 500ms ease 0s"
                            }}
                        >
                            <div>
                            <div
                                className="design-preview"
                                tabIndex={-1}
                                style={{ width: "100%", display: "inline-block" }}
                            >
                                <img
                                className="design-preview__image"
                                alt="6 x 9 Postcard"
                                src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1607/image/original/6_x_9_Postcard-1.jpg?1677558787"
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="react-slider__btn react-slider__btn_next">
                    <svg className="icon v2-icon v2-icon-chevron-right-light">
                    <use
                        href="#v2-icon-chevron-right-light"
                        xlinkHref="#v2-icon-chevron-right-light"
                    />
                    </svg>
                </div>
                <div className="react-slider__btn react-slider__btn_prev">
                    <svg className="icon v2-icon v2-icon-chevron-left-light">
                    <use
                        href="#v2-icon-chevron-left-light"
                        xlinkHref="#v2-icon-chevron-left-light"
                    />
                    </svg>
                </div>
                </div>
                <div className="react-slider__btn react-slider__btn_small mt-2 ms-auto">
                <svg className="icon v2-icon v2-icon-expand-alt-light">
                    <use
                    href="#v2-icon-expand-alt-light"
                    xlinkHref="#v2-icon-expand-alt-light"
                    />
                </svg>
                </div>
            </div>
        </div>

    )
}

export default ColumnDesign;