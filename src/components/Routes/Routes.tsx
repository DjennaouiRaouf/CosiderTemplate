import React, { useContext } from 'react'
import {Routes as Router, Route, Navigate} from 'react-router-dom'
import LoginForm from "../LoginForm/LoginForm";
import AddClientForm from "../Clients/AddClientForm/AddClientForm";
import NavigationBar from "../NavigationBar/NavigationBar";
import ClientList from "../Clients/ClientList/ClientList";
import Home from "../Home/Home";
import Cookies from "js-cookie";



const Routes: React.FC<any> = () => {



  return (
      <Router>
          <Route
              path="/"
              element={
                  ! Cookies.get('token') ? (
                      <LoginForm />
                  ) : (
                      <Navigate to="/home"  />
                  )
              }
          />
          <Route
              path="/home"
              element={
                  Cookies.get('token')? (
                      <>
                          <NavigationBar />
                          <Home/>

                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_c"
              element={
                   Cookies.get('token') ? (
                       <>
                           <NavigationBar />
                            <AddClientForm />
                       </>
                  ): (
                  <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_c"
              element={
                  Cookies.get('token')? (
                      <>
                          <NavigationBar />
                          <ClientList />
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
      </Router>

  )
};

export default Routes;
