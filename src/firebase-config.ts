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
import { filterBadWords, profanityList } from "./Helpers/utils";

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

// Collection references
const collections =
{
  profanitiesRef: collection(db, 'profanities')
};

// const list = [...profanities];

// const addToDocs = async () => {
//   await addDoc(collection(db, "profanities"), { profanities: list });
// };
// addToDocs();

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
