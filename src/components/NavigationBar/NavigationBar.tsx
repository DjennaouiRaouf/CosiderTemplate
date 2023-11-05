import * as React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from "react-avatar";
import logo from "./logo.png"
import axios from "axios";
import {useEffect, useState} from "react";

import Cookies from "js-cookie";





const NavigationBar: React.FC<any> = () => {
  const[username,setUsername]=useState("");
  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/logout/`,{
      withCredentials:true,
      headers:{
        Authorization: `Token ${Cookies.get("token")}`,
      }
    })
        .then((response: any) => {
          window.location.href='/'
        })
        .catch((error: any) => {
        });

  };

  const whoami= async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/whoami/`,{
      headers:{
        Authorization: `Token ${Cookies.get("token")}`
      }

    })
        .then((response: any) => {
          setUsername(response.data.whoami);
        })
        .catch((error: any) => {
        });

  };


  useEffect(() => {
    whoami();
  });






  return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container >
          <Navbar.Brand>
              <span>
                <img width={90} height={39} src={logo} />
              </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Marché</Nav.Link>
              <NavDropdown title="Clients" id="basic-nav-dropdown">
                <NavDropdown.Item href="/ajout_c">Ajouter un client</NavDropdown.Item>
                <NavDropdown.Item href="/liste_c">Lister les clients</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Sites" id="basic-nav-dropdown">
                <NavDropdown.Item href="/ajout_s">Ajouter un site</NavDropdown.Item>
                <NavDropdown.Item href="/liste_s">Lister les sites</NavDropdown.Item>
              </NavDropdown>


            </Nav>
            <Nav className="navbar-nav ms-auto">
              <li className="nav-item dropdown no-arrow">
                <div className="nav-item dropdown no-arrow">
                  <a
                      className="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="#"
                  >
                      <span className="d-none d-lg-inline me-2 text-gray-600 small">
                        {username}
                      </span>
                    <Avatar name={username} size="40" round={true} src={""}

                    />
                  </a>
                  <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />
                      &nbsp;Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />
                      &nbsp;Settings
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400" />
                      &nbsp;Activity log
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" onClick={logout}>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                      &nbsp;Logout
                    </a>
                  </div>
                </div>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavigationBar;
