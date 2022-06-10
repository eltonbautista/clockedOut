import React, { createContext, useContext } from "react";

interface UserContextState {
  userData: object | null,
  setUserData: Function,
}
export const UserContext = createContext({} as UserContextState);