export interface IData {
  email: string;
  username: string;
  password: string;
};

export interface ILoginInput {
  username: string;
  password: string;
  [key: string]: any;
}