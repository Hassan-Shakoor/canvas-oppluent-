import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditUploadTab(props){
    return (
        <div
            className={props.openDrawer === 'Uploads'
            ? "sidebar-module vertical-switch-content-enter-done"
            : "sidebar-module vertical-switch-content-exit-done"}>
            <div className="media-library">
              <div tabIndex={0} className="dropzone media-library__dropbox mb-2">
                <input
                  accept=".png, .jpg, .jpeg, .svg"
                  multiple=""
                  type="file"
                  autoComplete="off"
                  tabIndex={-1}
                  defaultValue=""
                  style={{
                  display: "none"
                }}/>
                <div className="media-library__dropbox-icon-wrapper">
                  <FontAwesomeIcon
                    className="font-icon"
                    icon="fa-solid fa-arrow-up"
                    style={{
                    color: "#ffffff"
                  }}/>
                </div>
                <div className="media-library__dropbox-title">Upload Image</div>
                <div className="media-library__dropbox-text">
                  Click image on template to replace.
                </div>
              </div>
              <div className="input-group input-group_without-separators mb-2">
                <div className="small-search small-search_bordered">
                  <div className="small-search__icon-wrapper">
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"/>
                  </div>
                  <div className="small-search__input">
                    <input
                      autoComplete="off"
                      id="small-search"
                      name="small-search"
                      placeholder="Search Pixabay for Copyright Free Media"
                      type="search"
                      className="simple-input"
                      defaultValue=""/>
                  </div>
                </div>
              </div>
              <div className="sidebar-module__title">Multimedia</div>
              <div className="sidebar-module__divider"/>
              <div className="media-library__container-wrapper">
                <div
                  className="media-library__container"
                  id="library-scroll-target-c8fc07b7-7e3d-4249-afe9-681c698f89e7">
                  <span>
                    <div
                      className="m-auto mb-3"
                      style={{
                      position: "relative",
                      width: 289,
                      height: 158
                    }}>
                      <div
                        className="media-library__item-container"
                        style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        opacity: 1,
                        transform: "translateX(0px) translateY(0px) scale(1)"
                      }}>
                        <div className="media-library__folder">
                          <div className="media-library__folder-preview" title="My Uploads">
                            <div className="media-library__folder-icon">
                              <FontAwesomeIcon icon="fa-solid fa-upload"/>
                            </div>
                            <div className="media-library__folder-title">My Uploads</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="media-library__item-container"
                        style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        opacity: 1,
                        transform: "translateX(97px) translateY(0px) scale(1)"
                      }}>
                        <div className="media-library__folder">
                          <div className="media-library__folder-preview" title="Shapes">
                            <div className="media-library__folder-icon">
                              <FontAwesomeIcon icon="fa-solid fa-shapes"/>
                            </div>
                            <div className="media-library__folder-title">Shapes</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="media-library__item-container"
                        style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        opacity: 1,
                        transform: "translateX(194px) translateY(0px) scale(1)"
                      }}>
                        <div className="media-library__folder">
                          <div className="media-library__folder-preview" title="Claircius Logo">
                            <div className="media-library__folder-icon">
                              <FontAwesomeIcon icon="fa-solid fa-folder"/>
                            </div>
                            <div className="media-library__folder-title">
                              Claircius Logo
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="media-library__item-container"
                        style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        opacity: 1,
                        transform: "translateX(0px) translateY(80px) scale(1)"
                      }}>
                        <div className="media-library__folder">
                          <div className="media-library__folder-preview" title="Social Media Icons">
                            <div className="media-library__folder-icon">
                              <FontAwesomeIcon icon="fa-solid fa-folder"/>
                            </div>
                            <div className="media-library__folder-title">
                              Social Media Icons
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="media-library-terms">
              <div>
                Maxa Designs, Inc. does not claim any ownership rights to your content.
              </div>
              <div>
                By uploading, you hereby expressly acknowledge and agree that your content
                complies with our{" "}
                <a
                  className="text-info text-no-decoration fw-bolder"
                  href="/terms_of_use"
                  target="_blank"
                  data-reactroot="">
                  Terms of Use
                </a>{" "}
                and does not infringe any third party rights.
              </div>
            </div>
          </div>
    )
}

export default EditUploadTab