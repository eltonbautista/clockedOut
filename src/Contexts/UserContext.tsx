import React, { useState, useMemo, ReactNode, useEffect, useCallback } from "react";
import { UserContext } from "../Helpers/contexts";
import { IPostState, IDbUserData } from "../Helpers/interface";
import { IUser } from '../firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

interface IUserContextProvider {
  children: ReactNode;
}

const UserContextProvider: React.FC<IUserContextProvider> = (props: IUserContextProvider) => {
  const { children } = props;

  const initPostData: IPostState = {
    postText: '',
    postImage: {
      imageName: '',
      imageURL: ''
    },
    postVideo: '',
  };


  const [loggedInData, setLoggedInData] = useState<typeof IUser | null | undefined>(null);
  const [postState, setPostState] = useState(initPostData);
  const [postArray, setPostArray] = useState<IPostState[]>([]);
  const [allUsersData, setAllUsersData] = useState<IDbUserData['userDocument']>([]);
  const [artificialLoader, setArtificialLoader] = useState(0);
  const [currentUserData, setCurrentUserData] = useState<any>();


  useEffect(() => {
    // an effect that checks if a user is authenticated or not. If(auth) then set loggedInData
    // Renders once, and on dependency change

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedInData(user);
        if (!localStorage.getItem('loginInfo')) {
          localStorage.setItem('loginInfo', await user.getIdToken());
        }

      } else if (!user) {
        localStorage.removeItem('loginInfo');
        setLoggedInData(null);
        setAllUsersData([]);
        setCurrentUserData(undefined);
      }
    });

  }, [postArray]);

  const setDbPosts = useCallback(async () => {
    if (currentUserData && postArray && loggedInData && currentUserData.userID === loggedInData.uid) {
      if (currentUserData.posts !== undefined && postArray.length < currentUserData.posts.length) {
        setPostArray([...postArray, ...currentUserData.posts]);
      }
    }

  }, [currentUserData, loggedInData, postArray]);

  useEffect(() => {
    setDbPosts();
  }, [setDbPosts]);

  useEffect(() => {

    const myTimeout = setTimeout(() => {
      if (artificialLoader < 1) {
        setArtificialLoader((prev) => {
          return prev + 1;
        });
      }
    }, 1200);

    if (artificialLoader >= 1) {
      clearTimeout(myTimeout);
    }
  }, [artificialLoader]);


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
    artificialLoader: artificialLoader,
    setArtificialLoader: setArtificialLoader,
    currentUserData: currentUserData,
    setCurrentUserData: setCurrentUserData
  }),
    [
      loggedInData, setLoggedInData,
      postState, setPostState,
      postArray, setPostArray,
      allUsersData, setAllUsersData,
      artificialLoader, setArtificialLoader,
      currentUserData, setCurrentUserData
    ]);

  return (
    <UserContext.Provider value={UCProviderVal}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;