import React, {useEffect, useState} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../Redux-Toolkit/Store/Store";

interface LoginRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const LoginRoute: React.FC<LoginRouteProps> = ({
                                                     component: Component,
                                                     ...rest
                                                   }) => {

  const {session} = useSelector((state: RootState) => state.sessionid);
  return (
      <Route
          {...rest}
          render={(props) =>
              session ? (
                      <Redirect to="/home" />

              ) : (
                  <Component {...props} />
              )
          }
      />
  );
};

export default LoginRoute;
