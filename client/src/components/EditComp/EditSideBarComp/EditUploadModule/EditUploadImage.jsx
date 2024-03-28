// ** React Imports
import React, { useEffect, useState } from "react";

// ** Services
import uploadFileAndGetURL from "../../../../services/uploadFileAndGetURL";

// ** Icon Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";
import uploadImageinUploadsAndGetUrl from "../../../../services/uploadImageinUploadsAndGetUrl";

function UploadImageBox({ userId, triggerRender, setTriggerRender }) {
  // ** States
  const [selectedUploadFile, setSelectedUploadFile] = useState(null);

  useEffect(() => {

    const uploadImage = async () => {
      if (selectedUploadFile) {
        console.log("File Chosen");
        // await uploadFileAndGetURL(selectedUploadFile);
        await uploadImageinUploadsAndGetUrl(userId, selectedUploadFile);
        setTriggerRender(!triggerRender);
      } else {
        console.log("No File Chosen");
      }
    }

    uploadImage();

  }, [selectedUploadFile]);

  return (
    <label className="dropzone media-library__dropbox mb-2">
      <div className="media-library__dropbox-icon-wrapper">
        <FontAwesomeIcon
          className="font-icon"
          icon="fa-solid fa-arrow-up"
          style={{
            color: "#ffffff",
          }}
        />
      </div>
      <input
        accept=".png, .jpg, .jpeg, .svg"
        multiple={false}
        type="file"
        autoComplete="off"
        tabIndex={-1}
        defaultValue=""
        style={{
          display: "none",
        }}
        onChange={(event) => setSelectedUploadFile(event.target.files[0])}
      />
      <div className="media-library__dropbox-title">Upload Image</div>
      <div className="media-library__dropbox-text">
        Click image on the template to replace.
      </div>
    </label>
  );
}

function UploadImageLinear({ userId, triggerRender, setTriggerRender }) {
  // ** States
  const [selectedUploadFile, setSelectedUploadFile] = useState(null); // Initialize with null

  // ** useEffect to handle file upload
  useEffect(() => {
    const uploadImage = async () => {
      if (selectedUploadFile) {
        console.log("File Chosen");
        await uploadImageinUploadsAndGetUrl(userId, selectedUploadFile);
        setTriggerRender(!triggerRender);
      } else {
        console.log("No File Chosen");
      }
    }

    uploadImage();
  }, [selectedUploadFile]);

  return (
    <label
      tabIndex={0}
      className="dropzone media-library__dropbox mb-2 media-library__dropbox_inline"
    >
      <input
        accept=".png, .jpg, .jpeg, .svg"
        multiple={false}
        type="file"
        autoComplete="off"
        tabIndex={-1}
        defaultValue=""
        style={{ display: "none" }}
        onChange={(event) => setSelectedUploadFile(event.target.files[0])}
      />
      <Icon icon="gala:add" width="0.875rem" height="0.875rem" />
      <div className="media-library__dropbox-title">Upload Image</div>
      <div className="media-library__dropbox-text">
        Click image on the template to replace.
      </div>
    </label>
  );
}

export { UploadImageBox, UploadImageLinear };
