// ** Firebase
import { list, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../configs/firebase";

const getUploadImages = async (authID) => {
  try {
    const storageRef = ref(storage, `${authID}/uploads`);
    const res = await list(storageRef);

    const imagePromises = res.items.map((itemRef) => getDownloadURL(itemRef));
    const urls = await Promise.all(imagePromises);

    // Sort the URLs array in reverse order to get the latest image first
    urls.sort((a, b) => b.timestamp - a.timestamp); // Assuming the URL objects have a timestamp property

    return urls;
  } catch (error) {
    console.error("Error fetching upload data:", error);
    throw error;
  }
};

export default getUploadImages;
