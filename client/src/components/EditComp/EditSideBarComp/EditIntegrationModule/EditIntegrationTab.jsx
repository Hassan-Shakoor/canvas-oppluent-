// ** Import React
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ** Custom Component
import EditPropertySearchModal from "./EditPropertySearchModal";

// ** Store
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectOpenDrawer } from "../../../../store/app/Edit/EditDrawer";

function EditIntegrationTab(props) {
  // ** State
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ** Hooks
  const openDrawer = useSelector(selectOpenDrawer)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div
      className={openDrawer === 'Integrations'
      ? "sidebar-module vertical-switch-content-enter-done"
      : "sidebar-module vertical-switch-content-exit-done"}>
      <div className="sidebar-module__title">Integrations</div>
      <div className="sidebar-module__divider"/>
      <div className="sidebar-tiles">
        <div className="sidebar-tiles__item" onClick={toggleModal}>
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-house" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">Property Search</div>
          </div>
        </div>
        <div className="sidebar-tiles__item sidebar-tiles__item_disabled">
          <div className="sidebar-tiles__tile">
            <FontAwesomeIcon icon="fa-solid fa-comments" className="sidebar-tiles__tile-icon"/>
            <div className="sidebar-tiles__tile-title">Testimonials</div>
          </div>
        </div>
      </div>
      {isModalOpen && <EditPropertySearchModal isModalOpen={isModalOpen} toggleModal={toggleModal}/>}
    </div>
  )
}

export default EditIntegrationTab;