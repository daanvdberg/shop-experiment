import { useEffect } from "react";
import { Category, Product, useProducts } from "@utils/store";
import {
  FirestoreError,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
  PartialWithFieldValue,
} from "firebase/firestore";
import { User } from "firebase/auth";
import app from "@utils/firebase";

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

/**
 * Converter to help firestore infer the correct data type
 */
const firestoreDataConverter = <T>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const fetchCategories = async () => {
  const collectionRef = collection(db, "categories").withConverter(
    firestoreDataConverter<Category>()
  );
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((i) => i.data());
};

export const fetchProducts = async () => {
  const collectionRef = collection(db, "products").withConverter(
    firestoreDataConverter<Product>()
  );
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((i) => i.data());
};

export const useFetchProducts = () => {
  const setCategories = useProducts((state) => state.setCategories);
  const setProducts = useProducts((state) => state.setProducts);
  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
    });
    fetchProducts().then((products) => {
      setProducts(products);
    });
  }, []);
};
