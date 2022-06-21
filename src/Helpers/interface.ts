import { User } from "firebase/auth";

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
}

export interface ILoginProps {
  nav?: Function,
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>, key: keyof ILoginInput) => void;
  inputFields: ILoginInput;
  submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  stateAuth?: User | string | null | undefined;
  localAuth?: string | null;
}

export interface IFeedProps {

}

export interface IPostProps {
  text?: string | number | readonly string[] | undefined;
  img?: string | undefined;
  video?: string | undefined;
  media?: boolean;
}

export interface IPrivateRouteProps {
  // path: string;
  children: React.ReactElement;
  stateAuth: User | string | null | undefined;
}

export interface INavProps {
  authorized: boolean;
  nav?: Function;
  stateAuth: User | string | null | undefined;
  setLocalInfo?: Function;
}

export interface ICircularPictureProps {
  zIndex?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  imgSrc?: string;
  position?: string;
  // imgAlt?: string;
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
  showModal?: boolean;
  stateSetters?: {
    setOverflowPost: Function,
    setShowModal: Function,
  };
  newPostText?: string;
  newPostImage?: string;
  newPostVideo?: string;
}

export interface IHidePostModal {
  event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>;
}

export interface IPostState {
  postText?: string | number | readonly string[] | undefined;
  postImage?: string;
  postVideo?: string;
}

export interface IResetInputs {
  set: Function;
  textInp: React.RefObject<HTMLTextAreaElement>;
  imgInp: React.RefObject<HTMLInputElement>;
  videoInp: React.RefObject<HTMLInputElement>;
}