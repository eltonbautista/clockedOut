import React from "react";
import { Navigate, Route } from "react-router-dom";
import { IPrivateRouteProps } from "../Helpers/interface";
import { auth } from "../firebase-config";


const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const { children } = props;
  const authorization = auth.currentUser;
  return authorization ? children : <Navigate to="/login" />;
};

export default PrivateRoute;