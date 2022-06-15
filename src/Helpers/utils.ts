import React from "react";
import { User } from "firebase/auth";

export const createLocalInfo = async (userInfo: User | null | undefined) => {
  const myToken: string = await userInfo!.getIdToken();
  localStorage.removeItem('loginInfo');
  localStorage.setItem('loginInfo', myToken);
};

export const localLoginInfo = localStorage.getItem('loginInfo');