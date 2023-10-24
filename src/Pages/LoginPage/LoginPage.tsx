import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoginForm from "../../components/LoginForm/LoginForm";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import HomePage from "../HomePage/HomePage";
import {useEffect, useState} from "react";
import axios from "axios";
import SessionID from "../../components/SessionID/SessionID";
import LoginRoute from "../../components/LoginRoute/LoginRoute";



const LoginPage: React.FC<any> = () => {

    return (

        <>
            <SessionID/>
            <Router>

                <Switch>

                    <LoginRoute exact path='/' component={LoginForm}/>
                    <PrivateRoute
                        path="/home"
                        component={HomePage}
                    />


                </Switch>
            </Router>
        </>
    );
};

export default LoginPage;
