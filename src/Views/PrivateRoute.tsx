import React, { } from "react";
import { Navigate } from "react-router-dom";
import { IPrivateRouteProps } from "../Helpers/interface";

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const { children, stateAuth } = props;
  // LEAVE FOR NOW: 
  // const routeAuth = auth.currentUser;

  return stateAuth ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;