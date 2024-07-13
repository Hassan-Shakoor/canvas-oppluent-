// ** Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from 'uuid';

// ** Config
import { storage } from '../configs/firebase'

async function uploadImageinUploadsAndGetUrl(authID, file) {
  // Get a reference to the Firebase Storage bucket where you want to store the file
  const uniqueFileName = `${uuidv4()}_${file.name}`;

  const storageRef = ref(storage, `${authID}/uploads/${uniqueFileName}`);

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

export default uploadImageinUploadsAndGetUrl