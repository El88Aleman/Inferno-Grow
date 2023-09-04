import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE,
  messagingSenderId: import.meta.env.VITE_MESSAGIN,
  appId: import.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);

export const onSignIn = async ({ email, password }) => {
  try {
    const res = signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  signOut(auth);
};

let googleProvider = new GoogleAuthProvider();

export const loginGoogle = async () => {
  const res = signInWithPopup(auth, googleProvider);
  return res;
};

export const signUp = async ({ email, password }) => {
  let res = await createUserWithEmailAndPassword(auth, email, password);
  return res;
};

export const forgotPassword = async (email) => {
  let res = await sendPasswordResetEmail(auth, email);
  return res;
};
