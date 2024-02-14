// ** Import Libraries
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import _, { debounce } from 'lodash'
import { fetchProperty } from "../../api/mls";
import { useNavigate } from "react-router-dom";

// ** Custom Component
import SpinnerContainer from "../Loader/SpinnerContainer";
import PropertySearchList from "./PropertySearchList";
import PropertyResult from "./PropertyResult";
import WarningModal from "../Modal/WarningModal";

// ** Store
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedProperty, updateSelectedProperty } from "../../store/app/PropertySearch/property";
import { createMyDesign } from "../../services/firebase/createMyDesign";
import { LOCAL_STORAGE } from "../../shared/constant";
import { getLocalStorage } from "../../services/localStorage";

import { v4 as uuidv4 } from 'uuid';
import { isTemplateInMyDesigns } from "../../services/firebase/isTemplateInMyDesigns";
import SpinnerOverlay from "../Loader/SpinnerOverlay";

// ** Vars
const messageMap = {
  default: "Your search results will be here",
  notFound: "Properties Not Found"
}

function ColumnMLS() {
  // ** State
  const [searchFeedback, setSearchFeedback] = useState(messageMap.default)
  const [searchedProperty, setSearchedProperty] = useState("")
  const [searchedResults, setSearchedResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [overlayLoading, setOverlayLoading] = useState(false)
  const [showWarnModal, setShowWarnModal] = useState(false)

  const userData = getLocalStorage(LOCAL_STORAGE.USER_DATA)

  // ** Vars
  const navigate = useNavigate();
  const { id } = useParams()
  const dispatch = useDispatch()
  const selectedProperty = useSelector(selectSelectedProperty)

  const searchProperty = async (value) => {
    const formattedInput = _.replace(_.trim(value), /\s+/g, '+');
    if (formattedInput.length >= 4) {
      try {
        setLoading(true);
        const response = await fetchProperty(formattedInput);
        setSearchedResults([])
        if (response.length > 0) {
          setSearchedResults(response)
        } else {
          setSearchFeedback(messageMap.notFound)
        }
      } catch (error) {
        console.error('Error Fetching Properties:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  const nonMlsCreate = async (event) => {
    event.preventDefault()
    setOverlayLoading(true);
    const templateId = uuidv4();
    const templateObject = await isTemplateInMyDesigns(userData?.uid, id)
    if (templateObject.isTemplateInMyDesigns) {
      setTimeout(() => {
        setOverlayLoading(false);
        navigate(`/edit/${id}`);
      }, 2000);
    }
    else {
      await createMyDesign(userData?.uid, templateObject.templateObject, templateId)
      setTimeout(() => {
        setOverlayLoading(false);
        navigate(`/edit/${templateId}`);
      }, 2000);
    }
  }

  const handleSelectedProperty = (index) => {
    dispatch(updateSelectedProperty(searchedResults[index]))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncesPropertySearch = useCallback(debounce(async (value) => searchProperty(value), 1500), [])

  useEffect(() => {
    if (searchedProperty.length === 0) {
      setSearchFeedback(messageMap.default)
      setSearchedResults([])
    }
    debouncesPropertySearch(searchedProperty)
  }, [debouncesPropertySearch, searchedProperty])

  return (
    <div className="col-md-8 page__column">
      <ul className="tabs">
        <li className="tabs__item tabs__item_active">Property Search</li>
      </ul>
      <SpinnerOverlay loading={overlayLoading}/>
      {selectedProperty === null ? <div className="pt-4">
        <h4 className="mb-3 text-info">
          Search and populate a property's information into your design here.
        </h4>
        <div className="mb-3 search-input_full-width search-input">
          <div className="">
            <input
              autoComplete="off"
              id="search"
              name="search"
              placeholder="Enter Address or MLS # here"
              type="search"
              className="search-input__simple-input"
              value={searchedProperty}
              onChange={(e) => setSearchedProperty(e.target.value)} />
          </div>
        </div>
        {showWarnModal &&
          <WarningModal
            title={"Add Properties"}
            body={"This design hosts 1 property. Do you want to add property or continue as is?"}
            secondayBtnTxt={"Add Property"}
            primaryBtnTxt={"Create Design"}
            onClose={() => setShowWarnModal(false)}
            handleSecodnaryBtn={() => setShowWarnModal(false)}
            handlePrimaryBtn={(event) => nonMlsCreate(event)} />}
        <div className="mb-3 property-search__list">
          {searchedResults.length > 0 ? searchedResults.map((property, index) => (
            <PropertySearchList property={property} index={index} handleSelectedProperty={handleSelectedProperty} key={index} />
          )) : !loading && <div className="empty-data-set" data-test="empty-data-set">
            <div className="empty-data-set__icon-wrapper">
              <img
                src="https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/512dae34bbe771ada018.svg"
                alt="properties"
                className="empty-data-set__icon" />
            </div>
            <div className="empty-data-set__label">
              {searchFeedback}
            </div>
          </div>
          }
          <SpinnerContainer loading={loading} />
        </div>
        <div className="button-set">
          <div className="button-set button-set_flex-end">
            <button type="button" className="btn btn_border">
              <span className="btn__text">Back</span>
            </button>
            <button type="submit" className="btn" onClick={() => setShowWarnModal(true)}>
              <span className="btn__text">Create</span>
            </button>
          </div>
        </div>
      </div> :
        <PropertyResult templateId={id} />}
    </div>

  )
}

export default ColumnMLS;