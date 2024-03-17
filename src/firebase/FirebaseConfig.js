import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_WRWhWFNfpUJiVh-n_57Jgm7E7-BSdR4",
  authDomain: "ecommerce-dfcd0.firebaseapp.com",
  projectId: "ecommerce-dfcd0",
  storageBucket: "ecommerce-dfcd0.appspot.com",
  messagingSenderId: "960463412679",
  appId: "1:960463412679:web:90b11f820f7f5ac340cde2",
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
