import { IData, IPostProps, IPostState } from './interface';
import { createContext, ReactNode } from "react";

interface UserContextState {
  userSignUpData: IData,
  setUserSignUpData: Function,
  postState: object,
  setPostState: Function,
  postArray: ReactNode[],
  setPostArray: Function,
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
