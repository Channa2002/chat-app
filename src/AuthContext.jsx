import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
 } from 'firebase/auth';
import { auth } from "./firebaseConfig";

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAccessToken(user ? user.accessToken : user);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    setAccessToken(userCredential.user.accessToken);
  };

  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("chatlogin");
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
