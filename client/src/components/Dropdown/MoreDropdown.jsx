import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
import { BASE_URL } from "../../shared/constant";

function MoreDropDown({dropdown, dropdownLinks, id, userId, categoryId}){
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
                             {index === 0 && <a href={`${dropdownLinks.item.imageUrl}`} download target="_blank" className="text-no-decoration"><span className="btn__text">{item}</span></a>}
                             {index === 1 && <a onClick={()=> {
                                navigator.clipboard.writeText(`${BASE_URL}/share/${userId}/${categoryId}/${id}`)
                                toast.success("Link Copied")
                                }}><span className="btn__text">{item}</span></a>}
                             {index === 2 && <Link to={`/share/${userId}/${categoryId}/${id}`} target={'_blank'} className="text-no-decoration"><span className="btn__text ">{item}</span></Link>}
                        </button>
                    </li>
                ))}
            </ul>
            <div aria-hidden="true" style={{ display: "none" }}></div>
        </div>
    )
}

export default MoreDropDown;