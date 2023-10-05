// ** Firebase
import { list, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../components/FirebaseAuthComp/firebase";

export const getUploads = async () => {
  try {
    const storageRef = ref(storage);
    const res = await list(storageRef);

    const imagePromises = res.items.map((itemRef) => getDownloadURL(itemRef));
    const urls = await Promise.all(imagePromises);

    return urls;
  } catch (error) {
    console.error("Error fetching upload data:", error);
    throw error;
  }
};
