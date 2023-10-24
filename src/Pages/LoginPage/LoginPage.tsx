import * as React from "react";
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';

import LoginForm from "../../components/LoginForm/LoginForm";
import HomePage from "../HomePage/HomePage";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";




const LoginPage: React.FC<any> = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            ! Cookies.get("__SID__") ? (
                                <LoginForm />
                            ) : (
                                <Navigate to="/home" replace />
                            )
                        }
                    />
                    <Route
                        path="/home"
                        element={
                             Cookies.get("__SID__")? (
                                <HomePage />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default LoginPage;
