// ** React Import
import React, {useEffect, useState} from "react";
import axios from "axios";

// ** Icon Import
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";

function UploadImageBox(){
    // ** States
    const [selectedUploadFile,setSelectedUploadFile] = useState([]);

    useEffect(()=> {
        if(!selectedUploadFile){console.log("No File Chosen")
        }else{
            console.log("File Chosen")
            saveFileinDB(selectedUploadFile);
            const fd = new FormData();
            fd.append('file',selectedUploadFile)
            axios.post('https://httpbin.org/post',fd ,{
                onUploadProgress:(progressEvent) => {console.log(progressEvent.progress*100)}
            })
            .then(res => console.log(res.data))
            .catch(error => console.log(error ))
        }
    },[selectedUploadFile])
    return(
        <label className="dropzone media-library__dropbox mb-2">
          <div className="media-library__dropbox-icon-wrapper">
            <FontAwesomeIcon
              className="font-icon"
              icon="fa-solid fa-arrow-up"
              style={{
              color: "#ffffff"
            }}/>
          </div>
            <input
              accept=".png, .jpg, .jpeg, .svg"
              multiple={false}
              type="file"
              autoComplete="off"
              tabIndex={-1}
              defaultValue=""
              style={{
              display: "none"
            }}
              onChange={(event) => setSelectedUploadFile(event.target.files[0])}/>
          <div className="media-library__dropbox-title">Upload Image</div>
          <div className="media-library__dropbox-text">
            Click image on template to replace.
          </div>
        </label>
    )
}
async function saveFileinDB(file){
  //const saveUploadedFile = await saveUploadedFile(file);
}
function UploadImageLinear () {
  return(
    <label
        tabIndex={0}
        className="dropzone media-library__dropbox mb-2 media-library__dropbox_inline"
    >
        <input
        accept=".png, .jpg, .jpeg, .svg"
        multiple=""
        type="file"
        autoComplete="off"
        tabIndex={-1}
        defaultValue=""
        style={{ display: "none" }}
        />
        <Icon icon="gala:add" width='0.875rem' height='0.875rem'/>
        <div className="media-library__dropbox-title">Upload Image</div>
        <div className="media-library__dropbox-text">
        Click image on template to replace.
        </div>
    </label>
  )
}

export {UploadImageBox , UploadImageLinear}