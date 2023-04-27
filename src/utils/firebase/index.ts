import { useAuthUser, useProducts } from "@utils/store";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  FirestoreError,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";

import PRODUCTS from "../../shop-data.json";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userAuth: User) => {
  const { displayName, email } = userAuth;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    try {
      const createdAt = new Date();
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error: unknown) {
      if (error instanceof FirestoreError) {
        console.log("error creating the user", error.message);
      }
    }
  }

  return userDocRef;
};

/**
 * Document exists but is potentially missing a displayName
 * depending on how account was created
 *
 * @see createUserWithEmailAndPassword()
 */
export const updateUserDocumentDisplayName = async (
  userAuth: User,
  displayName: string
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.get("displayName")) {
    try {
      await updateDoc(userDocRef, { displayName });
    } catch (error: unknown) {
      if (error instanceof FirestoreError) {
        console.log("error creating the user", error.message);
      }
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const useAuthUpdate = () => {
  const setUser = useAuthUser((state) => state.setUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setUser(user);
    });

    return unsubscribe;
  }, []);
};

export const useFetchProducts = () => {
  const setProducts = useProducts((state) => state.setProducts);
  useEffect(() => {
    setProducts(PRODUCTS);
  }, []);
};

export default app;
