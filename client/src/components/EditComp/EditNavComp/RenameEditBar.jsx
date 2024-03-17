import React from "react";
import { useSelector } from "react-redux";
import { selectTemplateData } from "../../../store/app/Edit/Canvas/canvas";

function RenameEditBar(){
    const templateObject = useSelector(selectTemplateData);

    return (
        <label className="input header__title-input input_has-value">
            <input
                type="text"
                className="simple-input input_transparent-bg"
                value={templateObject.cardTitle}
            />
        </label>
    )
}

export default RenameEditBar;