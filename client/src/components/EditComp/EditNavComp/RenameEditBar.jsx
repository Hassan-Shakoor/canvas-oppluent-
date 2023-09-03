import React from "react";

function RenameEditBar(){
    return (
        <label className="input header__title-input input_has-value">
            <input
                type="text"
                className="simple-input input_transparent-bg"
                defaultValue="4-Paged Property Brochure"
            />
        </label>
    )
}

export default RenameEditBar;