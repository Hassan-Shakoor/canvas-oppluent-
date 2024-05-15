// ** Import React and Dependency
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

// ** Store
import { useSelector } from 'react-redux';
import { selectUID, selectUserData } from "../../store/app/User/userPreference"
import DashboardHeaderButtons from "./DashboardHeaderButtons";
import InfiniteScrollComponent from "./InfiniteScrollComponent";

function DashboardHeader(props) {

    const { t } = useTranslation();
    // ** Vars
    const uid = useSelector(selectUID)
    const userData = useSelector(selectUserData)
    const userName = userData[uid]
    const [searchInput, setSearchInput] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    const [renderTriggerFromDashboard, setRenderTriggerFromDashboard] = useState(false);

    const getSearchInput = (value) => {
        setSearchInput(value)
    }

    // console.log(selectedItems)

    return (
        <div className="container">
            <div className="announcement mt-3">
                <h1 className="announcement__welcome">{t("Home.welcome")} {userName}.</h1>
            </div>
            
            <DashboardHeaderButtons
                gridColumn={props.gridColumn}
                handleSortTemplate={props.handleSortTemplate}
                handleColumn={props.handleColumn}
                getSearchInput={getSearchInput}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                renderTriggerFromDashboard={renderTriggerFromDashboard}
                setRenderTriggerFromDashboard={setRenderTriggerFromDashboard}
            />

            <InfiniteScrollComponent
                category={props.category}
                gridColumn={props.gridColumn}
                searchInput={searchInput}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                renderTriggerFromDashboard={renderTriggerFromDashboard}
                setRenderTriggerFromDashboard={setRenderTriggerFromDashboard}
            />

        </div>
    )
}

export default DashboardHeader;