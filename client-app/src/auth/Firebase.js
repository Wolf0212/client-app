import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_vNmHmIePzNKQNdaZV0Qtr_ddt_vUxKI",
  authDomain: "onlyfanblob.firebaseapp.com",
  projectId: "onlyfanblob",
  storageBucket: "onlyfanblob.appspot.com",
  messagingSenderId: "1075794351976",
  appId: "1:1075794351976:web:cb83770bb1028efa77a8dd",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider).then((data) => {
    console.log(data);
    return data;
  });
};

export const storage = getStorage(app);
