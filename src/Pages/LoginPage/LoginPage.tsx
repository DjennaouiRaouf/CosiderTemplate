import * as React from "react";
import LoginForm from "../../components/LoginForm";
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import {useEffect, useState} from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import homePage from "../HomePage";
import axios from "axios";
import HomePage from "../HomePage";
import {Button} from "react-bootstrap";


const LoginPage: React.FC<any> = () => {
    const[isAuth,setIsAuth]=useState(false);

    return (
  <>
      <Button>{isAuth}</Button>
      <Router>
          <Switch>
              <Route exact path='/' component={LoginForm}/>
              <ProtectedRoute
                  path="/home"
                  component={homePage}
                  isAuthenticated={isAuth}
                  authenticationPath="/"
              />

          </Switch>
      </Router>

  </>
  );
};

export default LoginPage;
