export interface IData {
  email: string;
  username: string;
  password: string;
};

export interface ITest {
  email: string;
  password: string;
  [key: string]: any;
}