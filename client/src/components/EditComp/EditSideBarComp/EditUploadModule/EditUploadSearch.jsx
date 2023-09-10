// ** React Import
import React, {useCallback, useState} from "react";
import _, { debounce } from 'lodash'
import { fetchImagesPixabay } from "../../../../api/pixabay";

// ** Icon Import
import { Icon } from "@iconify/react";
import SpinnerOverlay from "../../../Loader/SpinnerOverlay";

function EditUploadSearch ({showPanel , searchMap , setShowPanel, setImgContainer}){
  // ** States
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false)

  const getImages = async (value) => {
    if (showPanel !== 'default' || value === "" || value.length <= 1) {
      return;
    }
  
    const formattedInput = _.replace(_.trim(value), /\s+/g, '+');
    
    try {
      setLoading(true);
      const imagesResponse = await fetchImagesPixabay(formattedInput);
      setImgContainer(imagesResponse.hits);
      setShowPanel('pixabay');
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };  

  const debouncedSearchChangeHandler = useCallback( debounce(async (value) => getImages(value), 1500),[])

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (newValue === "") {
      setShowPanel('default')
    }else{
      debouncedSearchChangeHandler(newValue);
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