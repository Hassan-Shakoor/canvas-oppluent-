// ** Import Library
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// ** Icon
import { Icon } from "@iconify/react";

// ** Store
import {
  deletePartner,
  selectPartner,
  fetchPartnerData,
  selectSearchPartner,
  updatePartner,
  primaryPartner,
  makePrimary,
} from "../../store/app/Partner/partner";
import PartnerRow from "./PartnerRow";
import { useEffect, useState } from "react";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";

function PartnerLists() {
  const { t } = useTranslation()

  // ** State
  const [checked, setChecked] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isPrimary, setIsPrimary] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ** vars
  const dispatch = useDispatch();
  const partnerList = useSelector(selectPartner);
  const search = useSelector(selectSearchPartner);

  const filteredPartnerList = partnerList.filter((partner) => {
    return (
      partner?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      partner?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      partner?.email?.toLowerCase().includes(search.toLowerCase()) ||
      partner?.contactNumber?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSelect = (id) => {
    checked.includes(id)
      ? setChecked(checked.filter((item) => item !== id))
      : setChecked([...checked, id]);
  };

  const handeDeleteAll = (event) => {
    event.preventDefault();
    dispatch(deletePartner(0));
    setShowConfirmationModal(false);
  };

  const handleSelectAll = () => {
    setChecked(
      !isAllSelected
        ? Array.from({ length: partnerList.length }, (_, index) => index)
        : []
    );
    setIsAllSelected(!isAllSelected);
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    dispatch(deletePartner(id));
    setConfirmDelete(false);
    toast.success("Partner successfully deleted.");
  };

  const handlePrimary = (event, partnerData, id) => {
    event.preventDefault();
    console.log(id, partnerData);
    const existingPrimaryPartner = partnerList.find(
      (partner) => partner.primary
    );
    const updateCurrentPartner = { ...partnerData, primary: true };
    const updateExistingPartner = { ...existingPrimaryPartner, primary: false, };

    if (existingPrimaryPartner?.id !== id) {
        dispatch(primaryPartner([updateExistingPartner, updateCurrentPartner]));
        dispatch(makePrimary({partnerId : id}))
    }else{
        dispatch(primaryPartner([updateCurrentPartner]))
        dispatch(makePrimary({partnerId : id}))
    }
  }


  useEffect(() => {
    dispatch(fetchPartnerData());
    setIsPrimary(() => partnerList.some(partner => partner.primary))
  }, [showConfirmationModal, dispatch, confirmDelete, isPrimary]);

  return (
    <>
      <div className="controls-set controls-set_end">
        <Link className="btn btn_gray me-2" rel="" to="/partners/new">
          <span className="btn__text">+ {t("Partners.addNewPartner")}</span>
        </Link>
      </div>
      {checked.length === partnerList.length && (
        <div
          className="controls-set controls-set_bulk-actions"
          onClick={() => setShowConfirmationModal(true)}
        >
          <div className="controls-set__item">
            <button type="button" className="btn btn_secondary">
              <span className="btn__text">{t("delete")} All</span>
            </button>
          </div>
        </div>
      )}

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
                      checked={checked.length === partnerList.length}
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
            {[...filteredPartnerList].map((partner, index) => (
              <PartnerRow
                key={index}
                partner={partner}
                handlePrimary={handlePrimary}
                isPrimary={isPrimary}
                id={index}
                checked={checked}
                handleSelect={handleSelect}
                handleDelete={handleDelete}
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
              />
            ))}
          </div>
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          title={"Delete Confirmation"}
          body={`Do You Want To Delete selected partner?`}
          secondaryBtnTxt={"Cancel"}
          primaryBtnTxt={"Delete"}
          close={() => setShowConfirmationModal(false)}
          submit={(event) => handeDeleteAll(event)}
        />
      )}
    </>
  );
}

export default PartnerLists;
