import { IData, IPostProps, IPostState, ILoginInput } from './interface';
import { createContext, ReactNode } from "react";
// import { User } from 'firebase/auth';
import { IUser } from '../firebase-config';

interface UserContextState {
  userSignUpData: IData;
  setUserSignUpData: Function;
  postState: IPostState;
  setPostState: Function;
  postArray: ReactNode[];
  setPostArray: Function;
  loggedInData: typeof IUser | null | undefined;
  setLoggedInData: React.Dispatch<React.SetStateAction<typeof IUser | null | undefined>>;
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
