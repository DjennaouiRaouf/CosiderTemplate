import React, {useContext} from 'react'
import {Routes as Router, Route, Navigate} from 'react-router-dom'
import LoginForm from "../LoginForm/LoginForm";
import AddClientForm from "../Clients/AddClientForm/AddClientForm";
import NavigationBar from "../NavigationBar/NavigationBar";
import ClientList from "../Clients/ClientList/ClientList";
import Home from "../Home/Home";
import Cookies from "js-cookie";
import AddSiteForm from "../Site/AddSiteForm/AddSiteForm";
import SiteList from "../Site/SiteList/SiteList";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import AddMarcheForm from "../Marche/AddMarcheForm/AddMarcheForm";
import MarcheList from "../Marche/MarcheList/MarcheList"




const Routes: React.FC<any> = () => {
    const { authenticated } = useContext(AuthContext);
  return (
      <Router>
          <Route
              path="/"
              element={
                  ! authenticated ? (
                      <LoginForm />
                  ) : (
                      <Navigate to="/home"  />
                  )
              }
          />
          <Route
              path="/home"
              element={
                  authenticated ? (
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
                   authenticated ? (
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
                  authenticated? (
                      <>
                          <NavigationBar />
                          <ClientList />
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_s"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar />
                          <AddSiteForm />
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_s"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar />
                          <SiteList />
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_m"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar />
                          <AddMarcheForm />
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_m"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar />
                          <MarcheList />
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
