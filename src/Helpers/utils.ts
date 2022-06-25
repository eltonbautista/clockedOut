import { IResetInputs, IDbUserData, IPostState } from './interface';
import { User } from "firebase/auth";
import { DocumentData } from 'firebase/firestore';
import React from 'react';


// Background images:
import viper from '../Styles/assets/valResized.jpg';
import ken from '../Styles/assets/fighter.svg';
import animeGirl from '../Styles/assets/animeGirl.jpg';
import zed from '../Styles/assets/zed.jpg';
import { text } from 'stream/consumers';

// Test images:
import testpfp2 from "../Styles/assets/testpfp2.jpg";
import { downloadImage } from '../firebase-config';

// import { profanities } from 'profanities';

export const createLocalInfo = async (userInfo: User | null | undefined) => {
  const currentLocalInfo = localStorage.getItem('loginInfo');
  if (!currentLocalInfo) {
    const myToken: string = await userInfo!.getIdToken();
    // localStorage.removeItem('loginInfo');
    localStorage.setItem('loginInfo', myToken);
  }
};

export const localLoginInfo = localStorage.getItem('loginInfo');

export const profanityList = [];

export const filterBadWords = (arr: string[], input: string) => {
  // First "build" the input so that it can be checked against the arr
  const buildWord = (word: string) => {
    return word.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '').toLowerCase();
  };
  let filteredInput: string | boolean = buildWord(input);

  // Compare filteredInput and each index of badWords array
  arr.forEach(element => {
    if (filteredInput === element) {
      alert('No profane usernames please!');
      filteredInput = false;
      return false;
    }
  });

  return filteredInput;
};


export const palette =
{
  red: "#FA4753",
  black: "#17181C",
  white: "#FFFFFF",
  purple: "#9BA5C9",
  pink: "#FC9A9A",

  fpink: "#ffe0e0",
  fwhite: "#fff6f6",

};

// -----------------------------------------------------------------------------
// Preloaded Images Collection:
// -----------------------------------------------------------------------------

// Lists of images categorized by use case 
const backgroundImages: HTMLImageElement[] = [];
const testpfp: HTMLImageElement[] = [];


// Function used to preload images
export default function preload(images: string[], fillArr: HTMLImageElement[]) {
  for (let i = 0; i < images.length; i += 1) {
    fillArr[i] = new Image();
    fillArr[i].src = images[i];
  }
  return fillArr;
};

preload([viper, ken, animeGirl, zed], backgroundImages);
preload([testpfp2,], testpfp);


// A util used to clear my inputs in NewPostModal.tsx;
export const resetInputs = (textInp: IResetInputs['textInp'], imgInp: IResetInputs['imgInp'], videoInp: IResetInputs['videoInp']) => {
  if (textInp.current !== null && imgInp.current !== null && videoInp.current !== null) {
    textInp.current.value = '';
    imgInp.current.value = '';
    videoInp.current.value = '';
  }
};


export const filterPosts = (userDocs: IDbUserData['userDocument']) => {
  if (userDocs !== undefined) {
    return userDocs.filter((post, index) => {
      return post !== userDocs[index + 1];
    });
  }
};

export const toPostStateObjects = async (filteredUsersData: IDbUserData['userDocument'], userID: string) => {

  const newArr: IPostState[] = [];
  const currentUserFiltered = filteredUsersData.filter((user) => {
    return user.docID === userID;
  });
  // console.log(currentUserFiltered);
  if (currentUserFiltered !== undefined && currentUserFiltered.length > 0) {
    currentUserFiltered[0].docData.posts.forEach((userDoc: DocumentData, i: number) => {
      // console.log(userDoc);
      if (userDoc !== undefined) {
        newArr.push({
          postText: userDoc.postText,
          postImage: userDoc.postImage,
          postVideo: userDoc.postVideo,
        });
      }
    });
  }
  // console.log(newArr);
  return newArr;
};

export function createFields(e: React.FormEvent<HTMLFormElement>, target: "signUp" | "login") {
  if (target === "signUp") {
    return {
      emailValue: (e.currentTarget.children[0].children[1].children[0].children[1].children[0] as HTMLInputElement).value,
      usernameValue: (e.currentTarget.children[0].children[1].children[1].children[1].children[0] as HTMLInputElement).value,
      passwordValue: (e.currentTarget.children[0].children[1].children[2].children[1].children[0] as HTMLInputElement).value,
    };
  }
  if (target === "login") {
    return {
      emailValue: (e.currentTarget.children[0].children[1].children[0].children[1].children[0] as HTMLInputElement).value,
      passwordValue: (e.currentTarget.children[0].children[1].children[1].children[1].children[0] as HTMLInputElement).value,
      usernameValue: ""
    };
  }
};


export { backgroundImages, testpfp };


// -----------------------------------------------------------------------------
// THINGS THAT MIGHT BE USEFUL LATER:
// -----------------------------------------------------------------------------


// !! This callback was in FEED VIEW. It more focuses on grabbing data & posts from all users, but I was using it to grab the current user's data & posts

// const addCurrentUserDbPostsToLocal = useCallback(async () => {
//   // callback used for adding db posts to local so they can be rendered on load of the Feed view.
//   if (loggedInData) {
//     // Filter ALL user data so there exists only one user data per user.
//     const filteredUsersData = filterPosts(allUsersData);
//     if (filteredUsersData) {
//       const currentUserData = await getUserDoc(loggedInData.uid);
//       if (currentUserData && postArray.length < currentUserData.posts.length && currentUserData.userID === loggedInData.uid) {
//         const dbPostObjectsArray: IPostState[] = await toPostStateObjects(filteredUsersData, loggedInData.uid);
//         console.log(dbPostObjectsArray);
//         if (dbPostObjectsArray !== undefined && dbPostObjectsArray.length > 0) {
//           setPostArray([...postArray, ...dbPostObjectsArray]);
//         }
//       }
//     }
//   }

// }, [allUsersData, loggedInData, postArray, setPostArray]);