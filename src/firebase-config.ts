import { profanities } from 'profanities';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
  DocumentData,
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

import { getDatabase } from "firebase/database";


import { filterBadWords, profanityList } from "./Helpers/utils";
import { IDatabaseArgs } from './Helpers/interface';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUrU3eINb-vn5fnsKUpXaQI5fhjxFpuoY",
  authDomain: "clocked-out.firebaseapp.com",
  projectId: "clocked-out",
  storageBucket: "clocked-out.appspot.com",
  messagingSenderId: "348242359935",
  appId: "1:348242359935:web:c68eafe659d3fed61b714a",
  databaseURL: "https://clocked-out-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth();
const rtdb = getDatabase(app);

// Collection references
const collections =
{
  profanitiesRef: collection(db, 'profanities'),
  userDataRef: collection(db, 'userData'),
};

export async function writeUserData(userData: IDatabaseArgs['userData'], postArray: IDatabaseArgs['postArray']) {
  try {

    if (userData !== null && userData !== undefined) {
      const addUserData = await setDoc(doc(db, "userData", userData.uid), {
        userID: userData.uid,
        displayName: userData.displayName,
        email: userData.email,
        profilePicture: userData.photoURL,
        posts: postArray,
      });
    }

  } catch (err) {
    console.log(err);
  }

};

export async function getUserData() {
  const ALLUSERDATA: {
    docID: string,
    docData: DocumentData,
  }[] = [];

  try {
    const querySnapshot = await getDocs(collections['userDataRef']);
    querySnapshot.forEach((doc) => {
      ALLUSERDATA.push({
        docID: doc.id,
        docData: doc.data(),
      });
    });
    return ALLUSERDATA;
  } catch (err) {
    console.log(err);
  }
}


export const createUserInformation = async (email: string, password: string, username: string) => {


  try {
    const profanityList: any = [];
    const profanityQuerySnapshot = await getDocs(collections.profanitiesRef);
    profanityQuerySnapshot.forEach((doc) => {
      profanityList.push({ ...doc.data(), id: doc.id });
    });
    console.log(profanityList[0].profanities);
    if (!filterBadWords(profanityList[0].profanities, username)) {
      return false;
    };

    const createdInfo = await createUserWithEmailAndPassword(auth, email, password);
    const user = createdInfo.user;

    updateProfile(user, {
      displayName: username
    });
    return true;
  } catch (error) {
    console.log(error);
    console.log('an error has occurred');
    return false;
  };

};

export const signingOut = async (stateAuth?: User | null | undefined, navTo?: Function) => {
  try {
    await signOut(auth);
    localStorage.removeItem('loginInfo');

    navTo?.('login');

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

export function initFirebaseAuth(user: User | null) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log('user status:', user);
    }
  });
};





export { IUser, auth, onAuthStateChanged };
