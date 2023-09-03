import React from "react";
import Header from "../components/NavBarComp/Header";
import PropertyDashboardHeader from "../components/PropertySearchComp/PropertyDashboardHeader";
import ColumnMLS from "../components/PropertySearchComp/ColumnMLS";
import ColumnDesign from "../components/PropertySearchComp/ColumnDesign";

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