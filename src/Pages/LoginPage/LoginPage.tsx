import * as React from "react";
import LoginForm from "../../components/LoginForm";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {useEffect, useState} from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import homePage from "../HomePage";
import axios from "axios";


const LoginPage: React.FC<any> = () => {
    const[isAuth,setIsAuth]=useState(false);

    useEffect(() => {

        const getSession = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/session/`, {
                    withCredentials: true,
                });
                setIsAuth(res.data.isAuthenticated);
            } catch (error) {
                console.log(error);
            }
        };
        getSession();


    });



    return (
  <>
      <Router>
          <Switch>
              <Route exact path='/' component={LoginForm}/>
              <ProtectedRoute
                  path="/home"
                  component={homePage}
                  isAuthenticated={isAuth}
                  authenticationPath="/" // Redirect to the login page if not authenticated
              />

          </Switch>
      </Router>

  </>
  );
};

export default LoginPage;
