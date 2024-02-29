import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../shared/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

function SortDropDown({ dropdown, handleSortTemplate, setOpenSortDropDown }) {

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Clicked outside the dropdown, close it
                setOpenSortDropDown(false);
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="rc-dropdown rc-dropdown-placement-bottomLeft"
            style={{
                inset: "100% 3% auto auto",
                boxSizing: "border-box",
                minWidth: "25.3335px",
            }}
            ref={dropdownRef}
        >
            <ul
                className="rc-menu rc-menu-root rc-menu-vertical"
                role="menu"
                tabIndex="0"
                data-menu-list="true"
            >
                {dropdown &&
                    dropdown?.map((item, index) => (
                        <li
                            className="rc-menu-item rc-menu-width"
                            role="menuitem"
                            tabIndex="-1"
                            data-menu-id={`rc-menu-uuid-15312-1-${index}`}
                            key={index}
                        >
                            {/* <Link
                                Link
                                to={item.link}
                                target={"_blank"}
                                className="text-no-decoration"
                            > */}
                            <button type="button" className="btn btn_menu-item" >
                                {/* <FontAwesomeIcon icon={item.iconClass} />  */}
                                {item.title}
                            </button>
                            {/* </Link> */}
                        </li>
                    ))}
            </ul>
            <div aria-hidden="true" style={{ display: "none" }}></div>
        </div>
    );
}

export default SortDropDown;
