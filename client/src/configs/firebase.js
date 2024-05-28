import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-YniD3GoGtUXkfHBDLygrfuREpvj8b1U",
  authDomain: "opulent-reality.firebaseapp.com",
  projectId: "opulent-reality",
  storageBucket: "opulent-reality.appspot.com",
  messagingSenderId: "427202311465",
  appId: "1:427202311465:web:65ba25684ec401cbd5f338",
  measurementId: "G-VDPSNE92CB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export default app;
export { app, auth, storage };
