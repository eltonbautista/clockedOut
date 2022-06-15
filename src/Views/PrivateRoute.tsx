import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { IPrivateRouteProps } from "../Helpers/interface";
import { auth } from "../firebase-config";
import { localLoginInfo } from "../Helpers/utils";

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const { children, stateAuth } = props;
  // LEAVE FOR NOW: 
  // const routeAuth = auth.currentUser;

  return stateAuth ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;