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
  signInWithCustomToken,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  updateProfile,
  User,

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

export const createUserInformation = async (email: string, password: string, username: string) => {
  try {
    const createdInfo = await createUserWithEmailAndPassword(auth, email, password);
    const user = createdInfo.user;

    updateProfile(user, {
      displayName: username
    });

    console.log('user created:', user);
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     signInWithRedirect(auth, )
    //   }
    // });
    return true;
  } catch (error) {
    console.log(error);
    console.log('an error has occurred');
    return false;
  };

};

export const signingOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('loginInfo');
  } catch {
    console.log('There was an error logging out');
  }
};

export const signingIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const currentUser = auth.currentUser?.displayName;
    console.log(currentUser + ' has logged in');
    return auth.currentUser;
  } catch (error) {
    console.log("There was an error logging in");
    console.log(error);
  }
};

let IUser: User;
export const currentUserInfo = auth.currentUser;
console.log(currentUserInfo);
// function authStateObserver(user: User | null) {
//   if(user) {


//   }
// }

export function initFirebaseAuth(user: User | null) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log('user status:', user);
    }
  });
};


export { IUser, auth, onAuthStateChanged };
