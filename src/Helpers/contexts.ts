import { DocumentData } from 'firebase/firestore';
import { IData, IPostProps, IPostState, ILoginInput } from './interface';
import { createContext, ReactNode } from "react";
// import { User } from 'firebase/auth';
import { IUser } from '../firebase-config';

interface UserContextState {
  postState: IPostState;
  setPostState: Function;
  postArray: IPostState[];
  setPostArray: Function;
  loggedInData: typeof IUser | null | undefined;
  setLoggedInData: React.Dispatch<React.SetStateAction<typeof IUser | null | undefined>>;
  allUsersData: { docID: string; docData: DocumentData; }[];
  setAllUsersData: React.Dispatch<React.SetStateAction<{
    docID: string;
    docData: DocumentData;
  }[]>>;
  artificialLoader: number;
  setArtificialLoader: React.Dispatch<React.SetStateAction<number>>;
  currentUserData: false | DocumentData | undefined;
  setCurrentUserData: React.Dispatch<React.SetStateAction<false | DocumentData | undefined>>;
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
