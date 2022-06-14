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
}

export interface ILoginProps {
  nav?: Function,
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>, key: keyof ILoginInput) => void;
  inputFields: ILoginInput;
  submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface IFeedProps {

}

export interface IPostProps {
  media: boolean;
}