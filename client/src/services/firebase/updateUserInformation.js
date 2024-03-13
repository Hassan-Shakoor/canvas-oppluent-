import { auth } from "../../configs/firebase"
import { updateEmail, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth"
import { getDatabase, ref, set, onValue, update, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";


const authenticateUser = async (email, password) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(
    email,
    password
  )
  try {
    const authenticate = await reauthenticateWithCredential(user, credential);
    return authenticate;
  } catch (err) {
    return err
  }
}

const updateUserEmail = async (email, password) => {
  const user = auth.currentUser
  try {
    const response = await authenticateUser(user.email, password)
    await updateEmail(user, email)
    return response
  } catch (err) {
    console.log(err)
    return false
  }
}

const updateUserPassword = async (currentPassword, updatedPassword) => {
  const user = auth.currentUser
  try {
    await authenticateUser(user.email, currentPassword)
    await updatePassword(user, updatedPassword)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

const updateUserProfile = async (userData) => {
  try {
    const database = getDatabase();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = ref(database, `${uid}/accountInformation/profile`);
        const firstNameRef = child(userRef, "firstName");
        const lastNameRef = child(userRef, "lastName");
        const contactNoRef = child(userRef, "contactNo");
        const profileImageRef = child(userRef, "profileImage");
        const emailRef = child(userRef, "email");
        await set(emailRef, userData?.email);
        await set(firstNameRef, userData?.firstName);
        await set(lastNameRef, userData?.lastName);
        await set(contactNoRef, userData?.contactNo);
        await set(profileImageRef, userData?.profileImage);
      }
    });
    return true
  } catch (err) {
    return false
  }
}

const updateUserSetting = async (userData) => {
  try {
    const database = getDatabase();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = ref(database, `${uid}/accountInformation/profile`);
        const languageRef = child(userRef, "language");
        const emailRef = child(userRef, "email");
        await set(languageRef, userData?.language);
        await set(emailRef, userData?.email)
      }
    });
    return true
  } catch (err) {
    return false
  }
}

export { updateUserEmail, updateUserPassword, updateUserProfile, updateUserSetting }