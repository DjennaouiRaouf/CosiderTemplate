import * as React from "react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Cookies from 'js-cookie';
import HomePage from "../HomePage";
import LoginForm from "../../components/LoginForm/LoginForm";
import {useEffect, useState} from "react";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";



const LoginPage: React.FC<any> = () => {
    return (

        <Router>
            <Switch>



                <Route exact path='/' component={LoginForm}/>
                <PrivateRoute
                    path="/home"
                    component={HomePage}
                />


            </Switch>
        </Router>
    );
};

export default LoginPage;
