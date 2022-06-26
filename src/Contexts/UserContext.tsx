import React, { useState, useMemo, ReactNode, useEffect, useRef, useCallback } from "react";
import { UserContext } from "../Helpers/contexts";
import { IPostState, IData, IDbUserData } from "../Helpers/interface";
import { downloadImage, getUserDoc, IUser } from '../firebase-config';
import { getAllUserData } from "../firebase-config";
import { DocumentData } from "firebase/firestore";
import Post from "../Components/Post";
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
      }
    });

  }, [postArray]);

  const setDbPosts = useCallback(async () => {

    if (loggedInData) {
      const currentUserData = await getUserDoc(loggedInData.uid);
      if (currentUserData && postArray && currentUserData.userID === loggedInData.uid) {
        if (currentUserData.posts !== undefined && postArray.length < currentUserData.posts.length) {
          setPostArray([...postArray, ...currentUserData.posts]);
        }
      }
    }

  }, [loggedInData, postArray, setPostArray]);

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
    }, 900);

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
  }),
    [
      loggedInData, setLoggedInData,
      postState, setPostState,
      postArray, setPostArray,
      allUsersData, setAllUsersData,
      artificialLoader, setArtificialLoader
    ]);

  return (
    <UserContext.Provider value={UCProviderVal}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;