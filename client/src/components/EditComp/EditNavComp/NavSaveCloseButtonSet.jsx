import React from "react";

function NavSaveCloseButtonSet() {
  return (
    <ul className="header__button-set">
      <li className="header__text-button header__save-button" data-test="save-button">
        Save
      </li>
      <li className="header__text-button" data-test="close-button">
        Close
      </li>
    </ul>
  )
}

export default NavSaveCloseButtonSet;