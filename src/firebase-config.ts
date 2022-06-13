// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUrU3eINb-vn5fnsKUpXaQI5fhjxFpuoY",
  authDomain: "clocked-out.firebaseapp.com",
  projectId: "clocked-out",
  storageBucket: "clocked-out.appspot.com",
  messagingSenderId: "348242359935",
  appId: "1:348242359935:web:c68eafe659d3fed61b714a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth();

export const createUserInformation = async (email: string, password: string,) => {
  try {
    const createdInfo = await createUserWithEmailAndPassword(auth, email, password);
    const user = createdInfo.user;
    console.log('user created:', user);

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     signInWithRedirect(auth, )
    //   }
    // });
    return true;
  } catch {
    console.log('an error has occurred');
    return false;
  };

};