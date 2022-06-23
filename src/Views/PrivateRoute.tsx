import React, { } from "react";
import { Navigate } from "react-router-dom";
import { IPrivateRouteProps } from "../Helpers/interface";

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const { children, stateAuth, localAuth } = props;
  // LEAVE FOR NOW: 
  // const routeAuth = auth.currentUser;
  // console.log(localAuth);
  // console.log(stateAuth);

  if (!stateAuth && localAuth) {
    return <div>loading assets..</div>;
  }

  return stateAuth ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;