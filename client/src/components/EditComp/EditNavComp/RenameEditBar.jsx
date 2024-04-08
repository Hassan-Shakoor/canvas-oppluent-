import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTemplateData, updateTemplateData } from "../../../store/app/Edit/Canvas/canvas";


function RenameEditBar() {
    const dispatch = useDispatch();
    const templateObject = useSelector(selectTemplateData);

    const handleInputChange = (e) => {
        const updatedTemplateObject = { ...templateObject, cardTitle: e.target.value };
        dispatch(updateTemplateData(updatedTemplateObject));
    };

    return (
        <label className="input header__title-input input_has-value">
            <input
                type="text"
                className="simple-input input_transparent-bg"
                value={templateObject.cardTitle}
                onChange={handleInputChange}
            />
        </label>
    );
}

export default RenameEditBar;
