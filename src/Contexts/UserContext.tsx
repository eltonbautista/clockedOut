import React, { useState, useMemo, ReactNode } from "react";
import { UserContext } from "../Helpers/contexts";
import { IPostState, IData, } from "../Helpers/interface";
import { IUser } from '../firebase-config';

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

  const initSignUpData: IData = {
    email: '',
    username: '',
    password: '',
  };


  const [loggedInData, setLoggedInData] = useState<typeof IUser | null | undefined>(null);
  const [postState, setPostState] = useState(initPostData);
  const [postArray, setPostArray] = useState([]);
  const [userSignUpData, setUserSignUpData] = useState(initSignUpData);

  const UCProviderVal = useMemo(() =>
  ({
    userSignUpData: userSignUpData,
    setUserSignUpData: setUserSignUpData,
    loggedInData: loggedInData,
    setLoggedInData: setLoggedInData,
    postState: postState,
    setPostState: setPostState,
    postArray: postArray,
    setPostArray: setPostArray,
  }),

    [userSignUpData, setUserSignUpData, loggedInData, setLoggedInData, postState, setPostState, postArray, setPostArray]);

  return (
    <UserContext.Provider value={UCProviderVal}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;