import { IResetInputs, IDbUserData, IPostState } from './interface';
import { User } from "firebase/auth";
import { DocumentData } from 'firebase/firestore';


// Background images:
import viper from '../Styles/assets/valResized.jpg';
import ken from '../Styles/assets/fighter.svg';
import animeGirl from '../Styles/assets/animeGirl.jpg';
import zed from '../Styles/assets/zed.jpg';
import { text } from 'stream/consumers';


// import { profanities } from 'profanities';

export const createLocalInfo = async (userInfo: User | null | undefined) => {
  const myToken: string = await userInfo!.getIdToken();
  localStorage.removeItem('loginInfo');
  localStorage.setItem('loginInfo', myToken);
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


// Function used to preload images
export default function preload(images: string[], fillArr: HTMLImageElement[]) {
  for (let i = 0; i < images.length; i += 1) {
    fillArr[i] = new Image();
    fillArr[i].src = images[i];
  }
};

preload([viper, ken, animeGirl, zed], backgroundImages);

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

export const toPostStateObjects = async (filteredUsersData: IDbUserData['userDocument']) => {
  const thisArray: IDbUserData['userDocument'] = [...filteredUsersData];
  const newArr: IPostState[] = [];
  // let bar = filteredUsersData[0].docData.posts[0];
  // Okay so, initially I was trying to do this: posts[i] => but the amount of posts is different from the amount of userData.
  // The thing is, there's only supposed to be one userData, at least for now, and it's only the person who is logged in
  // Later on when they start following others then it will increase

  if (thisArray !== undefined && thisArray.length > 0) {
    thisArray.forEach((userDoc, i) => {
      if (userDoc !== undefined) {
        newArr.push({
          postText: userDoc.docData.posts[0].postText,
          postImage: userDoc.docData.posts[0].postImage,
          postVideo: userDoc.docData.posts[0].postVideo,
        });
      }
    });
  }

  return newArr;
};


export { backgroundImages };