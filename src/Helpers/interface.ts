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
}

export interface ILoginProps {
  nav?: Function,
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>, key: keyof ILoginInput) => void;
  inputFields: ILoginInput;
  submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  stateAuth?: User | string | null | undefined;
}

export interface IFeedProps {

}

export interface IPostProps {
  media: boolean;
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
}