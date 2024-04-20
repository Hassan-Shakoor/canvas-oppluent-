// ** Firebase
import { storage } from "../configs/firebase"; // Import your Firebase configuration

// ** Config
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

async function uploadTemplateImage(file, templateID, index = 0, isThumbnail = false) {
    try {
        const storageRef = ref(storage, `template-image-${templateID}-${isThumbnail ? 'thumbnail-' : ''}${index}.png`);

        // Attempt to get the download URL for the existing file
        let existingFileURL;
        try {
            existingFileURL = await getDownloadURL(storageRef);
        } catch (error) {
            // Ignore the error if the file does not exist
        }

        // If the file exists, delete it
        if (existingFileURL) {
            await deleteObject(storageRef);
            console.log(`Existing file 'template-image-${templateID}.png' deleted.`);
        }

        // Upload the new file and get the download URL
        const snapshot = await uploadBytes(storageRef, file);
        const imageURL = await getDownloadURL(snapshot.ref);

        // Log the download URL of the uploaded file
        console.log("File uploaded successfully:", imageURL);

        return imageURL;
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
}

export default uploadTemplateImage;
