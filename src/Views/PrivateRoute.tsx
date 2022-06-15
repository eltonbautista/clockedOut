import React from "react";
import { Navigate, Route } from "react-router-dom";
import { IPrivateRouteProps } from "../Helpers/interface";
import { auth } from "../firebase-config";
import { localLoginInfo } from "../Helpers/utils";

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const { children } = props;
  const authorization = auth.currentUser;
  return localLoginInfo ? children : <Navigate to="/login" />;
};

export default PrivateRoute;