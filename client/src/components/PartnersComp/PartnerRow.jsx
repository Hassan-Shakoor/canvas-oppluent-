// ** Import Library
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// ** Icon
import { Icon } from "@iconify/react";

// ** RC Dropdown
import Dropdown from "rc-dropdown";

// ** Custom Component
import PartnersDropdownMenu from "./PartnersDropdownMenu";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { toast } from "react-toastify";

// ** Store
import {
  deletePartner,
  fetchPartnerData,
  selectPartner,
  updatePartner,
} from "../../store/app/Partner/partner";

function PartnerRow({ partner, id, checked, handleSelect }) {
  // ** State
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPrimary, setIsPrimary] = useState(partner.primary);

  // ** Vars
  const dispatch = useDispatch();

  const handleDelete = (event, id) => {
    event.preventDefault();
    dispatch(deletePartner(id));
    setConfirmDelete(false);
    toast.success("Partner successfully deleted.");
  };

  const handlePrimary = (event, id) => {
    event.preventDefault();
    setIsPrimary(!isPrimary);    
    toast.success("Partner successfully updated.");
  };

  useEffect(()=>{
    const updatedPartner = { ...partner, primary: isPrimary };
    dispatch(updatePartner([updatedPartner]));
  },[isPrimary])

  useEffect(() => {
    dispatch(fetchPartnerData());
  }, [confirmDelete, isPrimary]);

  return (
    <>
      <div className="rt-tr-group" role="rowgroup">
        <div className="rt-tr -odd" role="row">
          <div
            className="rt-td"
            role="gridcell"
            style={{
              flex: "50 0 auto",
              width: 50,
              maxWidth: 50,
            }}
            onClick={() => handleSelect(id)}
          >
            <label className="checkbox" htmlFor="select_partner_278120">
              <input
                className="checkbox__input"
                type="checkbox"
                checked={checked.includes(id)}
              />
              <div className="checkbox__box">
                <div className="checkbox__tick">
                  <Icon icon="material-symbols:check" />
                </div>
              </div>
            </label>
          </div>
          <div
            className="rt-td rt-align-left"
            role="gridcell"
            style={{
              flex: "100 0 auto",
              width: 100,
            }}
          >
            <div className="ReactTable__avatar-container">
              {partner?.profilePhoto === "" ? (
                <div
                  className="ReactTable__avatar ReactTable__avatar_small ReactTable__avatar_pt-12"
                  style={{
                    backgroundColor: "rgb(156, 141, 100)",
                  }}
                >
                  <p className="ReactTable__avatar_initials">{`${(partner?.firstName)
                    .slice(0, 1)
                    .toUpperCase()} ${(partner?.lastName)
                    .slice(0, 1)
                    .toUpperCase()}`}</p>
                </div>
              ) : (
                <img
                  className="ReactTable__avatar"
                  src={partner?.profilePhoto}
                  alt={`${partner?.firstName} ${partner?.lastName}`}
                />
              )}
              <div className="ReactTable__info-lines">
                <h5 className="ReactTable__top-line">{`${partner?.firstName} ${partner?.lastName}`}</h5>
                <p className="ReactTable__sub-line">{partner?.email}</p>
              </div>
            </div>
          </div>
          <div
            className="rt-td rt-align-right md-hide"
            role="gridcell"
            style={{
              flex: "145 0 auto",
              width: 145,
              maxWidth: 145,
            }}
          >
            {isPrimary ? (
              <button
                onClick={(event) => handlePrimary(event, partner.id)}
                type="button"
                className="btn btn_badge btn_no-text-transform me-2"
              >
                <span className="btn__text">Primary</span>
              </button>
            ) : (
              <button
                onClick={(event) => handlePrimary(event, partner.id)}
                type="button"
                className="btn btn_gray btn_no-text-transform me-2"
              >
                <span className="btn__text">Make Primary</span>
              </button>
            )}
          </div>
          <div
            className="rt-td ReactTable__controls"
            role="gridcell"
            style={{
              flex: "40 0 auto",
              width: 40,
              maxWidth: 40,
            }}
          >
            <Dropdown
              trigger={["click"]}
              overlay={
                <PartnersDropdownMenu
                  partnerId={id}
                  setConfirmDelete={setConfirmDelete}
                />
              }
            >
              <button type="button" className="btn btn_icon">
                <svg className="icon v2-icon v2-icon-option-vertical">
                  <use
                    href="#v2-icon-option-vertical"
                    xlinkHref="#v2-icon-option-vertical"
                  />
                </svg>
                <span className="btn__text" />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      {confirmDelete && (
        <ConfirmationModal
          title={"Delete Confirmation"}
          body={`Do You Want To Delete ${partner.firstName} ${partner.lastName}?`}
          secondaryBtnTxt={"Cancel"}
          primaryBtnTxt={"Delete"}
          close={() => setConfirmDelete(false)}
          submit={(event) => handleDelete(event, partner.id)}
        />
      )}
    </>
  );
}

export default PartnerRow;
