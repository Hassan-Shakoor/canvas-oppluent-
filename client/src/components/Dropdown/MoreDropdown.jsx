
function MoreDropDown({dropdown}){
    return(
        <div
            className="rc-dropdown rc-dropdown-placement-bottomLeft"
            style={{
            inset: "100% 3% auto auto",
            boxSizing: "border-box",
            minWidth: "25.3335px"
            }}
        >
            <ul
                className="rc-menu rc-menu-root rc-menu-vertical"
                role="menu"
                tabIndex="0"
                data-menu-list="true"
            >   
                {dropdown && dropdown?.map((item, index) => (
                    <li
                        className="rc-menu-item"
                        role="menuitem"
                        tabIndex="-1"
                        data-menu-id={`rc-menu-uuid-15312-1-${index}`}
                        key={index}
                    >
                        <button type="button" className="btn btn_menu-item">
                            <span className="btn__text">{item}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div aria-hidden="true" style={{ display: "none" }}></div>
        </div>
    )
}

export default MoreDropDown;