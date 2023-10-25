import React, { useContext } from 'react'
import {Routes as Router, Route, Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import LoginForm from "../LoginForm/LoginForm";
import HomePage from "../../Pages/HomePage/HomePage";
type RoutesProps = {
  //
};


const Routes: React.FC<any> = () => {
  const { authenticated } = useContext(AuthContext)


  return (
      <Router>
          <Route
              path="/"
              element={
                  ! authenticated ? (
                      <LoginForm />
                  ) : (
                      <Navigate to="/home" replace />
                  )
              }
          />
          <Route
              path="/home"
              element={
                  authenticated? (
                      <HomePage />
                  ) : (
                      <Navigate to="/" replace />
                  )
              }
          />
      </Router>
  )
};

export default Routes;
