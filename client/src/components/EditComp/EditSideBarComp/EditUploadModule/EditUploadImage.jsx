// ** React Imports
import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import getDownloadURL for retrieving file URLs

// ** Icon Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";

import { storage } from "../../../FirebaseAuthComp/firebase";

// ** Function to upload file and return its download URL
async function uploadFileAndGetURL(file) {
  // Get a reference to the Firebase Storage bucket where you want to store the file
  const storageRef = ref(storage, file.name);

  try {
    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    console.log("File uploaded to Firebase Storage successfully.");
    console.log("Download URL:", downloadURL);

    return downloadURL; // Return the download URL
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    return null; // Return null in case of an error
  }
}

function UploadImageBox() {
  // ** States
  const [selectedUploadFile, setSelectedUploadFile] = useState(null); // Initialize with null

  // ** useEffect to handle file upload
  useEffect(() => {
    if (selectedUploadFile) {
      console.log("File Chosen");
      uploadFileAndGetURL(selectedUploadFile);
    } else {
      console.log("No File Chosen");
    }
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

function UploadImageLinear() {
  // ** States
  const [selectedUploadFile, setSelectedUploadFile] = useState(null); // Initialize with null

  // ** useEffect to handle file upload
  useEffect(() => {
    if (selectedUploadFile) {
      console.log("File Chosen");
      uploadFileAndGetURL(selectedUploadFile);
    } else {
      console.log("No File Chosen");
    }
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
