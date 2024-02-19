import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../shared/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SortDropDown({ dropdown, handleSortTemplate }) {
    return (
        <div
            className="rc-dropdown rc-dropdown-placement-bottomLeft"
            style={{
                inset: "100% 3% auto auto",
                boxSizing: "border-box",
                minWidth: "25.3335px",
            }}
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