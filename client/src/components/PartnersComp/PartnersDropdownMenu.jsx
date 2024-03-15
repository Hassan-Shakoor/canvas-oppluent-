// ** Import Library
import { Link } from 'react-router-dom'

// ** Icons
import { Icon } from "@iconify/react";

import { useTranslation } from 'react-i18next';
// ** RC Dropdown
import Menu, { Item as MenuItem } from 'rc-menu'


function PartnersDropdownMenu({ partnerId, setConfirmDelete }) {
    const { t } = useTranslation()

    return (
        <Menu>
            <MenuItem key='edit'>
                <Link className="btn btn_menu-item" rel="" to={`/partners/${partnerId}/edit`}>
                    <span className="btn__text">
                        <Icon icon="la:pen" className="icon" />
                        {t("edit")}
                    </span>
                </Link>
            </MenuItem>
            <MenuItem key='delete'>
                <button type="button" className="btn btn_menu-item" onClick={() => setConfirmDelete(true)}>
                    <span className="btn__text">
                        <Icon icon="material-symbols:delete-outline" className="icon text-danger" />
                        {t("delete")}
                    </span>
                </button>
            </MenuItem>
        </Menu>

    )
}

export default PartnersDropdownMenu