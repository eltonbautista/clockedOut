import { DocumentData } from 'firebase/firestore';
import { User } from "firebase/auth";
import React, { MutableRefObject } from "react";

export interface IData {
  email: string;
  username: string;
  password: string;
};

export interface ILoginInput {
  email: string;
  password: string;
  [key: string]: any;
}

export interface ISignUpProps {
  nav?: Function,
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>, key: keyof IData) => void,
  inputFields: IData;
  stateAuth?: User | string | null | undefined;
  localAuth?: string | null;
  signUpData?: {
    userSignUpData: IData;
    setUserSignUpData: React.Dispatch<React.SetStateAction<IData>>;
  };
}

export interface ILoginProps {
  nav?: Function,
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>, key: keyof ILoginInput) => void;
  inputFields: ILoginInput;
  submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  stateAuth?: User | string | null | undefined;
  localAuth?: string | null;

  errorMessage?: ILoginInput;
}

export interface IFeedProps {
  localAuth?: string | null;
}

export interface IPostProps {
  text?: string | number | readonly string[] | undefined;
  img?: string | undefined;
  video?: string | undefined;
  media?: boolean;

  displayName?: string | null;
  pfp?: string | null;

  postPosition: number;
}

export interface IPrivateRouteProps {
  children: React.ReactElement;
  stateAuth: User | string | null | undefined;
  localAuth?: string | null;
}

export interface INavProps {
  authorized: boolean;
  nav?: Function;
  stateAuth: User | string | null | undefined;
  setLocalInfo?: Function;
  setAuth: Function;
}

export interface ICircularPictureProps {
  zIndex?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  imgSrc?: string;
  position?: string;
}

export interface IBackgroundCanvas {
  sidebar?: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
  position?: string;
}

export interface IStyledLPProps {
  bgImg?: string;
}

export interface INewPostModal {
  showModal?: IModalControl;
  stateSetters?: {
    setOverflowPost: Function,
    setShowModal: Function,
  };
  profilePicture?: MutableRefObject<string>;
}

export interface ISidebarModal {
  showModal?: IModalControl;
  stateSetters?: {
    setOverflowPost: Function,
    setShowModal: Function,
  };
}

export interface IModalControl {
  newPostModal: boolean;
  editSidebarModal: boolean;
}

export interface IHidePostModal {
  event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>;
}

export interface IPostState {
  [key: string]: any;
  postText?: string | number | readonly string[] | undefined;
  postImage: {
    imageName: string,
    imageURL?: string;
  };
  postVideo?: string;

  postLikes?: number;
  postComments?: string[] | [];
}

export interface IResetInputs {
  set: Function;
  textInp: React.RefObject<HTMLTextAreaElement>;
  imgInp: React.RefObject<HTMLInputElement>;
  videoInp: React.RefObject<HTMLInputElement>;
}

export interface IDatabaseArgs {
  userData: User | null | undefined;
  postArray: IPostState[];
}

export interface IDbUserData {
  userDocument: {
    docID: string;
    docData: DocumentData;
  }[];
}

export interface ICurrentUserData {
  userID: string;
  displayName: string;
  email: string;
  profilePicture: string;
  posts: IPostState[];
}

export interface ISideBarInfo {
  [key: string]: any;
  sidebarInfo: {
    personalBio: string;
    games: {
      gameOne: string;
      userOne: string;
      gameTwo: string;
      userTwo: string;
    },
    links: {
      linkOne: string;
      linkTwo: string;
      linkDisplayOne: string;
      linkDisplayTwo: string;
    };
  },
  userInfo: {
    displayName: string;
    photoURL: string;
  };
}