import React, {useEffect, useState} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../Redux-Toolkit/Store/Store";

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
                                                        component: Component,
                                                     ...rest
                                                   }) => {

    const {session} = useSelector((state: RootState) => state.sessionid);
  return (
      <Route
          {...rest}
          render={(props) =>
              session ? (
                  <Component {...props} />
              ) : (
                  <Redirect to="/" />
              )
          }
      />
  );
};

export default PrivateRoute;
