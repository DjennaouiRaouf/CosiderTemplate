import React, {useEffect, useState} from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Cookies from "js-cookie";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
                                                     component: Component,
                                                     ...rest
                                                   }) => {

  const[isAuth,setIsAuth]=useState(Cookies.get("sessionid"));
  useEffect(() => {
    setIsAuth(Cookies.get("sessionid"));

  });
  return (
      <Route
          {...rest}
          render={(props) =>
              isAuth ? (
                  <Component {...props} />
              ) : (
                  <Redirect to="/" />
              )
          }
      />
  );
};

export default PrivateRoute;
