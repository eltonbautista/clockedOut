import React, { useState, useMemo, ReactNode, useEffect } from "react";
import { UserContext } from "../Helpers/contexts";
import { IPostState, IData, } from "../Helpers/interface";
import { IUser } from '../firebase-config';
import { getUserData } from "../firebase-config";
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

  const initSignUpData: IData = {
    email: '',
    username: '',
    password: '',
  };


  const [loggedInData, setLoggedInData] = useState<typeof IUser | null | undefined>(null);
  const [postState, setPostState] = useState(initPostData);
  const [postArray, setPostArray] = useState<IPostState[]>([]);
  const [userSignUpData, setUserSignUpData] = useState(initSignUpData);
  const [dbPosts, setDbPosts] = useState<{ docID: string; docData: DocumentData; }[]>();

  useEffect(() => {
    const asyncDataFetch = async () => {
      const archivedUserPost = await getUserData();
      if (archivedUserPost !== undefined) {
        setDbPosts(archivedUserPost);
      }
    };
    asyncDataFetch();

  }, []);

  // useEffect(() => {
  //   dbPosts?.forEach((postData, i) => {
  //     console.log(postData);
  //     setPostArray([...postArray,
  //     <Post
  //       text={postData.docData.posts[i].postText}
  //       img={postData.docData.posts[i].postImage}
  //       video={postData.docData.posts[i].postVideo} />]);
  //   });
  // }, [dbPosts, postArray]);

  // useEffect(() => {
  //   if (dbPosts) {
  //     const createArray = [...postArray, <Post video={postState['postVideo']} img={postState['postImage']} text={postState['postText']} />];

  //     setPostArray([...createArray]);
  //   }
  // }, [dbPosts, postArray, postState]);

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
    dbPosts: dbPosts,
    setDbPosts: setDbPosts,
  }),
    [
      userSignUpData, setUserSignUpData,
      loggedInData, setLoggedInData,
      postState, setPostState,
      postArray, setPostArray,
      dbPosts, setDbPosts

    ]);

  return (
    <UserContext.Provider value={UCProviderVal}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;