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
