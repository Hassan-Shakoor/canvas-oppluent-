import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import DesignTemplate from './DesignTemplate';

const InfiniteScrollComponent = ({ category, gridColumn, userId }) => {

    // const category = {
    //     id: 32,
    //     subHeading: "",
    //     template: [{
    //         cardTitle: "Just Sold",
    //         created: "2023-09-01",
    //         favorite: false,
    //         id: 323,
    //         imageUrl: "/images/Just_Sold-0 (1).jpg",
    //         modified: "2023-09-01",
    //         storage_url: ["https://firebasestorage.googleapis.com/v0/b/clarious-f4f45.appspot.com/o/images%2FJust_Sold-0%20(1).jpg?alt=media&token=7d0c8f0e-801d-42d9-b6d4-f7f6c2352a42"]
    //     }]
    // };

    useEffect(() => {
        console.log(category)
    }, [])

    return (
        <div className="infinite-scroll-component__outerdiv">
            <div className="infinite-scroll-component" style={{ height: 'auto', overflow: 'auto' }}>
                <div className="MuiMasonry-root css-by147d">
                    {/* <div style={{ order: 1 }}>
                        <div className="">
                            <div className="" draggable="true">
                                <div className="folder">
                                    <div className="folder__preview-container">
                                        <div className="folder__preview">
                                            <div className="folder__preview-box">
                                                <img className="folder__preview-image" src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/2297/image/original/Nicky_M_Email_Signature-0.jpg?1707149592" alt="Preview" />
                                            </div>
                                            <div className="folder__preview-box">
                                                <img className="folder__preview-image" src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/2277/image/original/Deandra_Email_Signature-0.jpg?1703001803" alt="Preview" />
                                            </div>
                                            <div className="folder__preview-box">
                                                <img className="folder__preview-image" src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/2131/image/original/Deandra_Email_Signature-0.jpg?1699390388" alt="Preview" />
                                            </div>
                                            <div className="folder__preview-box">
                                                <img className="folder__preview-image" src="//dnhf8bus4lv8r.cloudfront.net/system/tcgimarketing.com/design_view_pictures/2136/image/original/Kerida_Email_Signature-0.jpg?1699553318" alt="Preview" />
                                            </div>
                                            <a className="btn folder__view-button btn_no-min-width" rel="" href="/folders/16">
                                                <span className="btn__text">Open</span>
                                            </a>
                                            <div className="folder__preview-info-icon">
                                                <FontAwesomeIcon icon="fa-light fa-folder-open" />
                                            </div>
                                            <div className="folder__menu folder__menu_top-left">
                                                <label className="checkbox folder__menu-checkbox" data-test="select-for-batch-action">
                                                    <input className="checkbox__input" type="checkbox" />
                                                    <div className="checkbox__box">
                                                        <div className="checkbox__tick">
                                                            <i className="icon icon-checkbox-regular"></i>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="folder__menu">
                                                <button type="button" className="btn folder__menu-dropdown btn_no-text" data-test="folder-menu-button">
                                                    <span className="btn__text"><i className="icon icon-ellipsis"></i></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="folder__panel">
                                        <div className="folder__panel-title" title="Email signatures">Email signatures</div>
                                        <div className="folder__panel-info" title="">6 items</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div style={{ order: 2 }}>
            <div className="">
              <div className="" draggable="true">

                <DesignTemplate  />
              </div>
            </div>
          </div> */}
                    {category?.length > 0 ?

                        <div className="template-grid-container" style={{ gridTemplateColumns: "repeat(" + gridColumn + ", auto)" }}>
                            {category?.map((item, index) => (
                                <div style={{ order: index % 3 + 1 }}>
                                    <div className="">
                                        <div className="" draggable="true">
                                            <DesignTemplate key={index} item={item} gridColumn={gridColumn} userId={userId} categoryId={category.id} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className="empty-data-set" data-test="empty-data-set" style={{ paddingTop: '20%' }}>
                            <div className="empty-data-set__icon-wrapper">
                                <img
                                    src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/512dae34bbe771ada018.svg"
                                    alt="designs"
                                    className="empty-data-set__icon"
                                />
                            </div>
                            <div className="empty-data-set__label">No Templates</div>
                        </div>}
                </div>
            </div>
        </div >
    );
};

export default InfiniteScrollComponent;
