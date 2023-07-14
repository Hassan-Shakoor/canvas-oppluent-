import React from "react";

function ColumnMLS(){
    return(
        <div className="col-md-8 page__column">
            <ul className="tabs">
                <li className="tabs__item tabs__item_active">Property Search</li>
            </ul>
            <div className="pt-4">
                <h4 className="mb-3 text-info">
                Search and populate a property's information into your design here.
                </h4>
                <div className="mb-3 search-input_full-width search-input">
                <div className="">
                    <input
                    autoComplete="off"
                    id="search"
                    name="search"
                    placeholder="Enter Address or MLS # here"
                    type="search"
                    className="search-input__simple-input"
                    defaultValue=""
                    />
                </div>
                </div>
                <div className="mb-3 property-search__list">
                <div className="empty-data-set" data-test="empty-data-set">
                    <div className="empty-data-set__icon-wrapper">
                    <img
                        src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/512dae34bbe771ada018.svg"
                        alt="properties"
                        className="empty-data-set__icon"
                    />
                    </div>
                    <div className="empty-data-set__label">
                    Your search results will be here
                    </div>
                </div>
                </div>
                <div className="button-set">
                <div className="button-set button-set_flex-end">
                    <button type="button" className="btn btn_border">
                    <span className="btn__text">Back</span>
                    </button>
                    <button type="submit" className="btn">
                    <span className="btn__text">Create</span>
                    </button>
                </div>
                </div>
            </div>
        </div>

    )
}

export default ColumnMLS;