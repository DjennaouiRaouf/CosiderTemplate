import * as React from "react";
import login from "./login.png"

import {Carousel} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {openMessageToast} from "../Redux-Toolkit/Slices/MessageToastSlice";
import MessageToast from "../MessageToast/MessageToast";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import {Button as MUIButton} from "@mui/material";









const LoginForm: React.FC<any> = () => {
  const [pics,setPics]=useState<any[]>([]);
  const [username,setUsername]=useState<string>("");
  const[password,setPassword]=useState<string>("");
  const {authenticated, setAuthenticated} = useContext(AuthContext);
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const getImages = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ic_images/`,{
      headers:{
        "Content-Type":"application/json",
      }
    })
        .then((response) => {
          setPics(response.data);

        })
        .catch((error) => {
          console.error('Error:', error);
        });

  }



  const authentification = async() => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/login/`,formData,{
      withCredentials:true,
    })
        .then((response:any) => {
          setAuthenticated(String(Cookies.get("token")))

        })
        .catch((error:any) => {
          dispatch(openMessageToast({ titre: "Authentification",color:"rgb(223,22,44)","message":error.response.data.message,"icon":"far fa-times-circle" }))
        });



  }


  const onUsernameChange = (e:any) => {
    setUsername(e.target.value);
  }

  const onPasswordChange = (e:any) => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    getImages();


  },[]);

  return (

    <div>
          <div className="container"  style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            msTransform: "translateY(-50%)",
            WebkitTransform: "translateY(-50%)",
            OTransform: "translateY(-50%)"
          }}>
            <div
                className="card shadow-lg o-hidden border-0 my-5"
                style={{ height: 500 }}
            >
              <div className="card-body p-0">
                <div className="row" style={{ height: "100%" }}>
                  <div
                      className="col-lg-6 d-none d-lg-flex justify-content-lg-center align-items-lg-center"
                      style={{
                        background: "rgba(255,255,254,0)",
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6
                      }}
                  >
                    <Carousel className="w-100 d-block" controls={false} interval={3000} fade={true} indicators={true} >
                      {pics.map((item,index) => (
                          <Carousel.Item key={index}>
                            <img
                                src={item.src}
                                alt={""}
                                height={500}
                                className="d-block w-100"
                            />
                            <Carousel.Caption style={{background:item.color}}>
                              <h3>{item.caption}</h3>
                              <p>
                                {item.altText}
                              </p>
                            </Carousel.Caption>
                          </Carousel.Item>
                      ))}
                    </Carousel>

                  </div>
                  <div className="col-lg-6">
                    <div className="p-5" style={{ height: "100%" }}>
                      <div className="text-center">
                        <h4
                            className="text-dark mb-4"
                            style={{ height: "60.8px", fontSize: 44, marginTop: 9 }}
                        >
                          <img
                              src={login}
                              width={58}
                              height={57}
                              style={{ marginBottom: 9 }}
                          />
                        </h4>
                      </div>
                      <div className="user">
                        <div className="mb-3">

                          <TextField id="standard-basic" label="Nom d'utilisateur"

                                     variant="standard"
                                     value={username}
                                     onChange={onUsernameChange}
                                     fullWidth />

                        </div>
                        <div className="mb-3">

                          <TextField id="standard-basic" label="Mot de passe"
                                     type="password"
                                     variant="standard"
                                     value={password}
                                     onChange={onPasswordChange}
                                     fullWidth />

                        </div>
                        <div className="mb-3">
                          <div className="custom-control custom-checkbox small" />
                        </div>

                        <MUIButton className="d-block btn-user w-100" variant="contained" type="submit"  style={{ background: "#df162c", borderWidth: 0 }}onClick={authentification} >
                          Connexion
                        </MUIButton>

                        <hr />
                      </div>

                      <div className="text-center">
                        <a className="small">
                          Créer un compte!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
      <MessageToast/>
    </div>

  );
};

export default LoginForm;