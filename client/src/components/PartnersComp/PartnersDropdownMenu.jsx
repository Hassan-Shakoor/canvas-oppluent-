// ** Import Library
import { Link } from 'react-router-dom'

// ** Icons
import { Icon } from "@iconify/react";

// ** RC Dropdown
import Menu, {Item as MenuItem} from 'rc-menu'

function PartnersDropdownMenu ({partnerId, setConfirmDelete}) {

    return (
        <Menu>
            <MenuItem key='edit'>
                <Link className="btn btn_menu-item" rel="" to={`/partners/${partnerId}/edit`}>
                    <span className="btn__text">
                        <Icon icon="la:pen" className="icon" />
                        Edit
                    </span>
                </Link>
            </MenuItem>
            <MenuItem key='delete'>
                <button type="button" className="btn btn_menu-item" onClick={() => setConfirmDelete(true)}>
                    <span className="btn__text">
                        <Icon icon="material-symbols:delete-outline" className="icon text-danger" />
                        Delete
                    </span>
                </button>
            </MenuItem>
        </Menu>

    )
}

export default PartnersDropdownMenu