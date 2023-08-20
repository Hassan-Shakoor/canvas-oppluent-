import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAK9qTAirpx9Pi9cSbQ9XKbrWfutoyW7hA",
  authDomain: "clarious-f4f45.firebaseapp.com",
  projectId: "clarious-f4f45",
  storageBucket: "clarious-f4f45.appspot.com",
  messagingSenderId: "427609388747",
  appId: "1:427609388747:web:c1de4f8128634a273d4d4e",
  measurementId: "G-EZV6DTFQPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app;
export { app, auth, firebaseConfig };