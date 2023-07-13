import React from 'react';
import { useParams } from 'react-router-dom';

function CategoryContent() {
  const { id } = useParams();

  // Use the `id` to fetch and display the relevant content

  return (
    <div className="page__content">
      <div className="container">
        <h1 className="dashboard-title">Welcome to Your Dashboard, {id} </h1>
        <div className="announcement__slider">
          <div className="react-slider">
            <div>
              <div className="slick-slider slick-initialized">
                <div className="slick-list">
                  <div
                    className="slick-track"
                    style={{
                      width: 348,
                      opacity: 1,
                      transform: "translate3d(0px, 0px, 0px)"
                    }}
                  >
                    <div
                      data-index={0}
                      className="slick-slide slick-active slick-current"
                      tabIndex={-1}
                      aria-hidden="false"
                      style={{ outline: "none", width: 348 }}
                    >
                      <div>
                        <div className="announcement__card-container">
                          <div className="announcement__card">
                            <div className="announcement__card-header">
                              <div className="announcement__title">
                                Direct Mail Scheduling
                              </div>
                              <div className="announcement__notification-icon">
                                <svg className="icon v2-icon v2-icon-bell-regular">
                                  <use
                                    href="#v2-icon-bell-regular"
                                    xlinkHref="#v2-icon-bell-regular"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="announcement__short-description pt-1">
                              Create &amp; schedule a mailing campaign with your
                              farming list.{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="react-slider__btn react-slider__btn_next react-slider__btn_disabled">
              <svg className="icon v2-icon v2-icon-chevron-right-light">
                <use
                  href="#v2-icon-chevron-right-light"
                  xlinkHref="#v2-icon-chevron-right-light"
                />
              </svg>
            </div>
            <div className="react-slider__btn react-slider__btn_prev react-slider__btn_disabled">
              <svg className="icon v2-icon v2-icon-chevron-left-light">
                <use
                  href="#v2-icon-chevron-left-light"
                  xlinkHref="#v2-icon-chevron-left-light"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="dashboard-header mt-2">
          <div className="dashboard-header__top-panel">
            <div className="dashboard-header__left-panel">
              <button
                type="button"
                className="btn create-button btn_gray btn_big me-2"
              >
                <svg className="icon v2-icon v2-icon-plus">
                  <use href="#v2-icon-plus" xlinkHref="#v2-icon-plus" />
                </svg>
                <span className="btn__text">Create Folder</span>
              </button>
            </div>
            <div className="dashboard-header__right-panel">
              <div className="select-container select-container_with-icons me-2 select-container_has-value">
                <div className="select-container css-2b097c-container">
                  <div className="select__control css-yk16xz-control">
                    <div className="select__value-container select__value-container--has-value css-1tnzi8j">
                      <div className="select__single-value css-ah2eo0-singleValue">
                        <i className="icon icon-column" />
                        <i className="icon icon-column" />
                        <i className="icon icon-column" />
                        <i className="icon icon-column" />
                      </div>
                      <input
                        id="react-select-4-input"
                        readOnly=""
                        tabIndex={0}
                        aria-autocomplete="list"
                        className="css-62g3xt-dummyInput"
                        defaultValue=""
                      />
                    </div>
                    <div className="select__indicators css-1wy0on6">
                      <span className="select__indicator-separator css-18jcpcz-indicatorSeparator" />
                      <svg className="icon v2-icon v2-icon-chevron-right select__icon">
                        <use
                          href="#v2-icon-chevron-right"
                          xlinkHref="#v2-icon-chevron-right"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="search-input">
                <label htmlFor="search">
                  <svg className="icon v2-icon v2-icon-loupe search-input__icon">
                    <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe" />
                  </svg>
                </label>
                <div className="">
                  <input
                    autoComplete="off"
                    id="search"
                    name="search"
                    placeholder="Search"
                    type="search"
                    className="search-input__input"
                    defaultValue=""
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn_big btn_transparent-grey btn_dropdown dashboard-header__sort"
              >
                <span className="btn__text">Sort</span>
                <svg className="icon v2-icon v2-icon-chevron-down">
                  <use
                    href="#v2-icon-chevron-down"
                    xlinkHref="#v2-icon-chevron-down"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="infinite-scroll-component__outerdiv">
          <div
            className="infinite-scroll-component "
            style={{ height: "auto", overflow: "auto" }}
          >
            <div className="waterfall-component">
              <span>
                <div
                  className="waterfall-component__grid"
                  style={{ position: "relative", width: 1351, height: 1131 }}
                >
                  <div
                    style={{
                      width: 280,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 2,
                      opacity: 1,
                      transform: "translateX(0px) translateY(0px)",
                      transition:
                        "opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s, transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
                    }}
                  >
                    <div className="" draggable="true">
                      <div className="design-card">
                        <a
                          className="design-card__preview"
                          href="/designs/hello/edit"
                        >
                          <img
                            alt="Hello"
                            className="design-card__preview-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1964/image/original/Hello-0.jpg?1688143740"
                          />
                          <button
                            type="button"
                            className="btn btn_white btn_no-min-width design-card__edit-btn"
                          >
                            <span className="btn__text">Edit</span>
                          </button>
                        </a>
                        <div className="design-card__panel">
                          <div
                            className="design-card__title design-card__title_editable"
                            title="Hello"
                          >
                            Hello
                          </div>
                          <div
                            className="design-card__info"
                            title="Last edited Jun 30, 2023"
                          >
                            Last edited Jun 30, 2023
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn_icon design-card__select-for-batch-action"
                          data-test="select-for-batch-action"
                        >
                          <svg className="icon v2-icon v2-icon-empty-circle">
                            <use
                              href="#v2-icon-empty-circle"
                              xlinkHref="#v2-icon-empty-circle"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                        <button
                          type="button"
                          className="btn btn_black btn_no-text design-card__menu-button design-card__menu-button_ellipsis"
                          data-test="template-menu-button"
                        >
                          <svg className="icon v2-icon v2-icon-ellipsis-h">
                            <use
                              href="#v2-icon-ellipsis-h"
                              xlinkHref="#v2-icon-ellipsis-h"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 280,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 2,
                      opacity: 1,
                      transform: "translateX(357px) translateY(0px)",
                      transition:
                        "opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s, transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
                    }}
                  >
                    <div className="" draggable="true">
                      <div className="design-card">
                        <a
                          className="design-card__preview"
                          href="/emails/html-email-newsletter-63841d36-0fef-4bcd-b997-baaaec705198/edit"
                        >
                          <img
                            alt="HTML Email Newsletter"
                            className="design-card__preview-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1956/image/original/HTML_Email_Newsletter.html.jpg?1687861087"
                          />
                          <button
                            type="button"
                            className="btn btn_white btn_no-min-width design-card__edit-btn"
                          >
                            <span className="btn__text">Edit</span>
                          </button>
                        </a>
                        <div className="design-card__panel">
                          <div
                            className="design-card__title design-card__title_editable"
                            title="HTML Email Newsletter"
                          >
                            HTML Email Newsletter
                          </div>
                          <div
                            className="design-card__info"
                            title="Last edited Jun 27, 2023"
                          >
                            Last edited Jun 27, 2023
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn_icon design-card__select-for-batch-action"
                          data-test="select-for-batch-action"
                        >
                          <svg className="icon v2-icon v2-icon-empty-circle">
                            <use
                              href="#v2-icon-empty-circle"
                              xlinkHref="#v2-icon-empty-circle"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                        <button
                          type="button"
                          className="btn btn_black btn_no-text design-card__menu-button design-card__menu-button_ellipsis"
                          data-test="template-menu-button"
                        >
                          <svg className="icon v2-icon v2-icon-ellipsis-h">
                            <use
                              href="#v2-icon-ellipsis-h"
                              xlinkHref="#v2-icon-ellipsis-h"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 280,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 2,
                      opacity: 1,
                      transform: "translateX(714px) translateY(0px)",
                      transition:
                        "opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s, transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
                    }}
                  >
                    <div className="" draggable="true">
                      <div className="design-card">
                        <a
                          className="design-card__preview"
                          href="/emails/html-email-newsletter-7a073655-d929-4449-9d3b-397d5204307a/edit"
                        >
                          <img
                            alt="HTML Email Newsletter"
                            className="design-card__preview-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1955/image/original/HTML_Email_Newsletter.html.jpg?1687860874"
                          />
                          <button
                            type="button"
                            className="btn btn_white btn_no-min-width design-card__edit-btn"
                          >
                            <span className="btn__text">Edit</span>
                          </button>
                        </a>
                        <div className="design-card__panel">
                          <div
                            className="design-card__title design-card__title_editable"
                            title="HTML Email Newsletter"
                          >
                            HTML Email Newsletter
                          </div>
                          <div
                            className="design-card__info"
                            title="Last edited Jun 27, 2023"
                          >
                            Last edited Jun 27, 2023
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn_icon design-card__select-for-batch-action"
                          data-test="select-for-batch-action"
                        >
                          <svg className="icon v2-icon v2-icon-empty-circle">
                            <use
                              href="#v2-icon-empty-circle"
                              xlinkHref="#v2-icon-empty-circle"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                        <button
                          type="button"
                          className="btn btn_black btn_no-text design-card__menu-button design-card__menu-button_ellipsis"
                          data-test="template-menu-button"
                        >
                          <svg className="icon v2-icon v2-icon-ellipsis-h">
                            <use
                              href="#v2-icon-ellipsis-h"
                              xlinkHref="#v2-icon-ellipsis-h"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 280,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 2,
                      opacity: 1,
                      transform: "translateX(1071px) translateY(0px)",
                      transition:
                        "opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s, transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
                    }}
                  >
                    <div className="" draggable="true">
                      <div className="design-card">
                        <a
                          className="design-card__preview"
                          href="/emails/email-signature-2b52d6fd-1b0b-4726-a729-9025fb072d73/edit"
                        >
                          <img
                            alt="Email Signature"
                            className="design-card__preview-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1948/image/original/Email_Signature.html.jpg?1687853017"
                          />
                          <button
                            type="button"
                            className="btn btn_white btn_no-min-width design-card__edit-btn"
                          >
                            <span className="btn__text">Edit</span>
                          </button>
                        </a>
                        <div className="design-card__panel">
                          <div
                            className="design-card__title design-card__title_editable"
                            title="Email Signature"
                          >
                            Email Signature
                          </div>
                          <div
                            className="design-card__info"
                            title="Last edited Jun 27, 2023"
                          >
                            Last edited Jun 27, 2023
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn_icon design-card__select-for-batch-action"
                          data-test="select-for-batch-action"
                        >
                          <svg className="icon v2-icon v2-icon-empty-circle">
                            <use
                              href="#v2-icon-empty-circle"
                              xlinkHref="#v2-icon-empty-circle"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                        <button
                          type="button"
                          className="btn btn_black btn_no-text design-card__menu-button design-card__menu-button_ellipsis"
                          data-test="template-menu-button"
                        >
                          <svg className="icon v2-icon v2-icon-ellipsis-h">
                            <use
                              href="#v2-icon-ellipsis-h"
                              xlinkHref="#v2-icon-ellipsis-h"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 280,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 2,
                      opacity: 1,
                      transform: "translateX(0px) translateY(297px)",
                      transition:
                        "opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s, transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
                    }}
                  >
                    <div className="" draggable="true">
                      <div className="design-card">
                        <a
                          className="design-card__preview"
                          href="/designs/magnetic-sign-f4c4851d-1349-4bdd-b83a-52e1a6cf7274/edit"
                        >
                          <img
                            alt="Magnetic Sign"
                            className="design-card__preview-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/1904/image/original/Magnetic_Sign-0.jpg?1683822187"
                          />
                          <button
                            type="button"
                            className="btn btn_white btn_no-min-width design-card__edit-btn"
                          >
                            <span className="btn__text">Edit</span>
                          </button>
                        </a>
                        <div className="design-card__panel">
                          <div
                            className="design-card__title design-card__title_editable"
                            title="Magnetic Sign"
                          >
                            Magnetic Sign
                          </div>
                          <div
                            className="design-card__info"
                            title="Last edited May 11, 2023"
                          >
                            Last edited May 11, 2023
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn_icon design-card__select-for-batch-action"
                          data-test="select-for-batch-action"
                        >
                          <svg className="icon v2-icon v2-icon-empty-circle">
                            <use
                              href="#v2-icon-empty-circle"
                              xlinkHref="#v2-icon-empty-circle"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                        <button
                          type="button"
                          className="btn btn_black btn_no-text design-card__menu-button design-card__menu-button_ellipsis"
                          data-test="template-menu-button"
                        >
                          <svg className="icon v2-icon v2-icon-ellipsis-h">
                            <use
                              href="#v2-icon-ellipsis-h"
                              xlinkHref="#v2-icon-ellipsis-h"
                            />
                          </svg>
                          <span className="btn__text" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
}

export default CategoryContent;