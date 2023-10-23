import * as React from "react";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import LoginForm from "../../components/LoginForm/LoginForm";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import HomePage from "../HomePage/HomePage";



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
