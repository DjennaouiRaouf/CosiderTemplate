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
import {useHistory} from "react-router-dom";
import {clearSessionID} from "../Redux-Toolkit/Slices/SessionIDSlice";
import {useDispatch} from "react-redux";



const NavigationBar: React.FC<any> = () => {
  const[username,setUsername]=useState("");
  const history=useHistory();
  const dispatch = useDispatch();
  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/logout/`, {withCredentials: true})
        .then((response: any) => {
          dispatch(clearSessionID());
          history.push("/")

        })
        .catch((error: any) => {
        });
  };
  const getUsername = async () => {

    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/whoami/`, {withCredentials: true})
        .then((response: any) => {
          setUsername(response.data.username);
        })
        .catch((error: any) => {

        });
  }


  useEffect(() => {
    getUsername();
  },[username]);






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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
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
