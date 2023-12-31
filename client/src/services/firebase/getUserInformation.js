import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../configs/firebase"


const getUserInformation = async () => {
    try {
      const database = getDatabase();
      const user = await new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => resolve(user));
      });
  
      if (user) {
        const uid = user.uid;
        const userRef = ref(database, `${uid}/accountInformation/profile`);
        const snapshot = await new Promise((resolve) => {
          onValue(userRef, (snapshot) => resolve(snapshot));
        });
        const userData = snapshot.val();
        return userData;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
     

export { getUserInformation }