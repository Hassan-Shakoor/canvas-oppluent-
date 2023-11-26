// ** Import Library
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

// ** Icon
import { Icon } from "@iconify/react"

// ** Store
import { selectPartner, updatePartnerList } from "../../store/app/Partner/partner"
import PartnerRow from "./PartnerRow"
import { useState } from "react"
import ConfirmationModal from "../Modal/ConfirmationModal"

function PartnerLists() {
    // ** State
    const [checked, setChecked] = useState([])
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    // ** vars 
    const dispatch = useDispatch()
    const partnerList = useSelector(selectPartner)

    const handleSelect = (id) => {
        checked.includes(id) ? setChecked(checked.filter(item => item !== id)) : setChecked([...checked,id])
    }

    const handeDeleteAll = (event) => {
        event.preventDefault()
        dispatch(updatePartnerList([...partnerList].filter((partner,index) => !checked.includes(index))))
        setShowConfirmationModal(false)
    }

    const handleSelectAll = () => {
        setChecked(!isAllSelected ? Array.from({ length: partnerList.length }, (_, index) => index) : []);
        setIsAllSelected(!isAllSelected);
      };
      

  return (
    <>
        <div className="controls-set controls-set_end">
            <Link className="btn btn_gray me-2" rel="" to="/partners/new">
                <span className="btn__text">+ Add New Partner</span>
            </Link>
        </div>
        {checked.length !== 0 && <div className="controls-set controls-set_bulk-actions" onClick={() => setShowConfirmationModal(true)}>
            <div className="controls-set__item">
                <button type="button" className="btn btn_secondary">
                    <span className="btn__text">Delete All</span>
                </button>
            </div>
        </div>}

        <div className="ReactTable ReactTable_reset-min-width ReactTable_with-inner-padding ReactTable_with-rounded-rows mb-3">
            <div className="rt-table" role="grid">
                <div className="rt-thead -header" style={{ minWidth: 335 }}>
                    <div className="rt-tr" role="row">
                        <div
                        className="rt-th"
                        role="columnheader"
                        tabIndex={-1}
                        style={{ flex: "50 0 auto", width: 50, maxWidth: 50 }}
                        >
                        <div className="">
                            <label className="checkbox" htmlFor="select_all">
                            <input
                                className="checkbox__input"
                                id="select_all"
                                type="checkbox"
                                checked = {checked.length === partnerList.length}
                                onChange={handleSelectAll}
                            />
                            <div className="checkbox__box">
                                <div className="checkbox__tick">
                                <Icon icon="material-symbols:check" />
                                </div>
                            </div>
                            </label>
                        </div>
                        </div>
                        <div
                        className="rt-th"
                        role="columnheader"
                        tabIndex={-1}
                        style={{ flex: "100 0 auto", width: 100 }}
                        >
                        <div className="" />
                        </div>
                        <div
                        className="rt-th md-hide"
                        role="columnheader"
                        tabIndex={-1}
                        style={{ flex: "145 0 auto", width: 145, maxWidth: 145 }}
                        >
                        <div className="" />
                        </div>
                        <div
                        className="rt-th"
                        role="columnheader"
                        tabIndex={-1}
                        style={{ flex: "40 0 auto", width: 40, maxWidth: 40 }}
                        >
                        <div className="" />
                        </div>
                    </div>
                </div>
                <div className="rt-tbody" style={{ minWidth: 335 }}>
                    {[...partnerList].map((partner,index) => <PartnerRow key={index} partner={partner} id={index} checked={checked} handleSelect={handleSelect}/>)}
                </div>
            </div>
            </div>
            {showConfirmationModal && 
            <ConfirmationModal
                title={"Delete Confirmation"}
                body={`Do You Want To Delete selected partner?`}
                secondaryBtnTxt={"Cancel"}
                primaryBtnTxt={"Delete"}
                close={() => setShowConfirmationModal(false)}
                submit={(event) => handeDeleteAll(event)}
            />}
    </>
  )
}

export default PartnerLists