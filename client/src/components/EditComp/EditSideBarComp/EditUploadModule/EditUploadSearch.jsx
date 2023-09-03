// ** React Import
import React, {useState} from "react";
import _ from "lodash";
import { fetchImagesPixabay } from "../../../../api/pixabay";

// ** Icon Import
import { Icon } from "@iconify/react";
import SpinnerOverlay from "./SpinnerOverlay";

function EditUploadSearch ({showPanel , searchMap , setShowPanel, setImgContainer}){
  // ** States
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false)

  const debouncedSearchChangeHandler = _.debounce(async (value) => {
    if (showPanel === 'default') {
      const formattedInput = _.replace(_.trim(value), /\s+/g, '+');
      try {
        setLoading(true)
        const imagesResponse = await fetchImagesPixabay(formattedInput);
        setImgContainer(imagesResponse.data.hits);
        setShowPanel('pixabay');
        setLoading(false)
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
  }, 1500);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedSearchChangeHandler(newValue);
    if (newValue === "") {
      setShowPanel('default')
    }
  };
    return (
        <div className="input-group input-group_without-separators mb-2">
          <div className="small-search small-search_bordered">
            <div className="small-search__icon-wrapper">
              <Icon icon="ph:magnifying-glass" />
            </div>
            <div className="small-search__input">
              <input
                autoComplete="off"
                id="small-search"
                name={showPanel}
                placeholder={searchMap[showPanel].placeholder}
                type="search"
                className="simple-input"
                value={inputValue}
                onChange={handleInputChange}/>
            </div>
          </div>
          <SpinnerOverlay loading={loading}/>
        </div>
    )
}

export default EditUploadSearch