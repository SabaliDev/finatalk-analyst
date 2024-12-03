import { auth, provider } from "./firebase";
import { signInWithPopup, signOut as firebaseSignOut, setPersistence, browserLocalPersistence, browserSessionPersistence, inMemoryPersistence } from "firebase/auth";

export const initializeAuth = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.error("Error setting auth persistence:", error);
  }
};

export const signInWithGoogle = async (duration = 'LOCAL') => {
  try {
    let persistenceType;
    if (duration === 'SESSION') {
      persistenceType = browserSessionPersistence;
    } else if (duration === 'TEMPORARY') {
      persistenceType = inMemoryPersistence;
    } else {
      persistenceType = browserLocalPersistence;
    }

    await setPersistence(auth, persistenceType);
    const result = await signInWithPopup(auth, provider);

    // Get the ID token and set the session cookie
    const idToken = await result.user.getIdToken();
    document.cookie = `__session=${idToken}; Path=/; SameSite=Lax; Secure`;

    return result.user;
  } catch (error) {
    console.error("Error during Google sign-in", error);
    return null;
  }
};
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);

    // Clear the session cookie
    document.cookie = "__session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure";
    return true;
  } catch (error) {
    console.error("Error during sign-out", error);
    return false;
  }
};
