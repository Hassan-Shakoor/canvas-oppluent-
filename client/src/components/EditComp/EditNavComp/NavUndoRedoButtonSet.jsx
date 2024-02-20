import React from "react";

function NavUndoRedoButtonSet() {
    return (
        <ul className="header__button-set">
            <li className="header__text-button" data-test="undo-button">
                Undo
            </li>
            <li className="header__text-button" data-test="redo-button">
                Redo
            </li>
        </ul>
    );
}

export default NavUndoRedoButtonSet;
