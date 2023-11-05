import React, { useContext } from 'react'
import {Routes as Router, Route, Navigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import LoginForm from "../LoginForm/LoginForm";
import AddClientForm from "../Clients/AddClientForm/AddClientForm";
import NavigationBar from "../NavigationBar/NavigationBar";
import ClientList from "../Clients/ClientList/ClientList";
import Home from "../Home/Home";



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
                      <Navigate to="/ajout_c"  />
                  )
              }
          />
          <Route
              path="/home"
              element={
                  authenticated? (
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
                   authenticated && (
                       <>
                           <NavigationBar />
                            <AddClientForm />
                       </>
                  )
              }
          />
          <Route
              path="/liste_c"
              element={
                  authenticated && (
                      <>
                          <NavigationBar />
                          <ClientList />
                      </>
                  )
              }
          />
      </Router>

  )
};

export default Routes;
