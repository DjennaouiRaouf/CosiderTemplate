import * as React from "react";
import LoginForm from "../../components/LoginForm";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet} from "react-router-dom";

import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import HomePage from "../HomePage";
import axios from "axios";


const LoginPage: React.FC<any> = () => {
    return (
      <>
          <Router>

              <Routes>
                  <Route
                      path="/"
                      element={Cookies.get("__isAuth__")? <HomePage /> :  <LoginForm/>}
                  />
                  <Route
                      path="/home"
                      element={Cookies.get("__isAuth__")? <HomePage /> : <Navigate to={"/"} />}
                  />
              </Routes>

          </Router>


      </>
    );
};

export default LoginPage;
