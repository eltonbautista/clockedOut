import { User } from "firebase/auth";

// Background images:
import viper from '../Styles/assets/valResized.jpg';
import ken from '../Styles/assets/fighter.svg';
import animeGirl from '../Styles/assets/animeGirl.jpg';
import zed from '../Styles/assets/zed.jpg';


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

export { backgroundImages };