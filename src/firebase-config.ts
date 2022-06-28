import { profanities } from 'profanities';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
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
import { getBlob, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

import { filterBadWords, profanityList } from "./Helpers/utils";
import { IDatabaseArgs, ISideBarInfo } from './Helpers/interface';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUrU3eINb-vn5fnsKUpXaQI5fhjxFpuoY",
  authDomain: "clocked-out.firebaseapp.com",
  projectId: "clocked-out",
  messagingSenderId: "348242359935",
  appId: "1:348242359935:web:c68eafe659d3fed61b714a",
  databaseURL: "https://clocked-out-default-rtdb.firebaseio.com/",
  storageBucket: "gs://clocked-out.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
const auth = getAuth();
const rtdb = getDatabase(app);
// TODO: https://firebase.google.com/docs/app-check/web/recaptcha-provider add App Check so only my website can use the images in storage.
export const storage = getStorage(app);

// Collection references
export const collections =
{
  profanitiesRef: collection(db, 'profanities'),
  userDataRef: collection(db, 'userData'),
};

export async function uploadImage(imageName: string, userID: string, file: File) {
  const postImage = ref(storage, imageName);
  const userImagePath = userID + "/images/" + imageName;
  const postImageRef = ref(storage, userImagePath);
  const metadata = {
    contentType: '.png, .jpg, .jpeg, .svg'
  };


  const uploadingTask = uploadBytesResumable(postImageRef, file, metadata);

  uploadingTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + ' % done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Uploading is paused');
          break;
        case 'running':
          console.log('Uploading is ongoing');
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    async () => {
      const myDownloadURL = await getDownloadURL(uploadingTask.snapshot.ref);
      return myDownloadURL;
    }
  );
  return uploadingTask;
};

// TODO: MIGHT NEED LATER ON
export async function downloadImage(imageName: string, userID: string,) {

  const userImagePath = userID + "/images/" + imageName;
  const postImageRef = ref(storage, userImagePath);

  const downloadedBlob = await getBlob(postImageRef);
  return downloadedBlob;
}

// Function that is used to *get* the *current* user's document - if it exists.
export async function getUserDoc(userID: string) {
  const docSnap = await getDoc(doc(db, "userData", userID));

  if (docSnap.exists()) {
    const userDoc = docSnap.data();
    if (userDoc.userID === userID) {
      return userDoc;
    }
  } else {
    console.log('No such document');
    return false;
  }
}

export async function writeUserData(userData: IDatabaseArgs['userData'], postArray?: IDatabaseArgs['postArray'], sidebar?: ISideBarInfo) {
  if (!userData) {
    return;
  }
  // If the current user doesn't have any data in the db (haven't created a post), then create one for them.
  if (!await getUserDoc(userData?.uid)) {

    try {
      if (userData !== null && userData !== undefined) {
        await setDoc(doc(db, "userData", userData.uid), {
          userID: userData.uid,
          displayName: userData.displayName,
          email: userData.email,
          profilePicture: userData.photoURL,
          posts: postArray,
          sidebar,
        });
      }
    } catch (err) {
      console.log(err);
    }

  }
};

// Function that *gets* ALL user's data. 
export async function getAllUserData() {
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

export const updateProfileDetails = (user: User, photoURL: string | null | undefined, displayName: string | null | undefined) => {
  updateProfile(user, {
    photoURL,
    displayName,
  });
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
