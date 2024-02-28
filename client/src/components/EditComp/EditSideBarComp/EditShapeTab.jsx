import React from "react";

import { fabric } from 'fabric';
// ** Store
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectOpenDrawer, updateOpenDrawer } from "../../../store/app/Edit/EditDrawer";
import { getCanvasRef, updateCanvasRef } from "../../../shared/utils/fabric";
import { generateRandomId } from "../../../shared/utils";
import { useDispatch } from "react-redux";
import { selectSelectedCanvas, updateSelectedObject } from "../../../store/app/Edit/Canvas/canvas";
import { SHAPES } from "../../../shared/constant";

function EditShapeTab() {
  // ** Hooks
  const dispatch = useDispatch();
  const openDrawer = useSelector(selectOpenDrawer);
  const selectedCanvas = useSelector(selectSelectedCanvas);

  const handleAddShape = (shape) => {

    const canvasArr = getCanvasRef();
    const canvas = canvasArr[selectedCanvas];

    fabric.loadSVGFromURL(shape.url, function (objects, options) {
      const svg = fabric.util.groupSVGElements(objects, options);
      const canvasCenter = canvas.getCenter();
      // const svgCenter = svg.getCoords();

      // // Calculate the offset to center the scaled SVG
      // const offsetX = canvasCenter.left - (svgCenter.left + (svgCenter.width * svg.scaleX) / 2);
      // const offsetY = canvasCenter.top - (svgCenter.top + (svgCenter.height * svg.scaleY) / 2);
      
      svg.set({
        left: canvasCenter.left,
        top: canvasCenter.top,
        selectable: true,
        hasControls: true,
        id: generateRandomId(),
        name: shape.title,
        type: 'Shape',
        originX: 'left',
        originY: 'top',
      });

      // Adjust the dimensions if needed


      // Adjust the dimensions if needed
      svg.scaleToWidth(200)
      // svg.setCoords();


      canvas.add(svg);
      canvas.setActiveObject(svg);
      dispatch(updateSelectedObject(svg));
      canvas.renderAll();
      updateCanvasRef(canvasArr, selectedCanvas, canvas);
      dispatch(updateOpenDrawer(null));
    });
  }

  return (
    <div
      className={openDrawer === 'Shapes'
        ? "sidebar-module vertical-switch-content-enter-done"
        : "sidebar-module vertical-switch-content-exit-done"}>
      <div className="media-library media-library_full-height">
        <div className="sidebar-module__title">Shapes</div>
        <div className="sidebar-module__divider" />
        <div className="small-search small-search_bordered mb-2">
          <div className="small-search__icon-wrapper">
            <svg className="icon v2-icon v2-icon-loupe">
              <use href="#v2-icon-loupe" xlinkHref="#v2-icon-loupe" />
            </svg>
          </div>
          <div className="small-search__input">
            <input
              autoComplete="off"
              id="small-search"
              name="small-search"
              placeholder="Search In Shapes"
              type="search"
              className="simple-input"
              defaultValue="" />
          </div>
        </div>
        <div className="media-library__container-wrapper">
          <div
            className="media-library__container"
            id="library-scroll-target-403e69ca-74b3-4a67-a0a2-f0b052860620">
            <div className="infinite-scroll-component__outerdiv">
              <div
                className="infinite-scroll-component "
                style={{
                  height: "auto",
                  overflow: "auto"
                }}>
                <span>
                  {/* <div
                    className="m-auto"
                    style={{
                    position: "relative",
                    width: 290,
                    height: 1531
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
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="donut.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/20765/original/donut.svg?1688057071"
                            alt="donut.svg"/>
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
                      transform: "translateX(99px) translateY(0px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="Asset_1.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/20370/original/Asset_1.svg?1687801686"
                            alt="Asset_1.svg"/>
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
                      transform: "translateX(198px) translateY(0px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="half_circle_rectangle.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12737/original/half_circle_rectangle.svg?1676958828"
                            alt="half_circle_rectangle.svg"/>
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
                      transform: "translateX(99px) translateY(69px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="1 Star Rating">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12452/original/Group_3467.svg?1675727765"
                            alt="1 Star Rating"/>
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
                      transform: "translateX(0px) translateY(99px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="2 Star Rating">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12451/original/Group_3466.svg?1675727741"
                            alt="2 Star Rating"/>
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
                      transform: "translateX(198px) translateY(117px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="3 Star Rating">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12450/original/Group_3465.svg?1675727714"
                            alt="3 Star Rating"/>
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
                      transform: "translateX(99px) translateY(126px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="4 Star Rating">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12449/original/Group_3463.svg?1675727668"
                            alt="4 Star Rating"/>
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
                      transform: "translateX(0px) translateY(156px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="5 Star Rating">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12448/original/Group_3464.svg?1675727639"
                            alt="5 Star Rating"/>
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
                      transform: "translateX(198px) translateY(174px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="rectangle.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12204/original/rectangle.svg?1674654820"
                            alt="rectangle.svg"/>
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
                      transform: "translateX(99px) translateY(183px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="rounded_square_svg.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12103/original/rounded_square_svg.svg?1673386135"
                            alt="rounded_square_svg.svg"/>
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
                      transform: "translateX(0px) translateY(213px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="parallelogram2.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12096/original/parallelogram2.svg?1673370327"
                            alt="parallelogram2.svg"/>
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
                      transform: "translateX(198px) translateY(250px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="parallelogram.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/12092/original/parallelogram.svg?1673300125"
                            alt="parallelogram.svg"/>
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
                      transform: "translateX(0px) translateY(279px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="shape_image.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10680/original/shape_image.svg?1669884354"
                            alt="shape_image.svg"/>
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
                      transform: "translateX(99px) translateY(282px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="shape_image.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10679/original/shape_image.svg?1669881873"
                            alt="shape_image.svg"/>
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
                      transform: "translateX(198px) translateY(327px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="shape_image_2.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10678/original/shape_image_2.svg?1669881873"
                            alt="shape_image_2.svg"/>
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
                      transform: "translateX(0px) translateY(341px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="Untitled-1.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10676/original/Untitled-1.svg?1669852025"
                            alt="Untitled-1.svg"/>
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
                      transform: "translateX(99px) translateY(389px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="Untitled-4.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10675/original/Untitled-4.svg?1669851678"
                            alt="Untitled-4.svg"/>
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
                      transform: "translateX(0px) translateY(438px) scale(1)"
                    }}>
                      <div className="media-library__image" draggable="true" title="shape.png">
                        <img
                          className="media-library__image-thumbnail"
                          src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/10674/thumb/shape.png?1669851519"
                          alt="shape.png"/>
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
                      transform: "translateX(198px) translateY(462px) scale(1)"
                    }}>
                      <div
                        className="media-library__image"
                        draggable="true"
                        title="PERSONAL_LOGO_HERE.png">
                        <img
                          className="media-library__image-thumbnail"
                          src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9961/thumb/PERSONAL_LOGO_HERE.png?1665611831"
                          alt="PERSONAL_LOGO_HERE.png"/>
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
                      transform: "translateX(99px) translateY(486px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="no.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9605/original/no.svg?1662590027"
                            alt="no.svg"/>
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
                      transform: "translateX(198px) translateY(519px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="checkbox.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9604/original/checkbox.svg?1662590027"
                            alt="checkbox.svg"/>
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
                      transform: "translateX(0px) translateY(535px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="checkmark.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9603/original/checkmark.svg?1662590027"
                            alt="checkmark.svg"/>
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
                      transform: "translateX(99px) translateY(585px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="x.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9602/original/x.svg?1662590027"
                            alt="x.svg"/>
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
                      transform: "translateX(198px) translateY(618px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="empty_checkbox.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9601/original/empty_checkbox.svg?1662590027"
                            alt="empty_checkbox.svg"/>
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
                      transform: "translateX(0px) translateY(634px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="square_rounded_edge.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9265/original/square_rounded_edge.svg?1658173572"
                            alt="square_rounded_edge.svg"/>
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
                      transform: "translateX(99px) translateY(684px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="oval.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/9071/original/oval.svg?1654537926"
                            alt="oval.svg"/>
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
                      transform: "translateX(198px) translateY(717px) scale(1)"
                    }}>
                      <div className="media-library__image" draggable="true" title="Gradient">
                        <img
                          className="media-library__image-thumbnail"
                          src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6566/thumb/color_gradient.png?1620774550"
                          alt="Gradient"/>
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
                      transform: "translateX(0px) translateY(719px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="line-01.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6531/original/line-01.svg?1619568347"
                            alt="line-01.svg"/>
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
                      transform: "translateX(99px) translateY(810px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="line.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6530/original/line.svg?1619567979"
                            alt="line.svg"/>
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
                      transform: "translateX(198px) translateY(817px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="square.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6314/original/square.svg?1614980885"
                            alt="square.svg"/>
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
                      transform: "translateX(0px) translateY(818px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="rectangle.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6313/original/rectangle.svg?1614980885"
                            alt="rectangle.svg"/>
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
                      transform: "translateX(99px) translateY(867px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="square_rounded_corners.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6312/original/square_rounded_corners.svg?1614980885"
                            alt="square_rounded_corners.svg"/>
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
                      transform: "translateX(0px) translateY(894px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="square_outline_rounded_corners.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6311/original/square_outline_rounded_corners.svg?1614980885"
                            alt="square_outline_rounded_corners.svg"/>
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
                      transform: "translateX(198px) translateY(916px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="rectangle_rounded_corners.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6310/original/rectangle_rounded_corners.svg?1614980885"
                            alt="rectangle_rounded_corners.svg"/>
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
                      transform: "translateX(99px) translateY(966px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="rectangle_outline_rounded_corners.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6309/original/rectangle_outline_rounded_corners.svg?1614980885"
                            alt="rectangle_outline_rounded_corners.svg"/>
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
                      transform: "translateX(198px) translateY(989px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="circle.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6308/original/circle.svg?1614980885"
                            alt="circle.svg"/>
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
                      transform: "translateX(0px) translateY(993px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="circle_outline.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6307/original/circle_outline.svg?1614980885"
                            alt="circle_outline.svg"/>
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
                      transform: "translateX(99px) translateY(1040px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="circle_frame.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6306/original/circle_frame.svg?1614980885"
                            alt="circle_frame.svg"/>
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
                      transform: "translateX(198px) translateY(1088px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="circle_frame_thick.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6305/original/circle_frame_thick.svg?1614980885"
                            alt="circle_frame_thick.svg"/>
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
                      transform: "translateX(0px) translateY(1092px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="triangle.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6304/original/triangle.svg?1614980854"
                            alt="triangle.svg"/>
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
                      transform: "translateX(99px) translateY(1139px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="triangle_outline.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6303/original/triangle_outline.svg?1614980854"
                            alt="triangle_outline.svg"/>
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
                      transform: "translateX(0px) translateY(1181px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="triangle_rounded_corners.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6302/original/triangle_rounded_corners.svg?1614980854"
                            alt="triangle_rounded_corners.svg"/>
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
                      transform: "translateX(198px) translateY(1187px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="triangle_outline_rounded_corners.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6301/original/triangle_outline_rounded_corners.svg?1614980854"
                            alt="triangle_outline_rounded_corners.svg"/>
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
                      transform: "translateX(99px) translateY(1228px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="pentagon.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6300/original/pentagon.svg?1614980854"
                            alt="pentagon.svg"/>
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
                      transform: "translateX(0px) translateY(1271px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="pentagon_outline.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6299/original/pentagon_outline.svg?1614980854"
                            alt="pentagon_outline.svg"/>
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
                      transform: "translateX(198px) translateY(1277px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="hexagon.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6298/original/hexagon.svg?1614980854"
                            alt="hexagon.svg"/>
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
                      transform: "translateX(99px) translateY(1323px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="hexagon_outline.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6297/original/hexagon_outline.svg?1614980854"
                            alt="hexagon_outline.svg"/>
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
                      transform: "translateX(0px) translateY(1366px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="pentagon_frame.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6296/original/pentagon_frame.svg?1614980853"
                            alt="pentagon_frame.svg"/>
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
                      transform: "translateX(198px) translateY(1388px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="hexagon_frame.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6295/original/hexagon_frame.svg?1614980853"
                            alt="hexagon_frame.svg"/>
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
                      transform: "translateX(99px) translateY(1434px) scale(1)"
                    }}>
                      <div
                        className="media-library__image media-library__image_vector-background"
                        draggable="true"
                        title="house.svg">
                        <div className="media-library__image-vector-container">
                          <img
                            className="media-library__vector-image"
                            src="//dnhf8bus4lv8r.cloudfront.net/system/designer_assets/images/6294/original/house.svg?1614980853"
                            alt="house.svg"/>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="m-auto" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    // display: 'flex',
                    // flexFlow: 'column wrap',
                    // alignContent: 'flex-start',
                    // boxSizing: 'border-box',
                    // margin: 'calc(-4px)',
                    // height: 'calc(1564px)'
                  }}>
                    {SHAPES.map((shape, index) => (
                      <div
                        key={index}
                        className="media-library__item-container"
                        style={{ order: (index % 3) + 1, marginBottom: '6px' }}
                      >
                        <div className="media-library__image media-library__image_vector-background" draggable="true" title={shape.title} onClick={() => handleAddShape(shape)}>
                          <div className="media-library__image-vector-container">
                            <img
                              className="media-library__vector-image"
                              src={shape.url}
                              alt={shape.title}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default EditShapeTab;