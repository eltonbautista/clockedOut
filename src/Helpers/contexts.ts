import React, { createContext, useContext } from "react";

interface UserContextState {
  userData: object,
  setUserData: Function,
}
export const UserContext = createContext({} as UserContextState);

interface test {
  [key: string]: any;
}
const myObj = {
  name: "John",
  user: "john.doe"
};

const changePropVal = (obj: object, key: string, change: string) => {
  const newObj: test = { ...obj };
  newObj[key] = change;
  return { ...newObj };
};
