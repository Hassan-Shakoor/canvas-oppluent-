import { Link } from "react-router-dom"

import { useTranslation } from 'react-i18next';


function NoPartner() {
  const { t } = useTranslation()

  return (
    <div className="empty-data-set-container">
      <div
        className="empty-data-set empty-data-set_icon-in-circle"
        data-test="empty-data-set">
        <div className="empty-data-set__icon-wrapper">
          <img
            src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/5bfd0c77f2db530b34c9.svg"
            alt="profile"
            className="empty-data-set__icon" />
        </div>
        <div className="empty-data-set__label">{t("Partners.noPartners")}</div>
      </div>
      <div className="controls-set controls-set_center">
        <Link className="btn" rel="" to="/partners/new">
          <span className="btn__text">+ {t("Partners.addNewPartner")}</span>
        </Link>
      </div>
    </div>

  )
}

export default NoPartner