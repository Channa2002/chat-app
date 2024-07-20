import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
 } from 'firebase/auth';
import { auth, db } from "./firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const login = async (userData) => {
      const user = {
        uid: userData.uid,
        name: userData.displayName,
        email: userData.email,
        status: "Online",
        image: userData.photoURL,
        metadata: [Object.keys(userData.metadata).join("-"), Object.values(userData.metadata).join("-")],
        lastseen: new Date(),
        friend: [],
      }
      try {
            const q1 = query(collection(db, 'users'), where('uid', '==', user.uid));
            const querySnapshot1 = await getDocs(q1);
            const products1 = querySnapshot1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // Add a new document with the specified data
            if (products1.length > 0) {
              return products1[0];
            } else {
              const docRef = await addDoc(collection(db, 'users'), user);
              console.log('Document written with ID: ', docRef.id);
              delete user["uid"];
              return { ...user, id: docRef.id };
            }
            // Reset the form or handle success
        } catch (error) {
            console.error('Error adding document: ', error);
            return "error";
            // Handle errors
        }
}

const AuthContext = createContext({
  accessToken: "no",
  setAccessToken: () => {},
  signInWithGoogle: () => {},
  logOut: () => {},
});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("no");

  useEffect(() => {
    // Check for user on initial render and after sign in/out
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await login(user);
        setAccessToken(userData);
      } else {
        setAccessToken(user);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    const userData = login(userCredential.user);
    setAccessToken(userData);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, signInWithGoogle, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
