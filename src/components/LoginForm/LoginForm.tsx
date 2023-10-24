import * as React from "react";
import login from "./login.png"
import login_toast from "./login-toast.png";
import {Carousel, Toast, ToastContainer} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {openMessageToast} from "../Redux-Toolkit/Slices/MessageToastSlice";
import MessageToast from "../MessageToast/MessageToast";
import {RootState} from "../Redux-Toolkit/Store/Store";
import {clearSessionID, setSessionID} from "../Redux-Toolkit/Slices/SessionIDSlice";







const LoginForm: React.FC<any> = () => {
  const [pics,setPics]=useState<any[]>([]);
  const [username,setUsername]=useState<string>("");
  const[password,setPassword]=useState<string>("");
  const dispatch=useDispatch();
  const history=useHistory();
  const {session} = useSelector((state: RootState) => state.sessionid);

  const getImages = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ic_images/`)
        .then((response) => {
          setPics(response.data);

        })
        .catch((error) => {
          console.error('Error:', error);
        });

  }

  const getSession = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/session/`, {withCredentials: true})
        .then((response: any) => {
          dispatch(setSessionID(response.data.session_id));


        })
        .catch((error: any) => {
          dispatch(clearSessionID());
        });

  };

  const authentification = async() => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/login/`,formData,{withCredentials:true})
        .then((response:any) => {
          getSession();
          history.push("/home");
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


  });

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
                          <input
                              id="exampleInputEmail"
                              className="form-control form-control-user"
                              type="text"
                              aria-describedby="emailHelp"
                              placeholder="Nom d'utilisateur"
                              name="username"
                              value={username}
                              onChange={onUsernameChange}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                              id="exampleInputPassword"
                              className="form-control form-control-user"
                              type="password"
                              placeholder="Mot de passe"
                              name="password"
                              value={password}
                              onChange={onPasswordChange}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="custom-control custom-checkbox small" />
                        </div>
                        <button className="btn btn-primary btn-sm d-block btn-user w-100"
                                type="submit"
                                style={{ background: "#df162c", borderWidth: 0 }}
                                onClick={authentification}>Login</button>
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