import * as React from "react";
import login from "./login.png"
import login_toast from "./login-toast.png";
import {Carousel, Toast, ToastContainer} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import csrftoken from "../../utils/utils";
import {useHistory} from "react-router-dom";


const LoginForm: React.FC<any> = () => {
  const [pics,setPics]=useState<any[]>([]);
  const [username,setUsername]=useState<string>("");
  const[password,setPassword]=useState<string>("");
  const [message,setMessage]=useState<string>("")
  const [color,setColor]=useState<string>("")
  const [icon,setIcon]=useState<string>("")
  const [show, setShow] = useState<boolean>(false);
  const history=useHistory();
  const[isAuth,setIsAuth]=useState(false);
  const handleLoginToast = () => {
    if(!show === false){
      setMessage("");
      setColor("")
      setIcon("")
    }
    setShow(!show);
  }
  const LoginToast = () => {
    return(
        <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
          <Toast onClose={handleLoginToast} show={show}  autohide={true} delay={3000}>
            <Toast.Header>
              <img
                  src={login_toast}
                  className="rounded me-2"
                  alt=""
                  width={30}
                  height={30}
              />
              <strong className="me-auto" >Authentification</strong>
            </Toast.Header>
            <Toast.Body>
              <p className="text-start" style={{ color: color }}>
                <i
                    className={icon}
                    style={{ marginRight: 10 }}
                />
                {message}
              </p>
            </Toast.Body>
          </Toast>
        </ToastContainer>
    );

  }
  const getImages = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ic_images/`)
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
    try {
      const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/sm/login/`,
          formData,
          { withCredentials: true,
            headers:{
              'X-CSRFToken':csrftoken,
            }
          }
      );
      history.push('/home')
    } catch (error:any) {
      console.log(error.response.data)
      setMessage(error.response.data.message);
      setColor("rgb(223,22,44)");
      setIcon("far fa-times-circle");
      handleLoginToast();
    }

  }

  const onUsernameChange = (e:any) => {
    setUsername(e.target.value);
  }

  const onPasswordChange = (e:any) => {
    setPassword(e.target.value);
  }
  const getSession = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/session/`, {
        withCredentials: true,
      });

      setIsAuth(res.data.isAuthenticated);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getImages();
    getSession();
    if(isAuth){
      history.push("/home")
    }



  },[isAuth]);

  return (
      <div className="container">
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
        <LoginToast/>
      </div>

  );
};

export default LoginForm;