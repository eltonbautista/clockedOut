import React from "react";
import { User } from "firebase/auth";
import { profanities } from 'profanities';
export const createLocalInfo = async (userInfo: User | null | undefined) => {
  const myToken: string = await userInfo!.getIdToken();
  localStorage.removeItem('loginInfo');
  localStorage.setItem('loginInfo', myToken);
};

export const localLoginInfo = localStorage.getItem('loginInfo');

console.log(profanities);
export const profanityList = [...profanities];

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

