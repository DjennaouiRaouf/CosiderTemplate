import * as React from "react";
import login from "./login.png"

import {Carousel} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";

import Cookies from "js-cookie";
import { InputText } from "primereact/inputtext";
import { Button as PRButton } from 'primereact/button';
import {Toast as PRToast} from "primereact/toast";
import {useNavigate} from "react-router-dom";
import navigationBar from "../NavigationBar/NavigationBar";









const LoginForm: React.FC<any> = () => {
  const [pics,setPics]=useState<any[]>([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });




  const toast = useRef<PRToast>(null);


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
    const fd = new FormData();
    fd.append('username', formData.username);
    fd.append('password', formData.password);
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/login/`,fd,{
      withCredentials:true,
    })
        .then((response:any) => {
          window.location.href='/home'
        })
        .catch((error:any) => {
          toast.current?.show({ severity: 'error', summary: 'Connexion', detail: String(error.response.data.message), life: 3000 });

        });

  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getImages();


  },[]);

  return (

    <div>
      <PRToast ref={toast} position="top-right" />
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
                    <Carousel className="w-100 d-block" controls={false} interval={2000} fade={true} indicators={true} >
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
                          <InputText className="w-100"  id="username"
                                     name="username" placeholder="Nom d'utilisateur" value={formData.username}
                                     onChange={handleInputChange} />

                        </div>
                        <div className="mb-3">
                             <InputText className="w-100"  id="password"
                                        onChange={handleInputChange}
                                        name="password" placeholder="Mot de passe"  value={formData.password} type="password" />
                        </div>
                        <div className="mb-3">
                          <div className="custom-control custom-checkbox small" />
                        </div>
                        <PRButton  className="w-100" style={{ background: "#df162c", borderWidth: 0 }} onClick={authentification} label="Connexion"  />


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
    </div>

  );
};

export default LoginForm;