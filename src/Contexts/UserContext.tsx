import React, { useState, useMemo, ReactNode, useEffect } from "react";
import { UserContext } from "../Helpers/contexts";
import { IPostState, IData, IDbUserData } from "../Helpers/interface";
import { IUser } from '../firebase-config';
import { getAllUserData } from "../firebase-config";
import { DocumentData } from "firebase/firestore";
import Post from "../Components/Post";


interface IUserContextProvider {
  children: ReactNode;
}

const UserContextProvider: React.FC<IUserContextProvider> = (props: IUserContextProvider) => {
  const { children } = props;


  const initPostData: IPostState = {
    postText: '',
    postImage: '',
    postVideo: '',
  };


  const [loggedInData, setLoggedInData] = useState<typeof IUser | null | undefined>(null);
  const [postState, setPostState] = useState(initPostData);
  const [postArray, setPostArray] = useState<IPostState[]>([]);
  const [allUsersData, setAllUsersData] = useState<IDbUserData['userDocument']>([]);

  const UCProviderVal = useMemo(() =>
  ({
    loggedInData: loggedInData,
    setLoggedInData: setLoggedInData,
    postState: postState,
    setPostState: setPostState,
    postArray: postArray,
    setPostArray: setPostArray,
    allUsersData: allUsersData,
    setAllUsersData: setAllUsersData,
  }),
    [
      loggedInData, setLoggedInData,
      postState, setPostState,
      postArray, setPostArray,
      allUsersData, setAllUsersData
    ]);

  return (
    <UserContext.Provider value={UCProviderVal}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;