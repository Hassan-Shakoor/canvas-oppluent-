import firebase from 'firebase/app';
import 'firebase/storage';

const uploadTemplateImage = async (file, templateID) => {
  try {
    const storageRef = firebase.storage().ref(`template-image-${templateID}.png`);

    // Upload the file
    const snapshot = await storageRef.put(file);

    // Log the download URL of the uploaded file
    console.log('File uploaded successfully:', await snapshot.ref.getDownloadURL());
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

