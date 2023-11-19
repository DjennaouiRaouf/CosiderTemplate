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
import AddDQEForm from "../Marche/DQE/AddDQEForm/AddDQEForm";




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

                          <MarcheList />
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_dqe"
              element={
                  authenticated ? (
                      <>

                          <AddDQEForm />
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
