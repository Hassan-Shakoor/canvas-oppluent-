import React from "react";
import Header from "./NavBarComp/Header";
import PropertyDashboardHeader from "./PropertySearchComp/PropertyDashboardHeader";
import ColumnMLS from "./PropertySearchComp/ColumnMLS";
import ColumnDesign from "./PropertySearchComp/ColumnDesign";

function PropertySearch(){
    return(
        <div>
            <Header/>
            <div className="page page-enter-done">
                <PropertyDashboardHeader/>
                <div className="page__content">
                    <div className="row">
                        <ColumnMLS/>
                        <ColumnDesign/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertySearch;